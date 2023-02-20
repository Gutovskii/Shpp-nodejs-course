## Description

[Swapi](https://swapi.dev) NestJS Integration

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Tests

```bash
# unit tests
$ pnpm run test

# test coverage
$ pnpm run test:cov
```

## Migrations

```bash
# migration generate
$ pnpm run migration:generate <database/migrations/MigrationName>

# migration up
$ pnpm run migration:run

# migration down
$ pnpm run migration:revert
```

## Seeds

```bash
# create seeds
$ pnpm run seed:run

# remove seeds (remove all data from seeded tables and images)
$ pnpm run seed:revert
```
