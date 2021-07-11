import React, { Fragment, useEffect } from 'react';
import styles from './styles.js';
import { View, Text, Image } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import { Header, Left, Body, Right, Title, Subtitle, Button, Text as NativeText } from 'native-base';
import LottieView from 'lottie-react-native';
import AwesomeButtonCartman from 'react-native-really-awesome-button/src/themes/cartman';


const ConfirmationPageHelper = (props) => {
    useEffect(() => {
        
    }, [])
    return (
        <Fragment>
            <Header style={{ backgroundColor: "#303030" }}>
                <Left>
                    <Button onPress={() => {
                        props.props.navigation.goBack();
                    }} transparent>
                        <Image source={require("../../../../assets/icons/go-back.png")} style={styles.headerIcon} />
                    </Button>
                </Left>
                <Body>
                    <Title style={styles.goldText}>Confirmed Appt</Title>
                    <Subtitle style={styles.goldText}>Video Appt. Confirmed</Subtitle>
                </Body>
                <Right />
            </Header>
            <ConfettiCannon fadeOut={true} autoStart={true} count={350} origin={{ x: -10, y: 0 }} />
            <View style={styles.container}>
                
                <View style={styles.absolute}>
                    <LottieView style={styles.animation} source={require("../../../../assets/animations/check.json")} autoPlay loop />
                </View>
                <View style={styles.centered}>
                    <Text style={styles.largeText}>We have notified the other user about the interview you just set up. Once both users join the meeting, it will start. Please be on time and considerate of eachother</Text>
                </View>
            </View>
            <View style={styles.bottom}>
                <AwesomeButtonCartman type={"anchor"} textColor={"white"} onPress={() => {
                    props.props.navigation.replace("homepage");
                }} stretch={true}>Return to menu</AwesomeButtonCartman>
            </View>
        </Fragment>
    );
}
export default ConfirmationPageHelper;