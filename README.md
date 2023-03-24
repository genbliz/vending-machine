# Vending Machine

## Exercise brief

Design an API for a vending machine, allowing users with a “seller” role to add, update or remove
products, while users with a “buyer” role can deposit coins into the machine and make purchases.
Your vending machine should only accept 5, 10, 20, 50 and 100 cent coins

## Installation

```bash
$ git clone https://github.com/genbliz/vending-machine.git
$ cd vending-machine
$ cp .env.exmaple .env
$ npm install
```
Update the .env with variable values

## Running the app

```bash
$ npm run start

```

## Test

```bash
$ npm run test
```

## Available APIs
```bash
GET http://localhost:3000/user
POST http://localhost:3000/user
PUT http://localhost:3000/user
DELETE http://localhost:3000/user
POST http://localhost:3000/user/reset
GET http://localhost:3000/user/:id

GET http://localhost:3000/product
POST http://localhost:3000/product
GET http://localhost:3000/product/:id
PUT http://localhost:3000/product/:id
DELETE http://localhost:3000/product/:id

POST http://localhost:3000/login
POST http://localhost:3000/buy
POST http://localhost:3000/deposit
```

## Technology Used
* **Library**: Express JS
* **Language**: Typescript
* **Database**: MongoDB

## License

MIT licensed.
