import React, { Component, Fragment } from 'react';
import styles from './styles.js';
import { Text, View, Image, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { Header, Left, Body, Right, Title, Subtitle, Button, Text as NativeText, Content, Card, CardItem } from 'native-base';
import axios from "axios";
import Config from "react-native-config";
import { connect } from "react-redux";
import _ from "lodash";
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import SlideUpViewFilePane from "./panes/slideUpPaneViewFile.js";
import FileViewer from 'react-native-file-viewer';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";


const { height, width } = Dimensions.get("window");

class CompletedGigsListHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        completed: [],
        index: 0,
        work: null,
        ready: false
    }
    this.viewFileRef = React.createRef();
}
    componentDidMount() {
        axios.get(`${Config.ngrok_url}/gather/completed/jobs/logged/in/only`, {
            params: {
                id: this.props.unique_id
            }
        }).then((res) => {
            if (res.data.message === "Gathered completed jobs!") {
                const { completed } = res.data;

                this.setState({
                    completed,
                    ready: true
                })
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    renderContent = () => {
        const { ready, completed } = this.state;

        if (ready === true) {
            return (
                <Fragment>
                    {typeof completed !== "undefined" && completed.length > 0 ? completed.map((gig, index) => {
                        console.log("gig", gig);
                        return (
                            <Card key={index}>
                                <CardItem header bordered>
                                <Text>Assignment with {gig.otherUserFirstName} {gig.otherUserLastName}</Text>
                                </CardItem>
                                <CardItem bordered>
                                    {_.has(gig, "note") && gig.note.length > 0 ? <Body>
                                    <Text><Text style={{ fontWeight: "bold" }}>Submitted Note</Text>: {gig.note}</Text>
                                    <View style={styles.hr} />
                                    <Text style={styles.headerMainText}>Submitted Work...</Text>
                                    {_.has(gig, "uploadedWork") && gig.uploadedWork.length > 0 ? <Fragment>
                                        {gig.uploadedWork.map((work, idx) => {
                                            return (
                                                <TouchableOpacity key={idx} onPress={() => {
                                                    if (work.type !== "application/msword" && work.type !== "application/pdf" && work.type !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
                                                        this.setState({
                                                            work: gig.uploadedWork,
                                                            index: idx
                                                        }, () => {
                                                            setTimeout(() => {
                                                                this.viewFileRef.current.open();
                                                            }, 2000)
                                                        })
                                                    } else {
                                                        FileViewer.open(work.fileUrl).then(() => {
                                                            // success
                                                        })
                                                        .catch(error => {
                                                            // error
                                                        });
                                                    }
                                                }}>
                                                    <Text style={styles.workName}>{work.fileName}</Text>
                                                </TouchableOpacity>
                                            );
                                        })}
                                    </Fragment> : null}
                                    <Text style={styles.headerMainText}>Payments Made...</Text>
                                    {_.has(gig, "payments") && gig.payments.length > 0 ? gig.payments.map((payment, iii) => {
                                        return (
                                            <Text key={iii} style={styles.workName}>${(payment.amount / 100).toFixed(2)} payment made</Text>
                                        );
                                    }) : null}
                                </Body> : <Body>
                                    <Text style={styles.headerMainText}>Submitted Work...</Text>
                                    {_.has(gig, "uploadedWork") && gig.uploadedWork.length > 0 ? <Fragment>
                                        {gig.uploadedWork.map((work, idx) => {
                                            return (
                                                <TouchableOpacity key={idx} onPress={() => {
                                                    if (work.type !== "application/msword" && work.type !== "application/pdf" && work.type !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
                                                        this.setState({
                                                            work: gig.uploadedWork,
                                                            index: idx
                                                        }, () => {
                                                            setTimeout(() => {
                                                                this.viewFileRef.current.open();
                                                            }, 2000)
                                                        })
                                                    } else {
                                                        FileViewer.open(work.fileUrl).then(() => {
                                                            // success
                                                        })
                                                        .catch(error => {
                                                            // error
                                                        });
                                                    }
                                                }}>
                                                    <Text style={styles.workName}>{work.fileName}</Text>
                                                </TouchableOpacity>
                                            );
                                        })}
                                    </Fragment> : null}
                                    <Text style={styles.headerMainText}>Payments Made...</Text>
                                    {_.has(gig, "payments") && gig.payments.length > 0 ? gig.payments.map((payment, iii) => {
                                        return (
                                            <Text key={iii} style={styles.workName}>${(payment.amount / 100).toFixed(2)} payment made</Text>
                                        );
                                    }) : null}
                                </Body>}
                                </CardItem>
                                <CardItem footer bordered>
                                    <AwesomeButtonBlue borderColor={"#cccccc"} borderWidth={2} style={{ marginTop: 20 }} type={"anchor"} backgroundColor={"#ffffff"} backgroundPlaceholder={"black"} textColor={"black"} shadowColor={"grey"} onPress={() => {
                                     
                                    }} stretch={true}>View Job Data</AwesomeButtonBlue>
                                </CardItem>
                                {(_.has(gig, "employerLeftReview") && gig.employerLeftReview === true) || (_.has(gig, "workerLeftReview") && gig.workerLeftReview === true) ? null : <CardItem>
                                    <AwesomeButtonBlue borderColor={"#cccccc"} borderWidth={2} style={{ marginTop: 20 }} type={"anchor"} backgroundColor={"#ffffff"} backgroundPlaceholder={"black"} textColor={"black"} shadowColor={"grey"} onPress={() => {
                                        this.props.props.navigation.push("leave-a-review", { gig });    
                                    }} stretch={true}>Leave a review</AwesomeButtonBlue>
                                </CardItem>}
                            </Card>
                        );
                    }) : <Fragment>
                        <View style={styles.background}>
                            <Image source={require("../../../assets/images/8.png")} resizeMode={"contain"} style={styles.myImage} />
                            <View style={{ marginTop: 20 }} />
                            <Text style={styles.headText}>Oops, We couldn't find <Text style={{ textDecorationLine: "underline" }}>ACTIVE</Text> completed jobs right now...</Text>
                            <View style={{ marginTop: 30 }} />
                            <AwesomeButtonBlue borderColor={"#cccccc"} borderWidth={2} style={{ marginTop: 20 }} type={"anchor"} backgroundColor={"#ffffff"} backgroundPlaceholder={"black"} textColor={"black"} shadowColor={"grey"} onPress={() => {
                                // this.props.props.navigation.push("jobs-homepage");    
                            }} stretch={true}>Redirect to active jobs</AwesomeButtonBlue>
                        </View>
                    </Fragment>}
                </Fragment>
            );
        } else {
            return (
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
            );
        }
    }
    render() {
        const { completed, work } = this.state;
        return (
            <Fragment>
                <Header style={{ backgroundColor: "#303030" }}>
                    <Left>
                        <Button onPress={() => {
                            this.props.props.navigation.replace("navigation-menu-main");
                        }} transparent>
                            <Image source={require("../../../assets/icons/go-back.png")} style={styles.headerIcon} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={styles.whiteText}>Completed Gigs</Title>
                        <Subtitle style={styles.whiteText}>Finished jobs/gigs</Subtitle>
                    </Body>
                    <Right />
                </Header>
                {work !== null ? <SlideUpViewFilePane indexxx={this.state.index} viewFileRef={this.viewFileRef} props={this.props} work={work} /> : null}
                <ScrollView contentContainerStyle={{ paddingBottom: 150 }} style={styles.container}>
                    <Content padder>
                        {this.renderContent()}
                    </Content>
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
export default connect(mapStateToProps, {  })(CompletedGigsListHelper);
