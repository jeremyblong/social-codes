import React, { Fragment } from 'react';
import ViewCoverPhotosHelper from "../../../../components/profile/public/coverPhotos/viewCoverPhotos.js";

const ViewCoverPhotosPage = (props) => {
    return (
        <Fragment>
            <ViewCoverPhotosHelper props={props} />
        </Fragment>
    )
}
export default ViewCoverPhotosPage;