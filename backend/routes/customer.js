var express = require('express');
var router = express.Router();
var connection = require('../connections/connection');

/*
 *  Routes to interact with customer table in db
 */

//get all customers
router.get('/all', function(req, res){
    let stmt = 'SELECT * FROM customer';
    connection.query(stmt, function(err, result){
      if(err) throw err;
      res.send(result);
    })
})

//get customer by name
router.post('/name', function(req, res){
    let stmt = 'SELECT * FROM customer WHERE name = ?';
    connection.query(stmt, req.body.name, function(err, result){
      if(err) throw err;
      res.send(result);
    })
})

//add a new customer
router.post('/add', function(req, res){
    let stmt = 'INSERT INTO customer SET ?';
    connection.query(stmt, req.body, function(err, result){
        if(err) throw err;
        res.sendStatus(201).send(result.insertId);
    })
})

  module.exports = router;