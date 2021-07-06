import React, { Component, Fragment } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { Header, Left, Body, Right, Title, Subtitle, Button, Text as NativeText, Card, CardItem } from 'native-base';
import styles from './styles.js';
import axios from 'axios';
import Config from "react-native-config";
import { connect } from 'react-redux';
import _ from 'lodash';
import ReadMore from 'react-native-read-more-text';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import Toast from 'react-native-toast-message';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";


class PreviousProposalsAppliedHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        profilePic: "",
        proposals: [],
        ready: false
    }
}
    componentDidMount() {
        axios.get(`${Config.ngrok_url}/gather/previously/applied/proposals`, {
            params: {
                id: this.props.unique_id
            }
        }).then((res) => {
            if (res.data.message === "Successfully gathered proposals!") {

                const { user, values } = res.data;

                this.setState({
                    proposals: values,
                    profilePic: typeof user.profilePics !== "undefined" && user.profilePics.length > 0 ? `${Config.wasabi_url}/${user.profilePics[user.profilePics.length - 1].picture}` : _.has(user, "photo") ? user.photo : Config.no_image_avaliable,
                    ready: true
                })
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    _renderTruncatedFooter = (handlePress) => {
        return (
          <Text style={{color: "blue", marginTop: 5, fontWeight: "bold" }} onPress={handlePress}>
            Read more
          </Text>
        );
    }
     
    _renderRevealedFooter = (handlePress) => {
        return (
          <Text style={{color: "blue", marginTop: 5, fontWeight: "bold" }} onPress={handlePress}>
            Show less
          </Text>
        );
    }    
    calculateHeader = (proposal) => {
        if (proposal.hourly === false) {
            if (proposal.payByMilestone === true) {
                
            } else {
                return `$${proposal.ratePerProjectCompletion.toFixed(2)} per project completion`;
            }
        } else {
            return `$${proposal.hourlyRate} billed at an hourly rate`;
        }
    }
    renderLoading = () => {
        const { ready, proposals } =  this.state;

        if (ready === true && (typeof proposals === "undefined" || proposals.length === 0)) {
            return (
                <View style={{ margin: 10 }}>
                    <View style={styles.background}>
                        <Image source={require("../../../assets/images/5.png")} resizeMode={"contain"} style={styles.myImage} />
                        <View style={{ marginTop: 20 }} />
                        <Text style={styles.headText}>Oops, We couldn't find any "already submitted" proposals from your account right now...</Text>
                        <View style={{ marginTop: 30 }} />
                        <AwesomeButtonBlue type={"secondary"} textColor={"white"} backgroundColor={"blue"} onPress={() => {
                            this.props.props.navigation.push("jobs-homepage");
                        }} stretch={true}>Apply to jobs</AwesomeButtonBlue>
                    </View>
                </View>
            );
        } else {
            return (
                <Fragment>
                    <View style={{ margin: 10 }}>
                        <SkeletonPlaceholder>
                            <View style={{ height: 175, width: "100%" }}>
                                
                            </View>
                        </SkeletonPlaceholder>
                        <View style={{ marginTop: 15 }} />
                        <SkeletonPlaceholder>
                            <View style={{ height: 175, width: "100%" }}>
                                
                            </View>
                        </SkeletonPlaceholder>
                        <View style={{ marginTop: 15 }} />
                        <SkeletonPlaceholder>
                            <View style={{ height: 175, width: "100%" }}>
                                
                            </View>
                        </SkeletonPlaceholder>
                        <View style={{ marginTop: 15 }} />
                        <SkeletonPlaceholder>
                            <View style={{ height: 175, width: "100%" }}>
                                
                            </View>
                        </SkeletonPlaceholder>
                        <View style={{ marginTop: 15 }} />
                        <SkeletonPlaceholder>
                            <View style={{ height: 175, width: "100%" }}>
                                
                            </View>
                        </SkeletonPlaceholder>
                        <View style={{ marginTop: 15 }} />
                        <SkeletonPlaceholder>
                            <View style={{ height: 175, width: "100%" }}>
                                
                            </View>
                        </SkeletonPlaceholder>
                        <View style={{ marginTop: 15 }} />
                        <SkeletonPlaceholder>
                            <View style={{ height: 175, width: "100%" }}>
                                
                            </View>
                        </SkeletonPlaceholder>
                        <View style={{ marginTop: 15 }} />
                        <SkeletonPlaceholder>
                            <View style={{ height: 175, width: "100%" }}>
                                
                            </View>
                        </SkeletonPlaceholder>
                        <View style={{ marginTop: 15 }} />
                        <SkeletonPlaceholder>
                            <View style={{ height: 175, width: "100%" }}>
                                
                            </View>
                        </SkeletonPlaceholder>
                        <View style={{ marginTop: 15 }} />
                        <SkeletonPlaceholder>
                            <View style={{ height: 175, width: "100%" }}>
                                
                            </View>
                        </SkeletonPlaceholder>
                        <View style={{ marginTop: 15 }} />
                    </View>
                </Fragment>
            );
        }
    }
    searchForJobAndRedirect = (proposal) => {

        axios.get(`${Config.ngrok_url}/gather/individual/job/listing`, {
            params: {
                jobID: proposal.jobID
            }
        }).then((res) => {
            if (res.data.message === "Successfully located listing!") {

                const { job } = res.data;

                this.props.props.navigation.push("view-job-individual", { item: job });
            } else {
                console.log("err", res.data);

                Toast.show({
                    type: "error",
                    position: "top",
                    visibilityTime: 4500,
                    text1: "ERROR OCCURRED RETRIEVING JOB.",
                    text2: "An error occurred while trying to gather this specific job data, please try again or refresh the page..."
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    calculatePricingDisplay = (jobData) => {
        if (jobData.pricing.fixedOrHourly === "hourly") {
            return `Client is willing to pay $${jobData.pricing.minHourly} to $${jobData.pricing.maxHourly} per hour`;
        } else {
            return `Client is willing to pay $${jobData.pricing.fixedBudgetPrice} per completion of the project (milestones are also applicable)`
        }
    }
    render() {
        const { proposals, profilePic } = this.state;

        console.log("proposals previous index.js state, ", this.state);
        return (
            <Fragment>
                <Header style={{ backgroundColor: "#303030" }}>
                    <Left>
                        <Button onPress={() => {
                            this.props.props.navigation.goBack();
                        }} transparent>
                            <Image source={require("../../../assets/icons/go-back.png")} style={[styles.headerIcon, { tintColor: "#fdd530" }]} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: "#fdd530" }}>Proposals</Title>
                        <Subtitle style={{ color: "#fdd530" }}>Previously Submiited Proposals</Subtitle>
                    </Body>
                    <Right>
                        <Image source={{ uri: typeof profilePic !== "undefined" && profilePic.length > 0 ? profilePic : Config.no_image_avaliable }} style={styles.profile} />
                    </Right>
                </Header>
                <Toast ref={(ref) => Toast.setRef(ref)} />
                <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
                    
                    {typeof proposals !== 'undefined' && proposals.length > 0 ? proposals.map((proposal, index) => {
                        console.log("proposal", proposal);
                        const { title, description, category, pricing, skillLevel, task, typeOfProject } = proposal.jobData;
                        return (
                            <Fragment>
                                <Card>
                                    <CardItem style={styles.bottomBorder} header>
                                        <NativeText style={{ color: "blue" }}>{this.calculateHeader(proposal)}</NativeText>
                                    </CardItem>
                                    <CardItem>
                                        <Body style={{ flexDirection: "row", justifyContent: "center" }}>
                                            <Text style={styles.centeredTitleText}>Job/listing information</Text>
                                        </Body>
                                    </CardItem>
                                    <CardItem>
                                        
                                        <Body>
                                            <Text style={styles.midsizedText}>Title: {title} {"\n \n"}</Text>
                                            <ReadMore
                                                numberOfLines={3}
                                                renderTruncatedFooter={this._renderTruncatedFooter}
                                                renderRevealedFooter={this._renderRevealedFooter}
                                            >
                                                <Text style={styles.midsizedText}>Description: {description} {"\n \n"}</Text>
                                            </ReadMore>
                                            <Text style={[styles.midsizedText, { marginTop: 10 }]}>{this.calculatePricingDisplay(proposal.jobData)}</Text>
                                            <View style={styles.hr} />
                                            <ReadMore
                                                numberOfLines={3}
                                                renderTruncatedFooter={this._renderTruncatedFooter}
                                                renderRevealedFooter={this._renderRevealedFooter}
                                            >
                                                <NativeText style={{ fontWeight: "bold" }}><NativeText style={{ color: "blue" }}>Submitted Cover Letter</NativeText>: {"\n"}</NativeText>
                                                <NativeText>
                                                    {proposal.coverLetterText}
                                                </NativeText>
                                            </ReadMore>
                                            
                                        </Body>
                                    </CardItem>
                                    <CardItem style={styles.topBorder} footer>
                                        <NativeText style={{ color: "blue" }}>{proposal.date}</NativeText>
                                    </CardItem>
                                    <CardItem>
                                        <AwesomeButtonBlue type={"secondary"} onPress={() => {
                                            this.searchForJobAndRedirect(proposal);
                                        }} stretch={true}>View Listing</AwesomeButtonBlue>
                                    </CardItem>
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
export default connect(mapStateToProps, {  })(PreviousProposalsAppliedHelper);