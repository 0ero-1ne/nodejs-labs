const http = require('http');

const params = JSON.stringify({ x: 4, y: 2, s: 'hel,hal,holo' })

const options = {
    host: 'localhost',
    path: '/task3',
    port: 5000,
    method: 'POST'
};

http.request(options, response => {
    console.log('http.request: status code: ', response.statusCode);

    let data = '';

    response.on('data', (chunk) => {
        data += chunk;
    });

    response.on('end', () => {
        console.log('body:', data);
    });
}).on('error', (error) => console.log(error.message)).end(params);