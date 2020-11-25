var express = require('express');
var router = express.Router();
var connection = require('../connections/connection');

/*
 * Default Routes
 */

/* default for now */
router.get('/', function(req, res, next) {
  res.send('hello world');
});

module.exports = router;
