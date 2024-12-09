
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {
  Button,
  FlexBox,
} from '@ui5/webcomponents-react';
import { Loader } from '@ui5/webcomponents-react-compat';
import axios from 'axios';

const DocUploder = ({ refreshData }) => {
  const [isUploaderVisible, setIsUploaderVisible] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  useEffect(() => {
    refreshBtn()
  }, [])

  const toggleUploader = () => {
    setIsUploaderVisible(!isUploaderVisible);
  };

  const refreshBtn = () => {
    setErrorMessage('');
    setIsLoading(true);
    axios.get('http://localhost:5000/document/data')
      .then((response) => {
        console.log('Refresh successful')
        setErrorMessage('Refresh successful');
        // console.log(response.data)
        refreshData(response.data)
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Refresh failed', error.response.data)
        setErrorMessage(error.response.data.error);
        setIsLoading(false);
        // return {
        //   isLoading: false,
        // }
      })
  }

  const handleFileChange = (event) => {
    setErrorMessage('');
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
    setErrorMessage('');
    setIsLoading(true);
    if (!selectedFile) {
      setErrorMessage('No file selected.');
      setIsLoading(false)
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
      console.log('File uploaded successfully ')
      setErrorMessage('File uploaded successfully');
      // console.log(response)
      handleCancel()
      setIsLoading(false)
      navigate('/')
    }
    ).catch(error => {
      setIsLoading(false)
      console.error('Error uploading the file : ', error);
      setErrorMessage('Error uploading the file');
    })
  }
  const handleCancel = () => {
    setIsLoading(false);
    setSelectedFile(null);
    fileInputRef.current.value = '';
    setIsUploaderVisible(!isUploaderVisible);
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
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {isUploaderVisible
          && (<div style={{ display: "flex", gap: "0.5rem" }}>
            <input type="file" accept=".jpg,.png,.jpeg" onChange={handleFileChange} ref={fileInputRef} />

          <Button icon="upload" onClick={handleFileUpload}>Upload</Button>
          <Button icon="cancel" type="button" onClick={handleCancel} >Cancel</Button>
          </ div>)}
        {!isUploaderVisible && (<Button icon="create" onClick={toggleUploader}>Create</Button>)}
        <Button icon="refresh" onClick={refreshBtn}>Refresh</Button>
      </FlexBox>
      {isLoading && <Loader type="Indeterminate" />}
    </>
  )
}

export default DocUploder
