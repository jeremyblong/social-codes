import React, { Component, Fragment } from 'react'
import { TouchableOpacity, View, Text, Image, Dimensions, ScrollView } from 'react-native';
import { Button, Icon, Footer, FooterTab, Badge, Header, Left, Right, Body, Title, Subtitle, Card, CardItem, Thumbnail, Separator } from 'native-base';
import moment from "moment";
import styles from "./styles.js";
import LottieView from 'lottie-react-native';
import axios from 'axios';
import Config from 'react-native-config';
import { connect } from 'react-redux';
import _ from 'lodash';
import ReadMore from 'react-native-read-more-text';
import RBSheet from "react-native-raw-bottom-sheet";
import Dialog from "react-native-dialog";
import Toast from 'react-native-toast-message';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import Video from 'react-native-video';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import SlidingUpPanel from 'rn-sliding-up-panel';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';


const { height, width } = Dimensions.get("window");


class IndividualJobManagement extends Component {
constructor(props) {
    super(props);

    this.state = {
        applicants: [],
        showDialog: false,
        error: "",
        selected: null,
        questions: [],
        ready: false,
        picked: null,
        hide: false,
        showInvitationModal: false
    }
}
    componentDidMount() {

        const job = this.props.route.params.item;

        axios.get(`${Config.ngrok_url}/gather/user`, {
            params: {
                id: this.props.unique_id
            }
        }).then((response) => {
            if (response.data.message === "Located the desired user!") {
                console.log(response.data);

                const { user } = response.data;

                if (typeof user.pendingInterviews !== "undefined" && user.pendingInterviews.length > 0) {
                    for (let index = 0; index < user.pendingInterviews.length; index++) {
                        const interview = user.pendingInterviews[index];

                        console.log("interview", interview);

                        
                        if (interview.otherUserID === this.props.unique_id) {
                            this.setState({
                                hide: true
                            })
                        }
                    }
                }
            } else {
                console.log("Err", response.data);
            }
        }).catch((err) => {
            console.log(err);
        })
        // pendingInterviews
        if (_.has(job, "applicants") && job.applicants.length > 0) {
            axios.post(`${Config.ngrok_url}/gather/applicant/info`, {
                applicants: job.applicants
            }).then((response) => {
                if (response.data.message === "Gathered applicant info!") {
                    console.log(response.data);

                    const { applicants } = response.data;

                    this.setState({
                        applicants,
                        ready: true
                    })
                } else {
                    console.log("Err", response.data);
                }
            }).catch((err) => {
                console.log(err);
            })
        } else {
            this.setState({
                error: "There aren't any currently pending applicants for this job..."
            })
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
    deleteProposal = () => {
        const { selected } = this.state;

        const job = this.props.route.params.item;

        axios.post(`${Config.ngrok_url}/delete/proposal/applicant`, {
            selected,
            id: this.props.unique_id,
            job
        }).then((res) => {
            if (res.data.message === "Deleted applicant!") {
                console.log(res.data);

                const { applicants } = res.data;

                this.setState({
                    applicants
                }, () => {
                    Toast.show({
                        text1: 'DELETED APPLICANT!',
                        text2: "Successfully removed applicant from this listing, we have notified the other user that they weren't chosen...",
                        type: 'success',
                        position: "top",
                        visibilityTime: 4500
                    });
                })
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    renderIfMilestoneTrue = (selected) => {
        const { milestone1, milestone2, milestone3, milestone4, milestone5, milestone6, milestone7, milestone8 } = selected;
            // milestones
        if (selected.payByMilestone === true) {
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
        } else {
            // no milestones
            return (
                <Fragment>
                    {selected.hourly === true ? <Text style={styles.mediumText}>This is an HOURLY project with no milestones.</Text> : <Text style={styles.mediumText}>This is an FIXED-PRICE project with no milestones.</Text>}
                    {selected.hourly === true ? <Text style={[styles.largeText, { marginTop: 7.5, color: "blue" }]}>${selected.hourlyRate} per hour</Text> : <Text style={[styles.largeText, { marginTop: 7.5, color: "blue" }]}>${selected.ratePerProjectCompletion} per completion of entire project</Text>}
                </Fragment>
            );
        }
    }
    handleAttachment = async (attachment) => {

        console.log(attachment);

        const url = `${Config.wasabi_url}/${attachment.id}`;
        // create a local file path from url
        const localFile = `${RNFS.DocumentDirectoryPath}/${attachment.id}.${attachment.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ? "xlsx" : attachment.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? "docx" : attachment.type.split("/")[1]}`;
        
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
    callback = () => {
        console.log("callback")
    }
    renderProfilePictureVideoCustom = (profilePic, profilePicType) => {
        if (profilePicType !== "video") {
            console.log("first chunk ran");
            return (
                <Fragment>
                    <Thumbnail style={styles.avatarCustom} source={{ uri: profilePic }}/>
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <Video  
                        resizeMode="cover"
                        repeat
                        source={{uri: profilePic }}   // Can be a URL or a local file.
                        autoplay={true}
                        ref={(ref) => {
                            this.player = ref
                        }}
                        muted={true}
                        style={styles.avatarCustom}
                    />
                </Fragment>
            );
        }
    }
    hireApplicant = (selected) => {
        console.log("Selected applicant:", selected);

        const job = this.props.route.params.item;

        axios.post(`${Config.ngrok_url}/notify/interview/candidate`, {
            applicant: selected,
            id: this.props.unique_id,
            fullName: this.props.fullName,
            job
        }).then((res) => {
            if (res.data.message === "Successfully ran logic!") {
                console.log(res.data);

                this.setState({
                    hide: true
                }, () => {

                    this.RBSheet.hide();
                    
                    setTimeout(() => {
                        Toast.show({
                            text1: "Initiated interview with the desired candidate!",
                            text2: `You have initiated an interview with the candidate ${selected.firstName} ${selected.lastName} for a gig you posted...`,
                            type: "success",
                            position: "top",
                            visibilityTime: 4500
                        })
                    }, 1250);
                })
            } else {
                console.log("Err", res.data);
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
    render() {
        const job = this.props.route.params.item;

        const { applicants, selected, ready } = this.state;

        console.log("applicants manage individual.js", this.state);
        return (
            <Fragment>
            
            <Toast ref={(ref) => Toast.setRef(ref)} />
                
                {selected !== null ? <SlidingUpPanel containerStyle={{  }} allowDragging={false} ref={c => this.RBSheet = c}>
                    <ScrollView contentContainerStyle={{ paddingBottom: 50, zIndex: 9999999999 }} style={styles.scrollContainer}>
                    <TouchableOpacity onPress={() => {
                        this.RBSheet.hide();
                    }} style={styles.leftTop}>
                        <Image source={require("../../../assets/icons/close.png")} style={{ maxWidth: 50, maxHeight: 50 }} />
                    </TouchableOpacity>
                        <View style={[styles.centered, { marginTop: 75 }]}>
                            <Text style={styles.mediumText}><Text style={{ color: "blue" }}>Applicant</Text>: {`${selected.firstName} ${selected.lastName}`}</Text>
                            <Text style={[styles.mediumText, { marginTop: 7.5 }]}><Text style={{ color: "blue" }}>Applicant's Username</Text>: {selected.username}</Text>
                            <Text style={[styles.mediumText, { marginTop: 7.5 }]}><Text style={{ color: "blue" }}>Applied on</Text> {selected.date}</Text>
                        </View>
                        <View style={[styles.hr, { marginTop: 10 }]} />
                        <View>
                            <View style={[styles.rowww, { marginTop: 25 }]}>
                                <View style={styles.columnOne}>
                                    <Text style={styles.largeText}>Job Applicant</Text>
                                    <Text style={styles.mediumText}>Hosted by {selected.firstName}</Text>
                                </View>
                                <View style={styles.columnTwo}>
                                    <Image source={{ uri: selected.profilePic }} style={styles.profilePicImage} />
                                </View>
                            </View>
                            <Text style={{ textAlign: 'center', fontSize: 15, marginTop: 15 }}>{selected.hourly === true ? "Hourly Rate" : "Fixed-Price"} ~ {selected.duration} ~ {selected.hourly === true ? `${selected.hourlyRate.toFixed(2).toString()}/Hr` : "Fixed Rate"}</Text>
                            {typeof selected.attachments !== "undefined" && selected.attachments.length > 0 ? selected.attachments.map((attachment, index) => {
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
                            <View style={{ marginTop: 15 }} />
                        </View>
                        <View style={[styles.hr, { marginTop: 30 }]} />
                            <View style={{ margin: 15 }}>
                                <Text style={styles.coverLetterTextHeader}>Submitted Cover Letter: </Text>
                                <Text style={{ fontSize: 15, marginTop: 10 }}>
                                    {selected.coverLetterText}
                                </Text>
                            </View>
                            <View style={[styles.hr, { marginTop: 15 }]} />
                            
                            <View style={{ margin: 15 }}>
                                {selected.payByMilestone === true ? <Text style={[styles.largeText, { marginBottom: 10 }]}>Scroll to see milestones</Text> : null}
                                {this.renderIfMilestoneTrue(selected)}
                                <View style={{ marginTop: 20 }} />
                                <View style={styles.margin}>
                            <Text style={styles.headerText}>Questions & Responses ({this.calculateQuestionsLength(selected)} questions)</Text>
                            {selected.question0 !== null ? <View style={[styles.card, { borderColor: "blue" }]}>
                                <View style={styles.cardContent}>
                                    <Text style={styles.description}>Question: {selected.question0.question}</Text>
                                    <View style={{ marginTop: 10 }} />
                                    <ReadMore
                                    numberOfLines={3}
                                    renderTruncatedFooter={this._renderTruncatedFooter}
                                    renderRevealedFooter={this._renderRevealedFooter}
                                    onReady={this._handleTextReady}>
                                        <Text style={styles.date}>
                                            {selected.question0.answer}
                                        </Text>
                                    </ReadMore>
                                </View>
                            </View> : null}
                            <View style={{ marginTop: 20 }} />
                            {selected.question1 !== null ? <View style={[styles.card, { borderColor: "blue" }]}>
                                <View style={styles.cardContent}>
                                    <Text style={styles.description}>Question: {selected.question1.question}</Text>
                                    <View style={{ marginTop: 10 }} />
                                    <ReadMore
                                    numberOfLines={3}
                                    renderTruncatedFooter={this._renderTruncatedFooter}
                                    renderRevealedFooter={this._renderRevealedFooter}
                                    onReady={this._handleTextReady}>
                                        <Text style={styles.date}>
                                            {selected.question1.answer}
                                        </Text>
                                    </ReadMore>
                                </View>
                            </View> : null}
                            <View style={{ marginTop: 20 }} />
                            {selected.question2 !== null ? <View style={[styles.card, { borderColor: "blue" }]}>
                                <View style={styles.cardContent}>
                                    <Text style={styles.description}>Question: {selected.question2.question}</Text>
                                    <View style={{ marginTop: 10 }} />
                                    <ReadMore
                                    numberOfLines={3}
                                    renderTruncatedFooter={this._renderTruncatedFooter}
                                    renderRevealedFooter={this._renderRevealedFooter}
                                    onReady={this._handleTextReady}>
                                        <Text style={styles.date}>
                                            {selected.question2.answer}
                                        </Text>
                                    </ReadMore>
                                </View>
                            </View> : null}
                            <View style={{ marginTop: 20 }} />
                            {selected.question3 !== null ? <View style={[styles.card, { borderColor: "blue" }]}>
                                <View style={styles.cardContent}>
                                    <Text style={styles.description}>Question: {selected.question3.question}</Text>
                                    <View style={{ marginTop: 10 }} />
                                    <ReadMore
                                    numberOfLines={3}
                                    renderTruncatedFooter={this._renderTruncatedFooter}
                                    renderRevealedFooter={this._renderRevealedFooter}
                                    onReady={this._handleTextReady}>
                                        <Text style={styles.date}>
                                            {selected.question3.answer}
                                        </Text>
                                    </ReadMore>
                                </View>
                            </View> : null}
                            <View style={{ marginTop: 20 }} />
                            {selected.question4 !== null ? <View style={[styles.card, { borderColor: "blue" }]}>
                                <View style={styles.cardContent}>
                                    <Text style={styles.description}>Question: {selected.question4.question}</Text>
                                    <View style={{ marginTop: 10 }} />
                                    <ReadMore
                                    numberOfLines={3}
                                    renderTruncatedFooter={this._renderTruncatedFooter}
                                    renderRevealedFooter={this._renderRevealedFooter}
                                    onReady={this._handleTextReady}>
                                        <Text style={styles.date}>
                                            {selected.question4.answer}
                                        </Text>
                                    </ReadMore>
                                </View>
                            </View> : null}
                        </View>
                        {(this.state.selected.unique_id !== this.props.unique_id) && this.state.hide === false ? <AwesomeButtonBlue type={"secondary"} onPress={() => {
                            this.setState({
                                showInvitationModal: true,
                                picked: selected
                            })
                        }} stretch={true}>Select & Interview Applicant</AwesomeButtonBlue> : null}
                        </View>
                    </ScrollView>
                </SlidingUpPanel> : null}
                <Dialog.Container visible={this.state.showInvitationModal}>
                    <Dialog.Title>Would you like to send an invite to interview?</Dialog.Title>
                    <Dialog.Description>
                        Are you sure you'd like to invite this user to interview? Once selected the interview process will start...
                    </Dialog.Description>
                    <Dialog.Button onPress={() => {
                        this.setState({
                            showInvitationModal: false
                        })
                    }} label="Cancel" />
                    <Dialog.Button onPress={() => {
                        this.setState({
                            showInvitationModal: false
                        }, () => {
                            this.hireApplicant(this.state.picked);
                        })
                    }} label="SEND INVITE" />
                </Dialog.Container>
                <Dialog.Container visible={this.state.showDialog}>
                    <Dialog.Title>Delete Applicant/Proposal</Dialog.Title>
                    <Dialog.Description>
                        Are you sure you want to remove this applicant from your listing? You cannot undo this action once processed.
                    </Dialog.Description>
                    <Dialog.Button onPress={() => {
                        this.setState({
                            showDialog: false
                        })
                    }} label="Cancel" />
                    <Dialog.Button onPress={() => {
                        this.setState({
                            showDialog: false
                        }, () => {
                            this.deleteProposal();
                        })
                    }} label="DELETE" />
                </Dialog.Container>
                <ScrollView contentContainerStyle={{ paddingBottom: 50 }} style={styles.container}>
                    {ready === false ? <Fragment><Header style={{ borderBottomColor: "transparent", zIndex: -1, backgroundColor: "#303030" }}>
                    <Left>
                        <Button onPress={() => {
                            this.props.navigation.push("manage-applicants-jobs");
                        }} transparent>
                            <Image source={require("../../../assets/icons/go-back.png")} style={[styles.headerIcon, { tintColor: "#ffd530" }]} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: "#ffd530" }}>Proposals</Title>
                        <Subtitle style={{ color: "#ffd530" }}>View applicants</Subtitle>
                    </Body>
                    <Right>
                        <Button onPress={() => {
                            this.props.navigation.push("homepage");
                        }} transparent>
                            <Icon style={{ color: "#ffd530" }} name='home' />
                        </Button>
                    </Right>
                </Header>
                <Footer style={styles.headerFooter}>
                    <FooterTab>
                        <Button style={styles.greyButton} button={true} onPress={() => {
                            this.props.navigation.push("homepage");
                        }}>
                            <Image source={require("../../../assets/icons/home.png")} style={styles.maxedIconSmall} />
                        </Button>
                        <Button style={styles.greyButton} button={true} onPress={() => {
                            this.props.navigation.push("jobs-homepage");
                        }}>
                            <Image source={require("../../../assets/icons/seeker.png")} style={styles.maxedIconSmall} />
                        </Button>
                        <Button style={styles.greyButton} button={true} onPress={() => {
                            this.props.navigation.push("people-list-all");
                        }}>
                            <Image source={require("../../../assets/icons/people.png")} style={styles.maxedIconSmall} />
                        </Button>
                        <Button style={styles.greyButton} button={true} onPress={() => {
                            this.props.navigation.push("notifications");
                        }}>
                            <Image source={require("../../../assets/icons/bell.png")} style={[styles.maxedIconSmall, { top: 10 }]} />
                            <Badge style={[styles.absoluteBadge, { bottom: 20 }]}><Text style={{ color: "white", fontSize: 10 }}>51</Text></Badge>
                        </Button>
                        <Button style={styles.greyButton} onPress={() => {
                            this.props.navigation.push("navigation-menu-main");
                        }}>
                            <Image source={require("../../../assets/icons/squared-menu.png")} style={styles.maxedIconSmall} />
                        </Button>
                    </FooterTab>
                </Footer><Fragment>
                    <View style={{ marginTop: 20 }} />
                            <View style={{ margin: 15 }}>
                                <SkeletonPlaceholder>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                                        <View style={{ marginLeft: 20 }}>
                                        <View style={{ width: width * 0.65, height: 20, borderRadius: 4 }} />
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
                                        <View style={{ width: width * 0.65, height: 20, borderRadius: 4 }} />
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
                                        <View style={{ width: width * 0.65, height: 20, borderRadius: 4 }} />
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
                                        <View style={{ width: width * 0.65, height: 20, borderRadius: 4 }} />
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
                                        <View style={{ width: width * 0.65, height: 20, borderRadius: 4 }} />
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
                                        <View style={{ width: width * 0.65, height: 20, borderRadius: 4 }} />
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
                                        <View style={{ width: width * 0.65, height: 20, borderRadius: 4 }} />
                                        <View
                                            style={{ marginTop: 6, width: width * 0.55, height: 20, borderRadius: 4 }}
                                        />
                                        </View>
                                    </View>
                                </SkeletonPlaceholder>
                            </View>
                            <View style={{ marginTop: 20 }} />
                        </Fragment></Fragment>: <Fragment><Header style={{ borderBottomColor: "transparent", zIndex: -1, backgroundColor: "#303030" }}>
                        <Left>
                            <Button onPress={() => {
                                this.props.navigation.push("manage-applicants-jobs");
                            }} transparent>
                                <Image source={require("../../../assets/icons/go-back.png")} style={[styles.headerIcon, { tintColor: "#ffd530" }]} />
                            </Button>
                        </Left>
                        <Body>
                            <Title style={{ color: "#ffd530" }}>Proposals</Title>
                            <Subtitle style={{ color: "#ffd530" }}>View applicants</Subtitle>
                        </Body>
                        <Right>
                            <Button onPress={() => {
                                this.props.navigation.push("homepage");
                            }} transparent>
                                <Icon style={{ color: "ffd530" }} name='home' />
                            </Button>
                        </Right>
                    </Header>
                    <Footer style={styles.headerFooter}>
                        <FooterTab>
                            <Button style={styles.greyButton} button={true} onPress={() => {
                                this.props.navigation.push("homepage");
                            }}>
                                <Image source={require("../../../assets/icons/home.png")} style={styles.maxedIconSmall} />
                            </Button>
                            <Button style={styles.greyButton} button={true} onPress={() => {
                                this.props.navigation.push("jobs-homepage");
                            }}>
                                <Image source={require("../../../assets/icons/seeker.png")} style={styles.maxedIconSmall} />
                            </Button>
                            <Button style={styles.greyButton} button={true} onPress={() => {
                                this.props.navigation.push("people-list-all");
                            }}>
                                <Image source={require("../../../assets/icons/people.png")} style={styles.maxedIconSmall} />
                            </Button>
                            <Button style={styles.greyButton} button={true} onPress={() => {
                                this.props.navigation.push("notifications");
                            }}>
                                <Image source={require("../../../assets/icons/bell.png")} style={[styles.maxedIconSmall, { top: 10 }]} />
                                <Badge style={[styles.absoluteBadge, { bottom: 20 }]}><Text style={{ color: "white", fontSize: 10 }}>51</Text></Badge>
                            </Button>
                            <Button style={styles.greyButton} onPress={() => {
                                this.props.navigation.push("navigation-menu-main");
                            }}>
                                <Image source={require("../../../assets/icons/squared-menu.png")} style={styles.maxedIconSmall} />
                            </Button>
                        </FooterTab>
                    </Footer></Fragment>}
                    {applicants.length > 0 ? applicants.map((applicant, index) => {
                        console.log("applicant", applicant);

                        const { question0, question1, question2, question3, question4 } = applicant;
                        return (
                            <TouchableOpacity onPress={() => {
                                if (question4 !== null) {
                                    const array = [question0, question1, question2, question3, question4];

                                    this.setState({
                                        selected: applicant,
                                        questions: [...array]
                                    }, () => {
                                        this.RBSheet.show();
                                    })
                                } else if (question3 !== null) {
                                    const array = [question0, question1, question2, question3];

                                    this.setState({
                                        selected: applicant,
                                        questions: [...array]
                                    }, () => {
                                        this.RBSheet.show();
                                    })
                                } else if (question2 !== null) {
                                    const array = [question0, question1, question2];

                                    this.setState({
                                        selected: applicant,      
                                        questions: [...array]
                                    }, () => {
                                        this.RBSheet.show();
                                    })
                                } else if (question1 !== null) {
                                    const array = [question0, question1];

                                    this.setState({
                                        selected: applicant,
                                        questions: [...array]
                                    }, () => {
                                        this.RBSheet.show();
                                    })
                                } else if (question0 !== null) {
                                    const array = [question0];

                                    this.setState({
                                        selected: applicant,
                                        questions: [...array]
                                    }, () => {
                                        this.RBSheet.show();
                                    })
                                } else {
                                    this.setState({
                                        selected: applicant,
                                    }, () => {
                                        this.RBSheet.show();
                                    })
                                } 
                            }} style={styles.touchable}>
                                <Card key={index} style={{ flex: 0 }}>
                                    <CardItem>
                                    <Left>
                                        {this.renderProfilePictureVideoCustom(applicant.profilePic, applicant.profilePicType)}
                                        <Body>
                                            <Text style={styles.name}>{`${applicant.firstName} ${applicant.lastName}`} {"\n"}{applicant.username}</Text>
                                            <Text note>applied {moment(applicant.systemDate).fromNow()}...</Text>
                                        </Body>
                                        <TouchableOpacity onPress={() => {
                                            this.setState({
                                                selected: applicant,
                                                showDialog: true
                                            })
                                        }} style={styles.rightTop}>
                                            <Image source={require("../../../assets/icons/close.png")} style={{ maxWidth: 35, maxHeight: 35 }} />
                                        </TouchableOpacity>
                                    </Left>
                                    </CardItem>
                                    <CardItem>
                                        <Body>
                                            <Text style={styles.contentText}><Text style={{ color: "darkblue" }}>Estimated ETA Completion</Text>: {applicant.duration}</Text>
                                            <Text style={styles.contentText}><Text style={{ color: "darkblue" }}>Hourly or Fixed</Text>: {applicant.hourly === true ? "Hourly" : "Fixed-Price"}</Text>
                                            <Text style={styles.contentText}><Text style={{ color: "darkblue" }}>Attachments</Text>: {applicant.attachments.length} attachments included</Text>
                                            <View style={{ marginTop: 7.5 }} />
                                            <ReadMore
                                                numberOfLines={5}
                                                renderTruncatedFooter={this._renderTruncatedFooter}
                                                renderRevealedFooter={this._renderRevealedFooter} 
                                            >
                                                <Text style={styles.contentText}><Text style={{ color: "darkblue" }}>Cover Letter</Text>: {applicant.coverLetterText}</Text>
                                            </ReadMore>
                                        </Body>
                                    </CardItem>
                                </Card>
                            </TouchableOpacity>
                        );
                    }) : null}
                </ScrollView>
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
export default connect(mapStateToProps, {  })(IndividualJobManagement);