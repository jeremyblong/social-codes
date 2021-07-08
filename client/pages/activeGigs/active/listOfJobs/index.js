import React, { Fragment } from 'react'
import ActiveJobsMainPageHelper from "../../../../components/activeGigs/active/listOfJobs/index.js";

const ActiveJobsMainPageHelperPage = (props) => {
    return (
        <Fragment>
            <ActiveJobsMainPageHelper props={props} />
        </Fragment>
    );
}
export default ActiveJobsMainPageHelperPage;