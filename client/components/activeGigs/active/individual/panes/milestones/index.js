import React, { Component, Fragment, useState } from 'react'
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

const { width, height } = Dimensions.get('window');

const SlideUpPanePayMilestones = ({ sheetRefMilestone, rate, unique_id, job, withID }) => {
    console.log("RaTe!", rate);

    const [ modalVisible, setModalVisible ] = useState(false);

    const makeMilestonePayment = () => {
        console.log("makeMilestonePayment made/clicked...");

        axios.post(`${Config.ngrok_url}/make/milestone/payment/specific`, {
            rate: Math.round(rate).toFixed(0),
            id: unique_id,
            date: job.date,
            jobID: job.jobID,
            otherUserID: withID
        }).then((res) => {
            if (res.data.message === "Made milestone payment!") {
                console.log(res.data);

                setModalVisible(false);

                sheetRefMilestone.current.close();
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <Fragment>
            <RBSheet
                ref={sheetRefMilestone} 
                closeOnDragDown={true}
                height={height * 0.60}
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
                    <Dialog.Container visible={modalVisible}>
                    <Dialog.Title>Are you sure you'd like to make this payment?</Dialog.Title>
                    <Dialog.Description>
                        You are about to be charged ${Number(Math.round(rate)).toFixed(2)} in order to pay your freelancer(s)... You can't undo this action.
                    </Dialog.Description>
                    <Dialog.Button onPress={() => {
                        setModalVisible(false);
                    }} label="Cancel" />
                    <Dialog.Button onPress={() => {
                        makeMilestonePayment();
                    }} label={`Pay ${Number(Math.round(rate)).toFixed(2)}`} />
                    </Dialog.Container>
                </View>
                <Header style={styles.header}>
                    <Left>
                        <Button onPress={() => {
                            sheetRefMilestone.current.close();
                        }} transparent>
                            <Icon style={{ color: "black" }} name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={styles.blackText}>Make a payment</Title>
                        <Subtitle style={styles.blackText}>Get started & deposit...</Subtitle>
                    </Body>
                </Header>
                <View style={styles.container}>
                    <View style={styles.margin}>
                        <Text style={styles.headerText}>You will need to make a <Text style={{ fontWeight: "bold", color: "darkred", textDecorationLine: "underline" }}>payment of ${rate !== null ? rate.toFixed(2) : "loading..."}</Text> for the freelancer on this project to get started with this selected milestone</Text>
                        <View style={styles.blackHr} />
                        <AwesomeButtonCartman type={"anchor"} textColor={"white"} onPress={() => {
                            setModalVisible(true);
                        }} stretch={true}>Make milestone payment</AwesomeButtonCartman>
                    </View>
                </View>
            </RBSheet> 
        </Fragment>
    );
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.signupData.authData.unique_id
    }
}
export default connect(mapStateToProps, { })(SlideUpPanePayMilestones);
