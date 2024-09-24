
import { FlexBox, Button } from '@ui5/webcomponents-react';
import './App.css';
// import DataFatch from './components/DataFatch/DataFatch';
import Header from './components/Header/Header';
import SideNavigationBar from './components/SideNavigationBar/SideNavigationBar';
import ListDoc from './components/ListDoc/ListDoc';
// import DocToolbar from './components/DocToolbar/DocToolbar';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import DocUploder from './components/DocUploder/DocUploder';
import Card from './components/Card/Card';
function App() {
  const [openState, setOpenState] = useState(true)
  const [data, setData] = useState({
    "docId": "5acac5c9-ec05-4433-ab48-10a8e3524ce4",
    "receiverName": "omkar MAHESH PARAB",
    "documentDate": "2023-05-15",
    "documentType": "invoooooice",
    "fileName": "IMG20230515154957.jpg",
    "grossAmount": 885.94,
    "finished": "2024-09-18"
  })
  const handleCencel = (e) => {
    setOpenState(e)
  }
  const fetchData = (e) => {
    setData(e)
    console.log(e)
  }
  return (
    <div className="App">
      <Router>
        {/* <DataFatch /> */}
        <Header />
        <FlexBox
          direction="Row"
          justifyContent="Space-between"
          wrap="NoWrap"
          style={{ width: "100%", height: "90%" }}
        >
          <SideNavigationBar />
          <FlexBox
            direction="Column"
            justifyContent="Start"
            style={{ height: "100%", width: "100%" }}
          >
            <DocUploder refreshData={fetchData} /> 
            <div className='cards_section'>


            <Card DocData={data} />
            </div>
            {/* <ListDoc data={data} /> */}
            <FlexBox
              direction="Row"
              justifyContent="End"
            >
              <Button
                accessibilityAttributes={{}}
                accessibleRole="Button"
                design="Emphasized"
                disabled={false}
                icon="document"
                onClick={function _s() { }}
                type="Button"
                style={{ margin: "1rem" }}

              >
                Report
              </Button>
            </FlexBox>
          </FlexBox>
        </FlexBox>
        {/* <DocData /> */}
      </Router>
    </div>
  );
}

export default App;
