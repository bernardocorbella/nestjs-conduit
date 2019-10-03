# NestJS Conduit App

## Installation

```bash
$ yarn install
```

## Services

I'm using `docker-compose.yml` to define DB and other services.

Make sure to run:

```bash
$ docker-compose up -d
```

Also includes Adminer. You can use it by going to `http://localhost:8080` and the default credentials

## Running the app

Copy `src/config.ts.example` to `src/config.ts`

```bash
$ cp src/config.ts.example src/config.ts
```

Different ways of running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
