import {
  Button, FlexBox
} from '@ui5/webcomponents-react';
import {
  Link
} from "react-router-dom";
import axios from 'axios';
import { useState, useRef } from 'react';


const DocUploder = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [cancel, setCancel] = useState(false);

  const fileInputRef = useRef(null);

  // Function to handle file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type;
      if (fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'image/jpeg') {
        setSelectedFile(file);
        setErrorMessage('');
      } else {
        setErrorMessage('Please select corret file type(png,jpg,jpeg)');
      }
    }
  };

  // Function to handle file upload
  const handleFileUpload = async () => {
    if (!selectedFile) {
      setErrorMessage('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('options=application/json', { "schemaName": "SAP_invoice_schema", "clientId": "default" });
    formData.append('file', selectedFile);

    await axios.post('http://localhost:5000/document/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }).then(response => {

      console.log('File uploaded successfully:', response.data);
    }).catch(error => {
      console.error('Error uploading the file:', error);
    })
  }
  const handleCancel = () => {
    setSelectedFile(null); // Clear selected file
    fileInputRef.current.value = ''; // Reset file input field
    setCancel(true)

  };
  return (
    <>
      <FlexBox
        alignItems='Center'
        height='100%'
        style={{ gap: "0.5rem" }}
      >
        <input type="file" accept=".jpg,.png,.jpeg" onChange={handleFileChange} ref={fileInputRef} />
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <Button icon="upload" onClick={handleFileUpload}>Upload</Button>
        <Link to="/">
          <Button icon="cancel" type="button" onClick={handleCancel} >Cancel</Button>
        </Link>
      </FlexBox> </>
  )
}

export default DocUploder
