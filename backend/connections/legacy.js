var express = require("express");
var mysql = require("mysql");

//connection to legacy parts DB
//only works thru NIU VPN right now
var legacy = mysql.createConnection({
    host: 'blitz.cs.niu.edu',
    user: 'student',
    password: 'student',
    port: 3306,
    database: 'csci467'
  });

  legacy.connect(function (err) {
    if(err){
      console.log('Error connecting: ', err);
      return;
    }
    console.log("Legacy Connected");
  });

  module.exports = legacy;