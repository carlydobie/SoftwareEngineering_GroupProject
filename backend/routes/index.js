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
    res.json(result);
  })
})

/*
 * example post
 *
 * where req.body is some json like:
 *      {
	        "food_id": 6,
	        "name": "chicken",
          "meal": "dinner",
          "fave": 1
        }
 */
router.post('/add', function(req, res){
  let stmt = 'INSERT INTO foods SET ?';
  connection.query(stmt, req.body, function(err, result){
    if(err) throw err;
    res.sendStatus(201).send(result.insertId);
  })
});

module.exports = router;
