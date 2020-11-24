var express = require("express");
var mysql = require("mysql");

//connection object for legacy parts DB
var legacy = mysql.createConnection({
    host: 'blitz.cs.niu.edu',
    user: 'student',
    password: 'student',
    port: 3306,
    database: 'csci467'
  });

  //connect to the db
  legacy.connect(function (err) {
    if(err){
      console.log('Error connecting: ', err);
      return;
    }
    console.log("Legacy Connected");
  });

  module.exports = legacy;