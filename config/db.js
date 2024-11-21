"use strict";
const mysql = require("mysql2/promise");
const config = require("./config");

const mysqlPool = mysql.createPool(config);

module.exports = mysqlPool;
