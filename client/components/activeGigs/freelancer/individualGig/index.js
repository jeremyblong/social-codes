import React, { Component, Fragment } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { Header, Left, Body, Right, Title, Subtitle, Button, Text as NativeText } from 'native-base';
import styles from './styles.js';
import AwesomeButtonCartman from 'react-native-really-awesome-button/src/themes/cartman';
import SheetHelperPaymentsDisplayRef from "./sheets/payments/payments.js";
import moment from "moment";
import SubmitWorkRefPane from "./sheets/submittingWork/index.js";

class ViewJobActiveClientFreelancerHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        
    }
    this.paymentsRef = React.createRef(null);
    this.submitWorkRef = React.createRef(null);
}
    render() {
        // console.log(this.props.props.route.params.item);
        console.log("this.state freelancer index.js", this.state);
        
        const passedData = this.props.props.route.params.item;
        return (
            <Fragment>
                <Header style={{ backgroundColor: "#303030" }}>
                    <Left>
                        <Button onPress={() => {
                            this.props.props.navigation.goBack();
                        }} transparent>
                            <Image source={require("../../../../assets/icons/go-back.png")} style={styles.headerIcon} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={styles.goldText}>Manage</Title>
                        <Subtitle style={styles.goldText}>Manage your active gig</Subtitle>
                    </Body>
                    <Right />
                </Header>
                <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
                    <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>
                            Contract with {passedData.otherUserFirstName} {passedData.otherUserLastName}
                        </Text>
                    </View>

                    <View style={styles.postContent}>
                        <Text style={styles.postTitle}>
                            This is the place where you will be able to manage uploads, content trading, payments and much more...
                        </Text>
                        <View style={styles.greyHr} />
                        <Text style={styles.postDescription}>
                            Please use this page to upload completed work (zip files, code, images, etc...) and manage your job and much more... Click payments to see what payments the client has deposited prior to submitting any work. Make sure the client has deposited funds <Text style={{ textDecorationLine: "underline" }}>before</Text> so you know funds will be released upon both parties agreeing the work was completed or mediation from <Text style={{ color: "darkred", fontStyle: 'italic' }}>Social Codes</Text> but always try to work things out before contacting us.
                        </Text>

                        <Text style={styles.date}>
                            Project started {moment(passedData.systemDate).fromNow()}
                        </Text>
                        <View style={styles.greyHr} />
                        <View style={styles.boxed}>
                            <TouchableOpacity onPress={() => {
                                console.log("clicked");

                                this.submitWorkRef.current.open();
                            }} style={styles.row}>
                                <Image source={require("../../../../assets/icons/ana.png")} style={styles.icon} />
                                <Text style={styles.iconText}>Submit project files and more...</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.with}>With...</Text>
                        <View style={styles.profile}>
                            {passedData.type === "picture" ? <Image style={styles.avatar}
                            source={{uri: passedData.photo }}/> : null}

                            <Text style={styles.name}>
                                {passedData.otherUserFirstName} {passedData.otherUserLastName} {"\n"}aka {passedData.otherUserUsername}
                            </Text>
                        </View>
                        <SubmitWorkRefPane passedData={passedData} submitWorkRef={this.submitWorkRef} props={this.props} /> 
                        <SheetHelperPaymentsDisplayRef payments={passedData.payments} props={this.props} paymentsRef={this.paymentsRef} />
                        <AwesomeButtonCartman style={{ marginTop: 20 }} type={"anchor"} textColor={"white"} onPress={() => {
                            this.paymentsRef.current.open();
                        }} stretch={true}>View payments from client</AwesomeButtonCartman>
                    </View>
                    </View>
                </ScrollView>
            </Fragment>
        )
    }
}

export default ViewJobActiveClientFreelancerHelper
