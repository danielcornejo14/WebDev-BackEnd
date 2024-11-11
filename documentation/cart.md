# Cart
Here you can find more information about the Cart endponts

## [GET] Get Cart 
__Endpoint__: http://localhost:8080/cart/

__Description__: Get the cart of a user

__headers__: 
```json
{
    "Authorization": "<token>"
}
```
__Response__:
```json
{
    "userId": "userId",
    "products": [
        {
            "productId": "productId",
            "name": "name",
            "price": "price",
            "quantity": "quantity"
            ...
        }
    ]
}
```


## [POST] Add Product to Cart
__Endpoint__: http://localhost:8080/addProduct/

__Description__: Add a product to the cart of a user

__Headers__: 
```json
{
    "Authorization": "<token>"
}
```

__Body__: Product object to add to the cart
```json
{
    "userId": "userId",
    "productId": "productId",
    "quantity": "quantity"
    ...
}
```

__Response__: 
```json
{
    "userId": "userId",
    "products": [
        {
            "productId": "productId",
            "name": "name",
            "price": "price",
            "quantity": "quantity"
            ...
        }
    ]
}
```


## [DELETE] Delete Product
__Endpoint__: http://localhost:8080/deleteProduct/

__Description__: Delete a product from the cart of a user

__Headers__: 
```json
{
    "Authorization": "<token>"
}
```

__Body__: Product object to delete from the cart
```json
{
    "productId": "productId"
}
```

__Response__: Cart without the deleted product
```json
{
    "userId": "userId",
    "products": [
        {
            "productId": "productId",
            "name": "name",
            "price": "price",
            "quantity": "quantity"
            ...
        }
    ]
}
```
