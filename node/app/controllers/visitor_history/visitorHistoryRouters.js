var express = require('express');
var routes = express.Router();
var bodyParser = require ('body-parser');
var jwt = require('jsonwebtoken');
var historyRepo = require('./visitorHistoryRepo');
const cors = require('cors');
const auth = require('../../auth/authentication');
routes.use(cors());

routes.use(auth);
routes.use(bodyParser.json());

routes.post('/log/entry', (req,res)=>{
    //console.log(req.body);
    historyRepo.createVisitorHistory(req.body.society, req.userId, req.body.isLogin).then(() => {
        res.send("success");
    }).catch(err => {
        res.send("failure");
    });
});

routes.get('/view/user/entries', (req,res)=>{
    historyRepo.findUserLogHistory(req.userId).then((data) => {
        res.json(data);
    }).catch(err => {
        console.log(err);
        res.json([]);
    });
})

module.exports = routes;