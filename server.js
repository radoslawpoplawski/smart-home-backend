const dbConfig = require('./config/environment');
const mysql = require('mysql');
const Gpio = require('onoff').Gpio;
const dhtSensor = require('node-dht-sensor');
const pinoutConfig = {
  dhtIn: 4,
  dhtOut: 26
};

dhtSensor.read(22, pinoutConfig.dhtIn, (error, temperature, humidity) => {
  if (error) {
    console.log('error dht in');
    return;
  }
  console.log('temp-in', temperature.toFixed(1) + ' C');
  console.log('humi-in', humidity.toFixed(1) + ' %');
});

let con = mysql.createConnection(dbConfig);

con.connect(error => {
  if (error) {
    throw error;
  }
  con.query('SELECT * FROM users', (error, result) => {
    if (error) {
      throw error;
    }
    console.log('users', JSON.stringify(result[0]));
  })
});