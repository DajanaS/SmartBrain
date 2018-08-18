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

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send(database.users)
});
app.post('/signin', signin.handleSignin(db, bcrypt));
app.post('/register', (req, res) => {
    register.handleRegister(req, res, db, bcrypt)
});
app.get('/profile/:id', (req, res) => {
    profile.handleProfileGet(req, res, db)
});
app.put('/image', (req, res) => {
    image.handleImage(req, res, db)
});
app.post('/imageurl', (req, res) => {
    image.handleApiCall(req, res)
});

app.listen(3000, () => {
    console.log('app is running on port 3000');
});
