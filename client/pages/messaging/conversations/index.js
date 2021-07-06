import React, { Fragment } from 'react';
import MessagingHomeChannelsHelper from "../../../components/messaging/conversations/index.js";

const MessagingHomeChannelsPage = (props) => {
    return (
        <Fragment>
            <MessagingHomeChannelsHelper props={props} />
        </Fragment>
    );
}
export default MessagingHomeChannelsPage;