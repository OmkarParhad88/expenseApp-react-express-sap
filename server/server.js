const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // To parse JSON request bodies

// Route to return "Hello World"
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
