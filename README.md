# Azure Training - Docker

## Case

Developers have created a <b>NodeJS</b> application for products microservices. As DevOps engineer you are supposed to containerise the NodeJS application. The NodeJS version used is <b>v16.3.4</b>.

We need to create a docker image for the <b>development environment</b>, where developers also need <b>Nodemon</b> (a nodejs development tool). This tool need to be installed at the global level in container.

The application runs on port 3001, with index.js as entry file for the application.

We will need a mysql container for the application to run. Generate a connection string and add it in the .env.dev file.

The mysql container will have a database named "products" which will be access by user "john" with password "John123" with full privileges only on that database.

The application and container should be in a network where they can resolve their dns names.

## Docker commands we will be using

 - docker run
 - docker start
 - docker stop
 - docker rm
 - docker network
 - docker volume
 - docker logs
 - docker exec

## Testing the application


* Get all the products in the database table.

```
curl -X GET http://localhost:3001/products
```

* Get product with the specified id.

```
curl -X GET http://localhost:3001/products?id='product_id_here'
```

* Add product to database

```
curl -X POST -d '{"name": "Oppo RENO 2F","price": 16499.99,"currency": "INR"}' -H 'Content-Type: application/json' http://localhost:3001/products
```

* Update product data by product ID

```
curl -X PUT -d '{"name": "Oppo RENO 2F","price": 16499.99,"currency": "INR"}' -H 'Content-Type: application/json' http://localhost:3001/products?id='product_id_here'
```

* Delete product with the specified id

```
curl -X DELETE http://localhost:3001/products?id='product_id_here'
```

# Maintained by

Shoaib S. Shaikh