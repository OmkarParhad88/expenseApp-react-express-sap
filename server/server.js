const { getAuthToken } = require('./auth.js');
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const app = express();
const FormData = require('form-data'); // Ensure FormData is available
const axios = require('axios');
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // To parse JSON request bodies

const storage = multer.memoryStorage(); // Store file in memory, or use diskStorage to save files
const upload = multer({ storage: storage });

const doxApiUrl = 'https://aiservices-trial-dox.cfapps.us10.hana.ondemand.com/document-information-extraction/v1/document/jobs';

// Route to return "Hello World"
app.post('/document/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const file = req.file;
  // const options = req.body['options=application/json']; // Get the options
  const options = req.body['options=application/json']; // Get the options
  console.log(JSON.stringify(options))   // Get the options
  console.log('Schema Info:', options); // Log the additional data
  console.log('fileName:', file.originalname); // Log the additional data

  const token = await getAuthToken()

  const formData = new FormData();
  formData.append('file', file.buffer, file.originalname); // Append the file data
  formData.append('options', JSON.stringify(options)); // Append any additional options

  await axios.post(doxApiUrl, formData, {
    headers: {
      'Authorization': `Bearer ${token}`,
      ...formData.getHeaders()
    },
  }).then(response => {
    // console.log(response.data)
    return res.json(response.data)
  }).catch(error => {
    console.error('Error uploading the file on server:', error);

  })

  res.status(200).json({
    message: 'File uploaded successfully',
    fileName: file.originalname,
    schemaOptions: options,
  });
})
app.get('/hello', (req, res) => {
  res.send('Hello World');
});


// Route to handle text transformation
app.post('/transform', (req, res) => {
  const { inputText } = req.body;
  if (inputText) {
    const lowerCaseText = inputText.toLowerCase();
    res.json({ transformedText: lowerCaseText });
  } else {
    res.status(400).send('Input text missing');
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
