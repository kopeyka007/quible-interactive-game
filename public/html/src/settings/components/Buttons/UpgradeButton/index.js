import React from 'react';
import styles from './styles.css';

export default class UpgradeButton extends React.Component {

    constructor(props) {
        super(props);
    }

    handleClick = () => {
        let eventName = this.props.type === 'business' ? 'Upgrade Business Modal' : 'Upgrade Premium Modal';
        this.props.handleClick(this.props.type);
        mixpanel.track(eventName, {
            'Button Number': this.props.mixpanelNumber,
            'Period': this.props.interval
        });
    }

    render() {
        return (
            <div id={styles.root} className={styles[this.props.type + 'Button'] + ' ' + styles[this.props.isModal ? 'max40' : 'noMax']} onClick={this.handleClick}>
                Upgrade
            </div>
        );
    }

}
