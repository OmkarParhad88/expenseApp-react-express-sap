import { useState, useRef } from 'react'
import {
  FlexBox,
  Button,
  FileUploader
} from '@ui5/webcomponents-react';
// import axios from 'axios';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import DocUploder from './components/DocUploder/DocUploder';

import { Link } from 'react-router-dom';
import axios from 'axios';
const DocToolbar = () => {


  return (
    <FlexBox
      alignContent="center"
      direction="Row"
      justifyContent="End"
      maxWidth="100%"
      style={{ padding: "0.7em", gap: "0.5rem" }}
    >
      <Router>
        <Routes>
          <Route path="/document/create" element={<Button onClick={handleFileUpload}>Upload</Button>} />
        </Routes>
        <Button icon="refresh">Refresh</Button>
      </Router>
    </FlexBox>
  )
}

export default DocToolbar
