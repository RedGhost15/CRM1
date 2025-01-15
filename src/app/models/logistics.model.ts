export interface LogisticsItem {
  id: number;
  trackingNumber: string;
  status: 'pending' | 'in-transit' | 'delivered';
  origin: string;
  destination: string;
  estimatedDelivery: Date;
  actualDelivery?: Date;
}