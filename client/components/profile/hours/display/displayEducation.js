import React, { Component, Fragment } from 'react'
import { Header, Left, Body, Right, Button, Icon, Title, Subtitle, Item, Input, Card, CardItem, Text as NativeText } from 'native-base';
import { View, Text, Image, ScrollView, Dimensions } from 'react-native';
import styles from './styles.js';
import Config from 'react-native-config';
import axios from 'axios';
import { connect } from 'react-redux';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import AwesomeButtonCartman from 'react-native-really-awesome-button/src/themes/cartman';
import Dialog from "react-native-dialog";
import Toast from 'react-native-toast-message';


const { height, width } = Dimensions.get("window");



class DisplayEducationListHelper extends Component {
constructor (props) {
    super(props);

    this.state = {
        schoolingHistory: [],
        ready: false,
        isVisible: false,
        selected: null
    }
}
    componentDidMount() {
        axios.get(`${Config.ngrok_url}/gather/employment/history`, {
            params: {
                id: this.props.props.route.params.unique_id
            }
        }).then((res) => {
            if (res.data.message === "Gathered history!") {

                const { schoolingHistory } = res.data;

                this.setState({
                    schoolingHistory,
                    ready: true
                })
                console.log(res.data);
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    renderLoading = () => {
        const { schoolingHistory, ready } = this.state;

        if (ready === true && typeof schoolingHistory !== "undefined" && schoolingHistory.length === 0) {
            return (
                <Fragment>
                    <View style={styles.background}>
                        <View style={{ marginTop: 45 }} />
                        <Image source={require("../../../../assets/images/5.png")} resizeMode={"contain"} style={styles.myImage} />
                        <View style={{ marginTop: 20 }} />
                        <Text style={styles.headText}>Oops, We couldn't locate any uploaded schools for your profile, would you like to update your schooling history?</Text>
                        <View style={{ marginTop: 30 }} />
                    </View>
                </Fragment>
            ); 
        } else {
            return (
                <Fragment>
                    <SkeletonPlaceholder>
                        <View style={styles.header}>
                        
                        </View>
                        <View style={{ marginTop: 15 }} />
                        <View style={styles.main}>
                            <View style={styles.skelatonSub}></View>
                        </View>
                        <View style={{ marginTop: 15 }} />
                        <View style={[styles.row , { margin: 10 }]}>
                            <View style={{ width: width * 0.425, minWidth: width * 0.425, height: 125, margin: 10 }}>
                                
                            </View>
                            <View style={{ width: width * 0.425, minWidth: width * 0.425, height: 125, margin: 10  }}>
                                    
                            </View>
                        </View>
                        <View style={[styles.row , { margin: 10 }]}>
                            <View style={{ width: width * 0.425, minWidth: width * 0.425, height: 125, margin: 10 }}>
                                
                            </View>
                            <View style={{ width: width * 0.425, minWidth: width * 0.425, height: 125, margin: 10  }}>
                                    
                            </View>
                        </View>
                        <View style={{ marginTop: 15 }} />
                        <View style={styles.main}>
                            <View style={styles.skelatonSub}></View>
                        </View>
                        <View style={{ marginTop: 15 }} />
                        <View style={styles.main}>
                            <View style={styles.skelatonSub}></View>
                        </View>
                    </SkeletonPlaceholder>
                </Fragment>
            ); 
        }
    }
    deleteEducationHistory = () => {
        console.log("deleteEducationHistory clicked...");

        const { selected } = this.state;

        axios.put(`${Config.ngrok_url}/delete/employment/history/record`, {
            id: this.props.props.route.params.unique_id,
            selected
        }).then((res) => {
            if (res.data.message === "Deleted education record!") {
                console.log(res.data);

                const { history } = res.data;

                this.setState({
                    schoolingHistory: history
                }, () => {
                    Toast.show({
                        text1: 'Successfully deleted schooling record!',
                        text2: 'Successfully removed this schooling record from your list of attended schools...',
                        position: "top",
                        visibilityTime: 4500,
                        type: "success"
                    });
                })
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    render() {
        const { schoolingHistory } = this.state;

        console.log(this.props.props.route.params.unique_id);
        return (
            <Fragment>
                <Header>
                    <Left>
                        <Button onPress={() => {
                            this.props.props.navigation.goBack();
                        }} transparent>
                            <Image source={require("../../../../assets/icons/go-back.png")} style={styles.headerIcon} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Schooling History</Title>
                        <Subtitle>Education history & more...</Subtitle>
                    </Body>
                    <Right />
                </Header>
                <Toast ref={(ref) => Toast.setRef(ref)} />
                <View>
                    <Dialog.Container visible={this.state.isVisible}>
                    <Dialog.Title>Delete Education Record</Dialog.Title>
                    <Dialog.Description>
                        Are you sure you'd like to delete this record? You cannot undo this action.
                    </Dialog.Description>
                    <Dialog.Button onPress={() => {
                        this.setState({
                            isVisible: false
                        })
                    }} label="Cancel" />
                    <Dialog.Button onPress={() => {
                        this.setState({
                            isVisible: false
                        }, () => {
                            this.deleteEducationHistory();
                        })
                    }} label="Delete" />
                    </Dialog.Container>
                </View>
                <ScrollView contentContainerStyle={{ paddingBottom: 50 }} style={styles.container}>
                    {typeof schoolingHistory !== 'undefined' && schoolingHistory.length > 0 ? schoolingHistory.map((school, index) => {
                        return (
                            <Fragment>
                                <Card>
                                    <CardItem header bordered>
                                        <NativeText style={{ color: "blue" }}><Text style={{ fontWeight: "bold", color: "black" }}>School Name:</Text> {school.schoolName.poi.name}</NativeText>
                                    </CardItem>
                                    <CardItem bordered>
                                    <Body>
                                        <NativeText>
                                            <Text style={{ fontWeight: "bold" }}>Area of study:</Text> {school.areaOfStudy !== null ? school.areaOfStudy : "None Provided."}{"\n"}{"\n"}<Text style={{ fontWeight: "bold" }}>Start Date:</Text> {school.startDate !== null ? school.startDate : "None Provided."}{"\n"}{"\n"}<Text style={{ fontWeight: "bold" }}>End Date:</Text> {school.endDate !== null ? school.endDate : "None Provided."}{"\n"}{"\n"}
                                        </NativeText>
                                        <View style={styles.hr} />
                                        <NativeText>
                                            <Text style={{ fontWeight: "bold" }}>Description:</Text> {school.description !== null ? school.description : "None Provided."}
                                        </NativeText>
                                    </Body>
                                    </CardItem>
                                    <CardItem footer bordered>
                                        <NativeText style={{ color: "blue" }}><Text style={{ fontWeight: "bold", color: "black" }}>Degree Recieved or Expected:</Text> {school.degree !== null ? school.degree : "None Provided."}</NativeText>
                                    </CardItem>
                                    {this.props.unique_id === school.poster ? <CardItem>
                                        <AwesomeButtonCartman type={"anchor"} onPress={() => {
                                            this.setState({
                                                selected: school,
                                                isVisible: true
                                            })
                                        }} stretch={true} backgroundColor={"darkred"} textColor={"white"}>Delete Record</AwesomeButtonCartman>
                                    </CardItem> : null}
                                </Card>
                                <View style={styles.thickHr} />
                            </Fragment>
                        );
                    }) : this.renderLoading()}
                </ScrollView>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.signupData.authData.unique_id
    }
}
export default connect(mapStateToProps, { })(DisplayEducationListHelper);