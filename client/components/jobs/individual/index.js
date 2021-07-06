import React, { Component, Fragment } from 'react';
import { View, Text, Image, ScrollView, Dimensions, TouchableOpacity, Platform } from 'react-native';
import styles from './styles.js';
import { Header, Left, Body, Right, Button, Title, Subtitle, List, ListItem, Item, Icon, Input, Textarea } from 'native-base';
import SideMenu from "react-native-side-menu";
import Side from "../../navigation/sidemenu/index.js";
import axios from 'axios';
import moment from 'moment';
import Config from "react-native-config";
import ReadMore from 'react-native-read-more-text';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import MapView, { Marker } from 'react-native-maps';
import RBSheet from "react-native-raw-bottom-sheet";
import RNPickerSelect from 'react-native-picker-select';
import { launchImageLibrary } from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import Tabs from 'react-native-tabs';
import _ from 'lodash';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Modal from 'react-native-modal';
import AwesomeAlert from 'react-native-awesome-alerts';
import { CometChat } from "@cometchat-pro/react-native-chat";
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from "rn-fetch-blob";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


const { height, width } = Dimensions.get("window");

const pickerStyle = {
    inputIOS: {
        color: 'white',
        paddingHorizontal: 10,
        backgroundColor: 'grey',
        borderRadius: 5,
        padding: 5
    },
    placeholder: {
        color: 'black',
        fontSize: 18,
        fontWeight: "bold"
    },
    inputAndroid: {
        color: 'black',
        paddingHorizontal: 10,
        backgroundColor: 'grey',
        borderRadius: 5,
        minWidth: width * 0.80,
        minHeight: 50,
        padding: 5
    },
};


class JobIndividualHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        profilePics: [],
        googlePhoto: null,
        milestoneCount: [],
        page: "first",
        showMore: false,
        myBid: 0,
        spinner: false,
        selectedMilestone: null,
        duration: "",
        milestone: false,
        question0: null,
        question1: null,
        question2: null,
        question3: null,
        question4: null,
        milestone1: {},
        milestone2: {},
        milestone3: {},
        milestone4: {},
        milestone5: {},
        milestone6: {},
        milestone7: {},
        milestone8: {},
        showAlert: false,
        showToast: false,
        isDatePickerVisible: false,
        region: {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
        attachments: [],
        subject: "",
        message: ""
    }
}
    componentDidMount() {
        const job = this.props.props.route.params.item;

        axios.post(`${Config.ngrok_url}/gather/users/location/only`, {
            id: job.poster
        }).then((res) => {
            if (res.data.message === "Gathered profile picture!") {
                console.log(res.data);

                const { googlePhoto, profilePics } = res.data;

                this.setState({
                    googlePhoto,
                    profilePics
                })
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    onRegionChange = (region) => {
        this.setState({ region });
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
    _renderTruncatedFooter = (handlePress) => {
        return (
          <Text style={{ color: "blue", marginTop: 5 }} onPress={handlePress}>
            Read more
          </Text>
        );
    }
     
    _renderRevealedFooter = (handlePress) => {
        return (
          <Text style={{ color: "blue", marginTop: 5 }} onPress={handlePress}>
            Show less
          </Text>
        );
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
    renderHourly = (rate) => {
        const job = this.props.props.route.params.item;

        if (rate === "hourly") {
            return `$${job.pricing.minHourly.toFixed(2)} - $${job.pricing.maxHourly.toFixed(2)}`;
        } else {
            return `Fixed Price - $${job.pricing.fixedBudgetPrice}`
        }
    }
    renderFreelancers = () => {
        const job = this.props.props.route.params.item;

        if (job.multipleOrSingularFreelancersRequired === "multiple-freelancers") {
            return <Text style={styles.freelancers}><Text style={{ color: "blue", fontWeight: "bold" }}>{job.numberOfFreelancersRequired}</Text> freelancers are required/desired.</Text>;
        } else {
            return <Text style={styles.freelancers}>Only <Text style={{ color: "blue", fontWeight: "bold" }}>ONE (1)</Text> freelancer is required.</Text>;
        }
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
    handleApplicationSubmit = () => {
        const job = this.props.props.route.params.item;

        const { 
            coverLetterText, 
            myBid, 
            duration, 
            question0, 
            question1, 
            question2, 
            question3, 
            question4, 
            milestone1,
            milestone2,
            milestone3,
            milestone4,
            milestone5,
            milestone6,
            milestone7,
            milestone8,
            milestone,
            attachments
        } = this.state;

        if (job.coverLetterRequired === true) {
            if (typeof coverLetterText !== "undefined" && coverLetterText.length > 0) {
                // handle request successfully
                switch (job.questionsBeforeApplying.length - 1) {
                    case 0:
                        console.log("one");
                        if (milestone === true) {
                            if (_.has(question0, "answer") && question0.answer.length > 0) {
                                axios.post(`${Config.ngrok_url}/apply/to/listing/job`, {
                                    question0, 
                                    question1: null, 
                                    question2: null, 
                                    question3: null, 
                                    question4: null,
                                    coverLetterText,
                                    milestone1,
                                    milestone2,
                                    milestone3,
                                    milestone4,
                                    milestone5,
                                    milestone6,
                                    milestone7,
                                    milestone8, 
                                    duration,
                                    otherUser: job.poster,
                                    signedInUser: this.props.unique_id,
                                    jobID: job.unique_id,
                                    tokenCount: job.tokensRequiredToApply,
                                    attachments,
                                    milestone,
                                    fullName: this.props.fullName
                                }).then((res) => {
                                    console.log(res.data);

                                    if (res.data.message === "NOT ENOUGH tokens to apply!") {
                                        this.setState({
                                            milestoneCount: [],
                                            myBid: 0,
                                            selectedMilestone: null,
                                            duration: "",
                                            milestone: false,
                                            question0: null,
                                            question1: null,
                                            question2: null,
                                            question3: null,
                                            question4: null,
                                            milestone1: {},
                                            milestone2: {},
                                            milestone3: {},
                                            milestone4: {},
                                            milestone5: {},
                                            milestone6: {},
                                            milestone7: {},
                                            milestone8: {},
                                            coverLetterText: "",
                                            coverLetterText: ""
                                        }, () => {
                                            this.RBSheetApply.close();
                                        });

                                        setTimeout(() => {
                                            this.setState({
                                                showToast: true
                                            })
                                        }, 1000);
                                    } else if (res.data.message === "Successfully executed logic!") {
                                        this.setState({
                                            milestoneCount: [],
                                            myBid: 0,
                                            selectedMilestone: null,
                                            duration: "",
                                            milestone: false,
                                            question0: null,
                                            question1: null,
                                            question2: null,
                                            question3: null,
                                            question4: null,
                                            milestone1: {},
                                            milestone2: {},
                                            milestone3: {},
                                            milestone4: {},
                                            milestone5: {},
                                            milestone6: {},
                                            milestone7: {},
                                            milestone8: {},
                                            coverLetterText: ""
                                        }, () => {
                                            this.RBSheetApply.close();

                                            setTimeout(() => {
                                                this.setState({
                                                    showAlert: true
                                                })
                                            }, 1000)
                                        })
                                    } else {
                                        console.log("err", res.data);
                                    }
                                }).catch((err) => {
                                    console.log(err);
                                })
                            } else {
                                Toast.show({
                                    type: "error",
                                    position: 'top',
                                    text1: 'PLEASE ANSWER THE REQUIRED QUESTIONS BEFORE PROCEEDING.',
                                    text2: "Please complete each required question for the client as requested...",
                                    visibilityTime: 4000
                                });
                            }
                        } else {
                            if (_.has(question0, "answer") && question0.answer.length > 0) {
                                axios.post(`${Config.ngrok_url}/apply/to/listing/job`, {
                                    question0, 
                                    question1: null, 
                                    question2: null, 
                                    question3: null, 
                                    question4: null,
                                    coverLetterText,
                                    myBid, 
                                    duration,
                                    otherUser: job.poster,
                                    signedInUser: this.props.unique_id,
                                    jobID: job.unique_id,
                                    tokenCount: job.tokensRequiredToApply,
                                    attachments,
                                    milestone,
                                    fullName: this.props.fullName
                                }).then((res) => {
                                    console.log(res.data);
    
                                    if (res.data.message === "NOT ENOUGH tokens to apply!") {
                                        this.setState({
                                            milestoneCount: [],
                                            myBid: 0,
                                            selectedMilestone: null,
                                            duration: "",
                                            milestone: false,
                                            question0: null,
                                            question1: null,
                                            question2: null,
                                            question3: null,
                                            question4: null,
                                            milestone1: {},
                                            milestone2: {},
                                            milestone3: {},
                                            milestone4: {},
                                            milestone5: {},
                                            milestone6: {},
                                            milestone7: {},
                                            milestone8: {},
                                            coverLetterText: ""
                                        }, () => {
                                            this.RBSheetApply.close();
                                        });

                                        setTimeout(() => {
                                            this.setState({
                                                showToast: true
                                            })
                                        }, 1000);
                                    } else if (res.data.message === "Successfully executed logic!") {
                                        this.setState({
                                            milestoneCount: [],
                                            myBid: 0,
                                            selectedMilestone: null,
                                            duration: "",
                                            milestone: false,
                                            question0: null,
                                            question1: null,
                                            question2: null,
                                            question3: null,
                                            question4: null,
                                            milestone1: {},
                                            milestone2: {},
                                            milestone3: {},
                                            milestone4: {},
                                            milestone5: {},
                                            milestone6: {},
                                            milestone7: {},
                                            milestone8: {},
                                            coverLetterText: ""
                                        }, () => {
                                            this.RBSheetApply.close();

                                            setTimeout(() => {
                                                this.setState({
                                                    showAlert: true
                                                })
                                            }, 1000)
                                        })
                                    } else {
                                        console.log("err", res.data);
                                    }
                                }).catch((err) => {
                                    console.log(err);
                                })
                            } else {
                                Toast.show({
                                    type: "error",
                                    position: 'top',
                                    text1: 'PLEASE ANSWER THE REQUIRED QUESTIONS BEFORE PROCEEDING.',
                                    text2: "Please complete each required question for the client as requested...",
                                    visibilityTime: 4000
                                });
                            }
                        }
                        break;
                    case 1: 
                        console.log("two");

                        if (milestone === true) {
                            if ((_.has(question0, "answer") && question0.answer.length > 0) && (_.has(question1, "answer") && question1.answer.length > 0)) {
                                axios.post(`${Config.ngrok_url}/apply/to/listing/job`, {
                                    question0, 
                                    question1, 
                                    question2: null, 
                                    question3: null, 
                                    question4: null,
                                    coverLetterText,
                                    milestone1,
                                    milestone2,
                                    milestone3,
                                    milestone4,
                                    milestone5,
                                    milestone6,
                                    milestone7,
                                    milestone8, 
                                    duration,
                                    otherUser: job.poster,
                                    signedInUser: this.props.unique_id,
                                    jobID: job.unique_id,
                                    tokenCount: job.tokensRequiredToApply,
                                    attachments,
                                    milestone,
                                    fullName: this.props.fullName
                                }).then((res) => {
                                    console.log(res.data);

                                    if (res.data.message === "NOT ENOUGH tokens to apply!") {
                                        this.setState({
                                            milestoneCount: [],
                                            myBid: 0,
                                            selectedMilestone: null,
                                            duration: "",
                                            milestone: false,
                                            question0: null,
                                            question1: null,
                                            question2: null,
                                            question3: null,
                                            question4: null,
                                            milestone1: {},
                                            milestone2: {},
                                            milestone3: {},
                                            milestone4: {},
                                            milestone5: {},
                                            milestone6: {},
                                            milestone7: {},
                                            milestone8: {},
                                            coverLetterText: ""
                                        }, () => {
                                            this.RBSheetApply.close();
                                        });

                                        setTimeout(() => {
                                            this.setState({
                                                showToast: true
                                            })
                                        }, 1000);
                                    } else if (res.data.message === "Successfully executed logic!") {
                                        this.setState({
                                            milestoneCount: [],
                                            myBid: 0,
                                            selectedMilestone: null,
                                            duration: "",
                                            milestone: false,
                                            question0: null,
                                            question1: null,
                                            question2: null,
                                            question3: null,
                                            question4: null,
                                            milestone1: {},
                                            milestone2: {},
                                            milestone3: {},
                                            milestone4: {},
                                            milestone5: {},
                                            milestone6: {},
                                            milestone7: {},
                                            milestone8: {},
                                            coverLetterText: ""
                                        }, () => {
                                            this.RBSheetApply.close();

                                            setTimeout(() => {
                                                this.setState({
                                                    showAlert: true
                                                })
                                            }, 1000)
                                        })
                                    } else {
                                        console.log("err", res.data);
                                    }
                                }).catch((err) => {
                                    console.log(err);
                                })
                            } else {
                                Toast.show({
                                    type: "error",
                                    position: 'top',
                                    text1: 'PLEASE ANSWER THE REQUIRED QUESTIONS BEFORE PROCEEDING.',
                                    text2: "Please complete each required question for the client as requested...",
                                    visibilityTime: 4000
                                });
                            }
                        } else {
                            if ((_.has(question0, "answer") && question0.answer.length > 0) && (_.has(question1, "answer") && question1.answer.length > 0)) {
                                axios.post(`${Config.ngrok_url}/apply/to/listing/job`, {
                                    question0, 
                                    question1, 
                                    question2: null, 
                                    question3: null, 
                                    question4: null,
                                    coverLetterText,
                                    myBid, 
                                    duration,
                                    otherUser: job.poster,
                                    signedInUser: this.props.unique_id,
                                    jobID: job.unique_id,
                                    tokenCount: job.tokensRequiredToApply,
                                    attachments,
                                    milestone,
                                    fullName: this.props.fullName
                                }).then((res) => {
                                    console.log(res.data);
    
                                    if (res.data.message === "NOT ENOUGH tokens to apply!") {
                                        this.setState({
                                            milestoneCount: [],
                                            myBid: 0,
                                            selectedMilestone: null,
                                            duration: "",
                                            milestone: false,
                                            question0: null,
                                            question1: null,
                                            question2: null,
                                            question3: null,
                                            question4: null,
                                            milestone1: {},
                                            milestone2: {},
                                            milestone3: {},
                                            milestone4: {},
                                            milestone5: {},
                                            milestone6: {},
                                            milestone7: {},
                                            milestone8: {},
                                            coverLetterText: ""
                                        }, () => {
                                            this.RBSheetApply.close();
                                        });

                                        setTimeout(() => {
                                            this.setState({
                                                showToast: true
                                            })
                                        }, 1000);
                                    } else if (res.data.message === "Successfully executed logic!") {
                                        this.setState({
                                            milestoneCount: [],
                                            myBid: 0,
                                            selectedMilestone: null,
                                            duration: "",
                                            milestone: false,
                                            question0: null,
                                            question1: null,
                                            question2: null,
                                            question3: null,
                                            question4: null,
                                            milestone1: {},
                                            milestone2: {},
                                            milestone3: {},
                                            milestone4: {},
                                            milestone5: {},
                                            milestone6: {},
                                            milestone7: {},
                                            milestone8: {},
                                            coverLetterText: ""
                                        }, () => {
                                            this.RBSheetApply.close();

                                            setTimeout(() => {
                                                this.setState({
                                                    showAlert: true
                                                })
                                            }, 1000)
                                        })
                                    } else {
                                        console.log("err", res.data);
                                    }
                                }).catch((err) => {
                                    console.log(err);
                                })
                            } else {
                                Toast.show({
                                    type: "error",
                                    position: 'top',
                                    text1: 'PLEASE ANSWER THE REQUIRED QUESTIONS BEFORE PROCEEDING.',
                                    text2: "Please complete each required question for the client as requested...",
                                    visibilityTime: 4000
                                });
                            }
                        }
                        break;
                    case 2: 
                        console.log("three");

                        if (milestone === true) {
                            if ((_.has(question0, "answer") && question0.answer.length > 0) && (_.has(question1, "answer") && question1.answer.length > 0) && (_.has(question2, "answer") && question2.answer.length > 0)) {
                                axios.post(`${Config.ngrok_url}/apply/to/listing/job`, {
                                    question0, 
                                    question1, 
                                    question2, 
                                    question3: null, 
                                    question4: null,
                                    coverLetterText,
                                    milestone1,
                                    milestone2,
                                    milestone3,
                                    milestone4,
                                    milestone5,
                                    milestone6,
                                    milestone7,
                                    milestone8, 
                                    duration,
                                    otherUser: job.poster,
                                    signedInUser: this.props.unique_id,
                                    jobID: job.unique_id,
                                    tokenCount: job.tokensRequiredToApply,
                                    attachments,
                                    milestone,
                                    fullName: this.props.fullName
                                }).then((res) => {
                                    console.log(res.data);
    
                                    if (res.data.message === "NOT ENOUGH tokens to apply!") {
                                        this.setState({
                                            milestoneCount: [],
                                            myBid: 0,
                                            selectedMilestone: null,
                                            duration: "",
                                            milestone: false,
                                            question0: null,
                                            question1: null,
                                            question2: null,
                                            question3: null,
                                            question4: null,
                                            milestone1: {},
                                            milestone2: {},
                                            milestone3: {},
                                            milestone4: {},
                                            milestone5: {},
                                            milestone6: {},
                                            milestone7: {},
                                            milestone8: {},
                                            coverLetterText: ""
                                        }, () => {
                                            this.RBSheetApply.close();
                                        });

                                        setTimeout(() => {
                                            this.setState({
                                                showToast: true
                                            })
                                        }, 1000);
                                    } else if (res.data.message === "Successfully executed logic!") {
                                        this.setState({
                                            milestoneCount: [],
                                            myBid: 0,
                                            selectedMilestone: null,
                                            duration: "",
                                            milestone: false,
                                            question0: null,
                                            question1: null,
                                            question2: null,
                                            question3: null,
                                            question4: null,
                                            milestone1: {},
                                            milestone2: {},
                                            milestone3: {},
                                            milestone4: {},
                                            milestone5: {},
                                            milestone6: {},
                                            milestone7: {},
                                            milestone8: {},
                                            coverLetterText: ""
                                        }, () => {
                                            this.RBSheetApply.close();

                                            setTimeout(() => {
                                                this.setState({
                                                    showAlert: true
                                                })
                                            }, 1000)
                                        })
                                    } else {
                                        console.log("err", res.data);
                                    }
                                }).catch((err) => {
                                    console.log(err);
                                })
                            } else {
                                Toast.show({
                                    type: "error",
                                    position: 'top',
                                    text1: 'PLEASE ANSWER THE REQUIRED QUESTIONS BEFORE PROCEEDING.',
                                    text2: "Please complete each required question for the client as requested...",
                                    visibilityTime: 4000
                                });
                            }
                        } else {
                            if ((_.has(question0, "answer") && question0.answer.length > 0) && (_.has(question1, "answer") && question1.answer.length > 0) && (_.has(question2, "answer") && question2.answer.length > 0)) {
                                axios.post(`${Config.ngrok_url}/apply/to/listing/job`, {
                                    question0, 
                                    question1, 
                                    question2, 
                                    question3: null, 
                                    question4: null,
                                    coverLetterText,
                                    myBid, 
                                    duration,
                                    otherUser: job.poster,
                                    signedInUser: this.props.unique_id,
                                    jobID: job.unique_id,
                                    tokenCount: job.tokensRequiredToApply,
                                    attachments,
                                    milestone,
                                    fullName: this.props.fullName
                                }).then((res) => {
                                    console.log(res.data);
    
                                    if (res.data.message === "NOT ENOUGH tokens to apply!") {
                                        this.setState({
                                            milestoneCount: [],
                                            myBid: 0,
                                            selectedMilestone: null,
                                            duration: "",
                                            milestone: false,
                                            question0: null,
                                            question1: null,
                                            question2: null,
                                            question3: null,
                                            question4: null,
                                            milestone1: {},
                                            milestone2: {},
                                            milestone3: {},
                                            milestone4: {},
                                            milestone5: {},
                                            milestone6: {},
                                            milestone7: {},
                                            milestone8: {},
                                            coverLetterText: ""
                                        }, () => {
                                            this.RBSheetApply.close();
                                        });

                                        setTimeout(() => {
                                            this.setState({
                                                showToast: true
                                            })
                                        }, 1000);
                                    } else if (res.data.message === "Successfully executed logic!") {
                                        this.setState({
                                            milestoneCount: [],
                                            myBid: 0,
                                            selectedMilestone: null,
                                            duration: "",
                                            milestone: false,
                                            question0: null,
                                            question1: null,
                                            question2: null,
                                            question3: null,
                                            question4: null,
                                            milestone1: {},
                                            milestone2: {},
                                            milestone3: {},
                                            milestone4: {},
                                            milestone5: {},
                                            milestone6: {},
                                            milestone7: {},
                                            milestone8: {},
                                            coverLetterText: ""
                                        }, () => {
                                            this.RBSheetApply.close();

                                            setTimeout(() => {
                                                this.setState({
                                                    showAlert: true
                                                })
                                            }, 1000)
                                        })
                                    } else {
                                        console.log("err", res.data);
                                    }
                                }).catch((err) => {
                                    console.log(err);
                                })
                            } else {
                                Toast.show({
                                    type: "error",
                                    position: 'top',
                                    text1: 'PLEASE ANSWER THE REQUIRED QUESTIONS BEFORE PROCEEDING.',
                                    text2: "Please complete each required question for the client as requested...",
                                    visibilityTime: 4000
                                });
                            }
                        }
                        break;
                    case 3: 
                        console.log("four");

                        if (milestone === true) {
                            if ((_.has(question0, "answer") && question0.answer.length > 0) && (_.has(question1, "answer") && question1.answer.length > 0) && (_.has(question2, "answer") && question2.answer.length > 0) && (_.has(question3, "answer") && question3.answer.length > 0)) {
                                axios.post(`${Config.ngrok_url}/apply/to/listing/job`, {
                                    question0, 
                                    question1, 
                                    question2, 
                                    question3, 
                                    question4: null,
                                    coverLetterText,
                                    milestone1,
                                    milestone2,
                                    milestone3,
                                    milestone4,
                                    milestone5,
                                    milestone6,
                                    milestone7,
                                    milestone8, 
                                    duration,
                                    otherUser: job.poster,
                                    signedInUser: this.props.unique_id,
                                    jobID: job.unique_id,
                                    tokenCount: job.tokensRequiredToApply,
                                    attachments,
                                    milestone,
                                    fullName: this.props.fullName
                                }).then((res) => {
                                    console.log(res.data);
    
                                    if (res.data.message === "NOT ENOUGH tokens to apply!") {
                                        this.setState({
                                            milestoneCount: [],
                                            myBid: 0,
                                            selectedMilestone: null,
                                            duration: "",
                                            milestone: false,
                                            question0: null,
                                            question1: null,
                                            question2: null,
                                            question3: null,
                                            question4: null,
                                            milestone1: {},
                                            milestone2: {},
                                            milestone3: {},
                                            milestone4: {},
                                            milestone5: {},
                                            milestone6: {},
                                            milestone7: {},
                                            milestone8: {},
                                            coverLetterText: ""
                                        }, () => {
                                            this.RBSheetApply.close();
                                        });

                                        setTimeout(() => {
                                            this.setState({
                                                showToast: true
                                            })
                                        }, 1000);
                                    } else if (res.data.message === "Successfully executed logic!") {
                                        this.setState({
                                            milestoneCount: [],
                                            myBid: 0,
                                            selectedMilestone: null,
                                            duration: "",
                                            milestone: false,
                                            question0: null,
                                            question1: null,
                                            question2: null,
                                            question3: null,
                                            question4: null,
                                            milestone1: {},
                                            milestone2: {},
                                            milestone3: {},
                                            milestone4: {},
                                            milestone5: {},
                                            milestone6: {},
                                            milestone7: {},
                                            milestone8: {},
                                            coverLetterText: ""
                                        }, () => {
                                            this.RBSheetApply.close();

                                            setTimeout(() => {
                                                this.setState({
                                                    showAlert: true
                                                })
                                            }, 1000)
                                        })
                                    } else {
                                        console.log("err", res.data);
                                    }
                                }).catch((err) => {
                                    console.log(err);
                                })
                            } else {
                                Toast.show({
                                    type: "error",
                                    position: 'top',
                                    text1: 'PLEASE ANSWER THE REQUIRED QUESTIONS BEFORE PROCEEDING.',
                                    text2: "Please complete each required question for the client as requested...",
                                    visibilityTime: 4000
                                });
                            }
                        } else {
                            if (milestone === true) {
                                if ((_.has(question0, "answer") && question0.answer.length > 0) && (_.has(question1, "answer") && question1.answer.length > 0) && (_.has(question2, "answer") && question2.answer.length > 0) && (_.has(question3, "answer") && question3.answer.length > 0)) {
                                    axios.post(`${Config.ngrok_url}/apply/to/listing/job`, {
                                        question0, 
                                        question1, 
                                        question2, 
                                        question3, 
                                        question4: null,
                                        coverLetterText,
                                        milestone1,
                                        milestone2,
                                        milestone3,
                                        milestone4,
                                        milestone5,
                                        milestone6,
                                        milestone7,
                                        milestone8, 
                                        duration,
                                        otherUser: job.poster,
                                        signedInUser: this.props.unique_id,
                                        jobID: job.unique_id,
                                        tokenCount: job.tokensRequiredToApply,
                                        attachments,
                                        milestone,
                                        fullName: this.props.fullName
                                    }).then((res) => {
                                        console.log(res.data);
        
                                        if (res.data.message === "NOT ENOUGH tokens to apply!") {
                                        this.setState({
                                            milestoneCount: [],
                                            myBid: 0,
                                            selectedMilestone: null,
                                            duration: "",
                                            milestone: false,
                                            question0: null,
                                            question1: null,
                                            question2: null,
                                            question3: null,
                                            question4: null,
                                            milestone1: {},
                                            milestone2: {},
                                            milestone3: {},
                                            milestone4: {},
                                            milestone5: {},
                                            milestone6: {},
                                            milestone7: {},
                                            milestone8: {},
                                            coverLetterText: ""
                                        }, () => {
                                            this.RBSheetApply.close();
                                        });

                                        setTimeout(() => {
                                            this.setState({
                                                showToast: true
                                            })
                                        }, 1000);
                                    } else if (res.data.message === "Successfully executed logic!") {
                                        this.setState({
                                            milestoneCount: [],
                                            myBid: 0,
                                            selectedMilestone: null,
                                            duration: "",
                                            milestone: false,
                                            question0: null,
                                            question1: null,
                                            question2: null,
                                            question3: null,
                                            question4: null,
                                            milestone1: {},
                                            milestone2: {},
                                            milestone3: {},
                                            milestone4: {},
                                            milestone5: {},
                                            milestone6: {},
                                            milestone7: {},
                                            milestone8: {},
                                            coverLetterText: ""
                                        }, () => {
                                            this.RBSheetApply.close();

                                            setTimeout(() => {
                                                this.setState({
                                                    showAlert: true
                                                })
                                            }, 1000)
                                        })
                                    } else {
                                        console.log("err", res.data);
                                    }
                                    }).catch((err) => {
                                        console.log(err);
                                    })
                                } else {
                                    Toast.show({
                                        type: "error",
                                        position: 'top',
                                        text1: 'PLEASE ANSWER THE REQUIRED QUESTIONS BEFORE PROCEEDING.',
                                        text2: "Please complete each required question for the client as requested...",
                                        visibilityTime: 4000
                                    });
                                }
                            } else {
                                if ((_.has(question0, "answer") && question0.answer.length > 0) && (_.has(question1, "answer") && question1.answer.length > 0) && (_.has(question2, "answer") && question2.answer.length > 0) && (_.has(question3, "answer") && question3.answer.length > 0)) {
                                    axios.post(`${Config.ngrok_url}/apply/to/listing/job`, {
                                        question0, 
                                        question1, 
                                        question2, 
                                        question3, 
                                        question4: null,
                                        coverLetterText,
                                        myBid, 
                                        duration,
                                        otherUser: job.poster,
                                        signedInUser: this.props.unique_id,
                                        jobID: job.unique_id,
                                        tokenCount: job.tokensRequiredToApply,
                                        attachments,
                                        milestone,
                                        fullName: this.props.fullName
                                    }).then((res) => {
                                        console.log(res.data);
        
                                        if (res.data.message === "NOT ENOUGH tokens to apply!") {
                                        this.setState({
                                            milestoneCount: [],
                                            myBid: 0,
                                            selectedMilestone: null,
                                            duration: "",
                                            milestone: false,
                                            question0: null,
                                            question1: null,
                                            question2: null,
                                            question3: null,
                                            question4: null,
                                            milestone1: {},
                                            milestone2: {},
                                            milestone3: {},
                                            milestone4: {},
                                            milestone5: {},
                                            milestone6: {},
                                            milestone7: {},
                                            milestone8: {},
                                            coverLetterText: ""
                                        }, () => {
                                            this.RBSheetApply.close();
                                        });

                                        setTimeout(() => {
                                            this.setState({
                                                showToast: true
                                            })
                                        }, 1000);
                                    } else if (res.data.message === "Successfully executed logic!") {
                                        this.setState({
                                            milestoneCount: [],
                                            myBid: 0,
                                            selectedMilestone: null,
                                            duration: "",
                                            milestone: false,
                                            question0: null,
                                            question1: null,
                                            question2: null,
                                            question3: null,
                                            question4: null,
                                            milestone1: {},
                                            milestone2: {},
                                            milestone3: {},
                                            milestone4: {},
                                            milestone5: {},
                                            milestone6: {},
                                            milestone7: {},
                                            milestone8: {},
                                            coverLetterText: ""
                                        }, () => {
                                            this.RBSheetApply.close();

                                            setTimeout(() => {
                                                this.setState({
                                                    showAlert: true
                                                })
                                            }, 1000)
                                        })
                                    } else {
                                        console.log("err", res.data);
                                    }
                                    }).catch((err) => {
                                        console.log(err);
                                    })
                                } else {
                                    Toast.show({
                                        type: "error",
                                        position: 'top',
                                        text1: 'PLEASE ANSWER THE REQUIRED QUESTIONS BEFORE PROCEEDING.',
                                        text2: "Please complete each required question for the client as requested...",
                                        visibilityTime: 4000
                                    });
                                }
                            }
                        }
                        break;
                    case 4: 
                        console.log("five");

                        if (milestone === true) {
                            if ((_.has(question0, "answer") && question0.answer.length > 0) && (_.has(question1, "answer") && question1.answer.length > 0) && (_.has(question2, "answer") && question2.answer.length > 0) && (_.has(question3, "answer") && question3.answer.length > 0) && (_.has(question4, "answer") && question4.answer.length > 0)) {
                                axios.post(`${Config.ngrok_url}/apply/to/listing/job`, {
                                    question0, 
                                    question1, 
                                    question2, 
                                    question3, 
                                    question4,
                                    coverLetterText,
                                    milestone1,
                                    milestone2,
                                    milestone3,
                                    milestone4,
                                    milestone5,
                                    milestone6,
                                    milestone7,
                                    milestone8, 
                                    duration,
                                    otherUser: job.poster,
                                    signedInUser: this.props.unique_id,
                                    jobID: job.unique_id,
                                    tokenCount: job.tokensRequiredToApply,
                                    attachments,
                                    milestone,
                                    fullName: this.props.fullName
                                }).then((res) => {
                                    console.log(res.data);
    
                                    if (res.data.message === "NOT ENOUGH tokens to apply!") {
                                        this.setState({
                                            milestoneCount: [],
                                            myBid: 0,
                                            selectedMilestone: null,
                                            duration: "",
                                            milestone: false,
                                            question0: null,
                                            question1: null,
                                            question2: null,
                                            question3: null,
                                            question4: null,
                                            milestone1: {},
                                            milestone2: {},
                                            milestone3: {},
                                            milestone4: {},
                                            milestone5: {},
                                            milestone6: {},
                                            milestone7: {},
                                            milestone8: {},
                                            coverLetterText: ""
                                        }, () => {
                                            this.RBSheetApply.close();
                                        });

                                        setTimeout(() => {
                                            this.setState({
                                                showToast: true
                                            })
                                        }, 1000);
                                    } else if (res.data.message === "Successfully executed logic!") {
                                        this.setState({
                                            milestoneCount: [],
                                            myBid: 0,
                                            selectedMilestone: null,
                                            duration: "",
                                            milestone: false,
                                            question0: null,
                                            question1: null,
                                            question2: null,
                                            question3: null,
                                            question4: null,
                                            milestone1: {},
                                            milestone2: {},
                                            milestone3: {},
                                            milestone4: {},
                                            milestone5: {},
                                            milestone6: {},
                                            milestone7: {},
                                            milestone8: {},
                                            coverLetterText: ""
                                        }, () => {
                                            this.RBSheetApply.close();

                                            setTimeout(() => {
                                                this.setState({
                                                    showAlert: true
                                                })
                                            }, 1000)
                                        })
                                    } else {
                                        console.log("err", res.data);
                                    }
                                }).catch((err) => {
                                    console.log(err);
                                })
                            } else {
                                Toast.show({
                                    type: "error",
                                    position: 'top',
                                    text1: 'PLEASE ANSWER THE REQUIRED QUESTIONS BEFORE PROCEEDING.',
                                    text2: "Please complete each required question for the client as requested...",
                                    visibilityTime: 4000
                                });
                            }
                        } else {
                            if ((_.has(question0, "answer") && question0.answer.length > 0) && (_.has(question1, "answer") && question1.answer.length > 0) && (_.has(question2, "answer") && question2.answer.length > 0) && (_.has(question3, "answer") && question3.answer.length > 0) && (_.has(question4, "answer") && question4.answer.length > 0)) {
                                axios.post(`${Config.ngrok_url}/apply/to/listing/job`, {
                                    question0, 
                                    question1, 
                                    question2, 
                                    question3, 
                                    question4,
                                    coverLetterText,
                                    myBid, 
                                    duration,
                                    otherUser: job.poster,
                                    signedInUser: this.props.unique_id,
                                    jobID: job.unique_id,
                                    tokenCount: job.tokensRequiredToApply,
                                    attachments,
                                    milestone,
                                    fullName: this.props.fullName
                                }).then((res) => {
                                    console.log(res.data);
    
                                    if (res.data.message === "NOT ENOUGH tokens to apply!") {
                                        this.setState({
                                            milestoneCount: [],
                                            myBid: 0,
                                            selectedMilestone: null,
                                            duration: "",
                                            milestone: false,
                                            question0: null,
                                            question1: null,
                                            question2: null,
                                            question3: null,
                                            question4: null,
                                            milestone1: {},
                                            milestone2: {},
                                            milestone3: {},
                                            milestone4: {},
                                            milestone5: {},
                                            milestone6: {},
                                            milestone7: {},
                                            milestone8: {},
                                            coverLetterText: ""
                                        }, () => {
                                            this.RBSheetApply.close();
                                        });

                                        setTimeout(() => {
                                            this.setState({
                                                showToast: true
                                            })
                                        }, 1000);
                                    } else if (res.data.message === "Successfully executed logic!") {
                                        this.setState({
                                            milestoneCount: [],
                                            myBid: 0,
                                            selectedMilestone: null,
                                            duration: "",
                                            milestone: false,
                                            question0: null,
                                            question1: null,
                                            question2: null,
                                            question3: null,
                                            question4: null,
                                            milestone1: {},
                                            milestone2: {},
                                            milestone3: {},
                                            milestone4: {},
                                            milestone5: {},
                                            milestone6: {},
                                            milestone7: {},
                                            milestone8: {},
                                            coverLetterText: ""
                                        }, () => {
                                            this.RBSheetApply.close();

                                            setTimeout(() => {
                                                this.setState({
                                                    showAlert: true
                                                })
                                            }, 1000)
                                        })
                                    } else {
                                        console.log("err", res.data);
                                    }
                                }).catch((err) => {
                                    console.log(err);
                                })
                            } else {
                                Toast.show({
                                    type: "error",
                                    position: 'top',
                                    text1: 'PLEASE ANSWER THE REQUIRED QUESTIONS BEFORE PROCEEDING.',
                                    text2: "Please complete each required question for the client as requested...",
                                    visibilityTime: 4000
                                });
                            }
                        }
                        break;
                    default:
                        break;
                }
            } else {
                Toast.show({
                    type: "error",
                    position: 'top',
                    text1: 'COVER LETTER IS REQUIRED.',
                    text2: "You *must* submit a cover letter for this proposal...",
                    visibilityTime: 4000
                });
            }
        } else {
            switch (job.questionsBeforeApplying.length - 1) {
                case 0:
                    console.log("one");
                    if (milestone === true) {
                        if (_.has(question0, "answer") && question0.answer.length > 0) {
                            axios.post(`${Config.ngrok_url}/apply/to/listing/job`, {
                                question0, 
                                question1: null, 
                                question2: null, 
                                question3: null, 
                                question4: null,
                                coverLetterText,
                                milestone1,
                                milestone2,
                                milestone3,
                                milestone4,
                                milestone5,
                                milestone6,
                                milestone7,
                                milestone8, 
                                duration,
                                otherUser: job.poster,
                                signedInUser: this.props.unique_id,
                                jobID: job.unique_id,
                                tokenCount: job.tokensRequiredToApply,
                                attachments,
                                milestone,
                                fullName: this.props.fullName
                            }).then((res) => {
                                console.log(res.data);

                                if (res.data.message === "NOT ENOUGH tokens to apply!") {

                                    this.setState({
                                        milestoneCount: [],
                                        myBid: 0,
                                        selectedMilestone: null,
                                        duration: "",
                                        milestone: false,
                                        question0: null,
                                        question1: null,
                                        question2: null,
                                        question3: null,
                                        question4: null,
                                        milestone1: {},
                                        milestone2: {},
                                        milestone3: {},
                                        milestone4: {},
                                        milestone5: {},
                                        milestone6: {},
                                        milestone7: {},
                                        milestone8: {},
                                        coverLetterText: ""
                                    }, () => {
                                        this.RBSheetApply.close();
                                    });

                                    setTimeout(() => {
                                        this.setState({
                                            showToast: true
                                        })
                                    }, 1000);
                                } else if (res.data.message === "Successfully executed logic!") {
                                    this.setState({
                                        milestoneCount: [],
                                        myBid: 0,
                                        selectedMilestone: null,
                                        duration: "",
                                        milestone: false,
                                        question0: null,
                                        question1: null,
                                        question2: null,
                                        question3: null,
                                        question4: null,
                                        milestone1: {},
                                        milestone2: {},
                                        milestone3: {},
                                        milestone4: {},
                                        milestone5: {},
                                        milestone6: {},
                                        milestone7: {},
                                        milestone8: {},
                                        coverLetterText: ""
                                    }, () => {
                                        this.RBSheetApply.close();

                                        setTimeout(() => {
                                            this.setState({
                                                showAlert: true
                                            })
                                        }, 1000)
                                    })
                                } else {
                                    console.log("err", res.data);
                                }
                            }).catch((err) => {
                                console.log(err);
                            })
                        } else {
                            Toast.show({
                                type: "error",
                                position: 'top',
                                text1: 'PLEASE ANSWER THE REQUIRED QUESTIONS BEFORE PROCEEDING.',
                                text2: "Please complete each required question for the client as requested...",
                                visibilityTime: 4000
                            });
                        }
                    } else {
                        if (_.has(question0, "answer") && question0.answer.length > 0) {
                            axios.post(`${Config.ngrok_url}/apply/to/listing/job`, {
                                question0, 
                                question1: null, 
                                question2: null, 
                                question3: null, 
                                question4: null,
                                coverLetterText,
                                myBid, 
                                duration,
                                otherUser: job.poster,
                                signedInUser: this.props.unique_id,
                                jobID: job.unique_id,
                                tokenCount: job.tokensRequiredToApply,
                                attachments,
                                milestone,
                                fullName: this.props.fullName
                            }).then((res) => {
                                console.log(res.data);

                                if (res.data.message === "NOT ENOUGH tokens to apply!") {
                                    this.setState({
                                        milestoneCount: [],
                                        myBid: 0,
                                        selectedMilestone: null,
                                        duration: "",
                                        milestone: false,
                                        question0: null,
                                        question1: null,
                                        question2: null,
                                        question3: null,
                                        question4: null,
                                        milestone1: {},
                                        milestone2: {},
                                        milestone3: {},
                                        milestone4: {},
                                        milestone5: {},
                                        milestone6: {},
                                        milestone7: {},
                                        milestone8: {},
                                        coverLetterText: ""
                                    }, () => {
                                        this.RBSheetApply.close();
                                    });

                                    setTimeout(() => {
                                        this.setState({
                                            showToast: true
                                        })
                                    }, 1000);
                                } else if (res.data.message === "Successfully executed logic!") {
                                    this.setState({
                                        milestoneCount: [],
                                        myBid: 0,
                                        selectedMilestone: null,
                                        duration: "",
                                        milestone: false,
                                        question0: null,
                                        question1: null,
                                        question2: null,
                                        question3: null,
                                        question4: null,
                                        milestone1: {},
                                        milestone2: {},
                                        milestone3: {},
                                        milestone4: {},
                                        milestone5: {},
                                        milestone6: {},
                                        milestone7: {},
                                        milestone8: {},
                                        coverLetterText: ""
                                    }, () => {
                                        this.RBSheetApply.close();

                                        setTimeout(() => {
                                            this.setState({
                                                showAlert: true
                                            })
                                        }, 1000)
                                    })
                                } else {
                                    console.log("err", res.data);
                                }
                            }).catch((err) => {
                                console.log(err);
                            })
                        } else {
                            Toast.show({
                                type: "error",
                                position: 'top',
                                text1: 'PLEASE ANSWER THE REQUIRED QUESTIONS BEFORE PROCEEDING.',
                                text2: "Please complete each required question for the client as requested...",
                                visibilityTime: 4000
                            });
                        }
                    }
                    break;
                case 1: 
                    console.log("two");

                    if (milestone === true) {
                        if ((_.has(question0, "answer") && question0.answer.length > 0) && (_.has(question1, "answer") && question1.answer.length > 0)) {
                            axios.post(`${Config.ngrok_url}/apply/to/listing/job`, {
                                question0, 
                                question1, 
                                question2: null, 
                                question3: null, 
                                question4: null,
                                coverLetterText,
                                milestone1,
                                milestone2,
                                milestone3,
                                milestone4,
                                milestone5,
                                milestone6,
                                milestone7,
                                milestone8, 
                                duration,
                                otherUser: job.poster,
                                signedInUser: this.props.unique_id,
                                jobID: job.unique_id,
                                tokenCount: job.tokensRequiredToApply,
                                attachments,
                                milestone,
                                fullName: this.props.fullName
                            }).then((res) => {
                                console.log(res.data);

                                if (res.data.message === "NOT ENOUGH tokens to apply!") {
                                    this.setState({
                                        milestoneCount: [],
                                        myBid: 0,
                                        selectedMilestone: null,
                                        duration: "",
                                        milestone: false,
                                        question0: null,
                                        question1: null,
                                        question2: null,
                                        question3: null,
                                        question4: null,
                                        milestone1: {},
                                        milestone2: {},
                                        milestone3: {},
                                        milestone4: {},
                                        milestone5: {},
                                        milestone6: {},
                                        milestone7: {},
                                        milestone8: {},
                                        coverLetterText: ""
                                    }, () => {
                                        this.RBSheetApply.close();
                                    });

                                    setTimeout(() => {
                                        this.setState({
                                            showToast: true
                                        })
                                    }, 1000);
                                } else if (res.data.message === "Successfully executed logic!") {
                                    this.setState({
                                        milestoneCount: [],
                                        myBid: 0,
                                        selectedMilestone: null,
                                        duration: "",
                                        milestone: false,
                                        question0: null,
                                        question1: null,
                                        question2: null,
                                        question3: null,
                                        question4: null,
                                        milestone1: {},
                                        milestone2: {},
                                        milestone3: {},
                                        milestone4: {},
                                        milestone5: {},
                                        milestone6: {},
                                        milestone7: {},
                                        milestone8: {},
                                        coverLetterText: ""
                                    }, () => {
                                        this.RBSheetApply.close();

                                        setTimeout(() => {
                                            this.setState({
                                                showAlert: true
                                            })
                                        }, 1000)
                                    })
                                } else {
                                    console.log("err", res.data);
                                }
                            }).catch((err) => {
                                console.log(err);
                            })
                        } else {
                            Toast.show({
                                type: "error",
                                position: 'top',
                                text1: 'PLEASE ANSWER THE REQUIRED QUESTIONS BEFORE PROCEEDING.',
                                text2: "Please complete each required question for the client as requested...",
                                visibilityTime: 4000
                            });
                        }
                    } else {
                        if ((_.has(question0, "answer") && question0.answer.length > 0) && (_.has(question1, "answer") && question1.answer.length > 0)) {
                            axios.post(`${Config.ngrok_url}/apply/to/listing/job`, {
                                question0, 
                                question1, 
                                question2: null, 
                                question3: null, 
                                question4: null,
                                coverLetterText,
                                myBid, 
                                duration,
                                otherUser: job.poster,
                                signedInUser: this.props.unique_id,
                                jobID: job.unique_id,
                                tokenCount: job.tokensRequiredToApply,
                                attachments,
                                milestone,
                                fullName: this.props.fullName
                            }).then((res) => {
                                console.log(res.data);

                                if (res.data.message === "NOT ENOUGH tokens to apply!") {
                                    this.setState({
                                        milestoneCount: [],
                                        myBid: 0,
                                        selectedMilestone: null,
                                        duration: "",
                                        milestone: false,
                                        question0: null,
                                        question1: null,
                                        question2: null,
                                        question3: null,
                                        question4: null,
                                        milestone1: {},
                                        milestone2: {},
                                        milestone3: {},
                                        milestone4: {},
                                        milestone5: {},
                                        milestone6: {},
                                        milestone7: {},
                                        milestone8: {},
                                        coverLetterText: ""
                                    }, () => {
                                        this.RBSheetApply.close();
                                    });

                                    setTimeout(() => {
                                        this.setState({
                                            showToast: true
                                        })
                                    }, 1000);
                                } else if (res.data.message === "Successfully executed logic!") {
                                    this.setState({
                                        milestoneCount: [],
                                        myBid: 0,
                                        selectedMilestone: null,
                                        duration: "",
                                        milestone: false,
                                        question0: null,
                                        question1: null,
                                        question2: null,
                                        question3: null,
                                        question4: null,
                                        milestone1: {},
                                        milestone2: {},
                                        milestone3: {},
                                        milestone4: {},
                                        milestone5: {},
                                        milestone6: {},
                                        milestone7: {},
                                        milestone8: {},
                                        coverLetterText: ""
                                    }, () => {
                                        this.RBSheetApply.close();

                                        setTimeout(() => {
                                            this.setState({
                                                showAlert: true
                                            })
                                        }, 1000)
                                    })
                                } else {
                                    console.log("err", res.data);
                                }
                            }).catch((err) => {
                                console.log(err);
                            })
                        } else {
                            Toast.show({
                                type: "error",
                                position: 'top',
                                text1: 'PLEASE ANSWER THE REQUIRED QUESTIONS BEFORE PROCEEDING.',
                                text2: "Please complete each required question for the client as requested...",
                                visibilityTime: 4000
                            });
                        }
                    }
                    break;
                case 2: 
                    console.log("three");

                    if (milestone === true) {
                        if ((_.has(question0, "answer") && question0.answer.length > 0) && (_.has(question1, "answer") && question1.answer.length > 0) && (_.has(question2, "answer") && question2.answer.length > 0)) {
                            axios.post(`${Config.ngrok_url}/apply/to/listing/job`, {
                                question0, 
                                question1, 
                                question2, 
                                question3: null, 
                                question4: null,
                                coverLetterText,
                                milestone1,
                                milestone2,
                                milestone3,
                                milestone4,
                                milestone5,
                                milestone6,
                                milestone7,
                                milestone8, 
                                duration,
                                otherUser: job.poster,
                                signedInUser: this.props.unique_id,
                                jobID: job.unique_id,
                                tokenCount: job.tokensRequiredToApply,
                                attachments,
                                milestone,
                                fullName: this.props.fullName
                            }).then((res) => {
                                console.log(res.data);

                                if (res.data.message === "NOT ENOUGH tokens to apply!") {
                                    this.setState({
                                        milestoneCount: [],
                                        myBid: 0,
                                        selectedMilestone: null,
                                        duration: "",
                                        milestone: false,
                                        question0: null,
                                        question1: null,
                                        question2: null,
                                        question3: null,
                                        question4: null,
                                        milestone1: {},
                                        milestone2: {},
                                        milestone3: {},
                                        milestone4: {},
                                        milestone5: {},
                                        milestone6: {},
                                        milestone7: {},
                                        milestone8: {},
                                        coverLetterText: ""
                                    }, () => {
                                        this.RBSheetApply.close();
                                    });

                                    setTimeout(() => {
                                        this.setState({
                                            showToast: true
                                        })
                                    }, 1000);
                                } else if (res.data.message === "Successfully executed logic!") {
                                    this.setState({
                                        milestoneCount: [],
                                        myBid: 0,
                                        selectedMilestone: null,
                                        duration: "",
                                        milestone: false,
                                        question0: null,
                                        question1: null,
                                        question2: null,
                                        question3: null,
                                        question4: null,
                                        milestone1: {},
                                        milestone2: {},
                                        milestone3: {},
                                        milestone4: {},
                                        milestone5: {},
                                        milestone6: {},
                                        milestone7: {},
                                        milestone8: {},
                                        coverLetterText: ""
                                    }, () => {
                                        this.RBSheetApply.close();

                                        setTimeout(() => {
                                            this.setState({
                                                showAlert: true
                                            })
                                        }, 1000)
                                    })
                                } else {
                                    console.log("err", res.data);
                                }
                            }).catch((err) => {
                                console.log(err);
                            })
                        } else {
                            Toast.show({
                                type: "error",
                                position: 'top',
                                text1: 'PLEASE ANSWER THE REQUIRED QUESTIONS BEFORE PROCEEDING.',
                                text2: "Please complete each required question for the client as requested...",
                                visibilityTime: 4000
                            });
                        }
                    } else {
                        if ((_.has(question0, "answer") && question0.answer.length > 0) && (_.has(question1, "answer") && question1.answer.length > 0) && (_.has(question2, "answer") && question2.answer.length > 0)) {
                            axios.post(`${Config.ngrok_url}/apply/to/listing/job`, {
                                question0, 
                                question1, 
                                question2, 
                                question3: null, 
                                question4: null,
                                coverLetterText,
                                myBid, 
                                duration,
                                otherUser: job.poster,
                                signedInUser: this.props.unique_id,
                                jobID: job.unique_id,
                                tokenCount: job.tokensRequiredToApply,
                                attachments,
                                milestone,
                                fullName: this.props.fullName
                            }).then((res) => {
                                console.log(res.data);

                                if (res.data.message === "NOT ENOUGH tokens to apply!") {
                                    this.setState({
                                        milestoneCount: [],
                                        myBid: 0,
                                        selectedMilestone: null,
                                        duration: "",
                                        milestone: false,
                                        question0: null,
                                        question1: null,
                                        question2: null,
                                        question3: null,
                                        question4: null,
                                        milestone1: {},
                                        milestone2: {},
                                        milestone3: {},
                                        milestone4: {},
                                        milestone5: {},
                                        milestone6: {},
                                        milestone7: {},
                                        milestone8: {},
                                        coverLetterText: ""
                                    }, () => {
                                        this.RBSheetApply.close();
                                    });

                                    setTimeout(() => {
                                        this.setState({
                                            showToast: true
                                        })
                                    }, 1000);
                                } else if (res.data.message === "Successfully executed logic!") {
                                    this.setState({
                                        milestoneCount: [],
                                        myBid: 0,
                                        selectedMilestone: null,
                                        duration: "",
                                        milestone: false,
                                        question0: null,
                                        question1: null,
                                        question2: null,
                                        question3: null,
                                        question4: null,
                                        milestone1: {},
                                        milestone2: {},
                                        milestone3: {},
                                        milestone4: {},
                                        milestone5: {},
                                        milestone6: {},
                                        milestone7: {},
                                        milestone8: {},
                                        coverLetterText: ""
                                    }, () => {
                                        this.RBSheetApply.close();

                                        setTimeout(() => {
                                            this.setState({
                                                showAlert: true
                                            })
                                        }, 1000)
                                    })
                                } else {
                                    console.log("err", res.data);
                                }
                            }).catch((err) => {
                                console.log(err);
                            })
                        } else {
                            Toast.show({
                                type: "error",
                                position: 'top',
                                text1: 'PLEASE ANSWER THE REQUIRED QUESTIONS BEFORE PROCEEDING.',
                                text2: "Please complete each required question for the client as requested...",
                                visibilityTime: 4000
                            });
                        }
                    }
                    break;
                case 3: 
                    console.log("four");

                    if (milestone === true) {
                        if ((_.has(question0, "answer") && question0.answer.length > 0) && (_.has(question1, "answer") && question1.answer.length > 0) && (_.has(question2, "answer") && question2.answer.length > 0) && (_.has(question3, "answer") && question3.answer.length > 0)) {
                            axios.post(`${Config.ngrok_url}/apply/to/listing/job`, {
                                question0, 
                                question1, 
                                question2, 
                                question3, 
                                question4: null,
                                coverLetterText,
                                milestone1,
                                milestone2,
                                milestone3,
                                milestone4,
                                milestone5,
                                milestone6,
                                milestone7,
                                milestone8, 
                                duration,
                                otherUser: job.poster,
                                signedInUser: this.props.unique_id,
                                jobID: job.unique_id,
                                tokenCount: job.tokensRequiredToApply,
                                attachments,
                                milestone,
                                fullName: this.props.fullName
                            }).then((res) => {
                                console.log(res.data);

                                if (res.data.message === "NOT ENOUGH tokens to apply!") {
                                    this.setState({
                                        milestoneCount: [],
                                        myBid: 0,
                                        selectedMilestone: null,
                                        duration: "",
                                        milestone: false,
                                        question0: null,
                                        question1: null,
                                        question2: null,
                                        question3: null,
                                        question4: null,
                                        milestone1: {},
                                        milestone2: {},
                                        milestone3: {},
                                        milestone4: {},
                                        milestone5: {},
                                        milestone6: {},
                                        milestone7: {},
                                        milestone8: {},
                                        coverLetterText: ""
                                    }, () => {
                                        this.RBSheetApply.close();
                                    });

                                    setTimeout(() => {
                                        this.setState({
                                            showToast: true
                                        })
                                    }, 1000);
                                } else if (res.data.message === "Successfully executed logic!") {
                                    this.setState({
                                        milestoneCount: [],
                                        myBid: 0,
                                        selectedMilestone: null,
                                        duration: "",
                                        milestone: false,
                                        question0: null,
                                        question1: null,
                                        question2: null,
                                        question3: null,
                                        question4: null,
                                        milestone1: {},
                                        milestone2: {},
                                        milestone3: {},
                                        milestone4: {},
                                        milestone5: {},
                                        milestone6: {},
                                        milestone7: {},
                                        milestone8: {},
                                        coverLetterText: ""
                                    }, () => {
                                        this.RBSheetApply.close();

                                        setTimeout(() => {
                                            this.setState({
                                                showAlert: true
                                            })
                                        }, 1000)
                                    })
                                } else {
                                    console.log("err", res.data);
                                }
                            }).catch((err) => {
                                console.log(err);
                            })
                        } else {
                            Toast.show({
                                type: "error",
                                position: 'top',
                                text1: 'PLEASE ANSWER THE REQUIRED QUESTIONS BEFORE PROCEEDING.',
                                text2: "Please complete each required question for the client as requested...",
                                visibilityTime: 4000
                            });
                        }
                    } else {
                        if (milestone === true) {
                            if ((_.has(question0, "answer") && question0.answer.length > 0) && (_.has(question1, "answer") && question1.answer.length > 0) && (_.has(question2, "answer") && question2.answer.length > 0) && (_.has(question3, "answer") && question3.answer.length > 0)) {
                                axios.post(`${Config.ngrok_url}/apply/to/listing/job`, {
                                    question0, 
                                    question1, 
                                    question2, 
                                    question3, 
                                    question4: null,
                                    coverLetterText,
                                    milestone1,
                                    milestone2,
                                    milestone3,
                                    milestone4,
                                    milestone5,
                                    milestone6,
                                    milestone7,
                                    milestone8, 
                                    duration,
                                    otherUser: job.poster,
                                    signedInUser: this.props.unique_id,
                                    jobID: job.unique_id,
                                    tokenCount: job.tokensRequiredToApply,
                                    attachments,
                                    milestone,
                                    fullName: this.props.fullName
                                }).then((res) => {
                                    console.log(res.data);
    
                                    if (res.data.message === "NOT ENOUGH tokens to apply!") {
                                        this.setState({
                                            milestoneCount: [],
                                            myBid: 0,
                                            selectedMilestone: null,
                                            duration: "",
                                            milestone: false,
                                            question0: null,
                                            question1: null,
                                            question2: null,
                                            question3: null,
                                            question4: null,
                                            milestone1: {},
                                            milestone2: {},
                                            milestone3: {},
                                            milestone4: {},
                                            milestone5: {},
                                            milestone6: {},
                                            milestone7: {},
                                            milestone8: {},
                                            coverLetterText: ""
                                        }, () => {
                                            this.RBSheetApply.close();
                                        });

                                        setTimeout(() => {
                                            this.setState({
                                                showToast: true
                                            })
                                        }, 1000);
                                } else if (res.data.message === "Successfully executed logic!") {
                                    this.setState({
                                        milestoneCount: [],
                                        myBid: 0,
                                        selectedMilestone: null,
                                        duration: "",
                                        milestone: false,
                                        question0: null,
                                        question1: null,
                                        question2: null,
                                        question3: null,
                                        question4: null,
                                        milestone1: {},
                                        milestone2: {},
                                        milestone3: {},
                                        milestone4: {},
                                        milestone5: {},
                                        milestone6: {},
                                        milestone7: {},
                                        milestone8: {},
                                        coverLetterText: ""
                                    }, () => {
                                        this.RBSheetApply.close();

                                        setTimeout(() => {
                                            this.setState({
                                                showAlert: true
                                            })
                                        }, 1000)
                                    })
                                } else {
                                    console.log("err", res.data);
                                }
                                }).catch((err) => {
                                    console.log(err);
                                })
                            } else {
                                Toast.show({
                                    type: "error",
                                    position: 'top',
                                    text1: 'PLEASE ANSWER THE REQUIRED QUESTIONS BEFORE PROCEEDING.',
                                    text2: "Please complete each required question for the client as requested...",
                                    visibilityTime: 4000
                                });
                            }
                        } else {
                            if ((_.has(question0, "answer") && question0.answer.length > 0) && (_.has(question1, "answer") && question1.answer.length > 0) && (_.has(question2, "answer") && question2.answer.length > 0) && (_.has(question3, "answer") && question3.answer.length > 0)) {
                                axios.post(`${Config.ngrok_url}/apply/to/listing/job`, {
                                    question0, 
                                    question1, 
                                    question2, 
                                    question3, 
                                    question4: null,
                                    coverLetterText,
                                    myBid, 
                                    duration,
                                    otherUser: job.poster,
                                    signedInUser: this.props.unique_id,
                                    jobID: job.unique_id,
                                    tokenCount: job.tokensRequiredToApply,
                                    attachments,
                                    milestone,
                                    fullName: this.props.fullName
                                }).then((res) => {
                                    console.log(res.data);
    
                                    if (res.data.message === "NOT ENOUGH tokens to apply!") {
                                        this.setState({
                                            milestoneCount: [],
                                            myBid: 0,
                                            selectedMilestone: null,
                                            duration: "",
                                            milestone: false,
                                            question0: null,
                                            question1: null,
                                            question2: null,
                                            question3: null,
                                            question4: null,
                                            milestone1: {},
                                            milestone2: {},
                                            milestone3: {},
                                            milestone4: {},
                                            milestone5: {},
                                            milestone6: {},
                                            milestone7: {},
                                            milestone8: {},
                                            coverLetterText: ""
                                        }, () => {
                                            this.RBSheetApply.close();
                                        });

                                        setTimeout(() => {
                                            this.setState({
                                                showToast: true
                                            })
                                        }, 1000);
                                } else if (res.data.message === "Successfully executed logic!") {
                                    this.setState({
                                        milestoneCount: [],
                                        myBid: 0,
                                        selectedMilestone: null,
                                        duration: "",
                                        milestone: false,
                                        question0: null,
                                        question1: null,
                                        question2: null,
                                        question3: null,
                                        question4: null,
                                        milestone1: {},
                                        milestone2: {},
                                        milestone3: {},
                                        milestone4: {},
                                        milestone5: {},
                                        milestone6: {},
                                        milestone7: {},
                                        milestone8: {},
                                        coverLetterText: ""
                                    }, () => {
                                        this.RBSheetApply.close();

                                        setTimeout(() => {
                                            this.setState({
                                                showAlert: true
                                            })
                                        }, 1000)
                                    })
                                } else {
                                    console.log("err", res.data);
                                }
                                }).catch((err) => {
                                    console.log(err);
                                })
                            } else {
                                Toast.show({
                                    type: "error",
                                    position: 'top',
                                    text1: 'PLEASE ANSWER THE REQUIRED QUESTIONS BEFORE PROCEEDING.',
                                    text2: "Please complete each required question for the client as requested...",
                                    visibilityTime: 4000
                                });
                            }
                        }
                    }
                    break;
                case 4: 
                    console.log("five");

                    if (milestone === true) {
                        if ((_.has(question0, "answer") && question0.answer.length > 0) && (_.has(question1, "answer") && question1.answer.length > 0) && (_.has(question2, "answer") && question2.answer.length > 0) && (_.has(question3, "answer") && question3.answer.length > 0) && (_.has(question4, "answer") && question4.answer.length > 0)) {
                            axios.post(`${Config.ngrok_url}/apply/to/listing/job`, {
                                question0, 
                                question1, 
                                question2, 
                                question3, 
                                question4,
                                coverLetterText,
                                milestone1,
                                milestone2,
                                milestone3,
                                milestone4,
                                milestone5,
                                milestone6,
                                milestone7,
                                milestone8, 
                                duration,
                                otherUser: job.poster,
                                signedInUser: this.props.unique_id,
                                jobID: job.unique_id,
                                tokenCount: job.tokensRequiredToApply,
                                attachments,
                                milestone,
                                fullName: this.props.fullName
                            }).then((res) => {
                                console.log(res.data);

                                if (res.data.message === "NOT ENOUGH tokens to apply!") {
                                    this.setState({
                                        milestoneCount: [],
                                        myBid: 0,
                                        selectedMilestone: null,
                                        duration: "",
                                        milestone: false,
                                        question0: null,
                                        question1: null,
                                        question2: null,
                                        question3: null,
                                        question4: null,
                                        milestone1: {},
                                        milestone2: {},
                                        milestone3: {},
                                        milestone4: {},
                                        milestone5: {},
                                        milestone6: {},
                                        milestone7: {},
                                        milestone8: {},
                                        coverLetterText: ""
                                    }, () => {
                                        this.RBSheetApply.close();
                                    });

                                    setTimeout(() => {
                                        this.setState({
                                            showToast: true
                                        })
                                    }, 1000);
                                } else if (res.data.message === "Successfully executed logic!") {
                                    this.setState({
                                        milestoneCount: [],
                                        myBid: 0,
                                        selectedMilestone: null,
                                        duration: "",
                                        milestone: false,
                                        question0: null,
                                        question1: null,
                                        question2: null,
                                        question3: null,
                                        question4: null,
                                        milestone1: {},
                                        milestone2: {},
                                        milestone3: {},
                                        milestone4: {},
                                        milestone5: {},
                                        milestone6: {},
                                        milestone7: {},
                                        milestone8: {},
                                        coverLetterText: ""
                                    }, () => {
                                        this.RBSheetApply.close();

                                        setTimeout(() => {
                                            this.setState({
                                                showAlert: true
                                            })
                                        }, 1000)
                                    })
                                } else {
                                    console.log("err", res.data);
                                }
                            }).catch((err) => {
                                console.log(err);
                            })
                        } else {
                            Toast.show({
                                type: "error",
                                position: 'top',
                                text1: 'PLEASE ANSWER THE REQUIRED QUESTIONS BEFORE PROCEEDING.',
                                text2: "Please complete each required question for the client as requested...",
                                visibilityTime: 4000
                            });
                        }
                    } else {
                        if ((_.has(question0, "answer") && question0.answer.length > 0) && (_.has(question1, "answer") && question1.answer.length > 0) && (_.has(question2, "answer") && question2.answer.length > 0) && (_.has(question3, "answer") && question3.answer.length > 0) && (_.has(question4, "answer") && question4.answer.length > 0)) {
                            axios.post(`${Config.ngrok_url}/apply/to/listing/job`, {
                                question0, 
                                question1, 
                                question2, 
                                question3, 
                                question4,
                                coverLetterText,
                                myBid, 
                                duration,
                                otherUser: job.poster,
                                signedInUser: this.props.unique_id,
                                jobID: job.unique_id,
                                tokenCount: job.tokensRequiredToApply,
                                attachments,
                                milestone,
                                fullName: this.props.fullName
                            }).then((res) => {
                                console.log(res.data);

                                if (res.data.message === "NOT ENOUGH tokens to apply!") {
                                    this.setState({
                                        milestoneCount: [],
                                        myBid: 0,
                                        selectedMilestone: null,
                                        duration: "",
                                        milestone: false,
                                        question0: null,
                                        question1: null,
                                        question2: null,
                                        question3: null,
                                        question4: null,
                                        milestone1: {},
                                        milestone2: {},
                                        milestone3: {},
                                        milestone4: {},
                                        milestone5: {},
                                        milestone6: {},
                                        milestone7: {},
                                        milestone8: {},
                                        coverLetterText: ""
                                    }, () => {
                                        this.RBSheetApply.close();
                                    });

                                    setTimeout(() => {
                                        this.setState({
                                            showToast: true
                                        })
                                    }, 1000);
                                } else if (res.data.message === "Successfully executed logic!") {
                                    this.setState({
                                        milestoneCount: [],
                                        myBid: 0,
                                        selectedMilestone: null,
                                        duration: "",
                                        milestone: false,
                                        question0: null,
                                        question1: null,
                                        question2: null,
                                        question3: null,
                                        question4: null,
                                        milestone1: {},
                                        milestone2: {},
                                        milestone3: {},
                                        milestone4: {},
                                        milestone5: {},
                                        milestone6: {},
                                        milestone7: {},
                                        milestone8: {},
                                        coverLetterText: ""
                                    }, () => {
                                        this.RBSheetApply.close();

                                        setTimeout(() => {
                                            this.setState({
                                                showAlert: true
                                            })
                                        }, 1000)
                                    })
                                } else {
                                    console.log("err", res.data);
                                }
                            }).catch((err) => {
                                console.log(err);
                            })
                        } else {
                            Toast.show({
                                type: "error",
                                position: 'top',
                                text1: 'PLEASE ANSWER THE REQUIRED QUESTIONS BEFORE PROCEEDING.',
                                text2: "Please complete each required question for the client as requested...",
                                visibilityTime: 4000
                            });
                        }
                    }
                    break;
                default:
                    break;
            }
        }
    }
    handleFileSelection = async () => {

        try {
            const res = await DocumentPicker.pick({
              type: [DocumentPicker.types.allFiles],
            });
            console.log(
              res.uri,
              res.type, // mime type
              res.name,
              res.size
            );

            const { uri, type, name, size } = res;

            const fs = RNFetchBlob.fs;

            let imagePath = null;

            RNFetchBlob.config({
                fileCache: true
            }).fetch("GET", uri)
            // the image is now dowloaded to device's storage
            .then(resp => {
                // the image path you can use it directly with Image component
                imagePath = resp.path();
                return resp.readFile("base64");
            })
            .then(base64Data => {

                const { milestone, milestoneCount } = this.state;

                if (milestone === true) {
                    this.setState({
                        spinner: true
                    }, () => {
                        axios.post(`${Config.ngrok_url}/upload/content/attachment`, {
                            base64: base64Data,
                            id: this.props.unique_id,
                            type
                        }).then((res) => {
                            if (res.data.message === "Successfully uploaded content!") {
                                console.log(res.data);
                
                                const { generatedID } = res.data;
                
                                this.setState({
                                    spinner: false,
                                    attachments: [...this.state.attachments, {
                                        type,
                                        id: generatedID
                                    }]
                                })
                            } else {
                                console.log("err", res.data);
                
                                Toast.show({
                                    type: "error",
                                    position: 'top',
                                    text1: 'ERROR OCCURRED WHILE UPLOADING!',
                                    text2: "An unknown error occurred while uploading your content, please try again...",
                                    visibilityTime: 4500
                                });
                            }
                        }).catch((err) => {
                            console.log(err);
                        })
                    })
                } else {
                    this.setState({
                        spinner: true
                    }, () => {
                        axios.post(`${Config.ngrok_url}/upload/content/attachment`, {
                            base64: base64Data,
                            id: this.props.unique_id,
                            type
                        }).then((res) => {
                            if (res.data.message === "Successfully uploaded content!") {
                                console.log(res.data);
                
                                const { generatedID } = res.data;
                  
                                this.setState({
                                    spinner: false,
                                    attachments: [...this.state.attachments, {
                                        type,
                                        id: generatedID
                                    }]
                                })
                            } else {
                                console.log("err", res.data);
                
                                Toast.show({
                                    type: "error",
                                    position: 'top',
                                    text1: 'ERROR OCCURRED WHILE UPLOADING!',
                                    text2: "An unknown error occurred while uploading your content, please try again...",
                                    visibilityTime: 4500
                                });
                            }
                        }).catch((err) => {
                            console.log(err);
                        })
                    })
                }
                // remove the file from storage
                return fs.unlink(imagePath);
            });

          } catch (err) {
            if (DocumentPicker.isCancel(err)) {
              // User cancelled the picker, exit any dialogs or menus and move on
            } else {
              throw err;
            }
        }
    }
    calculateReadiness = () => {
        const { myBid, duration, milestone, milestoneCount, milestone1, milestone2, milestone3, milestone4, milestone5, milestone6, milestone7, milestone8, question0, question1, question2, question3, question4, coverLetterText } = this.state;

        const job = this.props.props.route.params.item;

        console.log(job.questionsBeforeApplying.length);

        if (milestone === true) {
            console.log("milestoneCount.length", milestoneCount.length);
            switch (milestoneCount.length) {
                case 0:
                    if ((_.has(milestone1, "milestone") && milestone1.milestone.length > 0 && _.has(milestone1, "price") && milestone1.price !== 0 && _.has(milestone1, "date") && (_.has(milestone2, "milestone") && milestone2.milestone.length > 0 && _.has(milestone2, "price") && milestone2.price !== 0 && _.has(milestone2, "date"))) && (typeof duration !== "undefined" && duration.length > 0)) {
                        switch (job.questionsBeforeApplying.length) {
                            case 1:
                                console.log("case 1")
                                if (question0 !== null && _.has(question0, "answer") && question0.answer.length > 0) {
                                    return true;
                                } else {
                                    return false;
                                }
                            case 2:
                                console.log("case 2")
                                if ((question0 !== null && _.has(question0, "answer") && question0.answer.length > 0) && (_.has(question1, "answer") && question1.answer.length > 0)) {
                                    return true;
                                } else {
                                    return false;
                                }
                            case 3: //
                                console.log("case 3")
                                if ((question0 !== null && _.has(question0, "answer") && question0.answer.length > 0) && (_.has(question1, "answer") && question1.answer.length > 0) && (_.has(question2, "answer") && question2.answer.length > 0)) {
                                    return true;
                                } else {
                                    return false;
                                }
                            case 4:
                                console.log("case 4")
                                if ((question0 !== null && _.has(question0, "answer") && question0.answer.length > 0) && (_.has(question1, "answer") && question1.answer.length > 0) && (_.has(question2, "answer") && question2.answer.length > 0) && (_.has(question3, "answer") && question3.answer.length > 0)) {
                                    return true;
                                } else {
                                    return false;
                                }
                            case 5:
                                console.log("case 5")
                                if ((question0 !== null && _.has(question0, "answer") && question0.answer.length > 0) && (_.has(question1, "answer") && question1.answer.length > 0) && (_.has(question2, "answer") && question2.answer.length > 0) && (_.has(question3, "answer") && question3.answer.length > 0) && (q_.has(question4, "answer") && question4.answer.length > 0)) {
                                    return true;
                                } else {
                                    return false;
                                }
                            default:
                                break;
                        }
                    } else {
                        console.log("uh oh -  else ran")
                        return false;
                    }
                    break;
                case 1: 
                    if (_.has(milestone1, "milestone") && milestone1.milestone.length > 0 && _.has(milestone1, "price") && milestone1.price !== 0 && _.has(milestone1, "date") && (_.has(milestone2, "milestone") && milestone2.milestone.length > 0 && _.has(milestone2, "price") && milestone2.price !== 0 && _.has(milestone2, "date")) && (_.has(milestone3, "milestone") && milestone3.milestone.length > 0 && _.has(milestone3, "price") && milestone3.price !== 0 && _.has(milestone3, "date")) && (typeof duration !== "undefined" && duration.length > 0)) {
                        switch (job.questionsBeforeApplying.length) {
                            case 1:
                                console.log("case 1")
                                if (question0 !== null && _.has(question0, "answer") && question0.answer.length > 0) {
                                    return true;
                                } else {
                                    return false;
                                }
                            case 2:
                                console.log("case 2")
                                if ((question0 !== null && _.has(question0, "answer") && question0.answer.length > 0) && (_.has(question1, "answer") && question1.answer.length > 0)) {
                                    return true;
                                } else {
                                    return false;
                                }
                            case 3: //
                                console.log("case 3")
                                if ((question0 !== null && _.has(question0, "answer") && question0.answer.length > 0) && (_.has(question1, "answer") && question1.answer.length > 0) && (_.has(question2, "answer") && question2.answer.length > 0)) {
                                    return true;
                                } else {
                                    return false;
                                }
                            case 4:
                                console.log("case 4")
                                if ((question0 !== null && _.has(question0, "answer") && question0.answer.length > 0) && (_.has(question1, "answer") && question1.answer.length > 0) && (_.has(question2, "answer") && question2.answer.length > 0) && (_.has(question3, "answer") && question3.answer.length > 0)) {
                                    return true;
                                } else {
                                    return false;
                                }
                            case 5:
                                console.log("case 5")
                                if ((question0 !== null && _.has(question0, "answer") && question0.answer.length > 0) && (_.has(question1, "answer") && question1.answer.length > 0) && (_.has(question2, "answer") && question2.answer.length > 0) && (_.has(question3, "answer") && question3.answer.length > 0) && (q_.has(question4, "answer") && question4.answer.length > 0)) {
                                    return true;
                                } else {
                                    return false;
                                }
                            default:
                                break;
                        }
                    } else {
                        return false;
                    }
                    break;
                case 2: 
                    if (_.has(milestone1, "milestone") && milestone1.milestone.length > 0 && _.has(milestone1, "price") && milestone1.price !== 0 && _.has(milestone1, "date") && (_.has(milestone2, "milestone") && milestone2.milestone.length > 0 && _.has(milestone2, "price") && milestone2.price !== 0 && _.has(milestone2, "date")) && (_.has(milestone3, "milestone") && milestone3.milestone.length > 0 && _.has(milestone3, "price") && milestone3.price !== 0 && _.has(milestone3, "date")) && (_.has(milestone4, "milestone") && milestone4.milestone.length > 0 && _.has(milestone4, "price") && milestone4.price !== 0 && _.has(milestone4, "date")) && (typeof duration !== "undefined" && duration.length > 0)) {
                        switch (job.questionsBeforeApplying.length) {
                            case 1:
                                console.log("case 1")
                                if (question0 !== null && _.has(question0, "answer") && question0.answer.length > 0) {
                                    return true;
                                } else {
                                    return false;
                                }
                            case 2:
                                console.log("case 2")
                                if ((question0 !== null && _.has(question0, "answer") && question0.answer.length > 0) && (_.has(question1, "answer") && question1.answer.length > 0)) {
                                    return true;
                                } else {
                                    return false;
                                }
                            case 3: //
                                console.log("case 3")
                                if ((question0 !== null && _.has(question0, "answer") && question0.answer.length > 0) && (_.has(question1, "answer") && question1.answer.length > 0) && (_.has(question2, "answer") && question2.answer.length > 0)) {
                                    return true;
                                } else {
                                    return false;
                                }
                            case 4:
                                console.log("case 4")
                                if ((question0 !== null && _.has(question0, "answer") && question0.answer.length > 0) && (_.has(question1, "answer") && question1.answer.length > 0) && (_.has(question2, "answer") && question2.answer.length > 0) && (_.has(question3, "answer") && question3.answer.length > 0)) {
                                    return true;
                                } else {
                                    return false;
                                }
                            case 5:
                                console.log("case 5")
                                if ((question0 !== null && _.has(question0, "answer") && question0.answer.length > 0) && (_.has(question1, "answer") && question1.answer.length > 0) && (_.has(question2, "answer") && question2.answer.length > 0) && (_.has(question3, "answer") && question3.answer.length > 0) && (q_.has(question4, "answer") && question4.answer.length > 0)) {
                                    return true;
                                } else {
                                    return false;
                                }
                            default:
                                break;
                        }
                    } else {
                        return false;
                    }
                    break;
                case 3: 
                    if (_.has(milestone1, "milestone") && milestone1.milestone.length > 0 && _.has(milestone1, "price") && milestone1.price !== 0 && _.has(milestone1, "date") && (_.has(milestone2, "milestone") && milestone2.milestone.length > 0 && _.has(milestone2, "price") && milestone2.price !== 0 && _.has(milestone2, "date")) && (_.has(milestone3, "milestone") && milestone3.milestone.length > 0 && _.has(milestone3, "price") && milestone3.price !== 0 && _.has(milestone3, "date")) && (_.has(milestone4, "milestone") && milestone4.milestone.length > 0 && _.has(milestone4, "price") && milestone4.price !== 0 && _.has(milestone4, "date")) && (_.has(milestone5, "milestone") && milestone5.milestone.length > 0 && _.has(milestone5, "price") && milestone5.price !== 0 && _.has(milestone5, "date")) && (typeof duration !== "undefined" && duration.length > 0)) {
                        switch (job.questionsBeforeApplying.length) {
                            case 1:
                                console.log("case 1")
                                if (question0 !== null && _.has(question0, "answer") && question0.answer.length > 0) {
                                    return true;
                                } else {
                                    return false;
                                }
                            case 2:
                                console.log("case 2")
                                if ((question0 !== null && _.has(question0, "answer") && question0.answer.length > 0) && (_.has(question1, "answer") && question1.answer.length > 0)) {
                                    return true;
                                } else {
                                    return false;
                                }
                            case 3: //
                                console.log("case 3")
                                if ((question0 !== null && _.has(question0, "answer") && question0.answer.length > 0) && (_.has(question1, "answer") && question1.answer.length > 0) && (_.has(question2, "answer") && question2.answer.length > 0)) {
                                    return true;
                                } else {
                                    return false;
                                }
                            case 4:
                                console.log("case 4")
                                if ((question0 !== null && _.has(question0, "answer") && question0.answer.length > 0) && (_.has(question1, "answer") && question1.answer.length > 0) && (_.has(question2, "answer") && question2.answer.length > 0) && (_.has(question3, "answer") && question3.answer.length > 0)) {
                                    return true;
                                } else {
                                    return false;
                                }
                            case 5:
                                console.log("case 5")
                                if ((question0 !== null && _.has(question0, "answer") && question0.answer.length > 0) && (_.has(question1, "answer") && question1.answer.length > 0) && (_.has(question2, "answer") && question2.answer.length > 0) && (_.has(question3, "answer") && question3.answer.length > 0) && (q_.has(question4, "answer") && question4.answer.length > 0)) {
                                    return true;
                                } else {
                                    return false;
                                }
                            default:
                                break;
                        }
                    } else {
                        return false;
                    }
                    break;
                case 4: 
                    if (_.has(milestone1, "milestone") && milestone1.milestone.length > 0 && _.has(milestone1, "price") && milestone1.price !== 0 && _.has(milestone1, "date") && (_.has(milestone2, "milestone") && milestone2.milestone.length > 0 && _.has(milestone2, "price") && milestone2.price !== 0 && _.has(milestone2, "date")) && (_.has(milestone3, "milestone") && milestone3.milestone.length > 0 && _.has(milestone3, "price") && milestone3.price !== 0 && _.has(milestone3, "date")) && (_.has(milestone4, "milestone") && milestone4.milestone.length > 0 && _.has(milestone4, "price") && milestone4.price !== 0 && _.has(milestone4, "date")) && (_.has(milestone5, "milestone") && milestone5.milestone.length > 0 && _.has(milestone5, "price") && milestone5.price !== 0 && _.has(milestone5, "date")) && (_.has(milestone6, "milestone") && milestone6.milestone.length > 0 && _.has(milestone6, "price") && milestone6.price !== 0 && _.has(milestone6, "date")) && (typeof duration !== "undefined" && duration.length > 0)) {
                        switch (job.questionsBeforeApplying.length) {
                            case 1:
                                console.log("case 1")
                                if (question0 !== null && _.has(question0, "answer") && question0.answer.length > 0) {
                                    return true;
                                } else {
                                    return false;
                                }
                            case 2:
                                console.log("case 2")
                                if ((question0 !== null && _.has(question0, "answer") && question0.answer.length > 0) && (_.has(question1, "answer") && question1.answer.length > 0)) {
                                    return true;
                                } else {
                                    return false;
                                }
                            case 3: //
                                console.log("case 3")
                                if ((question0 !== null && _.has(question0, "answer") && question0.answer.length > 0) && (_.has(question1, "answer") && question1.answer.length > 0) && (_.has(question2, "answer") && question2.answer.length > 0)) {
                                    return true;
                                } else {
                                    return false;
                                }
                            case 4:
                                console.log("case 4")
                                if ((question0 !== null && _.has(question0, "answer") && question0.answer.length > 0) && (_.has(question1, "answer") && question1.answer.length > 0) && (_.has(question2, "answer") && question2.answer.length > 0) && (_.has(question3, "answer") && question3.answer.length > 0)) {
                                    return true;
                                } else {
                                    return false;
                                }
                            case 5:
                                console.log("case 5")
                                if ((question0 !== null && _.has(question0, "answer") && question0.answer.length > 0) && (_.has(question1, "answer") && question1.answer.length > 0) && (_.has(question2, "answer") && question2.answer.length > 0) && (_.has(question3, "answer") && question3.answer.length > 0) && (q_.has(question4, "answer") && question4.answer.length > 0)) {
                                    return true;
                                } else {
                                    return false;
                                }
                            default:
                                break;
                        }
                    } else {
                        return false;
                    }
                    break;
                case 5: 
                    if (_.has(milestone1, "milestone") && milestone1.milestone.length > 0 && _.has(milestone1, "price") && milestone1.price !== 0 && _.has(milestone1, "date") && (_.has(milestone2, "milestone") && milestone2.milestone.length > 0 && _.has(milestone2, "price") && milestone2.price !== 0 && _.has(milestone2, "date")) && (_.has(milestone3, "milestone") && milestone3.milestone.length > 0 && _.has(milestone3, "price") && milestone3.price !== 0 && _.has(milestone3, "date")) && (_.has(milestone4, "milestone") && milestone4.milestone.length > 0 && _.has(milestone4, "price") && milestone4.price !== 0 && _.has(milestone4, "date")) && (_.has(milestone5, "milestone") && milestone5.milestone.length > 0 && _.has(milestone5, "price") && milestone5.price !== 0 && _.has(milestone5, "date")) && (_.has(milestone6, "milestone") && milestone6.milestone.length > 0 && _.has(milestone6, "price") && milestone6.price !== 0 && _.has(milestone6, "date")) && (_.has(milestone7, "milestone") && milestone7.milestone.length > 0 && _.has(milestone7, "price") && milestone7.price !== 0 && _.has(milestone7, "date")) && (typeof duration !== "undefined" && duration.length > 0)) {
                        switch (job.questionsBeforeApplying.length) {
                            case 1:
                                console.log("case 1")
                                if (question0 !== null && _.has(question0, "answer") && question0.answer.length > 0) {
                                    return true;
                                } else {
                                    return false;
                                }
                            case 2:
                                console.log("case 2")
                                if ((question0 !== null && _.has(question0, "answer") && question0.answer.length > 0) && (_.has(question1, "answer") && question1.answer.length > 0)) {
                                    return true;
                                } else {
                                    return false;
                                }
                            case 3: //
                                console.log("case 3")
                                if ((question0 !== null && _.has(question0, "answer") && question0.answer.length > 0) && (_.has(question1, "answer") && question1.answer.length > 0) && (_.has(question2, "answer") && question2.answer.length > 0)) {
                                    return true;
                                } else {
                                    return false;
                                }
                            case 4:
                                console.log("case 4")
                                if ((question0 !== null && _.has(question0, "answer") && question0.answer.length > 0) && (_.has(question1, "answer") && question1.answer.length > 0) && (_.has(question2, "answer") && question2.answer.length > 0) && (_.has(question3, "answer") && question3.answer.length > 0)) {
                                    return true;
                                } else {
                                    return false;
                                }
                            case 5:
                                console.log("case 5")
                                if ((question0 !== null && _.has(question0, "answer") && question0.answer.length > 0) && (_.has(question1, "answer") && question1.answer.length > 0) && (_.has(question2, "answer") && question2.answer.length > 0) && (_.has(question3, "answer") && question3.answer.length > 0) && (q_.has(question4, "answer") && question4.answer.length > 0)) {
                                    return true;
                                } else {
                                    return false;
                                }
                            default:
                                break;
                        }
                    } else {
                        return false;
                    }
                    break;
                case 6: 
                    if (_.has(milestone1, "milestone") && milestone1.milestone.length > 0 && _.has(milestone1, "price") && milestone1.price !== 0 && _.has(milestone1, "date") && (_.has(milestone2, "milestone") && milestone2.milestone.length > 0 && _.has(milestone2, "price") && milestone2.price !== 0 && _.has(milestone2, "date")) && (_.has(milestone3, "milestone") && milestone3.milestone.length > 0 && _.has(milestone3, "price") && milestone3.price !== 0 && _.has(milestone3, "date")) && (_.has(milestone4, "milestone") && milestone4.milestone.length > 0 && _.has(milestone4, "price") && milestone4.price !== 0 && _.has(milestone4, "date")) && (_.has(milestone5, "milestone") && milestone5.milestone.length > 0 && _.has(milestone5, "price") && milestone5.price !== 0 && _.has(milestone5, "date")) && (_.has(milestone6, "milestone") && milestone6.milestone.length > 0 && _.has(milestone6, "price") && milestone6.price !== 0 && _.has(milestone6, "date")) && (_.has(milestone7, "milestone") && milestone7.milestone.length > 0 && _.has(milestone7, "price") && milestone7.price !== 0 && _.has(milestone7, "date")) && ((_.has(milestone8, "milestone") && milestone8.milestone.length > 0 && _.has(milestone8, "price") && milestone8.price !== 0 && _.has(milestone8, "date"))) && (typeof duration !== "undefined" && duration.length > 0)) {
                        switch (job.questionsBeforeApplying.length) {
                            case 1:
                                console.log("case 1")
                                if (question0 !== null && _.has(question0, "answer") && question0.answer.length > 0) {
                                    return true;
                                } else {
                                    return false;
                                }
                            case 2:
                                console.log("case 2")
                                if ((question0 !== null && _.has(question0, "answer") && question0.answer.length > 0) && (_.has(question1, "answer") && question1.answer.length > 0)) {
                                    return true;
                                } else {
                                    return false;
                                }
                            case 3: //
                                console.log("case 3")
                                if ((question0 !== null && _.has(question0, "answer") && question0.answer.length > 0) && (_.has(question1, "answer") && question1.answer.length > 0) && (_.has(question2, "answer") && question2.answer.length > 0)) {
                                    return true;
                                } else {
                                    return false;
                                }
                            case 4:
                                console.log("case 4")
                                if ((question0 !== null && _.has(question0, "answer") && question0.answer.length > 0) && (_.has(question1, "answer") && question1.answer.length > 0) && (_.has(question2, "answer") && question2.answer.length > 0) && (_.has(question3, "answer") && question3.answer.length > 0)) {
                                    return true;
                                } else {
                                    return false;
                                }
                            case 5:
                                console.log("case 5")
                                if ((question0 !== null && _.has(question0, "answer") && question0.answer.length > 0) && (_.has(question1, "answer") && question1.answer.length > 0) && (_.has(question2, "answer") && question2.answer.length > 0) && (_.has(question3, "answer") && question3.answer.length > 0) && (q_.has(question4, "answer") && question4.answer.length > 0)) {
                                    return true;
                                } else {
                                    return false;
                                }
                            default:
                                break;
                        }
                    } else {
                        return false;
                    }
                    break;
                default:
                    break;
            }
        } else {
            if (myBid !== 0 && (typeof duration !== "undefined" && duration.length > 0)) {
                if (job.coverLetterRequired === true) {
                    if (typeof coverLetterText !== "undefined" && coverLetterText.length > 0) {
                        switch (job.questionsBeforeApplying.length) {
                            case 1:
                                console.log("case 1")
                                if (question0 !== null && _.has(question0, "answer") && question0.answer.length > 0) {
                                    return true;
                                } else {
                                    return false;
                                }
                            case 2:
                                console.log("case 2")
                                if ((question0 !== null && _.has(question0, "answer") && question0.answer.length > 0) && (_.has(question1, "answer") && question1.answer.length > 0)) {
                                    return true;
                                } else {
                                    return false;
                                }
                            case 3: //
                                console.log("case 3")
                                if ((question0 !== null && _.has(question0, "answer") && question0.answer.length > 0) && (_.has(question1, "answer") && question1.answer.length > 0) && (_.has(question2, "answer") && question2.answer.length > 0)) {
                                    return true;
                                } else {
                                    return false;
                                }
                            case 4:
                                console.log("case 4")
                                if ((question0 !== null && _.has(question0, "answer") && question0.answer.length > 0) && (_.has(question1, "answer") && question1.answer.length > 0) && (_.has(question2, "answer") && question2.answer.length > 0) && (_.has(question3, "answer") && question3.answer.length > 0)) {
                                    return true;
                                } else {
                                    return false;
                                }
                            case 5:
                                console.log("case 5")
                                if ((question0 !== null && _.has(question0, "answer") && question0.answer.length > 0) && (_.has(question1, "answer") && question1.answer.length > 0) && (_.has(question2, "answer") && question2.answer.length > 0) && (_.has(question3, "answer") && question3.answer.length > 0) && (q_.has(question4, "answer") && question4.answer.length > 0)) {
                                    return true;
                                } else {
                                    return false;
                                }
                            default:
                                break;
                        }
                    } else {
                        return false;
                    }
                } else {
                    switch (job.questionsBeforeApplying.length) {
                        case 1:
                            console.log("case 1")
                            if (question0 !== null && _.has(question0, "answer") && question0.answer.length > 0) {
                                return true;
                            } else {
                                return false;
                            }
                        case 2:
                            console.log("case 2")
                            if ((question0 !== null && _.has(question0, "answer") && question0.answer.length > 0) && (_.has(question1, "answer") && question1.answer.length > 0)) {
                                return true;
                            } else {
                                return false;
                            }
                        case 3: //
                            console.log("case 3")
                            if ((question0 !== null && _.has(question0, "answer") && question0.answer.length > 0) && (_.has(question1, "answer") && question1.answer.length > 0) && (_.has(question2, "answer") && question2.answer.length > 0)) {
                                return true;
                            } else {
                                return false;
                            }
                        case 4:
                            console.log("case 4")
                            if ((question0 !== null && _.has(question0, "answer") && question0.answer.length > 0) && (_.has(question1, "answer") && question1.answer.length > 0) && (_.has(question2, "answer") && question2.answer.length > 0) && (_.has(question3, "answer") && question3.answer.length > 0)) {
                                return true;
                            } else {
                                return false;
                            }
                        case 5:
                            console.log("case 5")
                            if ((question0 !== null && _.has(question0, "answer") && question0.answer.length > 0) && (_.has(question1, "answer") && question1.answer.length > 0) && (_.has(question2, "answer") && question2.answer.length > 0) && (_.has(question3, "answer") && question3.answer.length > 0) && (q_.has(question4, "answer") && question4.answer.length > 0)) {
                                return true;
                            } else {
                                return false;
                            }
                        default:
                            break;
                    }
                }
            } else {
                return false;
            }
        }
    }
    renderFirstPage = () => {
        const job = this.props.props.route.params.item;
        return (
            <Fragment>
                <View style={styles.greybox}>
                            <Text style={styles.leftTextTwo}>Client Budget</Text>

                            <Text style={styles.rightTextTwo}>{this.renderBudget(job.pricing)}</Text>
                        </View>
                        <View style={{ marginTop: 10 }} />
                        {job.pricing.fixedOrHourly === "hourly" ? <View style={styles.row}>
                            <Text style={styles.yourRate}>Your Rate: </Text>

                            <View style={styles.alignRight}>
                                <Item style={{ width: 150 }}>
                                    <Icon type='FontAwesome' name='dollar' />
                                    <Input value={this.state.myBid.toString()} onChangeText={(value) => { 
                                        this.setState({
                                            myBid: value
                                        })
                                    }} placeholder='0.00'/>
                                    <Text style={{ fontWeight: "bold", fontSize: 18 }}>/ Hr</Text>
                                </Item>
                                <Text style={styles.rate}>Profile Rate: $20.00</Text>
                            </View>
                        </View> : <View style={styles.row}>
                            <Text style={styles.yourRate}>Fixed Rate: </Text>

                            <View style={styles.alignRight}>
                                <Item style={{ width: 150 }}>
                                    <Icon type='FontAwesome' name='dollar' />
                                    <Input value={this.state.myBid.toString()} onChangeText={(value) => { 
                                        this.setState({
                                            myBid: value
                                        })
                                    }} placeholder={job.pricing.fixedBudgetPrice.toFixed(2).toString()}/>
                                </Item>
                            </View>
                        </View>}
                        <View style={[styles.row, { marginTop: 75 }]}>
                            <Image source={require("../../../assets/icons/info-filled.png")} style={styles.circleOrange} />
                            <Text style={styles.warningText}>We recommend not lowering your rate to get an offer. If you do, it may be hard to increase your rate for future jobs.</Text>
                        </View>
                        <View style={styles.hr} />
                        <View style={styles.row}>
                            <Text style={styles.yourRate}>FairWage Service Fee</Text>
                            <Text style={styles.fee}>-${this.calculateFee(job.pricing)} fee</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Text>{'\u2022'}</Text>
                            <Text style={{flex: 1, paddingLeft: 5, color: "blue"  }}>20% ($0 - $500)</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Text>{'\u2022'}</Text>
                            <Text style={{flex: 1, paddingLeft: 5}}>10% ($500.01 - $10,000)</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Text>{'\u2022'}</Text>
                            <Text style={{flex: 1, paddingLeft: 5}}>5% ($10,000.01 or more)</Text>
                        </View>
                        <View style={styles.hr} />
                        {job.pricing.fixedOrHourly === "hourly" ? <Fragment><View style={styles.row}>
                            <Text style={styles.yourRate}>Total Rate: </Text>
                            <View style={styles.alignRight}>
                                <Item style={{ width: 150 }}>
                                    <Icon type='FontAwesome' name='dollar' />
                                    <Input value={(this.state.myBid * 0.80).toFixed(2).toString()} placeholder='0.00'/>
                                    <Text style={{ fontWeight: "bold", fontSize: 18 }}>/ Hr</Text>
                                </Item>
                                <Text style={{ fontSize: 14, color: "grey", marginTop: 10 }}>Lifetime Client Billed: $0.00</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 75 }}>
                            <Image source={require("../../../assets/icons/dollarsign.png")} style={{ maxWidth: 35, maxHeight: 35 }} />
                            <Text style={{ maxWidth: width * 0.70 }}>Includes FairWage hourly protection <Text style={{ fontWeight: "bold", color: "blue" }}>Learn More</Text></Text>
                        </View></Fragment> : <Fragment><View style={styles.row}>
                            <Text style={styles.yourRate}>Total Rate: </Text>
                            <View style={styles.alignRight}>
                                <Item style={{ width: 150 }}>
                                    <Icon type='FontAwesome' name='dollar' />
                                    <Input value={(this.state.myBid * 0.80).toFixed(2).toString()} placeholder='0.00'/>
                                </Item>
                                <Text style={{ fontSize: 14, color: "grey", marginTop: 10 }}>Lifetime Client Billed: $0.00</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 75 }}>
                            <Image source={require("../../../assets/icons/dollarsign.png")} style={{ maxWidth: 35, maxHeight: 35 }} />
                            <Text style={{ maxWidth: width * 0.70 }}>Includes FairWage hourly protection <Text style={{ fontWeight: "bold", color: "blue" }}>Learn More</Text></Text>
                        </View></Fragment>}
                </Fragment>
        );
    }
    calculateError = () => {
        const { milestone1 } = this.state;

        if ((_.has(milestone1, "milestone") && milestone1.milestone.length > 0 && _.has(milestone1, "price") && _.has(milestone1, "date"))) {
            return false;
        } else {
            return true
        }
    }
    calculateErrorTwo = () => {
        const { milestone2 } = this.state;
        
        if ((_.has(milestone2, "milestone") && milestone2.milestone.length > 0 && _.has(milestone2, "price") && _.has(milestone2, "date"))) {
            return false;
        } else {
            return true
        }
    }
    renderSecondPage = () => {
        const job = this.props.props.route.params.item;
        const rowLen = this.state.milestoneCount.length;
        return (
            <Fragment>
                <Text style={styles.warningTextTwo}>Please complete at least 2 or more "milestones" if you choose to NOT have an entire project rate</Text>
                <Fragment>
                    <Text style={{ paddingBottom: 10, fontWeight: "bold" }}>Milestone 1</Text>
                    <Item error={this.calculateError()} style={{ width: "100%" }} regular>
                        <Input onChangeText={(value) => {
                            this.setState({
                                milestone1: {
                                    ...this.state.milestone1,
                                    milestone: value
                                }
                            })
                        }} value={this.state.milestone1} placeholder='Enter a note/milestone...' />
                    </Item>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ flexDirection: "column", width: "50%" }}>
                            <Text style={{ paddingBottom: 0, marginTop: 12, fontWeight: "bold", textAlign: "left" }}>Due Date</Text>
                            {_.has(this.state.milestone1, "date") ? <Button onPress={() => {
                                this.setState({
                                    isDatePickerVisible: true,
                                    selectedMilestone: 1
                                })
                            }} style={{ width: "90%", justifyContent:"center", marginTop: 15 }} success>
                                <Text style={{ fontWeight: "bold",  color: "white" }}>Select Due Date</Text>
                            </Button> : <Button onPress={() => {
                                this.setState({
                                    isDatePickerVisible: true,
                                    selectedMilestone: 1
                                })
                            }} style={{ width: "90%", justifyContent:"center", marginTop: 15 }} info>
                                <Text style={{ fontWeight: "bold",  color: "white" }}>Select Due Date</Text>
                            </Button>}
                        </View>
                        <View style={{ flexDirection: "column", width: "50%" }}>
                            <Text style={{ paddingBottom: 0, marginTop: 12, fontWeight: "bold", textAlign: "left" }}>Amount</Text>
                            <Item style={{ width: "100%", height: 85 }}>
                                <Icon type='FontAwesome' name='dollar' />
                                <Input onChangeText={(value) => {
                                    this.setState({
                                        milestone1: {
                                            ...this.state.milestone1,
                                            price: Number(value)
                                        }
                                    })
                                }} value={_.has(this.state.milestone1, "price") ? this.state.milestone1.price.toString() : ""} placeholder='0.00'/>
                            </Item>
                        </View>
                    </View>
                    <View style={styles.hr} />
                </Fragment>
                <Fragment>
                    <Text style={{ paddingBottom: 10, fontWeight: "bold" }}>Milestone 2</Text>
                    <Item error={this.calculateErrorTwo()} style={{ width: "100%" }} regular>
                        <Input onChangeText={(value) => {
                            this.setState({
                                milestone2: {
                                    ...this.state.milestone2,
                                    milestone: value
                                }
                            })
                        }} value={this.state.milestone2} placeholder='Enter a note/milestone...' />
                    </Item>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ flexDirection: "column", width: "50%" }}>
                            <Text style={{ paddingBottom: 0, marginTop: 12, fontWeight: "bold", textAlign: "left" }}>Due Date</Text>
                            {_.has(this.state.milestone2, "date") ? <Button onPress={() => {
                                this.setState({
                                    isDatePickerVisible: true,
                                    selectedMilestone: 2
                                })
                            }} style={{ width: "90%", justifyContent:"center", marginTop: 15 }} success>
                                <Text style={{ fontWeight: "bold",  color: "white" }}>Select Due Date</Text>
                            </Button> : <Button onPress={() => {
                                this.setState({
                                    isDatePickerVisible: true,
                                    selectedMilestone: 2
                                })
                            }} style={{ width: "90%", justifyContent:"center", marginTop: 15 }} info>
                                <Text style={{ fontWeight: "bold",  color: "white" }}>Select Due Date</Text>
                            </Button>}
                            
                        </View>
                        <View style={{ flexDirection: "column", width: "50%" }}>
                            <Text style={{ paddingBottom: 0, marginTop: 12, fontWeight: "bold", textAlign: "left" }}>Amount</Text>
                            <Item style={{ width: "100%", height: 85 }}>
                                <Icon type='FontAwesome' name='dollar' />
                                <Input onChangeText={(value) => {
                                    this.setState({
                                        milestone2: {
                                            ...this.state.milestone2,
                                            price: Number(value)
                                        }
                                    })
                                }} value={_.has(this.state.milestone2, "price") ? this.state.milestone2.price.toString() : ""} placeholder='0.00'/>
                            </Item>
                        </View>
                    </View>
                    <View style={styles.hr} />
                </Fragment>
                {this.state.milestoneCount.map((milestone, index) => {
                    console.log("Milestone:", milestone);
                    

                    if (rowLen === (index + 1)) {
                        return (
                                <Fragment>
                                    <Text style={{ paddingBottom: 10, fontWeight: "bold" }}>Milestone {index + 3}</Text>
                                        <TouchableOpacity onPress={() => {
                                            this.setState({
                                                milestoneCount: this.state.milestoneCount.filter((item) => {
                                                    if (item !== milestone) {
                                                        return item;
                                                    } else {
                                                        console.log("item", item);
                                                        
                                                        this.setState({
                                                            [`milestone${item}`]: {}
                                                        })
                                                    }
                                                })
                                            })
                                        }} style={styles.iconFloatRight}>
                                            <Image source={require("../../../assets/icons/x.png")} style={styles.xIcon} />
                                        </TouchableOpacity>
                                        <Item style={{ width: "100%" }} regular>
                                            <Input onChangeText={(value) => {
                                                this.setState({
                                                    [`milestone${milestone}`]: {
                                                        milestone: value
                                                    }
                                                })
                                            }} value={_.has(this.state[`milestone${milestone}`], "milestone") ? this.state[`milestone${milestone}`].milestone : ""} placeholder='Enter a note/milestone...' />
                                        </Item>
                                        <View style={{ flexDirection: "row" }}>
                                            <View style={{ flexDirection: "column", width: "50%" }}>
                                                <Text style={{ paddingBottom: 0, marginTop: 12, fontWeight: "bold", textAlign: "left" }}>Due Date</Text>
                                                {_.has(this.state[`milestone${milestone}`], "date") ? <Button onPress={() => {
                                                    this.setState({
                                                        isDatePickerVisible: true,
                                                        selectedMilestone: milestone
                                                    })
                                                }} style={{ width: "90%", justifyContent:"center", marginTop: 15 }} success>
                                                    <Text style={{ fontWeight: "bold",  color: "white" }}>Select Due Date</Text>
                                                </Button> : <Button onPress={() => {
                                                    this.setState({
                                                        isDatePickerVisible: true,
                                                        selectedMilestone: milestone
                                                    })
                                                }} style={{ width: "90%", justifyContent:"center", marginTop: 15 }} info>
                                                    <Text style={{ fontWeight: "bold",  color: "white" }}>Select Due Date</Text>
                                                </Button>}
                                            </View>
                                            <View style={{ flexDirection: "column", width: "50%" }}>
                                                <Text style={{ paddingBottom: 0, marginTop: 12, fontWeight: "bold", textAlign: "left" }}>Amount</Text>
                                                <Item style={{ width: "100%", height: 85 }}>
                                                    <Icon type='FontAwesome' name='dollar' />
                                                    <Input onChangeText={(value) => {
                                                        this.setState({
                                                            [`milestone${milestone}`]: {
                                                                ...this.state[`milestone${milestone}`],
                                                                price: Number(value)
                                                            }
                                                        })
                                                    }} value={_.has(this.state[`milestone${milestone}`], "price") ? this.state[`milestone${milestone}`].price.toString() : ""} placeholder='0.00'/>
                                                </Item>
                                            </View>
                                        </View>
                                    <View style={styles.hr} />
                                </Fragment>
                            );
                    } else {
                        return (
                            <Fragment>
                                <Text style={{ paddingBottom: 10, fontWeight: "bold" }}>Milestone {index + 3}</Text>
                                    
                                    <Item style={{ width: "100%" }} regular>
                                        <Input onChangeText={(value) => {
                                            this.setState({
                                                [`milestone${milestone}`]: {
                                                    milestone: value
                                                }
                                            })
                                        }} value={_.has(this.state[`milestone${milestone}`], "milestone") ? this.state[`milestone${milestone}`].milestone : ""} placeholder='Enter a note/milestone...' />
                                    </Item>
                                    <View style={{ flexDirection: "row" }}>
                                        <View style={{ flexDirection: "column", width: "50%" }}>
                                            <Text style={{ paddingBottom: 0, marginTop: 12, fontWeight: "bold", textAlign: "left" }}>Due Date</Text>
                                            {_.has(this.state[`milestone${milestone}`], "date") ? <Button onPress={() => {
                                                this.setState({
                                                    isDatePickerVisible: true,
                                                    selectedMilestone: milestone
                                                })
                                            }} style={{ width: "90%", justifyContent:"center", marginTop: 15 }} success>
                                                <Text style={{ fontWeight: "bold",  color: "white" }}>Select Due Date</Text>
                                            </Button> : <Button onPress={() => {
                                                this.setState({
                                                    isDatePickerVisible: true,
                                                    selectedMilestone: milestone
                                                })
                                            }} style={{ width: "90%", justifyContent:"center", marginTop: 15 }} info>
                                                <Text style={{ fontWeight: "bold",  color: "white" }}>Select Due Date</Text>
                                            </Button>}
                                        </View>
                                        <View style={{ flexDirection: "column", width: "50%" }}>
                                            <Text style={{ paddingBottom: 0, marginTop: 12, fontWeight: "bold", textAlign: "left" }}>Amount</Text>
                                            <Item style={{ width: "100%", height: 85 }}>
                                                <Icon type='FontAwesome' name='dollar' />
                                                <Input onChangeText={(value) => {
                                                    this.setState({
                                                        [`milestone${milestone}`]: {
                                                            ...this.state[`milestone${milestone}`],
                                                            price: Number(value)
                                                        }
                                                    })
                                                }} value={_.has(this.state[`milestone${milestone}`], "price") ? this.state[`milestone${milestone}`].price.toString() : ""} placeholder='0.00'/>
                                            </Item>
                                        </View>
                                    </View>
                                <View style={styles.hr} />
                            </Fragment>
                        );
                    }
                })}
                <TouchableOpacity onPress={() => {
                    if (this.state.milestoneCount.length === 6) {
                        Toast.show({
                            type: "info",
                            position: 'top',
                            text1: 'MAX MILESTONE LIMIT REACHED.',
                            text2: "You have reached the MAX amount of milestones avaliable...",
                            visibilityTime: 4500
                        });
                    } else {
                        if (this.state.milestoneCount.length === 0) {
                            this.setState({
                                milestoneCount: [...this.state.milestoneCount, 3]
                            })
                        } else {
                            this.setState({
                                milestoneCount: [...this.state.milestoneCount, this.state.milestoneCount[this.state.milestoneCount.length - 1] + 1]
                            })
                        }
                    }
                }} style={styles.addMilestone}>
                    <Image source={require("../../../assets/icons/plus-icon.png")} style={{ maxWidth: 35, maxHeight: 35 }} />
                    <Text style={{ color: "blue", fontWeight: "bold", marginTop: 10 }}>Add Milestone</Text>
                </TouchableOpacity>
            </Fragment>
        );
    }
    handleApplicationSubmitHourly = () => {
        const job = this.props.props.route.params.item;

        const { myBid, duration, coverLetterText, question0, question1, question2, question3, question4, attachments } = this.state;

        const hourlyRate = Number(myBid);

        axios.post(`${Config.ngrok_url}/apply/to/listing/hourly`, {
            hourlyRate, 
            duration, 
            coverLetterText, 
            question0, 
            question1, 
            question2, 
            question3, 
            question4,
            otherUser: job.poster,
            signedInUser: this.props.unique_id,
            jobID: job.unique_id,
            tokenCount: job.tokensRequiredToApply,
            attachments,
            fullName: this.props.fullName
        }).then((res) => {
            if (res.data.message === "Successfully sent proposal!") {
                console.log(res.data);

                this.RBSheetApply.close();
                

                setTimeout(() => {
                    this.setState({
                        showAlert: true
                    })
                }, 1000)
            } else if (res.data.message === "NOT ENOUGH tokens to apply!") {
                console.log("err", res.data);

                this.RBSheetApply.close();

                setTimeout(() => {
                    this.setState({
                        showToast: true
                    })
                }, 1000);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    calculateReadinessTwo = () => {
        const job = this.props.props.route.params.item;

        const { myBid, duration, coverLetterText, question0, question1, question2, question3, question4 } = this.state;

        const hourlyRate = Number(myBid);

        if (hourlyRate !== 0 && (typeof duration !== "undefined" && duration.length > 0)) {
            if (job.coverLetterRequired === true) {
                if (typeof coverLetterText !== "undefined" && coverLetterText.length > 0) {
                    switch (job.questionsBeforeApplying.length) {
                        case 1:
                            console.log("case 1")
                            if (question0 !== null && _.has(question0, "answer") && question0.answer.length > 0) {
                                return true;
                            } else {
                                return false;
                            }
                        case 2:
                            console.log("case 2")
                            if ((question0 !== null && _.has(question0, "answer") && question0.answer.length > 0) && (_.has(question1, "answer") && question1.answer.length > 0)) {
                                return true;
                            } else {
                                return false;
                            }
                        case 3: //
                            console.log("case 3")
                            if ((question0 !== null && _.has(question0, "answer") && question0.answer.length > 0) && (_.has(question1, "answer") && question1.answer.length > 0) && (_.has(question2, "answer") && question2.answer.length > 0)) {
                                return true;
                            } else {
                                return false;
                            }
                        case 4:
                            console.log("case 4")
                            if ((question0 !== null && _.has(question0, "answer") && question0.answer.length > 0) && (_.has(question1, "answer") && question1.answer.length > 0) && (_.has(question2, "answer") && question2.answer.length > 0) && (_.has(question3, "answer") && question3.answer.length > 0)) {
                                return true;
                            } else {
                                return false;
                            }
                        case 5:
                            console.log("case 5")
                            if ((question0 !== null && _.has(question0, "answer") && question0.answer.length > 0) && (_.has(question1, "answer") && question1.answer.length > 0) && (_.has(question2, "answer") && question2.answer.length > 0) && (_.has(question3, "answer") && question3.answer.length > 0) && (q_.has(question4, "answer") && question4.answer.length > 0)) {
                                return true;
                            } else {
                                return false;
                            }
                        default:
                            break;
                    }
                } else {
                    return false;
                }
            } else {
                switch (job.questionsBeforeApplying.length) {
                    case 1:
                        console.log("case 1")
                        if (question0 !== null && _.has(question0, "answer") && question0.answer.length > 0) {
                            return true;
                        } else {
                            return false;
                        }
                    case 2:
                        console.log("case 2")
                        if ((question0 !== null && _.has(question0, "answer") && question0.answer.length > 0) && (_.has(question1, "answer") && question1.answer.length > 0)) {
                            return true;
                        } else {
                            return false;
                        }
                    case 3: //
                        console.log("case 3")
                        if ((question0 !== null && _.has(question0, "answer") && question0.answer.length > 0) && (_.has(question1, "answer") && question1.answer.length > 0) && (_.has(question2, "answer") && question2.answer.length > 0)) {
                            return true;
                        } else {
                            return false;
                        }
                    case 4:
                        console.log("case 4")
                        if ((question0 !== null && _.has(question0, "answer") && question0.answer.length > 0) && (_.has(question1, "answer") && question1.answer.length > 0) && (_.has(question2, "answer") && question2.answer.length > 0) && (_.has(question3, "answer") && question3.answer.length > 0)) {
                            return true;
                        } else {
                            return false;
                        }
                    case 5:
                        console.log("case 5")
                        if ((question0 !== null && _.has(question0, "answer") && question0.answer.length > 0) && (_.has(question1, "answer") && question1.answer.length > 0) && (_.has(question2, "answer") && question2.answer.length > 0) && (_.has(question3, "answer") && question3.answer.length > 0) && (q_.has(question4, "answer") && question4.answer.length > 0)) {
                            return true;
                        } else {
                            return false;
                        }
                    default:
                        break;
                }
            }
        } else {
            return false;
        }
    }
    renderButtonsContinuation = () => {
        const job = this.props.props.route.params.item;

        if (job.pricing.fixedOrHourly === "fixed") {
            return (
                <Fragment>
                    {this.calculateReadiness() ? <AwesomeButtonBlue style={{ marginTop: 15 }} type={"primary"} onPress={this.handleApplicationSubmit} stretch={true}>Submit Proposal</AwesomeButtonBlue> : <AwesomeButtonBlue style={{ marginTop: 15 }} type={"disabled"} stretch={true}>Submit Proposal</AwesomeButtonBlue>}
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    {this.calculateReadinessTwo() ? <AwesomeButtonBlue style={{ marginTop: 15 }} type={"primary"} onPress={this.handleApplicationSubmitHourly} stretch={true}>Submit Proposal</AwesomeButtonBlue> : <AwesomeButtonBlue style={{ marginTop: 15 }} type={"disabled"} stretch={true}>Submit Proposal</AwesomeButtonBlue>}
                </Fragment>
            );
        }
    }
    sendPrivateMessage = () => {
        const job = this.props.props.route.params.item;

        const { subject, message } = this.state;

        const receiverID = job.poster;
        const messageText = message;
        const receiverType = CometChat.RECEIVER_TYPE.USER;
        const textMessage = new CometChat.TextMessage(
            receiverID,
            messageText,
            receiverType
        );

        CometChat.sendMessage(textMessage).then(messageeee => {
                console.log("Message sent successfully:", messageeee);

                axios.post(`${Config.ngrok_url}/start/conversation/save`, {
                    other_user: job.poster,
                    user: this.props.unique_id,
                    message,
                    subject,
                    fullName: this.props.fullName
                }).then((res) => {
                    if (res.data.message === "Sent notification and message!") {

                        console.log(res.data);
        
                        this.setState({
                            message: "",
                            subject: ""
                        }, () => {
                            this.RBSheetApplyMessageUser.close();
                        })
                    } else {
                        console.log("Err", res.data);

                        this.RBSheetApplyMessageUser.close();
                    }
                }).catch((err) => {
                    console.log(err);
                })
            }, error => {
                console.log("Message sending failed with error:", error);
            }
        );
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
    render() {
        const menu = <Side props={this.props} />;
        const job = this.props.props.route.params.item;

        console.log("this.state.individual state", this.state, job);

        const { attachments } = this.state;
        return (
            <Fragment>
            
            <RBSheet 
                ref={ref => {
                    this.RBSheetApplyMessageUser = ref;
                }}
                height={height}
                openDuration={250}
                customStyles={{
                    container: {
                  
                    }
                }}
            >
                <Header>
                    <Left>
                        <Button onPress={() => {
                            this.RBSheetApplyMessageUser.close();
                        }} transparent>
                            <Image source={require("../../../assets/icons/close.png")} style={styles.headerIcon} />
                        </Button>
                    </Left>
                    <Body style={{ width: 250, minWidth: 250 }}>
                        <Title style={{ textAlign: "left" }}>Message the listing owner/poster</Title>
                    </Body>
                    <Right />
                </Header>
                <View style={styles.container}>
                    <Item regular>
                        <Input placeholderTextColor={"grey"} value={this.state.subject} onChangeText={(value) => {
                            this.setState({
                                subject: value
                            })
                        }} placeholder={"Subject and/or title..."} />
                    </Item>
                    <Textarea style={styles.textarea} bordered placeholderTextColor={"grey"} value={this.state.message} onChangeText={(value) => {
                            this.setState({
                                message: value
                            })
                    }} placeholder={"Write a message..."} />
                    <TouchableOpacity onPress={this.sendPrivateMessage} style={styles.bottomRightSend}>
                        <View style={styles.rowCustom}>
                            <Image source={require("../../../assets/icons/send.png")} style={styles.sendIcon} />
                            <Text style={styles.specialTextSend}>Send Message</Text>
                        </View>
                    </TouchableOpacity>    
                </View>
            </RBSheet>
            <RBSheet
                ref={ref => {
                    this.RBSheetApply = ref;
                }}
                height={height}
                openDuration={250}
                customStyles={{
                    container: {
                  
                    }
                }}
                >
                <Toast ref={(ref) => Toast.setRef(ref)} />
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Uploading content...'}
                    textStyle={styles.spinnerTextStyle}
                    overlayColor={"rgba(0, 0, 0, 0.75)"}
                />
                 <DateTimePickerModal
                    isVisible={this.state.isDatePickerVisible}
                    mode="date"
                    onConfirm={(date) => {
                        this.setState({
                            isDatePickerVisible: false,
                            [`milestone${this.state.selectedMilestone}`]: {
                                ...this.state[`milestone${this.state.selectedMilestone}`],
                                date
                            }
                        })
                    }}
                    onCancel={() => {
                        this.setState({
                            isDatePickerVisible: false
                        })
                    }}
                />
                <ScrollView style={{ zIndex: -1 }} contentContainerStyle={{ paddingBottom: 50 }} vertical={true}>
                <Header style={{ backgroundColor: "#303030" }}>
                    <Left>
                        <Button onPress={() => {
                             this.RBSheetApply.close();
                        }} transparent>
                            <Image source={require("../../../assets/icons/close.png")} style={[styles.headerIcon, { tintColor: "#fdd530" }]} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: "#ffd530" }}>Submit Proposal</Title>
                    </Body>
                    <Right />
                </Header>
                <KeyboardAwareScrollView 
                    extraScrollHeight={125}
                    enableOnAndroid={true}
                    enableAutomaticScroll={(Platform.OS === 'ios')}>
                <View style={styles.margin}>
                    <Text style={styles.headerText}>Proposal settings</Text>
                    <View style={{ marginTop: 10 }} />
                    <Text style={styles.smallerText}>This proposal requires <Text style={{ fontWeight: "bold" }}>5 connects/tokens</Text></Text>
                    <View style={{ marginTop: 5 }} />
                    <Text style={styles.smallerText}>When you submit this proposal, you'll have <Text style={{ fontWeight: "bold" }}>58 connects/tokens</Text> remaining.</Text>
                </View>
                <View style={styles.thickHr} />
                <View style={styles.margin}>
                    <Text style={styles.headerText}>Job details</Text>
                    <View style={styles.thinLine} />
                    <Text style={styles.title}>{job.title}</Text>
                    <View style={{ marginTop: 10 }} />
                    <Text>{job.description}</Text>
                </View>
                <View style={styles.thickHr} />
                <View style={styles.margin}>
                <Text style={styles.title}>Rate/Billing</Text>
                {job.pricing.fixedOrHourly === "hourly" ? null : <View style={{ minHeight: 75 }}>
                    <Tabs selected={this.state.page} style={{ backgroundColor: 'white' }}
                        selectedStyle={{ color: 'blue' }} onSelect={el=> {
                            if (el.props.name === "second") {
                                this.setState({
                                    page: el.props.name,
                                    milestone: true
                                }) 
                            } else {
                                this.setState({
                                    page: el.props.name,
                                    milestone: false
                                }) 
                            }
                        }}>
                        <Text name="first" selectedIconStyle={{ borderTopWidth: 2, borderTopColor: 'blue' }}>Project</Text>
                        <Text name="second" selectedIconStyle={{ borderTopWidth: 2, borderTopColor: 'blue' }}>Milestone(s)</Text>
                    </Tabs>
                </View>}
                {this.state.page === "first" ? this.renderFirstPage() : this.renderSecondPage()}
                </View>
                <View style={styles.thickHr} />
                    <View style={styles.margin}>
                        <Text style={styles.yourRate}>Project duration</Text>
                        <View style={{ marginTop: 10 }} />
                        <RNPickerSelect
                            placeholderTextColor="#303030"
                            style={{...pickerStyle}}
                            onValueChange={(value) => {
                                this.setState({
                                    duration: value
                                })
                            }}
                            textInputProps={{ fontSize: 18, fontWeight: "bold" }}
                            items={[
                                { label: 'More than 6 months', value: 'More than 6 months' },
                                { label: '3 to 6 months', value: '3 to 6 months' },
                                { label: '1 to 3 months', value: '1 to 3 months' },
                                { label: "Less than 1 month", value: "Less than 1 month" }
                            ]}
                        />
                    </View>
                <View style={styles.thickHr} />
                    <View style={styles.margin}>
                        <Text style={[styles.yourRate, { marginBottom: 10 }]}>Attachments</Text>
                        <Text>Would you like to attach any images or documents to this application?</Text>
                        <View style={{ marginTop: 20 }} />
                        {attachments !== undefined && attachments.length > 0 ? <Text style={styles.yourRate}>You've attached ({attachments.length}) file(s)</Text> : null}
                        <View style={{ marginTop: 20 }} />
                        <Button onPress={() => {
                            this.handleFileSelection();
                        }} style={{ width: "75%", justifyContent: "center", padding: 10, backgroundColor: "#303030" }} info><Image style={styles.clip} source={require("../../../assets/icons/attach.png")} /><Text style={styles.infoText}>Choose Attachment</Text></Button>
                    </View>
                <View style={styles.thickHr} />
                <View style={styles.margin}>
                    <Text style={styles.yourRate}>Introduce Yourself</Text>
                    <Text>What makes you a strong candidate for this job?</Text>
                    <View style={styles.hr} />
                    <Text style={{ fontWeight: "bold" }}>Message to client</Text>
                    <Text style={{ marginTop: 10 }}>Describe some of your expereinces that make you a great candidate for this job. Include any questions you may have about this job, or even request a video call!</Text>
                    <View style={{ marginTop: 15 }} />
                    
                        <Textarea style={styles.coverletterbox} value={this.state.coverLetterText} onChangeText={(value) => {
                            this.setState({
                                coverLetterText: value
                            })
                        }} rowSpan={5} bordered placeholder="Add your cover letter or any important information" />

                        {typeof job.questionsBeforeApplying !== "undefined" && job.questionsBeforeApplying.length > 0 ? job.questionsBeforeApplying.map((question, index) => {
                            return (
                                <Fragment key={index}>
                                    <Text style={{ marginBottom: 20, marginTop: 20, fontWeight: "bold" }}>{question}</Text>
                                    <Textarea value={(this.state.question + index).answer} onChangeText={(value) => {
                                        this.setState({
                                            [`question${index}`]: {
                                                answer: value,
                                                question
                                            }
                                        })
                                    }} rowSpan={5} bordered placeholder="Enter your answer here..." />
                                </Fragment>
                            );
                        }) : null}
                    
                    {this.renderButtonsContinuation()}
                </View>
                </KeyboardAwareScrollView>
                </ScrollView>
            </RBSheet>
            <SideMenu openMenuOffset={width * 0.80} menuPosition={"right"} isOpen={this.state.menuOpen} menu={menu}>
                <TouchableOpacity onPress={() => {
                    this.setState({
                        menuOpen: !this.state.menuOpen
                    })
                }} style={styles.bottomRightCorner}>
                    <Image source={require("../../../assets/icons/circle-menu.png")} style={styles.circleMenu} />
                </TouchableOpacity>
                <Header style={{ backgroundColor: "#303030" }}>
                    <Left>
                        <Button onPress={() => {
                            this.props.props.navigation.goBack();
                        }} transparent>
                            <Image source={require("../../../assets/icons/go-back.png")} style={[styles.headerIcon, { tintColor: "#fdd530" }]} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: "#ffd530" }}>Individual Job</Title>
                        <Subtitle style={{ color: "#ffd530" }}>{this.renderCategory(job.category)}</Subtitle>
                    </Body>
                    <Right />
                </Header>
                <Modal isVisible={this.state.showToast}>
                    <View style={styles.modalStyles}>
                    <TouchableOpacity onPress={() => {
                        this.setState({
                            showToast: false
                        })
                    }} style={styles.topLeftAbsolute}>
                        <Image source={require("../../../assets/icons/close.png")} style={{ maxWidth: 35, maxHeight: 35 }} />
                    </TouchableOpacity>
                        <View style={{ margin: 20 }}>
                            <Text style={{ fontWeight: "bold", fontSize: 18, textAlign: "center" }}>You do NOT have enough tokens/credits to apply for this job, please purchase more if you'd like to keep applying...</Text>
                            <View style={{ marginTop: 15 }} />
                            <AwesomeButtonBlue type={"secondary"} onPress={() => {
                                this.setState({
                                    showToast: false,
                                    milestoneCount: [],
                                    myBid: 0,
                                    selectedMilestone: null,
                                    duration: "",
                                    milestone: false,
                                    question0: null,
                                    question1: null,
                                    question2: null,
                                    question3: null,
                                    question4: null,
                                    milestone1: {},
                                    milestone2: {},
                                    milestone3: {},
                                    milestone4: {},
                                    milestone5: {},
                                    milestone6: {},
                                    milestone7: {},
                                    milestone8: {},
                                    coverLetterText: ""
                                }, () => {
                                    this.props.props.navigation.push("purchase-tokens-homepage");
                                })
                        }} stretch={true}>Purchase more tokens/credits</AwesomeButtonBlue>
                        </View>
                    </View>
                </Modal>
                <AwesomeAlert
                    show={this.state.showAlert}
                    showProgress={false}
                    title="Successfully applied to listing!"
                    message="You have successfully applied to the selected listing! Message this user to introduce yourself for a higher liklihood of being hired..."
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={true}
                    showCancelButton={true}
                    showConfirmButton={true}
                    cancelText="No, Cancel"
                    confirmText="Message User!"
                    confirmButtonColor="green"
                    cancelButtonColor="#DD6B55"
                    onCancelPressed={() => {
                        this.setState({
                            showAlert: false
                        });
                    }}
                    onConfirmPressed={() => {
                        this.setState({
                            showAlert: false
                        }, () => {
                            setTimeout(() => {
                                this.RBSheetApplyMessageUser.open();
                            }, 1000)
                        });
                    }}
                />
                <ScrollView contentContainerStyle={{ paddingBottom: 50 }} style={styles.container}>

                    <View style={styles.margin}>
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
                        <View style={styles.hr} />
                            <MapView    
                                style={{ width: "100%", height: 225 }}
                                region={this.state.region}
                                onRegionChangeComplete={this.onRegionChange}
                            >
                                
                            </MapView>
                        <View style={styles.hr} />
                        <AwesomeButtonBlue type={"secondary"} onPress={() => {
                            this.RBSheetApply.open();
                        }} stretch={true}>Apply for this position</AwesomeButtonBlue>
                    </View>
                </ScrollView>
            </SideMenu>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.signupData.authData.unique_id,
        fullName: `${state.signupData.authData.firstName} ${state.signupData.authData.lastName}`
    }
}
export default connect(mapStateToProps, {  })(JobIndividualHelper);