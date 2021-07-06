import React, { Component, Fragment } from 'react'
import { Button, Icon, Footer, FooterTab, Badge, Header, Left, Right, Body, Title, Subtitle } from 'native-base';
import { Image, View, Text, ScrollView, Dimensions } from 'react-native';
import styles from './styles.js';
import LottieView from 'lottie-react-native';
import axios from 'axios';
import Config from 'react-native-config';
import { connect } from 'react-redux';
import JobHelperSubComponent from "../../jobs/homepage/helpers/job.js";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';


const { height, width } = Dimensions.get("window");

class ManageApplicantsHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        jobs: [],
        ready: false
    }
}
    componentDidMount() {

        axios.post(`${Config.ngrok_url}/gather/jobs/per/user`, {
            id: this.props.unique_id
        }).then((res) => {
            if (res.data.message === "Located jobs!") {
                console.log(res.data);

                const { jobs } = res.data;

                this.setState({
                    jobs,
                    ready: true
                })
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    renderConditional = () => {
        const { ready, jobs } = this.state;

        if (ready === true && (typeof jobs !== "undefined" && jobs.length === 0)) {
            return (
                <View style={{ margin: 10 }}>
                    <View style={styles.background}>
                        <Image source={require("../../../assets/images/8.png")} resizeMode={"contain"} style={styles.myImage} />
                        <View style={{ marginTop: 20 }} />
                        <Text style={styles.headText}>Oops, We couldn't find <Text style={{ textDecorationLine: "underline" }}>ACTIVE</Text> applicants right now...</Text>
                        <View style={{ marginTop: 30 }} />
                        <AwesomeButtonBlue type={"secondary"} textColor={"white"} backgroundColor={"blue"} onPress={() => {
                            // this.props.props.navigation.push("jobs-homepage");
                        }} stretch={true}>Redirect & boost listing(s)</AwesomeButtonBlue>
                    </View>
                </View>
            );
        } else {
            return (
                <Fragment>
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
                    </Fragment>
            );
        }
    }
    render() {
        const { jobs } = this.state;
        return (
            <ScrollView contentContainerStyle={{ paddingBottom: 50 }} style={styles.container}>
                <Header style={{ borderBottomColor: "transparent", backgroundColor: "#303030" }}>
                    <Left>
                        <Button onPress={() => {
                            this.props.props.navigation.push("navigation-menu-main");
                        }} transparent>
                            <Image source={require("../../../assets/icons/go-back.png")} style={styles.headerIcon} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={styles.goldText}>Jobs</Title>
                        <Subtitle style={styles.goldText}>Listed Jobs</Subtitle>
                    </Body>
                    <Right>
                        <Button onPress={() => {
                            this.props.props.navigation.push("homepage");
                        }} transparent>
                            <Icon style={{ color: "#ffd530" }} name='home' />
                        </Button>
                    </Right>
                </Header>
                <Footer style={{ borderColor: "transparent", borderBottomColor: "lightgrey", borderBottomWidth: 2, backgroundColor: "#303030" }}>
                    <FooterTab>
                        <Button style={styles.greyButton} button={true} onPress={() => {
                            this.props.props.navigation.push("homepage");
                        }}>
                            <Image source={require("../../../assets/icons/home.png")} style={styles.maxedIconSmall} />
                        </Button>
                        <Button style={styles.greyButton} button={true} onPress={() => {
                            this.props.props.navigation.push("jobs-homepage");
                        }}>
                            <Image source={require("../../../assets/icons/seeker.png")} style={styles.maxedIconSmall} />
                        </Button>
                        <Button style={styles.greyButton} button={true} onPress={() => {
                            this.props.props.navigation.push("people-list-all");
                        }}>
                            <Image source={require("../../../assets/icons/people.png")} style={styles.maxedIconSmall} />
                        </Button>
                        <Button style={styles.greyButton} button={true} onPress={() => {
                            this.props.props.navigation.push("notifications");
                        }}>
                            <Badge style={styles.absoluteBadge}><Text style={{ color: "white", fontSize: 10 }}>51</Text></Badge>
                            <Image source={require("../../../assets/icons/bell.png")} style={[styles.maxedIconSmall, { bottom: 12.5 }]} />
                        </Button>
                        <Button style={styles.greyButton} onPress={() => {
                            this.props.props.navigation.push("navigation-menu-main");
                        }}>
                            <Image source={require("../../../assets/icons/squared-menu.png")} style={styles.maxedIconSmall} />
                        </Button>
                    </FooterTab>
                </Footer>
                {typeof jobs !== "undefined" && jobs.length > 0 ? jobs.map((job, index) => {
                    console.log("job", job);
                    return (
                        <Fragment key={index}>
                            <JobHelperSubComponent props={this.props} manage={true} item={job} />
                        </Fragment>
                    );
                }) : this.renderConditional()}
            </ScrollView>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.signupData.authData.unique_id
    }
}
export default connect(mapStateToProps, {  })(ManageApplicantsHelper);