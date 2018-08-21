# Smart Brain API
Project for Udemy course

## Set up the project
1. Clone this repository
2. Run `npm install`
3. Set up the environment variables
4. Run the backend by either:
   - running `npm start`, but be careful you need also to run the used services (Postgres, Redis) locally, OR:
   - using Docker instead manually starting the app

### How to set up the environment variables
Copy the file [.env.sample](./.env.sample) in the same path location, renaming it into `.env` and give the variables
your own values. In the sample file there are some variables' values preset as an example, where a connection to a
postgres database is set up on *localhost* (or can be written as *127.0.0.1*), with username *postgres* and no password (*empty*).
Additionally, the database name is *postgres* and the schema name is *smart_brain* (usually these two are not divided).
Few notes:
1. Make sure you use PostgreSQL for this code base (not MySQL).
2. If you don't need to specify the schema name in order to connect to the postgres database, then you can:
    - remove the line ` searchPath: [process.env.POSTGRES_SCHEMA_NAME, 'public'],` in [server.js](./server.js#L39) file;
    - remove the environment variable `POSTGRES_SCHEMA_NAME` and instead write the schema/database name directly in
`POSTGRES_DB_NAME` variable.
3. You can grab a free Clarifai API key [here](https://www.clarifai.com/)
(at least it is free at the moment when this is written) in order to connect to the Clarifai API, just by creating an account.
4. If running Redis separately (not inside a Docker container), regarding the value of the environment variable `REDIS_URI`,
which has been added because of Docker, by default locally it is not needed (according to docs: [.createClient()](./server.js#L43) can be with empty parameter
because by default *localhost* is set). So, the value of the environment variable in the `.env` file could be either empty
or *redis://127.0.0.1:6379* (I haven't tested neither of them). Of course, this implies having Redis installed and running locally.

### Using Docker Compose
1. Start/Run Docker
2. Open console and go to the root of this project
3. Make sure that no services are up (to avoid conflicts):
   - check if any: `docker ps`
   - shut all down: `docker-compose down`
   - or `docker stop <container-name>` to stop a specific service which is running in the background
4. With a single command run all the services: `docker-compose up --build`
5. How to access each service separately:
    - backend's bash: `docker-compose exec smart-brain-api bash`
    - postgres (adjust port number if needed): `psql postgres://<username>:<password>@localhost:5432/<database_name>` (the same values as in `.env`)
    - redis: `docker-compose exec redis redis-cli`
