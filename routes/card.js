var express = require('express');
var router = express.Router();

const smartcard = require('smartcard');
const Devices = smartcard.Devices;
const ReadRecordMultiple = require('../apdu_commands/ReadRecordMultiple');


router.get('/', function(req, res, next) {

    const devices = new Devices();

    devices.on('device-activated', event => {
        const currentDevices = event.devices;
        let device = event.device;
        console.log(`Device '${device}' activated, devices: ${currentDevices}`);
        for (let prop in currentDevices) {
            res.json(currentDevices[prop]);
            console.log("Devices: " + currentDevices[prop]);
        }

        device.on('card-inserted', event => {
            
            let card = event.card;
            console.log(`Card '${ card.getAtr()}' inserted into '${event.device}'`);

            card.on('command-issued', event => {
                console.log(`Command '${event.command}' issued to '${event.card}' `);
            });

            card.on('response-received', event => {
                console.log(`Response '${event.response}' received from '${event.card}' in response to '${event.command}'`);
            });

            const application = new Iso7816Application(card);
            application.selectFile([0x31, 0x50, 0x41, 0x59, 0x2E, 0x53, 0x59, 0x53, 0x2E, 0x44, 0x44, 0x46, 0x30, 0x31])
            .then(response => {
                console.info(`Select PSE Response: '${response}' '${response.meaning()}'`);
            }).catch(error => {
                console.error('Error:', error, error.stack);
            });

        });
        device.on('card-removed', event => {
            console.log(`Card removed from '${event.name}' `);
        });

    });

    devices.on('device-deactivated', event => {
        console.log(`Device '${event.device}' deactivated, devices: [${event.devices}]`);
    });
});

module.exports = router;