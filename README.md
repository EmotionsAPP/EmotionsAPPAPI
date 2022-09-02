<p align="center">
  <img src="./public/emotions_logo.png" width="200" alt="Emotions Logo" />
</p>

## Description
This is the API for the EmotionsAPP project. This is RESTFUL api built with NodeJS and [Nest](https://github.com/nestjs/nest) framework with Express. Signalling server for socket connections will be running on port 9000.

## Installation

1. Clone the repository

2. Install the dependencies

```bash
# npm
$ npm install

# yarn
$ yarn install
```

3. Install Nest-CLI
```bash
$ npm i -g @nestjs/cli
```

4. Set up mongo database
```bash
$ docker-compose up -d
```

5. Clone the file __*.env.template*__ and rename it to **.env**

6. Fill the defined variables in the ```.env```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Contributing

Comments on pull request are welcome, please make sure to resolve the comments before merging the pull request. Pull requests to the dev branch only need for one approval to be merge, please make sure to review the pull request throughly.

Also make sure to update test accordingly.

## Notes

In production, connection to MongoDB needs a certificate, for connections to the cluster contact the project administrator.
