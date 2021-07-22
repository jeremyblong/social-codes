import React, { Component, Fragment } from 'react';
import { View, Text, Image, TouchableOpacity, Platform } from "react-native";
import { Header, Left, Body, Right, Title, Subtitle, Button, Text as NativeText, Form, Item, Input, Label } from 'native-base';
import styles from './styles.js';
import AwesomeButtonCartman from 'react-native-really-awesome-button/src/themes/cartman';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import axios from "axios";
import { Config } from "react-native-config";
import { connect } from "react-redux";

class BankAccountInfoHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        bankAccountType: "",
        accountHolder: "",
        routingNumber: "",
        accountNumber: "",
        confirmAccountNumber: "",
        finished: false
    }
}
    calculateReadiness = () => {
        const { bankAccountType, accountHolder, routingNumber, accountNumber, confirmAccountNumber } = this.state;
        if ((typeof bankAccountType !== "undefined" && bankAccountType.length > 0) && (typeof accountHolder !== "undefined" && accountHolder.length > 0) && (typeof routingNumber !== "undefined" && routingNumber.length > 0) && (typeof accountNumber !== "undefined" && accountNumber.length > 0) && (typeof confirmAccountNumber !== "undefined" && confirmAccountNumber.length > 0) && confirmAccountNumber === accountNumber) {
            return true;
        } else {
            return false;
        }
    }
    processNewBankAccountAddittion = () => {
        const { bankAccountType, accountHolder, routingNumber, accountNumber } = this.state;
        
        axios.post(`${Config.ngrok_url}/create/new/payout/bank/account/information`, {
            id: this.props.unique_id,
            bankAccountType, 
            accountHolder, 
            routingNumber, 
            accountNumber
        }).then((res) => {
            if (res.data.message === "Successfully added new bank account!") {
                console.log(res.data);

                setTimeout(() => {
                    this.props.props.navigation.replace("payouts-main-homepage");
                }, 1000);
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    render() {
        const { routingNumber, finished } = this.state;
        console.log("bankInfo state", this.state);
        return (
            <Fragment>
                <Header style={{ backgroundColor: "#303030" }}>
                    <Left>
                        <Button transparent onPress={() => {
                            this.props.props.navigation.goBack();
                        }}>
                            <Image source={require("../../../../../../assets/icons/go-back.png")} style={styles.headerIcon} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={styles.goldText}>Account Info</Title>
                        <Subtitle style={styles.goldText}>Add account information</Subtitle>
                    </Body>
                    <Right />
                </Header>
                <KeyboardAwareScrollView enableOnAndroid={true} extraHeight={25} extraScrollHeight={25}>
                <View style={styles.container}>
                    <View style={styles.margin}>
                        <Text style={styles.mainHeaderText}>Add account info</Text>
                        <View style={styles.hr} />
                        <Form>
                            <Item style={styles.item} floatingLabel>
                            <Label>Account Type (Checking/Savings)</Label>
                            <Input value={this.state.bankAccountType} onChangeText={(value) => {
                                this.setState({
                                    bankAccountType: value
                                })
                            }} />
                            </Item>
                            <Item style={styles.item} floatingLabel>
                            <Label>Account Holder Full Name</Label>
                            <Input value={this.state.accountHolder} onChangeText={(value) => {
                                this.setState({
                                    accountHolder: value
                                })
                            }} />
                            </Item>
                            <Item style={styles.item} floatingLabel>
                            <Label>Routing Number</Label>
                            <Input keyboardType={"number-pad"} onEndEditing={() => {
                                this.setState({
                                    finished: true
                                })
                            }} value={this.state.routingNumber} onChangeText={(value) => {
                                this.setState({
                                    routingNumber: value
                                })
                            }} />
                            </Item>
                            {(finished === true && typeof routingNumber !== 'undefined' && (routingNumber.length > 9 || routingNumber.length < 9)) ? <Text style={{ margin: 10, color: "red", textAlign: "left" }}>Routing numbers MUST be 9 digits in length</Text> : null}
                            <Item style={styles.item} floatingLabel>
                            <Label>Account Number</Label>
                            <Input keyboardType={"number-pad"} value={this.state.accountNumber} onChangeText={(value) => {
                                this.setState({
                                    accountNumber: value
                                })
                            }} />
                            </Item>
                            <Item style={styles.item} floatingLabel>
                            <Label>Confirm Account Number</Label>
                            <Input keyboardType={"number-pad"} value={this.state.confirmAccountNumber} onChangeText={(value) => {
                                this.setState({
                                    confirmAccountNumber: value
                                })
                            }} />
                            </Item>
                        </Form>
                        
                    </View>
                    <View style={styles.bottom}>
                        {this.calculateReadiness() ? <AwesomeButtonCartman textColor={"white"} style={{ marginTop: 15 }} type={"anchor"} onPress={this.processNewBankAccountAddittion} stretch={true}>Next/Continue</AwesomeButtonCartman> : <AwesomeButtonCartman style={{ marginTop: 15 }} type={"disabled"} onPress={() => {}} stretch={true}>Next/Continue</AwesomeButtonCartman>}
                    </View>
                </View>
                </KeyboardAwareScrollView>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.signupData.authData.unique_id,
        fullName: `${state.signupData.authData.firstName} ${state.signupData.authData.lastName}`
    }
}
export default connect(mapStateToProps, { })(BankAccountInfoHelper);