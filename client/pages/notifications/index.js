import React, { Fragment } from 'react';
import NotificationsMainPageHelper from "../../components/notifications/index.js";

const NotificationsMainPage = (props) => {
    return (
        <Fragment>
            <NotificationsMainPageHelper props={props} />
        </Fragment>
    );
}
export default NotificationsMainPage;