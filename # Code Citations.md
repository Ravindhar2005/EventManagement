# Code Citations

## License: unknown
https://github.com/dylanmartin/isjimmycarteralive/blob/b9acaa69ef1061a0ef7825fb214848a8f2b0309a/ijca/file-server/server.js

```
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end('File not found');
        } else {
            res.writeHead(200);
            res.end(data);
        }
    });
});

server.listen(
```


## License: unknown
https://github.com/finesden33/bloquake/blob/2ec8623685bb095397a5bae873b08bd85ef0f5e3/server.js

```
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end('File not found');
        } else {
            res.writeHead(200);
            res.end(data);
        }
    });
});

server.listen(
```


## License: unknown
https://github.com/ndikrp/livecoding6-httpserver/blob/5d906cd0da62aa53d0cf8f99b2c4cec7ed7e851d/server/index.js

```
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end('File not found');
        } else {
            res.writeHead(200);
            res.end(data);
        }
    });
});

server.listen(
```


## License: unknown
https://github.com/Rakpong/cpe207-hw3/blob/6e84935b7bfd170d030ea7a293796cbf375172cc/hw4/server.js

```
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end('File not found');
        } else {
            res.writeHead(200);
            res.end(data);
        }
    });
});

server.listen(
```


## License: unknown
https://github.com/IvanovBohdan/JS-Croco/blob/459a0416ffd1a1cbf8895d826ac8930b2ad3d443/server.js

```
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end('File not found');
        } else {
            res.writeHead(200);
            res.end(data);
        }
    });
});

server.listen(
```

