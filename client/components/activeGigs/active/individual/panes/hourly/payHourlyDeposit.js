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
import { paymentCompletedCustomHourly, paymentCompletedMinimumHourly } from "../../../../../../actions/payments/index.js";

const { width, height } = Dimensions.get("window"); 

const PayHourlyDepositPaneHelper = ({ sheetRefHourly, rate, unique_id, job, withID, paymentCompletedCustomHourly, paymentCompletedMinimumHourly }) => {
    console.log("passed job --- ", job);
    const [ customPayment, setCustomPayment ] = useState("");
    const [ typed, setTyped ] = useState(false);
    const [ customPaymentBoolean, setCustomPaymentBoolean ] = useState(false);
    const [ hourlyFixed, setHourlyModal ] = useState(false);
    const [ customHourlyPaymentModal, setCustomPaymentModal ] = useState(false);

    const makeCustomPayment = () => {
        console.log("makeCustomPayment clicked...");

        axios.post(`${Config.ngrok_url}/make/custom/hourly/payment`, {
            rate: Number(customPayment).toFixed(0),
            id: unique_id,
            date: job.date,
            jobID: job.jobID,
            otherUserID: withID
        }).then((res) => {
            if (res.data.message === "Made a custom payment for an hourly agreement!") {
                console.log(res.data);

                paymentCompletedCustomHourly({
                    completed: true,
                    jobID: job.jobID
                });

                sheetRefHourly.current.close();
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const makeSetPayment = () => {
        console.log("makeSetPayment clicked");

        axios.post(`${Config.ngrok_url}/make/set/payment/hourly/min`, {
            rate: Math.round(Number(rate) * 5).toFixed(0),
            id: unique_id,
            date: job.date,
            jobID: job.jobID,
            otherUserID: withID
        }).then((res) => {
            if (res.data.message === "Made payment multiple!") {
                console.log(res.data);

                setHourlyModal(false);

                paymentCompletedMinimumHourly({
                    completed: true,
                    jobID: job.jobID
                })

                sheetRefHourly.current.close();
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <RBSheet
            ref={sheetRefHourly} 
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
                    <Dialog.Container visible={hourlyFixed}>
                    <Dialog.Title>Are you sure you'd like to make this payment?</Dialog.Title>
                    <Dialog.Description>
                        You are about to be charged ${Number(Math.round(Number(rate) * 5)).toFixed(2)} in order to pay your freelancer(s)... You can't undo this action.
                    </Dialog.Description>
                    <Dialog.Button onPress={() => {
                        setHourlyModal(false);
                    }} label="Cancel" />
                    <Dialog.Button onPress={() => {
                        setCustomPaymentBoolean(false);
                        setCustomPayment("");
                        setTyped(false);

                        makeSetPayment();
                    }} label="Pay Freelancer" />
                    </Dialog.Container>
                </View>
                <View>
                    <Dialog.Container visible={customHourlyPaymentModal}>
                    <Dialog.Title>Are you sure you'd like to make this payment?</Dialog.Title>
                    <Dialog.Description>
                        You are about to be charged ${Number(customPayment).toFixed(2)} in order to pay your freelancer(s)... You can't undo this action.
                    </Dialog.Description>
                    <Dialog.Button onPress={() => {
                        setCustomPaymentModal(false);
                    }} label="Cancel" />
                    <Dialog.Button onPress={() => {
                        makeCustomPayment();
                    }} label="Pay Freelancer" />
                    </Dialog.Container>
                </View>
                <ScrollView contentContainerStyle={{ paddingBottom: 50 }} style={styles.container}>
                    <Header style={styles.header}>
                        <Left>
                            <Button onPress={() => {
                                sheetRefHourly.current.close();
                            }} transparent>
                                <Icon style={{ color: "black" }} name='arrow-back' />
                            </Button>
                        </Left>
                        <Body>
                            <Title style={styles.blackText}>Make a payment</Title>
                            <Subtitle style={styles.blackText}>Deposit 5 Hours of payment</Subtitle>
                        </Body>
                    </Header>
                    <View style={styles.subContainer}>
                        <Text style={styles.headerText}>Please make a payment of at least 5 Hours of payment before the client can get started working on your project... Make a payment of <Text style={{ color: "darkred", fontWeight: "bold" }}>${Math.round(Number(rate) * 5).toFixed(2)}</Text> clocked at ${rate.toFixed(2)} per hour</Text>
                        <View style={styles.blackHr} />
                        <AwesomeButtonCartman type={"anchor"} textColor={"white"} onPress={() => {
                            setHourlyModal(true);
                        }} stretch={true}>Make a payment</AwesomeButtonCartman>
                        <View style={styles.blackHr} />
                        <Form>
                        <Item stackedLabel>
                            <Label>Custom Payment Amount ($)</Label>
                            <Input keyboardType={"number-pad"} value={customPayment} onChangeText={(value) => {
                                setCustomPayment(value);
                                setTyped(true);
                                setCustomPaymentBoolean(true);
                            }} placeholderTextColor={"darkred"} placeholder={"Enter a custom payment amount"} />
                        </Item>
                    </Form>
                    {Number(customPayment) >= Number(rate * 5) || typed === false ? null : <Text style={{ color: "blue", marginBottom: 20, marginTop: 15 }}>Please enter a value LARGER than the minimum deposit amount of ${Math.round(Number(rate) * 5).toFixed(2)}</Text>}
                    <View style={styles.blackHr} />
                    {customPaymentBoolean === false || Number(customPayment) < Number(rate * 5) ? <AwesomeButtonCartman type={"disabled"} textColor={"black"} stretch={true}>Make *custom* payment</AwesomeButtonCartman> : <AwesomeButtonCartman type={"anchor"} textColor={"white"} onPress={() => {
                        setCustomPaymentModal(true);
                    }} stretch={true}>Make *custom* payment</AwesomeButtonCartman>}
                    </View>
                </ScrollView>
        </RBSheet>
    );
};
const mapStateToProps = (state) => {
    return {
        unique_id: state.signupData.authData.unique_id
    }
}
export default connect(mapStateToProps, { paymentCompletedCustomHourly, paymentCompletedMinimumHourly })(PayHourlyDepositPaneHelper);
