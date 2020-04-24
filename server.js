const express = require('express');
const next = require('next');
const path = require('path');
const bcrypt = require('bcrypt');
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

    passport.use(
        new LocalStrategy(
            {usernameField: 'email', passReqToCallback: true},
            async (req, email, password, done) => {
                const user = await models.User.findOne({
                    where: {
                        email: email
                    }
                });
                if (user && (await bcrypt.compare(password, user.password))) done(null, user);
                else done(null, false)
            }
        ),
    );

    // 6 - you are restricting access to some routes
    const restrictAccess = (req, res, next) => {
        if (!req.isAuthenticated()) return res.redirect("/login");
        next();
    };

    server.use("/profile", restrictAccess);


    function extractUser(req) {
        console.log('req')
        if (!req.user) return null;
        const {
            email,
        } = req.user;
        return {
            email
        };
    }

    server.get("/api/user", async (req, res) => res.json({user: extractUser(req)}));

    const signup = require('./routes/signup');
    const logout = require('./routes/logout');

    server.get('/api/users/login', (req, res) => {
        passport.authenticate('local'), (req, res) => {
            res.json({user: extractUser(req)});
        }
    });
    server.use('/api/users/signup', signup);
    server.get('/api/users/logout', logout);


    server.get('*', (req, res) => {
        return handle(req, res)
    });


    const PORT = process.env.PORT || 3000;

    server.listen(PORT, (err) => {
        if (err) throw err
        console.log(`> Read on http://localhost:${PORT}`)
    });
});
