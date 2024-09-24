
import { FlexBox, Button, BusyIndicator } from '@ui5/webcomponents-react';
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
  const [data, setData] = useState(null)
  const [isData, setIsData] = useState(false)

  const handleCencel = (e) => {
    setOpenState(e)
  }

  const editListItem = (e) => {
    const parentListItem = e.target.closest('li').id;
    // console.log(parentListItem)
    console.log(parentListItem)
  }

  const deleteListItem = (e) => {
    const parentListItem = e.target.closest('li').id;
    // console.log(parentListItem)
    console.log(parentListItem)
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
            <ul className='cards_section'>

              {data ? (data.map((e) => { return (<Card key={e.docId} DocData={e} editListItem={editListItem} deleteListItem={deleteListItem} />) }))
                : (<BusyIndicator
                  active
                  size="M"
                />)
              }

            </ul>
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
