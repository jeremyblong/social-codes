import React, { Fragment } from 'react';
import EmailConfirmationHelper from "../../../components/auth/confirmation/index.js";

const EmailConfirmationPage = (props) => {
    return (
        <Fragment>
            <EmailConfirmationHelper props={props} />
        </Fragment>
    );
}
export default EmailConfirmationPage;