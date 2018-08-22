const jwt = require('jsonwebtoken');
require('dotenv').load();

const signToken = (email) => {
    const jwtPayload = {email}; // data to be included in the JWT
    return jwt.sign(jwtPayload, process.env.JWT_SECRET, {expiresIn: '2 days'});
};

const setToken = (key, value, redisClient) => { // key = token, value = userId
    return Promise.resolve(redisClient.set(key, value, 'EX', 60 * 60 * 2)); // expires in 2h
};

const createSession = (user, redisClient) => {
    // JWT token, return user data
    const {email, id} = user;
    const token = signToken(email);
    return setToken(token, id, redisClient)
        .then(() => {
            return {success: 'true', userId: id, token}
        })
        .catch(console.log);
};

module.exports = {
    createSession: createSession
};