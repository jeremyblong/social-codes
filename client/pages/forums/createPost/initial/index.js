import React, { Fragment } from 'react';
import InitialAskQuestionHelper from "../../../../components/forums/createPost/initial/index.js";


const InitialAskQuestionPage = (props) => {
    return (
        <Fragment>
            <InitialAskQuestionHelper props={props} />
        </Fragment>
    );
}
export default InitialAskQuestionPage;