import React, { Fragment, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Header, Left, Body, Right, Button, Title, Text as NativeText, ListItem, List } from 'native-base';
import styles from './styles.js';
import axios from "axios";
import { connect } from "react-redux";
import { Config } from "react-native-config";

const PaymentMainPageHelper =  (props) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        axios.get(`${Config.ngrok_url}/gather/user`, {
            params: {
                id: props.unique_id
            }
        }).then((res) => {
            if (res.data.message === "Located the desired user!") {
                console.log("RES.data:", res.data);

                const { user } = res.data;

                setUser(user);
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }, [])
    return (
        <Fragment>
            <View style={styles.container}>
                <Header style={{ backgroundColor: "#303030" }}>
                    <Left>
                        <Button onPress={() => {
                            props.props.navigation.push("navigation-menu-main");
                        }} transparent>
                            <Image source={require("../../../assets/icons/go-back.png")} style={[styles.headerIcon, {  tintColor: "#ffffff" }]} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ paddingTop: 5, color: "#ffffff" }}>Payments & Payouts</Title>
                    </Body>
                    <Right />
                </Header>
                <List>
                    {user !== null && user.accountType === "hire" ? <ListItem button={true} onPress={() => {
                        props.props.navigation.push("payments-cards");
                    }} style={styles.listItem}>
                        <Left>
                            <NativeText>Payment Methods</NativeText>
                        </Left>
                        <Right>
                            <Image source={require("../../../assets/icons/payment-methods.png")} style={styles.icon} />
                        </Right>
                    </ListItem> : null}
                    {user !== null && user.accountType === "work" ? <ListItem button={true} onPress={() => {
                        props.props.navigation.push("payouts-main-homepage");
                    }}style={styles.listItem}>
                        <Left>
                            <NativeText>Payout Preferences</NativeText>
                        </Left>
                        <Right>
                            <Image source={require("../../../assets/icons/request.png")} style={styles.icon} />
                        </Right>
                    </ListItem> : null}
                    <ListItem button={true} onPress={() => {
                        props.props.navigation.push("payout-analytics-data");
                    }}style={styles.listItem}>
                        <Left>
                            <NativeText>Payout Analytics & More</NativeText>
                        </Left>
                        <Right>
                            <Image source={require("../../../assets/icons/analytics.png")} style={styles.icon} />
                        </Right>
                    </ListItem>
                    <ListItem button={true} onPress={() => {
                        props.props.navigation.navigate("credits-coupons");
                    }} style={styles.listItem}>
                        <Left>
                            <NativeText>Credits & Coupons</NativeText>
                        </Left>
                        <Right>
                            <Image source={require("../../../assets/icons/payout.png")} style={styles.icon} />
                        </Right>
                    </ListItem>
                    <ListItem style={styles.lastListItem}>
                        <Left>
                            <NativeText>Currency</NativeText>
                        </Left>
                        <Right>
                            <NativeText style={{ color: "darkblue" }}>USD-$</NativeText>
                        </Right>
                    </ListItem>
                </List>
            </View>
        </Fragment>
    );
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.signupData.authData.unique_id
    };
}
export default connect(mapStateToProps, {  })(PaymentMainPageHelper);