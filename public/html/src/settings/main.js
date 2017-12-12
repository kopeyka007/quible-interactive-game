import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import SettingsStore from 'settings/store/settings';
import { setPage } from 'settings/actions';

import Layout from 'settings/containers/layout';

const element = document.getElementById('ReactSettingsPage');

if (element) {
    const page = "settings";
    const store = SettingsStore.getStore();
    store.dispatch(setPage(page));
    window.__main_container = element;
    console.log(store)
    ReactDOM.render(<Provider store={store}><Layout/></Provider>, element);
}
