var express = require("express");
var mysql = require("mysql");

//connection object for local database
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    port: 3308,
    database: 'test'
  });

  //connect to the local bd
  connection.connect(function (err) {
    if(err){
      console.log('Error connecting: ', err);
      return;
    }
    console.log("Test Connected");
  });

  module.exports = connection;