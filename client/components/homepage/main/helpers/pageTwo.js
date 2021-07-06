import React, { Component } from 'react';
import {
  Text,
  View,
  Image, 
  Animated,
  ScrollView
} from 'react-native';
import styles from './pageTwoStyles.js';
import { List, Button, ListItem, Text as NativeText, Icon, Left, Body, Right } from 'native-base';
import Config from 'react-native-config';
import LottieView from 'lottie-react-native';
import axios from "axios";
import { connect } from 'react-redux';
import _ from 'lodash';
import Video from 'react-native-video';
import Dialog from "react-native-dialog";
import { wallPostSettings } from "../../../../actions/wall/wall.js";

const arr = [];

for (let i = 0; i < 150; i++) {
  arr.push(i)
}

class PageTwoHelperPageComponent extends Component {
constructor (props) {
    super(props)
    
    this.animatedValue = [];
    
    arr.forEach((value) => {
        this.animatedValue[value] = new Animated.Value(0)
    });

    this.state = {
        selected: null,
        type: null,
        profilePic: null,
        showModal: false
    }
}

    componentDidMount () {
        this.animate();

        if (this.props.settings === "personal-timeline") {
            this.setState({
                selected: "personal-timeline"
            })
        } else if (this.props.settings === "friends-timeline") {
            this.setState({
                selected: "friends-timeline"
            })
        }

        axios.get(`${Config.ngrok_url}/gather/user`, {
            params: {
                id: this.props.unique_id
            }
        }).then((res) => {
            if (res.data.message === "Located the desired user!") {

                const { user } = res.data;

                this.setState({
                    user,
                    profilePic: _.has(user, "profilePics") && user.profilePics.length > 0 ? `${Config.wasabi_url}/${user.profilePics[user.profilePics.length - 1].picture}` : _.has(user, "photo") ? user.photo : Config.no_image_avaliable,
                    type: _.has(user, "profilePics") && user.profilePics.length > 0 ? user.profilePics[user.profilePics.length - 1].type : _.has(user, "photo") ? "picture" : "picture"
                })
                console.log(res.data);
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    animate = () => {
        const animations = arr.map((item) => {
        return Animated.timing(
            this.animatedValue[item],
            {
            toValue: 1,
            duration: 4000,
            useNativeDriver: true
            }
        )
        })
        Animated.stagger(10, animations).start()
    }
    renderPhotoOrVideo = (user) => {
        if (_.has(user, "profilePics") && typeof user.profilePics !== 'undefined' && user.profilePics !== null && user.profilePics.length > 0) {
            if (user.profilePics[user.profilePics.length - 1].type === "video") {
                const picture = user.profilePics[user.profilePics.length - 1].picture;
                return (
                    <View>
                        <Video  
                            resizeMode="cover"
                            repeat
                            source={{ uri: `${Config.wasabi_url}/${picture}` }}   // Can be a URL or a local file.
                            autoplay={true}
                            ref={(ref) => {
                                this.player = ref
                            }}
                            muted={true}
                            style={styles.iconBoxed}
                        />
                    </View>
                );
            } else {
                const picture = user.profilePics[user.profilePics.length - 1].picture;
                return (
                    <View>
                        <Image source={{ uri: `${Config.wasabi_url}/${picture}` }} style={styles.iconBoxed} />
                    </View>
                );
            }
        } else if (_.has(user, "photo") && user.photo !== null && typeof user.photo !== "undefined") {
            return (
                <View>
                    <Image source={{ uri: user.photo }} style={styles.iconBoxed} />
                </View>
            );
        } else {
            return (
                <View>
                    <Image source={{ uri: Config.no_image_avaliable }} style={styles.iconBoxed} />
                </View>
            );
        }
    }
    handleDestinationChange = (destination) => {
        console.log("handleDestinationChange", destination);

        this.props.wallPostSettings({
            destination
        })

        setTimeout(() => {
            this.setState({
                showModal: true
            })
        }, 750)
    }
    calculate = (destination) => {
        if (destination === "personal-timeline") {
            return "Personal Timeline";
        } else if (destination === "friends-timeline") {
            return "Friends Timeline"
        }
    }
    render () {
        const { selected, user } = this.state;
        return (
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }} style={styles.container}>
                <Animated.View style={{ opacity: this.animatedValue[30] }}>
                    <List>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                selected: selected === "personal-timeline" ? null : "personal-timeline"
                            }, () => {
                                this.handleDestinationChange(this.state.selected);
                            })
                        }} avatar>
                            <Left>
                                <Button style={{ borderRadius: 40 }}>
                                    {user !== null ? this.renderPhotoOrVideo(user) : null}
                                </Button>
                            </Left>
                            <Body>
                                <NativeText style={{ fontWeight: "bold" }}>Personal Feed/Timeline</NativeText>
                                <NativeText note>Post to your own personal wall - still publically visible but on your own wall.</NativeText>
                            </Body>
                                <Right>
                                    <Icon style={selected === "personal-timeline" ? { color: "green" } : { }} active name={selected === "personal-timeline" ? "checkmark" : "arrow-forward"} />
                                </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                selected: selected === "friends-timeline" ? null : "friends-timeline"
                            }, () => {
                                this.handleDestinationChange(this.state.selected);
                            })
                        }} avatar>
                            <Left>
                                <Button style={{ backgroundColor: "#18add6", borderRadius: 40 }}>
                                    <Image source={require("../../../../assets/icons/multiple-people.png")} style={styles.iconBoxedTwo} />
                                </Button>
                            </Left>
                            <Body>
                                <NativeText style={{ fontWeight: "bold" }}>Friend's Timeline</NativeText>
                                <NativeText note>Post publically on a "friend's" wall - this will be posted on their wall.</NativeText>
                            </Body>
                                <Right>
                                    <Icon style={selected === "friends-timeline" ? { color: "green" } : { }} active name={selected === "friends-timeline" ? "checkmark" : "arrow-forward"} />
                                </Right>
                        </ListItem>
                    </List>
                    <View style={styles.centered}>
                        <LottieView
                            source={require('../../../../assets/animations/social-media.json')}
                            autoPlay
                            loop
                            style={styles.animation}
                        />
                    </View>
                </Animated.View>
                <View>
                    <Dialog.Container visible={this.state.showModal}>
                    <Dialog.Title>Successfully changed your "destination" settings!</Dialog.Title>
                    <Dialog.Description>
                        We've successfully changed your destination settings to {this.calculate(this.state.selected)} ONLY.
                    </Dialog.Description>
                    <Dialog.Button onPress={() => {
                        this.setState({
                            showModal: false
                        })
                    }} label="Ok" />
                    </Dialog.Container>
                </View>
            </ScrollView>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.signupData.authData.unique_id,
        settings: _.has(state.wallPostSettings, "wallPostSettings") && _.has(state.wallPostSettings.wallPostSettings, "destination") ? state.wallPostSettings.wallPostSettings.destination : ""
    }
}
export default connect(mapStateToProps, { wallPostSettings })(PageTwoHelperPageComponent);