import React, { Fragment } from 'react';
import PersonalDetailsHelper from "../../../components/auth/personal/details.js";

const PersonalDetailsPage = (props) => {
    return (
        <Fragment>
            <PersonalDetailsHelper props={props} />
        </Fragment>
    );
}
export default PersonalDetailsPage;