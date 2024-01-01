const query = require('querystring');
const http = require('http');

const params = query.stringify({ x: 4, y: 2 })

const options = {
    host: 'localhost',
    path: '/task2?' + params,
    port: 5000,
    method: 'GET'
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
}).on('error', (error) => console.log(error.message)).end();