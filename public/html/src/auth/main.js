import React from 'react';
import ReactDOM from 'react-dom';
import Layout from 'auth/containers/layout';

const element = document.getElementById('ReactAuthPage');

if (element) {
    window.__main_container = element;
    ReactDOM.render(<Layout/>, element);
}
