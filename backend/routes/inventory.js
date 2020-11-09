var express = require('express');
var router = express.Router();
var connection = require('../connections/connection');

/* get all parts from the inventory db 
   with the router this is actually localhost:8080/inventory/all */
   router.get('/all', function(req, res){
    let stmt = 'SELECT * FROM inventory';
    connection.query(stmt, function(err, result){
      if(err) throw err;
      res.send(result);
    })
  })

  module.exports = router;