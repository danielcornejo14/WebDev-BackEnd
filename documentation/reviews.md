create review 

POST http://localhost:3000/review/createReview

request body:

{
    "productId": "6742b5055211a0a399aeec11", 
    "userId": "6747b6bf58b0b8627b1f807e", 
    "rating": 4, 
    "comment": "Good product"
}

response:

{
    "product": "6742b5055211a0a399aeec11",
    "user": "6747b6bf58b0b8627b1f807e",
    "rating": 4,
    "comment": "Good product",
    "_id": "6747d9d8928f0d5b09d68a8b",
    "createdAt": "2024-11-28T02:47:52.088Z",
    "updatedAt": "2024-11-28T02:47:52.088Z",
    "__v": 0
}

get all reviews

GET http://localhost:3000/review/

response: 

[
    {
        "_id": "6747d9d8928f0d5b09d68a8b",
        "product": {
            "rating": 0,
            "_id": "6742b5055211a0a399aeec11",
            "name": "Product 1",
            "brand": "Brand 1",
            "description": "This is a product",
            "price": 100,
            "image": "https://via.placeholder.com/150",
            "category": "673ecd2f663455067c08b3bc",
            "createdAt": "2024-11-24T05:07:07.396Z",
            "updatedAt": "2024-11-24T05:07:07.396Z",
            "__v": 0
        },
        "user": {
            "_id": "6747b6bf58b0b8627b1f807e",
            "email": "danicor14@hotmail.com",
            "password": "contrase;a23",
            "role": "user",
            "createdAt": "2024-11-28T00:18:07.245Z",
            "updatedAt": "2024-11-28T00:18:07.245Z",
            "__v": 0
        },
        "rating": 4,
        "comment": "Good product",
        "createdAt": "2024-11-28T02:47:52.088Z",
        "updatedAt": "2024-11-28T02:47:52.088Z",
        "__v": 0
    },
    {
        "_id": "6747da86f28d5c279eace494",
        "product": {
            "_id": "6747b5da0784d268e64217c9",
            "name": "cmpu",
            "brand": "dell",
            "description": "cmp",
            "price": 3,
            "image": "https://tienda.dell.com/media/wysiwyg/portatiles_1.png",
            "category": "673ecd2f663455067c08b3bc",
            "rating": 0,
            "createdAt": "2024-11-28T00:14:18.565Z",
            "updatedAt": "2024-11-28T00:14:18.565Z",
            "__v": 0
        },
        "user": {
            "_id": "673baa2455b7ef6f55e54946",
            "email": "perez@gmail.com",
            "password": "contra123",
            "role": "user",
            "createdAt": "2024-11-18T20:57:08.317Z",
            "updatedAt": "2024-11-18T20:57:08.317Z",
            "__v": 0
        },
        "rating": 3,
        "comment": "Decent product",
        "createdAt": "2024-11-28T02:50:46.818Z",
        "updatedAt": "2024-11-28T02:50:46.818Z",
        "__v": 0
    },
    {
        "_id": "6747daa2f28d5c279eace497",
        "product": {
            "rating": 0,
            "_id": "6742b5055211a0a399aeec24",
            "name": "Product 20",
            "brand": "Brand 20",
            "description": "This is a high-value product",
            "price": 2000,
            "image": "https://via.placeholder.com/150",
            "category": "673ecd32663455067c08b3e9",
            "createdAt": "2024-11-24T05:07:07.396Z",
            "updatedAt": "2024-11-24T05:07:07.396Z",
            "__v": 0
        },
        "user": {
            "_id": "673baa2455b7ef6f55e54946",
            "email": "perez@gmail.com",
            "password": "contra123",
            "role": "user",
            "createdAt": "2024-11-18T20:57:08.317Z",
            "updatedAt": "2024-11-18T20:57:08.317Z",
            "__v": 0
        },
        "rating": 1,
        "comment": "Awful product",
        "createdAt": "2024-11-28T02:51:14.297Z",
        "updatedAt": "2024-11-28T02:51:14.297Z",
        "__v": 0
    },
    {
        "_id": "6747dad7f28d5c279eace49a",
        "product": {
            "rating": 0,
            "_id": "6742b5055211a0a399aeec24",
            "name": "Product 20",
            "brand": "Brand 20",
            "description": "This is a high-value product",
            "price": 2000,
            "image": "https://via.placeholder.com/150",
            "category": "673ecd32663455067c08b3e9",
            "createdAt": "2024-11-24T05:07:07.396Z",
            "updatedAt": "2024-11-24T05:07:07.396Z",
            "__v": 0
        },
        "user": {
            "_id": "673b858f0cbff38315f07b71",
            "email": "user20@example.com",
            "password": "password123",
            "role": "admin",
            "__v": 0,
            "createdAt": "2024-11-18T18:21:03.920Z",
            "updatedAt": "2024-11-18T18:21:03.920Z"
        },
        "rating": 2,
        "comment": "Mediocre product",
        "createdAt": "2024-11-28T02:52:07.772Z",
        "updatedAt": "2024-11-28T02:52:07.772Z",
        "__v": 0
    }
]



Get reviews by product

Request With product id 

http://localhost:3000/review/product/6742b5055211a0a399aeec24

Response 

[
    {
        "_id": "6747daa2f28d5c279eace497",
        "product": "6742b5055211a0a399aeec24",
        "user": {
            "_id": "673baa2455b7ef6f55e54946",
            "email": "perez@gmail.com",
            "password": "contra123",
            "role": "user",
            "createdAt": "2024-11-18T20:57:08.317Z",
            "updatedAt": "2024-11-18T20:57:08.317Z",
            "__v": 0
        },
        "rating": 1,
        "comment": "Awful product",
        "createdAt": "2024-11-28T02:51:14.297Z",
        "updatedAt": "2024-11-28T02:51:14.297Z",
        "__v": 0
    },
    {
        "_id": "6747dad7f28d5c279eace49a",
        "product": "6742b5055211a0a399aeec24",
        "user": {
            "_id": "673b858f0cbff38315f07b71",
            "email": "user20@example.com",
            "password": "password123",
            "role": "admin",
            "__v": 0,
            "createdAt": "2024-11-18T18:21:03.920Z",
            "updatedAt": "2024-11-18T18:21:03.920Z"
        },
        "rating": 2,
        "comment": "Mediocre product",
        "createdAt": "2024-11-28T02:52:07.772Z",
        "updatedAt": "2024-11-28T02:52:07.772Z",
        "__v": 0
    }
]


Update a review

Request with review id 

PUT http://localhost:3000/review/updateReview/6747daa2f28d5c279eace497


Request body:

{
    "rating": 5,
    "comment": "Perfect Product. Updated review comment"
}

Response:

{
    "_id": "6747daa2f28d5c279eace497",
    "product": "6742b5055211a0a399aeec24",
    "user": "673baa2455b7ef6f55e54946",
    "rating": 5,
    "comment": "Perfect Product. Updated review comment",
    "createdAt": "2024-11-28T02:51:14.297Z",
    "updatedAt": "2024-11-28T03:25:11.126Z",
    "__v": 0
}


delete a review

Request with review id

DELETE http://localhost:3000/review/deleteReview/6747da86f28d5c279eace494

Response:

{
    "message": "Review deleted successfully"
}