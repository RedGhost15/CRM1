import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Bill } from '../../models/bill.model';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-bills',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mx-auto p-4">
      <h2 class="text-2xl font-bold mb-4">Bills Management</h2>
      
      <div class="mb-6 bg-white p-4 rounded-lg shadow">
        <h3 class="text-lg font-semibold mb-2">Add New Bill</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input [(ngModel)]="newBill.invoiceNumber" 
                 placeholder="Invoice Number"
                 class="p-2 border rounded">
          <input [(ngModel)]="newBill.amount" 
                 type="number"
                 placeholder="Amount"
                 class="p-2 border rounded">
          <input [(ngModel)]="newBill.description" 
                 placeholder="Description"
                 class="p-2 border rounded">
          <select [(ngModel)]="newBill.status" 
                  class="p-2 border rounded">
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="overdue">Overdue</option>
          </select>
          <button (click)="addBill()" 
                  class="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Add Bill
          </button>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow">
        <table class="min-w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="p-4 text-left">Invoice #</th>
              <th class="p-4 text-left">Amount</th>
              <th class="p-4 text-left">Status</th>
              <th class="p-4 text-left">Description</th>
              <th class="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let bill of bills" class="border-t">
              <td class="p-4">{{ bill.invoiceNumber }}</td>
              <td class="p-4">{{ bill.amount }}</td>
              <td class="p-4">
                <span [class]="getStatusClass(bill.status)">
                  {{ bill.status }}
                </span>
              </td>
              <td class="p-4">{{ bill.description }}</td>
              <td class="p-4">
                <button (click)="deleteBill(bill.id)" 
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
export class BillsComponent implements OnInit {
  bills: Bill[] = []; // Initialize bills as an empty array
  newBill: Partial<Bill> = {
    status: 'pending' // Default status for new bills
  };

  constructor(private storage: StorageService) {}

  ngOnInit() {
    this.loadBills(); // Load bills when the component initializes
  }

  loadBills() {
    const storedBills = this.storage.getItem<Bill[]>('bills'); // Retrieve bills from storage
    this.bills = storedBills.reduce((acc, val) => acc.concat(val), []);
 // Ensure bills is an array
    console.log('Loaded bills:', this.bills); // Debugging statement
  }

  addBill() {
    if (this.newBill.invoiceNumber && this.newBill.amount) {
      const bill: Bill = {
        id: Date.now(), // Generate a unique ID
        invoiceNumber: this.newBill.invoiceNumber,
        amount: this.newBill.amount,
        status: this.newBill.status as 'paid' | 'pending' | 'overdue',
        description: this.newBill.description || '',
        date: new Date(),
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // Set due date to 30 days from now
      };
      this.storage.addItem('bills', bill); // Add the new bill to storage
      this.loadBills(); // Reload bills to update the view
      this.newBill = { status: 'pending' }; // Reset newBill to default values
    }
  }

  deleteBill(id: number) {
    this.storage.deleteItem<Bill>('bills', id); // Use deleteItem method
    this.loadBills(); // Reload bills to update the view
  }

  getStatusClass(status: string) {
    switch (status) {
      case 'paid':
        return 'text-green-500';
      case 'pending':
        return 'text-yellow-500';
      case 'overdue':
        return 'text-red-500';
      default:
        return '';
    }
  }
} 