import React, { Fragment } from 'react';
import PeopleBrowseListHelper from "../../../components/people/list/index.js";

const PeopleBrowseListPage = (props) => {
    return (
        <Fragment>
            <PeopleBrowseListHelper props={props} />
        </Fragment>
    );
}
export default PeopleBrowseListPage;