import React from 'react';
import styles from './styles.css';

export default class BasicButton extends React.Component {

    static displayName = 'BasicButton';

    static propTypes = {
        width: React.PropTypes.number,
        height: React.PropTypes.number,
        value: React.PropTypes.string,
        disabled: React.PropTypes.bool,
        onClick: React.PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    handleClick = (e) => {
        this.props.onClick();
    }


    render() {
        const {width, height} = this.props;
        return (
            <button type="button" disabled={this.props.disabled} className={this.props.className + ' ' + styles[this.props.disabled ? 'disabled' : 'enabled']} value={this.props.value} onClick={() => this.props.onClick()} >
                {this.props.btnTxt}
            </button>
        );
    }
}
