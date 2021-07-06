import React, { useRef, Fragment, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Video from 'react-native-video';

const { width, height } = Dimensions.get("window");


const VideoPlayerHelperWall = (props) => {
    const errored = (err) => {
        console.log("err", err);
    }
    console.log("props.playing", props);
    return (
        <Fragment>
            <Video 
                source={{ uri: props.videoUrl }}   // Can be a URL or a local file.
                ref={ref => { video = ref}} 
                muted={true}
                paused={typeof props.playing !== "undefined" ? props.playing : true} 
                controls={true}
                onError={errored}
                style={styles.postVideoStyles} 
            />
        </Fragment>
    )
}

const styles = StyleSheet.create({
    postVideoStyles: {
        height: 325,
        width: width * 1.05,
        marginLeft: -20,
        marginTop: 25
    }
});

export default VideoPlayerHelperWall;