import React, { Component, Fragment } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, Dimensions, Animated, Keyboard, Platform } from 'react-native';
import styles from './styles.js';
import { Header, Left, Body, Right, Title, Subtitle, Button, Item, Input } from 'native-base';
import AwesomeButtonCartman from 'react-native-really-awesome-button/src/themes/cartman';
import { addSignupData } from "../../../actions/auth/signup.js";
import { connect } from "react-redux";
import DatePicker from "react-native-date-picker";
import RBSheet from "react-native-raw-bottom-sheet";
import PhoneInput from "react-native-phone-number-input";
import axios from "axios";
import Config from "react-native-config";
import Toast from 'react-native-toast-message';
import SmoothPinCodeInput from "react-native-smooth-pincode-input";

const { height, width } = Dimensions.get("window");

class PersonalDetailsHelper extends Component {
constructor (props) {
    super(props);
    
    this.state = {
        phoneNumber: "",
        formattedPhoneNumber: "",
        lastName: "",
        firstName: "",
        error: null,
        entryCode: "",
        verifyPhoneNumber: "",
        verifcationError: null,
        valid: false,
        birthdate: new Date(),
        editable: true
    }
    this.pinInput = React.createRef();
    this.phoneInput = React.createRef();
}

    calculateReadiness = () => {
        const { firstName, lastName, birthdate, phoneNumber, valid } = this.state;

        if (valid === true && (typeof firstName !== "undefined" && firstName.length > 0) && (typeof lastName !== "undefined" && lastName.length > 0) && (birthdate !== null) && (typeof phoneNumber !== "undefined" && phoneNumber.length > 0)) {
            return false;
        } else {
            return true;
        }
    }
    calculateReadinessSheet = () => {
        if (this.state.entryCode.length === 7) {
            return false;
        } else {
            return true;
        }
    }
    sendConfirmation = () => {

        Keyboard.dismiss();

        if (this.props.emailOrNot === true) {
            axios.post(`${Config.ngrok_url}/send/phone/confirmation`, {
                phoneNumber: this.state.phoneNumber,
                formatted: this.state.formattedPhoneNumber,
                email: this.props.emailOrUsername,
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
                    
                    if (res.data.message.includes("Account suspended: too many attempts")) {

                        this.setState({
                            error: "Use another email, your current email has been blocked and marked as 'suspecious activity'"
                        }, () => {
                            Toast.show({
                                type: 'error',
                                position: 'top',
                                text1: 'TOO MANY ATTEMPTS!',
                                text2: res.data.message,
                                visibilityTime: 4500
                            });
                        })
                    }
                }
            }).catch((err) => {
                console.log(err);
            });
        } else {
            axios.post(`${Config.ngrok_url}/send/phone/confirmation`, {
                phoneNumber: this.state.phoneNumber,
                formatted: this.state.formattedPhoneNumber,
                email: this.props.emailAddress,
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

                    if (res.data.message.includes("Account suspended: too many attempts")) {
                        this.setState({
                            error: "Use another email, your current email has been blocked and marked as 'suspecious activity'"
                        }, () => {
                            Toast.show({
                                type: 'error',
                                position: 'top',
                                text1: 'TOO MANY ATTEMPTS!',
                                text2: res.data.message,
                                visibilityTime: 4500
                            });
                        })
                    }
                }
            }).catch((err) => {
                console.log(err);
            });
        }
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
    
                    Keyboard.dismiss();
    
                    this.RBSheetTWO.close();
    
                    this.setState({
                        valid: true,
                        editable: false
                    })
                } else {
                    console.log(res.data);
    
                    this.pinInput.shake()
    
                    this.setState({
                        verifcationError: "Invalid verification code - please enter a valid code and try again..."
                    })
                }
            }).catch((err) => {
                console.log(err);
            })
        },  1000);
    }
    handleContinuation = () => {
        console.log("handleContinuation clicked");

        const { firstName, lastName, phoneNumber, birthdate } = this.state;

        this.props.addSignupData({
            ...this.props.signupData,
            firstName,
            lastName,
            phoneNumber,
            birthdate
        });
        
        setTimeout(() => {
            this.props.props.navigation.navigate("email-confirmation");
        }, 1000)
    }
    render() {
        const { error, verifcationError, editable } = this.state;
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
                    <Title style={styles.goldText}>Personal Details</Title>
                    <Subtitle style={styles.goldText}>Personal information...</Subtitle>
                </Body>
                    <Right />
                </Header>
                <Toast ref={(ref) => Toast.setRef(ref)} />
                <ScrollView contentContainerStyle={{ paddingBottom: 125 }} style={styles.container}>
                    <View style={styles.margin}>
                        <Text style={styles.header}>Enter your personal information</Text>
                        <View style={{ marginTop: 10 }} />
                        <Text style={styles.greyText}>you may change this data at a later point.</Text>
                        <View style={{ marginTop: 10 }} />
                        <Text style={styles.title}>Enter your first name</Text>
                        <Item regular>
                            <Input onChangeText={(value) => {
                                this.setState({
                                    firstName: value
                                })
                            }} value={this.state.firstName} placeholder='First Name' />
                        </Item>
                        <View style={{ marginTop: 15 }} />
                        <Text style={styles.title}>Enter your last name</Text>
                        <Item regular>
                            <Input onChangeText={(value) => {
                                this.setState({
                                    lastName: value
                                })
                            }} value={this.state.lastName} placeholder='Last Name' />
                        </Item>
                        <View style={{ marginTop: 15 }} />
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
                        <TouchableOpacity onPress={() => {
                            this.RBSheet.open();
                        }}>
                            <View style={styles.boxed}>
                                <Text>Select your birthdate...</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <View style={styles.bottomContainer}>
                    <View style={{ margin: 10 }}>
                        {this.calculateReadiness() ? <AwesomeButtonCartman type={"disabled"} stretch={true}>Next</AwesomeButtonCartman> : <AwesomeButtonCartman type={"anchor"} textColor={"white"}  onPress={this.handleContinuation} stretch={true}>Next</AwesomeButtonCartman>}
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
                                date={this.state.birthdate}
                                textColor={"#3E000C"}
                                maximumDate={new Date()}
                                mode="date"
                            />
                        </View>
                        <View style={{ marginTop: 10 }} />
                        <View style={{ margin: 15 }}>
                            <AwesomeButtonCartman type={"anchor"} textColor={"white"}  onPress={() => {
                                this.RBSheet.close();
                            }} stretch={true}>Select Date & Continue</AwesomeButtonCartman>
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
                            <View style={Platform.OS === "ios" ? { marginTop: 50, margin: 10 } : { marginTop: 25, margin: 10, marginBottom: 25 }}>
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
                                        this.setState({ entryCode: code, editable: true })
                                    }} 
                                    autoFocus={true}
                                    cellSize={40}
                                    editable={editable}
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
                                    <AwesomeButtonCartman type={"anchor"} textColor={"white"} stretch={true} onPress={() => {
                                        this.RBSheetTWO.close();
                                    }}>Close/Exit</AwesomeButtonCartman>
                                </View>
                                {this.calculateReadinessSheet() ? <AwesomeButtonCartman type={"disabled"} stretch={true}>Submit Verifcation Code</AwesomeButtonCartman> : <AwesomeButtonCartman type={"anchor"} textColor={"white"}  onPress={this.submitPhoneVerifcationAttempt} stretch={true}>Submit Verifcation Code</AwesomeButtonCartman>}
                            </View>
                        </View>
                </RBSheet>
           </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        signupData: state.signupData.data,
        emailOrNot: state.signupData.data.email,
        emailOrUsername: state.signupData.data.emailOrUsername,
        emailAddress: state.signupData.data.emailAddress,
        authyID: state.signupData.data.authyID
    }
}
export default connect(mapStateToProps, { addSignupData })(PersonalDetailsHelper);
