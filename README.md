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

## Deploy

There is a CI which deploys to the server whenever a new change is pushed to the `master branch`.
Please only push features tested and completed, since we use free CI, so there is limit to how many time CIs can be run.

Is **highly recommended** that you do your work in a different branch, and after everything is completed **and** tested, you create a PR for the master branch.

## Techs being used

- I'm using postgres database, typescript with DDD and TDD;

