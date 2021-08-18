import React, { Component, Fragment } from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView, Animated, Dimensions } from 'react-native';
import styles from './styles.js';
import { Header, Left, Body, Right, Title, Subtitle, Button, Item, Input } from 'native-base';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import { connect } from "react-redux";
import RBSheet from "react-native-raw-bottom-sheet";
import DatePicker from "react-native-date-picker";
import PhoneInput from "react-native-phone-number-input";
import axios from "axios";
import Config from "react-native-config";
import Toast from 'react-native-toast-message';
import { signedInUserData, userSignedIn } from "../../../../actions/auth/signup.js";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { CometChat } from "@cometchat-pro/react-native-chat";
import messaging from '@react-native-firebase/messaging';
import SmoothPinCodeInput from "react-native-smooth-pincode-input";

const { height, width } = Dimensions.get("window");

class MoreInformationHelper extends Component {
constructor (props) {
    super(props);
    
    this.state = {
        selected: "",
        phoneNumber: "",
        formattedPhoneNumber: "",
        error: null,
        verifcationError: null,
        entryCode: "",
        verifyPhoneNumber: null,
        birthdate: null,
        valid: false,
        message: null,
        usernameValid: null,
        username: "",
        suggestions: []
    }
}
    calculateReadiness = () => {
        const { phoneNumber, selected, birthdate, valid, username } = this.state;

        if ((typeof username !== "undefined" && username.length > 0) && (typeof phoneNumber !== "undefined" && phoneNumber.length > 0) && (typeof selected !== "undefined" && selected.length > 0) && (birthdate !== null) && valid === true) {
            return false;
        } else {
            return true;
        }
    }
    sendConfirmation = () => {

        axios.post(`${Config.ngrok_url}/send/phone/confirmation`, {
            phoneNumber: this.state.phoneNumber,
            formatted: this.state.formattedPhoneNumber,
            email: this.props.email,
            countryCode: this.phoneInput.getCountryCode()
        }).then((res) => {
            if (res.data.message === "Successfully sent message to cellular device!") {
                console.log(res.data);

                const { verifyPhoneNumber } = res.data;

                this.setState({
                    verifyPhoneNumber
                }, () => {
                    this.RBSheetTWO.open();
                })
            } else {
                console.log("Err", res.data);

                this.setState({
                    error: "An error occurred while trying to send the confirmation code - please try this action again or contact support if the issue persists."
                }, () => {
                    Toast.show({
                        type: 'error',
                        position: 'top',
                        text1: 'An error occurred while sending confirmation code...',
                        text2: "Please try this action again or contact support if the problem persists.",
                        visibilityTime: 4500
                    });
                })
            }
        }).catch((err) => {
            console.log(err);
        });
    }
    submitPhoneVerifcationAttempt = () => {
        setTimeout(() => {
            axios.post(`${Config.ngrok_url}/attempt/phone/verifcation`, {
                entryCode: this.state.entryCode,
                phoneNumber: this.state.verifyPhoneNumber
            }).then((res) => {
    
                const { successful } = res.data;
    
                if (successful === true) {
                    console.log(res.data);
    
                    this.RBSheetTWO.close();
    
                    this.setState({
                        valid: true
                    })
                } else {
                    console.log(res.data);
    
                    this.setState({
                        verifcationError: "Invalid verification code - please enter a valid code and try again..."
                    })
                }
            }).catch((err) => {
                console.log(err);
            })
        },  1500);
    }
    calculateReadinessSheet = () => {
        if (this.state.entryCode.length === 7) {
            return false;
        } else {
            return true;
        }
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
                    }, 750)
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
    getFcmTokenOnboarding = async (user) => {
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
                        this.props.props.navigation.push("stripe-onboarding-authentication");
                    }, 750)
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
    handleContinuation = () => {
        const { firstName, lastName, email, googleID, fullName, photo } = this.props;

        const { formattedPhoneNumber, phoneNumber, selected, birthdate, username } = this.state;

        if (selected === "work") {
            // stripe - connect --- must go through stripe onboarding

            axios.post(`${Config.ngrok_url}/update/google/account/information`, {
                firstName,
                lastName,
                email,
                id: this.props.googleID,
                fullName,
                photo,
                phoneNumber,
                formattedPhoneNumber,
                accountType: selected,
                birthdate,
                username
            }).then((res) => {
                if (res.data.message === "Successfully updated account information!") {
                    console.log(res.data);
    
                    const { user } = res.data;
    
                    const authToken = user.cometChatAuthToken;
    
                    CometChat.login(authToken).then(
                        (User) => {
                            console.log("Login successfully:", User);
                            // User loged in successfully.
    
                            this.props.userSignedIn(true);
    
                            this.props.signedInUserData(user);
    
                            this.getFcmTokenOnboarding(user);
                        }, (error) => {
                            console.log("Login failed with exception:", error);
                            // User login failed, check error and take appropriate action.
                        }
                    );
                } else {
                    console.log("Err", res.data);
                }
            }).catch((err) => {
                console.log(err);
            })
        } else {
            axios.post(`${Config.ngrok_url}/update/google/account/information`, {
                firstName,
                lastName,
                email,
                id: this.props.googleID,
                fullName,
                photo,
                phoneNumber,
                formattedPhoneNumber,
                accountType: selected,
                birthdate,
                username
            }).then((res) => {
                if (res.data.message === "Successfully updated account information!") {
                    console.log(res.data);
    
                    const { user } = res.data;
    
                    const authToken = user.cometChatAuthToken;
    
                    CometChat.login(authToken).then(
                        (User) => {
                            console.log("Login successfully:", User);
                            // User loged in successfully.
    
                            this.props.userSignedIn(true);
    
                            this.props.signedInUserData(user);
    
                            this.getFcmToken(user);
                        }, (error) => {
                            console.log("Login failed with exception:", error);
                            // User login failed, check error and take appropriate action.
                        }
                    );
                } else {
                    console.log("Err", res.data);
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    }
    calculateSuccess = () => {
        if (this.state.usernameValid === true) {
            return true;
        } else {
            return false;
        }
    }
    calculateError = () => {
        if (this.state.usernameValid === false) {
            return true;
        } else {
            return false;
        }
    }
    checkUsername = (suggestion) => {
        axios.get(`${Config.ngrok_url}/check/username/taken`, {
            params: {
                username: this.state.username.toLowerCase()
            }
        }).then((res) => {
            if (res.data.message === "Username has not been taken!") {
                console.log(res.data);

                this.setState({
                    message: "Username is available!",
                    ready: true
                });
            } else {
                console.log("Err already taken", res.data);

                this.setState({
                    message: "Username is already taken!",
                    ready: false
                });
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    render() {
        console.log(this.state);

        const { error, verifcationError, message, suggestions, editable } = this.state;
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
                    <Title style={styles.whiteText}>General Information</Title>
                    <Subtitle style={styles.whiteText}>Choose your account type</Subtitle>
                </Body>
                    <Right />
                </Header>
                <ScrollView contentContainerStyle={{ paddingBottom: 125 }} style={styles.scroller}>
                    <View style={styles.container}>
                    <KeyboardAwareScrollView>
                        <View style={styles.margin}>
                            <Text style={styles.header}>Account type & general information</Text>
                            <View style={{ marginTop: 10 }} />
                            <Text style={styles.greyText}>You may change this at any time afterwards</Text>
                            <View style={{ marginTop: 10 }} />
                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    selected: "work"
                                })
                            }} style={this.state.selected === "work" ? styles.selectedRow : styles.row}>
                                <View style={styles.smallColumn}>
                                    <Image source={require("../../../../assets/icons/laptop.png")} style={styles.image} />
                                </View>
                                <View style={styles.largeColumn}>
                                    <Text style={styles.blueText}>I want to work</Text>
                                    <Text style={styles.innerText}>Browse and bid on jobs that suit your skills and needs</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={{ marginTop: 20 }} />
                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    selected: "hire"
                                })
                            }} style={this.state.selected === "hire" ? styles.selectedRow : styles.row}>
                                <View style={styles.smallColumn}>
                                    <Image source={require("../../../../assets/icons/hire.png")} style={styles.image} />
                                </View>
                                <View style={styles.largeColumn}>
                                    <Text style={styles.blueText}>I want to hire</Text>
                                    <Text style={styles.innerText}>Find your perfect freelancer by posting a job or browsing our talent media platform</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={{ marginTop: 25 }} />
                            <TouchableOpacity onPress={() => {
                                this.RBSheet.open();
                            }}>
                                <View style={styles.boxed}>
                                    <Text>Select your birthdate...</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={{ marginTop: 25 }} />
                        <Text style={styles.title}>Enter your phone number</Text>
                        <PhoneInput 
                            countries={["US", "UK"]}
                            containerStyle={{ width: "100%" }}
                            ref={ref => this.phoneInput = ref}
                            withShadow={true} 
                            defaultValue={this.state.phoneNumber}
                            defaultCode="US"
                            layout="first"
                            onChangeText={(text) => {
                                if (this.phoneInput.getCountryCode() === "US") {
                                    if (text.length === 10) {
                                        this.setState({
                                            phoneNumber: text,
                                            error: null
                                        }, () => {
                                            this.sendConfirmation();
                                        })
                                    } else {
                                        this.setState({
                                            phoneNumber: text,
                                            error: null
                                        })
                                    }
                                } else {

                                }
                            }}
                            onChangeFormattedText={(text) => {
                                this.setState({
                                    formattedPhoneNumber: text
                                })
                            }}
                            withShadow
                        />
                        {error !== null ? <Text style={styles.redText}>{error}</Text> : null}
                        <View style={{ marginTop: 25 }} />
                            <Text style={styles.title}>Enter your username</Text>
                            <Item success={this.calculateSuccess()} error={this.calculateError()} style={{ backgroundColor: "white", flexDirection: 'row-reverse' }} regular>
                            <View 
                                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginRight: 15 }}
                                >
                                <Input value={this.state.username} onChangeText={(value) => {
                                    this.setState({
                                        username: value
                                    }, () => {
                                        this.checkUsername(value);
                                    })
                                }} placeholder='Select your username' />
                                {this.calculateSuccess() ? <Icon name="checkmark" /> : null}
                            </View>
                            </Item>
                        
                        {message !== null && message === "Username is available!" ? <Text style={styles.greenText}>{message}</Text> : <Text style={styles.redText}>{message}</Text>}
                        </View>
                        </KeyboardAwareScrollView>
                    </View>
                </ScrollView>
                <View style={styles.bottomContainer}>
                    <View style={{ margin: 10 }}>
                        {this.calculateReadiness() ? <AwesomeButtonBlue type={"disabled"} stretch={true}>Next</AwesomeButtonBlue> : <AwesomeButtonBlue type={"secondary"} onPress={this.handleContinuation} stretch={true}>Next</AwesomeButtonBlue>}
                    </View>
                </View>
                <RBSheet
                    animation={new Animated.Value(0)}
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    height={350}
                    openDuration={250}
                    customStyles={{
                        container: {
                            
                        }
                    }}
                    >
                        
                        <View style={styles.centered}>
                        <Text style={[styles.title, { marginTop: 15 }]}>Select your birthdate</Text>
                            <DatePicker
                                onDateChange={(date) => {
                                    this.setState({
                                        birthdate: date
                                    })
                                }}
                                date={this.state.birthdate !== null ? this.state.birthdate : new Date()}
                                textColor={"#3E000C"}
                                maximumDate={new Date()}
                                mode="date"
                            />
                        </View>
                        <View style={{ marginTop: 10 }} />
                        <View style={{ margin: 15 }}>
                            <AwesomeButtonBlue textColor={"white"} backgroundColor={"#141414"} type={"secondary"} onPress={() => {
                                this.RBSheet.close();
                            }} stretch={true}>Select Date & Continue</AwesomeButtonBlue>
                        </View>
                </RBSheet>
                <RBSheet
                    animation={new Animated.Value(0)}
                    ref={ref => {
                        this.RBSheetTWO = ref;
                    }}
                    height={height}
                    openDuration={250}
                    customStyles={{
                        container: {
                            
                        }
                    }}
                    >
                        <View style={{ flex: 1 }}>
                            <View style={{ marginTop: 50, margin: 10 }}>
                                <Text style={styles.header}>Enter the code that was just sent to the number provided</Text>
                                <View style={{ marginTop: 10 }} />
                                <Text style={styles.greyText}>You have a limited amount of times you can attempt to properly validate your phone number with the code provided. Please pay attention to your entry and make sure it is correct.</Text>
                                <View style={{ marginTop: 15 }} />
                                <Text style={[styles.title, { textAlign: "left" }]}>Enter your verifcation code</Text>
                                <SmoothPinCodeInput
                                    ref={(ref) => this.pinInput = ref}
                                    value={this.state.entryCode} 
                                    codeLength={7}
                                    onTextChange={code => {
                                        this.setState({ entryCode: code })
                                    }} 
                                    autoFocus={true}
                                    cellSize={40}
                                    keyboard
                                    cellSpacing={10}
                                    onFulfill={this.submitPhoneVerifcationAttempt}
                                    onBackspace={this._focusePrevInput}
                                />
                                {verifcationError !== null ? <Text style={styles.redText}>{verifcationError}</Text> : null}
                            </View>
                        </View>
                        <View style={styles.bottomContainer}>
                            <View style={{ margin: 10 }}>
                                <View style={{ marginBottom: 20 }}>
                                    <AwesomeButtonBlue type={"secondary"} textColor={"white"} backgroundColor={"#141414"} stretch={true} onPress={() => {
                                        this.RBSheetTWO.close();
                                    }}>Close/Exit</AwesomeButtonBlue>
                                </View>
                                {this.calculateReadinessSheet() ? <AwesomeButtonBlue type={"disabled"} stretch={true}>Submit Verifcation Code</AwesomeButtonBlue> : <AwesomeButtonBlue type={"secondary"} textColor={"white"} backgroundColor={"#141414"} onPress={this.submitPhoneVerifcationAttempt} stretch={true}>Submit Verifcation Code</AwesomeButtonBlue>}
                            </View>
                        </View>
                </RBSheet>
           </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    console.log(state);
    return {
        signupData: state.signupData.data,
        email: state.signupData.email,
        firstName: state.signupData.data.firstName,
        lastName: state.signupData.data.lastName,
        email: state.signupData.data.email,
        googleID: state.signupData.data.id,
        fullName: state.signupData.data.fullName,
        photo: state.signupData.data.photo
    }
}
export default connect(mapStateToProps, { signedInUserData, userSignedIn })(MoreInformationHelper);