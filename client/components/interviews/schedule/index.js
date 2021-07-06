import React, { Component, Fragment } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { Header, Left, Body, Right, Title, Subtitle, Button, Text as NativeText, Card, CardItem } from 'native-base';
import styles from './styles.js';
import { saveVideoConferenceInfo } from "../../../actions/skype/index.js";
import { connect } from 'react-redux';
import Toast from 'react-native-toast-message';
import { CalendarList } from "react-native-calendars";
import moment from 'moment';

class InterviewScheduleCallHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        data: []
    }
}
    selectDay = (date) => {
        console.log("date", date);

        const otherUserID = this.props.props.route.params.passed.otherUserID;

        const twilioRoomID = this.props.props.route.params.passed.twilioRoomID;
        const twilioRoomSID = this.props.props.route.params.passed.twilioRoomSID;

        this.props.saveVideoConferenceInfo({
            ...this.props.previous,
            date,
            twilioRoomSID,
            twilioRoomID,
            otherUserID
        })     
        
        setTimeout(() => {
            this.props.props.navigation.replace("setup-video-interview-time");
        }, 1000)
    }
    render() {
        console.log("interviews schedule index.js state, ", this.state, this.props);
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
                        <Title>Video Call</Title>
                        <Subtitle>Schedule a video call</Subtitle>
                    </Body>
                    <Right />
                </Header>
                <Toast ref={(ref) => Toast.setRef(ref)} />
                <View style={styles.container}>
                    <CalendarList
                        // Callback which gets executed when visible months change in scroll view. Default = undefined
                        onVisibleMonthsChange={(months) => {
                            console.log('now these months are visible', months);
                        }}
                        minDate={moment(new Date()).format("YYYY-MM-DD")}
                        // Max amount of months allowed to scroll to the past. Default = 50
                        pastScrollRange={50}
                        // Max amount of months allowed to scroll to the future. Default = 50
                        futureScrollRange={50}
                        // Enable or disable scrolling of calendar list
                        scrollEnabled={true}
                        onDayPress={this.selectDay}
                        // Enable or disable vertical scroll indicator. Default = false
                        showScrollIndicator={true}
                    />
                </View>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        previous: state.videoInvitationInfo.invitation,
        unique_id: state.signupData.authData.unique_id
    }
}
export default connect(mapStateToProps, { saveVideoConferenceInfo })(InterviewScheduleCallHelper);