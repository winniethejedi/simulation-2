const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const massive = require('massive');

require('dotenv').config();

const app = express();

massive(process.env.CONNECTION_STRING)
    .then((db)=>{
        console.log('The server is connected to Massive');
        app.set('db', db);
    })
    .catch(err => {
        console.warn('Failed to connect to Massive:');
        console.error(err);
    });

app.use(cors());
app.use(bodyParser.json());

app.use(session({
    name: 'houser',
    secret: process.env.SESSION_SECRET,
    cookie: {
        //days hours minutes seconds milseconds
        expires:  5 * 24 * 60 * 60 *1000,
    },
    saveUninitialized: false,
    rolling: true,
    resave: false,
}));

app.use(express.static(path.join(__dirname, 'client/build')));

app.use(checkDb());

app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    
    req.db.users.findOne({ email, password })
        .then(user => {
            if (!user) {
                return res.status(401).send({ success: false, message: 'it didnt work' });
            }
            req.session.user = user.id;
            res.send({ success: true, message: 'Logged in successfully' });
        })
        .catch(handleDbError(res));
});

app.post('/api/auth/register', (req, res) => {
    const { email, password } = req.body;
    
    req.db.users.insert({ email, password })
        .then(user => {
            req.session.user = user.id;
            console.log(req.session.user)
            res.send({ success: true, message: 'logged in successfully' });
        })
        .catch(handleDbError(res));
});

app.post('/api/auth/logout', (req, res) => {
    req.session.destroy();
});

app.post('/api/properties', (req, res) => {
    const id = {user_id: req.session.user}
    const allPropertyInfo = {
        ...id,
        ...req.body,
    }
    req.db.properties.insert(allPropertyInfo)
        .then(user => {
            res.send(user);
        })
        .catch(handleDbError(res));
});

app.get('/api/properties', (req, res) => {
    let filter;
    if (req.query.filter === '') {
        filter = 0;
    }
    else {
        filter = parseInt(req.query.filter, 10);
    }
    req.db.properties.find({
        'desired_rent >=': filter,
        user_id: req.session.user
    })
    .then(properties => {
        res.send(properties);
    })
    .catch(handleDbError(res));
});

app.delete('/api/properties/:id', (req, res) => {
    let property;

    req.db.properties.findOne({id: req.params.id})
        .then(deletedProperty => {
            property = deletedProperty;
            return req.db.properties.destroy({id: req.params.id});
        })
        .then(() => {
            res.send(property);
        })
        .catch(handleDbError(res));
});

const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log('this port is awesome', port)
});

function checkDb() {
    return (req, res, next) => {
        const db = app.get('db');
        
        if (db) {
            req.db = db;
            next();
        }
        else {
            res.status(500).send({ message: 'this died' });
        }
    };
}

function handleDbError(res) {
    return (err) => {
        console.warn('hit a snag');
        console.error(err);
        
        if (err.code == 'ECONNRESET') {
            return res.status(500).send({ message: 'something died again' });
        }
        if (err.code == '22P02') {
            res.status(422).send({ message: 'The request had incorrect or missing properties: ' + err.message });
        }
        res.status(500).send({ message: 'Internal Server Error' })
    };
}
