import React, { Component } from 'react';
import {
  Text,
  View,
  Animated,
  ScrollView, 
  Image
} from 'react-native';
import styles from './pageOneStyles.js';
import { List, Button, ListItem, Text as NativeText, Icon, Left, Body, Right, Thumbnail } from 'native-base';
import { Switch } from 'react-native-switch';
import Config from 'react-native-config';
import axios from "axios";
import { connect } from 'react-redux';
import Dialog from "react-native-dialog";



const arr = [];

for (let i = 0; i < 150; i++) {
  arr.push(i)
}

class PageOneShowMoreHelper extends Component {
    constructor (props) {
        super(props);

        this.state = {
            publicSetting: false,
            friendsSetting: false,
            onlyMeSetting: false,
            visibilityModal: false,
            visibility: ""
        }

        this.animatedValue = [];
        
        arr.forEach((value) => {
        this.animatedValue[value] = new Animated.Value(0)
        })
    }

    componentDidMount () {
        this.animate();

        axios.get(`${Config.ngrok_url}/check/visibility`, {
            params: {
                id: this.props.unique_id
            }
        }).then((res) => {
            if (res.data.message === "Successfully aquired visibility.") {
                console.log(res.data);

                const { visibility } = res.data;

                switch (visibility) {
                    case "public":
                        this.setState({
                            publicSetting: true,
                            friendsSetting: false,
                            onlyMeSetting: false
                        });
                        break;
                    case "friends":
                        this.setState({
                            publicSetting: false,
                            friendsSetting: true,
                            onlyMeSetting: false
                        });
                        break;
                    case "only-me":
                        this.setState({
                            publicSetting: false,
                            friendsSetting: false,
                            onlyMeSetting: true
                        });
                        break;
                }
            } else {
                console.log(res.data);
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    animate () {
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
    changeVisibility = (visibility) => {
        console.log("changeVisibility clicked", visibility);

        axios.post(`${Config.ngrok_url}/change/visibility/type/posts`, {
            visibility,
            id: this.props.unique_id
        }).then((res) => {
            if (res.data.message === "Updated visibility!") {
                console.log(res.data);

                this.setState({
                    visibilityModal: true,
                    visibility
                })
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
  render () {
    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 300 }} style={styles.container}>
            <Animated.View style={{ opacity: this.animatedValue[30] }}>
                <Text style={styles.boldText}>Who can see this post?</Text>
                <Text style={[styles.subText, { marginTop: 5 }]}>Your post will show up in News Feed, on your profile and in search results.</Text>
                <View style={{ marginTop: 40 }} />
                <Text style={styles.subText}>Your default audience is set to <Text style={{ fontWeight: "bold" }}>Friends</Text>, but you can change the audienceof this specific post.</Text>
                <View style={{ marginTop: 25 }} />
                <Text style={styles.boldText}>Choose Audience</Text>
                <List>
                    <ListItem style={{ minHeight: 85 }} thumbnail>
                        <Left>
                            <Button transparent>
                                <Thumbnail source={require("../../../../assets/icons/world-map.png")} style={{ maxWidth: 40, maxHeight: 40 }} />
                            </Button>
                        </Left>
                        <Body>
                            <NativeText style={{ fontWeight: "bold" }}>Public</NativeText>
                            <NativeText note>Anyone on or off FairWage Freelancing</NativeText>
                        </Body>
                        <Right style={{ minHeight: 85 }}>
                            <Switch
                                value={this.state.publicSetting}
                                onValueChange={(val) => {
                                    console.log(val);

                                    this.setState({
                                        publicSetting: val,
                                        friendsSetting: false,
                                        onlyMeSetting: false,
                                        visibility: "public"
                                    }, () => {
                                        this.changeVisibility(this.state.visibility);
                                    })
                                }}
                                disabled={false}
                                activeText={'On'}
                                inActiveText={'Off'}
                                circleSize={30}
                                barHeight={25}
                                circleBorderWidth={5}
                                backgroundActive={'green'}
                                backgroundInactive={'gray'}
                                circleActiveColor={'#30a566'}
                                circleInActiveColor={'#000000'}
                                changeValueImmediately={true}
                            />
                        </Right>
                    </ListItem>
                    <ListItem style={{ minHeight: 85 }} thumbnail>
                        <Left>
                            <Button transparent>
                                <Thumbnail source={require("../../../../assets/icons/multiple-people.png")} style={{ maxWidth: 40, maxHeight: 40 }} />
                            </Button>
                        </Left>
                        <Body>
                            <NativeText style={{ fontWeight: "bold" }}>Friends</NativeText>
                            <NativeText note>Your friends on FairWage Freelancing</NativeText>
                        </Body>
                            <Right style={{ minHeight: 85 }}>
                                <Switch
                                    value={this.state.friendsSetting}
                                    onValueChange={(val) => {
                                        console.log(val);

                                        this.setState({
                                            publicSetting: false,
                                            friendsSetting: val,
                                            onlyMeSetting: false,
                                            visibility: "friends"
                                        }, () => {
                                            this.changeVisibility(this.state.visibility);
                                        })
                                    }}
                                    disabled={false}
                                    activeText={'On'}
                                    inActiveText={'Off'}
                                    circleSize={30}
                                    barHeight={25}
                                    circleBorderWidth={5}
                                    backgroundActive={'green'}
                                    backgroundInactive={'gray'}
                                    circleActiveColor={'#30a566'}
                                    circleInActiveColor={'#000000'}
                                    changeValueImmediately={true}
                                />
                            </Right>
                    </ListItem>
                    <ListItem style={{ minHeight: 85 }} thumbnail>
                        <Left>
                            <Button transparent>
                                <Thumbnail source={require("../../../../assets/icons/locking.png")} style={{ maxWidth: 40, maxHeight: 40 }} />
                            </Button>
                        </Left>
                        <Body>
                            <NativeText style={{ fontWeight: "bold" }}>Only Me</NativeText>
                            <NativeText note>Only Me - Great for saving memories</NativeText>
                        </Body>
                            <Right style={{ minHeight: 85 }}>
                                <Switch
                                    value={this.state.onlyMeSetting}
                                    onValueChange={(val) => {
                                        console.log(val);

                                        this.setState({
                                            publicSetting: false,
                                            friendsSetting: false,
                                            onlyMeSetting: val,
                                            visibility: "only-me"
                                        }, () => {
                                            this.changeVisibility(this.state.visibility);
                                        })
                                    }}
                                    disabled={false}
                                    activeText={'On'}
                                    inActiveText={'Off'}
                                    circleSize={30}
                                    barHeight={25}
                                    circleBorderWidth={5}
                                    backgroundActive={'green'}
                                    backgroundInactive={'gray'}
                                    circleActiveColor={'#30a566'}
                                    circleInActiveColor={'#000000'}
                                    changeValueImmediately={true}
                                />
                            </Right>
                    </ListItem>
                </List>
            </Animated.View>
             <View>
                <Dialog.Container visible={this.state.visibilityModal}>
                <Dialog.Title>Successfully updated your post visibility settings!</Dialog.Title>
                <Dialog.Description>
                    We've successfully updated your settings and your posts are now for {this.state.visibility} ONLY.
                </Dialog.Description>
                <Dialog.Button onPress={() => {
                    this.setState({
                        visibilityModal: false
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
        fullName: `${state.signupData.authData.firstName} ${state.signupData.authData.lastName}`
    }
}
export default connect(mapStateToProps, { })(PageOneShowMoreHelper);