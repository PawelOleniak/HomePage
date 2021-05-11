import React, { Fragment} from 'react';
import GlobalStyle from './AppCss';
import "./i18n/i18n"
import { Navigation, Wrapper, LoadingIndicator, Button }  from "components";
import {ThemeProvider} from "styled-components";
import  theme          from "utils/theme";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import Provider from 'Context';


function App() {
  const { i18n } = useTranslation();

  return (
    <Fragment>
      <Provider>
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
                <Button primary variant="regular" onClick={()=>i18n.changeLanguage("pl")}>pl</Button>
                <Button primary variant="regular" onClick={()=>i18n.changeLanguage("en")}>en</Button>
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
      </Provider>
    </Fragment>
  );
}


function RootApp(){
  return(
    <ThemeProvider theme={theme}>
      <React.Suspense fallback={<LoadingIndicator/>}>
        <App/>
      </React.Suspense>
    </ThemeProvider>
  );
};
export default RootApp;
