import React, { Fragment } from 'react'
import IndividualGigManageHelper from "../../../components/activeGigs/individual/index.js";

const IndividualGigManagePage = (props) => {
    return (
        <Fragment>
            <IndividualGigManageHelper props={props} />
        </Fragment>
    );
}
export default IndividualGigManagePage;