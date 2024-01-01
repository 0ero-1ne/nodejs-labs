const http = require('http');
const url = require('url');
const fs = require('fs');
const send = require('@gonjy_monjy/m06_vda/m06_vda').send;

const port = 5000;
const hostname = 'localhost';
const appPassword = 'bgdv drlg pjpz ywdg';

const server = http.createServer(async (req, res) => {
    res.statusCode = 200;
    res.setHeader('Conent-Type', 'text/html');
    res.setHeader('charset', 'utf-8');

    const page = url.parse(req.url, true);

    
    if (page.pathname === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.end(fs.readFileSync('index.html'));
    } else if (page.pathname === '/send')
    {
        let body = '';
        req.on('data', (data) => {
            body += data;
        });
        req.on('end', () => {
            let options = JSON.parse(body);
            res.end(send(options.from, options.to, appPassword, options.text));
        })
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});