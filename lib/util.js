const Ber = require('asn1').Ber;
const uuid = require('uuid');
var bsm = require('./bsm')

const randomize = (DID) => {
    bsm.bsmCoreData.msgCnt++;
    bsm.bsmCoreData.id = DID;
    bsm.bsmCoreData.secMark = Date.now().toString();
    bsm.bsmCoreData.lat = 37.6960654 + Math.random();
    bsm.bsmCoreData.long = -121.9048892 + Math.random();
    bsm.bsmCoreData.elev == 0 ? bsm.bsmCoreData.elev = Math.floor(Math.random() * (300 - 0)) : bsm.bsmCoreData.elev += Math.random() * (1 + 1) - 1;
    bsm.bsmCoreData.accuracy = Math.random();
    bsm.bsmCoreData.heading == 0 ? bsm.bsmCoreData.heading = Math.floor(Math.random() * (359 - 0)) : bsm.bsmCoreData.heading += Math.random() * (1 + 1) - 1;
    bsm.bsmCoreData.speed == 0 ? bsm.bsmCoreData.speed = Math.floor(Math.random() * (100 - 0)) : bsm.bsmCoreData.speed += Math.random() * (1 + 1) - 1;
    bsm.bsmCoreData.angle == 0 ? bsm.bsmCoreData.angle = Math.floor(Math.random() * (359 - 0)) : bsm.bsmCoreData.angle += Math.random() * (1 + 1) - 1;
    bsm.bsmCoreData.accelSet = Math.floor(Math.random() * (4 - 1) + 1)
    bsm.bsmCoreData.brake.wheelBrakes = true;
    bsm.bsmCoreData.brake.traction = 0;
    bsm.bsmCoreData.brake.abs = true;
    bsm.bsmCoreData.brake.scs = true;
    bsm.bsmCoreData.brake.brakeBoost = true;
    bsm.bsmCoreData.brake.auxBrakes = true;
    return bsm.bsmCoreData;
}

const encode = (DID) => {

    let bsmCoreData = randomize(DID);

    var writer = new Ber.Writer();
    writer.startSequence();
    writer.writeInt(bsmCoreData.msgCnt);
    writer.writeString(bsmCoreData.id);
    writer.writeString(bsmCoreData.secMark);
    writer.writeString(bsmCoreData.lat.toString());
    writer.writeString(bsmCoreData.long.toString());
    writer.writeString(bsmCoreData.elev.toString());
    writer.writeString(bsmCoreData.accuracy.toString());
    writer.writeBoolean(true); //set transmission to true always for now
    writer.writeString(bsmCoreData.speed.toString());
    writer.writeString(bsmCoreData.heading.toString());
    writer.writeString(bsmCoreData.angle.toString());
    writer.writeInt(bsmCoreData.accelSet)
    /*
    writer.startSequence();
    writer.writeBoolean(true);
    writer.writeInt(0);
    writer.writeBoolean(true);
    writer.writeBoolean(true);
    writer.writeBoolean(true);
    writer.writeBoolean(true);
    writer.endSequence();
    */
    writer.endSequence();

    return writer.buffer;
}

const decode = (tags) => {
    bsm.bsmCoreData.msgCnt = tags[0];
    bsm.bsmCoreData.id = tags[1];
    bsm.bsmCoreData.secMark = tags[2];
    bsm.bsmCoreData.lat = tags[3];
    bsm.bsmCoreData.long = tags[4];
    bsm.bsmCoreData.elev = tags[5];
    bsm.bsmCoreData.accuracy = tags[6];
    bsm.bsmCoreData.transmission = tags[7];
    bsm.bsmCoreData.heading = tags[8];
    bsm.bsmCoreData.speed = tags[9];
    bsm.bsmCoreData.angle = tags[10];
    bsm.bsmCoreData.accelSet = tags[11];
    bsm.trap = tags[12]

    return bsm;
}

module.exports.randomize = randomize;
module.exports.encode = encode;
module.exports.decode = decode;

