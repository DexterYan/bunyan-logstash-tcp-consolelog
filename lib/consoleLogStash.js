/*
        this function will init bunyan logging to logstash via tcp
    */
    /*jslint
        indent: 4,
        maxlen: 80
    */
var previousRetryTime = 0;
var retryTime = 0;
var LoginTimeout = 15;
var bunyan = require('bunyan');
var bunyanTcp = require('./logstash');

function CreateBunyanConsoleLog(options, streamsOptions) {
    var reconnect = 0;
    if (!process.env.LOG_SERVER_HOST) {
        return;
    }
    var bunyanLog, util;
    // require modules
    util = require('util');
    options = options || {};
    options.name = options.name || 'undefined';
    streamsOptions = streamsOptions || {};
    options.streams = [{
        // log debug and above to bunyan-logstash-tcp
        level: options.level || 'debug',
        type: options.type || "raw",
        stream: bunyanTcp.createStream({
            level: streamsOptions.level,
            server: streamsOptions.server,
            application: streamsOptions.application,
            pid: streamsOptions.pid,
            tags: streamsOptions.tags,
            host: Number(streamsOptions.host) || process.env.LOG_SERVER_HOST,
            port: streamsOptions.port || Number(process.env.LOG_SERVER_PORT) || 9998
        }).on('connect', function() {
            previousRetryTime = 0;
            console.log('Logstash - connect to tcp');
        }).on('close', function() { 
            console.log('Logstash - close');
            retryTime = previousRetryTime + LoginTimeout*80;
            previousRetryTime = retryTime;
            setTimeout(function() {
                CreateBunyanConsoleLog(options, streamsOptions);
                console.log('Logstash - retry');
            }, retryTime);
        }).on('error', function() {
            console.log('Logstash - error');
            retryTime = previousRetryTime + LoginTimeout*80;
            previousRetryTime = retryTime;
            setTimeout(function() {
                createBunyanConsoleLog(options, streamsOptions);
                console.log('Logstash - retry');
            }, retryTime);
        })
    }];

    bunyanLog = bunyan.createLogger(options);
    ['error', 'info', 'log', 'warn', 'slowQuery'].forEach(function (logType) {
        var logConsole;
        logConsole =
            console['_' + logType] =
            logConsole =
            console['_' + logType] ||
            console[logType] ||
            console._warn ||
            console.warn;
        console[logType] = function () {
            var message;
            message = util.format.apply(util, arguments);
            // log to console
            logConsole(message);
            // log to logstash
            switch (logType) {
            case 'error':
                bunyanLog.error(message);
                break;
            case 'info':
                bunyanLog.info(message);
                break;
            case 'log':
                bunyanLog.debug(message);
                break;
            case 'warn':
                bunyanLog.warn(message);
                break;
            case 'slowQuery':
                bunyanLog.warn({
                    message: message,
                    tags: 'slow-query',
                    slowQueryTimeout: (/\b\d+\b/).exec(message) &&
                        Number((/\b\d+\b/).exec(message)[0])
                });
                break;
            }
        };

    });
    return bunyanLog;
};


module.exports = {
    createLogger: CreateBunyanConsoleLog
};

