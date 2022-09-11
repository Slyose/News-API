# Northcoders News API

This is an API built for the purpose of accessing application data programmatically. The intention of this API is to mimic the building of a real world backend servive to provide information to the front end architecture.

## Steps to setup and test API on a new machine

_Needs Node.js version 16.17.0 & Postgres 12 or above_

1. Run `npm i` in the terminal

2. Run `npm run setup-dbs` in the terminal to create the test and development databases.

3. Run the command `npm run seed` in the terminal to insert data into the databases.

4. Create two .env files containing the names of the psql database you want to connect to.

   - `.env.test` should contain `PGDATABASE=nc_news_test`
   - `.env.development` should contain `PGDATABASE=nc_news`

5. Run `npm test` to ensure that setup has been successful and that the API is functional.

## Live Version

The live version of this API is hosted with heroku and can be accessed at:

https://modou-nc-news.herokuapp.com/api
