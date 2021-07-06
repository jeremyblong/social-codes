import React, { Fragment } from 'react';
import VideoIntroductionHelper from "../../../components/profile/introduction/videoIntroduction.js";

const VideoIntroductionPage = (props) => {
    return (
        <Fragment>
            <VideoIntroductionHelper props={props} />
        </Fragment>
    );
}
export default VideoIntroductionPage;