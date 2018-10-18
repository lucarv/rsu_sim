var client;
switch (process.argv.slice(2)[0]) {
    case 'iot':
        console.log('starting iot hub telemetry');
        client = require('./iothub_client');
        break;
    case 'udp':
        console.log('start udp telemetry to azure');
        client = require('./udp_client');
        break;
    case 'snmp':
        console.log('snmp not yet availablr');
        break;
    default:
        console.log(process.argv.slice(2));
        break;

}