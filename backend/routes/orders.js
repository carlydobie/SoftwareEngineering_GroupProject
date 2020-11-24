var express = require('express');
var router = express.Router();
var connection = require('../connections/connection');
/*
 *  Routes to interact with Orders table in local db
 */

//get all the orders with the customer details
router.get('/GetCustomerOrders', function (req, res) {
  let columns = 'o.order_number, o.status, o.ord_date, c.name, c.address, c.email';
  let stmt = 'SELECT ' + columns + ' FROM orders o, customer c WHERE c.customer_number = o.customer_number';
  connection.query(stmt, function (err, result) {
    if (err) throw err;
    res.json(result);
  })
})

//get the parts ordered in a particular order (warehouse version)
router.get('/PartsInOrder/:orderNumber', function (req, res) {
  let columns = 'po.order_number, po.part_number, i.description, po.qty';
  let stmt = 'SELECT ' + columns + ' FROM orders o, inventory i, prod_ordered po '
  + 'WHERE o.order_number = po.order_number AND i.part_number = po.part_number AND o.order_number = ?'
  
  connection.query(stmt, req.params.orderNumber, function(err, result) {
        if (err) throw err;
        res.json(result);
  })
})

//Join between custuomer table and order table. Same as above but has total price
//and gets orders between date and price ranges (admin version)
router.post('/GetCustomerOrdersPrice', function (req, res) {
  let columns = 'o.order_number, o.status, o.ord_date, o.total, c.name, c.address, c.email ';
  let stmt = 'SELECT ' + columns + ' FROM orders o, customer c WHERE c.customer_number = o.customer_number AND o.ord_date BETWEEN ? AND ? AND o.total BETWEEN ? AND ?';
  connection.query(stmt, [req.body.fromDate, req.body.toDate, req.body.minPrice, req.body.maxPrice], function (err, result) {
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

//route to add parts to the products ordered table
router.post('/parts', function(req, res){
  let stmt = 'INSERT INTO prod_ordered SET ?';
  connection.query(stmt, req.body, function(err, result){
      if(err) throw err;
      res.status(201).send(result.insertId.toString());
  })
})

//route to update the status of an order once it has shipped
router.post('/UpdateOrderStatus/:orderNumber', function(req, res) {
  console.log(req.params.orderNumber)
  let stmt = 'UPDATE Orders SET status = \'shipped\' WHERE order_number = ?'
  connection.query(stmt, req.params.orderNumber, function(err, result) {
    if(err) throw err;
    res.json(result);
  })
})

module.exports = router;
