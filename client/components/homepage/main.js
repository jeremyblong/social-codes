import React, { Component, Fragment } from 'react';
import { View, Text, Image, ImageBackground, Dimensions } from "react-native";
import styles from "./styles.js";
import LinearGradient from 'react-native-linear-gradient';
import AwesomeButton from 'react-native-really-awesome-button';
import LottieView from "lottie-react-native";
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';
import { addSignupData, userSignedIn, signedInUserData } from "../../actions/auth/signup.js";
import { connect } from "react-redux";
import axios from 'axios';
import Config from "react-native-config";
import { CometChat } from "@cometchat-pro/react-native-chat"
import messaging from '@react-native-firebase/messaging';
import Video from "react-native-video";
const { height, width } = Dimensions.get("window");



class MainHomepageHelper extends Component {
constructor () {
    super();

    this.state = {
        data: [],
        isSigninInProgress: null,
        userInfo: null
    }
}   
    componentDidMount() {
        // this.animation.play();

        GoogleSignin.configure();
    }
    getFcmToken = async (user) => {
		const fcmToken = await messaging().getToken();
		if (fcmToken) {
			console.log(fcmToken);

			console.log("Your Firebase Token is:", fcmToken);
			
			axios.post(`${Config.ngrok_url}/save/firebase/token`, {
				token: fcmToken,
				unique_id: user.unique_id
			}).then((res) => {
				if (res.data.message === "Saved firebase token!") {
					console.log(res.data);

                    setTimeout(() => {
                        this.props.props.navigation.push("homepage");
                    },  750);
				} else {
					console.log("err", res.data);
				}
			}).catch((err) => {
				console.log(err);
			})
		} else {
		 console.log("Failed", "No token received");
		}
	}
    _signIn = async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
            this.setState({ 
                userInfo 
            }, () => {
                const { email, familyName, givenName, id, name, photo } = userInfo.user;
                
                axios.get(`${Config.ngrok_url}/check/google/user/existant`, {
                    params: {
                        googleID: id
                    }
                }).then((res) => {
                    console.log(res.data);

                    if (res.data.message === "User does NOT exist!") {
                        this.props.addSignupData({
                            email, 
                            lastName: familyName, 
                            firstName: givenName, 
                            id, 
                            fullName: name, 
                            photo
                        });
        
                        setTimeout(() => {
                            this.props.props.navigation.navigate("create-secondary-information-google-signin");
                        },  750);
                    } else {

                        const { user } = res.data;

                        const apiKey = Config.cometchat_auth_key;

                        CometChat.login(user.unique_id, apiKey).then(
                            cometUser => {
                                console.log("Login Successful:", cometUser); 
                              
                                this.props.userSignedIn(true);

                                this.props.signedInUserData(user);

                                this.getFcmToken(user);
                            },
                            error => {
                              console.log("Login failed with exception:", error);   
                              
                              if (error.code === "ERR_UID_NOT_FOUND") {
                                    const uid = user.unique_id;
                                    const name = `${user.firstName} ${user.lastName}`;

                                    const cometUser = new CometChat.User(uid);

                                    cometUser.setName(name);

                                    CometChat.createUser(cometUser, apiKey).then(
                                        cometUser => {
                                            console.log("user created", cometUser);

                                            this.props.userSignedIn(true);

                                            this.props.signedInUserData(user);

                                            this.getFcmToken(user);
                                        },error => {
                                            console.log("error", error);
                                        }
                                    )
                              }
                            }
                        );
                    }
                }).catch((err) => {
                    console.log(err);
                })
            });
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            console.log(error);
            // user cancelled the login flow
          } else if (error.code === statusCodes.IN_PROGRESS) {
            console.log(error);
            // operation (e.g. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            console.log(error);
            // play services not available or outdated
          } else {
            console.log(error);
            // some other error happened
          }
        }
    };
    render() {
        console.log("this.state ", this.state);
        return (
            <Fragment>
                {/* <LinearGradient colors={['black', '#303030', 'blue']} style={styles.background}> */}
                <Video
                    source={require("../../assets/video/world.mp4")}
                    style={styles.backgroundVideo}
                    muted={true}
                    repeat={true}
                    resizeMode={"cover"}
                    rate={1.0}
                    ignoreSilentSwitch={"obey"}
                />
                    <View style={[styles.centered, { maxHeight: 400, paddingTop: 25 }]}>
                        <Image source={require("../../assets/images/social_code_long.png")} style={styles.logo} />
                        <Text style={styles.whiteMedium}>{"Hire expert freelancers for your custom software job online!"}</Text>
                        {/* <LottieView
                            source={require("../../assets/animations/tech.json")}
                            ref={animation => {
                                this.animation = animation;
                            }}
                            loop
                            style={{ marginTop: height * 0.135, minWidth: 350, minHeight: 325 }} 
                            autoPlay
                        /> */}
                    </View>
                    <View style={styles.bottom}>
                        <AwesomeButton onPress={() => {
                            this.props.props.navigation.navigate("auth-main");
                        }} stretch={true} backgroundColor={"black"} textColor={"white"} backgroundShadow={"black"} borderRadius={10} borderColor={"#ffd530"} backgroundShadow={"#ffd530"} borderWidth={1}>Continue with email/username</AwesomeButton>
                        <View style={styles.hr} />
                        <GoogleSigninButton
                            style={{ width: "75%", minWidth: "75%", minHeight: 48, height: 48 }}
                            size={GoogleSigninButton.Size.Wide}
                            color={GoogleSigninButton.Color.Dark}
                            onPress={this._signIn}
                            disabled={this.state.isSigninInProgress} 
                        />
                    </View>
                {/* </LinearGradient> */}
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {

    }
}
export default connect(mapStateToProps, { addSignupData, userSignedIn, signedInUserData })(MainHomepageHelper);