var express = require('express');
const QRCode = require('qrcode');
var routes = express.Router();
var bodyParser = require('body-parser');
const socityRepo = require('./socityRepo');

routes.use(bodyParser.json());

routes.post("/register/society", (req, res) => {
    socityRepo.createSociety(req.body).then((result) => {
        res.json({message: result});
    }).catch((err) => {
        console.log(err);
        res.json({message: 'Unable to create socity'});
    });
});

routes.get("/find/society", (req, res) => {
    socityRepo.findAll().then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
        res.json({});
    });
});

routes.get("/find/qrcode/society/:id", (req, res) => {
    socityRepo.findSocityById(req.params.id).then((result) => {
        
        if(!result || result.length == 0) {
            res.send("Error")
        }
        let stringdata = JSON.stringify(result)
        QRCode.toDataURL(stringdata, function (err, url) { //base64
            if(err)  {
                console.log(err)
                res.send("Error")
            }
            res.header("Content-Type", )
            res.send(url);
         })
    }).catch((err) => {
        console.log(err);
        res.json({error: "Something went wrong"});
    });
});


module.exports = routes;