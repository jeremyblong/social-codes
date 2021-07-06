import React, { Fragment } from 'react';
import NavigationMainHelper from "../../../components/navigation/menu/mainMenu.js";


const NavigationMainPage = (props) => {
    return (
        <Fragment>
            <NavigationMainHelper props={props} />
        </Fragment>
    );
}
export default NavigationMainPage;