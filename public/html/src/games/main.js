import React from 'react';
import ReactDOM from 'react-dom';
import Layout from 'games/containers/layout';

const element = document.getElementById('ReactGamesPage');

if (element) {
    window.__main_container = element;
    ReactDOM.render(<Layout/>, element);
}
