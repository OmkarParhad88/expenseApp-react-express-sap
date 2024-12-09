'use strict';
const { PerformanceObserver, performance } = require('perf_hooks');
var util = require('util');
var hana = require('@sap/hana-client');

var connOptions = {
  serverNode: '@USER1UserKey',
  sslValidateCertificate: 'false',
};


var connection = hana.createConnection();

connection.connect(connOptions);

var sql = 'SELECT TITLE, FIRSTNAME, NAME FROM HOTELS.CUSTOMER;';
var t0 = performance.now();
var result = connection.exec(sql);
console.log(util.inspect(result, { colors: false }));
var t1 = performance.now();
console.log("time in ms " + (t1 - t0));
connection.disconnect();
