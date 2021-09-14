import React, { Component, Fragment, useState } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, Platform } from "react-native";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import styles from "./styles.js";
import { Header, Left, Body, Right, Title, Subtitle, Button, Content, Input, Item } from 'native-base';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import axios from "axios";
import Config from "react-native-config";
import { addSignupData, userSignedIn, signedInUserData } from "../../actions/auth/signup.js";
import { connect } from "react-redux";
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { CometChat } from "@cometchat-pro/react-native-chat";
import LottieView from 'lottie-react-native';


const { width, height } = Dimensions.get('window');

let timeout = 0;

const FirstRoute = (props) => {
    const [visibility, change] = useState(true);
    const [emailOrUsername, setUsernameOrEmail] = useState("");
    const [ password, setPassword] = useState("");
    const [ valid, setValid ] = useState(null);
    const [ error, setError ] = useState("");
    const [ message, setMessage ] = useState(null);

    const navigation = useNavigation();

    const calculate = () => {
        if (typeof emailOrUsername !== "undefined" && emailOrUsername.length >= 8 && password.length >= 6 && valid === true) {
            return false;
        } else {
            return true;
        }
    }
    const checkError = () => {
        if (valid === false) {
            return true;
        }
    }
    const checkSuccess = () => {
        if (valid === true) {
            return true;
        } 
    }
    const handleSubmissionNextPage = () => {
        if (emailOrUsername.includes("@") && emailOrUsername.includes(".com")) {
            setTimeout(() => {
                axios.post(`${Config.ngrok_url}/send/email/code/verifcation`, {
                    email: emailOrUsername
                }).then((res) => {
                    if (res.data.message === "Successfully sent email and code!") {

                        props.props.addSignupData({
                            emailOrUsername,
                            password,
                            email: true,
                            verifcationCode: res.data.generatedID
                        })

                        setTimeout(() => {
                            navigation.navigate("choose-username");
                        }, 750)
                    } else {
                        console.log("Err", res.data);

                        Toast.show({
                            type: 'error',
                            position: 'top',
                            text1: 'An error occurred sending email verfication.',
                            text2: 'Error occurred while sending email verification code... Please try again',
                            visibilityTime: 4500
                        });
                    }
                }).catch((err) => {
                    console.log(err.message);
                })
            }, 750)
        } else {
            props.props.addSignupData({
                emailOrUsername,
                password,
                email: false
            })

            setTimeout(() => {
                navigation.navigate("choose-username");
            }, 1000)
        }
    }
    const checkUsername = (value) => {

        setUsernameOrEmail(value);

        if(timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            //search function
            axios.get(`${Config.ngrok_url}/check/username/taken`, {
                params: {
                    username: value
                }
            }).then((res) => {
                if (res.data.message === "Username has not been taken!") {
                    console.log(res.data);
    
                    setMessage("Username is available!")
                } else {
                    console.log("Err already taken", res.data);
    
                    setMessage("Username is already taken!")
                }
            }).catch((err) => {
                console.log(err);
            })
        }, 300);
    }
    return (
    <View style={[styles.scene, { backgroundColor: 'white' }]}>
        <Toast ref={(ref) => Toast.setRef(ref)} />
        <Content bounces={false} style={{ margin: 10 }}>
          <Text style={styles.whiteText}>Email or username</Text>
          <Item style={{ backgroundColor: "white" }} regular>
            <Input value={emailOrUsername} onChangeText={(value) => {
                console.log(value);
                if (value.length === 0) {
                    setMessage(null);

                    setUsernameOrEmail(value);
                } else {
                    if (value.includes("@") || value.includes(".com")) {
                        setMessage(null);

                        setUsernameOrEmail(value);
                    } else {
                        checkUsername(value);
                    }
                }
            }} placeholder='Email or username' />
          </Item>
          <Text style={styles.smallGrey}>Minimum 8 charectors for username</Text>
          <View style={{ marginTop: 10 }} />
          {message !== null && message === "Username is available!" ? <Text style={styles.greenText}>{message}</Text> : <Text style={styles.redText}>{message}</Text>}
          {error === "user already exists" ? <Text style={styles.redTextSmall}>An account already exists with the email address you have provided. Please use a different email address for signing up or try logging in.</Text> : null}
          <View style={styles.hr} />
          <Text style={styles.whiteText}>Password</Text>
          <Item error={checkError()} success={checkSuccess()} style={{ backgroundColor: "white", flexDirection: 'row-reverse', width: '100%', flex: 1 }} regular>
          <View 
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginRight: 15 }}
            >
            <Input value={password} onChangeText={(value) => {

                if (value.match(/^(?=.{10,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/)) {
                    setPassword(value);

                    setValid(true);
                    
                    console.log("match!!");
                } else {
                    console.log("no match....");

                    setPassword(value);

                    setValid(false)
                }
            }} secureTextEntry={visibility} placeholder='Password'/>
                <TouchableOpacity onPress={() => {
                    change(!visibility);
                }} style={{ zIndex: 999, maxWidth: 60 }}>
                    {visibility === true ? <Text style={{ color: "#303030" }}>Show</Text> : <Text style={{ color: "#303030" }}>Hide</Text>}
                </TouchableOpacity>
            </View>
          </Item>
          <Text style={styles.smallGrey}>Password must contain at least 1 uppercase, 1 lowercase, 1 digit, 1 special character and have a length of at least of 10.</Text>
            {/* <View style={styles.centered}>
                <LottieView source={require('../../assets/animations/profile.json')} style={styles.animation} autoPlay loop />
            </View> */}
        </Content>
        <View style={styles.bottomed}>
            {calculate() ? <AwesomeButtonBlue type={"disabled"} stretch={true}>Join & Continue To Next Page</AwesomeButtonBlue> : <AwesomeButtonBlue borderColor={"#141414"} borderWidth={2} style={{ zIndex: -1 }} progress type={"anchor"} backgroundColor={"#ffffff"} backgroundPlaceholder={"black"} backgroundProgress={"black"} textColor={"black"} shadowColor={"grey"} onPress={handleSubmissionNextPage} stretch={true}>Join & Continue To Next Page</AwesomeButtonBlue>}
        </View>
    </View> 
    );
};

const SecondRoute = (props) => {
    const [ loginEmailOrUsername, setLoginEmailOrUsername ] = useState("");
    const [ password, setPassword] = useState("");
    const [visibility, change] = useState(true);
    const [ loading, setLoading ] = useState(false);


    const navigation = useNavigation();
    
    const calculateLogin = () => {
        if (typeof loginEmailOrUsername !== "undefined" && loginEmailOrUsername.length >= 8 && password.length >= 6) {
            return false;
        } else {
            return true;
        }
    }
    const handleSubmission = (next) => {
        axios.post(`${Config.ngrok_url}/login`, {
            emailOrUsername: loginEmailOrUsername,
            password
        }).then((res) => {
            if (res.data.message === "Successfully authenticated!") {
                console.log(res.data);

                const { user } = res.data;

                const authToken = user.cometChatAuthToken;

                CometChat.login(authToken).then(
                    (User) => {
                        console.log("Login successfully:", User);
                        // User loged in successfully.

                        next();

                        props.props.userSignedIn(true);

                        props.props.signedInUserData(user);

                        setTimeout(() => {
                            navigation.push("homepage");
                        }, 750)
                    }, (error) => {
                        console.log("Login failed with exception:", error);
                        // User login failed, check error and take appropriate action.

                        next();
                    }
                );
            } else {
                console.log("Err", res.data);

                next();

                Toast.show({
                    text1: res.data.message,
                    text2: "Error - Please try to login again with different credentials or try to reset your password if you cannot remember your information.",
                    type: "error",
                    position: "bottom",
                    visibilityTime: 4500
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <View style={[styles.scene, { backgroundColor: 'white' }]}>
            
            <Content bounces={false} style={{ margin: 10 }}>
            <Text style={styles.whiteText}>Email or username</Text>
            <Item style={{ backgroundColor: "white" }} regular>
                <Input value={loginEmailOrUsername} onChangeText={(value) => {
                    setLoginEmailOrUsername(value);
                }} placeholder='Email or username' />
            </Item>
            <View style={styles.hr} />
            <Text style={styles.whiteText}>Password</Text>
            <Item style={{ backgroundColor: "white", flexDirection: 'row-reverse', width: '100%', flex: 1 }} regular>
            <View 
                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginRight: 15 }}
                >
                <Input value={password} onChangeText={(value) => {
                    setPassword(value);
                }} secureTextEntry={visibility} placeholder='Password'/>
                    <TouchableOpacity onPress={() => {
                        change(!visibility);
                    }} style={{ zIndex: 999, maxWidth: 60 }}>
                        {visibility === true ? <Text style={{ color: "#303030" }}>Show</Text> : <Text style={{ color: "#303030" }}>Hide</Text>}
                    </TouchableOpacity>
                </View>
            </Item>
            <Text style={styles.smallGrey}>5 sign-in attempts allowed per hour.</Text>
            {/* <View style={styles.centered}>
                <LottieView source={require('../../assets/animations/signin.json')} style={styles.animation} autoPlay loop />
            </View> */}
            </Content>
            
            <View style={styles.bottomed}>
                {calculateLogin() ? <AwesomeButtonBlue style={{ zIndex: -1 }} type={"disabled"} onPress={() => {}} stretch={true}>Sign-in</AwesomeButtonBlue> : <AwesomeButtonBlue borderColor={"#141414"} borderWidth={2} style={{ zIndex: -1 }} progress type={"anchor"} backgroundColor={"#ffffff"} backgroundPlaceholder={"black"} backgroundProgress={"black"} textColor={"black"} shadowColor={"grey"} onPress={(next) => {
                    handleSubmission(next);
                }} stretch={true}>Sign-in</AwesomeButtonBlue>}
            </View>
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </View>
    );
}

const initialLayout = { width };

const renderTabBar = props => (
    <TabBar 
        renderLabel={({ route, focused, color }) => (
            <Text style={{ color: "#3E000C", margin: 8, fontWeight: "bold" }}>
                {route.title}
            </Text>
        )}
        onTabLongPress={(scene) => {
            const { route } = scene
            props.jumpTo(route.key)
        }}
        {...props}
        indicatorStyle={{ backgroundColor: '#3E000C' }}
        style={{ backgroundColor: 'white' }}
    />
);


const AuthenticationPanelHelper = (props) => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'first', title: 'Sign-Up' },
      { key: 'second', title: 'Sign-In' },
    ]);
   
    const renderScene = SceneMap({
      first: () => <FirstRoute props={props} />,
      second: () => <SecondRoute props={props} />,
    });
    return (
        <Fragment>
            <Header style={Platform.OS === 'android' ? { backgroundColor: '#303030'} : {}}>
                <Left>
                    <Button onPress={() => {
                        props.props.navigation.goBack();
                    }} transparent>
                        <Image source={require("../../assets/icons/go-back.png")} style={Platform.OS === "ios" ? [styles.headerIcon, { tintColor: "black" }] : styles.headerIcon} />
                    </Button>
                </Left>
            <Body>
                <Title style={Platform.OS === 'android' ? { color: '#ffffff'} : {}}>Signup/Signin</Title>
                {Platform.OS === 'ios' ? <Subtitle>Signup or sign-in...</Subtitle> : null}
            </Body>
                <Right />
            </Header>
            <TabView    
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                renderTabBar={renderTabBar}
                initialLayout={initialLayout}
            />
        </Fragment>
    )
}
const mapStateToProps = (state) => {
    return {
        signupData: state.signupData.data
    }
}
export default connect(mapStateToProps, { addSignupData, userSignedIn, signedInUserData })(AuthenticationPanelHelper);