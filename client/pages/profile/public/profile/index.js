import React, { Fragment } from 'react';
import PublicProfileHelper from "../../../../components/profile/public/profile/index.js";

const PublicProfilePage = (props) => {
    return (
        <Fragment>
            <PublicProfileHelper props={props} />
        </Fragment>
    )
}
export default PublicProfilePage;