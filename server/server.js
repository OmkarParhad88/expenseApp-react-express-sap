const { getAuthToken } = require('./auth.js');
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const app = express();
const FormData = require('form-data');
const axios = require('axios');
const { PerformanceObserver, performance } = require('perf_hooks');
var util = require('util');
var hana = require('@sap/hana-client');
app.use(cors());
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const doxApiUrl = 'https://aiservices-trial-dox.cfapps.us10.hana.ondemand.com/document-information-extraction/v1';

const extractJobData = (data) => {
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
app.get('/document/data', async (req, res) => {
  const token = await getAuthToken()
  await axios.get(`${doxApiUrl}/document/jobs/32d218c3-5c91-40ad-b07d-250647f225aa`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }).then(response => {
    const data = response.data;
    // console.log(data)
    const newObject = extractJobData(data);

    res.status(200).json([newObject])
    // res.status(200).json(data)

  }).catch(error => {
    console.error('data not availble', error);
    res.status(500).json({ error: 'error got from server' });
  })
})

app.post('/document/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const file = req.file;
  const options = req.body;

  const formData = new FormData();
  formData.append('file', file.buffer, file.originalname);
  formData.append('options', JSON.stringify(options));

  try {
    const token = await getAuthToken()

    const response = await axios.post(`${doxApiUrl}/document/jobs`, formData, {
    headers: {
      'Authorization': `Bearer ${token}`,
      ...formData.getHeaders()
      }
    })
    console.log('File uploaded successfully:', response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error uploading the file:', error.response);
    res.status(500).json({ error: 'File upload failed' });
  }
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

const hanaUrl = process.env.HANA_DB_ENDPOINT_URL
const port = process.env.HANA_DB_PORT
const userId = process.env.HANA_DB_USER_ID
const pass = process.env.HANA_DB_PASS

var connOptions = {
  serverNode: `${hanaUrl}:${port}`,
  UID: userId,
  PWD: pass,
  encrypt: 'true',
  sslValidateCertificate: 'false'
};

var connection = hana.createConnection();

connection.connect(connOptions);

var sql = 'SELECT EmployeeID, FirstName, LastName, BirthDate, HireDate, Salary FROM DBADMIN.Employee;';
var t0 = performance.now();
var result = connection.exec(sql);
console.log(util.inspect(result, { colors: false }));
var t1 = performance.now();
console.log("time in ms " + (t1 - t0));
connection.disconnect();

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
