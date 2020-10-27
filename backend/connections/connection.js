var express = require("express");
var mysql = require("mysql");

//connection to new local db, will have to
//set up your XAMPP to run mysql on port 3308
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    port: 3308,
    database: 'test'
  });

  connection.connect(function (err) {
    if(err){
      console.log('Error connecting: ', err);
      return;
    }
    console.log("Test Connected");
  });

  module.exports = connection;