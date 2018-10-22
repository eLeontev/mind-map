# Node JS API
Simple Node js REST API project with mongodb.

## Instruction

This is assumed that npm, node and mongodb are installed on the machine.

 * node js >= 8.x
 * npm >= 5.x
 * mongodb >= 3.2.x

For installing node and npm please refer [here](https://nodejs.org/en/download/package-manager/).
For installing mongodb [here](https://docs.mongodb.com/manual/installation/).

> Note: I recommended to use npm@5, Because it provides `npm audit` facility to check vulnerability in your dependencies.
 

## Installation and Run

 1. Clone the repository and move to cloned directory and hit:

    ```npm install```

    This will install all the dependencies for the project.

 2. To start the project hit: Move to server folder first.  

    ```
    node src/index.js
    ```
    or
    ```
    npm start
    ```

    This will start the project on the port number as you specify in `.env` file. Default is `4040`, so you API is now on [https://localhost:4040](http://localhost:4040) url.


## Configuration

1. Configuration application using `.env` file by setting environment variable.

## API

1. Get All maps

```
$ curl -X GET \
  http://localhost:4040/v1/maps
```

2. Add map

```
$ curl -X POST \
  http://localhost:4040/v1/maps \
  -H 'content-type: application/json' \
  -d '{
	"label": "map1",
	"owner": "own1",
	"isShared": false
}'
```

3. Update map by specific id

```
$ curl -X PUT \
  http://localhost:4040/v1/maps/{id} \
  -H 'content-type: application/json' \
  -d '{
	"label": "mappppp1",
	"isShared": true
}'
```

4. Delete map by specific id

```
$ curl -X DELETE \
  http://localhost:4040/v1/maps/{id}
```
## License

MIT
