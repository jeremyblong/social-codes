import React, { Component, Fragment } from 'react';
import { View, Text, Image } from 'react-native';
import { Header, Left, Body, Right, Button, Title, Subtitle } from 'native-base';
import styles from './styles.js';

class OnboardingHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        isVisible: false
    }
}
    render() {
        return (
            <Fragment>
                <Header style={{ backgroundColor: "#303030" }}>
                    <Left>
                        <Button onPress={() => {
                            this.props.props.navigation.goBack();
                        }} transparent>
                            <Image source={require("../../assets/icons/go-back.png")} style={[styles.headerIcon, { tintColor: "#ffffff" }]} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: "#ffffff" }}>Onboarding</Title>
                        <Subtitle style={{ color: "#ffffff" }}>Onboard your account</Subtitle>
                    </Body>
                    <Right>
                        <Button onPress={() => {
                            this.setState({
                                isVisible: true
                            })
                        }} transparent>
                            <Image source={require("../../assets/icons/help.png")} style={[styles.headerIconTwo, { tintColor: "#ffffff" }]} />
                        </Button>
                    </Right>
                </Header> 
            </Fragment>
        )
    }
}

export default OnboardingHelper
