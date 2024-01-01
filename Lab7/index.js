const http = require('http');
const fs = require('fs');
const ws = require('ws');
const path = require('path');

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === "/chat") {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8'));
    } else {
        res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('400');
    }
});

server.listen(3000, () => console.log('Server is running at PORT 4000'));

const wss = new ws.WebSocketServer({
    port: 4000,
    host: 'localhost',
    path: '/wsserver'
});

wss.binaryType = "arraybuffer";

wss.on('connection', ws => {
    ws.binaryType = "arraybuffer";

    ws.on('message', message => {
        // Handle incoming message
        console.log('Received: %s', message);

        // Broadcast message to all connected clients
        wss.clients.forEach(client => {
            client.send(message);
        });
    });

    ws.on('close', () => {
        // Handle connection close
        console.log('Client disconnected');
    });
});
