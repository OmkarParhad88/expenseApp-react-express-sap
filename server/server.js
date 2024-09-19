const { getAuthToken } = require('./auth.js');
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const app = express();
const FormData = require('form-data');
const axios = require('axios');
app.use(cors());
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const doxApiUrl = 'https://aiservices-trial-dox.cfapps.us10.hana.ondemand.com/document-information-extraction/v1/document/jobs';

app.get('/document/data', async (req, res) => {
  const token = await getAuthToken()
  await axios.get(`${doxApiUrl}/5acac5c9-ec05-4433-ab48-10a8e3524ce4`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }).then(response => {
    const data = response.data;

    const extractData = (data) => {
      const documentDate = data.extraction.headerFields.find(field => field.name === 'documentDate')?.value;
      const grossAmount = data.extraction.headerFields.find(field => field.name === 'grossAmount')?.value;
      const receiverName = data.extraction.headerFields.find(field => field.name === 'receiverName')?.value;
      const docId = data.id;
      const documentType = data.documentType;
      const fileName = data.fileName;
      const finished = (data.finished).substring(0, 10);

      return {
        docId,
        receiverName,
        documentDate,
        documentType,
        fileName,
        grossAmount,
        finished
      };
    };

    const newObject = extractData(data);

    res.json(newObject)
  }).catch(error => {
    console.error('data not availble', error);

  })


})

app.post('/document/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const file = req.file;

  const options = req.body['options=application/json'];
  console.log(JSON.stringify(options))
  console.log('Schema Info:', options);
  console.log('fileName:', file.originalname);



  const formData = new FormData();
  formData.append('file', file.buffer, file.originalname);
  formData.append('options', JSON.stringify(options));

  await axios.post(doxApiUrl, formData, {
    headers: {
      'Authorization': `Bearer ${token}`,
      ...formData.getHeaders()
    },
  }).then(response => {
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
