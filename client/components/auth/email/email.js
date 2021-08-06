import React, { Component, Fragment } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles.js';
import { Header, Left, Body, Right, Title, Subtitle, Button, Item, Input, Icon } from 'native-base';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import { addSignupData } from "../../../actions/auth/signup.js";
import { connect } from "react-redux";
import axios from "axios";
import Config from "react-native-config";


class EmailCreationPageHelper extends Component {
constructor (props) {
    super(props);
    
    this.state = {
        email: "",
        valid: null,
        message: null
    }
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
    handleContinuation = () => {
        console.log("handleContinuation clicked...");
        
        const { email } = this.state;

        axios.post(`${Config.ngrok_url}/send/email/code/verifcation`, {
            email
        }).then((res) => {
            if (res.data.message === "Successfully sent email and code!") {
                console.log(res.data);

                this.props.addSignupData({
                    ...this.props.signupData,
                    emailAddress: email,
                    verifcationCode: res.data.generatedID
                })

                setTimeout(() => {
                    this.props.props.navigation.navigate("account-type");
                }, 1000)
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        });
    }
    calculateReadiness = () => {
        if (this.state.valid === true && this.state.message === "Email is avaliable!") {
            return false;
        } else {
            return true;
        }
    }
    checkEmailTaken = () => {
        console.log("checkEmailTaken");

        const { email } = this.state;

        axios.post(`${Config.ngrok_url}/check/email/taken`, {
            email
        }).then((res) => {
            if (res.data.message === "Email is avaliable!") {
                console.log(res.data);

                const { message } = res.data;

                this.setState({
                    message
                })
            } else {
                console.log("Err", res.data);

                const { message } = res.data;

                this.setState({
                    message
                })
            }
        }).catch((err) => {
            console.log(err);
        });
    }
    render() {
        const { message } = this.state;
        return (
           <Fragment>
               <Header style={{ backgroundColor: "#303030" }}>
                    <Left>
                        <Button onPress={() => {
                            this.props.props.navigation.goBack();
                        }} transparent>
                            <Image source={require("../../../assets/icons/go-back.png")} style={[styles.headerIcon, { tintColor: "#ffffff" }]} />
                        </Button>
                    </Left>
                <Body>
                    <Title style={styles.goldText}>Email Creation</Title>
                    <Subtitle style={styles.goldText}>Enter your email</Subtitle>
                </Body>
                    <Right />
                </Header>
                <View style={styles.container}>
                    <View style={styles.margin}>
                        <Text style={styles.header}>Enter your email address</Text>
                        <View style={{ marginTop: 10 }} />
                        <Text style={styles.greyText}>You may change this at a later date but changing will required verifcation</Text>
                        <View style={{ marginTop: 10 }} />
                        <Item success={this.calculateSuccess()} error={this.calculateError()} style={{ backgroundColor: "white", flexDirection: 'row-reverse' }} regular>
                        <View 
                            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginRight: 15 }}
                            >
                            <Input value={this.state.email} onChangeText={(value) => {
                                if (value.includes("@") && value.includes(".com")) {
                                    this.setState({
                                        email: value,
                                        valid: true
                                    }, () => {
                                        this.checkEmailTaken();
                                    })
                                } else {
                                    this.setState({
                                        email: value,
                                        valid: false
                                    })
                                }
                            }} placeholder='Enter your email' />
                            {this.calculateSuccess() ? <Icon name="checkmark" /> : <Icon name="close" />}
                        </View>
                        </Item>
                        {message !== null && message === "Email is avaliable!" ? <Text style={styles.greenText}>{message}</Text> : <Text style={styles.redText}>{message}</Text>}
                    </View>
                </View>
                <View style={styles.bottomContainer}>
                    <View style={{ margin: 10 }}>
                        {this.calculateReadiness() ? <AwesomeButtonBlue type={"disabled"} stretch={true}>Next</AwesomeButtonBlue> : <AwesomeButtonBlue borderColor={"#141414"} borderWidth={2} style={{ zIndex: -1 }} type={"primary"} backgroundColor={"#ffffff"} backgroundPlaceholder={"black"} backgroundProgress={"black"} textColor={"black"} shadowColor={"grey"} onPress={this.handleContinuation} stretch={true}>Next</AwesomeButtonBlue>}
                    </View>
                </View>
           </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        signupData: state.signupData.data
    }
}
export default connect(mapStateToProps, { addSignupData })(EmailCreationPageHelper);