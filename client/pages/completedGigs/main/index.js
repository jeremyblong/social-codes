import React, { Fragment } from 'react';
import CompletedGigsListHelper from '../../../components/completedGigs/main/index.js';

const CompletedGigsListPage = (props) => {
    return (
        <Fragment>
            <CompletedGigsListHelper props={props} />
        </Fragment>
    );
}
export default CompletedGigsListPage;