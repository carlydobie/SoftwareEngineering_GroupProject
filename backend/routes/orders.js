var express = require('express');
var router = express.Router();
var connection = require('../connections/connection');

router.get('/all', function (req, res, next) {
  res.send('hello world');
});

router.get('/TestGet', function (req, res) {
  let stmt = 'SELECT * FROM customer';
  connection.query(stmt, function (err, result) {
    if (err) throw err;
    res.json(result);
  })
})

module.exports = router;