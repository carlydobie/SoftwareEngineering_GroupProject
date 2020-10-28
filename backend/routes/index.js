var express = require('express');
var router = express.Router();
var connection = require('../connections/connection');

/*
 * We'll put all the routes related to our new DB in here...
 */

/* default for now */
router.get('/', function(req, res, next) {
  res.send('hello world');
});

/* get all from table in test db called foods, lol 
   we will have to make a script so that we all have the 
   same db on our own locals */
router.get('/all', function(req, res){
  let stmt = 'SELECT * FROM foods';
  connection.query(stmt, function(err, result){
    if(err) throw err;
    res.send(result);
  })
})

module.exports = router;
