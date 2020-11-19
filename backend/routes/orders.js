var express = require('express');
var router = express.Router();
var connection = require('../connections/connection');

router.get('/all', function (req, res, next) {
  res.send('hello world');
});

router.get('/GetCustomerOrders', function (req, res) {
  let columns = 'o.order_number, o.status, o.ord_date, c.name, c.address, c.email';
  let stmt = 'SELECT ' + columns + ' FROM orders o, customer c WHERE c.customer_number = o.customer_number';
  connection.query(stmt, function (err, result) {
    if (err) throw err;
    res.json(result);
  })
})

router.get('/PartsInOrder/:orderNumber', function (req, res) {
  let columns = 'po.order_number, po.part_number, i.description, po.qty';
  let stmt = 'SELECT ' + columns + ' FROM orders o, inventory i, prod_ordered po '
  + 'WHERE o.order_number = po.order_number AND i.part_number = po.part_number AND o.order_number = ?'
  
  connection.query(stmt, req.params.orderNumber, function(err, result) {
        if (err) throw err;
        res.json(result);
  })
})

//Join between custuomer table and order table. Same as above but has total price!
router.get('/GetCustomerOrdersPrice', function (req, res) {
  let columns = 'o.order_number, o.status, o.ord_date, o.total, c.name, c.address, c.email ';
  let stmt = 'SELECT ' + columns + ' FROM orders o, customer c WHERE c.customer_number = o.customer_number';
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

router.post('/UpdateOrderStatus/:orderNumber', function(req, res) {
  console.log(req.params.orderNumber)
  let stmt = 'UPDATE Orders SET status = \'shipped\' WHERE order_number = ?'
  connection.query(stmt, req.params.orderNumber, function(err, result) {
    if(err) throw err;
    res.json(result);
  })
})

module.exports = router;
