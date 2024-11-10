# Users

## [POST] Log In
__Endpoint__: `localhost:8080/users/login`

__Request Body__:
```json
{
    "email": "email@example.com" 
    "password": "example123"
}
```

__Response__: token

## [POST] Sign Up
__Endpoint__: `localhost:8080/users/signup`

__Request Body__:
```json
{
    "email": "email@example.com",
    "password": "example123",
    "name": "John Doe",
    "role": "user"
}
```

__Response__: new user

## [PUT] Update User
__Endpoint__: `localhost:8080/users/updateUser`

__Request Body__:
```json
{
    "email": "email@example.com",
    "password": "example123",
    "name": "John Doe",
    "role": "user"
}
```

__Response__: updated user


## [DELETE] Delete User
__Endpoint__: `localhost:8080/users/deleteUser`

__Query Params__:
- userId: string

__Response__: deleted userId

## [POST] Create User
__Endpoint__: `localhost:8080/users/createUser`

__Request Body__:
```json
{
    "email": "email@example.com",
    "password": "example123",
    "name": "John Doe",
    "role": "user"
}
```
__Response__: new user

## [GET] Get All Users
__Endpoint__: `localhost:8080/users/getAllUsers`

__Response__: all users

## [GET] Get User By Id

__Endpoint__: `localhost:8080/users/getUserById`

__Query Params__:
- userId: string

__Response__: user


