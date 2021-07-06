import React, { Fragment } from 'react';
import PublicProfileOtherUserHelper from "../../../components/people/profile/publicProfile.js";

const PublicProfileOtherUserPage = (props) => {
    return (
        <Fragment>
            <PublicProfileOtherUserHelper props={props} />
        </Fragment>
    );
}
export default PublicProfileOtherUserPage;