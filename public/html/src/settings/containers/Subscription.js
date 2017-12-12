import styles from './account.css';
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import { connect } from 'react-redux';
import actions from 'account/actions';
import { bindActionCreators } from 'redux';
import { Match } from 'react-router';
import config from 'config';

import IntervalSelect from 'account/components/IntervalSelect';
import SubscriptionCard from 'account/components/SubscriptionCard';
import UpgradeButton from 'account/components/Buttons/UpgradeButton';
import CreditCardBox from 'account/components/CreditCardBox';
import BaseModal from 'account/components/Modals/BaseModal';
import UpgradeModal from 'account/components/Modals/UpgradeModal';
import SuccessModal from 'account/components/Modals/SuccessModal';
import FailedModal from 'account/components/Modals/FailedModal';
import PostUpgradeModal from 'account/components/Modals/PostUpgradeModal';
import VGTrack from '../../api/tracking';

class Subscription extends React.Component {

    state = {
        modalPremium: false,
        modalBusiness: false,
        modalEducation: false,
        modalAddMembers: false,
        modalPremiumToBusiness: false,
        modalUpgradeToYearly: false,
        allowMonthly: false,
        allowQuarterly: false,
        addMemberVal: '1',
    }

    constructor(props) {
        super(props);
    }

    handleSetPending = (arg) => {
        this.setState({ isPending: true });
        switch (arg) {
            case 'updateCard':
                return this.setState({
                    updateCardPending: true,
                    updateCardSuccess: false,
                    updateCardFailed: false
                });
            case 'upgradeUser':
                return this.setState({
                    upgradeUserPending: true,
                    upgradeUserSuccess: false,
                    upgradeUserFailed: false
                });
            case 'cancelSubscription':
                return this.setState({
                    cancelSubscriptionPending: true,
                    cancelSubscriptionSuccess: false,
                    cancelSubscriptionFailed: false
                });
            case 'addBusinessMembers':
                return this.setState({
                    addBusinessMembersPending: true,
                    addBusinessMembersSuccess: false,
                    addBusinessMembersFailed: false
                });
            default:
                break;
        }
    }

    handleValueChange = (e) => {
        return this.setState({
            [e.target.name + 'Val']: e.target.value
        });
    }

    handleIntervalChanged = (arg, e) => {
        this.setState({ currentInterval: arg });
    }

    handleOpenModal = (arg, e) => {
        switch (arg) {
            case 'premium':
                return this.setState({
                    modalPremium: true,
                    modalBusiness: false,
                    modalEducation: false
                });
            case 'business':
                return this.setState({
                    modalPremium: false,
                    modalBusiness: true,
                    modalEducation: false
                });
            case 'education':
                return this.setState({
                    modalPremium: false,
                    modalBusiness: false,
                    modalEducation: true
                });
            default:
                break;
        }
    }

    handleSetUpgradeActive = () => {
        this.setState({ upgradeActive: true });
    }

    handleCloseModal = () => {
        this.setState({
            upgradeActive: false,
            modalPremium: false,
            modalBusiness: false,
            modalEducation: false,
            modalAddMembers: false,
            modalPremiumToBusiness: false,
            modalUpgradeToYearly: false,
        });
    }

    handleCloseResultsModals = () => {
        this.setState({
            updateCardSuccess: false,
            cancelSubscriptionSuccess: false,
            addBusinessMembersSuccess: false,
            updateCardFailed: false,
            upgradeUserFailed: false,
            cancelSubscriptionFailed: false,
            addBusinessMembersFailed: false,
            premiumToBusinessFailed: false,
        });
    }

    handleCancelClicked = () => {
        this.props.actions.setPage('cancellation');
        VGTrack.trackEvent({click: 'cancel', cancel: 'subscription'}, {button_id: 'cancel subscription', subscription: this.props.subscription.get('plan')});
    }

    handleReactivateClicked = () => {
        this.props.actions.reactivateSubscription();
    }

    handleAddMemberClicked = () => {
        if (this.state.addMemberVal < 1) return;
        this.setState({ modalAddMembers: true });
    }

    handleIntervalStates = () => {
        this.state.allowMonthly = false;
        this.state.allowQuarterly = false;
        switch (this.props.subscription.get('interval')) {
            case 'free':
            case 'monthly':
                this.state.allowMonthly = true;
            case 'quarterly':
                this.state.allowQuarterly = true;
            case 'yearly':
                break;
            default:
                break;
        }
        if (this.props.subscription.get('interval') !== null) {
            if (this.state.currentInterval !== 'quarterly' && this.state.currentInterval !== 'yearly') {
                this.state.currentInterval = 'monthly';
            }
            if (this.state.currentInterval === 'monthly' && !this.state.allowMonthly) {
                this.state.currentInterval = 'quarterly';
            }
            if (this.state.currentInterval === 'quarterly' && !this.state.allowQuarterly) {
                this.state.currentInterval = 'yearly';
            }
        }
    }

    handlePendingStates = () => {
        if (this.state.updateCardPending) {
            if (this.props.account.get('updateCardSuccess')) {
                this.state.isPending = false;
                this.state.updateCardPending = false;
                this.state.updateCardSuccess = true;

                _gaq.push(['_trackEvent', 'account', 'updated', 'Card']);

                this.state.callResetActions = true;
            } else if (this.props.account.get('updateCardFailed')) {
                this.state.isPending = false;
                this.state.updateCardPending = false;
                this.state.updateCardFailed = true;

                this.state.callResetActions = true;
            }
        }
        if (this.state.upgradeUserPending) {
            if (this.props.account.get('userSuccess') && this.props.account.get('teamSuccess')) {
                this.state.isPending = false;
                this.state.upgradeUserPending = false;
                this.state.upgradeUserSuccess = true;

                this.state.upgradeActive = false;
                this.state.modalPremium = false;
                this.state.modalBusiness = false;
                this.state.modalEducation = false;

                let eventName = '', plan = '';
                switch (this.props.subscription.get('plan')) {
                    case 'premium':
                        eventName = 'Upgrade Premium';
                        plan = 'Premium';
                        break;
                    case 'business':
                        eventName = 'Upgrade Business';
                        plan = 'Business';
                        break;
                    case 'education':
                        eventName = 'Upgrade Education';
                        plan = 'Education';
                        break;
                }
                if (eventName !== '') {
                    mixpanel.track(eventName);
                    mixpanel.people.set({'Plan': plan});
                    mixpanel.identify(this.props.user.get('email'));

                    _gaq.push(['_trackEvent', 'account', 'upgraded', plan]);
                }

                this.state.callResetActions = true;
            } else if (this.props.account.get('upgradeUserFailed')) {
                this.state.isPending = false;
                this.state.upgradeUserPending = false;
                this.state.upgradeUserFailed = true;

                this.state.callResetActions = true;
            }
        }
        if (this.state.cancelSubscriptionPending) {
            if (this.props.account.get('userSuccess')) {
                this.state.isPending = false;
                this.state.cancelSubscriptionPending = false;
                this.state.cancelSubscriptionSuccess = true;
                this.state.callResetActions = true;
            } else if (this.props.account.get('cancelSubscriptionFailed')) {
                this.state.isPending = false;
                this.state.cancelSubscriptionPending = false;
                this.state.cancelSubscriptionFailed = true;

                this.state.callResetActions = true;
            }
        }
        if (this.state.addBusinessMembersPending) {
            if (this.props.account.get('teamSuccess')) {
                this.state.isPending = false;
                this.state.addBusinessMembersPending = false;
                this.state.addBusinessMembersSuccess = true;

                mixpanel.track('Add Business Member', {
                    'Count': this.state.addMemberVal
                });

                this.state.callResetActions = true;
            } else if (this.props.account.get('addBusinessMembersFailed')) {
                this.state.isPending = false;
                this.state.addBusinessMembersPending = false;
                this.state.addBusinessMembersFailed = true;

                this.state.callResetActions = true;
            }
        }
    }

    handleOpenChat() {
        Chatra.show();
        Chatra.openChat();
    }

    renderSubscriptionDetails() {
        let endDate = new Date(this.props.subscription.get('endDate') * 1000),
            nextStart = new Date(this.props.subscription.get('nextStart') * 1000),
            nextEnd = new Date(this.props.subscription.get('nextEnd') * 1000),
            months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        // Only allow if premium/business users with no extra members AND non-yearly plan
        let allowYearlyUpgrade = (
            this.props.subscription.get('interval') !== 'yearly'
            && !this.props.subscription.get('paused')
            && !this.props.subscription.get('cancelled')
            && (this.props.subscription.get('plan') === 'premium' || this.props.account.get('teamMaxSize') === this.props.account.get('teamBaseSize'))
        );
        return (
            <div id={styles.subscriptionDetails} className={styles.subscriptionBlock}>
                <div className={styles.titleSmall}>Subscription Details</div>
                <table>
                    <tbody>
                        <tr>
                            <th>Subscription Plan</th>
                            <td className={styles.caps}>
                                {this.props.subscription.get('plan')}&nbsp;{this.props.subscription.get('interval')}
                                { allowYearlyUpgrade ? this.renderYearlyUpgrade() : null }
                            </td>
                        </tr>
                        { this.props.subscription.get('paused') || this.props.subscription.get('cancelled') ? (
                            <tr>
                                <th>Status</th>
                                <td>{ this.props.subscription.get('paused') ? 'Paused' : 'Cancelled' }</td>
                            </tr>
                        ) : null }
                        <tr>
                            { this.props.subscription.get('cancelled') ? (<th>Subscription End Date</th>) : (<th>Next Invoice Date</th>) }
                            <td>{months[endDate.getMonth()]}&nbsp;{endDate.getDate()},&nbsp;{endDate.getFullYear()}</td>
                        </tr>
                        { !this.props.subscription.get('cancelled') ? (
                            <tr>
                                <th>Next Billing Period</th>
                                <td>
                                    {months[nextStart.getMonth()]}&nbsp;{nextStart.getDate()},&nbsp;{nextStart.getFullYear()}&nbsp;to&nbsp;
                                    {months[nextEnd.getMonth()]}&nbsp;{nextEnd.getDate()},&nbsp;{nextEnd.getFullYear()}
                                </td>
                            </tr>
                        ) : null }
                        { this.props.subscription.get('plan') === 'business' ? (
                            <tr>
                                <th>Current Team Size</th>
                                <td>{this.props.account.get('teamSize') || '1'} / {this.props.account.get('teamMaxSize') || '1'}</td>
                            </tr>
                        ) : ( allowYearlyUpgrade ? this.renderYearlyUpgrade(true) : null ) }
                        { this.props.subscription.get('plan') === 'business' &&
                          !this.props.subscription.get('cancelled') ? (
                            <tr>
                                <th>
                                    { allowYearlyUpgrade ? this.renderYearlyUpgrade(true) : null }
                                </th>
                                <td>
                                    Additional team member - ${this.props.account.get('memberPrice') || '49'}.00 (USD)
                                    <ul id={styles.addMemberList}>
                                        <li>
                                            <input type='number'
                                                name='addMember'
                                                id={styles.addMemberInput}
                                                min='1'
                                                defaultValue='1'
                                                onChange={this.handleValueChange}/>
                                        </li>
                                        <li>
                                            <div id={styles.addMemberButton} onClick={this.handleAddMemberClicked}>Add Member</div>
                                        </li>
                                    </ul>
                                </td>
                            </tr>
                        ) : null }
                    </tbody>
                </table>
            </div>
        );
    }

    renderPremiumToBusinessUpgrade() {
        return (
            <div id={styles.businessUpgrade} className={styles.subscriptionBlock}>
                <div className={styles.titleSmall}>Unlock the Business Plan</div>
                <p>Venngage Business includes unlimited templates, branding kit,<br/>team collaboration, organizational folders + more!</p>
                <UpgradeButton
                    type={'business'}
                    mixpanelNumber={'Subscription Page'}
                    interval={this.props.subscription.get('interval')}
                    handleClick={() => {
                        mixpanel.track('Upgrade Premium to Business Modal', { interval: this.props.subscription.get('interval') });
                        this.setState({ modalPremiumToBusiness: true });
                    }} />
            </div>
        );
    }

    renderYearlyUpgrade(isMobile = false) {
        return (
            <div
                className={`${styles.yearlyUpgradeButton} ${isMobile ? styles.hideDesktop : styles.hideMobile}`}
                onClick={() => {
                    mixpanel.track('Upgrade Yearly Modal', {
                        plan: this.props.subscription.get('plan'),
                        interval: this.props.subscription.get('interval'),
                    });
                    this.setState({ modalUpgradeToYearly: true });
                }}>
                Switch To Yearly
            </div>
        );
    }

    renderUpdateCard() {
        return (
            <div id={styles.updateCard} className={styles.subscriptionBlock}>
                <div className={styles.titleSmall}>Update/Change Credit Card Information</div>
                <div id={styles.creditCardBox}>
                    <CreditCardBox
                        type={'update'}
                        plan={'update'}
                        handleSetPending={this.handleSetPending}
                        action={this.props.actions.updateCard}
                        clearFields={this.state.updateCardSuccess}/>
                </div>
            </div>
        );
    }

    renderCancelSubscription() {
        return (
            <div id={styles.cancelSubscription} className={styles.subscriptionBlock}>
                <div className={styles.titleSmall}>Cancel Subscription</div>
                <div id={styles.cancelSubscriptionButton} onClick={this.handleCancelClicked}>Cancel My Subscription</div>
            </div>
        );
    }

    renderReactivateSubscription() {
        return (
            <div className={styles.subscriptionBlock}>
                <div className={styles.titleSmall}>Reactivate Subscription</div>
                <div id={styles.reactivateSubscriptionButton} onClick={this.handleReactivateClicked}>Reactivate Now</div>
            </div>
        );
    }

    renderFreeContent() {
        let hideMobile = this.state.upgradeActive ? 'hideMobile' : 'showMobile';
        return (
            <div id={styles.contentCenter} className={styles[hideMobile]}>
                <div className={styles.title}>Upgrade Your Plan</div>
                <IntervalSelect
                    selected={this.state.currentInterval}
                    displayMonthly={this.state.allowMonthly}
                    displayQuarterly={this.state.allowQuarterly}
                    handleClick={this.handleIntervalChanged}/>
                <ul id={styles.cardsList}>
                    <li id={'premiumCard'}>
                        <SubscriptionCard
                            type={'premium'}
                            interval={this.state.currentInterval}
                            handleButtonClick={this.handleOpenModal}/>
                    </li>
                    <li id={'businessCard'}>
                        <SubscriptionCard
                            type={'business'}
                            interval={this.state.currentInterval}
                            handleButtonClick={this.handleOpenModal}/>
                    </li>
                </ul>
                <div id={styles.bottomContent}>
                    <div id={styles.credit}>
                        We Accept:<br/>
                        <div id={styles.creditImage}></div>
                    </div>
                    <div id={styles.starsImage}></div>
                    <h2>Join 21,000 businesses who use Venngage!</h2>
                    <div id={styles.companiesImage}></div>
                </div>
            </div>
        );
    }

    renderPremiumContent() {
        // Only allow premium plans to upgrade to business
        let allowPremiumToBusinessUpgrade = this.props.subscription.get('plan') === 'premium';
        let hideMobile = this.state.upgradeActive ? 'hideMobile' : 'showMobile';

        return (
            <div id={styles.contentLeft} className={styles[hideMobile]}>
                { this.renderSubscriptionDetails() }
                { allowPremiumToBusinessUpgrade ? this.renderPremiumToBusinessUpgrade() : null }
                { this.renderUpdateCard() }
                { this.renderCancelSubscription() }
            </div>
        );
    }

    renderCancelledContent() {
        return (
            <div id={styles.contentLeft}>
                { this.renderSubscriptionDetails() }
                If you wish to renew your subscription, please contact support.
            </div>
        )
    }

    renderPausedContent() {
        return (
            <div id={styles.contentLeft}>
                { this.renderSubscriptionDetails() }
                { this.renderUpdateCard() }
                { this.renderReactivateSubscription() }
            </div>
        );
    }

    renderContent() {
        if (this.props.subscription.get('paused')) return this.renderPausedContent();
        switch (this.props.subscription.get('plan')) {
            case 'free':
                return this.renderFreeContent();
            case 'premium':
            case 'business':
            case 'education':
            case 'enterprise':
                return this.props.subscription.get('cancelled') ? this.renderCancelledContent() : this.renderPremiumContent();
            default:
                return;
        }
    }

    renderModal(type = 'premium', interval = this.state.currentInterval) {
        if (interval === 'monthly' && !this.state.allowMonthly) interval = 'quarterly';
        if (interval === 'quarterly' && !this.state.allowQuarterly) interval = 'yearly';
        return this.props.subscription.get('plan') === 'free'
            || this.props.subscription.get('plan') === 'premium'
            && !this.props.subscription.get('cancelled') && type === 'business' ? (
            <UpgradeModal
                type={type}
                interval={interval}
                allowMonthly={this.state.allowMonthly}
                allowQuarterly={this.state.allowQuarterly}
                allowDiscount={!this.props.user.get('hasSubscription') && type !== 'education'}
                handleClose={this.handleCloseModal}
                handleSetPending={this.handleSetPending}
                handleFailedClose={this.handleCloseResultsModals}
                checkCoupon={this.props.actions.checkCoupon}
                upgradeAction={this.props.actions.upgradeUser}
                upgradeFailed={this.state.upgradeUserFailed}
                setUpgradeActive={this.handleSetUpgradeActive}
                accountState={this.props.account}/>
        ) : null;
    }

    renderAddMembersModal() {
        return (
            <BaseModal
                handleClose={this.handleCloseModal}
                center={false}>
                <div className={styles.modalTitle}>Add Team Members</div>
                <div className={styles.modalText}>{`Are you sure you want to add ${this.state.addMemberVal} team member${this.state.addMemberVal > 1 ? 's' : ''}?`}</div>
                <div className={styles.modalButtonContainer}>
                    <div
                        className={`${styles.modalButton} ${styles.modalNoButton}`}
                        onClick={this.handleCloseModal}>
                        NO
                    </div>
                    <div
                        className={`${styles.modalButton} ${styles.modalConfirmButton}`}
                        onClick={() => {
                            this.handleSetPending('addBusinessMembers');
                            this.props.actions.addBusinessMembers(this.state.addMemberVal);
                            this.handleCloseModal();
                        }}>
                        {`Yes, Add Team Member${this.state.addMemberVal > 1 ? 's' : ''}`}
                    </div>
                </div>
            </BaseModal>
        );
    }

    renderPremiumToBusinessModal() {
        return (
            <BaseModal
                handleClose={this.handleCloseModal}
                center={false}>
                <div className={styles.modalTitle}>Upgrade to Business Plan</div>
                <div className={styles.modalText}>
                    Are you sure you want to upgrade now? Please note the card on file will be charged immediately.
                </div>
                <div className={styles.modalButtonContainer}>
                    <div
                        className={`${styles.modalButton} ${styles.modalOrangeButton}`}
                        onClick={() => {
                            mixpanel.track('Upgrade Premium to Business', { interval: this.props.subscription.get('interval') });
                            this.handleSetPending('upgradeUser');
                            this.props.actions.upgradeExistingUser('business', this.props.subscription.get('interval'), '');
                            this.handleCloseModal();
                        }}>
                        YES!
                    </div>
                </div>
            </BaseModal>
        );
    }

    renderUpgradeToYearlyModal() {
        return (
            <BaseModal
                handleClose={this.handleCloseModal}
                center={false}
                width={420}>
                <div className={styles.modalTitle}>Are you ready to switch your account from a {this.props.subscription.get('interval')} plan to a yearly plan?</div>
                <div className={styles.modalText}>
                    The change will take place immediately and you can view the charge in your billing history.
                </div>
                <div className={styles.modalButtonContainer}>
                    <div
                        className={`${styles.modalButton} ${styles.modalOrangeButton}`}
                        onClick={() => {
                            mixpanel.track('Upgrade Yearly', {
                                plan: this.props.subscription.get('plan'),
                                interval: this.props.subscription.get('interval'),
                            });
                            this.handleSetPending('upgradeUser');
                            this.props.actions.upgradeExistingUser(this.props.subscription.get('plan'), 'yearly', '');
                            this.handleCloseModal();
                        }}>
                        Yes
                    </div>
                </div>
            </BaseModal>
        );
    }

    renderSuccessModal(type) {
        return <SuccessModal
                    type={type}
                    handleClose={this.handleCloseResultsModals}/>;
    }

    renderFailedModal(type, message) {
        return <FailedModal
                    type={type}
                    message={message}
                    handleClose={this.handleCloseResultsModals}/>;
    }

    renderPostUpgradeModal() {
        return <PostUpgradeModal
                    type={this.props.subscription.get('plan')}/>
    }

    // renderCancellationSurvey() {
    //     return <iframe src="https://docs.google.com/forms/d/1-Vni7gfdyfJIqKnzKKB5Ev2TnWhuHdtssURe_ddeq_k/viewform?embedded=true" width="100%" height="1125px">Loading...</iframe>;
    // }

    renderModals() {
        // Post-upgrade modal
        if (this.state.upgradeUserSuccess) return this.renderPostUpgradeModal();
        // Success modals
        if (this.state.updateCardSuccess) return this.renderSuccessModal('updateCard');
        if (this.state.addBusinessMembersSuccess) return this.renderSuccessModal('addBusinessMembers');
        // Failed modals
        if (this.state.updateCardFailed) return this.renderFailedModal('update', this.props.account.get('updateFailedMessage'));
        if (this.state.cancelSubscriptionFailed) return this.renderFailedModal('cancel', this.props.account.get('cancelFailedMessage'));
		if (this.state.addBusinessMembersFailed) return this.renderFailedModal('addMember', this.props.account.get('addMemberFailedMessage'));
		//Comment line because this key use to show failed modal in next modal
        //if (this.state.upgradeUserFailed) return this.renderFailedModal('upgrade', this.props.account.get('upgradeFailedMessage'));

        if (this.state.modalPremium) {
            return this.renderModal('premium');
        } else if (this.state.modalBusiness) {
            return this.renderModal('business');
        } else if (this.state.modalEducation) {
            return this.renderModal('education');
        }
        // Confirm modals
        if (this.state.modalAddMembers) return this.renderAddMembersModal();
        if (this.state.modalPremiumToBusiness) return this.renderPremiumToBusinessModal();
        if (this.state.modalUpgradeToYearly) return this.renderUpgradeToYearlyModal();
    }

    renderPending() {
        // From http://tobiasahlin.com/spinkit/
        return (
            <div id={styles.pendingScreen}>
                <div className={styles.pendingSpinner}>
                    <div className={styles.bounce1}></div>
                    <div className={styles.bounce2}></div>
                    <div className={styles.bounce3}></div>
                </div>
            </div>
        );
    }

    componentWillReceiveProps(nextProps) {
        // Once subscription props have been loaded, handle url/upgrade modals
        if (nextProps.account.get('userSuccess')) {
            let urlPath = window.location.pathname.replace('/account/subscription', '');
            // Handle business upgrade modal from url for premium users
            if (nextProps.subscription.get('plan') === 'premium'
                && /^\/business/.test(urlPath)
                && !nextProps.subscription.get('cancelled')
                && !nextProps.subscription.get('paused')
            ) {
                this.setState({ modalPremiumToBusiness: true });
            // Handle premium/business/education upgrade url for premium users
            } else if (nextProps.subscription.get('plan') === 'free') {
                // Set currentInterval in state
                if (/yearly$/.test(urlPath)) {
                    this.setState({ currentInterval: 'yearly' });
                } else if (/quarterly$/.test(urlPath)) {
                    this.setState({ currentInterval: 'quarterly' });
                } else {
                    this.setState({ currentInterval: 'monthly' });
                }
                // Set upgrade modals in state based on url
                if (/^\/premium/.test(urlPath)) {
                    this.setState({ modalPremium: true });
                } else if (/^\/business/.test(urlPath)) {
                    this.setState({ modalBusiness: true });
                } else if (/^\/education/.test(urlPath)) {
                    this.setState({ modalEducation: true });
                }
            }
            // When finished, push router state so that upgrade modals don't trigger again
            history.replaceState({}, '', '/account/subscription');
        }
    }

    componentDidUpdate() {
        if (this.state.callResetActions) {
            if (this.state.updateCardSuccess || this.state.updateCardFailed) {
                this.props.actions.updateCardReset();
            } if (this.state.upgradeUserSuccess || this.state.upgradeUserFailed) {
                this.props.actions.upgradeUserReset();
            } if (this.state.cancelSubscriptionSuccess || this.state.cancelSubscriptionFailed) {
                this.props.actions.cancelSubscriptionReset();
            } if (this.state.addBusinessMembersSuccess || this.state.addBusinessMembersFailed) {
                this.props.actions.addBusinessMembersReset();
            }
            this.state.callResetActions = false;
        }
    }

    render() {
        // Handle behaviour for team members and premium guests
        if (this.props.subscription.get('plan') === 'team-member') {
            return (
                <div id={styles.contentLeft}>
                    <h2 className={styles.errorMessage}>
                        Please contact your team owner to make changes to your subscription.
                    </h2>
                </div>
            );
        } else if (this.props.subscription.get('plan') === 'no-stripe') {
            return (
                <div id={styles.contentLeft}>
                    <h2 className={styles.errorMessage}>
                        To get help with your account subscription, you can <a className={styles.clickCursor} onClick={this.handleOpenChat}>live chat</a> with our support team
                        or email them at <a className={styles.clickCursor} href={'mailto:support@venngage.com'}>support@venngage.com</a>.
                    </h2>
                </div>
            );
        }
        this.handleIntervalStates();
        if (this.state.isPending) this.handlePendingStates();
        if (this.state.cancelSubscriptionSuccess) return this.renderCancellationSurvey();
        return (
            <div id={styles.pageContent}>
                { this.renderContent() }
                { this.renderModals() }
                { this.state.isPending ? this.renderPending() : null }
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

export default connect(mapStateToProps, mapDispatchToProps)(Subscription);
