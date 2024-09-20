import {
  FlexBox,
  Button,
} from '@ui5/webcomponents-react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import axios from 'axios';
import DocUploder from '../../components/DocUploder/DocUploder';

const DocToolbar = ({ refreshData }) => {

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
