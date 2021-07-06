import React, { Component, Fragment } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { RNCamera, FaceDetector } from 'react-native-camera';
import styles from './styles.js';
import { Switch } from 'react-native-switch';
import Toast from 'react-native-toast-message';
import Video from 'react-native-video';
import Config from 'react-native-config';
import { connect } from 'react-redux';
import axios from "axios";
import RNFetchBlob from "rn-fetch-blob";
import Spinner from 'react-native-loading-spinner-overlay';


class RecordProfilePictureVideoHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        forwardFacingCamera: "back",
        selected: false,
        recording: false,
        count: 7,
        countdown: null,
        uri: null,
        codec: null,
        spinner: false
    }
}
    recordingEnded = (data) => {
        console.log("recording ended", data);
    }
    startRecording = async () => {
        Toast.show({
            type: 'success',
            position: 'top',
            text1: 'Started recording video!',
            text2: 'Successfully started recording video...',
            visibilityTime: 3000
        });

        this.setState({
            recording: true,
            countdown: setInterval(() => {
                this.setState({
                    count: this.state.count - 1
                })
            },  1000)
        }, async () => {

            const { codec, uri } = await this.camera.recordAsync({ quality: RNCamera.Constants.VideoQuality["1080p"], mirrorVideo: false, maxDuration: 7 });

            clearInterval(this.state.countdown);

            this.setState({ 
                count: 7,
                recording: false,
                uri,
                codec
            })

            console.log(codec, uri);
        })
    }
    renderRecordingButtons = () => {
        const { recording } = this.state;
        
        if (recording === false) {
            return (
                <TouchableOpacity onPress={this.startRecording} style={styles.recordButtonContainer}>
                    <Image source={require("../../../../assets/icons/record.png")} style={styles.recordButton} />
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity onPress={this.stopRecording} style={styles.recordButtonContainerCurrent}>
                    <Image source={require("../../../../assets/icons/record-two.png")} style={styles.recordButton} />
                </TouchableOpacity>
            );
        }
    }
    renderCountdown = () => {
        const { recording, count } = this.state;
        
        if (recording === true) {
            return (
                <TouchableOpacity style={styles.countdownContainer}>
                    <Text style={styles.countdownText}>{count}</Text>
                </TouchableOpacity>
            );
        }
    }
    stopRecording = () => {
        this.setState({
            recording: false,
            count: 7
        }, () => {
            this.camera.stopRecording();

            clearInterval(this.state.countdown);
        })
    }
    onBuffer = (buffer) => {
        console.log(buffer);
    }
    videoError = (err) => {
        console.log(err);
    }
    submitVideoCustom = () => {
        console.log("submitVideoCustom clicked.");

        const { uri } = this.state;

        let imagePath = null;

        this.setState({
            spinner: true
        }, () => {
            RNFetchBlob.config({
                fileCache: true
            })
            .fetch("GET", uri)
            // the image is now dowloaded to device's storage
            .then(resp => {
                // the image path you can use it directly with Image component
                console.log("resp:", resp);
    
                imagePath = resp.path();
                return resp.readFile("base64");
            })
            .then(base64Data => {
                // here's base64 encoded image
                console.log(base64Data);
    
                axios.post(`${Config.ngrok_url}/upload/profile/video`, {
                    unique_id: this.props.unique_id,
                    video64: base64Data
                }).then(response => {
                    if (response.data.message === "Uploaded video!") {
                        console.log("image uploaded", response.data);   
    
                        this.setState({
                            spinner: false
                        }, () => {
                            this.props.props.navigation.push("public-profile-main");
                        })
                    } else {
                        this.setState({
                            spinner: false
                        });
                        console.log("err", response.data);
                    }
                }).catch(err => {
                    this.setState({
                        spinner: false
                    });
                    console.log(err)
                })
            });
        })
    }
    renderContentOne = () => {
        const { uri } = this.state;
        return (
            <Fragment>
                <Video source={{ uri }}   // Can be a URL or a local file.
                    ref={(ref) => {
                        this.player = ref
                    }}                                      // Store reference
                    onBuffer={this.onBuffer}                // Callback when remote video is buffering
                    onError={this.videoError}               // Callback when video cannot be loaded
                    style={styles.backgroundVideo} 
                />
                    <View style={styles.bottomRow}>
                        <View style={styles.columnBottom}>
                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    uri: null
                                })
                            }} style={styles.highlightedLeft}>
                                <Text style={styles.highlightText}>Retry</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.columnBottom}>
                            <TouchableOpacity onPress={() => {
                                this.submitVideoCustom();
                            }} style={styles.highlightedRight}>
                                <Text style={styles.highlightText}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
            </Fragment>
        );
    }
    render() {
        console.log(this.state);

        const { uri } = this.state;
        return (
            <Fragment>
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Uploading your video...'}
                    textStyle={styles.spinnerTextStyle} 
                    overlayColor={"rgba(0, 0, 0, 0.75)"}
                />
                {uri === null ? <RNCamera  
                    ref={ref => {
                        this.camera = ref;
                    }}
                    maxDuration={7}
                    captureAudio={false}
                    style={{ flex: 1, zIndex: -1 }}
                    type={this.state.forwardFacingCamera}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }} 
                    onRecordingEnd={this.recordingEnded}
                >
                    <Toast ref={(ref) => Toast.setRef(ref)} />
                    <TouchableOpacity onPress={() => {
                        this.props.props.navigation.goBack();
                    }} style={styles.topLeft}>
                        <Image source={require("../../../../assets/icons/go-back.png")} style={styles.topLeftImage} />
                        <Text style={styles.goBackText}>Go Back</Text>
                    </TouchableOpacity>
                    {this.renderRecordingButtons()}
                    {this.renderCountdown()}
                    <View style={styles.switchCameraContainer}>
                        <Switch
                            value={this.state.selected}
                            onValueChange={(val) => {                                
                                this.setState({
                                    forwardFacingCamera: val === true ? "front" : "back",
                                    selected: val
                                }, () => {
                                    console.log(val);
                                })
                            }}
                            disabled={false}
                            activeText={'Front'}
                            inActiveText={'Rear'}
                            circleSize={50}
                            barHeight={35}
                            circleBorderWidth={5}
                            backgroundActive={'green'}
                            backgroundInactive={'gray'}
                            circleActiveColor={'#30a566'}
                            circleInActiveColor={'white'}
                            changeValueImmediately={true}
                        />
                    </View>
                </RNCamera> : this.renderContentOne()}
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.signupData.authData.unique_id
    }
}
export default connect(mapStateToProps, { })(RecordProfilePictureVideoHelper);