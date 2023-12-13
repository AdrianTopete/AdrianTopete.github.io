const resources = require('./../../resources/model');
const sensorDriver = require('node-dht-sensor');

let interval, sensor;
const device = resources.pi.sensors.dht;
let localParams = {'frequency': 2000};

function connectHardware(){
	sensor = {
    initialize: function(){
        // initialize function body
        sensorDriver.initialize(device.model,device.gpio)
    },
    read: function(){
        // read function body
        readout = sensorDriver.read(); 
        device.temperature.value = parseFloat(readout.temperature);
        device.humidity.value = parseFloat(readout.humidity);
    }
}
	sensor.initialize();
	sensor.read();
	interval = setInterval(function () {
  sensor.read();}, localParams.frequency);
}

function start(params){
	localParams = params ? params : localParams;
	connectHardware(); 
	}
	
function stop(){
	clearInterval(interval);
	}

exports.start = start; 
exports.stop = stop; 
