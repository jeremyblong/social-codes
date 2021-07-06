import React, { Fragment } from 'react';
import ForumListingIndividualHelper from "../../../../components/forums/individual/individualListing/forumListing.js";

const ForumListingIndividualPage = (props) => {
    return (
        <Fragment>
            <ForumListingIndividualHelper props={props} />
        </Fragment>
    );
}
export default ForumListingIndividualPage;