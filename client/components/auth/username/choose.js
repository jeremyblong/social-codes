import React, { Component, Fragment } from 'react';
import { Text, Image, View, Dimensions } from 'react-native';
import styles from "./styles.js";
import { Header, Left, Body, Right, Title, Subtitle, Button, Input, Item, Icon } from 'native-base';
import { addSignupData } from "../../../actions/auth/signup.js";
import { connect } from "react-redux";
import axios from "axios";
import Config from "react-native-config";
import AwesomeButtonCartman from 'react-native-really-awesome-button/src/themes/cartman';


const { height, width } = Dimensions.get("window");


class ChooseUsernameHelper extends Component {
constructor (props) {
    super(props);

    let username = "";

    if (this.props.signupData.emailOrUsername.includes("@")) {
        username = this.props.signupData.emailOrUsername.split("@")[0];
    } else {
        username = this.props.signupData.emailOrUsername;
    }

    this.state = {
        selected: username,
        suggestions: [username, username + Math.random().toString(36).substring(3).slice(0, 3), username + Math.random().toString(36).substring(2).slice(0, 3), username + Math.random().toString(36).substring(1).slice(0, 3), username + Math.random().toString(36).substring(3).slice(0, 3), username + Math.random().toString(36).substring(3).slice(0, 3)],
        valid: true,
        selected: username,
        message: null,
        ready: false
    }
}
    componentDidMount() {
        // make api request to check for existing username
        axios.get(`${Config.ngrok_url}/check/username`).then((res) => {
            if (res.data.message === "Successfully authenticated!") {
                console.log(res.data);
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    calculateSuccess = () => {
        if (this.state.valid === true) {
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
    checkUsername = (suggestion) => {
        axios.get(`${Config.ngrok_url}/check/username/taken`, {
            params: {
                username: this.state.selected.toLowerCase()
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
    handleContinuation = () => {
        const { selected } = this.state;

        this.props.addSignupData({
            ...this.props.signupData,
            username: selected
        });

        setTimeout(() => {
            if (this.props.emailOrNot === true) {
                this.props.props.navigation.navigate("account-type");
            } else {
                this.props.props.navigation.navigate("create-email-signup");
            }
        }, 1000);
    }
    renderConditional = () => {
        if (this.state.ready === true) {
            return false;
        } else {
            return true;
        }
    }
    render() {
        const { suggestions, message } = this.state;
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
                    <Title style={styles.goldText}>Username</Title>
                    <Subtitle style={styles.goldText}>Choose your username</Subtitle>
                </Body>
                    <Right />
                </Header>
                <View style={styles.container}>
                    <View style={styles.margin}>
                        <Text style={styles.header}>Choose a username</Text>
                        <View style={{ marginTop: 10 }} />
                        <Text style={styles.greyedText}>Please note that a username cannot be changed once chosen.</Text>
                        <View style={{ marginTop: 10 }} />
                        <Item success={this.calculateSuccess()} error={this.calculateError()} style={{ backgroundColor: "white", flexDirection: 'row-reverse' }} regular>
                        <View 
                            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginRight: 15 }}
                            >
                            <Input value={this.state.selected} onChangeText={(value) => {
                                this.setState({
                                    selected: value
                                }, () => {
                                    this.checkUsername(value);
                                })
                            }} placeholder='Select your username' />
                            {this.calculateSuccess() ? <Icon name="checkmark" /> : null}
                        </View>
                        </Item>
                        {message !== null && message === "Username is available!" ? <Text style={styles.greenText}>{message}</Text> : <Text style={styles.redText}>{message}</Text>}
                        <Text style={styles.suggestionText}>Suggestions:</Text>
                        <View style={{ flexDirection: "row", maxWidth: width, flexWrap: "wrap", marginTop: 10 }}>
                            {typeof suggestions !== "undefined" && suggestions.length > 0 ? suggestions.map((suggestion, index) => {
                                if (index === 0) {
                                    return (
                                        <Fragment key={index}>
                                            <Button onPress={() => {

                                                this.setState({
                                                    selected: suggestion
                                                }, () => {
                                                    this.checkUsername(suggestion);
                                                })
                                            }} style={{ padding: 10, margin: 5, backgroundColor: "#d6f5ff" }} bordered>
                                                <Text style={{ color: "#007aff" }}>{suggestion}</Text>
                                            </Button>
                                        </Fragment>
                                    );
                                } else {
                                    return (
                                        <Fragment key={index}>
                                            <Button onPress={() => {

                                                this.setState({
                                                    selected: suggestion
                                                }, () => {
                                                    this.checkUsername(suggestion);
                                                })
                                            }} style={{ padding: 10, margin: 5 }} bordered>
                                                <Text style={{ color: "#007aff" }}>{suggestion}</Text>
                                            </Button>
                                        </Fragment>
                                    );
                                }
                            }) : null}
                        </View>
                    </View>
                    <View style={styles.bottomContainer}>
                        <View style={{ margin: 10 }}>
                           {this.renderConditional() ? <AwesomeButtonCartman type={"disabled"} stretch={true}>Next</AwesomeButtonCartman>:  <AwesomeButtonCartman type={"anchor"} textColor={"white"} onPress={this.handleContinuation} stretch={true}>Next</AwesomeButtonCartman>}
                        </View>
                    </View>
                </View>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        signupData: state.signupData.data,
        emailOrNot: state.signupData.data.email
    }
}
export default connect(mapStateToProps, { addSignupData })(ChooseUsernameHelper);