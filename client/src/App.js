
import { FlexBox, Button } from '@ui5/webcomponents-react';
import './App.css';
// import DataFatch from './components/DataFatch/DataFatch';
import Header from './components/Header/Header';
import SideNavigationBar from './components/SideNavigationBar/SideNavigationBar';
import ListDoc from './components/ListDoc/ListDoc';
import DocToolbar from './components/DocToolbar/DocToolbar';
import DocData from './components/DocData/DocData';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import DocUploder from './components/DocUploder/DocUploder';

function App() {
  return (
    <div className="App">
      <Router>
        {/* <DataFatch /> */}
        <Header />
        <FlexBox
          // alignItems="Center"
          direction="Row"
          justifyContent="Space-between"
          wrap="NoWrap"
          style={{ width: "100%", height: "90%" }}
        >
          <SideNavigationBar />



          <Routes>

            <FlexBox
                direction="Column"
                justifyContent="Start"
                style={{ height: "100%", width: "100%" }}
              >
                <DocToolbar />
                <ListDoc />
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


          </Routes>
        </FlexBox>

        {/* <DocData /> */}
      </Router>
    </div>
  );
}

export default App;
