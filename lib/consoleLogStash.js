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

function CreateBunyanConsoleLog() {
    var reconnect = 0;
    if (!process.env.LOG_SERVER_HOST) {
        return;
    }
    var bunyan, bunyanTcp, bunyanLog, options, util;
    // require modules
    bunyan = require('bunyan');
    bunyanTcp = require('./logstash');
    util = require('util');
    options = {};
    // add ad-hoc logstash env vars
    Object.keys(process.env).forEach(function (key) {
        if (key.indexOf('npm_config_logstash_') === 0) {
            options[key.replace('npm_config_logstash_', '')] = process.env[key];
        }
    });
    options.project_env = process.env.NODE_ENV ||
        "unspecified-env";
    options.project_name = process.env.PROJECT_NAME ||
        'unspecified-project-name';
    options.project_role = process.env.PROJECT_ROLE ||
        'unspecified-project-role';
    options.name = process.env.npm_package_name ||
        'unspecified-app-name';
    options.version = process.env.npm_package_version ||
        'unspecified-app-version';
    options.app_start_time = new Date().toISOString();
    options.app_uptime = process.uptime();
    options.streams = [{
        // log debug and above to bunyan-logstash-tcp
        level: 'debug',
        type: "raw",
        stream: bunyanTcp.createStream({
            host: process.env.LOG_SERVER_HOST,
            port: Number(process.env.LOG_SERVER_PORT) || 9998
        }).on('connect', function() {
            previousRetryTime = 0;
            console.log('connect to tcp');
        }).on('close', function() { 
            //console.log(retryTime);
            retryTime = previousRetryTime + LoginTimeout*80;
            previousRetryTime = retryTime;
            setTimeout(function() {
                CreateBunyanConsoleLog();
                console.log('retry');
            }, retryTime);
        }).on('error', function() {
            console.log('error');
            retryTime = previousRetryTime + LoginTimeout*80;
            previousRetryTime = retryTime;
            setTimeout(function() {
                createBunyanConsoleLog();
                console.log('retry');
            }, retryTime);
        })
    }];
    options.level = 'debug';
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
};

module.exports = CreateBunyanConsoleLog;
