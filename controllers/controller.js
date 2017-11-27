var express = require('express');
var router = express.Router();
var queries = require('');

router.get('/', function (req, res) {
    queries.show(function(data){
        console.log(data);
        var data1 = {
            burgerData: data
        }
        res.render('index', data1);
    });
});

router.post('/create', function (req, res) {
    queries.add(req.body.item, function(data) {
        res.redirect('/');
    });
});

router.post('/update', function(req, res){
  queries.eat(req.body.id, function(result){
    res.redirect('/');
  });
});

module.exports = router;