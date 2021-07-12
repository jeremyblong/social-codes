import React, { useState, Fragment } from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Dimensions, Image, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Header, Left, Body, Button, Icon, Title, Subtitle, Form, Item, Label, Input } from 'native-base';
import styles from './styles.js';
import AwesomeButtonCartman from 'react-native-really-awesome-button/src/themes/cartman';
import { Switch } from 'react-native-switch';
import { connect } from 'react-redux';
import Config from "react-native-config";
import axios from "axios";
import Dialog from "react-native-dialog";

const { width, height } = Dimensions.get("window"); 

const SlideUpPaymentHelper = ({ sheetRef, rate, unique_id, job, withID }) => {
    const [ customPayment, setCustomPayment ] = useState(null);
    const [ switched, setSwitched ] = useState(false);
    const [ presetPayment, setPresetPayment ] = useState(0); 
    const [ visbility, setVisiblityModal ] = useState(false);

    const handleQuickPayment = (amount) => {
        console.log("amount", amount);

        setPresetPayment(amount);

        setVisiblityModal(true);

        axios.post(`${Config.ngrok_url}/make/quick/payment/partial`, {
            rate: amount,
            id: unique_id,
            date: job.date,
            jobID: job.jobID,
            otherUserID: withID
        }).then((res) => {
            if (res.data.message === "Made PARTIAL QUICK payment!") {
                console.log(res.data);

                sheetRef.current.close();
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const makeCompletePayment = () => {
        console.log("make complete payment...");

        console.log(job);
        
        axios.post(`${Config.ngrok_url}/make/full/payment/entire`, {
            rate,
            id: unique_id,
            date: job.date,
            jobID: job.jobID,
            otherUserID: withID
        }).then((res) => {
            if (res.data.message === "Made COMPLETE payment!") {
                console.log(res.data);

                setSwitched(false);

                sheetRef.current.close();
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    console.log("passed job --- ", job);
    return (
        <RBSheet
            ref={sheetRef} 
            closeOnDragDown={true}
            height={height * 0.90}
            openDuration={250}
            customStyles={{
                container: {
                    borderTopLeftRadius: 40,
                    borderTopRightRadius: 40
                },
                draggableIcon: {
                    backgroundColor: "grey",
                    width: 250
                }
            }}
            > 
            <View>
                <Dialog.Container visible={visbility}>
                <Dialog.Title>Are you sure you'd like to make this payment?</Dialog.Title>
                <Dialog.Description>
                    You are about to be charged ${presetPayment.toFixed(2)} in order to pay your freelancer(s)... You can't undo this action.
                </Dialog.Description>
                <Dialog.Button onPress={() => {
                    setVisiblityModal(false);
                }} label="Cancel" />
                <Dialog.Button onPress={() => {
                    setVisiblityModal(false);
                }} label="Pay Freelancer" />
                </Dialog.Container>
            </View>
            <View style={styles.container}>
                <Header style={styles.header}>
                    <Left>
                        <Button onPress={() => {
                            sheetRef.current.close();
                        }} transparent>
                            <Icon style={{ color: "black" }} name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={styles.blackText}>Make a payment</Title>
                        <Subtitle style={styles.blackText}>Partial & Custom payments</Subtitle>
                    </Body>
                </Header>
                <View style={styles.subContainer}>
                    <Text style={styles.headerText}>Make a custom payment and/or a one time payment OR pay the entire job depending on how much work your freelancer(s) have completed...</Text>
                    <Form>
                        <Item stackedLabel>
                            <Label>Custom Payment Amount ($)</Label>
                            <Input keyboardType={"number-pad"} value={customPayment} onChange={(value) => {
                                setCustomPayment(value);
                                setSwitched(false);
                            }} placeholderTextColor={"darkred"} placeholder={"Enter a custom payment amount"} />
                        </Item>
                    </Form>
                    {customPayment !== null ? <AwesomeButtonCartman style={{ marginTop: 15 }} type={"anchor"} stretch={true} textColor={"white"}>Submit Payment</AwesomeButtonCartman> : <AwesomeButtonCartman style={{ marginTop: 15 }} type={"disabled"} stretch={true} textColor={"white"}>Submit Payment</AwesomeButtonCartman>}
                    <ScrollView style={{ maxHeight: 85 }} contentContainerStyle={{ paddingBottom: 50 }} horizontal={true} showsHorizontalScrollIndicator={false}>
                        <TouchableOpacity onPress={() => {
                            handleQuickPayment(50);
                        }} style={styles.boxed}>
                            <Text style={styles.whiteText}>Make a quick payment of <Text style={styles.goldText}>$50</Text></Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            handleQuickPayment(200);
                        }} style={styles.boxed}>
                            <Text style={styles.whiteText}>Make a quick payment of <Text style={styles.goldText}>$200</Text></Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            handleQuickPayment(450);
                        }} style={styles.boxed}>
                            <Text style={styles.whiteText}>Make a quick payment of <Text style={styles.goldText}>$450</Text></Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            handleQuickPayment(600);
                        }} style={styles.boxed}>
                            <Text style={styles.whiteText}>Make a quick payment of <Text style={styles.goldText}>$600</Text></Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            handleQuickPayment(750);
                        }} style={styles.boxed}>
                            <Text style={styles.whiteText}>Make a quick payment of <Text style={styles.goldText}>$750</Text></Text>
                        </TouchableOpacity>
                    </ScrollView>
                    <View style={styles.centered}>
                        <Switch
                            value={switched}
                            onValueChange={(val) => {
                                setSwitched(val);
                                setCustomPayment(null);
                            }}
                            activeText={'On'}
                            inActiveText={'Off'}
                            circleSize={30}
                            barHeight={25}
                            circleBorderWidth={3}
                            backgroundActive={'green'}
                            backgroundInactive={'gray'}
                            circleActiveColor={'darkgreen'}
                            circleInActiveColor={'#000000'}
                            changeValueImmediately={true}
                        />
                        <Text style={styles.switchedText}>Pay entire project {"\n"}cost of ${rate}</Text>
                    </View>
                    {switched === true ? <AwesomeButtonCartman style={{ marginTop: 15 }} onPress={makeCompletePayment} type={"anchor"} stretch={true} textColor={"white"}>Submit FULL Payment</AwesomeButtonCartman> : <AwesomeButtonCartman style={{ marginTop: 15 }} type={"disabled"} stretch={true} textColor={"white"}>Submit FULL Payment</AwesomeButtonCartman>}
                </View>
            </View>
        </RBSheet>
    );
};
const mapStateToProps = (state) => {
    return {
        unique_id: state.signupData.authData.unique_id
    }
}
export default connect(mapStateToProps, { })(SlideUpPaymentHelper);