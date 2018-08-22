const sessionManagement = require('../session_management/createSession');

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

const handleRegister = (req, res, db, bcrypt, redisClient) => {
    const {email, name, password} = req.body;
    return (!email || !name || !password) ? res.status(400).json('Incorrect form submission!') :
        saveUser(db, bcrypt, req, res)
            .then(data => {
                return data.id && data.email ?
                    sessionManagement.createSession(data, redisClient)
                    : Promise.reject(data);
            })
            .then(session => res.json(session))
            .catch(err => res.status(400).json(err));
};

module.exports = {
    handleRegister: handleRegister
};
