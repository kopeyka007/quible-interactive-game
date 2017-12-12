import styles from './settings.css';
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import { connect } from 'react-redux';
import actions from 'settings/actions';
import { bindActionCreators } from 'redux';
import { BrowserRouter } from 'react-router';

// Containers
// import Subscription from 'settings/containers/Subscription';
// import Cancellation from 'settings/containers/Cancellation';
export default class Layout extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id={styles.root}>
                hello world
            </div>
        );
    }
}