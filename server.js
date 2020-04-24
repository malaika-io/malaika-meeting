const express = require('express');
const next = require('next');
const path = require('path');
const bcrypt = require('bcrypt');
const http = require('http');
const cookie = require('cookie');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const redis = require('redis');
const passport = require('passport');
const session = require('express-session');
const redisConnect = require("connect-redis");
const dotenv = require("dotenv");
dotenv.config();
const models = require('./models');
const redisClient = redis.createClient();
const RedisStore = redisConnect(session);
const SessionStore = new RedisStore({client: redisClient});
var LocalStrategy = require('passport-local').Strategy;
let sess = {
    store: SessionStore,
    secret: process.env["SESSION_SECRET"],
    resave: false,
    saveUninitialized: false,
    cookie: {
        path: '/'
    }
};

const dev = process.env.NODE_ENV !== 'production';
const app = next({dir: '.', dev});
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const expressApp = express();
    expressApp.use(bodyParser.json());
    expressApp.use(cookieParser());
    expressApp.use(session(sess));
    expressApp.use(passport.initialize());
    expressApp.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            let user = await models.User.findByPk(id, {
                attributes: {exclude: ['password']}
            });
            if (!user) {
                return done(new Error('user Not found'), null);
            }
            return done(null, user);
        } catch (e) {
            return done(e, null);
        }
    });

    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
        },
        async (email, password, done) => {
            const user = await models.User.findOne({
                where: {
                    email: email
                }
            });
            if (user && (await bcrypt.compare(password, user.password))) done(null, user);
            else done(null, false, {errors: {'email or password': 'is invalid'}})
        })
    );

    const restrictAccess = (req, res, next) => {
        if (!req.isAuthenticated()) return res.redirect("/login");
        next();
    };

    function extractUser(req) {
        if (!req.user) return null;
        const {
            email,
            first_name,
            last_name
        } = req.user;
        return {
            email,
            first_name,
            last_name
        };
    }

    expressApp.get("/api/user", async (req, res) => res.json({user: extractUser(req)}));
    expressApp.use("/profile", restrictAccess);
    expressApp.post('/api/users/login', (req, res) => {
        const user = req.body;
        if (!user.email) {
            return res.status(422).json({
                errors: {
                    email: 'is required',
                },
            });
        }

        if (!user.password) {
            return res.status(422).json({
                errors: {
                    password: 'is required',
                },
            });
        }

        return passport.authenticate('local', {session: false}, (err, passportUser, info) => {
            if (err) {
                if (err) return res.status(400).send('Une erreur s\'est produite lors de la création de votre compte');
            }
            if (passportUser) {
                req.logIn(passportUser, function (err) {
                    if (err) {
                        return res.status(422).json({
                            errors: {
                                password: 'is required',
                            },
                        });
                    }
                    res.json({user: user});
                });
            }
            return res.status(400).send(info);
        })(req, res, next);
    });
    const signup = require('./routes/signup');
    const logout = require('./routes/logout');
    expressApp.use('/api/users/signup', signup);
    expressApp.use('/api/users/logout', logout);

    expressApp.get('*', (req, res) => {
        return handle(req, res)
    });

    const server = http.createServer(expressApp).listen(3000, function () {
        console.log('Kurento expressApp started');
    });

    let clients = {};
    let candidatesQueue = {};
    let pipelines = {};
    const redisClient = redis.createClient();
    const redisStore = new RedisStore({client: redisClient});

    const io = require('socket.io')(server, {
        path: '/kurento',
        origins: '*:*',
        transports: ['websocket', 'polling']
    });

    io.use(function (socket, next) {
        const handshake = socket.request.headers.cookie;
        if (!handshake) return next(new Error('socket.io: no found cookie'), false);
        const parse_cookie = cookie.parse(handshake);
        const sessionId = cookieParser.signedCookie(parse_cookie['connect.sid'], process.env["SESSION_SECRET"]);
        try {
            return redisStore.load(sessionId, function (err, data) {
                if (data) {
                    const session = data['passport'];
                    if (!session) return next(new Error('socket.io: no found cookie'), false);
                    socket.user_id = session.user;
                    clients[session.user] = socket.id;
                    return next(null, true);
                } else {
                    return next(new Error('socket.io: no found cookie'), false);
                }
            });
        } catch (e) {
            return next(new Error('socket.io: no found cookie'), false);
        }
    });

    io.on("connection", (socket) => {
        console.log("New client connected", socket.user_id);
        const socketId = socket.id;
        console.log('socket', socketId);
        socket.on("disconnect", () => {
            console.log("Client disconnected");
        });

    });

});
