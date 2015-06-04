# A TCP console log for Bunyan

[![build status](https://travis-ci.org/DexterYan/bunyan-logstash-tcp-consolelog.png)](http://travis-ci.org/DexterYan/bunyan-logstash-tcp-consolelog)
A replacement of console.log with logstash tcp, and auto reconnect when error or disconnec appears. It also exports the bunyanlog for modifing.

## Credits

This module is heavily based on [bunyan-logstash-tcp](https://github.com/chris-rock/bunyan-logstash-tcp.git).

## Usage
```
    var bunyan = require('bunyan-logstash-tcp-consolelog');
    var options = {};
    var streamsOptions = {};
    var bunyanLog;

    options.project_name = 'test bunyan console log';
    options.name = 'test';
    
    options.level = 'debug';

    streamsOptions.host = '127.0.0.1';
    streamsOptions.port = '9998';

    bunyanLog = bunyan.createLogger(options, streamsOptions);

    console.log('log test');
    console.warn('warn test');
    console.error('error test');

    bunyanLog.error('bunyan error test');
```

# Configuration

You can use default setting without passing, or passing options and streamsOptions

Options is to configure the bunyan module, the name is required. You can add other parameters
<table>
  <tr>
    <th>Parameter</th><th>Type</th><th>Default</th>
  </tr>
  <tr>
    <th>name</th>
    <td>string</td>
    <td><code>undefined</code></td>
  </tr>
</table>

streamOption is to configure the TCP stream.

<table>
  <tr>
    <th>level</th>
    <td>string</td>
    <td><code>info</code></td>
  </tr>
  <tr>
    <th>server</th>
    <td>string</td>
    <td><code>os.hostname()</code></td>
  </tr>
  <tr>
    <th>host</th>
    <td>string</td>
    <td><code>"127.0.0.1"</code></td>
  </tr>
  <tr>
    <th>port</th>
    <td>number</td>
    <td><code>9999</code></td>
  </tr>
  <tr>
    <th>application</th>
    <td>string</td>
    <td><code>process.title</code></td>
  </tr>
  <tr>
    <th>pid</th>
    <td>string</td>
    <td><code>process.pid</code></td>
  </tr>
  <tr>
    <th>tags</th>
    <td>array|string[]</td>
    <td><code>["bunyan"]</code></td>
  </tr>
</table>

# Installation

    $ npm install bunyan-logstash-tcp-consolelog


## Events

Inside the console.log stream will emit ``open``, ``close`` and ``error``. Once it emit ``error`` or ``close``, it will start auto reconnect based on [Retry Algorithm](https://technet.microsoft.com/en-us/library/ms365783%28v=sql.105%29.aspx);

## Logstash Configuration

Configuration for [Logstash 1.3.3+](http://logstash.net/docs/1.4.2/inputs/tcp):

```javascript
input {
  // config for bunyan udp
  udp {
      'port' => "9999"
  }
  // config for bunyan tcp
  tcp {
      'port' => "9998"
  }
}
```

## Try with logstash locally

 - Download logstash from http://logstash.net/
 - Unpack it (tar -zxf logstash-1.5.0.tar.gz)
 - Create a test logstash configuration `logstash.conf`

```code
input {
  stdin { 
    type => "stdin-type"
  }
  udp {
    port => "9999"
  }
  tcp {
    port => "9998"
  }
}
output { 
  stdout {}
}
```

 - Run `bin/logstash agent -f logstash.conf
 - Run `node example/log.js`

# Example Website
[www.safetyflights.com](http://www.safetyflights.com/#!/) is a flight Safety search engine that organizes Flight Information, Aviation Accidents Records and Airline Information to help you to choose suitable flight.

# License
The MIT License (MIT)
Copyright © 2015 Dexter Yan

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the “Software”), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.