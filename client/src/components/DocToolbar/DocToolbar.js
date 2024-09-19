// import { useState, useRef } from 'react'
import {
  FlexBox,
  Button,
} from '@ui5/webcomponents-react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import DocUploder from '../../components/DocUploder/DocUploder';

import { Link } from 'react-router-dom';

const DocToolbar = ({ refreshData }) => {

  const refreshBtn = () => {
    axios.get('http://localhost:5000/document/data')
      .then((response) => {
        console.log('Refresh successful')
        // console.log(response.data)
        refreshData(response.data)
      })
      .catch(error => {
        console.error('Refresh failed', error)
      })
  }
  return (
    <FlexBox
      alignContent="center"
      direction="Row"
      justifyContent="End"
      maxWidth="100%"
      style={{ padding: "0.7em", gap: "0.5rem" }}
    >
      <Routes>
        <Route path="/document/upload" element={<DocUploder />} />
      </Routes>
      <Link to="/document/upload">
        <Button icon="create">Create</Button>
      </Link>
      <Button icon="refresh" onClick={refreshBtn}>Refresh</Button>
    </FlexBox>
  )
}

export default DocToolbar
