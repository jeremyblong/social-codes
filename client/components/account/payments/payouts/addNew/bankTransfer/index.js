import React, { Component, Fragment } from 'react';
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Header, Left, Body, Right, Title, Subtitle, Button, Text as NativeText } from 'native-base';
import styles from './styles.js';
import AwesomeButtonCartman from 'react-native-really-awesome-button/src/themes/cartman';


class BankTransferBeginHelper extends Component {
constructor(props) {
    super(props);

    this.state = {

    }
}
    render() {
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
                        <Title style={styles.goldText}>New Payout</Title>
                        <Subtitle style={styles.goldText}>Add a new payout method</Subtitle>
                    </Body>
                    <Right />
                </Header>
                <View style={styles.container}>
                    <View style={styles.margin}>
                        <Text style={styles.mainHeaderText}>Bank Transfer</Text>
                        <View style={styles.hr} />
                        <Text style={styles.marginBottomText}>Get paid in 5-7 business days</Text>
                        <View style={{ marginTop: 10 }} />
                        <Text style={styles.marginBottomText}>Mechanic2Day relases payouts 24 hours after a completed listing</Text>
                        <View style={styles.hr} />
                        <Text style={{ fontSize: 18 }}>No fees</Text>
                        <View style={styles.hr} />
                    </View>
                    <View style={styles.bottom}>
                        <AwesomeButtonCartman style={{ marginTop: 10 }} textColor={"white"} type={"anchor"} onPress={() => {
                            this.props.props.navigation.push("add-bank-account-payout-information")
                        }} stretch={true}>Next/Continue</AwesomeButtonCartman>
                    </View>
                </View>
            </Fragment>
        )
    }
}
export default BankTransferBeginHelper;