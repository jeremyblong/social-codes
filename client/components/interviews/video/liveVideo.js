import React, { Component, useRef, useState, useEffect } from 'react';
import {
  TwilioVideoLocalView,
  TwilioVideoParticipantView,
  TwilioVideo
} from 'react-native-twilio-video-webrtc';
import { View, Text, TouchableOpacity, TextInput, Image, Platform } from "react-native";
import styles from "./styles.js";
import axios from 'axios';
import Config from "react-native-config";
import { connect } from "react-redux";
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import LottieView from 'lottie-react-native';
import { Header, Left, Body, Right, Title, Subtitle, Button, Text as NativeText } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';


const LiveVideoPeerToPeerHelper = (props) => {

    const interview = props.props.route.params.interview;

    const [isAudioEnabled, setIsAudioEnabled] = useState(true);
    const [isVideoEnabled, setIsVideoEnabled] = useState(true);
    const [status, setStatus] = useState('disconnected');
    const [participants, setParticipants] = useState(new Map());
    const [videoTracks, setVideoTracks] = useState(new Map());
    const [token, setToken] = useState(interview.twilioRoomSID);
    const [user, setUser] = useState(null);
    const [spinner, setSpinner] = useState(true);
    const twilioRef = useRef(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        axios.get(`${Config.ngrok_url}/gather/twilio/conference/information`, {
            params: {
                id: props.unique_id
            }
        }).then((res) => {
            if (res.data.message === "Located the desired user!") {

                const { user } = res.data;
                
                setUser(user);
                setReady(true);
                setToken(user.twilioJWTAuthToken);
                setSpinner(false);
                console.log(res.data);
            } else {
                console.log("err", res.data);

                setSpinner(false);
            }
        }).catch((err) => {
            console.log(err);

            setSpinner(false);
        })
    }, []);

    const _onConnectButtonPress = () => {
        twilioRef.current.connect({ roomName: interview.twilioRoomID, accessToken: token });
        setStatus('connecting');
    }
    
    const _onEndButtonPress = () => {
        twilioRef.current.disconnect();
    };

    const _onMuteButtonPress = () => {
        twilioRef.current
        .setLocalAudioEnabled(!isAudioEnabled)
        .then(isEnabled => setIsAudioEnabled(isEnabled));
    };

    const _onFlipButtonPress = () => {
        twilioRef.current.flipCamera();
    };

    const _onRoomDidConnect = ({roomName, error}) => {
        console.log('onRoomDidConnect: ', roomName);

        setStatus('connected');
    };

    const _onRoomDidDisconnect = ({ roomName, error }) => {
        console.log('[Disconnect]ERROR: ', error);

        setStatus('disconnected');
    };

    const _onRoomDidFailToConnect = error => {
        console.log('[FailToConnect]ERROR: ', error);

        setStatus('disconnected');
    };

    const _onParticipantAddedVideoTrack = ({ participant, track }) => {
        console.log('onParticipantAddedVideoTrack: ', participant, track);

        setVideoTracks(
        new Map([
            ...videoTracks,
            [
            track.trackSid,
            { participantSid: participant.sid, videoTrackSid: track.trackSid },
            ],
        ]),
        );
    };

    const _onParticipantRemovedVideoTrack = ({ participant, track }) => {
        console.log('onParticipantRemovedVideoTrack: ', participant, track);

        const videoTracksLocal = videoTracks;
        videoTracksLocal.delete(track.trackSid);

        setVideoTracks(videoTracksLocal);
    };
    console.log("user", user, "props", props, "token", token);
    console.log("Status", status);
    console.log("participants", participants);
    return (
        <View style={styles.container}>
        <Spinner
            overlayColor={"rgba(0, 0, 0, 0.75)"}
            visible={spinner}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
        />
        {
            status === 'disconnected' &&
            <View>
            <Header style={styles.header}>
                <Left>
                    <Button onPress={() => {
                        props.props.navigation.goBack();
                    }} transparent>
                        <Image source={require("../../../assets/icons/go-back.png")} style={[styles.headerIcon, { tintColor: "#ffffff" }]} />
                    </Button>
                </Left>
                <Body>
                    <Title style={styles.whiteText}>LIVE INTERVIEW</Title>
                    <Subtitle style={styles.whiteText}>LIVE VIDEO INTERVIEW CALL</Subtitle>
                </Body>
                <Right />
            </Header>
            <Text style={styles.welcome}>
                FairWage Freelancing - Live Interviewing
            </Text>
            <View style={styles.hr} />
            <View style={{ margin: 15 }}>
                <AwesomeButtonBlue backgroundColor={"green"} type={"primary"} onPress={_onConnectButtonPress} stretch={true}>CONNECT</AwesomeButtonBlue>
            </View>
            <View style={styles.hr} />
            <View style={{ margin: 15 }}>
                <Text style={styles.sub}>When you are ready, feel free to press the "connect" button and we will connect you to the conference room and notfiy the other user of your arrival!</Text>
            </View>
            <View style={styles.centered}>
                <LottieView style={{ maxWidth: 250, maxHeight: 250, minHeight: 250, minWidth: 250, width: 250, height: 250 }} source={require("../../../assets/animations/conference.json")} autoPlay loop />
            </View>
            </View>
        }

        {
            (status === 'connected' || status === 'connecting') &&
            <View style={styles.callContainer}>
            {
                status === 'connected' &&
                <View style={styles.remoteGrid}>
                
                {
                    Array.from(videoTracks, ([trackSid, trackIdentifier]) => {
                    return (
                        <TwilioVideoParticipantView
                        style={styles.remoteVideo}
                        key={trackSid}
                        trackIdentifier={trackIdentifier}
                        />
                    )
                    })
                }
                </View>
            }
            <View
                style={styles.optionsContainer}>
                <TouchableOpacity
                style={styles.optionButtonOne}
                onPress={_onEndButtonPress}>
                    <Image source={require("../../../assets/icons/end.png")} style={styles.phone} />
                </TouchableOpacity>
                <TouchableOpacity
                style={styles.optionButton}
                onPress={_onMuteButtonPress}>
                    {isAudioEnabled ? <Image source={require("../../../assets/icons/unmute.png")} style={styles.iconOne} /> : <Image source={require("../../../assets/icons/mute.png")} style={styles.iconOne} />}
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.optionButtonFlip}
                    onPress={_onFlipButtonPress}
                >
                    <Image source={require("../../../assets/icons/flip.png")} style={styles.iconOne} />
                </TouchableOpacity>
                <TwilioVideoLocalView
                enabled={true}
                style={styles.localVideo}
                />
            </View>
            </View>
        }
        {ready === true ? 
            <TwilioVideo
                ref={ twilioRef }
                onRoomDidConnect={ _onRoomDidConnect }
                onRoomDidDisconnect={ _onRoomDidDisconnect }
                onRoomDidFailToConnect= { _onRoomDidFailToConnect }
                onParticipantAddedVideoTrack={ _onParticipantAddedVideoTrack }
                onParticipantRemovedVideoTrack= { _onParticipantRemovedVideoTrack }
            /> : null}
        </View>
    );
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.signupData.authData.unique_id
    }
}
export default connect(mapStateToProps, { })(LiveVideoPeerToPeerHelper);