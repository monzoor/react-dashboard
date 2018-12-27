const fs = require('fs');
const jsonServer = require('json-server');
const express = require('express');
const path = require('path');
const pause = require('connect-pause');
const jwt = require('jsonwebtoken');
const passwordHash = require('password-hash');
const multer = require('multer');
const uniqid = require('uniqid');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5000;

require('dotenv').config();

// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });

} else {
    const middlewares = jsonServer.defaults();

    const server = jsonServer.create();
    const router = jsonServer.router('./server/database.json');
    server.use('/api/img', express.static(path.join(__dirname, 'public/uploads')));
    server.use(express.static(path.resolve(__dirname, '../dashboard/build')));

    server.use(jsonServer.bodyParser);
    server.use(middlewares);


    const SECRET_KEY = '123456789';
    const expiresIn = '5h';

    // const upload = multer({ dest: 'uploads/' });

    const storage = multer.diskStorage({
        destination(req, file, cb) {
            cb(null, './server/public/uploads/');
        },
        filename(req, file, cb) {
            cb(null, `${new Date().getTime()}_${uniqid()}.jpg`);
        },
    });

    const fileFilter = (req, file, cb) => {
        // reject a file
        if (file.mimetype === 'image/jpeg') {
            cb(null, true);
        } else {
            cb(new Error('type unmatched'), false);
        }
    };

    const upload = multer({
        storage,
        limits: {
            fileSize: 1024 * 1024 * 10, // 10MB
        },
        fileFilter,
    // }).single('productImage');
    }).array('productImage', 1000);

    // Create a token from a payload
    function createToken(payload) {
        return jwt.sign(payload, SECRET_KEY, { expiresIn });
    }

    // Verify the token
    function verifyToken(token) {
        const verifyStatus = jwt.verify(token, SECRET_KEY, (err, decode) => (decode !== undefined ? decode : err));
        if ('message' in verifyStatus) throw verifyStatus;
        return verifyStatus;
    }

    // Check if the user exists in database
    function isAuthenticated({ email, password }, getIndex, newUser) {
        const userdb = JSON.parse(fs.readFileSync('./server/database.json', 'UTF-8'));
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
        return false;
    }
    server.use(pause(process.env.SERVER_DELAY));
    server.post('/api/auth/login', (req, res) => {
        const { email, password } = req.body;
        if (!isAuthenticated({ email, password })) {
            const status = 401;
            const message = 'Incorrect email or password';
            res.status(status).json({ status, message });
            return;
        }

        const accessToken = createToken(isAuthenticated({ email, password }, true));
        // Token tester

        // invalid token
        // const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
        // experied token
        // const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGFtYWwiLCJlbWFpbCI6Im1vbkBkZC5jb20iLCJpYXQiOjE1NDA2NjEyODYsImV4cCI6MTU0MDY2NDg4Nn0.YeiM6jHNnJFF9MeOCjEYFgqpEEnN0GPrCw3YwSPenBo';
        res.status(200).json({ accessToken });
    });
    server.post('/api/users', (req, res, next) => {
        req.body.password = passwordHash.generate(req.body.password);
        const { email, password } = req.body;
        if (isAuthenticated({ email, password }, false, true)) {
            const status = 409;
            const message = 'Account already exists';
            res.status(status).json({ status, message });
            return;
        }
        next();
    });

    server.post('/api/upload', (req, res) => {
        if (typeof verifyToken(req.headers.authorization) !== 'object') {
            const status = 401;
            const message = 'Unauthorised';
            res.status(status).json({ status, message });
        }
        // upload.array('productImage', 2)
        upload(req, res, (err) => {
            if (err) {
                const status = 415;
                const message = `Error to upload file ${err}`;
                res.status(status).json({ status, message });
            } else {
                const status = 200;
                const uploadedData = req.files.map(data => ({
                    uid: data.filename.replace('.jpg', ''),
                    name: data.originalname,
                    status: 200,
                    url: `/api/img/${data.filename}`,
                }));
                res.status(status).json(uploadedData[0]);
            }
        });
    });

    // server.use(/^(?!\/auth).*$/, (req, res, next) => {
    server.use(/^(\/api).*$/, (req, res, next) => {
        const publicRoute = (req.originalUrl === '/api/users' && req.method === 'POST');
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

    server.get('*', (request, response) => {
        response.sendFile(path.resolve(__dirname, '../dashboard/build', 'index.html'));
    });
    server.use('/api', router);

    server.listen(PORT, () => {
        console.error(`Node ${isDev ? 'dev server' : 'cluster worker '+process.pid}: listening on port ${PORT}`);
    });
}
