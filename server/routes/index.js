var router = require('express').Router();
var mongoose = require('mongoose');
module.exports = router;

router.get('/', function(req, res, next) {
  mongoose.model('List').find()
    .then(function(list) {
      res.json(list);
    })
    .then(null, next);
});

router.post('/', function(req, res, next) {
  mongoose.model('List').create(req.body)
    .then(function (item) {
      res.json(item);
    })
    .catch(function(err) {
      res.sendStatus(403);
    }, next);
});

router.delete('/:id', function(req, res, next) {
  mongoose.model('List').findByIdAndRemove(req.params.id)
    .then(function(item) {
      res.json(item);
    });
});

router.put('/:id', function(req, res, next) {
  mongoose.model('List').findByIdAndUpdate( req.params.id, { priority: req.body.priority }, { new: true })
    .then(function(updateItem) {
      res.json(updateItem);
    });
});
