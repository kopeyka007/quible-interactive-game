import styles from './auth.css';
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

//import SignUp from 'auth/containers';
import SignUp from 'auth/components/SignUp';

export default class Layout extends React.Component {

    render() {
        return (
            <div id={styles.root}>
                hello worlds
                <SignUp/>
            </div>
        );
    }
}