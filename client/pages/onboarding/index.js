import React, { Fragment } from 'react';
import OnboardingHelper from "../../components/onboarding/index.js";

const OnboardingPage = (props) => {
    return (
        <Fragment>
            <OnboardingHelper props={props} />
        </Fragment>
    );
}
export default OnboardingPage;