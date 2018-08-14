# Smart Brain API
Final project for Udemy course

## Set up the project
1. Clone this repository
2. Run `npm install`
3. Set up the environment variables
4. Run `npm start`
5. [Optionally] Use Docker instead manually starting the app

### How to set up the environment variables
Copy the file [.env.sample](./.env.sample) in the same path location, renaming it into `.env` and give the variables
your own values. In the sample file there are some variables' values preset as an example, where a connection to a
postgres database is set up on *localhost* (or can be written as *127.0.0.1*), with username *postgres* and no password (*empty*).
Additionally, the database name is *postgres* and the schema name is *smart_brain* (usually these two are not divided).
Few notes:
1. If you don't need to specify the schema name in order to connect to the postgres database, then you can:
    - remove the line ` searchPath: [process.env.POSTGRES_SCHEMA_NAME, 'public'],` in [server.js](./server.js#L28) file;
    - remove the environment variable `POSTGRES_SCHEMA_NAME` and instead write the schema/database name directly in
`POSTGRES_DB_NAME` variable.
2. You can grab a free Clarifai API key [here](https://www.clarifai.com/)
(at least it is free at the moment when this is written) in order to connect to the Clarifai API, just by creating an account.
3. Make sure you use PostgreSQL for this code base (not MYSQL).

### Using Docker Compose
1. Run Docker
2. Open console and go to the root of this project
3. Make sure that no services are up (to avoid conflicts): `docker-compose down`
4. With a single command run all the services: `docker-compose up --build`