import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LogisticsItem } from '../../models/logistics.model';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-logistics',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mx-auto p-4">
      <h2 class="text-2xl font-bold mb-4">Logistics Management</h2>
      
      <div class="mb-6 bg-white p-4 rounded-lg shadow">
        <h3 class="text-lg font-semibold mb-2">Add New Shipment</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input [(ngModel)]="newItem.trackingNumber" 
                 placeholder="Tracking Number"
                 class="p-2 border rounded">
          <input [(ngModel)]="newItem.origin" 
                 placeholder="Origin"
                 class="p-2 border rounded">
          <input [(ngModel)]="newItem.destination" 
                 placeholder="Destination"
                 class="p-2 border rounded">
          <button (click)="addItem()" 
                  class="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Add Shipment
          </button>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow">
        <table class="min-w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="p-4 text-left">Tracking #</th>
              <th class="p-4 text-left">Status</th>
              <th class="p-4 text-left">Origin</th>
              <th class="p-4 text-left">Destination</th>
              <th class="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of items" class="border-t">
              <td class="p-4">{{item.trackingNumber}}</td>
              <td class="p-4">{{item.status}}</td>
              <td class="p-4">{{item.origin}}</td>
              <td class="p-4">{{item.destination}}</td>
              <td class="p-4">
                <button (click)="deleteItem(item.id)" 
                        class="text-red-500 hover:text-red-700">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class LogisticsComponent implements OnInit {
  items: LogisticsItem[] = [];
  newItem: Partial<LogisticsItem> = {};

  constructor(private storage: StorageService) {}

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.items = this.storage.getItem<LogisticsItem>('logistics');
  }

  addItem() {
    if (this.newItem.trackingNumber && this.newItem.origin && this.newItem.destination) {
      const item: LogisticsItem = {
        id: Date.now(),
        trackingNumber: this.newItem.trackingNumber,
        status: 'pending',
        origin: this.newItem.origin,
        destination: this.newItem.destination,
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      };
      this.storage.addItem('logistics', item);
      this.loadItems();
      this.newItem = {};
    }
  }

  deleteItem(id: number) {
    this.storage.deleteItem<LogisticsItem>('logistics', id);
    this.loadItems();
  }
}