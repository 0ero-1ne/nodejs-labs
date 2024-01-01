const http = require('http');
const fs = require('fs');
const path = require('path');

const fileName = '_Linkin_Park_What_Ive_Done_drumnet_ru_drumsheet-1.pdf';
const savePath = path.join(__dirname, 'public', fileName);

const options = {
    hostname: 'localhost',
    port: 5000,
    path: `/public/${fileName}`,
    method: 'GET',
};

const req = http.request(options, (res) => {
    if (res.statusCode === 200) {
        const chunks = [];

        res.on('data', (chunk) => {
            chunks.push(chunk);
        });

        res.on('end', () => {
            const responseData = Buffer.concat(chunks);

            fs.writeFileSync(savePath, responseData);

            console.log(`File received and saved as ${savePath}`);
        });
    } else {
        console.error(`Error in request: file not exists`);
    }
});

req.on('error', (e) => {
    console.error(`Error in request: ${e.message}`);
});

req.end();
