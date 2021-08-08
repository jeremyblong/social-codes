import React, { Component, Fragment } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Dimensions, Animated } from 'react-native';
import styles from './styles.js';
import { Header, Left, Body, Right, Title, Subtitle, Button } from 'native-base';
import { connect } from 'react-redux';
import * as Progress from 'react-native-progress';
import BasicInfoStartJobListingHelperSubComponent from "./helpers/basicInfo/index.js";
import CategoryStartJobCreationSubComponentHelper from "./helpers/category/index.js";
import TypeOfProjectAndScreeningSubComponent from "./helpers/screenAndDetails/index.js";
import SkillsAndMoreInformationSubComponent from "./helpers/keywordsAndTags/index.js";
import VisibilityAndQuantitySubComponent from "./helpers/visibility/index.js";
import PaymentsAndMoreSubComponent from "./helpers/budget/index.js";
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import { Switch } from 'react-native-switch';
import Config from 'react-native-config';
import axios from "axios";
import { addJobData } from "../../../../actions/jobs/data.js";
import _ from "lodash";


const { height, width } = Dimensions.get("window");

class ReviewJobDetailsHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        switched: false
    }
}
    _renderTruncatedFooter = (handlePress) => {
        return (
        <Text style={{color: "blue", fontSize: 15, marginTop: 5 }} onPress={handlePress}>
            Read more
        </Text>
        );
    }
    
    _renderRevealedFooter = (handlePress) => {
        return (
        <Text style={{color: "blue", fontSize: 15, marginTop: 5 }} onPress={handlePress}>
            Show less
        </Text>
        );
    }
    restart = () => {
        console.log("restart");
        
        this.props.props.navigation.navigate("start-a-project-hiring");

        setTimeout(() => {
            this.props.addJobData({
                page: 1
            })
        }, 750);
    }
    renderCategory = (category) => {
        switch (category) {
            case "web-mobile-software-development":
                return "Web, Mobile & Software Development";
            case "mobile-app-development": 
                return "Mobile App Development";
            case "writing":
                return "Writing";
            case "artifical-intelligence-machine-learning":
                return "Artificial Intelligence & Machine Learning";
            case "game-development":
                return "Game Development";
            case "graphic-design":
                return "Graphic Design";
            case "it-networking":
                return "IT Networking";
            case "translation":
                return "Translation Services";
            case "sales-marketing":
                return "Sales Marketing";
            case "legal": 
                return "Legal";
            case "social-media-and-marketing":
                return "Social Media & Marketing";
            case "engineering-and-architecture":
                return "Engineering & Architecture";
            default: 
                return;
        }
    }
    renderTypeOfProject = (type) => {
        switch (type) {
            case "one-time-project":
                return "One-Time Project";
            case "ongoing-project": 
                return "Ongoing Project";
            case "complex-project":
                return "Complex Project";
            default: 
                return;
        }
    }
    renderVisility = (data) => {
        switch (data) {
            case "anyone":
                return "Anyone can apply";
                break;
            case "invite-only":
                return "Invite Only";
            case "fairwage-only": 
                return "FairWage Applicants Only";
            default:
                break;
        }
    }
    renderSuccessScore = (score) => {
        switch (score) {
            case "80-and-up":
                return "80% Success Rate & Up";
            case "90-and-up":
                return "90% Success Rate & Up";
            case "any-job-success":
                return "Any Job Success Rate Can Apply";
            default: 
                return;
        }
    }
    type = (type) => {
        console.log(type);
        switch (type) {
            case "independent":
                return "Indepedent Contractors Only";
            case "agency":
                return "Agencies Only";
            case "no-preference":
                return "Anyone";
            default: 
                return;
        }
    }
    renderTimespan = (timespan) => {
        switch (timespan) {
            case "more-than-6-months":
                return "MORE than 6 months in length";
            case "less-than-1-month":
                return "LESS than 1 month in length";
            case "1-3-months":
                return "1-3 months in length";
            case "3-6-months":
                return "3-6 months in length";
            default: 
                return;
        }
    }
    handleFinalSubmission = () => {
        axios.post(`${Config.ngrok_url}/post/new/job`, {
            jobData: this.props.data,
            unique_id: this.props.unique_id
        }).then((res) => {
            if (res.data.message === "Successfully posted job!") {
                console.log(res.data);

                this.props.props.navigation.replace("navigation-menu-main");

                setTimeout(() => {
                    this.props.addJobData({});
                }, 3500);
            } else {
                console.log("er", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    renderPricingFirst = (pricing) => {
        if (pricing.fixedOrHourly === "hourly") {
            return (
                <Fragment>
                    <Text style={styles.smallerText}>${pricing.minHourly} to ${pricing.maxHourly} an hour</Text>
                    <Text style={[styles.headerText, { marginTop: 15 }]}>Length of Project</Text>
                    <Text style={styles.smallerText}>{this.renderTimespan(pricing.lengthOfProject)}</Text>
                </Fragment>
            );
        } else {
            return <Text style={styles.smallerText}>${pricing.fixedBudgetPrice} per the entire project</Text>;
        }
    }
    renderFinalButtons = () => {
        const { switched } = this.state;

        if (switched === true) {
            return true; 
        } else {
            return false;
        }
    }
    render() {
        console.log(this.state, this.props);
        const { data } = this.props;
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
                    <Title style={styles.whiteText}>Review</Title>
                    <Subtitle style={styles.whiteText}>Review Job</Subtitle>
                </Body>
                    <Right>
                        <Button transparent onPress={this.restart}>
                            <Text style={styles.whiteText}>Restart Process</Text>
                        </Button>
                    </Right>
                </Header>
                <Progress.Bar color={"#0057ff"} unfilledColor={"#ffffff"} progress={1} width={width} />
                <ScrollView contentContainerStyle={{ paddingBottom: 50 }} style={styles.container}>
                    <View style={styles.margin}>
                    <BasicInfoStartJobListingHelperSubComponent review={true} props={this.props} />
                    <Text style={styles.headerText}>Title</Text>
                    <Text style={styles.smallerText}>{data.title}</Text>
                    <Text style={[styles.headerText, { marginTop: 20 }]}>Description</Text>
                        <Text style={styles.smallerText}>
                            {data.description}
                        </Text>
                        <View style={{ marginTop: 15 }} />
                    </View>
                    
                    <View style={styles.thickHr} />
                        <View style={styles.margin}>
                            <CategoryStartJobCreationSubComponentHelper props={this.props} />
                            <Text style={[styles.headerText, { marginTop: 15 }]}>Job Category</Text>
                            <Text style={styles.smallerText}>{this.renderCategory(data.category)}</Text> 
                        </View>
                    <View style={styles.thickHr} />
                    <View style={styles.margin}>
                       <TypeOfProjectAndScreeningSubComponent props={this.props} />
                       <Text style={styles.headerText}>Type of Project</Text>
                       <Text style={styles.smallerText}>{this.renderTypeOfProject(data.typeOfProject)}</Text>
                       <View style={styles.thinLine} />
                       <View style={styles.row}>
                            <Text style={styles.headerTextMain}>Screening Questions</Text>
                       </View>
                       {typeof data.questionsBeforeApplying !== 'undefined' && data.questionsBeforeApplying.length > 0 ? data.questionsBeforeApplying.map((question, index) => {
                            return (
                                <Text style={[styles.smallerText, { marginBottom: 10 }]}><Text style={{ color: "blue", fontWeight: "bold" }}>{index + 1}.</Text> {question}</Text>
                            );
                       }) : null}
                       <View style={styles.thinLine} />
                       <Text style={styles.headerText}>Requires Cover Letter</Text>
                       <Text style={styles.smallerText}>{data.coverLetterRequired === true ? "Yes" : "No" }</Text>
                    </View>
                    <View style={styles.thickHr} />
                    <View style={styles.margin}>
                        <SkillsAndMoreInformationSubComponent props={this.props} />
                        <Text style={styles.headerText}>Tags</Text>
                        <Text>These are the selected desired skills for the job that're relevant to this listing</Text>
                        <View style={{ flexWrap: "wrap", flexDirection: "row", marginTop: 15 }}>
                            {typeof this.props.selectedTags !== "undefined" && this.props.selectedTags.length > 0 ? this.props.selectedTags.map((tag, index) => {
                                return (
                                    <View style={styles.tag}>
                                        <Text style={styles.innerText}>{tag}</Text>
                                    </View>
                                );
                            }) : null}
                        </View>
                        <Text style={[styles.headerText, { marginTop: 20 }]}>Languages</Text>
                        <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
                            {typeof data.languagesSelected !== 'undefined' && data.languagesSelected.length > 0 ? data.languagesSelected.map((language, index) => {
                                return (
                                    <View style={styles.tag}>
                                        <Text style={styles.innerText}>{language.name}</Text>
                                    </View>
                                );
                            }) : null}
                        </View>
                        <View style={styles.thinLine} />  
                    </View>
                    <View style={styles.margin}>
                        <Text style={styles.headerTextMain}>Experience Level</Text>
                        <Text style={styles.smallerText}>Intermediate</Text>
                    </View>
                    <View style={styles.thickHr} />
                    <View style={styles.margin}>
                        <VisibilityAndQuantitySubComponent props={this.props} />
                        <Text style={styles.headerText}>Job Posting Visiblity</Text>
                        <Text style={styles.smallerText}>{this.renderVisility(data.whoCanApply)}</Text>
                        <Text style={[styles.headerText, { marginTop: 15 }]}>Freelancer Count</Text>
                        {data.multipleOrSingularFreelancersRequired === "multiple-freelancers" ? <Text style={styles.smallerText}>{data.numberOfRequiredFreelancers}</Text> : <Text style={styles.smallerText}>1</Text>}
                        <View style={styles.thinLine} />
                        <Text style={styles.headerTextMain}>Talent Preferences</Text>
                        <View style={{ marginTop: 10 }} />
                        <Text style={styles.headerText}>Talent Preferences</Text>
                        <Text style={styles.smallerText}>{this.renderSuccessScore(data.jobSuccessScore)}</Text>
                        <Text style={[styles.headerText, { marginTop: 15 }]}>Type Of Applicant</Text>
                        <Text style={styles.smallerText}>{this.type(data.typeOfApplicant)}</Text>
                        <Text style={[styles.headerText, { marginTop: 15 }]}>Amount Earned</Text>
                        <Text style={styles.smallerText}>${data.minAmountEarnedToApply}+ earned</Text>
                        <View style={styles.thinLine} />
                    </View>
                    <View style={styles.thickHr} />
                    <View style={styles.margin}>
                        <PaymentsAndMoreSubComponent props={this.props}/>
                        <Text style={styles.headerText}>Hourly or Fixed-Price</Text>
                        <Text style={styles.smallerText}>{_.has(data.pricing, "fixedOrHourly") && data.pricing.fixedOrHourly === "hourly" ? "Pay hourly" : "Pay a fixed-price"}</Text>
                        <Text style={[styles.headerText, { marginTop: 15 }]}>Budget</Text>
                        {this.renderPricingFirst(data.pricing)}
                    </View>
                    <View style={styles.thickHr} />
                    <View style={[styles.margin, { justifyContent: "center", alignItems: "center", alignContent: "center" }]}>
                    <Text style={{ marginBottom: 15, fontWeight: "bold", fontSize: 15 }}>Is all the information correct and accurate?</Text>
                        <Switch
                            value={this.state.switched}
                            onValueChange={(val) => {                                
                                this.setState({
                                    switched: val
                                })
                            }}
                            disabled={false}
                            activeText={'YES'}
                            inActiveText={"NO"}
                            circleSize={35}
                            barHeight={30}
                            circleBorderWidth={5}
                            backgroundActive={'green'}
                            backgroundInactive={'gray'}
                            circleActiveColor={'#30a566'}
                            circleInActiveColor={'white'}
                            changeValueImmediately={true}
                        />
                    </View>
                    <View style={styles.margin}>
                        {this.renderFinalButtons() ? <AwesomeButtonBlue borderColor={"#141414"} borderWidth={2} type={"secondary"} backgroundColor={"#ffffff"} backgroundPlaceholder={"black"} textColor={"black"} shadowColor={"grey"} onPress={this.handleFinalSubmission} stretch={true}>Submit & Post Job</AwesomeButtonBlue> : <AwesomeButtonBlue type={"disabled"} stretch={true}>Submit & Post Job</AwesomeButtonBlue>}
                    </View>
                </ScrollView>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        data: state.jobData.data,
        unique_id: state.signupData.authData.unique_id,
        selectedTags: state.jobData.data.selectedTags ? state.jobData.data.selectedTags : [],
        tokens: state.jobData.data.tokensRequiredToApply
    }
}
export default connect(mapStateToProps, { addJobData })(ReviewJobDetailsHelper);