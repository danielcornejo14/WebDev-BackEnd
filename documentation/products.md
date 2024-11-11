# Products

## [GET] All products
__Endpoint:__ `localhost:8080/product`

__Description:__ Get all products

__Response:__
```json
[
    {
        id: 1,
        name: 'Product 1',
        price: 100,
        description: 'This is a product',
        image: 'https://via.placeholder.com/150',
        brand: 'Brand 1',
        category: [
            {
                id: 1,
                name: 'Category 1',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 2,
                name: 'Category 2',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
    }
]
```

## [GET] Product by ID

__Endpoint:__ `localhost:8080/product/:id`

__Description:__ Get product by ID

__Query Parameters:__
- `id` - Product ID

__Response:__
```json
{
    id: 1,
    name: 'Product 1',
    price: 100,
    description: 'This is a product',
    image: 'https://via.placeholder.com/150',
    brand: 'Brand 1',
    category: [
        {
            id: 1,
            name: 'Category 1',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 2,
            name: 'Category 2',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
}
```

## [POST] Create product

__Endpoint:__ `localhost:8080/product/createProduct`

__Description:__ Create a new product

__Request Headers:__
- `Authorization` - Bearer token

__Request Body:__
```json
{
    {
        id: 1,
        name: 'Product 1',
        price: 100,
        description: 'This is a product',
        image: 'https://via.placeholder.com/150',
        brand: 'Brand 1',
        category: [
            {
                id: 1,
                name: 'Category 1',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 2,
                name: 'Category 2',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
    },
}
```

__Response:__ New product created
```json
{
    id: 1,
    name: 'Product 1',
    price: 100,
    description: 'This is a product',
    image: 'https://via.placeholder.com/150',
    brand: 'Brand 1',
    category: [
        {
            id: 1,
            name: 'Category 1',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 2,
            name: 'Category 2',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
}
```
## [PUT] Update product

__Endpoint:__ `localhost:8080/product/updateProduct/:id`

__Description:__ Update product by ID

__Request Headers:__
- `Authorization` - Bearer token

__Request Body:__
```json
{
    {
        id: 1,
        name: 'Product 1',
        price: 100,
        description: 'This is a product',
        image: 'https://via.placeholder.com/150',
        brand: 'Brand 1',
        category: [
            {
                id: 1,
                name: 'Category 1',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 2,
                name: 'Category 2',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
    },
}
```

__Response:__ Product updated
```json
{
    id: 1,
    name: 'Product 1',
    price: 100,
    description: 'This is a product',
    image: 'https://via.placeholder.com/150',
    brand: 'Brand 1',
    category: [
        {
            id: 1,
            name: 'Category 1',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 2,
            name: 'Category 2',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
}
```

## [DELETE] Delete product

__Endpoint:__ `localhost:8080/product/deleteProduct/:id`

__Description:__ Delete product by ID

__Request Headers:__
- `Authorization` - Bearer token

__Response:__ Product deleted
```json
{
    id: 1,
    name: 'Product 1',
    price: 100,
    description: 'This is a product',
    image: 'https://via.placeholder.com/150',
    brand: 'Brand 1',
    category: [
        {
            id: 1,
            name: 'Category 1',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 2,
            name: 'Category 2',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
}
```

