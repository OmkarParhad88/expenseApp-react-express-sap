
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
  Route,
  useNavigate
} from "react-router-dom";
import DocUploder from './components/DocUploder/DocUploder';
import Card from './components/Card/Card';
import EditForm from './components/EditForm/EditForm';
function App() {
  const [openState, setOpenState] = useState(true)
  const [data, setData] = useState(null)
  const [isData, setIsData] = useState(false)
  const [id, setId] = useState(null)

  const navigate = useNavigate();

  const editListItem = (e) => {
    const parentListItem = e.target.closest('li');
    const itemId = parentListItem.id
    setId(itemId)
    // console.log(itemId)
    // console.log(parentListItem)

    let receiveText = parentListItem.querySelector('.RECEIVERNAME').textContent
    console.log(receiveText);
    navigate("/document/edit")
    setTimeout(() => {
      document.querySelector('.FORMRECEIVERNAME').value = receiveText

    }, 1000)
  }

  const deleteListItem = (e) => {
    const parentListItem = e.target.closest('li').id;
    setId(parentListItem)
    // console.log(parentListItem)
    console.log(parentListItem)
  }
  const fetchData = (e) => {
    setData(e)
    // console.log(e)
  }
  return (
    <div className="App">
      {/* <Router> */}
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
          <Routes>
            <Route path='/' element={
              <div>
                <DocUploder refreshData={fetchData} />
                <ul className='cards_section'>
                  {data ? (data.map((e) => { return (<Card key={e.docId} DocData={e} editListItem={editListItem} deleteListItem={deleteListItem} />) }))
                    : (<BusyIndicator
                      active
                      size="M"
                    />)}
                </ul>

                <FlexBox
                  direction="Row"
                  justifyContent="End"
                >
                  <Button
                    icon="document"
                    type="Button"
                  >
                    Report
                  </Button>
                </FlexBox>
              </div>
            } />


            <Route path='/document/edit' element={<EditForm />} />
          </Routes>
        </FlexBox>
      </FlexBox>
      {/* </Router> */}
    </div>
  );
}

export default App;
