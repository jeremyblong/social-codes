import React, { Component, Fragment } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles.js';
import { Header, Left, Body, Right, Title, Subtitle, Button, Item, Input, Icon } from 'native-base';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import { addSignupData, userSignedIn, signedInUserData } from "../../../actions/auth/signup.js";
import { connect } from "react-redux";
import axios from "axios";
import Config from "react-native-config";
import { CometChat } from "@cometchat-pro/react-native-chat";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import messaging from '@react-native-firebase/messaging';

class EmailConfirmationHelper extends Component {
constructor (props) {
    super(props);
    
    this.state = {
        code: "",
        valid: null
    }
}
    calculateReadiness = () => {
        const { valid } = this.state;

        if (valid === true) {
            return false;
        } else {
            return true;
        }
    }
    calculateSuccess = () => {
        const { valid } = this.state;

        if (valid === null) {
            return null;
        } else if (valid === true) {
            return true;
        } else {
            return false;
        }
    }
    calculateError = () => {
        if (this.state.valid === false) {
            return true;
        } else {
            return false;
        }
    }
    handleContinuation = () => {
        console.log("handleContinuation clicked");
        
        const { 
            accountType,
            username,
            password,
            emailOrUsername,
            emailAddress,
            firstName,
            lastName,
            birthdate,
            phoneNumber
        } = this.props;

        if (this.props.emailOrNot === false) {
            axios.post(`${Config.ngrok_url}/register`, {
                accountType,
                username,
                loginUsername: emailOrUsername,
                loginPassword: password,
                email: emailAddress,
                firstName,
                lastName,
                birthdate,
                phoneNumber
            }).then(async (res) => {
                if (res.data.message === "Successfully registered!") {
                    console.log(res.data);

                    const fcmToken = await messaging().getToken();

                    setTimeout(() => {
                        if (fcmToken) {
                            console.log(fcmToken);
                            console.log("Your Firebase Token is:", fcmToken);
                            
                            axios.post(`${Config.ngrok_url}/save/firebase/token`, {
                                token: fcmToken,
                                unique_id: res.data.user.unique_id
                            }).then((responseeeeeeeeee) => {
                                if (responseeeeeeeeee.data.message === "Saved firebase token!") {
                                    console.log(responseeeeeeeeee.data);
    
                                    CometChat.login(res.data.user.cometChatAuthToken).then(
                                        User => {
                                            console.log("Login successfully:", User);
                                            // User loged in successfully.
                
                                            this.props.userSignedIn(true);
                
                                            this.props.signedInUserData(res.data.user);
                
                                            setTimeout(() => {
                                                this.props.props.navigation.push("homepage");
                                            }, 1000)
                                        },
                                        error => {
                                          console.log("Login failed with exception:", error);
                                          // User login failed, check error and take appropriate action.
                                        }
                                    );
                                } else {
                                    console.log("err", res.data);
                                }
                            }).catch((err) => {
                                console.log(err);
                            })
                        } else {
                            console.log("Failed", "No token received");
                        }
                    }, 750)
                } else {
                    console.log("Err", res.data);
                }
            }).catch((err) => {
                console.log(err);
            })
        } else {
            axios.post(`${Config.ngrok_url}/register`, {
                accountType,
                username,
                loginPassword: password,
                loginEmail: emailOrUsername,
                firstName,
                lastName,
                birthdate,
                phoneNumber
            }).then(async (res) => {
                if (res.data.message === "Successfully registered!") {
                    console.log(res.data);

                    const fcmToken = await messaging().getToken();

                    setTimeout(() => {
                        if (fcmToken) {
                            console.log(fcmToken);
                            console.log("Your Firebase Token is:", fcmToken);
                            
                            axios.post(`${Config.ngrok_url}/save/firebase/token`, {
                                token: fcmToken,
                                unique_id: res.data.user.unique_id
                            }).then((responseeeeee) => {
                                if (responseeeeee.data.message === "Saved firebase token!") {
                                    console.log(responseeeeee.data);
    
                                    CometChat.login(res.data.user.cometChatAuthToken).then(
                                        User => {
                                            console.log("Login successfully:", User);
                                            // User loged in successfully.
                
                                            this.props.userSignedIn(true);
                
                                            this.props.signedInUserData(res.data.user);
                
                                            setTimeout(() => {
                                                this.props.props.navigation.push("homepage");
                                            }, 1000)
                                        },
                                        error => {
                                          console.log("Login failed with exception:", error);
                                          // User login failed, check error and take appropriate action.
                                        }
                                    )
                                } else {
                                    console.log("err", res.data);
                                }
                            }).catch((err) => {
                                console.log(err);
                            })
                        } else {
                            console.log("Failed", "No token received");
                        };
                    }, 750)
                } else {
                    console.log("Err", res.data);
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    }
    checkCode = (data) => {
        console.log(data);
        axios.post(`${Config.ngrok_url}/check/code/email`, {
            code: this.props.code,
            entered: data.toLowerCase()
        }).then((res) => {
            if (res.data.message === "Code matches!") {
                console.log(res.data);

                this.setState({
                    valid: true
                })
            } else {
                console.log("Err", res.data);

                this.setState({
                    valid: false
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    render() {
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
                    <Title>Confirmation</Title>
                    <Subtitle>Email confirmation</Subtitle>
                </Body>
                    <Right />
                </Header>
                <View style={styles.container}>
                    <View style={styles.margin}>
                        <Text style={styles.header}>Confirm your email address</Text>
                        <View style={{ marginTop: 10 }} />
                        <Text style={[styles.greyText, { marginBottom: 15 }]}>Enter the code that was sent to your email</Text>
                        <SmoothPinCodeInput password mask="﹡"
                                cellSize={35}
                                keyboardType={"default"}
                                codeLength={8}
                                value={this.state.code}
                                onTextChange={code => this.setState({ code })}
                                onFulfill={this.checkCode}
                            />
                        <View style={styles.centered}>
                            <Text style={styles.emailText}>Please view the email we sent to the prvoided email and enter the verification code which is typically 7-8 characters long in length.</Text>
                            <Image source={require("../../../assets/icons/email.png")} style={styles.emailIcon} />
                        </View>
                    </View>
                </View>
                <View style={styles.bottomContainer}>
                    <View style={{ margin: 10 }}>
                        {this.calculateReadiness() ? <AwesomeButtonBlue type={"disabled"} stretch={true}>Next</AwesomeButtonBlue> : <AwesomeButtonBlue type={"secondary"} onPress={this.handleContinuation} stretch={true}>Next</AwesomeButtonBlue>}
                    </View>
                </View>
           </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        signupData: state.signupData.data,
        code: state.signupData.data.verifcationCode,
        unique_id: state.signupData.data.unique_id,
        emailOrNot: state.signupData.data.email,
        accountType: state.signupData.data.accountType,
        password: state.signupData.data.password,
        username: state.signupData.data.username,
        emailOrUsername: state.signupData.data.emailOrUsername,
        emailAddress: state.signupData.data.emailAddress,
        firstName: state.signupData.data.firstName,
        lastName: state.signupData.data.lastName,
        birthdate: state.signupData.data.birthdate,
        phoneNumber: state.signupData.data.phoneNumber
    }
}
export default connect(mapStateToProps, { addSignupData, userSignedIn, signedInUserData })(EmailConfirmationHelper);