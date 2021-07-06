import React, { Fragment } from 'react';
import JobsHomepageDisplayHelper from "../../../components/jobs/homepage/index.js";

const JobsHomepageDisplayPage = (props) => {
    return (
        <Fragment>
            <JobsHomepageDisplayHelper props={props} />
        </Fragment>
    );
}
export default JobsHomepageDisplayPage;