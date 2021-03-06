const util = require('util');
const EventEmitter = require('events').EventEmitter;
const log = require('../svrConfig/logger');
const jsxapi = require('jsxapi');

//pass in object versus single values
function TPXapi(endpoint){
    this.endpoint = endpoint;
    this.xapi;
    this.endpointVersion;
    this.endpointType;

};

util.inherits(TPXapi,EventEmitter);

//force update of data from endpoint
TPXapi.prototype.getEndpointData =  function(){
    return new Promise((resolve, reject) => {
        const self = this;
        return self.endpointUpdate()
            .then(() => {
                let endpoint = {
                    version : self.endpointVersion,
                    type : self.endpointType
                }
                return resolve(endpoint);
            })
            .catch(err => {
                log.error(err)
            })
    });
};


TPXapi.prototype.endpointUpdate = function(){
    const self = this;
    return self.connect()
        .then((version) => {
            log.info(version);
            return self.checkVersion();
        })
        .then((status) => {
            log.info(status);
            return self.checkType()
        })
        .then((type) => {
            log.info("The type is: "+type);
            return self.closeConnect()
        })
        .catch((err) => {
            log.error(err);
        })
}

//connect to ssh service on endpoints
TPXapi.prototype.connect = function() {
    var self = this;
    log.info(JSON.stringify(self.endpoint));
    return new Promise((resolve, reject) => {
        self.xapi = jsxapi.connect('ssh://' + self.endpoint.ipAddress, {
            username: self.endpoint.username,
            password: self.endpoint.password
        });
        resolve ("Connection open")
            .catch ((err) => {
                reject (log.error(err));
            });
    });
}

TPXapi.prototype.checkVersion = function(){
    //SystemUnit Software Version
    const self = this;
    return new Promise((resolve, reject) => {
        return self.xapi.status
            .get('SystemUnit Software Version')
            .then((version) => {
                self.endpointVersion = version;
                log.info("found version "+version)
                resolve(version);
            })
            .catch(err => reject(err));
    })
};
TPXapi.prototype.checkType = function(){
    //SystemUnit type
    log.info("info: Checking system type.")
    const self = this;
    return new Promise((resolve, reject) => {
        return self.xapi.status
            .get('SystemUnit ProductPlatform')
            .then((type) => {
                self.endpointType = type;
                resolve(type);
            })
            .catch(err => reject(err));
    })
};


//close ssh connection
TPXapi.prototype.closeConnect =  function(){
    const self = this;
    return new Promise((resolve, reject) => {
        log.info("xapi session closed.");
        self.connectedStatus = "false";
        resolve (self.xapi.close());

        return self;

    })
};


module.exports = TPXapi;