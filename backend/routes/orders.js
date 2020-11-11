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

//route to add a new order to orders table
router.post('/add', function(req, res){
  let stmt = 'INSERT INTO orders SET ?';
  connection.query(stmt, req.body, function(err, result){
      if(err) throw err;
      res.status(201).send(result.insertId.toString());
  })
})

//route parts to the prods ordered table
router.post('/parts', function(req, res){
  let stmt = 'INSERT INTO prod_ordered SET ?';
  connection.query(stmt, req.body, function(err, result){
      if(err) throw err;
      res.status(201).send(result.insertId.toString());
  })
})



module.exports = router;