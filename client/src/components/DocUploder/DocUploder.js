
import { useState, useRef, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";
import {
  Button,
  FlexBox,

} from '@ui5/webcomponents-react';
import { Loader } from '@ui5/webcomponents-react-compat';
import axios from 'axios';

const DocUploder = ({ refreshData }) => {

  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [cancel, setCancel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  useEffect(() => {
    refreshBtn()
  }, [])


  const refreshBtn = () => {
    setIsLoading(true);
    axios.get('http://localhost:5000/document/data')
      .then((response) => {
        console.log('Refresh successful')
        console.log(response.data)
        refreshData(response.data)
        setIsLoading(false);
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
    setIsLoading(true);
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
      setIsLoading(false)
      navigate('/')
    }
    ).catch(error => {
      console.error('Error uploading the file:', error);
    })
  }
  const handleCancel = () => {
    setIsLoading(false);
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

        <Routes>
          <Route path="/document/upload" element={<div style={{ display: "flex", gap: "0.5rem" }}>
            <input type="file" accept=".jpg,.png,.jpeg" onChange={handleFileChange} ref={fileInputRef} />
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <Button icon="upload" onClick={handleFileUpload}>Upload</Button>
            <Link to="/">
              <Button icon="cancel" type="button" onClick={handleCancel} >Cancel</Button>
            </Link>
          </ div>} />
        </Routes>
        <Link to="/document/upload">
          <Button icon="create">Create</Button>
        </Link>
        <Button icon="refresh" onClick={refreshBtn}>Refresh</Button>
      </FlexBox>
      {isLoading && <Loader progress="60%" type="Indeterminate" />}
    </>
  )
}

export default DocUploder
