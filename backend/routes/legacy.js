var express = require('express');
var router = express.Router();
var legacy = require('../connections/legacy');

/*
 * We'll put all the routes related to the legacy DB in here...
 */

/* default index for legacy... */
router.get('/', function(req, res, next) {
  res.send('hello legacy');
});

/* get all parts from the legacy db 
   with the router this is actually localhost:8080/legacy/all */
router.get('/all', function(req, res){
  let stmt = 'SELECT * FROM parts';
  legacy.query(stmt, function(err, result){
    if(err) throw err;
    res.send(result);
  })
})

module.exports = router;