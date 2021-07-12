import React, { Component, Fragment } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import styles from './styles.js';
import { Header, Left, Body, Right, Title, Subtitle, Button } from 'native-base';
import { addSignupData, userSignedIn, signedInUserData } from "../../../actions/auth/signup.js";
import { connect } from "react-redux";
import axios from "axios";
import Config from "react-native-config";
import { CometChat } from "@cometchat-pro/react-native-chat";
import AwesomeButtonCartman from 'react-native-really-awesome-button/src/themes/cartman';
import { WebView } from 'react-native-webview';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const { width, height } = Dimensions.get("window");


class StripeOnboardingRegisterHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        ready: false,
        url: null,
        continuation: false
    }
}
    componentDidMount() {

        const { stripeConnectAccountID } = this.props;

        axios.get(`${Config.ngrok_url}/gather/onboarding/links`, {
            params: {
                stripeConnectAccountID
            }
        }).then((res) => {
            if (res.data.message === "Created links!") {

                const { url } = res.data;

                this.setState({
                    ready: true,
                    url
                })
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    finishedOnboarding = () => {
        CometChat.login(this.props.signupData.cometChatAuthToken).then(
            User => {
                console.log("Login successfully:", User);
                // User loged in successfully.

                this.props.userSignedIn(true);

                this.props.signedInUserData(this.props.signupData);

                setTimeout(() => {
                    this.props.props.navigation.push("homepage");
                }, 1000)
            },
            error => {
              console.log("Login failed with exception:", error);
              // User login failed, check error and take appropriate action.
            }
        );
    }
    renderContent = () => {
        
        const { ready, url, continuation } = this.state;

        if (ready === true && url !== null) {
            return (
                <Fragment>
                    <WebView
                        source={{ uri: url }}
                        style={{ width, height: "100%" }}
                        onNavigationStateChange={(state) => {
                            //your code goes here     
                            console.log("webview state, : ", state);  

                            if ((state.url === "https://www.google.com/" || state.url === "https://www.google.com") && continuation === false) {
                                this.setState({
                                    continuation: true
                                }, () => {
                                    this.finishedOnboarding();
                                })
                            }
                        }}
                    />
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <SkeletonPlaceholder>
                        <View style={{ width, height: 125 }}></View>
                    </SkeletonPlaceholder>
                    <View style={{ marginTop: 25 }} />
                    <SkeletonPlaceholder>
                        <View style={{ width, height: 125 }}></View>
                    </SkeletonPlaceholder>
                    <View style={{ marginTop: 25 }} />
                    <SkeletonPlaceholder>
                        <View style={{ width, height: 125 }}></View>
                    </SkeletonPlaceholder>
                    <View style={{ marginTop: 25 }} />
                    <SkeletonPlaceholder>
                        <View style={{ width, height: 125 }}></View>
                    </SkeletonPlaceholder>
                    <View style={{ marginTop: 25 }} />
                </Fragment>
            );
        }
    }
    testing = () => {
        const { stripeConnectAccountID } = this.props;

        axios.get(`${Config.ngrok_url}/gather/onboarding/links`, {
            params: {
                stripeConnectAccountID
            }
        }).then((res) => {
            if (res.data.message === "Created links!") {

                const { url } = res.data;
                
                this.setState({
                    ready: true,
                    url
                })
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    render() {
        console.log("PROPIES", this.props.props);
        return (
            <Fragment>
                <Header style={{ backgroundColor: "#303030" }}>
                    <Left>
                        <Button onPress={() => {
                            this.props.props.navigation.goBack();
                        }} transparent>
                            <Image source={require("../../../assets/icons/go-back.png")} style={[styles.headerIcon, { tintColor: "#fdd530" }]} />
                        </Button>
                    </Left>
                <Body>
                    <Title style={styles.goldText}>Stripe Onboarding</Title>
                    <Subtitle style={styles.goldText}>Complete your onboarding...</Subtitle>
                </Body>
                    <Right />
                </Header>
                <View style={styles.container}>
                    {this.renderContent()}
                </View>
                <AwesomeButtonCartman type={"anchor"} textColor={"white"} onPress={() => {
                    this.testing();
                }} stretch={true}>Complete onboarding later with LIMITED account privileges!</AwesomeButtonCartman>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        stripeConnectAccountID: state.signupData.data.stripeConnectAccount.id,
        signupData: state.signupData.data
    }
}
export default connect(mapStateToProps, { addSignupData, userSignedIn, signedInUserData })(StripeOnboardingRegisterHelper);
