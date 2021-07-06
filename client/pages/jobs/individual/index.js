import React, { Fragment } from 'react';
import JobIndividualHelper from "../../../components/jobs/individual/index.js";

const JobIndividualPage = (props) => {
    return (
        <Fragment>
            <JobIndividualHelper props={props} />
        </Fragment>
    );
}
export default JobIndividualPage;