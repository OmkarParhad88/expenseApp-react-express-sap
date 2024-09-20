
import { useState, useRef } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";
import {
  Button,
  FlexBox
} from '@ui5/webcomponents-react';
import axios from 'axios';

const DocUploder = ({ refreshData }) => {
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [cancel, setCancel] = useState(false);

  const fileInputRef = useRef(null);

  const refreshBtn = () => {
    axios.get('http://localhost:5000/document/data')
      .then((response) => {
        console.log('Refresh successful')
        refreshData(response.data)
      })
      .catch(error => {
        console.error('Refresh failed', error)
      })
  }

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

  const handleFileUpload = async () => {
    if (!selectedFile) {
      setErrorMessage('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile)
    formData.append("schemaName", "SAP_invoice_schema")
    formData.append("clientId", "default")

    await axios.post('http://localhost:5000/document/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }).then(response => {
      console.log('File uploaded successfully:')
      handleCancel()
      navigate('/')
    }
    ).catch(error => {
        console.error('Error uploading the file:', error);
      })
  }
  const handleCancel = () => {
    setSelectedFile(null);
    fileInputRef.current.value = ''; 
    setCancel(true)

  };
  return (
    <>
      <FlexBox
        alignContent="center"
        direction="Row"
        justifyContent="End"
        height='100%'
        style={{ padding: "0.7em", gap: "0.5rem" }}
      >
        <input type="file" accept=".jpg,.png,.jpeg" onChange={handleFileChange} ref={fileInputRef} />
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <Button icon="upload" onClick={handleFileUpload}>Upload</Button>
        <Link to="/">
          <Button icon="cancel" type="button" onClick={handleCancel} >Cancel</Button>
        </Link>

        <Routes>
          <Route path="/document/upload" element={<DocUploder />} />
        </Routes>
        <Link to="/document/upload">
          <Button icon="create">Create</Button>
        </Link>
        <Button icon="refresh" onClick={refreshBtn}>Refresh</Button>
      </FlexBox> </>
  )
}

export default DocUploder
