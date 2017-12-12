import account from './account.css';
import styles from './Cancellation.css';
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import { connect } from 'react-redux';
import actions from 'account/actions';
import { bindActionCreators } from 'redux';
import { BrowserRouter } from 'react-router';

import RatingForm from 'account/components/RatingForm';
import Survey from 'account/components/Survey';
import CouponStream from 'account/components/CancellationStreams/CouponStream';
import PauseStream from 'account/components/CancellationStreams/PauseStream';
import ChatStream from 'account/components/CancellationStreams/ChatStream';

class Cancellation extends React.Component {

    state = {
      activeStream: '',
      ratingEmpty: true,
      showRating: true
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    formatName = (name) => {
        let formatted = name.charAt(0).toUpperCase() + name.slice(1);
        return formatted;
    }

    handleChangeStream = (stream) => {
        if (stream == 'coupon' && (this.props.subscription.get('discount') || this.props.subscription.get('interval') == 'yearly')) {
            stream = 'chat';
        }
        this.setState({
            activeStream: stream
        });
    }

    handleSwapSurvey = () => {
        this.setState({
            showRating: !this.state.showRating
        });
    }

    handleReasonClick = (reason, intervention) => {
        if (intervention == 'coupon' && (this.props.subscription.get('discount') || this.props.subscription.get('interval') == 'yearly')) {
            intervention = 'chat';
        }
        this.props.actions.setCancellationReason(reason);
        this.props.actions.setCancellationInterventionType(intervention);
        this.props.actions.updateCancellationSurvey({reason, intervention});
    }

    updateButtonStatus = () => {
        this.setState({ ratingEmpty: false });
    }

    renderCouponStream() {
        return <CouponStream
            delete={this.props.cancellation.get('delete_account')}
            cancelAction={this.props.actions.cancelSubscription}
            handleCancellationStatus={this.props.actions.setCancellationStatus}
            handleApplyCoupon={this.props.actions.applyInterventionCoupon}
            updateSurveyAction={this.props.actions.updateCancellationSurvey}
            cancellationState={this.props.cancellation} />;
    }

    renderPauseStream() {
        return <PauseStream
            username={this.props.user.get('name')}
            formatName={this.formatName}
            delete={this.props.cancellation.get('delete_account')}
            cancelAction={this.props.actions.cancelSubscription}
            handleCancellationStatus={this.props.actions.setCancellationStatus}
            updateSurveyAction={this.props.actions.updateCancellationSurvey}
            createFromTemplate={this.props.actions.createFromTemplate}
            cancellationState={this.props.cancellation} />;
    }

    renderChatStream() {
        return <ChatStream
            delete={this.props.cancellation.get('delete_account')}
            cancelAction={this.props.actions.cancelSubscription}
            handleUserFeedback={this.props.actions.setCancellationFeedback}
            handleCancellationStatus={this.props.actions.setCancellationStatus}
            updateSurveyAction={this.props.actions.updateCancellationSurvey}
            cancellationState={this.props.cancellation} />;
    }

    renderStream() {
        switch (this.state.activeStream) {
            case 'coupon':
                return this.renderCouponStream();
            case 'pause':
                return this.renderPauseStream();
            case 'chat':
                return this.renderChatStream();
            default:
                return null;
        }
    }

    renderSurvey() {
        return this.state.showRating ? (
            <RatingForm
                status={this.state.ratingEmpty}
                rating={this.props.cancellation.get('rating')}
                handleRatingClick={this.props.actions.setCancellationRating}
                handleSwapSurvey={this.handleSwapSurvey}
                updateButtonStatus={this.updateButtonStatus}
                storeSurveyAction={this.props.actions.storeCancellationSurvey}
                cancellationState={this.props.cancellation.toJS()} />
        ) : (
            <div id={styles.root}>
            <Survey
                username={this.props.user.get('name')}
                formatName={this.formatName}
                handleReasonClick={this.handleReasonClick}
                handleChangeStream={this.handleChangeStream} />
            </div>
        );
    }

    render() {
        // console.log(this.props.cancellation.toJS());
        return (
            <div id={styles.cancelContent}>
                { this.state.activeStream ? this.renderStream() : this.renderSurvey() }
            </div>
        );
    }
}



const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cancellation);
