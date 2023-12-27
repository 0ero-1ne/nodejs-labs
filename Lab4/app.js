const http = require('http');
const eventEmitter = require('./db').eventEmitter;
const methods = require('./db').methods;
const url = require('url');
const fs = require('fs');

const hostname = 'localhost';
const port = 5000;

const server = http.createServer(async (req, res) => {
    res.statusCode = 200;
    res.setHeader('Conent-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('charset', 'utf-8');

    const page = url.parse(req.url, true);

    if (page.pathname === '/api/db') {
        let body = '';
        switch (req.method) {
            case 'GET':
                req.on('data', (data) => {
                    body += data;
                });
                req.on('end', async () => {
                    await methods.select().then(response => res.end(response !== '[]' ? response : 'Empty...')).catch(error => res.end(error));
                });
                break;
            case 'POST':
                req.on('data', (data) => {
                    body += data;
                });
                req.on('end', async () => {
                    eventEmitter.emit('POST', body);
                    await methods.select().then(response => res.end(response)).catch(error => res.end(error));
                });
                break;
            case 'PUT':
                req.on('data', (data) => {
                    body += data;
                });
                req.on('end', () => {
                    eventEmitter.emit('PUT', body);
                    methods.select().then(response => res.end(response)).catch(error => res.end(error));
                });
                break;
            case 'DELETE':
                const id = page.query.id;
                eventEmitter.emit('DELETE', id);
                methods.select().then(response => res.end(response)).catch(error => res.end(error));
                break;
            default:
                res.end('Unknown method!');
                break;
        }
    } else if (page.pathname === '/')
    {
        res.setHeader('Content-Type', 'text/html');
        res.end(fs.readFileSync('index.html'));
    }
    
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});