import React, { useState } from 'react';
import axios from 'axios';

const DocData = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:4004/document-extraction/DocumentExtractionService/extractDocument', {
        file: file,
        fileType: 'jpg', 
      });
      setResult(response.data);
    } catch (error) {
      setError('Error uploading document');
      console.error(error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Extract Document</button>

      {error && <div style={{ color: 'red' }}>{error}</div>}
      {result && (
        <div>
          <h3>Extracted Information</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default DocData;
