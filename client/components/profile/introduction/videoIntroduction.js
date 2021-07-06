import React, { Component, Fragment } from 'react';
import { View, Text, Image, Dimensions } from "react-native";
import styles from "./styles.js";
import { Header, Left, Body, Right, Button, Icon, Title, Subtitle } from 'native-base';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import Video from 'react-native-video';
import Config from 'react-native-config';
import axios from "axios";
import uuid from "react-native-uuid";
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-toast-message';
import { connect } from 'react-redux';
import * as Progress from 'react-native-progress';

const { height, width } = Dimensions.get("window");


class VideoIntroductionHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        fileUrl: "",
        spinner: false,
        progress: 0
    }
}
    handleVideoPicker = () => {
        const options = {
            mediaType: "video",
            durationLimit: 320,
            videoQuality: "high"
        };
        launchImageLibrary(options, this.uploadVideo);
    }
    uploadVideo = (data) => {
        console.log("data", data);

        this.setState({
            fileUrl: data.uri
        })
    }
    uploadVideoDatabase = () => {
        let imagePath = null;

        const formData = new FormData();

        const generatedID = uuid.v4() + ".mp4";

        formData.append("unique_id", this.props.unique_id);
        formData.append("video", { uri: this.state.fileUrl, name: generatedID, type: "video/mp4" });
        formData.append("picture_id", generatedID);

        this.setState({
            spinner: true
        }, () => {
            axios({
                method: "post",
                url: `${Config.ngrok_url}/upload/video/introduction`,
                data: formData,
                headers: { 
                    "Content-Type": "multipart/form-data" 
                },
                onUploadProgress: progress => {
                    const { total, loaded } = progress; 
                    const totalSizeInMB = total / 1000000;
                    const loadedSizeInMB = loaded / 1000000;
                    const uploadPercentage = (loadedSizeInMB / totalSizeInMB);

                    this.setState({
                        progress: uploadPercentage
                    })
                    console.log("total size in MB ==> ", totalSizeInMB);
                    console.log("uploaded size in MB ==> ", loadedSizeInMB);
                },
                encType: "multipart/form-data"
            }).then((res) => {
                if (res.data.message === "Uploaded video!") {
                    console.log(res.data);

                    this.setState({
                        spinner: false,
                        progress: 0,
                        fileUrl: null
                    }, () => {
                        setTimeout(() => {
                            Toast.show({
                                text1: 'Successfully uploaded your video!',
                                text2: 'Video was successfully uploaded and is now set to your intrduction video...',
                                visibilityTime: 4500,
                                type: 'success',
                                position: 'top'
                            });
                        }, 1500);
                    });
                } else {
                    console.log("err", res.data);

                    this.setState({
                        spinner: false
                    })
                }
            }).catch((err) => {
                console.log(err);

                this.setState({
                    spinner: false
                })
            })
        });
    }
    render() {
        const { fileUrl } = this.state;
        return (
            <Fragment>
               <Header>
                    <Left>
                        <Button onPress={() => {
                            this.props.props.navigation.goBack();
                        }} transparent>
                            <Image source={require("../../../assets/icons/go-back.png")} style={styles.headerIcon} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Introduction</Title>
                        <Subtitle>Video Introduction</Subtitle>
                    </Body>
                    <Right />
                </Header>
                <Toast ref={(ref) => Toast.setRef(ref)} />
                <Progress.Bar progress={this.state.progress} width={width} />
                <View style={styles.container}>
                    <View style={styles.margin}>
                        <Text style={styles.headerText}>Upload a video (up to 320 seconds or 5 minutes) introduction of yourself</Text>
                        <View style={styles.hr} />
                        <Text style={styles.subText}>Typically people upload a video talking about their skills, work history, personality but really anything that you think will make you stand out. Don't be fearful - share your best self!</Text>
                        <View style={{ marginTop: 25 }}>
                            {typeof fileUrl !== "undefined" && fileUrl !== null && fileUrl.length > 0 ? <AwesomeButtonBlue type={"primary"} onPress={this.uploadVideoDatabase} stretch={true}>Upload Video</AwesomeButtonBlue> : <AwesomeButtonBlue type={"secondary"} onPress={this.handleVideoPicker} stretch={true}>Select a introduction video</AwesomeButtonBlue>}
                            <View style={styles.hr} />
                            {typeof fileUrl !== "undefined" && fileUrl !== null && fileUrl.length > 0 ? <Video source={{uri: this.state.fileUrl }}   // Can be a URL or a local file.
                                ref={(ref) => {
                                    this.player = ref
                                }}      
                                autoPlay={false} 
                                controls={true}
                                repeat={true}                                // Store reference
                                style={styles.backgroundVideo} 
                            /> : <View style={styles.centered}>
                                <Image source={require("../../../assets/images/6.png")} style={styles.priorIcon} />
                            </View>}
                        </View>
                    </View>
                </View>
                <Spinner
                    visible={this.state.spinner}
                    textContent={`Uploading your video \nis ${this.state.progress.toFixed(2)}% uploaded...`}
                    textStyle={styles.spinnerTextStyle} 
                    overlayColor={"rgba(0, 0, 0, 0.50)"}
                />
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.signupData.authData.unique_id
    }
}
export default connect(mapStateToProps, { })(VideoIntroductionHelper);