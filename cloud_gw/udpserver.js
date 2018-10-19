// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
'use strict';
'esversion:6';

require('dotenv').config()
const Ber = require("asn1-ber").Ber
const dgram = require('dgram');
const server = dgram.createSocket('udp4');

const PORT = process.env.UDP_PORT;
const HOST = process.env.UDP_HOST;

server.bind({
    address: '0.0.0.0',
    port: settings.ports.udp_raw_d2c
});

server.on('listening', function () {
    var address = server.address();
    console.log('gateway started on: ' + address.port)

    //console.log('listener #' + process.pid + ' on: ' + address.address);
});

server.on('message', function (msg, remote) {
    console.log(`${msg.length} bytes receive from ${remote.address}:${remote.port}`);

    if (msg[0] == 123) {
        let did = JSON.parse(msg.toString()).deviceID;
        process.send({
            type: 'register',
            deviceId: did
        });
    } else
    {
        var reader = new Ber.Reader(msg);
        var tagArray = [];
        reader.readSequence();
        var berType = reader.peek();

        do {
            switch (berType) {
                case Ber.Boolean:
                    tagArray.push(reader.readBoolean());
                    break;
                case Ber.Integer:
                    tagArray.push(reader.readInt());
                    break;
                case Ber.OctetString:
                    tagArray.push(reader.readString());
                    break;
            }
            berType = reader.peek();
        } while (berType !== null);
        tagArray.push(msg)
        process.send({
            type: 'trap',
            payload: tagArray
        });
    }
});