// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
'use strict';
'esversion:6';
require('dotenv').config()
const util = require('../lib/util');

var Message = require('azure-iot-device').Message;
const Gateway = require('azure-iot-multiplexing-gateway').Gateway;
const gateway = new Gateway();
var devices = [];
var addDevicePromises = [];

const start_amqp_mux = async function () {
    //console.log('start mux: ' + process.pid)
    try {
        await gateway.open(process.env.HUB_CONNECTION_STRING);
    } catch (error) {
        console.log(`${name}: ${error}`);
    }
};

const register = async function (deviceId) {
    console.log(deviceId + ' registered')
    devices.push(deviceId);
    let p = gateway.addDevice(deviceId);
    addDevicePromises.push(p);
    try {
        await Promise.all(addDevicePromises);
    } catch (error) {
        console.log(`${name}: ${error}`);
    }
}

const sendTelemetry = async function (bsm) {
    let serializedBSM = JSON.stringify({ bsm })
    var message = new Message(serializedBSM);
    try {
        await gateway.sendMessage(bsm.bsmCoreData.id, message);
    } catch (error) {
        console.log(name + ': Could not send message to IoT Hub: ' + error);
    }
}

process.on('message', (msg) => {
    switch (msg.type) {
        case 'register':
            register(msg.deviceId)
            break;
        case 'send2cloud':
            sendTelemetry(util.decode(msg.payload))
            break;
        default:
            break;
    }
});

start_amqp_mux();