const redis = require('redis');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
require('dotenv').load();

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const auth = require('./middlewares/authorization');

const app = express();

app.listen(3000, () => {
    console.log('app is running on port 3000');
});


/* Define databases */

let db;
if (process.env.POSTGRES_URI) {
    db = knex({
        client: 'pg',
        connection: process.env.POSTGRES_URI
    });
} else {
    db = knex({
        client: 'pg',
        connection: {
            host: process.env.POSTGRES_HOST,
            user: process.env.POSTGRES_USERNAME,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB_NAME
        },
        searchPath: [process.env.POSTGRES_SCHEMA_NAME, 'public'],
    });
}

const redisClient = redis.createClient(process.env.REDIS_URI);


/* Define middlewares */

app.use(cors());

app.use(bodyParser.json());

/* Define endpoints */

app.get('/', (req, res) => {
    res.send("Welcome!")
});

app.post('/signin', signin.signinAuthentication(db, bcrypt, redisClient));

app.post('/register', (req, res) => {
    register.handleRegister(req, res, db, bcrypt, redisClient)
});

app.get('/profile/:id', auth.requireAuth, (req, res) => {
    profile.handleProfileGet(req, res, db)
});

app.post('/profile/:id', auth.requireAuth, (req, res) => {
    profile.handleProfileUpdate(req, res, db)
});

app.put('/image', auth.requireAuth, (req, res) => {
    image.handleImage(req, res, db)
});

app.post('/imageurl', auth.requireAuth, (req, res) => {
    image.handleApiCall(req, res)
});
