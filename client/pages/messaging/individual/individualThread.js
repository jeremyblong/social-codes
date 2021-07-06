import React, { Fragment } from 'react';
import IndividualThreadMessagingHelper from "../../../components/messaging/individual/individualThread.js";

const IndividualThreadMessagingPage = (props) => {
    return (
        <Fragment>
            <IndividualThreadMessagingHelper props={props} />
        </Fragment>
    );
}
export default IndividualThreadMessagingPage;