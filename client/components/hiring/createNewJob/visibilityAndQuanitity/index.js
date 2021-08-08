import React, { Component, Fragment } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Header, Left, Body, Right, Title, Subtitle, Button, Item, Input, Icon, Picker, List, ListItem } from 'native-base';
import styles from './styles.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import { connect } from 'react-redux';
import { addJobData } from "../../../../actions/jobs/data.js";
import * as Progress from 'react-native-progress';

const { height, width } = Dimensions.get("window");

class VisibilityAndQuantityHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        selected: "",
        amountOfFreelancers: "",
        changed: false,
        numberOfFreelancers: 0,
        typeOfApplicant: "no-preference",
        amountEarned: 0,
        jobSuccessPicked: "any-job-success",
        multiple: false
    }
}
    success = () => {
        const { numberOfFreelancers } = this.state;

        if (numberOfFreelancers !== 0) {
            return true;
        } else {
            return false;
        }
    }
    restart = () => {
        console.log("restart");

        this.props.addJobData({
            page: 1
        })

        setTimeout(() => {
            this.props.props.navigation.navigate("start-a-project-hiring");
        }, 750)
    }
    error = () => {
        const { numberOfFreelancers } = this.state;

        if (numberOfFreelancers === 0) {
            return true;
        } else {
            return false;
        }
    }
    onValueChange = (value) => {
        this.setState({
            typeOfApplicant: value
        })
    }
    handleSubmissionMultipleFreelancers = () => {
        console.log("handleSubmission clicked");

        const { selected, amountOfFreelancers, numberOfFreelancers, jobSuccessPicked, typeOfApplicant, amountEarned, multiple } = this.state;

        this.props.addJobData({
            ...this.props.data,
            typeOfApplicant,
            whoCanApply: selected,
            multipleFreelancers: multiple,
            numberOfRequiredFreelancers: numberOfFreelancers,
            multipleOrSingularFreelancersRequired: amountOfFreelancers,
            jobSuccessScore: jobSuccessPicked,
            minAmountEarnedToApply: amountEarned,
            page: 6
        });

        setTimeout(() => {
            this.props.props.navigation.replace("payments-and-more");
        }, 750)
    }
    handleSubmissionSingleFreelancer = () => {
        console.log("handleSubmissionSingleFreelancer clicked.");

        const { selected, amountOfFreelancers, numberOfFreelancers, jobSuccessPicked, typeOfApplicant, amountEarned, multiple } = this.state;

        this.props.addJobData({
            ...this.props.data,
            typeOfApplicant,
            whoCanApply: selected,
            multipleFreelancers: multiple,
            multipleOrSingularFreelancersRequired: amountOfFreelancers,
            numberOfRequiredFreelancers: 1,
            jobSuccessScore: jobSuccessPicked,
            minAmountEarnedToApply: amountEarned,
            page: 6
        });

        setTimeout(() => {
            this.props.props.navigation.replace("payments-and-more");
        }, 750)
    }
    renderButtons = () => {
        const { selected, amountOfFreelancers, numberOfFreelancers, changed, multiple } = this.state;

        if (changed === true) {
            if ((typeof selected !== "undefined" && selected.length > 0) && (typeof amountOfFreelancers !== "undefined" && amountOfFreelancers.length > 0) && (numberOfFreelancers !== 0)) {
                return <AwesomeButtonBlue borderColor={"#141414"} borderWidth={2} style={{ marginTop: 20 }} type={"secondary"} backgroundColor={"#ffffff"} backgroundPlaceholder={"black"} textColor={"black"} shadowColor={"grey"} onPress={this.handleSubmissionMultipleFreelancers} stretch={true}>Submit & Continue</AwesomeButtonBlue>;
            } else {
                return <AwesomeButtonBlue type={"disabled"} stretch={true} onPress={() => {}}>Submit & Continue</AwesomeButtonBlue>;
            }
        } else {
            if (multiple === true) {
                if ((typeof selected !== "undefined" && selected.length > 0) && (typeof amountOfFreelancers !== "undefined" && amountOfFreelancers.length > 0) && (numberOfFreelancers !== 0)) {
                    return <AwesomeButtonBlue borderColor={"#141414"} borderWidth={2} style={{ marginTop: 20 }} type={"secondary"} backgroundColor={"#ffffff"} backgroundPlaceholder={"black"} textColor={"black"} shadowColor={"grey"} onPress={this.handleSubmissionMultipleFreelancers} stretch={true}>Submit & Continue</AwesomeButtonBlue>;
                } else {
                    return <AwesomeButtonBlue type={"disabled"} stretch={true} onPress={() => {}}>Submit & Continue</AwesomeButtonBlue>;
                }
            } else {
                if ((typeof selected !== "undefined" && selected.length > 0) && (typeof amountOfFreelancers !== "undefined" && amountOfFreelancers.length > 0)) {
                    return <AwesomeButtonBlue borderColor={"#141414"} borderWidth={2} style={{ marginTop: 20 }} type={"secondary"} backgroundColor={"#ffffff"} backgroundPlaceholder={"black"} textColor={"black"} shadowColor={"grey"} onPress={this.handleSubmissionSingleFreelancer} stretch={true}>Submit & Continue</AwesomeButtonBlue>;
                } else {
                    return <AwesomeButtonBlue type={"disabled"} stretch={true} onPress={() => {}}>Submit & Continue</AwesomeButtonBlue>;
                }
            }
        }
    }
    render() {
        const { selected, amountOfFreelancers, numberOfFreelancers, changed, typeOfApplicant, jobSuccessPicked, amountEarned } = this.state;

        console.log(this.state);
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
                    <Title style={styles.whiteText}>Post Job</Title>
                    <Subtitle style={styles.whiteText}>Additional Details</Subtitle>
                </Body>
                    <Right>
                        <Button transparent onPress={this.restart}>
                            <Text style={styles.whiteText}>Restart Process</Text>
                        </Button>
                    </Right>
                </Header>
                <Progress.Bar color={"#0057ff"} unfilledColor={"#ffffff"} progress={0.75} width={width} />
                <ScrollView contentContainerStyle={{ paddingBottom: 50 }} style={styles.container}>
                    <View style={styles.margin}>
                    <KeyboardAwareScrollView>
                        <Text style={styles.headerText}>Who can see your job?</Text>
                        <View style={{ marginTop: 10 }} />
                        <TouchableOpacity onPress={() => {
                           this.setState({
                               selected: "anyone"
                           })
                        }} style={selected === "anyone" ? styles.selected : styles.boxed}>
                            <View style={styles.innerBox}>
                                <View style={styles.left}>
                                    <Image source={require("../../../../assets/icons/laptop-2.png")} style={styles.icon} />
                                    <Text style={{ fontWeight: "bold", marginLeft: 10, color: "#ffffff" }}>Anyone</Text>
                                </View>
                                <View style={styles.right}>
                                    {selected === "anyone" ? <Image source={require("../../../../assets/icons/selected.png")} style={[styles.icon, { marginLeft: 5 }]} /> : <Image source={require("../../../../assets/icons/un-selected.png")} style={styles.icon} />}
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            this.setState({
                               selected: "fairwage-only"
                           })
                        }} style={selected === "fairwage-only" ? styles.selected : styles.boxed}>
                            <View style={styles.innerBox}>
                                <View style={styles.left}>
                                    <Image source={require("../../../../assets/icons/average.png")} style={styles.icon} />
                                    <Text style={{ fontWeight: "bold", marginLeft: 10, color: "#ffffff" }}>FairWage Freelancing ONLY</Text>
                                </View>
                                <View style={styles.right}>
                                    {selected === "fairwage-only" ? <Image source={require("../../../../assets/icons/selected.png")} style={[styles.icon, { marginLeft: 5 }]} /> : <Image source={require("../../../../assets/icons/un-selected.png")} style={styles.icon} />}
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                             this.setState({
                               selected: "invite-only"
                           })
                        }} style={selected === "invite-only" ? styles.selected : styles.boxed}>
                            <View style={styles.innerBox}>
                                <View style={styles.left}>
                                    <Image source={require("../../../../assets/icons/lock.png")} style={styles.icon} />
                                    <Text style={{ fontWeight: "bold", marginLeft: 10, color: "#ffffff" }}>Invite-Only</Text>
                                </View>
                                <View style={styles.right}>
                                    {selected === "invite-only" ? <Image source={require("../../../../assets/icons/selected.png")} style={[styles.icon, { marginLeft: 5 }]} /> : <Image source={require("../../../../assets/icons/un-selected.png")} style={styles.icon} />}
                                </View>
                            </View>
                        </TouchableOpacity>
                        <Text style={[styles.headerText, { marginTop: 30 }]}>How many people do you need for this job?</Text>
                        <TouchableOpacity onPress={() => {
                             this.setState({
                               amountOfFreelancers: "one-freelancer", 
                               multiple: false
                           })
                        }} style={amountOfFreelancers === "one-freelancer" ? styles.selected : styles.boxed}>
                            <View style={styles.innerBox}>
                                <View style={styles.left}>
                                    <Image source={require("../../../../assets/icons/person.png")} style={styles.icon} />
                                    <Text style={{ fontWeight: "bold", marginLeft: 10, color: "#ffffff" }}>One Freelancer</Text>
                                </View>
                                <View style={styles.right}>
                                    {amountOfFreelancers === "one-freelancer" ? <Image source={require("../../../../assets/icons/selected.png")} style={[styles.icon, { marginLeft: 5 }]} /> : <Image source={require("../../../../assets/icons/un-selected.png")} style={styles.icon} />}
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                             this.setState({
                               amountOfFreelancers: "multiple-freelancers",
                               multiple: true
                           })
                        }} style={amountOfFreelancers === "multiple-freelancers" ? styles.selected : styles.boxed}>
                            <View style={styles.innerBox}>
                                <View style={styles.left}>
                                    <Image source={require("../../../../assets/icons/multiple.png")} style={styles.icon} />
                                    <Text style={{ fontWeight: "bold", marginLeft: 10, color: "#ffffff" }}>More than one freelancer</Text>
                                </View>
                                <View style={styles.right}>
                                    {amountOfFreelancers === "multiple-freelancers" ? <Image source={require("../../../../assets/icons/selected.png")} style={[styles.icon, { marginLeft: 5 }]} /> : <Image source={require("../../../../assets/icons/un-selected.png")} style={styles.icon} />}
                                </View>
                            </View>
                        </TouchableOpacity>
                        
                        {amountOfFreelancers === "multiple-freelancers" ? <Item success={this.success()} error={this.error()} style={{ marginTop: 15 }} regular>
                            <Input style={{ color: "#ffffff" }} value={this.state.numberOfFreelancers} onChangeText={(value) => {
                                this.setState({
                                    numberOfFreelancers: value.length > 0 ? Number(value) : 0,
                                    changed: true
                                })
                            }} keyboardType={"number-pad"} returnKeyType={'done'} placeholder={"Enter how many freelancers are required..."} />
                        {numberOfFreelancers !== 0 ? <Icon name='checkmark-circle' /> : <Icon name='close-circle' />}
                        </Item> : null}
                        {numberOfFreelancers === 0 && changed === true ? <Text style={styles.errorText}>If you've selected "More than one freelancer", you must select a value for the above field.</Text> : null}
                        </KeyboardAwareScrollView>
                    </View>
                    <View style={styles.thickHr} />
                    <View style={styles.margin}>
                        <Text style={styles.headerText}>Talent Preferences</Text>
                        <View style={{ marginTop: 10 }} />
                        <Text style={styles.normalText}>Specify the qualifications you're looking for in a successful proposal.</Text>
                        <View style={{ marginTop: 15 }} />
                        <Text style={styles.normalText}>Freelancers and agencies may still apply if they do not meet your preferences, but they will be clearly notified that they are at a disadvantage.</Text>
                        <Text style={[styles.headerText, { marginTop: 35 }]}>Talent Type</Text>
                        <View style={{ backgroundColor: "#ffffff" }}>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                placeholder="Select your preference"
                                placeholderStyle={{ color: "grey" }}
                                placeholderIconColor="blue"
                                style={{ width: "100%" }}
                                selectedValue={this.state.typeOfApplicant}
                                onValueChange={this.onValueChange}
                                >
                                    <Picker.Item label="Independent" value="independent" />
                                    <Picker.Item label="Agency" value="agency" />
                            </Picker>
                        </View>

                        <Text style={[styles.headerText, { marginTop: 35 }]}>Job Success Score</Text>
                        <List style={{ marginTop: 25 }}>
                            <ListItem noIndent style={jobSuccessPicked === "any-job-success" ? { backgroundColor: "#ffffff" } : null} button={true} onPress={() => {
                                this.setState({
                                    jobSuccessPicked: "any-job-success"
                                })
                            }}>
                            <Left>
                                <Text style={jobSuccessPicked === "any-job-success" ? { color: "black" } : { color: "#ffffff" }}>Any job success history</Text>
                            </Left>
                            <Right>
                                <Icon name="arrow-forward" style={jobSuccessPicked === "any-job-success" ? { color: "#0057ff" } : null} />
                            </Right>
                            </ListItem>
                            <ListItem noIndent style={jobSuccessPicked === "80-and-up" ? { backgroundColor: "#ffffff" } : null} button={true} onPress={() => {
                                this.setState({
                                    jobSuccessPicked: "80-and-up"
                                })
                            }}>
                            <Left>
                                <Text style={jobSuccessPicked === "80-and-up" ? { color: "black" } : { color: "#ffffff" }}>80% positive success rate and up</Text>
                            </Left>
                            <Right>
                                <Icon name="arrow-forward" style={jobSuccessPicked === "80-and-up" ? { color: "#0057ff" } : null} />
                            </Right>
                            </ListItem>
                            <ListItem noIndent style={jobSuccessPicked === "90-and-up" ? { backgroundColor: "#ffffff" } : null} button={true} onPress={() => {
                                this.setState({
                                    jobSuccessPicked: "90-and-up"
                                })
                            }}>
                            <Left>
                                <Text style={jobSuccessPicked === "90-and-up" ? { color: "black" } : { color: "#ffffff" }}>90% positive success rate and up</Text>
                            </Left>
                            <Right>
                                <Icon name="arrow-forward" style={jobSuccessPicked === "90-and-up" ? { color: "#0057ff" } : null} />
                            </Right>
                            </ListItem>
                        </List>
                        <Text style={[styles.headerText, { marginTop: 35 }]}>Min Amount Earned</Text>
                        <List style={{ marginTop: 25 }}>
                            <ListItem noIndent style={amountEarned === 0 ? { backgroundColor: "#ffffff" } : null} button={true} onPress={() => {
                                this.setState({
                                    amountEarned: 0
                                })
                            }}>
                            <Left>
                                <Text style={amountEarned === 0 ? { color: "black" } : { color: "#ffffff" }}>ANY amount earned (everyone)</Text>
                            </Left>
                            <Right>
                                <Icon name="arrow-forward" style={amountEarned === 0 ? { color: "#0057ff" } : null} />
                            </Right>
                            </ListItem>
                            <ListItem noIndent style={amountEarned === 100 ? { backgroundColor: "#ffffff" } : null} button={true} onPress={() => {
                                this.setState({
                                    amountEarned: 100
                                })
                            }}>
                            <Left>
                                <Text style={amountEarned === 100 ? { color: "black" } : { color: "#ffffff" }}>$100+ earned</Text>
                            </Left>
                            <Right>
                                <Icon name="arrow-forward" style={amountEarned === 100 ? { color: "#0057ff" } : null} />
                            </Right>
                            </ListItem>
                            <ListItem noIndent style={amountEarned === 1000 ? { backgroundColor: "#ffffff" } : null} button={true} onPress={() => {
                                this.setState({
                                    amountEarned: 1000
                                })
                            }}>
                            <Left>
                                <Text style={amountEarned === 1000 ? { color: "black" } : { color: "#ffffff" }}>$1,000+ earned</Text>
                            </Left>
                            <Right>
                                <Icon name="arrow-forward" style={amountEarned === 1000 ? { color: "#0057ff" } : null} />
                            </Right>
                            </ListItem>
                            <ListItem noIndent style={amountEarned === 10000 ? { backgroundColor: "#ffffff" } : null} button={true} onPress={() => {
                                this.setState({
                                    amountEarned: 10000
                                })
                            }}>
                            <Left>
                                <Text style={amountEarned === 10000 ? { color: "black" } : { color: "#ffffff" }}>$10,000+ earned</Text>
                            </Left>
                            <Right>
                                <Icon name="arrow-forward" style={amountEarned === 10000 ? { color: "#0057ff" } : null} />
                            </Right>
                            </ListItem>
                        </List>
                    </View>
                    <View style={styles.margin}>
                        {this.renderButtons()}
                    </View>
                </ScrollView>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        data: state.jobData.data
    };
}
export default connect(mapStateToProps, { addJobData })(VisibilityAndQuantityHelper);