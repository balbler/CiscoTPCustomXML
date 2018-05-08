//module for reading CSV file downloaded from Spark for uploading bulk TP endpoints - needs work on adding validy of CSV format

var Excel = require('exceljs');
var fs = require('fs');
var workbook = new Excel.Workbook();
var log = require('../svrConfig/logger');




module.exports = {
    readcsv: function(){
        return new Promise(function(resolve, reject){
            var endpoints = [];
            var filename;
            var fileDir = './endpoints/';
            var file = fs.readdirSync(fileDir);
                log.info(file);
                filename = fileDir+file;

            log.info("Reading CSV, creating endpoint array for deployment...")

            workbook.csv.readFile(filename)
                .then(function(worksheet) {

                    for(var i = 0; i<worksheet.actualRowCount+1; i++) {
                        var row = worksheet.getRow(i + 1).values;
                        //row = row.toString().replace(/,/g,'');
                        var endpoint = {};
                        endpoint.ip = row[1];
                        if (endpoint.ip != null){


                        endpoint.img = row[2];
                        endpoint.brand = row[3];

                        log.info(JSON.stringify(endpoint));
                        endpoints.push(endpoint);
                        }

                    }
                    resolve(endpoints);
                }).catch(function(err){
                    reject(err);
            })

        })
    }
};

