import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../models/employee.model';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mx-auto p-4">
      <h2 class="text-2xl font-bold mb-4">Employee Management</h2>
      
      <div class="mb-6 bg-white p-4 rounded-lg shadow">
        <h3 class="text-lg font-semibold mb-2">Add New Employee</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input [(ngModel)]="newEmployee.name" 
                 placeholder="Name"
                 class="p-2 border rounded">
          <input [(ngModel)]="newEmployee.position" 
                 placeholder="Position"
                 class="p-2 border rounded">
          <input [(ngModel)]="newEmployee.email" 
                 placeholder="Email"
                 class="p-2 border rounded">
          <input [(ngModel)]="newEmployee.phone" 
                 placeholder="Phone"
                 class="p-2 border rounded">
          <button (click)="addEmployee()" 
                  class="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Add Employee
          </button>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow">
        <table class="min-w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="p-4 text-left">Name</th>
              <th class="p-4 text-left">Position</th>
              <th class="p-4 text-left">Email</th>
              <th class="p-4 text-left">Phone</th>
              <th class="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let employee of employees" class="border-t">
              <td class="p-4">{{employee.name}}</td>
              <td class="p-4">{{employee.position}}</td>
              <td class="p-4">{{employee.email}}</td>
              <td class="p-4">{{employee.phone}}</td>
              <td class="p-4">
                <button (click)="deleteEmployee(employee.id)" 
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
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];
  newEmployee: Partial<Employee> = {};

  constructor(private storage: StorageService) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employees = this.storage.getItem<Employee>('employees');
  }

  addEmployee() {
    if (this.newEmployee.name && this.newEmployee.position) {
      const employee: Employee = {
        id: Date.now(),
        name: this.newEmployee.name,
        position: this.newEmployee.position,
        department: this.newEmployee.department || '',
        email: this.newEmployee.email || '',
        phone: this.newEmployee.phone || '',
        hireDate: new Date()
      };
      this.storage.addItem('employees', employee);
      this.loadEmployees();
      this.newEmployee = {};
    }
  }

  deleteEmployee(id: number) {
    this.storage.deleteItem<Employee>('employees', id);
    this.loadEmployees();
  }
}