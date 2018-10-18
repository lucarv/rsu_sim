# road side unit simulator

## prepare
1. clone
2. npm install

## how to run rsu simulator
1. cd rsu_simulator
2. edit .env 
3. node udp_client (on console)  


##how to run rsu gateway
1. cd cloud_gw
2. edit .env
3. node app (on another console)



**this version:** creates a Dedicated Short Range Communications ([SAE J2735](https://www.sae.org/standards/content/j2735_200911/)) bsmCoreData JSON object with some random values, encodes a bsmCoreData Object using BER, sends the JSON obj plus the encoded data to Azure
