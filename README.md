# CC Caller Backend

## How to start the server
1. run below command to install dependencies
```bash
$ yarn
```

2. make sure you setup your database connection in "ormconfig.json"

3. run below command to run database migrations
```bash
$ yarn typeorm migration:run

// run migration show to check if everything went good
$ yarn typeorm migration:show 
```

4. run development server command
```bash
$ yarn dev:server
```

## Techs being used

- I'm using postgres database, typescript with DDD and TDD;

