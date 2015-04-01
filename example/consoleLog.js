var bunyan = require('../lib/consoleLogStash');
var options = {};
var streamsOptions = {};
var bunyanLog;

options.project_name = 'test bunyan console log';
options.name = 'test';


streamsOptions.host = '127.0.0.1';
streamsOptions.port = '9998';

bunyanLog = bunyan.createLogger(options, streamsOptions);

console.log('log test');
console.warn('warn test');
console.error('error test');

bunyanLog.error('bunyan error test');
