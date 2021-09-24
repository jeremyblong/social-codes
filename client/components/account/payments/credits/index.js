import React, { Component, Fragment } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Header, Left, Button, Title, Text as NativeText, ListItem, List, Body, Right, Item, Input, Label } from 'native-base';
import styles from './styles.js';
import Config from "react-native-config";
import { showMessage, hideMessage } from "react-native-flash-message";
import axios from "axios";
import LottieView from 'lottie-react-native';
import { connect } from "react-redux"; 
import Toast from 'react-native-toast-message';

class CreditsHomepageHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        couponCode: ""
    }
}
    handleCouponSubmission = () => {
        console.log("handleCouponSubmission clicked");

        const { couponCode } = this.state;

        const code = couponCode.toLowerCase();
        const availableCodes = Config.coupon_codes.split(", ");

        if (availableCodes.includes(couponCode.toLowerCase())) {
            console.log("includes!");

            axios.post(`${Config.ngrok_url}/update/account/with/coupon/code`, {
                id: this.props.unique_id
            }).then((res) => {
                if (res.data.message === "Successfully applied coupon, You will now receive 100% of all proceeds earned...!") {
                    console.log(res.data);

                    this.setState({
                        couponCode: ""
                    }, () => {
                        Toast.show({
                            type: "success",
                            text1: res.data.message,
                            text2: "We've applied your promo code!",
                            visibilityTime: 4500,
                            position: "top"
                        });
                    })
                } else {
                    console.log("err", res.data);

                    showMessage({
                        message: "You have already entered a coupon code or we experienced a system error.",
                        description: res.data.message,
                        type: "danger",
                        duration: 3250
                    });
                }
            }).catch((err) => {
                console.log(err);
            })
        } else {
            console.log("Doesn't include...");

            showMessage({
                message: "This coupon code is invalid or has expired.",
                description: "Please try using a VALID code or check your spelling on the code you just entered!",
                type: "danger",
                duration: 3250
            });
        }
    }
    render() {
        return (
           <Fragment>
                <View style={styles.container}>
                    <Header style={{ backgroundColor: "#303030" }}>
                        <Left>
                            <Button onPress={() => {
                                this.props.props.navigation.goBack();
                            }} transparent>
                                <Image source={require("../../../../assets/icons/go-back.png")} style={[styles.headerIcon, {  tintColor: "#ffffff" }]} />
                            </Button>
                        </Left>
                        <Body>
                            <Title style={{ paddingTop: 5, color: "#ffffff" }}>Credits & Coupons</Title>
                        </Body>
                        <Right />
                    </Header>
                    <Toast ref={(ref) => Toast.setRef(ref)} />
                    <View style={styles.centered}>
                        <View style={styles.middle}>
                            <Item stackedLabel last>
                                <Label>Enter Coupon Code</Label>
                                <Input placeholderTextColor={"grey"} placeholder={"Enter your coupon code..."} onChangeText={(value) => {
                                    this.setState({
                                        couponCode: value
                                    })
                                }} value={this.state.couponCode} />
                            </Item>
                            <Button onPress={() => {
                                this.handleCouponSubmission();
                            }} style={styles.customBtn}>
                                <NativeText style={styles.nativeTextInner}>Submit Code</NativeText>
                                <Image source={require("../../../../assets/icons/submit.png")} style={styles.plus} />
                            </Button>
                            <List>
                                <ListItem onPress={() => {
                                    
                                }} button={true} style={styles.listItem}>
                                    <Left style={{ flexDirection: "row" }}>
                                        <NativeText style={{ marginLeft: 20, color: "darkblue" }}>Invite friends for more credit</NativeText>
                                    </Left>
                                </ListItem>
                            </List>
                            
                        </View>
                    </View>
                    <View style={styles.centeredCustom}>
                        <LottieView style={styles.customAnimation} source={require('../../../../assets/animations/reward.json')} autoPlay loop />
                    </View>
                </View>
           </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.signupData.authData.unique_id
    }
}
export default connect(mapStateToProps, { })(CreditsHomepageHelper);