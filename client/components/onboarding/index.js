import React, { Component, Fragment } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    Alert,
    ScrollView,
    FlatList
  } from 'react-native';
import { Header, Left, Body, Right, Button, Title, Subtitle } from 'native-base';
import styles from './styles.js';
import axios from "axios";
import { connect } from 'react-redux';
import Config from "react-native-config";
import { WebView } from 'react-native-webview';
import Confetti from 'react-native-confetti';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const { width, height } = Dimensions.get("window");


class OnboardingHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        isVisible: false,
        ready: false,
        continuation: false,
        alreadyCompleted: false
    }
}
    componentDidMount() {
        // const url = `${Config.ngrok_url}/gather/user`;
        
        // axios.get(url, {
        //     params: {
        //         id: this.props.unique_id
        //     }
        // }).then((res) => {

        //     if (res.data.message === "Located the desired user!") {

        //         console.log(res.data);

        //         const { user } = res.data;

        //         this.setState({
        //             user
        //         })
        //     } else {
        //         console.log("Err", res.data);
        //     }
        // }).catch((err) => {
        //     console.log(err);
        // })


        axios.get(`${Config.ngrok_url}/gather/onboarding/links`, {
            params: {
                stripeConnectAccountID: this.props.stripeConnectAccountID
            }
        }).then((res) => {
            if (res.data.message === "Created links!") {
                console.log(res.data);

                const { url } = res.data;

                this.setState({
                    url,
                    ready: true
                })
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    componentWillUnmount () {
        if (this._confettiView) {
            this._confettiView.stopConfetti();
        }
    }
    renderContent = () => {
        const { ready, url, alreadyCompleted } = this.state;

        if (alreadyCompleted === false) {
            return (
                <Fragment>
                    {ready === true ? <WebView onNavigationStateChange={(state) => {
                        //your code goes here     
                        console.log("webview state, : ", state);  

                        if ((state.url === "https://www.google.com/" || state.url === "https://www.google.com") && this.state.continuation === false) {
                            this.setState({
                                continuation: true
                            }, () => {
                                this._confettiView.startConfetti();
                            })
                        }
                    }} style={styles.webview} source={{ uri: url }} /> : <Fragment>
                        <View style={styles.margin}>
                            <SkeletonPlaceholder>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                                    <View style={{ marginLeft: 20 }}>
                                    <View style={{ width: width * 0.70, height: 20, borderRadius: 4 }} />
                                    <View
                                        style={{ marginTop: 6, width: width * 0.50, height: 20, borderRadius: 4 }}
                                    />
                                    </View>
                                </View>
                            </SkeletonPlaceholder>
                            <View style={{ marginTop: 20 }} /> 
                            <SkeletonPlaceholder>
                                <View style={{ width: "100%", height: 225 }}>
                                    
                                </View>
                            </SkeletonPlaceholder>
                            <View style={{ marginTop: 20 }} /> 
                            <SkeletonPlaceholder>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                                    <View style={{ marginLeft: 20 }}>
                                    <View style={{ width: width * 0.70, height: 20, borderRadius: 4 }} />
                                    <View
                                        style={{ marginTop: 6, width: width * 0.50, height: 20, borderRadius: 4 }}
                                    />
                                    </View>
                                </View>
                            </SkeletonPlaceholder>
                            <View style={{ marginTop: 20 }} /> 
                            <SkeletonPlaceholder>
                                <View style={{ width: "100%", height: 225 }}>
                                    
                                </View>
                            </SkeletonPlaceholder>
                            <View style={{ marginTop: 20 }} /> 
                            <SkeletonPlaceholder>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                                    <View style={{ marginLeft: 20 }}>
                                    <View style={{ width: width * 0.70, height: 20, borderRadius: 4 }} />
                                    <View
                                        style={{ marginTop: 6, width: width * 0.50, height: 20, borderRadius: 4 }}
                                    />
                                    </View>
                                </View>
                            </SkeletonPlaceholder>
                            <View style={{ marginTop: 20 }} /> 
                            <SkeletonPlaceholder>
                                <View style={{ width: "100%", height: 225 }}>
                                    
                                </View>
                            </SkeletonPlaceholder>
                            <View style={{ marginTop: 20 }} /> 
                        </View>
                    </Fragment>}
                </Fragment>
            );
        } else {
            return (
                <ScrollView contentContainerStyle={{ paddingBottom: 150, paddingTop: 50 }} style={styles.container}>
                    <View style={{alignItems:'center', marginHorizontal:30}}>
                        <Image style={styles.productImg} source={require("../../assets/images/congrats.jpg")}/>
                        <Text style={styles.name}>You've already completed the required onboarding process for payments!</Text>
                        <Text style={styles.price}>COMPLETE</Text>
                        <Text style={styles.description}>
                            You have SUCCESSFULLY completed the "onboarding" process - you may now make and receive payments from other users on our platform!
                        </Text>
                    </View>

                    <View style={styles.separator}></View>
                    <View style={styles.addToCarContainer}>
                        <TouchableOpacity style={styles.shareButton} onPress={()=> this.clickEventListener()}>
                        <Text style={styles.shareButtonText}>Back to main menu</Text>  
                        </TouchableOpacity>
                    </View> 
                    </ScrollView>
            );
        }
    }
    render() {
        return (
            <Fragment>
                <Header style={{ backgroundColor: "#303030" }}>
                    <Left>
                        <Button onPress={() => {
                            this.props.props.navigation.goBack();
                        }} transparent>
                            <Image source={require("../../assets/icons/go-back.png")} style={[styles.headerIcon, { tintColor: "#ffffff" }]} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: "#ffffff" }}>Onboarding</Title>
                        <Subtitle style={{ color: "#ffffff" }}>Onboard your account</Subtitle>
                    </Body>
                    <Right>
                        <Button onPress={() => {
                            this.setState({
                                isVisible: true
                            })
                        }} transparent>
                            <Image source={require("../../assets/icons/help.png")} style={[styles.headerIconTwo, { tintColor: "#ffffff" }]} />
                        </Button>
                    </Right>
                </Header> 
                <Confetti duration={3000} size={1.5} confettiCount={500} ref={(node) => this._confettiView = node}/>
                <View style={styles.container}>
                    {this.renderContent()}
                </View>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        stripeConnectAccountID: state.signupData.authData.stripeConnectAccount.id
    }
}
export default connect(mapStateToProps, { })(OnboardingHelper)
