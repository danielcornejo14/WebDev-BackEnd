# Orders

## [GET] Get all orders

__Endpoint:__ `localhost:8080/orders`

__Headers__: 
- `Authorization: <token>`

__Response:__
```json
[
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
    ...
]
```

## [GET] Get order by id

__Endpoint:__ `localhost:8080/orders/:id`

__Headers__:
- `Authorization: <token>`

__Response:__
```json
{
    id: 1,
    userId: 101,
    total: 59.99,
    paymentMethod: 'credit',
    status: 'paid',
    createdAt: new Date('2024-11-01T10:30:00Z'),
    updatedAt: new Date('2024-11-01T11:00:00Z')
}
```

## [GET] Get orders by user id

__Endpoint:__ `localhost:8080/orders/getOrdersByUserId/:userId`

__Headers__:
- `Authorization: <token>`

__Response:__
```json
[
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
        id: 3,
        userId: 101,
        total: 100.0,
        paymentMethod: 'paypal',
        status: 'pending',
        createdAt: new Date('2024-11-02T15:00:00Z'),
        updatedAt: new Date('2024-11-02T15:00:00Z')
    },
    ...
]
```

## [POST] Create order

__Endpoint:__ `localhost:8080/orders/createOrder`

__Headers__:
- `Authorization: <token>`

__Request:__ Order object
```json
{
    userId: 101,
    total: 59.99,
    paymentMethod: 'credit',
    status: 'paid'
}
```

__Response:__
```json
{
    id: 1,
    userId: 101,
    total: 59.99,
    paymentMethod: 'credit',
    status: 'paid',
    createdAt: new Date('2024-11-01T10:30:00Z'),
    updatedAt: new Date('2024-11-01T11:00:00Z')
}
```

## [PUT] Update order

__Endpoint:__ `localhost:8080/orders/updateOrder/:id`

__Headers__:
- `Authorization: <token>`

__Request:__ Order object
```json
{
    userId: 101,
    total: 59.99,
    paymentMethod: 'credit',
    status: 'paid'
}
```

__Response:__
```json
{
    id: 1,
    userId: 101,
    total: 59.99,
    paymentMethod: 'credit',
    status: 'paid',
    createdAt: new Date('2024-11-01T10:30:00Z'),
    updatedAt: new Date('2024-11-01T11:00:00Z')
}
```

## [DELETE] Delete order

__Endpoint:__ `localhost:8080/orders/deleteOrder/:id`

__Headers__:

- `Authorization: <token>`

__Response:__
```json
{
    message: 'Order deleted successfully'
}
```

