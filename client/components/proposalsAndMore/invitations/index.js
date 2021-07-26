import React, { Component, Fragment } from 'react'
import { Header, Left, Body, Right, Title, Subtitle, Button } from 'native-base';
import styles from './styles.js';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import Toast from 'react-native-toast-message';
import Config from "react-native-config";
import axios from "axios";
import ReadMore from 'react-native-read-more-text';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import { connect } from 'react-redux';
import Video from 'react-native-video';
import { saveVideoConferenceInfo } from "../../../actions/skype/index.js";

class InvitationsJobManagementHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        photo: "",
        type: "",
        hide: false,
        ready: false
    }
}
    componentDidMount() {
        const passed = this.props.props.route.params.item;

        console.log("passed: ", passed);

        axios.get(`${Config.ngrok_url}/check/active/inteviews/match`, {
            params: {
                id: this.props.unique_id,
                related: passed.relatedJobID
            }
        }).then((res) => {
            if (res.data.message === "Ran logic!") {

                const { bool } = res.data;

                this.setState({
                    hide: bool,
                    ready: true
                })
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        });

        axios.get(`${Config.ngrok_url}/gather/user/pics/only`, {
            params: {
                id: passed.otherUserID
            }
        }).then((res) => {
            if (res.data.message === "Located the desired user!") {

                console.log(res.data);

                const { photo, type } = res.data;

                this.setState({
                    photo,
                    type
                })
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        });
    }
    redirectToJob = (jobID) => {
        axios.get(`${Config.ngrok_url}/gather/individual/job/listing`, {
            params: {
                jobID
            }
        }).then((res) => {
            if (res.data.message === "Successfully located listing!") {

                const { job } = res.data;

                this.props.props.navigation.push("view-job-individual", { item: job });
            } else {
                console.log("err", res.data);

                Toast.show({
                    type: "error",
                    position: "top",
                    visibilityTime: 4500,
                    text1: "ERROR OCCURRED RETRIEVING JOB.",
                    text2: "An error occurred while trying to gather this specific job data, please try again or refresh the page..."
                })
            }
        }).catch((err) => {
            console.log(err);
        });
    }
    _renderTruncatedFooter = (handlePress) => {
        return (
          <Text style={{ color: "blue", fontWeight: "bold", marginTop: 5 }} onPress={handlePress}>
            Read more
          </Text>
        );
    }
     
    _renderRevealedFooter = (handlePress) => {
        return (
          <Text style={{ color: "blue", fontWeight: "bold", marginTop: 5 }} onPress={handlePress}>
            Show less
          </Text>
        );
    }
    render() {
        console.log("invitations props: ", this.props, "this.state", this.state);

        const job = this.props.props.route.params.job;
        const passed = this.props.props.route.params.item;

        const { photo, type, ready, hide } = this.state;
        return (
            <Fragment>
                
                <Header style={{ backgroundColor: "#303030" }}>
                    <Left>
                        <Button transparent onPress={() => {
                            this.props.props.navigation.goBack();
                        }}>
                            <Image source={require("../../../assets/icons/go-back.png")} style={[styles.headerIcon, { tintColor: "#fdd530" }]} />
                        </Button>
                    </Left>
                        <Body>
                            <Title style={styles.goldText}>Invitation</Title>
                            <Subtitle style={styles.goldText}>Manage Invitation</Subtitle>
                        </Body>
                    <Right />
                </Header>
                <Toast ref={(ref) => Toast.setRef(ref)} />
                <ScrollView contentContainerStyle={{ paddingBottom: 0 }} style={{ zIndex: -1 }}>
                    <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>
                            Interview with <Text style={{ fontWeight: "bold", color: "#ffd530" }}>{passed.otherUserName}</Text>
                        </Text>
                    </View>

                    <View style={styles.postContent}>
                        <Text style={styles.postTitle}>
                            {job.title}
                        </Text>
                        <View style={{ marginTop: 25 }} />
                        <ReadMore
                            numberOfLines={5}
                            renderTruncatedFooter={this._renderTruncatedFooter}
                            renderRevealedFooter={this._renderRevealedFooter}
                        >
                            <Text style={styles.postDescription}>
                                {job.description}
                            </Text>
                        </ReadMore>

                        <Text style={styles.date}>
                            {passed.date}
                        </Text>

                        <View style={styles.profile}>
                            {type === "video" ? <Video 
                                source={{ uri: photo }} 
                                ref={(ref) => {
                                    this.player = ref
                                }} 
                                resizeMode="cover"
                                muted={true}
                                repeat={true} 
                                autoPlay
                                style={styles.avatar} 
                            /> : <Image style={styles.avatar}
                            source={{ uri: photo }}/>}

                            <Text style={styles.name}>
                                {passed.interviewerID !== this.props.unique_id ? "Interviewer" : "Interviewee"}{"\n"}
                                {passed.otherUserName}
                            </Text>
                        </View>
                        <View style={{ marginTop: 15 }} />
                        <AwesomeButtonBlue backgroundColor={"#303030"} textColor={"#ffd530"} type={"primary"} onPress={() => {
                            this.redirectToJob(passed.relatedJobID);
                        }} stretch={true}>View Job Listing</AwesomeButtonBlue>
                        <View style={{ marginTop: 15 }} />
                        {hide === false && ready === true ? <AwesomeButtonBlue type={"secondary"} onPress={() => {

                            this.props.saveVideoConferenceInfo({
                                jobID: job.unique_id
                            })

                            setTimeout(() => {
                                this.props.props.navigation.push("start-video-call-page", { passed, job });
                            }, 1000)
                        }} stretch={true}>Schedule a video call</AwesomeButtonBlue> : null}
                    </View>
                    </View>
                </ScrollView>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.signupData.authData.unique_id
    }
}
export default connect(mapStateToProps, { saveVideoConferenceInfo })(InvitationsJobManagementHelper);