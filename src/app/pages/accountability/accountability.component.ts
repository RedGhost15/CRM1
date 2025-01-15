import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Bill } from '../../models/bill.model';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-accountability',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto p-4">
      <h2 class="text-2xl font-bold mb-4">Accountability Overview</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div class="bg-white p-4 rounded-lg shadow">
          <h3 class="text-lg font-semibold mb-2">Total Revenue</h3>
          <p class="text-2xl text-green-600">{{totalRevenue.toFixed(2)}}</p>
        </div>
        
        <div class="bg-white p-4 rounded-lg shadow">
          <h3 class="text-lg font-semibold mb-2">Pending Payments</h3>
          <p class="text-2xl text-yellow-600">{{pendingPayments.toFixed(2)}}</p>
        </div>
        
        <div class="bg-white p-4 rounded-lg shadow">
          <h3 class="text-lg font-semibold mb-2">Overdue Payments</h3>
          <p class="text-2xl text-red-600">{{overduePayments.toFixed(2)}}</p>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-4">
        <h3 class="text-lg font-semibold mb-4">Recent Transactions</h3>
        <table class="min-w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="p-4 text-left">Date</th>
              <th class="p-4 text-left">Invoice #</th>
              <th class="p-4 text-left">Amount</th>
              <th class="p-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let bill of recentBills" class="border-t">
              <td class="p-4">{{bill.date | date}}</td>
              <td class="p-4">{{bill.invoiceNumber}}</td>
              <td class="p-4">{{bill.amount}}</td>
              <td class="p-4">
                <span [class]="getStatusClass(bill.status)">
                  {{bill.status}}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class AccountabilityComponent implements OnInit {
  recentBills: Bill[] = [];
  totalRevenue = 0;
  pendingPayments = 0;
  overduePayments = 0;

  constructor(private storage: StorageService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    const bills = this.storage.getItem<Bill>('bills');
    this.recentBills = bills.slice(-5).reverse();
    
    this.totalRevenue = bills
      .filter(bill => bill.status === 'paid')
      .reduce((sum, bill) => sum + bill.amount, 0);
      
    this.pendingPayments = bills
      .filter(bill => bill.status === 'pending')
      .reduce((sum, bill) => sum + bill.amount, 0);
      
    this.overduePayments = bills
      .filter(bill => bill.status === 'overdue')
      .reduce((sum, bill) => sum + bill.amount, 0);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'paid':
        return 'text-green-600';
      case 'overdue':
        return 'text-red-600';
      default:
        return 'text-yellow-600';
    }
  }
}