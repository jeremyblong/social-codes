import React, { Fragment } from 'react';
import PendingFriendsListHelper from "../../../components/friends/pending/index.js";

const PendingFriendsListPage = (props) => {
    return (
        <Fragment>
            <PendingFriendsListHelper props={props} />
        </Fragment>
    );
}
export default PendingFriendsListPage;