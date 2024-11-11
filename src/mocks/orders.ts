import { Order } from "../models/orders/order";

export const mockOrders: Order[] = [
    {
        id: 1,
        userId: 101,
        total: 59.99,
        paymentMethod: 'credit',
        status: 'paid',
        createdAt: new Date('2024-11-01T10:30:00Z'),
        updatedAt: new Date('2024-11-01T11:00:00Z')
    },
    {
        id: 2,
        userId: 102,
        total: 150.0,
        paymentMethod: 'paypal',
        status: 'pending',
        createdAt: new Date('2024-11-02T15:00:00Z'),
        updatedAt: new Date('2024-11-02T15:00:00Z')
    },
    {
        id: 3,
        userId: 103,
        total: 89.99,
        paymentMethod: 'googlepay',
        status: 'shipped',
        createdAt: new Date('2024-11-03T08:45:00Z'),
        updatedAt: new Date('2024-11-05T09:15:00Z')
    },
    {
        id: 4,
        userId: 104,
        total: 249.99,
        paymentMethod: 'applepay',
        status: 'delivered',
        createdAt: new Date('2024-11-04T12:00:00Z'),
        updatedAt: new Date('2024-11-06T12:30:00Z')
    },
    {
        id: 5,
        userId: 105,
        total: 99.99,
        paymentMethod: 'credit',
        status: 'paid',
        createdAt: new Date('2024-11-05T17:00:00Z'),
        updatedAt: new Date('2024-11-05T17:30:00Z')
    },
    {
        id: 6,
        userId: 106,
        total: 49.99,
        paymentMethod: 'paypal',
        status: 'pending',
        createdAt: new Date('2024-11-06T10:15:00Z'),
        updatedAt: new Date('2024-11-06T10:15:00Z')
    },
    {
        id: 7,
        userId: 107,
        total: 75.0,
        paymentMethod: 'googlepay',
        status: 'shipped',
        createdAt: new Date('2024-11-07T14:45:00Z'),
        updatedAt: new Date('2024-11-08T08:00:00Z')
    },
    {
        id: 8,
        userId: 108,
        total: 120.0,
        paymentMethod: 'applepay',
        status: 'delivered',
        createdAt: new Date('2024-11-08T09:30:00Z'),
        updatedAt: new Date('2024-11-10T10:00:00Z')
    },
    {
        id: 9,
        userId: 109,
        total: 60.0,
        paymentMethod: 'credit',
        status: 'paid',
        createdAt: new Date('2024-11-09T16:00:00Z'),
        updatedAt: new Date('2024-11-09T16:45:00Z')
    },
    {
        id: 10,
        userId: 110,
        total: 200.0,
        paymentMethod: 'paypal',
        status: 'pending',
        createdAt: new Date('2024-11-10T18:30:00Z'),
        updatedAt: new Date('2024-11-10T18:30:00Z')
    }
];
