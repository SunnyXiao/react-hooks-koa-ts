import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import Loading from './components/Loading';
import AppContextProvider from './context/appContextProvider';
import { LOADING_TIP } from './constants';
import Routes from './router';
import './icons.js'

const { lazy, Suspense } = React;

const App = lazy(() => import('./containers/App/index'));

ReactDOM.render(
  <Suspense fallback={<Loading height="100vh" tip={LOADING_TIP} />}>
    <AppContextProvider>
      <HashRouter >
        <App>
          <Routes />
        </App>
      </HashRouter>
    </AppContextProvider>
  </Suspense>,
  document.getElementById('root')
);
