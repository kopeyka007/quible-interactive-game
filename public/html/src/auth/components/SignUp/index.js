import React from 'react';
import styles from './styles.css';

import {TextInput} from 'ui/components';

export default class SignUp extends React.Component {

    static displayName = 'SignUp';

    state = {
        value : ''
    }

    onChange = (value) => {
        this.setState({value : value});
    }

    render() {
        const {value} = this.props;

        return (
            <div>
                <TextInput 
                    value={this.state.value}
                    onChange={this.onChange}/>
            </div>
        );
    }
}
