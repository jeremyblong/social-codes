import React, { Fragment } from 'react';
import IndividualGroupConversationHelper from "../../../components/messaging/group/individualGroup.js";

const IndividualGroupConversationPage = (props) => {
    return (
        <Fragment>
            <IndividualGroupConversationHelper props={props} />
        </Fragment>
    );
}
export default IndividualGroupConversationPage;