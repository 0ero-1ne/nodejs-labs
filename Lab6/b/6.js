const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const filePath = 'MyF.jpg';
const uploadUrl = 'http://localhost:5000/upload';

const form = new FormData();
form.append('fileInput', fs.createReadStream(filePath));

axios.post(uploadUrl, form, {
  headers: {
    ...form.getHeaders()
  }
})
  .then(response => {
    console.log('Server response:', response.data);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
