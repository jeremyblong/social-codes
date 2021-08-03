import React, { Component, Fragment } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Dimensions, PermissionsAndroid, Linking } from 'react-native';
import styles from './styles.js';
import axios from "axios";
import Config from "react-native-config";
import { Header, Left, Body, Right, Title, Subtitle, Button, Text as NativeText, Thumbnail, List, ListItem, Footer, FooterTab, Badge, Icon } from 'native-base';
import { connect } from 'react-redux';
import moment from 'moment';
import RBSheet from "react-native-raw-bottom-sheet";
import SlideUpPaymentHelper from "./panes/fixed/slideUpPanePay.js";
import Popover from 'react-native-popover-view';
import Video from 'react-native-video';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import _ from "lodash";
import PayHourlyDepositPaneHelper from "./panes/hourly/payHourlyDeposit.js";
import { saveFilesPane } from "../../../../actions/work/index.js";
import RNFetchBlob from 'rn-fetch-blob';
import AwesomeButtonCartman from 'react-native-really-awesome-button/src/themes/cartman';
import Toast from 'react-native-toast-message';
import Dialog from "react-native-dialog";
import SheetHelperPaymentsDisplayRef from "../../freelancer/individualGig/sheets/payments/payments.js";
import SlideUpPanePayMilestones from "./panes/milestones/index.js";

const { width, height } = Dimensions.get("window");

class IndividualActiveJobHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        job: null,
        confirmationCompleteModal: false,
        loading: false,
        completedClient: null,
        payments: [],
        showRemainderModal: false,
        price: null,
        application: {
            payments: []
        },
        total: 0
    }
    this.sheetRef = React.createRef();
    this.sheetRefHourly = React.createRef();
    this.paymentRefSheet = React.createRef();
    this.sheetRefMilestone = React.createRef();
}
    componentDidMount() {

        const passedData = this.props.props.route.params.item;

        axios.get(`${Config.ngrok_url}/fetch/specific/job/active`, {
            params: {
                id: this.props.unique_id,
                jobID: passedData.jobID,
                applicant: passedData.with,
                hiredID: passedData.id
            }
        }).then((res) => {
            if (res.data.message === "Located specific job!") {
                console.log(res.data);

                const { job, files } = res.data;

                let total = 0;

                if (job.milestone8 !== null) {
                    total = (job.milestone8.price + job.milestone7.price + job.milestone6.price + job.milestone5.price + job.milestone4.price + job.milestone3.price + job.milestone2.price + job.milestone1.price);
                } else if (job.milestone7 !== null) {
                    total = (job.milestone7.price + job.milestone6.price + job.milestone5.price + job.milestone4.price + job.milestone3.price + job.milestone2.price + job.milestone1.price);
                } else if (job.milestone6 !== null) {
                    total = (job.milestone6.price + job.milestone5.price + job.milestone4.price + job.milestone3.price + job.milestone2.price + job.milestone1.price);
                } else if (job.milestone5 !== null) {
                    total = (job.milestone5.price + job.milestone4.price + job.milestone3.price + job.milestone2.price + job.milestone1.price);
                } else if (job.milestone4 !== null) {
                    total = (job.milestone4.price + job.milestone3.price + job.milestone2.price + job.milestone1.price);
                } else if (job.milestone3 !== null) {
                    total = (job.milestone3.price + job.milestone2.price + job.milestone1.price);
                } else if (job.milestone2 !== null) {
                    total = (job.milestone2.price + job.milestone1.price);
                } else if (job.milestone1 !== null) {
                    total = (job.milestone1.price);
                } else {
                    total = 0;
                }

                this.setState({
                    job,
                    loading: true,
                    total,
                    completedClient: passedData.completedClient
                }, () => {
                    this.props.saveFilesPane([...files]);
                })
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })

        axios.get(`${Config.ngrok_url}/gather/application/data`, {
            params: {
                id: this.props.unique_id,
                passedID: passedData.id
            }
        }).then((res) => {
            if (res.data.message === "Gathered data!") {
                console.log(res.data);

                const { application } = res.data;

                this.setState({
                    application
                })
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    calculateLength = (duration, date) => {
        switch (duration) {
            case "Less than 1 month":
                return ` deposit is due by/within ${moment(date += 1000 * 60 * 60 * 24 * 30).format("MMMM Do YYYY")} as a payment guarantee...`;
                break;
            case "1 to 3 months":
                return ` deposit is due by/within ${moment(date += 1000 * 60 * 60 * 24 * 30).format("MMMM Do YYYY")} to ${moment(date += 1000 * 60 * 60 * 24 * 90).format("MMMM Do YYYY")} as a payment guarantee...`;
                break;
            case "3 to 6 months":
                return ` deposit is due by/within ${moment(date += 1000 * 60 * 60 * 24 * 90).format("MMMM Do YYYY")} to ${moment(date += 1000 * 60 * 60 * 24 * 180).format("MMMM Do YYYY")} as a payment guarantee...`;
                break;
            case "More than 6 months":
                return ` deposit is due by/within ${moment(date += 1000 * 60 * 60 * 24 * 180).format("MMMM Do YYYY")} or longer as a payment guarantee...`;
                break;
            default:
                break;
        }
    }
    calculateLengthHourly = (duration, date) => {
        const { job } = this.state;

        switch (duration) {
            case "Less than 1 month":
                return ` deposit is due by/within ${moment(date += 1000 * 60 * 60 * 24 * 30).format("MMMM Do YYYY")} as a payment guarantee for a minimum of 5 hours of work clocked at $${Math.round(Number(job.hourlyRate)).toFixed(2)} per hour...`;
                break;
            case "1 to 3 months":
                return ` deposit is due by/within ${moment(date += 1000 * 60 * 60 * 24 * 30).format("MMMM Do YYYY")} to ${moment(date += 1000 * 60 * 60 * 24 * 90).format("MMMM Do YYYY")} as a payment guarantee for a minimum of 5 hours of work clocked at $${Math.round(Number(job.hourlyRate)).toFixed(2)} per hour...`;
                break;
            case "3 to 6 months":
                return ` deposit is due by/within ${moment(date += 1000 * 60 * 60 * 24 * 90).format("MMMM Do YYYY")} to ${moment(date += 1000 * 60 * 60 * 24 * 180).format("MMMM Do YYYY")} as a payment guarantee for a minimum of 5 hours of work clocked at $${Math.round(Number(job.hourlyRate)).toFixed(2)} per hour...`;
                break;
            case "More than 6 months":
                return ` deposit is due by/within ${moment(date += 1000 * 60 * 60 * 24 * 180).format("MMMM Do YYYY")} or longer as a payment guarantee for a minimum of 5 hours of work clocked at $${Math.round(Number(job.hourlyRate)).toFixed(2)} per hour...`;
                break;
            default:
                break;
        }
    } 
    renderQuestions = (jobData) => {
        if (jobData.question4 !== null) {
            return (
                <View>
                    <Text style={[styles.detailsTitle, { marginTop: 25 }]}>Applicant Q&A (replies to original posting questions)</Text>
                    <View style={styles.thinBlackHr} />
                    <Popover
                        from={(
                            <TouchableOpacity>
                                <Text style={{ color: "darkred" }}>{jobData.question0.question}</Text>
                            </TouchableOpacity>
                        )}>
                        <View style={{ padding: 20 }}>
                            <Text>{jobData.question0.answer}</Text>
                        </View>
                    </Popover>
                    <View style={styles.thinBlackHr} />
                    <Popover
                        from={(
                            <TouchableOpacity>
                                <Text style={{ color: "darkred" }}>{jobData.question1.question}</Text>
                            </TouchableOpacity>
                        )}>
                        <View style={{ padding: 20 }}>
                            <Text>{jobData.question1.answer}</Text>
                        </View>
                    </Popover>
                    <View style={styles.thinBlackHr} />
                    <Popover
                        from={(
                            <TouchableOpacity>
                                <Text style={{ color: "darkred" }}>{jobData.question2.question}</Text>
                            </TouchableOpacity>
                        )}>
                        <View style={{ padding: 20 }}>
                            <Text>{jobData.question2.answer}</Text>
                        </View>
                    </Popover>
                    <View style={styles.thinBlackHr} />
                    <Popover
                        from={(
                            <TouchableOpacity>
                                <Text style={{ color: "darkred" }}>{jobData.question3.question}</Text>
                            </TouchableOpacity>
                        )}>
                        <View style={{ padding: 20 }}>
                            <Text>{jobData.question3.answer}</Text>
                        </View>
                    </Popover>
                    <View style={styles.thinBlackHr} />
                    <Popover
                        from={(
                            <TouchableOpacity>
                                <Text style={{ color: "darkred" }}>{jobData.question4.question}</Text>
                            </TouchableOpacity>
                        )}>
                        <View style={{ padding: 20 }}>
                            <Text>{jobData.question4.answer}</Text>
                        </View>
                    </Popover>
                    <View style={styles.thinBlackHr} />
                </View>
            );
        } else if (jobData.question3 !== null) {
            return (
                <View>
                    <Text style={[styles.detailsTitle, { marginTop: 25 }]}>Applicant Q&A (replies to original posting questions)</Text>
                    <View style={styles.thinBlackHr} />
                    <Popover
                        from={(
                            <TouchableOpacity>
                                <Text style={{ color: "darkred" }}>{jobData.question0.question}</Text>
                            </TouchableOpacity>
                        )}>
                        <View style={{ padding: 20 }}>
                            <Text>{jobData.question0.answer}</Text>
                        </View>
                    </Popover>
                    <View style={styles.thinBlackHr} />
                    <Popover
                        from={(
                            <TouchableOpacity>
                                <Text style={{ color: "darkred" }}>{jobData.question1.question}</Text>
                            </TouchableOpacity>
                        )}>
                        <View style={{ padding: 20 }}>
                            <Text>{jobData.question1.answer}</Text>
                        </View>
                    </Popover>
                    <View style={styles.thinBlackHr} />
                    <Popover
                        from={(
                            <TouchableOpacity>
                                <Text style={{ color: "darkred" }}>{jobData.question2.question}</Text>
                            </TouchableOpacity>
                        )}>
                        <View style={{ padding: 20 }}>
                            <Text>{jobData.question2.answer}</Text>
                        </View>
                    </Popover>
                    <View style={styles.thinBlackHr} />
                    <Popover
                        from={(
                            <TouchableOpacity>
                                <Text style={{ color: "darkred" }}>{jobData.question3.question}</Text>
                            </TouchableOpacity>
                        )}>
                        <View style={{ padding: 20 }}>
                            <Text>{jobData.question3.answer}</Text>
                        </View>
                    </Popover>
                    <View style={styles.thinBlackHr} />
                </View>
            );
        } else if (jobData.question2 !== null) {
            return (
                <View>
                    <Text style={[styles.detailsTitle, { marginTop: 25 }]}>Applicant Q&A (replies to original posting questions)</Text>
                    <View style={styles.thinBlackHr} />
                    <Popover
                        from={(
                            <TouchableOpacity>
                                <Text style={{ color: "darkred" }}>{jobData.question0.question}</Text>
                            </TouchableOpacity>
                        )}>
                        <View style={{ padding: 20 }}>
                            <Text>{jobData.question0.answer}</Text>
                        </View>
                    </Popover>
                    <View style={styles.thinBlackHr} />
                    <Popover
                        from={(
                            <TouchableOpacity>
                                <Text style={{ color: "darkred" }}>{jobData.question1.question}</Text>
                            </TouchableOpacity>
                        )}>
                        <View style={{ padding: 20 }}>
                            <Text>{jobData.question1.answer}</Text>
                        </View>
                    </Popover>
                    <View style={styles.thinBlackHr} />
                    <Popover
                        from={(
                            <TouchableOpacity>
                                <Text style={{ color: "darkred" }}>{jobData.question2.question}</Text>
                            </TouchableOpacity>
                        )}>
                        <View style={{ padding: 20 }}>
                            <Text>{jobData.question2.answer}</Text>
                        </View>
                    </Popover>
                    <View style={styles.thinBlackHr} />
                </View>
            );
        } else if (jobData.question1 !== null) {
            return (
                <View>
                    <Text style={[styles.detailsTitle, { marginTop: 25 }]}>Applicant Q&A (replies to original posting questions)</Text>
                    <View style={styles.thinBlackHr} />
                    <Popover
                        from={(
                            <TouchableOpacity>
                                <Text style={{ color: "darkred" }}>{jobData.question0.question}</Text>
                            </TouchableOpacity>
                        )}>
                        <View style={{ padding: 20 }}>
                            <Text>{jobData.question0.answer}</Text>
                        </View>
                    </Popover>
                    <View style={styles.thinBlackHr} />
                    <Popover
                        from={(
                            <TouchableOpacity>
                                <Text style={{ color: "darkred" }}>{jobData.question1.question}</Text>
                            </TouchableOpacity>
                        )}>
                        <View style={{ padding: 20 }}>
                            <Text>{jobData.question1.answer}</Text>
                        </View>
                    </Popover>
                    <View style={styles.thinBlackHr} />
                </View>
            );
        } else if (jobData.question0 !== null) {
            return (
                <View>
                    <Text style={[styles.detailsTitle, { marginTop: 25 }]}>Applicant Q&A (replies to original posting questions)</Text>
                    <View style={styles.thinBlackHr} />
                    <Popover
                        from={(
                            <TouchableOpacity>
                                <Text style={{ color: "darkred" }}>{jobData.question0.question}</Text>
                            </TouchableOpacity>
                        )}>
                        <View style={{ padding: 20 }}>
                            <Text>{jobData.question0.answer}</Text>
                        </View>
                    </Popover>
                    <View style={styles.thinBlackHr} />
                </View>
            );
        }
    }
    onButtonPressHourly = () => {
        console.log("clicked.");

        this.sheetRefHourly.current.open();
    }
    handleDownloadFile = async (url, fileName, type) => {

        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: "We would like to download this file to your device",
              message:
                "We'd like to download this file to your device " +
                "please accept this permission to continue downloading this work...",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "Grant!"
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You may now download!");

            const { config, fs } = RNFetchBlob;

            const downloads = fs.dirs.DownloadDir;

            return config({
            fileCache : true,
            addAndroidDownloads : {
                useDownloadManager : true,
                notification : true,
                path:  downloads + '/' + fileName,
            }
            })
            .fetch('GET', url);
        } else {
            console.log("Download denied");
        }
    }
    openURLLink = (url) => {
        console.log("openURLLink clicked...");

        Linking.canOpenURL(url).then(supported => {
            if (supported) {
              Linking.openURL(url);
            } else {
              console.log("Don't know how to open URI: " + url);

              Toast.show({
                  text1: "Cannot open URL, invalid URL.",
                  text2: "We cannot open the provided URL, please check to make sure it is correct.",
                  type: "error",
                  position: "top",
                  visibilityTime: 4000
              })
            }
        });
    }
    gatherJobAndOpenPane = () => {

        const passedData = this.props.props.route.params.item;

        axios.get(`${Config.ngrok_url}/gather/application/data`, {
            params: {
                id: this.props.unique_id,
                passedID: passedData.id
            }
        }).then((res) => {
            if (res.data.message === "Gathered data!") {
                console.log(res.data);

                const { application } = res.data;

                this.setState({
                    application
                }, () => {
                    setTimeout(() => {
                        this.paymentRefSheet.current.open();
                    }, 2500)
                })
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    calculateTotalOfMilestones = (prices) => {
        if (typeof prices !== "undefined" && prices.length > 0) {
            let sum = 0;
            for (let index = 0; index < prices.length; index++) {
                const price = prices[index];
                sum += price;
            }
            return sum.toFixed(2);
        }
    }
    handleMilestonePayment = (price) => {
        this.setState({
            price
        }, () => {
            this.sheetRefMilestone.current.open();
        })
    }
    calculateMilestonesPrice = (job) => {
        const passedData = this.props.props.route.params.item;
        
        if (job.milestone8 !== null) {
            return (
                <ScrollView horizontal={true}>
                    <View style={[styles.centeredPriceBox, { margin: 15 }]}>
                            <View style={styles.margin}>
                                <Text style={styles.priceText}>Total due is $<Text style={{ color: "#ffd530", textDecorationLine: "underline" }}>{this.calculateTotalOfMilestones([job.milestone8.price, job.milestone7.price, job.milestone6.price, job.milestone5.price, job.milestone4.price, job.milestone3.price, job.milestone2.price, job.milestone1.price])}</Text>{this.calculateLength(job.duration, passedData.systemDate)}</Text>
                                <View style={styles.hr} />
                                <View style={styles.centered}>
                                    <Button onPress={() => {
                                        this.handleMilestonePayment(job.milestone1.price);
                                    }} style={styles.greyButton} info>
                                        <Text style={{ color: "#ffd530" }}>Milestone payment 1 of ${job.milestone1.price.toFixed(2)}</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.centeredPriceBox, { margin: 15 }]}>
                            <View style={styles.margin}>
                                <Text style={styles.priceText}>Total due is $<Text style={{ color: "#ffd530", textDecorationLine: "underline" }}>{this.calculateTotalOfMilestones([job.milestone8.price, job.milestone7.price, job.milestone6.price, job.milestone5.price, job.milestone4.price, job.milestone3.price, job.milestone2.price, job.milestone1.price])}</Text>{this.calculateLength(job.duration, passedData.systemDate)}</Text>
                                <View style={styles.hr} />
                                <View style={styles.centered}>
                                    <Button onPress={() => {
                                        this.handleMilestonePayment(job.milestone2.price);
                                    }} style={styles.greyButton} info>
                                        <Text style={{ color: "#ffd530" }}>Milestone payment 2 of ${job.milestone2.price.toFixed(2)}</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.centeredPriceBox, { margin: 15 }]}>
                            <View style={styles.margin}>
                                <Text style={styles.priceText}>Total due is $<Text style={{ color: "#ffd530", textDecorationLine: "underline" }}>{this.calculateTotalOfMilestones([job.milestone8.price, job.milestone7.price, job.milestone6.price, job.milestone5.price, job.milestone4.price, job.milestone3.price, job.milestone2.price, job.milestone1.price])}</Text>{this.calculateLength(job.duration, passedData.systemDate)}</Text>
                                <View style={styles.hr} />
                                <View style={styles.centered}>
                                    <Button onPress={() => {
                                        this.handleMilestonePayment(job.milestone3.price);
                                    }} style={styles.greyButton} info>
                                        <Text style={{ color: "#ffd530" }}>Milestone payment 3 of ${job.milestone3.price.toFixed(2)}</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.centeredPriceBox, { margin: 15 }]}>
                            <View style={styles.margin}>
                                <Text style={styles.priceText}>Total due is $<Text style={{ color: "#ffd530", textDecorationLine: "underline" }}>{this.calculateTotalOfMilestones([job.milestone8.price, job.milestone7.price, job.milestone6.price, job.milestone5.price, job.milestone4.price, job.milestone3.price, job.milestone2.price, job.milestone1.price])}</Text>{this.calculateLength(job.duration, passedData.systemDate)}</Text>
                                <View style={styles.hr} />
                                <View style={styles.centered}>
                                    <Button onPress={() => {
                                        this.handleMilestonePayment(job.milestone4.price);
                                    }} style={styles.greyButton} info>
                                        <Text style={{ color: "#ffd530" }}>Milestone payment 4 of ${job.milestone4.price.toFixed(2)}</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.centeredPriceBox, { margin: 15 }]}>
                            <View style={styles.margin}>
                                <Text style={styles.priceText}>Total due is $<Text style={{ color: "#ffd530", textDecorationLine: "underline" }}>{this.calculateTotalOfMilestones([job.milestone8.price, job.milestone7.price, job.milestone6.price, job.milestone5.price, job.milestone4.price, job.milestone3.price, job.milestone2.price, job.milestone1.price])}</Text>{this.calculateLength(job.duration, passedData.systemDate)}</Text>
                                <View style={styles.hr} />
                                <View style={styles.centered}>
                                    <Button onPress={() => {
                                        this.handleMilestonePayment(job.milestone5.price);
                                    }} style={styles.greyButton} info>
                                        <Text style={{ color: "#ffd530" }}>Milestone payment 5 of ${job.milestone5.price.toFixed(2)}</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.centeredPriceBox, { margin: 15 }]}>
                            <View style={styles.margin}>
                                <Text style={styles.priceText}>Total due is $<Text style={{ color: "#ffd530", textDecorationLine: "underline" }}>{this.calculateTotalOfMilestones([job.milestone8.price, job.milestone7.price, job.milestone6.price, job.milestone5.price, job.milestone4.price, job.milestone3.price, job.milestone2.price, job.milestone1.price])}</Text>{this.calculateLength(job.duration, passedData.systemDate)}</Text>
                                <View style={styles.hr} />
                                <View style={styles.centered}>
                                    <Button onPress={() => {
                                        this.handleMilestonePayment(job.milestone6.price);
                                    }} style={styles.greyButton} info>
                                        <Text style={{ color: "#ffd530" }}>Milestone payment 6 of ${job.milestone6.price.toFixed(2)}</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.centeredPriceBox, { margin: 15 }]}>
                            <View style={styles.margin}>
                                <Text style={styles.priceText}>Total due is $<Text style={{ color: "#ffd530", textDecorationLine: "underline" }}>{this.calculateTotalOfMilestones([job.milestone8.price, job.milestone7.price, job.milestone6.price, job.milestone5.price, job.milestone4.price, job.milestone3.price, job.milestone2.price, job.milestone1.price])}</Text>{this.calculateLength(job.duration, passedData.systemDate)}</Text>
                                <View style={styles.hr} />
                                <View style={styles.centered}>
                                    <Button onPress={() => {
                                        this.handleMilestonePayment(job.milestone7.price);
                                    }} style={styles.greyButton} info>
                                        <Text style={{ color: "#ffd530" }}>Milestone payment 7 of ${job.milestone7.price.toFixed(2)}</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.centeredPriceBox, { margin: 15 }]}>
                            <View style={styles.margin}>
                                <Text style={styles.priceText}>Total due is $<Text style={{ color: "#ffd530", textDecorationLine: "underline" }}>{this.calculateTotalOfMilestones([job.milestone8.price, job.milestone7.price, job.milestone6.price, job.milestone5.price, job.milestone4.price, job.milestone3.price, job.milestone2.price, job.milestone1.price])}</Text>{this.calculateLength(job.duration, passedData.systemDate)}</Text>
                                <View style={styles.hr} />
                                <View style={styles.centered}>
                                    <Button onPress={() => {
                                        this.handleMilestonePayment(job.milestone8.price);
                                    }} style={styles.greyButton} info>
                                        <Text style={{ color: "#ffd530" }}>Milestone payment 8 of ${job.milestone8.price.toFixed(2)}</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                </ScrollView>
            );
        } else if (job.milestone7 !== null) {
            return (
                <ScrollView horizontal={true}>
                    <View style={[styles.centeredPriceBox, { margin: 15 }]}>
                            <View style={styles.margin}>
                                <Text style={styles.priceText}>Total due is $<Text style={{ color: "#ffd530", textDecorationLine: "underline" }}>{this.calculateTotalOfMilestones([job.milestone7.price, job.milestone6.price, job.milestone5.price, job.milestone4.price, job.milestone3.price, job.milestone2.price, job.milestone1.price])}</Text>{this.calculateLength(job.duration, passedData.systemDate)}</Text>
                                <View style={styles.hr} />
                                <View style={styles.centered}>
                                    <Button onPress={() => {
                                        this.handleMilestonePayment(job.milestone1.price);
                                    }} style={styles.greyButton} info>
                                        <Text style={{ color: "#ffd530" }}>Milestone payment 1 of ${job.milestone1.price.toFixed(2)}</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.centeredPriceBox, { margin: 15 }]}>
                            <View style={styles.margin}>
                                <Text style={styles.priceText}>Total due is $<Text style={{ color: "#ffd530", textDecorationLine: "underline" }}>{this.calculateTotalOfMilestones([job.milestone7.price, job.milestone6.price, job.milestone5.price, job.milestone4.price, job.milestone3.price, job.milestone2.price, job.milestone1.price])}</Text>{this.calculateLength(job.duration, passedData.systemDate)}</Text>
                                <View style={styles.hr} />
                                <View style={styles.centered}>
                                    <Button onPress={() => {
                                        this.handleMilestonePayment(job.milestone2.price);
                                    }} style={styles.greyButton} info>
                                        <Text style={{ color: "#ffd530" }}>Milestone payment 2 of ${job.milestone2.price.toFixed(2)}</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.centeredPriceBox, { margin: 15 }]}>
                            <View style={styles.margin}>
                                <Text style={styles.priceText}>Total due is $<Text style={{ color: "#ffd530", textDecorationLine: "underline" }}>{this.calculateTotalOfMilestones([job.milestone7.price, job.milestone6.price, job.milestone5.price, job.milestone4.price, job.milestone3.price, job.milestone2.price, job.milestone1.price])}</Text>{this.calculateLength(job.duration, passedData.systemDate)}</Text>
                                <View style={styles.hr} />
                                <View style={styles.centered}>
                                    <Button onPress={() => {
                                        this.handleMilestonePayment(job.milestone3.price);
                                    }} style={styles.greyButton} info>
                                        <Text style={{ color: "#ffd530" }}>Milestone payment 3 of ${job.milestone3.price.toFixed(2)}</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.centeredPriceBox, { margin: 15 }]}>
                            <View style={styles.margin}>
                                <Text style={styles.priceText}>Total due is $<Text style={{ color: "#ffd530", textDecorationLine: "underline" }}>{this.calculateTotalOfMilestones([job.milestone7.price, job.milestone6.price, job.milestone5.price, job.milestone4.price, job.milestone3.price, job.milestone2.price, job.milestone1.price])}</Text>{this.calculateLength(job.duration, passedData.systemDate)}</Text>
                                <View style={styles.hr} />
                                <View style={styles.centered}>
                                    <Button onPress={() => {
                                        this.handleMilestonePayment(job.milestone4.price);
                                    }} style={styles.greyButton} info>
                                        <Text style={{ color: "#ffd530" }}>Milestone payment 4 of ${job.milestone4.price.toFixed(2)}</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.centeredPriceBox, { margin: 15 }]}>
                            <View style={styles.margin}>
                                <Text style={styles.priceText}>Total due is $<Text style={{ color: "#ffd530", textDecorationLine: "underline" }}>{this.calculateTotalOfMilestones([job.milestone7.price, job.milestone6.price, job.milestone5.price, job.milestone4.price, job.milestone3.price, job.milestone2.price, job.milestone1.price])}</Text>{this.calculateLength(job.duration, passedData.systemDate)}</Text>
                                <View style={styles.hr} />
                                <View style={styles.centered}>
                                    <Button onPress={() => {
                                        this.handleMilestonePayment(job.milestone5.price);
                                    }} style={styles.greyButton} info>
                                        <Text style={{ color: "#ffd530" }}>Milestone payment 5 of ${job.milestone5.price.toFixed(2)}</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.centeredPriceBox, { margin: 15 }]}>
                            <View style={styles.margin}>
                                <Text style={styles.priceText}>Total due is $<Text style={{ color: "#ffd530", textDecorationLine: "underline" }}>{this.calculateTotalOfMilestones([job.milestone7.price, job.milestone6.price, job.milestone5.price, job.milestone4.price, job.milestone3.price, job.milestone2.price, job.milestone1.price])}</Text>{this.calculateLength(job.duration, passedData.systemDate)}</Text>
                                <View style={styles.hr} />
                                <View style={styles.centered}>
                                    <Button onPress={() => {
                                        this.handleMilestonePayment(job.milestone6.price);
                                    }} style={styles.greyButton} info>
                                        <Text style={{ color: "#ffd530" }}>Milestone payment 6 of ${job.milestone6.price.toFixed(2)}</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.centeredPriceBox, { margin: 15 }]}>
                            <View style={styles.margin}>
                                <Text style={styles.priceText}>Total due is $<Text style={{ color: "#ffd530", textDecorationLine: "underline" }}>{this.calculateTotalOfMilestones([job.milestone7.price, job.milestone6.price, job.milestone5.price, job.milestone4.price, job.milestone3.price, job.milestone2.price, job.milestone1.price])}</Text>{this.calculateLength(job.duration, passedData.systemDate)}</Text>
                                <View style={styles.hr} />
                                <View style={styles.centered}>
                                    <Button onPress={() => {
                                        this.handleMilestonePayment(job.milestone7.price);
                                    }} style={styles.greyButton} info>
                                        <Text style={{ color: "#ffd530" }}>Milestone payment 7 of ${job.milestone7.price.toFixed(2)}</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                </ScrollView>
            );
        } else if (job.milestone6 !== null) {
            return (
                <ScrollView horizontal={true}>
                    <View style={[styles.centeredPriceBox, { margin: 15 }]}>
                            <View style={styles.margin}>
                                <Text style={styles.priceText}>Total due is $<Text style={{ color: "#ffd530", textDecorationLine: "underline" }}>{this.calculateTotalOfMilestones([job.milestone6.price, job.milestone5.price, job.milestone4.price, job.milestone3.price, job.milestone2.price, job.milestone1.price])}</Text>{this.calculateLength(job.duration, passedData.systemDate)}</Text>
                                <View style={styles.hr} />
                                <View style={styles.centered}>
                                    <Button onPress={() => {
                                        this.handleMilestonePayment(job.milestone1.price);
                                    }} style={styles.greyButton} info>
                                        <Text style={{ color: "#ffd530" }}>Milestone payment 1 of ${job.milestone1.price.toFixed(2)}</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.centeredPriceBox, { margin: 15 }]}>
                            <View style={styles.margin}>
                                <Text style={styles.priceText}>Total due is $<Text style={{ color: "#ffd530", textDecorationLine: "underline" }}>{this.calculateTotalOfMilestones([job.milestone6.price, job.milestone5.price, job.milestone4.price, job.milestone3.price, job.milestone2.price, job.milestone1.price])}</Text>{this.calculateLength(job.duration, passedData.systemDate)}</Text>
                                <View style={styles.hr} />
                                <View style={styles.centered}>
                                    <Button onPress={() => {
                                        this.handleMilestonePayment(job.milestone2.price);
                                    }} style={styles.greyButton} info>
                                        <Text style={{ color: "#ffd530" }}>Milestone payment 2 of ${job.milestone2.price.toFixed(2)}</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.centeredPriceBox, { margin: 15 }]}>
                            <View style={styles.margin}>
                                <Text style={styles.priceText}>Total due is $<Text style={{ color: "#ffd530", textDecorationLine: "underline" }}>{this.calculateTotalOfMilestones([job.milestone6.price, job.milestone5.price, job.milestone4.price, job.milestone3.price, job.milestone2.price, job.milestone1.price])}</Text>{this.calculateLength(job.duration, passedData.systemDate)}</Text>
                                <View style={styles.hr} />
                                <View style={styles.centered}>
                                    <Button onPress={() => {
                                        this.handleMilestonePayment(job.milestone3.price);
                                    }} style={styles.greyButton} info>
                                        <Text style={{ color: "#ffd530" }}>Milestone payment 3 of ${job.milestone3.price.toFixed(2)}</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.centeredPriceBox, { margin: 15 }]}>
                            <View style={styles.margin}>
                                <Text style={styles.priceText}>Total due is $<Text style={{ color: "#ffd530", textDecorationLine: "underline" }}>{this.calculateTotalOfMilestones([job.milestone6.price, job.milestone5.price, job.milestone4.price, job.milestone3.price, job.milestone2.price, job.milestone1.price])}</Text>{this.calculateLength(job.duration, passedData.systemDate)}</Text>
                                <View style={styles.hr} />
                                <View style={styles.centered}>
                                    <Button onPress={() => {
                                        this.handleMilestonePayment(job.milestone4.price);
                                    }} style={styles.greyButton} info>
                                        <Text style={{ color: "#ffd530" }}>Milestone payment 4 of ${job.milestone4.price.toFixed(2)}</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.centeredPriceBox, { margin: 15 }]}>
                            <View style={styles.margin}>
                                <Text style={styles.priceText}>Total due is $<Text style={{ color: "#ffd530", textDecorationLine: "underline" }}>{this.calculateTotalOfMilestones([job.milestone6.price, job.milestone5.price, job.milestone4.price, job.milestone3.price, job.milestone2.price, job.milestone1.price])}</Text>{this.calculateLength(job.duration, passedData.systemDate)}</Text>
                                <View style={styles.hr} />
                                <View style={styles.centered}>
                                    <Button onPress={() => {
                                        this.handleMilestonePayment(job.milestone5.price);
                                    }} style={styles.greyButton} info>
                                        <Text style={{ color: "#ffd530" }}>Milestone payment 5 of ${job.milestone5.price.toFixed(2)}</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.centeredPriceBox, { margin: 15 }]}>
                            <View style={styles.margin}>
                                <Text style={styles.priceText}>Total due is $<Text style={{ color: "#ffd530", textDecorationLine: "underline" }}>{this.calculateTotalOfMilestones([job.milestone6.price, job.milestone5.price, job.milestone4.price, job.milestone3.price, job.milestone2.price, job.milestone1.price])}</Text>{this.calculateLength(job.duration, passedData.systemDate)}</Text>
                                <View style={styles.hr} />
                                <View style={styles.centered}>
                                    <Button onPress={() => {
                                        this.handleMilestonePayment(job.milestone6.price);
                                    }} style={styles.greyButton} info>
                                        <Text style={{ color: "#ffd530" }}>Milestone payment 6 of ${job.milestone6.price.toFixed(2)}</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                </ScrollView>
            );
        } else if (job.milestone5 !== null) {
            return (
                <ScrollView horizontal={true}>
                    <View style={[styles.centeredPriceBox, { margin: 15 }]}>
                            <View style={styles.margin}>
                                <Text style={styles.priceText}>Total due is $<Text style={{ color: "#ffd530", textDecorationLine: "underline" }}>{this.calculateTotalOfMilestones([job.milestone5.price, job.milestone4.price, job.milestone3.price, job.milestone2.price, job.milestone1.price])}</Text>{this.calculateLength(job.duration, passedData.systemDate)}</Text>
                                <View style={styles.hr} />
                                <View style={styles.centered}>
                                    <Button onPress={() => {
                                        this.handleMilestonePayment(job.milestone1.price);
                                    }} style={styles.greyButton} info>
                                        <Text style={{ color: "#ffd530" }}>Milestone payment 1 of ${job.milestone1.price.toFixed(2)}</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.centeredPriceBox, { margin: 15 }]}>
                            <View style={styles.margin}>
                                <Text style={styles.priceText}>Total due is $<Text style={{ color: "#ffd530", textDecorationLine: "underline" }}>{this.calculateTotalOfMilestones([job.milestone5.price, job.milestone4.price, job.milestone3.price, job.milestone2.price, job.milestone1.price])}</Text>{this.calculateLength(job.duration, passedData.systemDate)}</Text>
                                <View style={styles.hr} />
                                <View style={styles.centered}>
                                    <Button onPress={() => {
                                        this.handleMilestonePayment(job.milestone2.price);
                                    }} style={styles.greyButton} info>
                                        <Text style={{ color: "#ffd530" }}>Milestone payment 2 of ${job.milestone2.price.toFixed(2)}</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.centeredPriceBox, { margin: 15 }]}>
                            <View style={styles.margin}>
                                <Text style={styles.priceText}>Total due is $<Text style={{ color: "#ffd530", textDecorationLine: "underline" }}>{this.calculateTotalOfMilestones([job.milestone5.price, job.milestone4.price, job.milestone3.price, job.milestone2.price, job.milestone1.price])}</Text>{this.calculateLength(job.duration, passedData.systemDate)}</Text>
                                <View style={styles.hr} />
                                <View style={styles.centered}>
                                    <Button onPress={() => {
                                        this.handleMilestonePayment(job.milestone3.price);
                                    }} style={styles.greyButton} info>
                                        <Text style={{ color: "#ffd530" }}>Milestone payment 3 of ${job.milestone3.price.toFixed(2)}</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.centeredPriceBox, { margin: 15 }]}>
                            <View style={styles.margin}>
                                <Text style={styles.priceText}>Total due is $<Text style={{ color: "#ffd530", textDecorationLine: "underline" }}>{this.calculateTotalOfMilestones([job.milestone5.price, job.milestone4.price, job.milestone3.price, job.milestone2.price, job.milestone1.price])}</Text>{this.calculateLength(job.duration, passedData.systemDate)}</Text>
                                <View style={styles.hr} />
                                <View style={styles.centered}>
                                    <Button onPress={() => {
                                        this.handleMilestonePayment(job.milestone4.price);
                                    }} style={styles.greyButton} info>
                                        <Text style={{ color: "#ffd530" }}>Milestone payment 4 of ${job.milestone4.price.toFixed(2)}</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.centeredPriceBox, { margin: 15 }]}>
                            <View style={styles.margin}>
                                <Text style={styles.priceText}>Total due is $<Text style={{ color: "#ffd530", textDecorationLine: "underline" }}>{this.calculateTotalOfMilestones([job.milestone5.price, job.milestone4.price, job.milestone3.price, job.milestone2.price, job.milestone1.price])}</Text>{this.calculateLength(job.duration, passedData.systemDate)}</Text>
                                <View style={styles.hr} />
                                <View style={styles.centered}>
                                    <Button onPress={() => {
                                        this.handleMilestonePayment(job.milestone5.price);
                                    }} style={styles.greyButton} info>
                                        <Text style={{ color: "#ffd530" }}>Milestone payment 5 of ${job.milestone5.price.toFixed(2)}</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                </ScrollView>
            );
        } else if (job.milestone4 !== null) {
            return (
                <ScrollView horizontal={true}>
                    <View style={[styles.centeredPriceBox, { margin: 15 }]}>
                            <View style={styles.margin}>
                                <Text style={styles.priceText}>Total due is $<Text style={{ color: "#ffd530", textDecorationLine: "underline" }}>{this.calculateTotalOfMilestones([job.milestone4.price, job.milestone3.price, job.milestone2.price, job.milestone1.price])}</Text>{this.calculateLength(job.duration, passedData.systemDate)}</Text>
                                <View style={styles.hr} />
                                <View style={styles.centered}>
                                    <Button onPress={() => {
                                        this.handleMilestonePayment(job.milestone1.price);
                                    }} style={styles.greyButton} info>
                                        <Text style={{ color: "#ffd530" }}>Milestone payment 1 of ${job.milestone1.price.toFixed(2)}</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.centeredPriceBox, { margin: 15 }]}>
                            <View style={styles.margin}>
                                <Text style={styles.priceText}>Total due is $<Text style={{ color: "#ffd530", textDecorationLine: "underline" }}>{this.calculateTotalOfMilestones([job.milestone4.price, job.milestone3.price, job.milestone2.price, job.milestone1.price])}</Text>{this.calculateLength(job.duration, passedData.systemDate)}</Text>
                                <View style={styles.hr} />
                                <View style={styles.centered}>
                                    <Button onPress={() => {
                                        this.handleMilestonePayment(job.milestone2.price);
                                    }} style={styles.greyButton} info>
                                        <Text style={{ color: "#ffd530" }}>Milestone payment 2 of ${job.milestone2.price.toFixed(2)}</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.centeredPriceBox, { margin: 15 }]}>
                            <View style={styles.margin}>
                                <Text style={styles.priceText}>Total due is $<Text style={{ color: "#ffd530", textDecorationLine: "underline" }}>{this.calculateTotalOfMilestones([job.milestone4.price, job.milestone3.price, job.milestone2.price, job.milestone1.price])}</Text>{this.calculateLength(job.duration, passedData.systemDate)}</Text>
                                <View style={styles.hr} />
                                <View style={styles.centered}>
                                    <Button onPress={() => {
                                        this.handleMilestonePayment(job.milestone3.price);
                                    }} style={styles.greyButton} info>
                                        <Text style={{ color: "#ffd530" }}>Milestone payment 3 of ${job.milestone3.price.toFixed(2)}</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.centeredPriceBox, { margin: 15 }]}>
                            <View style={styles.margin}>
                                <Text style={styles.priceText}>Total due is $<Text style={{ color: "#ffd530", textDecorationLine: "underline" }}>{this.calculateTotalOfMilestones([job.milestone4.price, job.milestone3.price, job.milestone2.price, job.milestone1.price])}</Text>{this.calculateLength(job.duration, passedData.systemDate)}</Text>
                                <View style={styles.hr} />
                                <View style={styles.centered}>
                                    <Button onPress={() => {
                                        this.handleMilestonePayment(job.milestone4.price);
                                    }} style={styles.greyButton} info>
                                        <Text style={{ color: "#ffd530" }}>Milestone payment 4 of ${job.milestone4.price.toFixed(2)}</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                </ScrollView>
            );
        } else if (job.milestone3 !== null) {
            return (
                <ScrollView horizontal={true}>
                    <View style={[styles.centeredPriceBox, { margin: 15 }]}>
                            <View style={styles.margin}>
                                <Text style={styles.priceText}>Total due is $<Text style={{ color: "#ffd530", textDecorationLine: "underline" }}>{this.calculateTotalOfMilestones([job.milestone3.price, job.milestone2.price, job.milestone1.price])}</Text>{this.calculateLength(job.duration, passedData.systemDate)}</Text>
                                <View style={styles.hr} />
                                <View style={styles.centered}>
                                    <Button onPress={() => {
                                        this.handleMilestonePayment(job.milestone1.price);
                                    }} style={styles.greyButton} info>
                                        <Text style={{ color: "#ffd530" }}>Milestone payment 1 of ${job.milestone1.price.toFixed(2)}</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.centeredPriceBox, { margin: 15 }]}>
                            <View style={styles.margin}>
                                <Text style={styles.priceText}>Total due is $<Text style={{ color: "#ffd530", textDecorationLine: "underline" }}>{this.calculateTotalOfMilestones([job.milestone3.price, job.milestone2.price, job.milestone1.price])}</Text>{this.calculateLength(job.duration, passedData.systemDate)}</Text>
                                <View style={styles.hr} />
                                <View style={styles.centered}>
                                    <Button onPress={() => {
                                        this.handleMilestonePayment(job.milestone2.price);
                                    }} style={styles.greyButton} info>
                                        <Text style={{ color: "#ffd530" }}>Milestone payment 2 of ${job.milestone2.price.toFixed(2)}</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.centeredPriceBox, { margin: 15 }]}>
                            <View style={styles.margin}>
                                <Text style={styles.priceText}>Total due is $<Text style={{ color: "#ffd530", textDecorationLine: "underline" }}>{this.calculateTotalOfMilestones([job.milestone3.price, job.milestone2.price, job.milestone1.price])}</Text>{this.calculateLength(job.duration, passedData.systemDate)}</Text>
                                <View style={styles.hr} />
                                <View style={styles.centered}>
                                    <Button onPress={() => {
                                        this.handleMilestonePayment(job.milestone3.price);
                                    }} style={styles.greyButton} info>
                                        <Text style={{ color: "#ffd530" }}>Milestone payment 3 of ${job.milestone3.price.toFixed(2)}</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                </ScrollView>
            );
        } else if (job.milestone2 !== null) {
            return (
                <ScrollView horizontal={true}>
                    <View style={[styles.centeredPriceBox, { margin: 15 }]}>
                            <View style={styles.margin}>
                                <Text style={styles.priceText}>Total due is $<Text style={{ color: "#ffd530", textDecorationLine: "underline" }}>{this.calculateTotalOfMilestones([job.milestone2.price, job.milestone1.price])}</Text>{this.calculateLength(job.duration, passedData.systemDate)}</Text>
                                <View style={styles.hr} />
                                <View style={styles.centered}>
                                    <Button onPress={() => {
                                        this.handleMilestonePayment(job.milestone1.price);
                                    }} style={styles.greyButton} info>
                                        <Text style={{ color: "#ffd530" }}>Milestone payment 1 of ${job.milestone1.price.toFixed(2)}</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.centeredPriceBox, { margin: 15 }]}>
                            <View style={styles.margin}>
                                <Text style={styles.priceText}>Total due is $<Text style={{ color: "#ffd530", textDecorationLine: "underline" }}>{this.calculateTotalOfMilestones([job.milestone2.price, job.milestone1.price])}</Text>{this.calculateLength(job.duration, passedData.systemDate)}</Text>
                                <View style={styles.hr} />
                                <View style={styles.centered}>
                                    <Button onPress={() => {
                                        this.handleMilestonePayment(job.milestone2.price);
                                    }} style={styles.greyButton} info>
                                        <Text style={{ color: "#ffd530" }}>Milestone payment 2 of ${job.milestone2.price.toFixed(2)}</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                </ScrollView>
            );
        } else if (job.milestone1 !== null) {
            return (
                <ScrollView horizontal={true}>
                    <View style={[styles.centeredPriceBox, { margin: 15 }]}>
                            <View style={styles.margin}>
                                <Text style={styles.priceText}>Total due is $<Text style={{ color: "#ffd530", textDecorationLine: "underline" }}>{this.calculateTotalOfMilestones([job.milestone1.price])}</Text>{this.calculateLength(job.duration, passedData.systemDate)}</Text>
                                <View style={styles.hr} />
                                <View style={styles.centered}>
                                    <Button onPress={() => {
                                        this.handleMilestonePayment(job.milestone1.price);
                                    }} style={styles.greyButton} info>
                                        <Text style={{ color: "#ffd530" }}>Milestone payment 1 of ${job.milestone1.price.toFixed(2)}</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                </ScrollView>
            );
        }
    }
    calculateRemainingTotal = (payments) => {
        let sum = 0;

        if (typeof payments !== "undefined" && payments.length > 0) {
            for (let index = 0; index < payments.length; index++) {
                const payment = payments[index];
                sum += (payment.amount / 100);
            }
            console.log(this.state.total, sum);
            return (this.state.total - sum).toFixed(2);
        } else {
            return sum;
        }
    }
    makeRemainderPayment = (payments) => {
        console.log("remainder payment...");

        this.setState({
            showRemainderModal: true,
            payments
        })
    }
    makeFinalRemainderPaymentAPI = () => {
        const { application, payments, job } = this.state;

        const passedData = this.props.props.route.params.item;

        // update payments array in 'application' state after response successful
        axios.post(`${Config.ngrok_url}/make/remainder/payment/milestones`, {
            rate: this.calculateRemainingTotal(payments),
            id: this.props.unique_id,
            application,
            date: job.date,
            jobID: job.jobID,
            otherUserID: passedData.with
        }).then((res) => {
            if (res.data.message === "Paid remainder total!") {
                console.log(res.data);

                this.setState({
                    application: res.data.application
                }, () => {
                    Toast.show({
                        text1: 'You have successfully made a final payment for this project/gig.',
                        text2: 'You have made all required payments for this freelancer!',
                        type: "success",
                        visibilityTime: 4500,
                        position: "top"
                    });
                })
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    renderPayHourlyOrNot = () => {

        const passedData = this.props.props.route.params.item;

        const { job, loading, completedClient, application } = this.state;

        if (job !== null) {
            if (job.hourly === true) {
                return (
                    <Fragment>
                        <View style={[styles.centered, { marginTop: 25 }]}>
                            <Text style={styles.mainText}>Make a payment so your client can get started!</Text>
                            <View style={styles.centeredPriceBox}>
                                <View style={styles.margin}>
                                    <Text style={styles.priceText}>$<Text style={{ color: "#ffd530", textDecorationLine: "underline" }}>{Math.round(Number(job.hourlyRate) * 5).toFixed(2)}</Text>{this.calculateLengthHourly(job.duration, passedData.systemDate)}</Text>
                                    <View style={styles.hr} />
                                    <View style={styles.centered}>
                                        <Button onPress={this.onButtonPressHourly} style={styles.greyButton} info>
                                            <Text style={{ color: "#ffd530" }}>Make a payment</Text>
                                        </Button>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.blackHr} />
                            <View style={styles.margin}>
                                <Text style={styles.detailsTitle}>Details</Text>
                            </View>
                            <AwesomeButtonCartman style={{ marginTop: 20, marginBottom: 20 }} type={"anchor"} textColor={"white"} onPress={() => {
                                this.gatherJobAndOpenPane();
                            }} stretch={true}>View Previous Payments</AwesomeButtonCartman>

                        </View>
                        {typeof this.props.files !== "undefined" && this.props.files.length > 0 ? this.props.files.map((file, index) => {
                            return (
                                <Fragment key={index}>
                                    <ListItem style={{ maxHeight: 65 }}>
                                        <Left>
                                            <Text style={{ marginTop: 10 }}>{file.fileName}</Text>
                                        </Left>
                                        <Right>
                                            <TouchableOpacity onPress={() => {
                                                this.handleDownloadFile(file.fullUri, file.fileName, file.type);
                                            }}>
                                                <Icon name="download" />
                                            </TouchableOpacity>
                                        </Right>
                                    </ListItem>
                                </Fragment>
                            );
                        }) : null}
                        <View style={{ margin: 15 }}>
                            <View style={{ marginTop: 20 }} />
                            <Text style={{ fontWeight: 'bold', textAlign: 'left', color: "darkred" }}>Note from freelancer</Text>
                            <Text style={styles.note}>{_.has(passedData, "note") && passedData.note.length !== 0 ? passedData.note : "No note entered..."}</Text>
                            <View style={styles.greyHr} />
                            <Text style={{ fontWeight: 'bold', textAlign: 'left', color: "darkred" }}>Links submitted by freelancer</Text>
                            {_.has(passedData, "links") && passedData.links.length !== 0 ? passedData.links.map((link, index) => {
                                return (
                                    <View>
                                        <ListItem selected>
                                            <Left>
                                                <Text>{link.link}</Text>
                                            </Left>
                                            <Right>
                                                <TouchableOpacity onPress={() => {
                                                    this.openURLLink(link.link);
                                                }}>
                                                    <Icon type="FontAwesome" name="mouse-pointer" />
                                                </TouchableOpacity>
                                            </Right>
                                        </ListItem>
                                    </View>
                                );
                            }) : <Text>No links entered or found...</Text>}
                        </View>
                        <List>
                            <ListItem thumbnail>
                                <Left>
                                    {passedData.type === "video" ? <Video source={{uri: passedData.photo }} 
                                    ref={(ref) => {
                                        this.player = ref
                                    }}
                                    muted
                                    loop
                                    style={styles.thumbnailVideo} /> : <Thumbnail style={styles.thumbnailVideo} source={{uri: passedData.photo }} />}
                                </Left>
                                <Body>
                                    <NativeText>Payment will go to {passedData.otherUserFirstName} {passedData.otherUserLastName}</NativeText>
                                    <NativeText note numberOfLines={1}>also known as {passedData.otherUserUsername}</NativeText>
                                </Body>
                                <Right>
                                    <Button onPress={() => {
                                        this.props.props.navigation.push("individual-profile-public", { item: { unique_id: passedData.with }});
                                    }} transparent>
                                        <NativeText>View</NativeText>
                                    </Button>
                                </Right>
                            </ListItem>
                        </List>
                        <View style={styles.margin}>
                            <Text style={styles.milestoneText}>Paying by milestone? {job.payByMilestone === false ? "Nope" : "Yes!"}</Text>
                            <View style={styles.hrCustom} />
                            <Text style={styles.milestoneText}>Client has paid freelancer in-full? <Text style={{ color: "blue" }}>{(this.props.minimumHourlyPaymentCompleted.completed === true && this.props.minimumHourlyPaymentCompleted.jobID === passedData.jobID) || passedData.paidFull === true ? "Full deposit completed for pending completion." : "Full deposit has NOT been received."}</Text></Text>
                            <View style={styles.hrCustom} />
                            <Text style={styles.milestoneText}>Client has made a partial payment to the freelancer(s)? <Text style={{ color: "blue" }}>{(this.props.customPaymentCompleted.completed === true && this.props.customPaymentCompleted.jobID === passedData.jobID) || passedData.paidPartial === true ? "Custom payment has been completed for pending completion!" : "Custom payment has NOT been received."}</Text></Text>
                            {this.renderQuestions(job)}
                        </View>
                        <View style={{ marginTop: 10 }} />
                        <View style={{ margin: 10 }}>
                            {(passedData.completedClient === false || completedClient === false) && loading === true ? <AwesomeButtonCartman style={{ marginTop: 20 }} type={"anchor"} backgroundShadow={"#ffd530"} textColor={"white"} onPress={() => {
                                this.setState({
                                    confirmationCompleteModal: true
                                })
                            }} stretch={true}>Mark project as completed</AwesomeButtonCartman> : <AwesomeButtonCartman style={{ marginTop: 20 }} type={"disabled"} stretch={true}>Job ALREADY marked as complete!</AwesomeButtonCartman>}
                            <View style={{ marginTop: 10 }} />
                        </View>
                    </Fragment>
                ); 
            } else {
                // return milestone logic
                if (job.payByMilestone === true) {
                    return (
                        <Fragment>
                            <View style={[styles.centered, { marginTop: 25 }]}>
                                <Text style={styles.mainText}>Make a payment so your client can get started!</Text>
                                {this.calculateMilestonesPrice(job)}
                                <View style={styles.blackHr} />
                                <View style={styles.margin}>
                                    <Text style={styles.detailsTitle}>Details</Text>
                                    <View style={styles.thinBlackHr} />
                                    <Text style={styles.totalLeft}>You OWE a <Text style={{ fontWeight: "bold" }}>remaining</Text> total of ${this.calculateRemainingTotal(application.payments)} left on this project...</Text>
                                    <View style={styles.thinBlackHr} />
                                    <TouchableOpacity onPress={() => {
                                        this.makeRemainderPayment(application.payments);
                                    }} style={styles.containerBoxed}>
                                        <Text style={{ fontWeight: "bold", fontSize: 24 }}>Pay the remainder of your ${this.calculateRemainingTotal(application.payments)} balance by clicking here...</Text>
                                    </TouchableOpacity>
                                </View>
                                    <AwesomeButtonCartman style={{ marginTop: 20, marginBottom: 20 }} type={"anchor"} textColor={"white"} onPress={() => {
                                    this.gatherJobAndOpenPane();
                                }} stretch={true}>View Previous Payments</AwesomeButtonCartman>
                            </View>
                            {typeof this.props.files !== "undefined" && this.props.files.length > 0 ? this.props.files.map((file, index) => {
                                return (
                                    <Fragment key={index}>
                                        <ListItem style={{ maxHeight: 65 }}>
                                            <Left>
                                                <Text style={{ marginTop: 10 }}>{file.fileName}</Text>
                                            </Left>
                                            <Right>
                                                <TouchableOpacity onPress={() => {
                                                    this.handleDownloadFile(file.fullUri, file.fileName, file.type);
                                                }}>
                                                    <Icon name="download" />
                                                </TouchableOpacity>
                                            </Right>
                                        </ListItem>
                                    </Fragment>
                                );
                            }) : null}
                            <View style={{ margin: 15 }}>
                                <View style={{ marginTop: 20 }} />
                                <Text style={{ fontWeight: 'bold', textAlign: 'left', color: "darkred" }}>Note from freelancer</Text>
                                <Text style={styles.note}>{_.has(passedData, "note") && passedData.note.length !== 0 ? passedData.note : "No note entered..."}</Text>
                                <View style={styles.greyHr} />
                                <Text style={{ fontWeight: 'bold', textAlign: 'left', color: "darkred" }}>Links submitted by freelancer</Text>
                                {_.has(passedData, "links") && passedData.links.length !== 0 ? passedData.links.map((link, index) => {
                                    return (
                                        <View>
                                            <ListItem selected>
                                                <Left>
                                                    <Text>{link.link}</Text>
                                                </Left>
                                                <Right>
                                                    <TouchableOpacity onPress={() => {
                                                        this.openURLLink(link.link);
                                                    }}>
                                                        <Icon type="FontAwesome" name="mouse-pointer" />
                                                    </TouchableOpacity>
                                                </Right>
                                            </ListItem>
                                        </View>
                                    );
                                }) : <Text>No links entered or found...</Text>}
                            </View>
                            <List>
                                <ListItem thumbnail>
                                    <Left>
                                        {passedData.type === "video" ? <Video source={{uri: passedData.photo }} 
                                        ref={(ref) => {
                                            this.player = ref
                                        }}
                                        style={styles.thumbnailVideo} /> : <Thumbnail style={styles.thumbnailVideo} source={{uri: passedData.photo }} />}
                                    </Left>
                                    <Body>
                                        <NativeText>Payment will go to {passedData.otherUserFirstName} {passedData.otherUserLastName}</NativeText>
                                        <NativeText note numberOfLines={1}>also known as {passedData.otherUserUsername}</NativeText>
                                    </Body>
                                    <Right>
                                        <Button onPress={() => {
                                            this.props.props.navigation.push("individual-profile-public", { item: { unique_id: passedData.with }});
                                        }} transparent>
                                            <NativeText>View</NativeText>
                                        </Button>
                                    </Right>
                                </ListItem>
                            </List>
                            <View style={styles.margin}>
                                <Text style={styles.milestoneText}>Paying by milestone? {job.payByMilestone === false ? "Nope" : "Yes!"}</Text>
                                <View style={styles.hrCustom} />
                                {this.renderQuestions(job)}
                            </View>
                            <View style={{ marginTop: 10 }} />
                            <View style={{ margin: 10 }}>
                            {(passedData.completedClient === false || completedClient === false) && loading === true ? <AwesomeButtonCartman style={{ marginTop: 20 }} type={"anchor"} backgroundShadow={"#ffd530"} textColor={"white"} onPress={() => {
                                this.setState({
                                    confirmationCompleteModal: true
                                })
                            }} stretch={true}>Mark project as completed</AwesomeButtonCartman> : <AwesomeButtonCartman style={{ marginTop: 20 }} type={"disabled"} stretch={true}>Job ALREADY marked as complete!</AwesomeButtonCartman>}
                                <View style={{ marginTop: 10 }} />
                            </View>
                        </Fragment>
                    );
                } else {
                    // non milestone non hourly data
                    return (
                        <Fragment>
                            <View style={[styles.centered, { marginTop: 25 }]}>
                                <Text style={styles.mainText}>Make a payment so your client can get started!</Text>
                                <View style={styles.centeredPriceBox}>
                                    <View style={styles.margin}>
                                        <Text style={styles.priceText}>$<Text style={{ color: "#ffd530", textDecorationLine: "underline" }}>{job.ratePerProjectCompletion}</Text>{this.calculateLength(job.duration, passedData.systemDate)}</Text>
                                        <View style={styles.hr} />
                                        <View style={styles.centered}>
                                            <Button onPress={this.onButtonPress} style={styles.greyButton} info>
                                                <Text style={{ color: "#ffd530" }}>Make a payment</Text>
                                            </Button>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.blackHr} />
                                <View style={styles.margin}>
                                    <Text style={styles.detailsTitle}>Details</Text>
                                </View>
                            </View>
                            {typeof this.props.files !== "undefined" && this.props.files.length > 0 ? this.props.files.map((file, index) => {
                                return (
                                    <Fragment key={index}>
                                        <ListItem style={{ maxHeight: 65 }}>
                                            <Left>
                                                <Text style={{ marginTop: 10 }}>{file.fileName}</Text>
                                            </Left>
                                            <Right>
                                                <TouchableOpacity onPress={() => {
                                                    this.handleDownloadFile(file.fullUri, file.fileName, file.type);
                                                }}>
                                                    <Icon name="download" />
                                                </TouchableOpacity>
                                            </Right>
                                        </ListItem>
                                    </Fragment>
                                );
                            }) : null}
                            <View style={{ margin: 15 }}>
                                <View style={{ marginTop: 20 }} />
                                <Text style={{ fontWeight: 'bold', textAlign: 'left', color: "darkred" }}>Note from freelancer</Text>
                                <Text style={styles.note}>{_.has(passedData, "note") && passedData.note.length === 0 ? "No note entered..." : passedData.note}</Text>
                                <View style={styles.greyHr} />
                                <Text style={{ fontWeight: 'bold', textAlign: 'left', color: "darkred" }}>Links submitted by freelancer</Text>
                                {_.has(passedData, "links") && passedData.links.length !== 0 ? passedData.links.map((link, index) => {
                                    return (
                                        <View>
                                            <ListItem selected>
                                                <Left>
                                                    <Text>{link.link}</Text>
                                                </Left>
                                                <Right>
                                                    <TouchableOpacity onPress={() => {
                                                        this.openURLLink(link.link);
                                                    }}>
                                                        <Icon type="FontAwesome" name="mouse-pointer" />
                                                    </TouchableOpacity>
                                                </Right>
                                            </ListItem>
                                        </View>
                                    );
                                }) : <Text>No links entered or found...</Text>}
                            </View>
                            <List>
                                <ListItem thumbnail>
                                    <Left>
                                        {passedData.type === "video" ? <Video source={{uri: passedData.photo }} 
                                        ref={(ref) => {
                                            this.player = ref
                                        }}
                                        style={styles.thumbnailVideo} /> : <Thumbnail style={styles.thumbnailVideo} source={{uri: passedData.photo }} />}
                                    </Left>
                                    <Body>
                                        <NativeText>Payment will go to {passedData.otherUserFirstName} {passedData.otherUserLastName}</NativeText>
                                        <NativeText note numberOfLines={1}>also known as {passedData.otherUserUsername}</NativeText>
                                    </Body>
                                    <Right>
                                        <Button onPress={() => {
                                            this.props.props.navigation.push("individual-profile-public", { item: { unique_id: passedData.with }});
                                        }} transparent>
                                            <NativeText>View</NativeText>
                                        </Button>
                                    </Right>
                                </ListItem>
                            </List>
                            <View style={styles.margin}>
                                <Text style={styles.milestoneText}>Paying by milestone? {job.payByMilestone === false ? "Nope" : "Yes!"}</Text>
                                <View style={styles.hrCustom} />
                                <Text style={styles.milestoneText}>Client has paid freelancer in-full? <Text style={{ color: "blue" }}>{(this.props.fullPaymentCompleted.completed === true && this.props.fullPaymentCompleted.jobID === passedData.jobID) || passedData.paidFull === true ? "Full payment completed for pending completion." : "Full payment has NOT been received."}</Text></Text>
                                <View style={styles.hrCustom} />
                                <Text style={styles.milestoneText}>Client has made a partial payment to the freelancer(s)? <Text style={{ color: "blue" }}>{(this.props.partialPaymentCompleted.completed === true && this.props.partialPaymentCompleted.jobID === passedData.jobID) || passedData.paidPartial === true ? "Partial payment has been completed for pending completion!" : "Partial payment has NOT been received."}</Text></Text>
                                {this.renderQuestions(job)}
                            </View>
                            <View style={{ marginTop: 10 }} />
                            <View style={{ margin: 10 }}>
                            {(passedData.completedClient === false || completedClient === false) && loading === true ? <AwesomeButtonCartman style={{ marginTop: 20 }} type={"anchor"} backgroundShadow={"#ffd530"} textColor={"white"} onPress={() => {
                                this.setState({
                                    confirmationCompleteModal: true
                                })
                            }} stretch={true}>Mark project as completed</AwesomeButtonCartman> : <AwesomeButtonCartman style={{ marginTop: 20 }} type={"disabled"} stretch={true}>Job ALREADY marked as complete!</AwesomeButtonCartman>}
                                <View style={{ marginTop: 10 }} />
                            </View>
                        </Fragment>
                    );
                }
            }
        } else {
            return (
                <View style={{ margin: 15 }}>
                    <SkeletonPlaceholder>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                        <View style={{ marginLeft: 20 }}>
                        <View style={{ width: width * 0.70, height: 20, borderRadius: 4 }} />
                        <View
                            style={{ marginTop: 6, width: width * 0.55, height: 20, borderRadius: 4 }}
                        />
                        </View>
                    </View>
                    </SkeletonPlaceholder>
                    <View style={{ marginTop: 20 }} />
                    <SkeletonPlaceholder>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                        <View style={{ marginLeft: 20 }}>
                        <View style={{ width: width * 0.70, height: 20, borderRadius: 4 }} />
                        <View
                            style={{ marginTop: 6, width: width * 0.55, height: 20, borderRadius: 4 }}
                        />
                        </View>
                    </View>
                    </SkeletonPlaceholder>
                    <View style={{ marginTop: 20 }} />
                    <SkeletonPlaceholder>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                        <View style={{ marginLeft: 20 }}>
                        <View style={{ width: width * 0.70, height: 20, borderRadius: 4 }} />
                        <View
                            style={{ marginTop: 6, width: width * 0.55, height: 20, borderRadius: 4 }}
                        />
                        </View>
                    </View>
                    </SkeletonPlaceholder>
                    <View style={{ marginTop: 20 }} />
                    <SkeletonPlaceholder>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                        <View style={{ marginLeft: 20 }}>
                        <View style={{ width: width * 0.70, height: 20, borderRadius: 4 }} />
                        <View
                            style={{ marginTop: 6, width: width * 0.55, height: 20, borderRadius: 4 }}
                        />
                        </View>
                    </View>
                    </SkeletonPlaceholder>
                    <View style={{ marginTop: 20 }} />
                    <SkeletonPlaceholder>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                        <View style={{ marginLeft: 20 }}>
                        <View style={{ width: width * 0.70, height: 20, borderRadius: 4 }} />
                        <View
                            style={{ marginTop: 6, width: width * 0.55, height: 20, borderRadius: 4 }}
                        />
                        </View>
                    </View>
                    </SkeletonPlaceholder>
                    <View style={{ marginTop: 20 }} />
                    <SkeletonPlaceholder>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                        <View style={{ marginLeft: 20 }}>
                        <View style={{ width: width * 0.70, height: 20, borderRadius: 4 }} />
                        <View
                            style={{ marginTop: 6, width: width * 0.55, height: 20, borderRadius: 4 }}
                        />
                        </View>
                    </View>
                    </SkeletonPlaceholder>
                </View>
            );
        }
    }
    onButtonPress = () => {
        console.log("clicked.");

        this.sheetRef.current.open();
    }
    renderSheetContent = () => {
        return (
            <View
                style={{
                    backgroundColor: 'white',
                    padding: 16,
                    height: 450,
                }}
                >
                <Text>Swipe down to close</Text>
            </View>
        );
    }
    markJobAsComplete = () => {
        console.log("markJobAsComplete clicked...");

        const passedData = this.props.props.route.params.item;

        axios.post(`${Config.ngrok_url}/complete/client/gig/half/client`, {
            id: this.props.unique_id,
            activeID: passedData.id,
            otherUserID: passedData.with
        }).then((res) => {
            if (res.data.message === "Successfully updated users accounts and posted notification!") {
                console.log(res.data);

                this.setState({
                    completedClient: true
                }, () => {
                    Toast.show({
                        text1: 'You have successfully marked your half of this job complete!',
                        text2: 'Please wait for the other user to confirm before funds will be released...',
                        type: "success",
                        visibilityTime: 4500,
                        position: "top"
                    });
                })
            } else if (res.data.message === "Successfully updated users accounts and posted notification && finished/completed job!") {

                console.log("finished...:", res.data);

                Toast.show({
                    text1: 'You have successfully marked your half of this job complete!',
                    text2: 'Please wait for the other user to confirm before funds will be released...',
                    type: "success",
                    visibilityTime: 3000,
                    position: "top"
                });

                setTimeout(() => {
                    this.props.props.navigation.replace("navigation-menu-main");
                }, 3000);
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    render() {
        const { job, loading, confirmationCompleteModal, application, showRemainderModal } = this.state;

        console.log("i", this.props.props.route.params.item);

        const passedData = this.props.props.route.params.item;

        console.log("this.state activeGigs individual index.js state", this.state);
        return (
            <Fragment>
                <Toast ref={(ref) => Toast.setRef(ref)} />
                <View>
                    <Dialog.Container visible={confirmationCompleteModal}>
                    <Dialog.Title>Are you sure you'd like to mark this project as complete?</Dialog.Title>
                    <Dialog.Description>
                        Once you mark this project as complete, it will be registered and validated permanently... Would you like to continue?
                    </Dialog.Description>
                    <Dialog.Button onPress={() => {
                        this.setState({
                            confirmationCompleteModal: false
                        })
                    }} label="Cancel" />
                    <Dialog.Button onPress={() => {
                        this.setState({
                            confirmationCompleteModal: false
                        }, () => {
                            this.markJobAsComplete();
                        })
                    }} label="Mark Complete" />
                    </Dialog.Container>
                </View>
                <View>
                    <Dialog.Container visible={showRemainderModal}>
                    <Dialog.Title>Are you sure you'd like to make this 'remainder' payment and completely pay off the amount due?</Dialog.Title>
                    <Dialog.Description>
                        Once you make this payment, it cannot be reversed and will be collected upon payment verification. You cannot undo this action.
                    </Dialog.Description>
                    <Dialog.Button onPress={() => {
                        this.setState({
                            showRemainderModal: false
                        })
                    }} label="Cancel" />
                    <Dialog.Button onPress={() => {
                        this.setState({
                            showRemainderModal: false
                        }, () => {
                            this.makeFinalRemainderPaymentAPI();
                        })
                    }} label="Make Payment" />
                    </Dialog.Container>
                </View>
                <SheetHelperPaymentsDisplayRef payments={application.payments} paymentsRef={this.paymentRefSheet} />
                <ScrollView contentContainerStyle={{ paddingBottom: 150 }} style={styles.container}>
                    {job !== null ? <SlideUpPanePayMilestones job={job} withID={passedData.with} rate={this.state.price} props={this.props} sheetRefMilestone={this.sheetRefMilestone} /> : null}
                    {job !== null ? <SlideUpPaymentHelper job={job} withID={passedData.with} rate={job.ratePerProjectCompletion} props={this.props} sheetRef={this.sheetRef} /> : null}
                    {job !== null && job.hourly === true ? <PayHourlyDepositPaneHelper job={job} withID={passedData.with} rate={job.hourlyRate} props={this.props} sheetRefHourly={this.sheetRefHourly} /> : null}
                    {this.renderPayHourlyOrNot()}
                </ScrollView>
                <Footer style={{ borderColor: "transparent", backgroundColor: "#303030" }}>
                    <FooterTab>
                        <Button style={styles.grayButton} onPress={() => {
                            this.props.props.navigation.push("homepage");
                        }}>
                            <Image source={require("../../../../assets/icons/home.png")} style={styles.maxedIconSmall} />
                        </Button>
                        <Button style={styles.grayButton} button={true} onPress={() => {
                            this.props.props.navigation.push("jobs-homepage");
                        }}>
                            <Image source={require("../../../../assets/icons/seeker.png")} style={styles.maxedIconSmall} />
                        </Button>
                        <Button style={styles.grayButton} button={true} onPress={() => {
                            this.props.props.navigation.push("people-list-all");
                        }}>
                            <Image source={require("../../../../assets/icons/people.png")} style={styles.maxedIconSmall} />
                        </Button>
                        <Button style={styles.grayButton} button={true} onPress={() => {
                            this.props.props.navigation.push("notifications");
                        }}>
                            <Badge style={styles.absoluteBadge}><Text style={{ color: "white", fontSize: 10 }}>51</Text></Badge>
                            <Image source={require("../../../../assets/icons/bell.png")} style={[styles.maxedIconSmall, { bottom: 7.5 }]} />
                            
                        </Button>
                    </FooterTab>
                </Footer>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.signupData.authData.unique_id,
        fullPaymentCompleted: _.has(state.payments, "fullPaymentCompleted") ? state.payments.fullPaymentCompleted : {
            completed: false,
            jobID: null
        },
        partialPaymentCompleted: _.has(state.payments, "partialPaymentCompleted") ? state.payments.partialPaymentCompleted : {
            completed: false,
            jobID: null
        },
        minimumHourlyPaymentCompleted: _.has(state.payments, "minimumHourlyPaymentCompleted") ? state.payments.minimumHourlyPaymentCompleted : {
            completed: false,
            jobID: null
        },
        customPaymentCompleted: _.has(state.payments, "customPaymentCompleted") ? state.payments.customPaymentCompleted : {
            completed: false,
            jobID: null
        },
        files: state.savedFiles.filesSaved
    }
}
export default connect(mapStateToProps, { saveFilesPane })(IndividualActiveJobHelper);
