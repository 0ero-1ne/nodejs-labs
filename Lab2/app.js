const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('charset', 'utf-8');

    if (req.method !== 'GET') {
        res.end(`Wrong method! GET method is required, your is ${req.method}`);
    } else {
        switch (req.url) {
            case '/html':
                res.end(fs.readFileSync('index.html'));
                break;
            case '/png':
                res.setHeader('Content-Type', 'image/png');
                res.end(fs.readFileSync('pic.png'));
                break;
            case '/api/name':
                res.setHeader('Content-Type', 'text/plain');
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.end('Volikov Dmitry Anatolevich');
                break;
            case '/xmlhttprequest':
                res.end(fs.readFileSync('xmlhttprequest.html'));
                break;
            case '/fetch':
                res.end(fs.readFileSync('fetch.html'));
                break;
            case '/jquery':
                res.end(fs.readFileSync('jquery.html'));
                break;
            default:
                res.statusCode = 404;
                res.end('<h1>404 - Page was not found</h1>');
                break;
        }
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});