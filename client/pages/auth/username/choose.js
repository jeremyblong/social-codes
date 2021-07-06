import React, { Fragment } from 'react';
import ChooseUsernameHelper from "../../../components/auth/username/choose.js";

const ChooseUsernamePage = (props) => {
    return (
        <Fragment>
            <ChooseUsernameHelper props={props} />
        </Fragment>
    );
}
export default ChooseUsernamePage;