var express = require('express');
var router = express.Router();

const smartcard = require('smartcard');
const Devices = smartcard.Devices;
const devices = new Devices();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  devices.on('device-activated', (event => {
    console.log(`Device '${event.device}' activated`);
    event.devices.map((device, index) => {
      console.log(`Device #${index + 1}: '${device.name}'`);
    });
  }));

  
});

module.exports = router;
