const express = require('express');
const next = require('next');
const path = require('path');
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
    const server = express();
    server.use('/images', express.static(path.join(__dirname, 'images'), {
        maxAge: dev ? '0' : '365d'
    }));

    server.use(bodyParser.json());
    server.use(cookieParser());
    server.use(session(sess));
    server.use(passport.initialize());
    server.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            let user = await models.User.findByPk(id, {
                attributes: {exclude: ['password']},
                include: [models.Room]
            });
            if (!user) {
                return done(new Error('user Not found'), null);
            }
            return done(null, user);
        } catch (e) {
            return done(e, null);
        }
    });

    // 6 - you are restricting access to some routes
    const restrictAccess = (req, res, next) => {
        if (!req.isAuthenticated()) return res.redirect("/login");
        next();
    };

    server.use("/profile", restrictAccess);
    server.use("/share-thought", restrictAccess);

    /*const login = require('./routes/login');
    const signup = require('./routes/signup');
    const logout = require('./routes/logout');

    server.use('/login', login);
    server.use('/signup', signup);
    server.use('/logout', logout);*/


    server.get('*', (req, res) => {
        return handle(req, res)
    });


    const PORT = process.env.PORT || 3000;

    server.listen(PORT, (err) => {
        if (err) throw err
        console.log(`> Read on http://localhost:${PORT}`)
    });
});
