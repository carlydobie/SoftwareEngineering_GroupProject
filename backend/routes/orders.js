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

module.exports = router;