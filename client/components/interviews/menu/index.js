import React, { Fragment, Component } from 'react';
import styles from './styles.js';
import { View, Text, Image, FlatList } from 'react-native';
import { Header, Left, Body, Right, Title, Subtitle, Button, Text as NativeText } from 'native-base';
import AwesomeButtonCartman from 'react-native-really-awesome-button/src/themes/cartman';
import axios from 'axios';
import Config from 'react-native-config';
import { connect } from 'react-redux';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const months = ["", "January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

class VideoConferencingHomepageHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        interviews: [],
        ready: false
    }
}
    componentDidMount() {
        axios.get(`${Config.ngrok_url}/get/active/invitations/interview`, {
            params: {
                id: this.props.unique_id
            }
        }).then((res) => {
            if (res.data.message === "Gathered interviews!") {
                console.log(res.data);

                const { interviews } = res.data;


                this.setState({
                    interviews,
                    ready: true
                })
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    calculateDay = (day) => {
        if (day === 1 || day === 21 || day === 31) {
            return `${day}st`;
        } else if (day === 2 || day === 22) {
            return `${day}nd`;
        } else if (day === 3 || day === 23) {
            return `${day}rd`;
        } else {
            return `${day}th`;
        }
    }
    renderLoading = () => {
        const { ready, interviews } =  this.state;

        if (ready === true && (typeof interviews === "undefined" || interviews.length === 0)) {
            return (
                <View style={{ margin: 10 }}>
                    <View style={styles.background}>
                        <Image source={require("../../../assets/images/6.png")} resizeMode={"contain"} style={styles.myImage} />
                        <View style={{ marginTop: 20 }} />
                        <Text style={styles.headText}>Oops, We couldn't find any pending interviews for you right now!</Text>
                        <View style={{ marginTop: 30 }} />
                        <AwesomeButtonCartman type={"secondary"} textColor={"white"} backgroundColor={"blue"} onPress={() => {
                            this.props.props.navigation.push("manage-applicants-jobs");
                        }} stretch={true}>View pending applicants</AwesomeButtonCartman>
                    </View>
                </View>
            );
        } else { 
            return (
                <Fragment>
                    <View style={{ margin: 10 }}>
                        <SkeletonPlaceholder>
                            <View style={{ height: 175, width: "100%" }}>
                                
                            </View>
                        </SkeletonPlaceholder>
                        <View style={{ marginTop: 30 }} />
                        <SkeletonPlaceholder>
                            <View style={{ height: 175, width: "100%" }}>
                                
                            </View>
                        </SkeletonPlaceholder>
                        <View style={{ marginTop: 30 }} />
                        <SkeletonPlaceholder>
                            <View style={{ height: 175, width: "100%" }}>
                                
                            </View>
                        </SkeletonPlaceholder>
                        <View style={{ marginTop: 30 }} />
                        <SkeletonPlaceholder>
                            <View style={{ height: 175, width: "100%" }}>
                                
                            </View>
                        </SkeletonPlaceholder>
                        <View style={{ marginTop: 30 }} />
                        <SkeletonPlaceholder>
                            <View style={{ height: 175, width: "100%" }}>
                                
                            </View>
                        </SkeletonPlaceholder>
                        <View style={{ marginTop: 30 }} />
                        
                    </View>
                </Fragment>
            );
        }
    }
    render () {
        const { interviews } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <Header style={{ backgroundColor: "#303030" }}>
                    <Left>
                        <Button onPress={() => {
                            this.props.props.navigation.goBack();
                        }} transparent>
                            <Image source={require("../../../assets/icons/go-back.png")} style={[styles.headerIcon, { tintColor: "#fdd530" }]} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: "#ffd530" }}>Interviews Home</Title>
                        <Subtitle style={{ color: "#ffd530" }}>Video calling & more</Subtitle>
                    </Body>
                    <Right />
                </Header>
                <View style={styles.container}>
                    {typeof interviews !== "undefined" && interviews.length > 0 ? <FlatList
                        data={interviews}
                        renderItem={({ item, index }) => {
                            const interview = item;
                            console.log("int", interview);
                            return (
                                <Fragment key={index}>
                                    <View style={[ styles.card, { borderColor: "#ffd530" }]}>
                                        <View style={styles.cardContent}>
                                            <Text style={styles.name}>Interviewing with {interview.firstName} {interview.lastName}</Text>
                                            <Text style={styles.sub}>{interview.username}</Text>
                                            <Text style={[styles.description, { marginTop: 10, marginBottom: 10 }]}>On {months[interview.day.month]} {this.calculateDay(interview.day.day)}, {interview.day.year}</Text>
                                            <Text style={[styles.date, { marginBottom: 20 }]}>Scheduled for {interview.fullTime}</Text>
                                            <View style={{ margin: 7.5 }}>
                                                <AwesomeButtonCartman backgroundColor={"#303030"} backgroundShadow={"#ffd530"} type={"secondary"} onPress={() => {
                                                    this.props.props.navigation.push("activate-video-call-prescreen", { interview })
                                                }} stretch={true}>View Meeting</AwesomeButtonCartman>
                                            </View>
                                            <View style={{ height: 20 }} />
                                        </View>
                                    </View>
                                </Fragment>
                            );
                        }}
                        keyExtractor={(interview) => interview.id}
                        // curent value for debug is 0.5
                        onEndReachedThreshold={0.5} // Tried 0, 0.01, 0.1, 0.7, 50, 100, 700

                        onEndReached = {({distanceFromEnd})=>{ // problem
                            console.log(distanceFromEnd) // 607, 878 
                            console.log('reached');
                        }}
                    /> : this.renderLoading()}
                </View>
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.signupData.authData.unique_id
    }
}
export default connect(mapStateToProps, {  })(VideoConferencingHomepageHelper);