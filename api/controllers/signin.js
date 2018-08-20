const jwt = require('jsonwebtoken');
const redis = require('redis');

// set up Redis:
const redisClient = redis.createClient(process.env.REDIS_URI);

const checkCredentials = (db, bcrypt, req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return Promise.reject("Incorrect form submission!");
    }
    return db.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);
            if (isValid) {
                return db.select('*').from('users')
                    .where('email', '=', email)
                    .then(user => user[0])
                    .catch(err => Promise.reject("Unable to get user!"))
            } else {
                Promise.reject("Wrong credentials!")
            }
        })
        .catch(err => Promise.reject("Wrong credentials!"))
};

const getAuthTokenId = (req, res) => {
    const {authorization} = req.headers;
    return redisClient.get(authorization, (err, reply) => {
        if (err || !reply) {
            return res.status(400).json("Unauthorized");
        }
        return res.json({id: reply});
    });
};

const signToken = (email) => {
    const jwtPayload = {email}; // data to be included in the JWT
    return jwt.sign(jwtPayload, 'JWT_SECRET', {expiresIn: '2 days'}); //TODO: Add environment variable for this!
};

const setToken = (key, value) => { // key = token, value = userId
    return Promise.resolve(redisClient.set(key, value));
};

const createSessions = (user) => {
    // JWT token, return user data
    const {email, id} = user;
    const token = signToken(email);
    return setToken(token, id)
        .then(() => {
            return {success: 'true', userId: id, token}
        })
        .catch(console.log);
};

const signinAuthentication = (db, bcrypt) => (req, res) => {
    // check if the authorization header is set by the client
    const {authorization} = req.headers;
    return authorization ? getAuthTokenId(req, res) :
        checkCredentials(db, bcrypt, req, res)
            .then(data => { // data <==> user
                return data.id && data.email ?
                    createSessions(data)
                    : Promise.reject(data); // good for debugging, not good to send data from DB to client
            })
            .then(session => res.json(session))
            .catch(err => res.status(400).json(err));
};

module.exports = {
    signinAuthentication: signinAuthentication
};
