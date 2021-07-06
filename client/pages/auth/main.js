import React, { Fragment } from 'react';
import AuthenticationPanelHelper from "../../components/auth/main.js";

const AuthenticationPanelPage = (props) => {
    return (
        <Fragment>
            <AuthenticationPanelHelper props={props} />
        </Fragment>
    );
}
export default AuthenticationPanelPage;