// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
'use strict';
'esversion:6';

const cluster = require('cluster');
var worker;
var name = 'app'

if (cluster.isMaster) {
	// Count the machine's CPUs
	var cpuCount = require('os').cpus().length;
	require('dns').lookup(require('os').hostname(), function (err, add, fam) {
		if (err) console.log(`can't start [${name}]: ${err}`);
	});
	// Create a worker for each CPU
	for (var i = 0; i < cpuCount; i += 1) {
		worker = cluster.fork();

		worker.on('message', (msg) => {
			switch (msg.type) {
				case 'register':
					worker.send({
						type: 'register',
						deviceId: msg.deviceId
					});
					break;
				case 'trap':
					worker.send({
						type: 'send2cloud',
						payload: msg.payload
					});
					break;
				default:
					break;
			}
		});
	}
	// Listen for dying workers
	cluster.on('exit', function () {
		cluster.fork();
	});
} else {
	require('./udpserver');
	require('./iothub_client');
}