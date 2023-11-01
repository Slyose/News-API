# Northcoders News API

This is an API built for the purpose of accessing application data programmatically. The intention of this API is to mimic the building of a real world backend servive to provide information to the front end architecture.

The **live version** of this API is hosted with heroku and can be accessed at:

**https://slate-gray-reindeer-tutu.cyclic.app/api**

## Tech Stack
This API is using:
- Javascript for the server, with express as an api framework
- pgSQL for the database
- Jest to write a testing suite that is run before changes can be pushed to github (thanks to an npm package called huksy).

## Steps to setup and test API on a new machine

_Needs Node.js version 16.17.0 & Postgres 12 or above_

1. Make a local copy of the repo with `git clone https://github.com/Slyose/News-API`

2. Run `npm i` in the terminal

3. Create two .env files containing the names of the psql database yo u want to connect to.

   - `.env.test` should contain `PGDATABASE=nc_news_test`
   - `.env.development` should contain `PGDATABASE=nc_news`

4. Run `npm run setup-dbs` in the terminal to create the test and development databases.

5. Run the command `npm run seed` in the terminal to insert data into the databases.

6. Run `npm test` to ensure that setup has been successful and that the API is functional.


