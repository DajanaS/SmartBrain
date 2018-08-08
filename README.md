# Smart Brain API
Final project for Udemy course

## Set up the project
1. Clone this repository
2. Run `npm install`
3. Run `npm start`
4. Set up the environment variables

### How to set up the environment variables
Copy the file [.env.sample](./.env.sample) in the same path location, renaming it into `.env` and give the variables
your own values. In the sample file there are some variables' values preset as an example, where a connection to a
postgres database is set up on *localhost* (or can be written as *127.0.0.1*), with username *postgres* and no password (*empty*).
Additionally, the database name is *postgres* and the schema name is *smart_brain* (usually these two are not divided).
Few notes:
1. If you don't need to specify the schema name in order to connect to the postgres database, then you can:
    - remove the line ` searchPath: [process.env.REACT_APP_SCHEMA_NAME, 'public'],` in [server.js](./server.js#L21) file;
    - remove the environment variable `REACT_APP_SCHEMA_NAME` and instead write the schema/database name directly in
`REACT_APP_DB_NAME` variable.
2. You can define your own environment variables, but keep in mind that they should start with the prefix `REACT_APP`.
3. You can grab a free Clarifai API key [here](https://www.clarifai.com/) in order to connect to the Clarifai API,
just by creating an account (it is like this in the moment when this is written).
4. Make sure you use PostgreSQL instead of MYSQL for this code base.
