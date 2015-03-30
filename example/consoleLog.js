var CreateBunyanConsoleLog = require('../lib/consoleLogStash');
new CreateBunyanConsoleLog();
setInterval(function() {
  console.log('log test');
  console.warn('warn test');
  console.error('error test');
}, 10);