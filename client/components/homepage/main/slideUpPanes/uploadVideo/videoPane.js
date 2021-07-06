import React, { Fragment, useState, useEffect, useRef } from 'react'
import { View, Text, Image, TouchableOpacity, Keyboard, Dimensions, ScrollView, AsyncStorage } from "react-native";
import styles from "./styles.js";
import { Header, Left, Body, Right, Icon, Button, Title, Subtitle, Textarea, Thumbnail } from 'native-base';
import axios from "axios";
import Config from "react-native-config";
import RBSheet from "react-native-raw-bottom-sheet";
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Video from 'react-native-video';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect, useDispatch } from "react-redux";
import Toast from 'react-native-toast-message';
import * as Progress from 'react-native-progress';
import uuid from 'react-native-uuid';
import { addVideoToWallQueue } from "../../../../../actions/wall/wall.js";



const { height, width } = Dimensions.get("window");

const UploadVideoPaneHelper = ({ uploadVideoPaneRef, unique_id, fullName, username, addVideoToWallQueue }) => {
    const [ video, setVideo ] = useState(null);
    const [ spinner, setSpinner ] = useState(false);
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [showProgressBar, setProgressBarVisibility] = useState(false);

    const dispatch = useDispatch();


    const player = useRef(null);

    console.log("video", video);
    console.log("showProgressBar", showProgressBar);
    console.log("uploadPercentage", uploadPercentage);

    const renderConditionalReady = () => {
        if (video !== null) {
            return false;
        } else {
            return true;
        }
    }
    const selectVideo = () => {
        console.log("selectVideo clicked.");

        const options = {
            mediaType: "video",
            videoQuality: "high",
            durationLimit: 320,
            selectionLimit: 1
        };

        launchImageLibrary(options, imagePickedCallback);
    }
    const imagePickedCallback = (data) => {
        console.log("imagePickedCallback callback", data);
        
        setVideo(data.uri);
    }
    const selectAnotherVideoInstead = () => {

        setVideo(null);
        
        const options = {
            mediaType: "video",
            videoQuality: "high",
            durationLimit: 320,
            selectionLimit: 1
        };

        launchImageLibrary(options, imagePickedCallback);
    }
    const errored = (error) => {
        console.log("errored", error);

        Toast.show({
            text1: error.error.localizedDescription,
            text2: "An error occurred while attempting to select your file...",
            type: "error",
            position: "bottom",
            visibilityTime: 4500
        })
    }
    const renderConditionalContent = () => {
        if (video !== null) {
            return (
                <View style={styles.margin}>
                    <Video 
                        source={{ uri: video }}   // Can be a URL or a local file.
                        ref={player} 
                        onError={errored}
                        repeat={true}
                        style={styles.backgroundVideo} 
                    />
                    <AwesomeButtonBlue style={{ marginTop: 20 }} type={"primary"} backgroundColor={"darkred"} onPress={selectAnotherVideoInstead} textColor={"white"} stretch={true}>Select another video instead</AwesomeButtonBlue>
                </View>
            );
        } else {
            return (
                <TouchableOpacity onPress={() => {
                    selectVideo();
                }} style={styles.imageContainer}>
                    <Image source={require("../../../../../assets/icons/upload-icon.png")} style={styles.uploadIcon} />
                    <Text style={styles.largeText}>Click to upload</Text>
                </TouchableOpacity>
            );
        }
    }
    const uploadVideoHandler = async () => {

        setSpinner(true);
        setProgressBarVisibility(true);

        const formData = new FormData();

        formData.append("video", { uri: video, name: uuid.v4() + ".mp4", type: "video/mp4" });
        formData.append("unique_id", unique_id);
        formData.append("fullName", fullName);

        axios({
            method: "post",
            url: `${Config.ngrok_url}/upload/video/prep/wall/post`,
            data: formData,
            headers: { 
                "Content-Type": "multipart/form-data" 
            },
            onUploadProgress: progress => {
                const { total, loaded } = progress;
                const totalSizeInMB = total / 1000000;
                const loadedSizeInMB = loaded / 1000000;
                const uploadPercentage = (loadedSizeInMB / totalSizeInMB);
                setUploadPercentage(uploadPercentage.toFixed(2));
                console.log("total size in MB ==> ", totalSizeInMB);
                console.log("uploaded size in MB ==> ", loadedSizeInMB);
            }
        }).then((res) => {
            if (res.data.message === "Uploaded video successfully!") {
                console.log(res.data);

                setSpinner(false);
                setUploadPercentage(0);

                dispatch(addVideoToWallQueue(res.data.video));

                setVideo(null);

                uploadVideoPaneRef.current.close();
            } else {
                console.log("err", res.data);

                setSpinner(false);
            }
        }).catch((err) => {
            console.log(err);

            setSpinner(false);
        })
    }
    return (
        <Fragment>
            <RBSheet
                ref={uploadVideoPaneRef} 
                onClose={() => {
                    
                }}
                closeOnDragDown={true}
                height={height * 0.95}
                openDuration={250}
                customStyles={{
                    container: {
                        borderTopLeftRadius: 40,
                        borderTopRightRadius: 40
                    },
                    draggableIcon: {
                        backgroundColor: "grey",
                        width: 250
                    }
                }}
                >
                    <Spinner
                        visible={spinner}
                        overlayColor={"rgba(0, 0, 0, 0.50)"}
                        textStyle={{ color: "white", fontWeight: "bold", textAlign: "center" }}
                        textContent={`Uploading your video, \n${uploadPercentage}% uploaded...`}
                    />
                     <Header>
                        <Left>
                            <Button onPress={() => {
                                uploadVideoPaneRef.current.close();
                            }} transparent>
                                <Icon style={{ color: "black" }} name='arrow-back' />
                                    <Text style={{ fontSize: 18 }}>Back</Text>
                            </Button>
                        </Left>
                        <Body>
                            <Title>Upload Video</Title>
                            <Subtitle>Upload video to wall</Subtitle>
                        </Body>
                        <Right />
                    </Header>
                    <Progress.Bar animated={true} color={"blue"} unfilledColor={"lightgrey"} progress={uploadPercentage} width={width} />
                    <View contentContainerStyle={{ paddingBottom: 100 }} style={styles.container}>
                        
                        <View style={styles.margin}>
                            <Text style={styles.headerText}>Please select a video to upload to your feed/wall, once selected it will automatically be uploaded prior to actually posting...</Text>
                            
                        </View>
                        {renderConditionalContent()}
                    </View>
                    <View style={styles.margin}>
                        <View style={styles.positionBottom}>
                            {renderConditionalReady() ? <AwesomeButtonBlue type={"disabled"} onPress={() => {}} stretch={true}>Submit & Continue</AwesomeButtonBlue> : <AwesomeButtonBlue type={"secondary"} backgroundColor={"blue"} onPress={uploadVideoHandler} textColor={"white"} stretch={true}>Submit & Continue</AwesomeButtonBlue>}
                        </View>
                    </View>
                    <Toast ref={(ref) => Toast.setRef(ref)} />
            </RBSheet>
            
        </Fragment>
    )
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.signupData.authData.unique_id,
        fullName: `${state.signupData.authData.firstName} ${state.signupData.authData.lastName}`,
        username: state.signupData.authData.username
    }
}
export default connect(mapStateToProps, { addVideoToWallQueue })(UploadVideoPaneHelper);