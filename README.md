# HealthReveal

## System requirement

- docker v2.4.0.0

## File structure

- app - Application UI
- services - Application API
- db - Database

## How to run

```bash
$ cd healthreveal

# to initialize database
$ ./setup.sh

# start services
$ cd services
$ npm install
$ npm run dev

# start UI
$ cd ..
$ cd app
$ npm install
$ npm start
```
