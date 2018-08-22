const jwt = require('jsonwebtoken');

const saveUser = (db, bcrypt, req, res) => {
    const {email, name, password} = req.body;
    const hash = bcrypt.hashSync(password);
    return db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .returning('*')
                    .insert({
                        email: loginEmail[0],
                        name: name,
                        joined: new Date()
                    })
                    .then(user => user[0])
            })
            .then(trx.commit)
            .catch(trx.rollback)
    })
        .catch(err => Promise.reject('Unable to register!'))
};

const signToken = (email) => {
    const jwtPayload = {email}; // data to be included in the JWT
    return jwt.sign(jwtPayload, 'JWT_SECRET', {expiresIn: '2 days'}); //TODO: Add environment variable for this!
};

const setToken = (key, value, redisClient) => { // key = token, value = userId
    return Promise.resolve(redisClient.set(key, value, 'EX', 60 * 60 * 2)); // expires in 2h
};

const createSession = (user, redisClient) => {
    // JWT token, return user data
    const {id, email} = user;
    const token = signToken(email);
    return setToken(token, id, redisClient)
        .then(() => {
            return {success: 'true', userId: id, token}
        })
        .catch(console.log);
};

const handleRegister = (req, res, db, bcrypt, redisClient) => {
    const {email, name, password} = req.body;
    return (!email || !name || !password) ? res.status(400).json('Incorrect form submission!') :
        saveUser(db, bcrypt, req, res)
            .then(data => {
                return data.id && data.email ?
                    createSession(data, redisClient)
                    : Promise.reject(data);
            })
            .then(session => res.json(session))
            .catch(err => res.status(400).json(err));
};

module.exports = {
    handleRegister: handleRegister
};
