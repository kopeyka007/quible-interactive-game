import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import { createBrowserHistory } from 'history'
import rootReducer from 'reducers';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

const store = createStore(
	combineReducers({
	  ...rootReducer,
	  routing: routerReducer
	})
  )

const history = syncHistoryWithStore(createBrowserHistory(), store)

import Layout from 'containers/layout';

ReactDOM.render(<Provider store={store}>
					<Router history={history}>
						<Route path="/(:filter)" component={Layout} />
					</Router>
				</Provider>, document.getElementById('ReactPage'));
