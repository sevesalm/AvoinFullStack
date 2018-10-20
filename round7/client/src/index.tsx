import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import CssBaseline from '@material-ui/core/CssBaseline';
import App from './App';
import './index.css';
import store from './store';

const render = () => {
  ReactDOM.render(
    <CssBaseline>
      <Provider store={store}>
        <App store={store} />
      </Provider>
    </CssBaseline>,
    document.getElementById('root')
  );
};

render();
store.subscribe(render);
