import React, { Fragment } from 'react';
import StripeOnboardingRegisterHelper from "../../../components/auth/onboarding/stripeOnboarding.js";

const StripeOnboardingRegisterPage = (props) => {
    return (
        <Fragment>
            <StripeOnboardingRegisterHelper props={props} />
        </Fragment>
    );
}
export default StripeOnboardingRegisterPage;