var express = require('express');
var router = express.Router();
var connection = require('../connections/connection');
/*
 *  Routes to interact with Inventory table in local db
 */

/* get all parts from the inventory db 
   with the router this is actually localhost:8080/inventory/all */
   router.get('/all', function(req, res){
    let stmt = 'SELECT * FROM inventory';
    connection.query(stmt, function(err, result){
      if(err) throw err;
      res.send(result);
    })
  })

// Update part quantity
//localhost:8080/inventory/update/:id
//Request object has the url parameters
//req.body has the json
  router.put('/update/:id', function(req, res){
    let stmt = 'UPDATE inventory SET qty = ? WHERE part_number = ?';
    let id = req.params.id;
    connection.query(stmt, [req.body.qty, id], function(err, result){
      if(err) throw err;
      res.send('User updated successfully.');
    })
  });

  //subtract sold qty from current inventory
  router.put('/sold/:id', function(req, res){
    let stmt = 'UPDATE inventory SET qty = (inventory.qty - ?) WHERE part_number = ?';
    let id = req.params.id;
    connection.query(stmt, [req.body.qty, id], function(err, result){
      if(err) throw err;
      res.send(result);
    })
  });

  //get the inventory qty of a part by its number
  router.get('/qty/:id', function(req, res){
    let stmt = 'SELECT qty FROM inventory WHERE part_number = ?';
    let id = req.params.id;
    connection.query(stmt, id, function(err, result){
      if(err) throw err;
      res.send(result)
    })
  })


  module.exports = router;