# A TCP console log for Bunyan

[![build status](https://travis-ci.org/DexterYan/bunyan-logstash-tcp-consolelog.png)](http://travis-ci.org/DexterYan/bunyan-logstash-tcp-consolelog)

A replacement of console.log with logstash tcp, and auto reconnect when error or disconnec appears. 
<table>
  <tr>
    <th>Parameter</th><th>Type</th><th>Default</th>
  </tr>
  <tr>
    <th>NODE_ENV</th>
    <td>string</td>
    <td><code>unspecified-env</code></td>
  </tr>
  <tr>
    <th>PROJECT_NAME</th>
    <td>string</td>
    <td><code>unspecified-project-name</code></td>
  </tr>
  <tr>
    <th>PROJECT_ROLE</th>
    <td>string</td>
    <td><code>unspecified-project-role</code></td>
  </tr>
  <tr>
    <th>npm_package_name</th>
    <td>string</td>
    <td><code>unspecified-app-name</code></td>
  </tr>
  <tr>
    <th>npm_package_version</th>
    <td>string</td>
    <td><code>unspecified-app-version</code></td>
  </tr>
</table>

# Installation

    $ npm install bunyan-logstash-tcp-consolelog

## Usage
```
   var CreateBunyanConsoleLog = require('bunyan-logstash-tcp-consolelog');
   new CreateBunyanConsoleLog();
   console.log('test');
```

## Events

Inside the console.log stream will emit ``open``, ``close`` and ``error``. Once it emit ``error`` or ``close``, it will start auto reconnect based on [Retry Algorithm](https://technet.microsoft.com/en-us/library/ms365783%28v=sql.105%29.aspx);

## Credits

This module is heavily based on [bunyan-logstash-tcp](https://github.com/chris-rock/bunyan-logstash-tcp.git).

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