import logo from './logo.svg';
import GlobalStyle from './index.css';
import "App.css"
import { Navigation, Wrapper }  from "components";
import {ThemeProvider} from "styled-components";
import  theme          from "utils/theme";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";



function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle/>
      <Router>
        <Navigation items={[
          { content: "Homepage", to:"/"},
          { content: "Budget", to:"/budget"},
          { content: "Schedule", to:"/schedule"},
          { content: "Sandbox", to:"/sandbox"}
        ]}
        Languages={(
            <div>
              <button>pl</button>
              <button>en</button>
            </div>
        )}/>
        <Wrapper>
          <Switch>
            <Route exact path="/">
              Home
            </Route>
            <Route path="/budget">
              Budget
            </Route>
            <Route path="/schedule">
              Schedule
            </Route>
            <Route path="/sandbox">
              Sandbox
            </Route>
          </Switch>
        </Wrapper>
      </Router>
      <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
    </ThemeProvider>
  );
}

export default App;
