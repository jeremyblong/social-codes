import React, { Component, Fragment } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Header, Left, Body, Right, Title, Subtitle, Button, Text as NativeText, Card, CardItem } from 'native-base';
import styles from './styles.js';
import { saveVideoConferenceInfo } from "../../../../actions/skype/index.js";
import { connect } from 'react-redux';
import Toast from 'react-native-toast-message';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AwesomeButtonCartman from 'react-native-really-awesome-button/src/themes/cartman';
import moment from 'moment';
import axios from 'axios';
import Config from 'react-native-config';

class InterviewScheduleTimeHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        time: null,
        isTimePickerVisible: false,
        actualTime: null,
        timezone: null
    }
}
    handleConfirmTime = (time) => {
        console.log("time", time);

        const regExp = /\(([^)]+)\)/;

        const match = regExp.exec(time);

        this.setState({
            time: `${moment(time).format("h:mm a")} (${match[1]})`,
            timezone: match[1],
            actualTime: moment(time).format("h:mm:ss a"),
            isTimePickerVisible: false
        })
    }
    renderTime = () => {
        const { time } = this.state;

        if (time !== null) {
            return (
                <Fragment>
                    <TouchableOpacity style={[ styles.card, { borderColor: "#303030" }]} onPress={() => {

                    }}>
                    <View style={styles.cardContent}>
                        <Text style={styles.description}>Selected Time</Text>
                        <Text style={styles.date}>{time}</Text>
                    </View>
                    </TouchableOpacity>
                </Fragment>
            );
        } else {
            return null;
        }
    }
    handleContinuation = () => {
        const { time, timezone, actualTime } = this.state;

        axios.post(`${Config.ngrok_url}/send/video/invite/candidate`, {
            fullTime: time,
            timezone,
            actualTime,
            id: this.props.unique_id,
            date: this.props.previous.date,
            otherUserID: this.props.otherUserID,
            jobID: this.props.previous.jobID,
            twilioRoomSID: this.props.twilioRoomSID,
            twilioRoomID: this.props.twilioRoomID
        }).then((res) => {
            if (res.data.message === "Located and updated both users!") {
                console.log(res.data);

                this.props.props.navigation.replace("confirmation-page-video-conference-scheduled");
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    render() {
        console.log(this.state);

        const { time } = this.state;
        return (
            <Fragment>
                <Header style={{ backgroundColor: "#303030" }}>
                    <Left>
                        <Button onPress={() => {
                            this.props.props.navigation.goBack();
                        }} transparent>
                            <Image source={require("../../../../assets/icons/go-back.png")} style={styles.headerIcon} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={styles.goldText}>Video Call</Title>
                        <Subtitle style={styles.goldText}>Time & Confirmation</Subtitle>
                    </Body>
                    <Right />
                </Header>
                <Toast ref={(ref) => Toast.setRef(ref)} />
                <View style={{ flex: 1 }}>
                    <View style={styles.container}>
                        <View style={styles.contentContainer}>
                            <View style={styles.margin}>
                                <Text style={styles.headerText}>Please select a date and time to schedule your video call...</Text>
                                <Text style={{ marginTop: 10 }}>We will send a link to the other to join at the desired time - the link will only expire after a successful meet</Text>
                                <View style={{ marginTop: 20 }} />
                                <AwesomeButtonCartman type={"anchor"} textColor={"white"} onPress={() => {
                                    this.setState({
                                        isTimePickerVisible: true
                                    })
                                }} stretch={true}>Select Time</AwesomeButtonCartman>
                            </View>
                            <View style={styles.margin}>
                                {this.renderTime()}
                            </View>
                        </View>
                        
                    </View>
                    {time !== null ? <View style={styles.footer}>
                        <View style={styles.margin}>
                            <AwesomeButtonCartman backgroundColor={"#ffd530"} textColor={"black"} type={"anchor"} onPress={() => {
                                this.handleContinuation();
                            }} stretch={true}>SEND INVITATION</AwesomeButtonCartman>
                        </View>
                    </View> : null}
                </View>
                <DateTimePickerModal
                    isVisible={this.state.isTimePickerVisible}
                    mode="time"
                    onConfirm={this.handleConfirmTime}
                    onCancel={() => {
                        this.setState({
                            isTimePickerVisible: false
                        })
                    }}
                />
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.signupData.authData.unique_id,
        previous: state.videoInvitationInfo.invitation,
        otherUserID: state.videoInvitationInfo.invitation.otherUserID,
        twilioRoomID: state.videoInvitationInfo.invitation.twilioRoomID,
        twilioRoomSID: state.videoInvitationInfo.invitation.twilioRoomSID
    }
}
export default connect(mapStateToProps, { saveVideoConferenceInfo })(InterviewScheduleTimeHelper);