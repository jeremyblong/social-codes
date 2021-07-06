import React, { Fragment } from 'react'
import ManageApplicantsHelper from "../../../components/applicants/manage/manageApplicants.js";


const ManageApplicantsPage = (props) => {
    return (
        <Fragment>
            <ManageApplicantsHelper props={props} />
        </Fragment>
    );
}
export default ManageApplicantsPage;