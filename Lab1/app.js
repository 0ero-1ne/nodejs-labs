const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    
    let body = [];
    req.on('data', (chunk) => {
        body.push(chunk);
    });

    const headers = JSON.stringify(req.headers, (key, value) => value, 4);

    req.on('end', () => {
        let result = `
            Method: ${req.method}<br />
            URI: ${req.headers.host}${req.url}<br /> 
            HTTP version: ${req.httpVersion}<br />
            Headers: <pre>${headers}</pre><br />
            ${body === '' ? 'Body is empty' : 'Body: <br />' + body}<br />
            <h1>Hello, World!</h1>
        `;
        res.end(result);
    })
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});