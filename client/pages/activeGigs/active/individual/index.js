import React, { Fragment } from 'react'
import IndividualActiveJobHelper from "../../../../components/activeGigs/active/individual/index.js";


const IndividualActiveJobPage = (props) => {
    return (
        <Fragment>
            <IndividualActiveJobHelper props={props} />
        </Fragment>
    );
}
export default IndividualActiveJobPage;