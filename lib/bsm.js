module.exports = {
    bsmCoreData: {
        msgCnt: 0,
        id: 0,
        secMark: 0,
        lat: 0,
        long: 0,
        elev: 0,
        accuracy: 0, //positional accuracy
        transmission: true, //Transmission State
        speed: 0,
        heading: 0, // 0-359
        angle: 0, // steering wheel angle 0-359
        accelSet: 0, //acceleration set 4 way
        brake:{
            wheelBrakes: true,
            traction: 0,
            abs: true,
            scs: true,
            brakeBoost: true,
            auxBrakes: true 
        }, //bake system status
        size: {
            width: 0, // in cm
            length: 0 // in cm
        } //vehicle size 
    },
    trap: 0
};

