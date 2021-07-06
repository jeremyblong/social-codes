import React, { Component, Fragment } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { Header, Left, Body, Right, Button, Title, Subtitle, List, ListItem } from 'native-base';
import styles from './styles.js';
import SideMenu from "react-native-side-menu";
import Side from "../../navigation/sidemenu/index.js";
import moment from "moment";
import ReadMore from 'react-native-read-more-text';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import Config from "react-native-config";
import axios from "axios";
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import Toast from 'react-native-toast-message';

const { height, width } = Dimensions.get("window");


class AlreadySubmittedProposalsTwoHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        menuOpen: false
    }
}
    timePeriod = (period) => {
        switch (period) {
            case "more-than-30-hours-week":
                return "More than 30 hours / wk";
            case "less-than-30-hours-week":
                return "Less than 30 hours / wk";
            case "unknown":
                return "Unknown - N/A";
            default: 
                return;
        }
    }
    lengthOfProject = (lengthOfTime) => {
        switch (lengthOfTime) {
            case "1-3-months":
                return "1-3 Months";
            case "3-6-months":
                return "3-6 Months";
            case "more-than-6-months":
                return "More than 6 Months";
            case "more-than-1-month":
                return "Less than 1 month";
            default: 
                return;
        }
    }
    skillLevel = (skill) => {
        switch (skill) {
            case "intermediate":
                return "Intermediate";
            case "entry-level":
                return "Entry";
            case "expert":
                return "Expert";
            default: 
                return;
        }
    }
    callback = () => {
        console.log("callback")
    }
    renderCategory = (category) => {
        switch (category) {
            case "web-mobile-software-development":
                return "Web/Mobile Software Dev"                
                break;
            case "mobile-app-development":
                return "Mobile App Dev";
            case "writing":
                return "Writing";
            case "artifical-intelligence-machine-learning":
                return "Artificial Intelligence & Machine Learning";
            case "graphic-design":
                return "Graphic Design";
            case "game-development":
                return "Game Development";
            case "it-networking":
                return "IT-Networking";
            case "translation": 
                return "Translation";
            case "sales-marketing":
                return "Sales Marketing";
            case "legal":
                return "Legal";
            case "social-media-and-marketing":
                return "Social Media & Marketing";
            case "engineering-and-architecture":
                return "Engineering & Architecture";
            default:
                break;
        }
    }
    whoCanApply = (data) => {
        switch (data) {
            case "independent":
                return "Only independent contractors can apply";
            case "agency":
                return "Only agencies can apply";
            case "anyone":
                return "Anyone can apply";
        }
    }
    renderHourly = (rate) => {
        const job = this.props.props.route.params.job;

        if (rate === "hourly") {
            return `$${job.pricing.minHourly.toFixed(2)} - $${job.pricing.maxHourly.toFixed(2)}`;
        } else {
            return `Fixed Price - $${job.pricing.fixedBudgetPrice}`
        }
    }
    renderFreelancers = () => {
        const job = this.props.props.route.params.job;

        if (job.multipleOrSingularFreelancersRequired === "multiple-freelancers") {
            return <Text style={styles.freelancers}><Text style={{ color: "blue", fontWeight: "bold" }}>{job.numberOfFreelancersRequired}</Text> freelancers are required/desired.</Text>;
        } else {
            return <Text style={styles.freelancers}>Only <Text style={{ color: "blue", fontWeight: "bold" }}>ONE (1)</Text> freelancer is required.</Text>;
        }
    }
    _renderTruncatedFooter = (handlePress) => {
        return (
          <Text style={{color: "blue", fontWeight: "bold", marginTop: 5}} onPress={handlePress}>
            Read more
          </Text>
        );
    }
     
    _renderRevealedFooter = (handlePress) => {
        return (
          <Text style={{color: "blue", fontWeight: "bold", marginTop: 5}} onPress={handlePress}>
            Show less
          </Text>
        );
    }
    renderBudget = (pricing) => {
        if (pricing.fixedOrHourly === "hourly") {
            return `$${pricing.minHourly.toFixed(2)} - $${pricing.maxHourly.toFixed(2)}/hr`;
        } else {
            return `$${pricing.fixedBudgetPrice.toFixed(2)} per completion`;
        }
    }
    calculateFee = (pricing) => {
        if (pricing.fixedOrHourly === "hourly") {
            return (this.state.myBid * 0.20).toFixed(2);
        } else {
            // return (pricing.fixedBudgetPrice * 0.20).toFixed(2);
            return (this.state.myBid * 0.20).toFixed(2)
        }
    }
    calculateSuccessScore = (score) => {
        switch (score) {
            case "80-and-up":
                return "80% and up";
                break;
            case "90-and-up":
                return "90% and up";
            case "any-job-success":
                return "Any job success history";
            default:
                break;
        }
    }
    handleAttachment = async (attachment) => {

        console.log(attachment);

        const url = `${Config.wasabi_url}/${attachment.id}`;
        // create a local file path from url
        const localFile = `${RNFS.DocumentDirectoryPath}/${attachment.id}.${attachment.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ? "xlsx" : attachment.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? "docx" : attachment.type}`;
        
        const options = {
            fromUrl: url,
            toFile: localFile,
            onDismiss: this.callback()
        };

        // last step it will download open it with fileviewer.
        RNFS.downloadFile(options).promise.then(() => FileViewer.open(localFile)).then(() => {
            // success
            // Here you can perform any of your completion tasks

            console.log("success");
        }).catch((error) => {
            // error
            console.log("err", error);
        });
    }
    renderIfMilestoneTrue = (data) => {
        const { milestone1, milestone2, milestone3, milestone4, milestone5, milestone6, milestone7, milestone8 } = data;

        if (milestone8 !== null) {
            return (
                <Fragment>
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={styles.horizontalScroll}>
                        <View style={styles.milestone}>
                            <View style={styles.centered}>
                                <Image source={require("../../../assets/icons/milestone.png")} style={styles.milestoneIcon} />
                            </View>
                            <Text style={styles.mediumText}>{milestone1.milestone}</Text>
                            <Text style={styles.mediumText}>${milestone1.price.toFixed(2).toString()}</Text>
                            <Text style={styles.mediumText}>{moment(milestone1.date).format("dddd, MMMM Do YYYY")}</Text>

                            <View style={styles.positionTopRight}>
                                <Text style={{ fontWeight: "bold", fontSize: 18 }}>1</Text>
                            </View>
                        </View>
                        <View style={styles.milestone}>
                            <View style={styles.centered}>
                                <Image source={require("../../../assets/icons/milestone.png")} style={styles.milestoneIcon} />
                            </View>
                            <Text style={styles.mediumText}>{milestone2.milestone}</Text>
                            <Text style={styles.mediumText}>${milestone2.price.toFixed(2).toString()}</Text>
                            <Text style={styles.mediumText}>{moment(milestone2.date).format("dddd, MMMM Do YYYY")}</Text>

                            <View style={styles.positionTopRight}>
                                <Text style={{ fontWeight: "bold", fontSize: 18 }}>2</Text>
                            </View>
                        </View>
                        <View style={styles.milestone}>
                            <View style={styles.centered}>
                                <Image source={require("../../../assets/icons/milestone.png")} style={styles.milestoneIcon} />
                            </View>
                            <Text style={styles.mediumText}>{milestone3.milestone}</Text>
                            <Text style={styles.mediumText}>${milestone3.price.toFixed(2).toString()}</Text>
                            <Text style={styles.mediumText}>{moment(milestone3.date).format("dddd, MMMM Do YYYY")}</Text>
                            <View style={styles.positionTopRight}>
                                <Text style={{ fontWeight: "bold", fontSize: 18 }}>3</Text>
                            </View>
                        </View>
                        <View style={styles.milestone}>
                            <View style={styles.centered}>
                                <Image source={require("../../../assets/icons/milestone.png")} style={styles.milestoneIcon} />
                            </View>
                            <Text style={styles.mediumText}>{milestone4.milestone}</Text>
                            <Text style={styles.mediumText}>${milestone4.price.toFixed(2).toString()}</Text>
                            <Text style={styles.mediumText}>{moment(milestone4.date).format("dddd, MMMM Do YYYY")}</Text>
                            <View style={styles.positionTopRight}>
                                <Text style={{ fontWeight: "bold", fontSize: 18 }}>4</Text>
                            </View>
                        </View>
                        <View style={styles.milestone}>
                            <View style={styles.centered}>
                                <Image source={require("../../../assets/icons/milestone.png")} style={styles.milestoneIcon} />
                            </View>
                            <Text style={styles.mediumText}>{milestone5.milestone}</Text>
                            <Text style={styles.mediumText}>${milestone5.price.toFixed(2).toString()}</Text>
                            <Text style={styles.mediumText}>{moment(milestone5.date).format("dddd, MMMM Do YYYY")}</Text>
                            <View style={styles.positionTopRight}>
                                <Text style={{ fontWeight: "bold", fontSize: 18 }}>5</Text>
                            </View>
                        </View>
                        <View style={styles.milestone}>
                            <View style={styles.centered}>
                                <Image source={require("../../../assets/icons/milestone.png")} style={styles.milestoneIcon} />
                            </View>
                            <Text style={styles.mediumText}>{milestone6.milestone}</Text>
                            <Text style={styles.mediumText}>${milestone6.price.toFixed(2).toString()}</Text>
                            <Text style={styles.mediumText}>{moment(milestone6.date).format("dddd, MMMM Do YYYY")}</Text>
                            <View style={styles.positionTopRight}>
                                <Text style={{ fontWeight: "bold", fontSize: 18 }}>6</Text>
                            </View>
                        </View>
                        <View style={styles.milestone}>
                            <View style={styles.centered}>
                                <Image source={require("../../../assets/icons/milestone.png")} style={styles.milestoneIcon} />
                            </View>
                            <Text style={styles.mediumText}>{milestone7.milestone}</Text>
                            <Text style={styles.mediumText}>${milestone7.price.toFixed(2).toString()}</Text>
                            <Text style={styles.mediumText}>{moment(milestone7.date).format("dddd, MMMM Do YYYY")}</Text>
                            <View style={styles.positionTopRight}>
                                <Text style={{ fontWeight: "bold", fontSize: 18 }}>7</Text>
                            </View>
                        </View>
                        <View style={styles.milestone}>
                            <View style={styles.centered}>
                                <Image source={require("../../../assets/icons/milestone.png")} style={styles.milestoneIcon} />
                            </View>
                            <Text style={styles.mediumText}>{milestone8.milestone}</Text>
                            <Text style={styles.mediumText}>${milestone8.price.toFixed(2).toString()}</Text>
                            <Text style={styles.mediumText}>{moment(milestone8.date).format("dddd, MMMM Do YYYY")}</Text>
                            <View style={styles.positionTopRight}>
                                <Text style={{ fontWeight: "bold", fontSize: 18 }}>8</Text>
                            </View>
                        </View>
                    </ScrollView>
                </Fragment>
            );
        } else if (milestone7 !== null) {
            return (
                <Fragment>
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={styles.horizontalScroll}>
                        <View style={styles.milestone}>
                            <View style={styles.centered}>
                                <Image source={require("../../../assets/icons/milestone.png")} style={styles.milestoneIcon} />
                            </View>
                            <Text style={styles.mediumText}>{milestone1.milestone}</Text>
                            <Text style={styles.mediumText}>${milestone1.price.toFixed(2).toString()}</Text>
                            <Text style={styles.mediumText}>{moment(milestone1.date).format("dddd, MMMM Do YYYY")}</Text>

                            <View style={styles.positionTopRight}>
                                <Text style={{ fontWeight: "bold", fontSize: 18 }}>1</Text>
                            </View>
                        </View>
                        <View style={styles.milestone}>
                            <View style={styles.centered}>
                                <Image source={require("../../../assets/icons/milestone.png")} style={styles.milestoneIcon} />
                            </View>
                            <Text style={styles.mediumText}>{milestone2.milestone}</Text>
                            <Text style={styles.mediumText}>${milestone2.price.toFixed(2).toString()}</Text>
                            <Text style={styles.mediumText}>{moment(milestone2.date).format("dddd, MMMM Do YYYY")}</Text>

                            <View style={styles.positionTopRight}>
                                <Text style={{ fontWeight: "bold", fontSize: 18 }}>2</Text>
                            </View>
                        </View>
                        <View style={styles.milestone}>
                            <View style={styles.centered}>
                                <Image source={require("../../../assets/icons/milestone.png")} style={styles.milestoneIcon} />
                            </View>
                            <Text style={styles.mediumText}>{milestone3.milestone}</Text>
                            <Text style={styles.mediumText}>${milestone3.price.toFixed(2).toString()}</Text>
                            <Text style={styles.mediumText}>{moment(milestone3.date).format("dddd, MMMM Do YYYY")}</Text>
                            <View style={styles.positionTopRight}>
                                <Text style={{ fontWeight: "bold", fontSize: 18 }}>3</Text>
                            </View>
                        </View>
                        <View style={styles.milestone}>
                            <View style={styles.centered}>
                                <Image source={require("../../../assets/icons/milestone.png")} style={styles.milestoneIcon} />
                            </View>
                            <Text style={styles.mediumText}>{milestone4.milestone}</Text>
                            <Text style={styles.mediumText}>${milestone4.price.toFixed(2).toString()}</Text>
                            <Text style={styles.mediumText}>{moment(milestone4.date).format("dddd, MMMM Do YYYY")}</Text>
                            <View style={styles.positionTopRight}>
                                <Text style={{ fontWeight: "bold", fontSize: 18 }}>4</Text>
                            </View>
                        </View>
                        <View style={styles.milestone}>
                            <View style={styles.centered}>
                                <Image source={require("../../../assets/icons/milestone.png")} style={styles.milestoneIcon} />
                            </View>
                            <Text style={styles.mediumText}>{milestone5.milestone}</Text>
                            <Text style={styles.mediumText}>${milestone5.price.toFixed(2).toString()}</Text>
                            <Text style={styles.mediumText}>{moment(milestone5.date).format("dddd, MMMM Do YYYY")}</Text>
                            <View style={styles.positionTopRight}>
                                <Text style={{ fontWeight: "bold", fontSize: 18 }}>5</Text>
                            </View>
                        </View>
                        <View style={styles.milestone}>
                            <View style={styles.centered}>
                                <Image source={require("../../../assets/icons/milestone.png")} style={styles.milestoneIcon} />
                            </View>
                            <Text style={styles.mediumText}>{milestone6.milestone}</Text>
                            <Text style={styles.mediumText}>${milestone6.price.toFixed(2).toString()}</Text>
                            <Text style={styles.mediumText}>{moment(milestone6.date).format("dddd, MMMM Do YYYY")}</Text>
                            <View style={styles.positionTopRight}>
                                <Text style={{ fontWeight: "bold", fontSize: 18 }}>6</Text>
                            </View>
                        </View>
                        <View style={styles.milestone}>
                            <View style={styles.centered}>
                                <Image source={require("../../../assets/icons/milestone.png")} style={styles.milestoneIcon} />
                            </View>
                            <Text style={styles.mediumText}>{milestone7.milestone}</Text>
                            <Text style={styles.mediumText}>${milestone7.price.toFixed(2).toString()}</Text>
                            <Text style={styles.mediumText}>{moment(milestone7.date).format("dddd, MMMM Do YYYY")}</Text>
                            <View style={styles.positionTopRight}>
                                <Text style={{ fontWeight: "bold", fontSize: 18 }}>7</Text>
                            </View>
                        </View>
                    </ScrollView>
                </Fragment>
            );
        } else if (milestone6 !== null) {
            return (
                <Fragment>
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={styles.horizontalScroll}>
                        <View style={styles.milestone}>
                            <View style={styles.centered}>
                                <Image source={require("../../../assets/icons/milestone.png")} style={styles.milestoneIcon} />
                            </View>
                            <Text style={styles.mediumText}>{milestone1.milestone}</Text>
                            <Text style={styles.mediumText}>${milestone1.price.toFixed(2).toString()}</Text>
                            <Text style={styles.mediumText}>{moment(milestone1.date).format("dddd, MMMM Do YYYY")}</Text>

                            <View style={styles.positionTopRight}>
                                <Text style={{ fontWeight: "bold", fontSize: 18 }}>1</Text>
                            </View>
                        </View>
                        <View style={styles.milestone}>
                            <View style={styles.centered}>
                                <Image source={require("../../../assets/icons/milestone.png")} style={styles.milestoneIcon} />
                            </View>
                            <Text style={styles.mediumText}>{milestone2.milestone}</Text>
                            <Text style={styles.mediumText}>${milestone2.price.toFixed(2).toString()}</Text>
                            <Text style={styles.mediumText}>{moment(milestone2.date).format("dddd, MMMM Do YYYY")}</Text>

                            <View style={styles.positionTopRight}>
                                <Text style={{ fontWeight: "bold", fontSize: 18 }}>2</Text>
                            </View>
                        </View>
                        <View style={styles.milestone}>
                            <View style={styles.centered}>
                                <Image source={require("../../../assets/icons/milestone.png")} style={styles.milestoneIcon} />
                            </View>
                            <Text style={styles.mediumText}>{milestone3.milestone}</Text>
                            <Text style={styles.mediumText}>${milestone3.price.toFixed(2).toString()}</Text>
                            <Text style={styles.mediumText}>{moment(milestone3.date).format("dddd, MMMM Do YYYY")}</Text>
                            <View style={styles.positionTopRight}>
                                <Text style={{ fontWeight: "bold", fontSize: 18 }}>3</Text>
                            </View>
                        </View>
                        <View style={styles.milestone}>
                            <View style={styles.centered}>
                                <Image source={require("../../../assets/icons/milestone.png")} style={styles.milestoneIcon} />
                            </View>
                            <Text style={styles.mediumText}>{milestone4.milestone}</Text>
                            <Text style={styles.mediumText}>${milestone4.price.toFixed(2).toString()}</Text>
                            <Text style={styles.mediumText}>{moment(milestone4.date).format("dddd, MMMM Do YYYY")}</Text>
                            <View style={styles.positionTopRight}>
                                <Text style={{ fontWeight: "bold", fontSize: 18 }}>4</Text>
                            </View>
                        </View>
                        <View style={styles.milestone}>
                            <View style={styles.centered}>
                                <Image source={require("../../../assets/icons/milestone.png")} style={styles.milestoneIcon} />
                            </View>
                            <Text style={styles.mediumText}>{milestone5.milestone}</Text>
                            <Text style={styles.mediumText}>${milestone5.price.toFixed(2).toString()}</Text>
                            <Text style={styles.mediumText}>{moment(milestone5.date).format("dddd, MMMM Do YYYY")}</Text>
                            <View style={styles.positionTopRight}>
                                <Text style={{ fontWeight: "bold", fontSize: 18 }}>5</Text>
                            </View>
                        </View>
                        <View style={styles.milestone}>
                            <View style={styles.centered}>
                                <Image source={require("../../../assets/icons/milestone.png")} style={styles.milestoneIcon} />
                            </View>
                            <Text style={styles.mediumText}>{milestone6.milestone}</Text>
                            <Text style={styles.mediumText}>${milestone6.price.toFixed(2).toString()}</Text>
                            <Text style={styles.mediumText}>{moment(milestone6.date).format("dddd, MMMM Do YYYY")}</Text>
                            <View style={styles.positionTopRight}>
                                <Text style={{ fontWeight: "bold", fontSize: 18 }}>6</Text>
                            </View>
                        </View>
                    </ScrollView>
                </Fragment>
            );
        } else if (milestone5 !== null) {
            return (
                <Fragment>
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={styles.horizontalScroll}>
                        <View style={styles.milestone}>
                            <View style={styles.centered}>
                                <Image source={require("../../../assets/icons/milestone.png")} style={styles.milestoneIcon} />
                            </View>
                            <Text style={styles.mediumText}>{milestone1.milestone}</Text>
                            <Text style={styles.mediumText}>${milestone1.price.toFixed(2).toString()}</Text>
                            <Text style={styles.mediumText}>{moment(milestone1.date).format("dddd, MMMM Do YYYY")}</Text>

                            <View style={styles.positionTopRight}>
                                <Text style={{ fontWeight: "bold", fontSize: 18 }}>1</Text>
                            </View>
                        </View>
                        <View style={styles.milestone}>
                            <View style={styles.centered}>
                                <Image source={require("../../../assets/icons/milestone.png")} style={styles.milestoneIcon} />
                            </View>
                            <Text style={styles.mediumText}>{milestone2.milestone}</Text>
                            <Text style={styles.mediumText}>${milestone2.price.toFixed(2).toString()}</Text>
                            <Text style={styles.mediumText}>{moment(milestone2.date).format("dddd, MMMM Do YYYY")}</Text>

                            <View style={styles.positionTopRight}>
                                <Text style={{ fontWeight: "bold", fontSize: 18 }}>2</Text>
                            </View>
                        </View>
                        <View style={styles.milestone}>
                            <View style={styles.centered}>
                                <Image source={require("../../../assets/icons/milestone.png")} style={styles.milestoneIcon} />
                            </View>
                            <Text style={styles.mediumText}>{milestone3.milestone}</Text>
                            <Text style={styles.mediumText}>${milestone3.price.toFixed(2).toString()}</Text>
                            <Text style={styles.mediumText}>{moment(milestone3.date).format("dddd, MMMM Do YYYY")}</Text>
                            <View style={styles.positionTopRight}>
                                <Text style={{ fontWeight: "bold", fontSize: 18 }}>3</Text>
                            </View>
                        </View>
                        <View style={styles.milestone}>
                            <View style={styles.centered}>
                                <Image source={require("../../../assets/icons/milestone.png")} style={styles.milestoneIcon} />
                            </View>
                            <Text style={styles.mediumText}>{milestone4.milestone}</Text>
                            <Text style={styles.mediumText}>${milestone4.price.toFixed(2).toString()}</Text>
                            <Text style={styles.mediumText}>{moment(milestone4.date).format("dddd, MMMM Do YYYY")}</Text>
                            <View style={styles.positionTopRight}>
                                <Text style={{ fontWeight: "bold", fontSize: 18 }}>4</Text>
                            </View>
                        </View>
                        <View style={styles.milestone}>
                            <View style={styles.centered}>
                                <Image source={require("../../../assets/icons/milestone.png")} style={styles.milestoneIcon} />
                            </View>
                            <Text style={styles.mediumText}>{milestone5.milestone}</Text>
                            <Text style={styles.mediumText}>${milestone5.price.toFixed(2).toString()}</Text>
                            <Text style={styles.mediumText}>{moment(milestone5.date).format("dddd, MMMM Do YYYY")}</Text>
                            <View style={styles.positionTopRight}>
                                <Text style={{ fontWeight: "bold", fontSize: 18 }}>5</Text>
                            </View>
                        </View>
                    </ScrollView>
                </Fragment>
            );
        } else if (milestone4 !== null) {
            return (
                <Fragment>
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={styles.horizontalScroll}>
                        <View style={styles.milestone}>
                            <View style={styles.centered}>
                                <Image source={require("../../../assets/icons/milestone.png")} style={styles.milestoneIcon} />
                            </View>
                            <Text style={styles.mediumText}>{milestone1.milestone}</Text>
                            <Text style={styles.mediumText}>${milestone1.price.toFixed(2).toString()}</Text>
                            <Text style={styles.mediumText}>{moment(milestone1.date).format("dddd, MMMM Do YYYY")}</Text>

                            <View style={styles.positionTopRight}>
                                <Text style={{ fontWeight: "bold", fontSize: 18 }}>1</Text>
                            </View>
                        </View>
                        <View style={styles.milestone}>
                            <View style={styles.centered}>
                                <Image source={require("../../../assets/icons/milestone.png")} style={styles.milestoneIcon} />
                            </View>
                            <Text style={styles.mediumText}>{milestone2.milestone}</Text>
                            <Text style={styles.mediumText}>${milestone2.price.toFixed(2).toString()}</Text>
                            <Text style={styles.mediumText}>{moment(milestone2.date).format("dddd, MMMM Do YYYY")}</Text>

                            <View style={styles.positionTopRight}>
                                <Text style={{ fontWeight: "bold", fontSize: 18 }}>2</Text>
                            </View>
                        </View>
                        <View style={styles.milestone}>
                            <View style={styles.centered}>
                                <Image source={require("../../../assets/icons/milestone.png")} style={styles.milestoneIcon} />
                            </View>
                            <Text style={styles.mediumText}>{milestone3.milestone}</Text>
                            <Text style={styles.mediumText}>${milestone3.price.toFixed(2).toString()}</Text>
                            <Text style={styles.mediumText}>{moment(milestone3.date).format("dddd, MMMM Do YYYY")}</Text>
                            <View style={styles.positionTopRight}>
                                <Text style={{ fontWeight: "bold", fontSize: 18 }}>3</Text>
                            </View>
                        </View>
                        <View style={styles.milestone}>
                            <View style={styles.centered}>
                                <Image source={require("../../../assets/icons/milestone.png")} style={styles.milestoneIcon} />
                            </View>
                            <Text style={styles.mediumText}>{milestone4.milestone}</Text>
                            <Text style={styles.mediumText}>${milestone4.price.toFixed(2).toString()}</Text>
                            <Text style={styles.mediumText}>{moment(milestone4.date).format("dddd, MMMM Do YYYY")}</Text>
                            <View style={styles.positionTopRight}>
                                <Text style={{ fontWeight: "bold", fontSize: 18 }}>4</Text>
                            </View>
                        </View>
                    </ScrollView>
                </Fragment>
            );
        } else if (milestone3 !== null) {
            return (
                <Fragment>
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={styles.horizontalScroll}>
                        <View style={styles.milestone}>
                            <View style={styles.centered}>
                                <Image source={require("../../../assets/icons/milestone.png")} style={styles.milestoneIcon} />
                            </View>
                            <Text style={styles.mediumText}>{milestone1.milestone}</Text>
                            <Text style={styles.mediumText}>${milestone1.price.toFixed(2).toString()}</Text>
                            <Text style={styles.mediumText}>{moment(milestone1.date).format("dddd, MMMM Do YYYY")}</Text>

                            <View style={styles.positionTopRight}>
                                <Text style={{ fontWeight: "bold", fontSize: 18 }}>1</Text>
                            </View>
                        </View>
                        <View style={styles.milestone}>
                            <View style={styles.centered}>
                                <Image source={require("../../../assets/icons/milestone.png")} style={styles.milestoneIcon} />
                            </View>
                            <Text style={styles.mediumText}>{milestone2.milestone}</Text>
                            <Text style={styles.mediumText}>${milestone2.price.toFixed(2).toString()}</Text>
                            <Text style={styles.mediumText}>{moment(milestone2.date).format("dddd, MMMM Do YYYY")}</Text>

                            <View style={styles.positionTopRight}>
                                <Text style={{ fontWeight: "bold", fontSize: 18 }}>2</Text>
                            </View>
                        </View>
                        <View style={styles.milestone}>
                            <View style={styles.centered}>
                                <Image source={require("../../../assets/icons/milestone.png")} style={styles.milestoneIcon} />
                            </View>
                            <Text style={styles.mediumText}>{milestone3.milestone}</Text>
                            <Text style={styles.mediumText}>${milestone3.price.toFixed(2).toString()}</Text>
                            <Text style={styles.mediumText}>{moment(milestone3.date).format("dddd, MMMM Do YYYY")}</Text>
                            <View style={styles.positionTopRight}>
                                <Text style={{ fontWeight: "bold", fontSize: 18 }}>3</Text>
                            </View>
                        </View>
                    </ScrollView>
                </Fragment>
            );
        } else if (milestone2 !== null) {
            return (
                <Fragment>
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={styles.horizontalScroll}>
                        <View style={styles.milestone}>
                            <View style={styles.centered}>
                                <Image source={require("../../../assets/icons/milestone.png")} style={styles.milestoneIcon} />
                            </View>
                            <Text style={styles.mediumText}>{milestone1.milestone}</Text>
                            <Text style={styles.mediumText}>${milestone1.price.toFixed(2).toString()}</Text>
                            <Text style={styles.mediumText}>{moment(milestone1.date).format("dddd, MMMM Do YYYY")}</Text>

                            <View style={styles.positionTopRight}>
                                <Text style={{ fontWeight: "bold", fontSize: 18 }}>1</Text>
                            </View>
                        </View>
                        <View style={styles.milestone}>
                            <View style={styles.centered}>
                                <Image source={require("../../../assets/icons/milestone.png")} style={styles.milestoneIcon} />
                            </View>
                            <Text style={styles.mediumText}>{milestone2.milestone}</Text>
                            <Text style={styles.mediumText}>${milestone2.price.toFixed(2).toString()}</Text>
                            <Text style={styles.mediumText}>{moment(milestone2.date).format("dddd, MMMM Do YYYY")}</Text>

                            <View style={styles.positionTopRight}>
                                <Text style={{ fontWeight: "bold", fontSize: 18 }}>2</Text>
                            </View>
                        </View>
                    </ScrollView>
                </Fragment>
            );
        } else if (milestone1 !== null) {
            return (
                <Fragment>
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={styles.horizontalScroll}>
                        <View style={styles.milestone}>
                            <View style={styles.centered}>
                                <Image source={require("../../../assets/icons/milestone.png")} style={styles.milestoneIcon} />
                            </View>
                            <Text style={styles.mediumText}>{milestone1.milestone}</Text>
                            <Text style={styles.mediumText}>${milestone1.price.toFixed(2).toString()}</Text>
                            <Text style={styles.mediumText}>{moment(milestone1.date).format("dddd, MMMM Do YYYY")}</Text>

                            <View style={styles.positionTopRight}>
                                <Text style={{ fontWeight: "bold", fontSize: 18 }}>1</Text>
                            </View>
                        </View>
                    </ScrollView>
                </Fragment>
            );
        } else {

        }
    }
    viewJobListing = (jobID) => {
        axios.get(`${Config.ngrok_url}/gather/individual/job/listing`, {
            params: {
                jobID
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
    calculateQuestionsLength = (data) => {
        if (data.question4 !== null) {
            return "5";
        } else if (data.question3 !== null) {
            return "4";
        } else if (data.question2 !== null) {
            return "3";
        } else if (data.question1 !== null) {
            return "2";
        } else if (data.question0 !== null) {
            return "1";
        } else {
            return "0";
        }
    }
    renderContentTwo = (data) => {
        if (data.payByMilestone === true) {
            return (
                <Fragment>
                    <View style={styles.margin}>
                        
                        <Text style={[styles.mediumText, { marginTop: 5, fontWeight: "bold", marginBottom: 10, marginTop: 10 }]}>Duration - {data.duration}</Text>
                        <View style={{ marginTop: 10, marginBottom: 10 }}>
                            <Text style={[styles.mediumText, { fontWeight: "bold", color: "blue" }]}>Cover Letter:</Text>
                        </View>
                        <ReadMore
                        numberOfLines={3}
                        renderTruncatedFooter={this._renderTruncatedFooter}
                        renderRevealedFooter={this._renderRevealedFooter}
                        onReady={this._handleTextReady}>
                            <Text style={styles.mediumText}>
                                {data.coverLetterText}
                            </Text>
                        </ReadMore>
                        <View style={{ marginTop: 10, marginBottom: 10 }}>
                        <Text style={[styles.mediumText, { marginTop: 5, marginBottom: 10 }]}>Applied on {data.date}</Text>
                        <Text style={[styles.largeText, { marginBottom: 10, fontWeight: "bold" }]}>Scroll to see milestones</Text>
                        {this.renderIfMilestoneTrue(data)}
                        </View>
                    </View>
                    <View style={styles.margin}>
                        <Text style={styles.headerText}>Questions & Responses ({this.calculateQuestionsLength(data)} questions)</Text>
                        {data.question0 !== null ? <View style={[styles.card, { borderColor: "blue" }]}>
                            <View style={styles.cardContent}>
                                <Text style={styles.description}>Question: {data.question0.question}</Text>
                                <View style={{ marginTop: 10 }} />
                                <ReadMore
                                numberOfLines={3}
                                renderTruncatedFooter={this._renderTruncatedFooter}
                                renderRevealedFooter={this._renderRevealedFooter}
                                onReady={this._handleTextReady}>
                                    <Text style={styles.date}>
                                        {data.question0.answer}
                                    </Text>
                                </ReadMore>
                            </View>
                        </View> : null}
                        <View style={{ marginTop: 20 }} />
                        {data.question1 !== null ? <View style={[styles.card, { borderColor: "aquamarine" }]}>
                            <View style={styles.cardContent}>
                                <Text style={styles.description}>Question: {data.question1.question}</Text>
                                <View style={{ marginTop: 10 }} />
                                <ReadMore
                                numberOfLines={3}
                                renderTruncatedFooter={this._renderTruncatedFooter}
                                renderRevealedFooter={this._renderRevealedFooter}
                                onReady={this._handleTextReady}>
                                    <Text style={styles.date}>
                                        {data.question1.answer}
                                    </Text>
                                </ReadMore>
                            </View>
                        </View> : null}
                        <View style={{ marginTop: 20 }} />
                        {data.question2 !== null ? <View style={[styles.card, { borderColor: "aquamarine" }]}>
                            <View style={styles.cardContent}>
                                <Text style={styles.description}>Question: {data.question2.question}</Text>
                                <View style={{ marginTop: 10 }} />
                                <ReadMore
                                numberOfLines={3}
                                renderTruncatedFooter={this._renderTruncatedFooter}
                                renderRevealedFooter={this._renderRevealedFooter}
                                onReady={this._handleTextReady}>
                                    <Text style={styles.date}>
                                        {data.question2.answer}
                                    </Text>
                                </ReadMore>
                            </View>
                        </View> : null}
                        <View style={{ marginTop: 20 }} />
                        {data.question3 !== null ? <View style={[styles.card, { borderColor: "aquamarine" }]}>
                            <View style={styles.cardContent}>
                                <Text style={styles.description}>Question: {data.question3.question}</Text>
                                <View style={{ marginTop: 10 }} />
                                <ReadMore
                                numberOfLines={3}
                                renderTruncatedFooter={this._renderTruncatedFooter}
                                renderRevealedFooter={this._renderRevealedFooter}
                                onReady={this._handleTextReady}>
                                    <Text style={styles.date}>
                                        {data.question3.answer}
                                    </Text>
                                </ReadMore>
                            </View>
                        </View> : null}
                        <View style={{ marginTop: 20 }} />
                        {data.question4 !== null ? <View style={[styles.card, { borderColor: "aquamarine" }]}>
                            <View style={styles.cardContent}>
                                <Text style={styles.description}>Question: {data.question4.question}</Text>
                                <View style={{ marginTop: 10 }} />
                                <ReadMore
                                numberOfLines={3}
                                renderTruncatedFooter={this._renderTruncatedFooter}
                                renderRevealedFooter={this._renderRevealedFooter}
                                onReady={this._handleTextReady}>
                                    <Text style={styles.date}>
                                        {data.question4.answer}
                                    </Text>
                                </ReadMore>
                            </View>
                        </View> : null}
                    </View>
                    <View style={{ marginTop: 20 }} />
                    <View style={styles.margin}>
                        <AwesomeButtonBlue type={"secondary"} onPress={() => {
                            this.viewJobListing(data.jobID);
                        }} stretch={true}>View Job Listing</AwesomeButtonBlue>
                    </View>
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <View style={styles.margin}>
                        <Text style={[styles.largeText, { fontWeight: "bold" }]}>Rate: <Text style={{ color: "red" }}>${data.hourly === true ? data.hourlyRate.toFixed(2) : data.ratePerProjectCompletion.toFixed(2)} {data.hourly === true ? "Per hour" : "Per entire project"}</Text></Text>
                        <Text style={[styles.mediumText, { marginTop: 5, fontWeight: "bold", marginBottom: 10, marginTop: 10 }]}>Duration - {data.duration}</Text>
                        <Text style={[styles.mediumText, { marginTop: 5, marginBottom: 10 }]}>Applied on {data.date}</Text>
                        <View style={{ marginTop: 10, marginBottom: 10 }}>
                            <Text style={[styles.mediumText, { fontWeight: "bold", color: "blue" }]}>Cover Letter:</Text>
                        </View>
                        <ReadMore
                        numberOfLines={3}
                        renderTruncatedFooter={this._renderTruncatedFooter}
                        renderRevealedFooter={this._renderRevealedFooter}
                        onReady={this._handleTextReady}>
                            <Text style={styles.mediumText}>
                                {data.coverLetterText}
                            </Text>
                        </ReadMore>
                        {typeof data.attachments !== "undefined" && data.attachments.length > 0 ? data.attachments.map((attachment, index) => {
                                return (
                                    <Fragment key={index}>
                                        <TouchableOpacity onPress={() => {
                                            this.handleAttachment(attachment);
                                        }}>
                                            <Text style={{ textAlign: 'center', fontSize: 15, marginTop: 15, fontWeight: "bold" }}>Attachment {index + 1}</Text>
                                            <Text style={{ textAlign: 'center', fontSize: 15, marginTop: 15 }}>{attachment.id}</Text>
                                        </TouchableOpacity>
                                    </Fragment>
                                );
                            }) : null}
                    </View>
                    <View style={styles.margin}>
                        <AwesomeButtonBlue type={"secondary"} onPress={() => {
                            this.viewJobListing(data.jobID);
                        }} stretch={true}>View Job Listing</AwesomeButtonBlue>
                    </View>
                </Fragment>
            );
        }
    }
    render() {
        const menu = <Side props={this.props} />;

        console.log("submittedProposals index.js props:", this.props);

        const job = this.props.props.route.params.job;

        const itemmm = this.props.props.route.params.item;
        return (
            <Fragment>
                <SideMenu openMenuOffset={width * 0.80} menuPosition={"right"} isOpen={this.state.menuOpen} menu={menu}>
                        <Header>
                            <Left>
                                <Button onPress={() => {
                                    this.props.props.navigation.goBack();
                                }} transparent>
                                    <Image source={require("../../../assets/icons/go-back.png")} style={styles.headerIcon} />
                                </Button>
                            </Left>
                            <Body>
                                <Title>Application</Title>
                                <Subtitle>{this.renderCategory(job.category)}</Subtitle>
                            </Body>
                            <Right />
                        </Header>
                        <Toast ref={(ref) => Toast.setRef(ref)} />
                        <TouchableOpacity onPress={() => {
                            this.setState({
                                menuOpen: !this.state.menuOpen
                            })
                        }} style={styles.bottomRightCorner}>
                            <Image source={require("../../../assets/icons/circle-menu.png")} style={styles.circleMenu} />
                        </TouchableOpacity>
                        <ScrollView contentContainerStyle={{ paddingBottom: 50 }} style={styles.container}>
                            <View style={styles.margin}>
                                <Text style={[styles.headerText, { fontSize: 22, fontWeight: "bold", color: "blue", textAlign: "center", marginBottom: 15 }]}> ~ JOB DATA ~ </Text>
                                <Text style={styles.headerText}>{job.title}</Text>
                                <View style={styles.hr} />
                                <Text style={styles.blueTextSmall}>{job.task}</Text>
                                <Text style={styles.posted}>Posted {moment(job.system_date).fromNow()}</Text>

                                <View style={styles.boxOne}>
                                    <View style={styles.row}>
                                        <Image source={require("../../../assets/icons/light.png")} style={{ maxWidth: 20, maxHeight: 20, marginRight: 10 }} />
                                        <Text>Specialized profiles can help boost your potential to get hired by clients. Specialized profiles showcase your specific skills and talents, select the profile that is best suited for each particular job!</Text>
                                    </View>
                                    <View style={styles.hr} />
                                    <View style={styles.row}>
                                        <Image source={require("../../../assets/icons/loc.png")} style={{ maxWidth: 20, maxHeight: 20, marginRight: 10 }} />
                                        <Text>{this.whoCanApply(job.whoCanApply)}</Text>
                                    </View>
                                    <Text style={{ color: "grey", fontWeight: "bold", marginTop: 15 }}><Text style={{ color: "blue" }}>6</Text> Tokens required to apply (<Text style={{ color: "blue" }}>50</Text> avaliable)</Text>
                                    <Text style={{ marginTop: 10 }}>Min amount earned to apply - <Text style={{ color: "blue", fontWeight: "bold" }}>${job.minAmountEarnedToApply}</Text></Text>
                                    <Text style={{ marginTop: 10 }}><Text style={{ color: "blue", fontWeight: "bold" }}>{job.coverLetterRequired === true ? "Cover letter required" : "NO cover letter required"}</Text></Text>
                                    <Text style={{ marginTop: 10 }}>Skill level: <Text style={{ fontWeight: "bold" }}>{job.skillLevel}</Text></Text>
                                    <Text style={{ marginTop: 10 }}>Category: <Text style={{ fontWeight: "bold" }}>{job.category}</Text></Text>
                                    <Text style={{ marginTop: 10 }}>Job success score: <Text style={{ fontWeight: "bold" }}>{this.calculateSuccessScore(job.jobSuccessScore)}</Text></Text>
                                    <Text style={{ marginTop: 10 }}>Posted on: {job.date}</Text>
                                </View>
                                <View style={styles.hr} />
                                <ReadMore
                                    numberOfLines={6}
                                    renderTruncatedFooter={this._renderTruncatedFooter}
                                    renderRevealedFooter={this._renderRevealedFooter}
                                    onReady={this._handleTextReady}>
                                    <Text style={styles.description}>{job.description}</Text>
                                </ReadMore>
                                <View style={styles.hr} />
                                <View style={styles.row}>
                                    <View style={styles.column}>
                                        <Text style={{ fontWeight: "bold", marginTop: 15 }}>{this.timePeriod(job.pricing.timeRequirement)}</Text>
                                        <Text>Hourly</Text>
                                        <Text style={{ fontWeight: "bold", marginTop: 15 }}>{this.skillLevel(job.skillLevel)}</Text>
                                        <Text>Experience Level</Text>
                                    </View>
                                    <View style={styles.column}>
                                        <Text style={{ fontWeight: "bold", marginTop: 15 }}>{this.lengthOfProject(job.pricing.lengthOfProject)}</Text>
                                        <Text>Duration</Text>
                                        <Text style={{ fontWeight: "bold", marginTop: 15 }}>{this.renderHourly(job.pricing.fixedOrHourly)}</Text>
                                        <Text>{job.pricing.fixedOrHourly === "hourly" ? "Hourly" : "Fixed"}</Text>
                                    </View>
                                </View>
                                <View style={styles.hr} />
                                <Text style={styles.headerText}>Skills & Expertise</Text>
                                <View>
                                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }} style={this.state.showMore === true ? styles.smaller : styles.larger}>
                                        {job.selectedTags.map((tag, index) => {
                                            return (
                                                <View key={index} style={styles.tagger}>
                                                    <Text style={styles.innerTag}>{tag}</Text>
                                                </View>
                                            );
                                        })}
                                    </ScrollView>
                                    <View style={[styles.row, { top: -30 }]}>
                                        <Image source={require("../../../assets/icons/both.png")} style={{ maxWidth: 35, maxHeight: 35, marginRight: 10 }} />
                                        <Text style={{ fontWeight: "bold", fontSize: 18, marginTop: 8 }}>Scroll right to see more tags</Text>
                                    </View>
                                </View>
                                <View style={styles.hr} />
                                {this.renderFreelancers()}
                                <View style={styles.hr} />
                                <Text style={styles.subText}>Questions required upon applying...</Text>
                                <List>
                                    {job.questionsBeforeApplying.map((question, index) => {
                                        return (
                                            <ListItem>
                                                <Text>{question}</Text>
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            </View>
                            <View style={styles.thickHr} />
                            <Text style={[styles.headerText, { fontSize: 22, fontWeight: "bold", color: "blue", textAlign: "center", marginBottom: 15, marginTop: 15 }]}> ~ APPLICATION DETAILS ~ </Text>
                            {this.renderContentTwo(itemmm)}
                        </ScrollView>
                </SideMenu>
            </Fragment>
        )
    }
}
export default AlreadySubmittedProposalsTwoHelper;