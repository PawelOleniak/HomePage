import React, { useContext } from 'react';
import GlobalStyle from './AppCss';
import './i18n/i18n';
import { Navigation, Wrapper, LoadingIndicator, Button } from 'components';
import { ThemeProvider } from 'styled-components';
import theme from 'utils/theme';
import Budget from 'subpages/Budget';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ContextProvider from 'Context';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
function App() {
  const { i18n } = useTranslation();
  return (
    <>
      <ContextProvider>
        <GlobalStyle />
        <Router>
          <Navigation
            items={[
              { content: 'Homepage', to: '/homepage' },
              { content: 'Budget', to: '/budget' },
              { content: 'Schedule', to: '/schedule' },
              { content: 'Sandbox', to: '/sandbox' },
            ]}
            Languages={
              <div>
                <Button primary variant="regular" onClick={() => i18n.changeLanguage('pl')}>
                  pl
                </Button>
                <Button primary variant="regular" onClick={() => i18n.changeLanguage('en')}>
                  en
                </Button>
              </div>
            }
          />
          <Wrapper>
            <Switch>
              <Route exact path="/homepage">
                Home
              </Route>
              <Route path="/budget">
                <Budget />
              </Route>
              <Route path="/schedule">Schedule</Route>
              <Route path="/sandbox">Sandbox</Route>
            </Switch>
          </Wrapper>
        </Router>
      </ContextProvider>
    </>
  );
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

function RootApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <React.Suspense fallback={<LoadingIndicator isCentered />}>
          <App />
        </React.Suspense>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
export default RootApp;
