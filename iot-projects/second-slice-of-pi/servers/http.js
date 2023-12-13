
const express = require('express'),
	cors = require('cors');
	
var sensorRoutes = require('./../routes/sensors');
var actuatorRoutes = require('./../routes/actuators');

var app = express();
app.use(cors()); 
app.use('/pi/sensors', sensorRoutes);
app.use('/pi/actuators', actuatorRoutes);
app.get('/', function(req, res){
   res.send('root accessed');
});
app.get('/pi', function(req, res){
   res.send('gateway accessed');
});
//I have looked through all files'

module.exports = app;

