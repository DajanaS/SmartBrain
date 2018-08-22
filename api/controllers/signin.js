const sessionManagement = require('../session_management/createSession');

const checkCredentials = (db, bcrypt, req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return Promise.reject("Incorrect form submission!");
    }
    return db.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);
            return isValid ? db.select('*').from('users')
                    .where('email', '=', email)
                    .then(user => user[0])
                    .catch(err => Promise.reject("Unable to get user!")) :
                Promise.reject("Wrong credentials!")
        })
        .catch(err => Promise.reject("Wrong credentials!"))
};

const getAuthTokenId = (req, res, redisClient) => {
    const {authorization} = req.headers;
    return redisClient.get(authorization, (err, reply) => {
        if (err || !reply) {
            return res.status(400).json("Unauthorized");
        }
        return res.json({id: reply});
    });
};

const signinAuthentication = (db, bcrypt, redisClient) => (req, res) => {
    // check if the authorization header is set by the client
    const {authorization} = req.headers;
    return authorization ? getAuthTokenId(req, res, redisClient) :
        checkCredentials(db, bcrypt, req, res)
            .then(data => { // data <==> user
                return data.id && data.email ?
                    sessionManagement.createSession(data, redisClient)
                    : Promise.reject(data); // good for debugging, not good to send data from DB to client
            })
            .then(session => res.json(session))
            .catch(err => res.status(400).json(err));
};

module.exports = {
    signinAuthentication: signinAuthentication
};
