export type PaymentMethod = 'credit' | 'paypal' | 'googlepay' | 'applepay';
export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered';

export interface Order {
    id: number;
    userId: number;
    total: number;
    paymentMethod: PaymentMethod;
    status: OrderStatus;
    createdAt: Date;
    updatedAt: Date;
}