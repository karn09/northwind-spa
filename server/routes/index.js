var router = require('express').Router();
var List = require('../db/models').List;
var mongoose = require('mongoose');//I don't like the mongoose dependence
//your route should be dependent on models, it shouldn't have to know to look at mongoose for the models
module.exports = router;

router.get('/', function(req, res, next) {
  List.find()
    .then(function(list) {
      res.json(list);
    })
    .catch(next);//be consistent
});

router.post('/', function(req, res, next) {
  List.create(req.body)
    .then(function (item) {
      res.json(item);
    })
    .catch(function(err) {
      next(new Error({status: 402});//let your error handler do some work
    });
});

router.delete('/:id', function(req, res, next) {
  List.findByIdAndRemove(req.params.id)
    .then(function(item) {
      res.json(item);
    }, next);
});

router.put('/:id', function(req, res, next) {
  List.findByIdAndUpdate( req.params.id, { priority: req.body.priority }, { new: true })
    .then(function(updateItem) {
      res.send(updateItem);
    }, next);
});
