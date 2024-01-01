const http = require('http');

const params = JSON.stringify(
    {
        __comment: "JAllo",
        x: 4,
        y: 2,
        s: "Mess",
        m: ["1", "2", "3"],
        o: { "surname": "Ivano", "Nname": "vo" }
    }
);

const options = {
    host: 'localhost',
    path: '/json',
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