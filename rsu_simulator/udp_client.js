// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
'use strict';
'esversion:6';

require('dotenv').config()
const util = require('../lib/util');
const dgram = require('dgram');
const client = dgram.createSocket('udp4');

const PORT = process.env.UDP_PORT;
const HOST = process.env.UDP_HOST;
const DID = process.env.DEVICE_ID
let register = JSON.stringify({
    'deviceID': DID
});
client.send(register, 0, register.length, PORT, HOST, (err, bytes) => {
    if (err) throw err;
    else {
        console.log(`${DID} registered`);
    }
});

const loop = () => {
    var message = util.encode(DID);

    client.send(message, 0, message.length, PORT, HOST, function (err, bytes) {
        if (err) throw err;
        console.log(`${message.length} bytes sent to ${HOST}:${PORT}`);
    });
};

setInterval(loop, process.env.TIMER);