"use strict";

var bunyan = require('bunyan'),
    bunyantcp = require('../lib/logstash');

var log = bunyan.createLogger({
    name: 'example',
    streams: [{
        level: 'debug',
        stream: process.stdout
    },{
        level: 'debug',
        type: "raw",
        stream: bunyantcp.createStream({
            host: '127.0.0.1',
            port: 9998
        }).on('connect', function() {
            console.log('connect to tcp');
        }).on('close', function() { 
            console.log('close');
            setTimeout(function(){
                var log = bunyan.createLogger({
                name: 'example',
                streams: [{
                    level: 'debug',
                    stream: process.stdout
                },{
                    level: 'debug',
                    type: "raw",
                    stream: bunyantcp.createStream({
                        host: '127.0.0.1',
                        port: 9998
                    }).on('connect', function() {
                        console.log('connect to tcp');
                    }).on('close', function() { 
                        setTimeout(function(){

                        }, 10000);
                    }).on('error', console.log )
                }],
                level: 'debug'
                });
                log.debug('tesdfsdfst');
            }, 10000);
        }).on('error', console.log )
    }],
    level: 'debug'
});

log.debug('test');
log.error('error test');
setInterval(function(){
    log.debug('test');
},5000);