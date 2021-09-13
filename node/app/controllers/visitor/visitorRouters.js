var express = require('express');
var routes = express.Router();
var bodyParser = require('body-parser');
const visitorRepo = require('./visitorRepo');
const cors = require('cors');
const jwt = require('jsonwebtoken');
routes.use(cors());

routes.use(bodyParser.json());
routes.post('/register/visitor', (req, res) => {
    //  console.log(req.body)
    visitorRepo.createVisitor(req.body).then((data) => {
        res.json({ message: 'User registered successfully' })
    }).catch(err => {
        console.log(err);
        res.json({ message: 'Can\'t register user ' })
    })
})

routes.post('/login', (req, res) => {
    visitorRepo.findByMobileNo(req.body).then((data) => {
        if (!data || data.length == 0) {
            res.sendStatus(401);
        }
        var token = jwt.sign({ id: data[0].id }, process.env.SECRET_KEY, { expiresIn: '1800s' });
        res.json({ accessToken: token, name: data[0].name })
    }).catch(err => {
        console.log(err);
        res.json({ message: 'Login failed' })
    })
})

module.exports = routes;
