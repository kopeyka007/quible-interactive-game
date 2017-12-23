import React from 'react';
import styles from './styles.css';

export default class IntervalButton extends React.Component {

    constructor(props) {
        super(props);
    }

    handleClick = (e) => {
        this.props.handleClick(this.props.type);
    }

    renderOpen() {
        return (
            <div id={styles.button} className={styles.open} onClick={this.handleClick}>
                {this.props.subText !== '' ? (
                    <div className={styles.saveTextSmall}>{this.props.subText}</div>
                ) : null }
                <div id={styles.text}>
                    {this.props.mainText} <span className={styles.saveText}>{this.props.subText}</span>
                </div>
            </div>
        );
    }

    renderClosed() {
        return (
            <div id={styles.button} className={styles.closed}>
                {this.props.subText !== '' ? (
                    <div className={styles.saveTextSmall}>{this.props.subText}</div>
                ) : null }
                <div id={styles.text}>
                    {this.props.mainText} <span className={styles.saveTextClosed}>{this.props.subText}</span>
                </div>
            </div>
        );
    }

    render() {
        if (!this.props.display) return null;
        return (
            <div id={styles.root}>
                { this.props.selected ? this.renderClosed() : this.renderOpen() }
            </div>
        );
    }

}
