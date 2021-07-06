import React, { Fragment } from 'react';
import EmailCreationPageHelper from "../../../components/auth/email/email.js";

const EmailCreationPage = (props) => {
    return (
        <Fragment>
            <EmailCreationPageHelper props={props} />
        </Fragment>
    );
}
export default EmailCreationPage;