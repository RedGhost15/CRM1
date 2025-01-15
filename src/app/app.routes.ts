import { Routes } from '@angular/router';
import { LogisticsComponent } from './pages/logistics/logistics.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { BillsComponent } from './pages/bills/bills.component';
import { AccountabilityComponent } from './pages/accountability/accountability.component';

export const routes: Routes = [
  { path: '', redirectTo: 'logistics', pathMatch: 'full' },
  { path: 'logistics', component: LogisticsComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'bills', component: BillsComponent },
  { path: 'accountability', component: AccountabilityComponent }
];