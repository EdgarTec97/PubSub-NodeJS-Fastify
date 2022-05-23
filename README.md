# Challenge

Challenge is a ... TODO: Place description here

## 💻 I'm a dev, how do I get started?

Prerequisites:

- [Node.js](https://nodejs.org/es/download): version v14.17.2
- [TypeScript](https://www.typescriptlang.org):
- [Yarn](https://www.yarn.com/): version 1.22.17
- [Docker](https://docs.docker.com/get-docker/): version 20.10.8
- [Docker-compose](https://docs.docker.com/compose/install/): version 1.29.2

## ENDPOINTS

- [POST] `http://localhost:4000/publish` Send message by kafka with body like this...

```json
{
  "message": {
    "data": {
      "id": "1877888",
      "type": "tracking_carrier_service_initialize",
      "occurredAt": "2022-05-04T05:41:24.120Z",
      "attributes": {
        "carriers": [
          {
            "carrier": "ENVIA",
            "country": "CO",
            "serviceType": "STANDARD",
            "version": "1.0.0",
            "trackingIds": ["014994732425"],
            "providerInfo": {
              "email": "test@test.com",
              "clientId": "123"
            }
          }
        ]
      }
    },
    "meta": {}
  }
}
```

Now:

# Steps to follow in sequential order

```bash
git clone git@github.com:EdgarTec97/PubSub-NodeJS-Fastify.git
cd PubSub-NodeJS-Fastify
yarn
```

You are now good ready to go!! 👯

### `yarn` scripts

- `start`: run the project in development mode with nodemon
