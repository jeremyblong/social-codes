import React, { Component, Fragment } from 'react'
import { View, Text, Image } from "react-native";
import { Header, Left, Body, Right, Button, Icon, Title, Subtitle } from 'native-base';
import styles from "./styles.js";
import { WebView } from 'react-native-webview';


class PrivacyPolicyHelper extends Component {
    render() {
        return (
            <Fragment>
                <Header style={{ backgroundColor: "#303030" }}>
                    <Left>
                        <Button onPress={() => {
                            this.props.props.navigation.goBack();
                        }} transparent>
                            <Icon style={{ color: "#ffffff" }} name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={styles.whiteText}>Conditions</Title>
                        <Subtitle style={styles.whiteText}>Terms & Conditions</Subtitle>
                    </Body>
                    <Right>
                        {/* <Button transparent>
                            <Icon style={{ color: "#ffffff" }} name='heart' />
                        </Button> */}
                    </Right>
                </Header>
                <View style={styles.container}>
                    <WebView style={styles.webview} source={{ uri: "https://www.iubenda.com/privacy-policy/31154960" }} />
                </View>
            </Fragment>
        )
    }
}

export default PrivacyPolicyHelper;