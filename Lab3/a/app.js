const http = require('http'),
      url = require('url'),
      fs = require('fs');

const hostname = 'localhost';
const port = 3000;
process.stdin.setEncoding('utf-8');

let status = 'norm';
let prevStatus = 'norm';

process.stdin.on('data', (data) => {
    data = data.toString().trim();
    const input = data.substring(data.indexOf('>') + 1);

    switch (input) {
        case 'idle':
        case 'norm':
        case 'test':
        case 'stop':
            if (status != input) {
                prevStatus = status;
                status = input;
                process.stdout.write(`reg = ${prevStatus} --> ${status}\n`);
            } else {
                process.stdout.write(`${input}\n`);
            }

            process.stdout.write(`${status}->`);
            break;
        case 'exit':
            process.exit();
        default:
            process.stdout.write(`${input}\n`);
            process.stdout.write(`${status}->`);
            break;
    }
});

function fact(k) {
    if (k < 0) {
        throw new Error('Wrong k parameter!');
    }
    if (k <= 1) {
        return 1;
    }
    return k * fact(k - 1);
}

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('charset', 'utf-8');

    let body = [];
    req.on('data', (data) => {
        body.push(data);
    });

    if (req.method === 'GET') {
        const page = url.parse(req.url, true);
        const k = +page.query.k;
        switch (page.pathname) {
            case '/':
                res.setHeader('Content-Type', 'text/html');
                res.end(`<h1>Status code: ${status}</h1>`);
                break;
            case '/fact':
                if (!Number.isInteger(k))
                    throw new Error('k argument must be integer');

                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.end(JSON.stringify({k: k, fact: fact(k)}));
                break;
            case '/index':
                res.end(fs.readFileSync('./index.html', 'utf-8'));
                break;
            case '/tick-fact':
                if (!Number.isInteger(k))
                    throw new Error('k argument must be integer');

                res.setHeader('Content-Type', 'application/json');
                process.nextTick(() => res.end(JSON.stringify({k: k, fact: fact(k)})));
                break;
            case '/immediate-fact':
                if (!Number.isInteger(k))
                    throw new Error('k argument must be integer');

                res.setHeader('Content-Type', 'application/json');
                setImmediate(() => res.end(JSON.stringify({k: k, fact: fact(k)})));
                break;
            default:
                res.end('<h1>404 - Page not found</h1>');
                break;
        }
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
    process.stdout.write(`${prevStatus}->`);
});