import React from 'react';
import styles from './styles.css';

export default class TextInput extends React.Component {

    static displayName = 'TextInput';

    static propTypes = {
        type: React.PropTypes.string,
        value: React.PropTypes.string,
        onChange: React.PropTypes.func.isRequired
    };

    static defaultProps = {
        type: 'text',
        value: 'value'
    };


    constructor(props) {
        super(props);
    }

    handleChange = (e) => {
        this.props.onChange(e.target.value);
    }

    render() {
        const {type, value} = this.props;
        return (
            <input 
                type={type} 
                value={value}
                onChange={this.handleChange}/>
        );
    }
}
