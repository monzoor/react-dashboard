const fs = require('fs');
const jsonServer = require('json-server');
const pause = require('connect-pause');
const jwt = require('jsonwebtoken');
const passwordHash = require('password-hash');
require('dotenv').config();
// const axios = require('axios');

const middlewares = jsonServer.defaults();

const server = jsonServer.create();
const router = jsonServer.router('./fake-api/database.json');

server.use(jsonServer.bodyParser);
server.use(middlewares);


const SECRET_KEY = '123456789';

const expiresIn = '1h';

// Create a token from a payload
function createToken(payload) {
    return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Verify the token
function verifyToken(token) {
    return jwt.verify(token, SECRET_KEY, (err, decode) => (decode !== undefined ? decode : err));
}

// Check if the user exists in database
function isAuthenticated({ email, password }, getIndex, newUser) {
    const userdb = JSON.parse(fs.readFileSync('./fake-api/database.json', 'UTF-8'));
    const index = userdb.users.findIndex(user => user.email === email);

    if (newUser && index !== -1) {
        return true;
    }

    if (index !== -1 && passwordHash.verify(password, userdb.users[index].password)) {
        if (getIndex) {
            return {
                name: userdb.users[index].name,
                email: userdb.users[index].email,
            };
        }
        return true;
    }
    console.log('00000');
    return false;
}
server.use(pause(process.env.SERVER_DELAY));
server.post('/auth/login', (req, res) => {
    const { email, password } = req.body;
    if (!isAuthenticated({ email, password })) {
        const status = 401;
        const message = 'Incorrect email or password';
        res.status(status).json({ status, message });
        return;
    }

    const accessToken = createToken(isAuthenticated({ email, password }, true));
    res.status(200).json({ accessToken });
});

server.use(/^(?!\/auth).*$/, (req, res, next) => {
    // let { password } = req.body;
    req.body.password = passwordHash.generate(req.body.password);
    const { email, password } = req.body;
    const publicRoute = (req.originalUrl === '/users' && req.method === 'POST');
    if (publicRoute && isAuthenticated({ email, password }, false, true)) {
        const status = 409;
        const message = 'Account already exists';
        res.status(status).json({ status, message });
        return;
    }
    if (!publicRoute && (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer')) {
        const status = 401;
        const message = 'Error in authorization format';
        res.status(status).json({ status, message });
        return;
    }
    try {
        if (!publicRoute) {
            verifyToken(req.headers.authorization.split(' ')[1]);
        }
        next();
    } catch (err) {
        const status = 401;
        const message = 'Error accessToken is revoked';
        res.status(status).json({ status, message });
    }
});


server.use(router);

const potNumber = 5555;
server.listen(potNumber, () => {
    console.log(`Run Auth API Server at port: http://localhost:${potNumber}`);
});
