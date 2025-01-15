export interface Bill {
  id: number;
  invoiceNumber: string;
  amount: number;
  date: Date;
  dueDate: Date;
  status: 'paid' | 'pending' | 'overdue';
  description: string;
}