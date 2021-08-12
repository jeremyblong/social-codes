import React, { Component, Fragment } from 'react'
import { View, Text, ScrollView, Image, Dimensions } from 'react-native';
import { Header, Left, Body, Right, Button, Title, Subtitle, List, ListItem, Thumbnail } from 'native-base';
import { connect } from 'react-redux';
import axios from "axios";
import Config from "react-native-config";
import styles from "./styles.js";
import Toast from 'react-native-toast-message';
import Dialog from "react-native-dialog";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Video from 'react-native-video';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';


const { width, height } = Dimensions.get("window");

class PendingFriendsListHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        friends: [],
        addVisible: false,
        addDenyVisible: false,
        friend: null,
        ready: false
    }
}
    componentDidMount() {
        const url = `${Config.ngrok_url}/gather/user/pending/requests`;
        
        axios.get(url, {
            params: {
                id: this.props.unique_id
            }
        }).then((res) => {
            console.log(res.data);

            if (res.data.message === "Located requests and gathered info!") {
                console.log(res.data);

                const { friends } = res.data;

                this.setState({
                    friends,
                    ready: true
                })
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    renderPicture = (friend) => {
        if (typeof friend.profilePics !== 'undefined' && friend.profilePics.length > 0) {
            return <Thumbnail style={styles.avatar} source={{ uri: `${Config.wasabi_url}/${friend.profilePics[friend.profilePics.length - 1].picture}` }}/>;
        } else if (user.photo) {
            return <Thumbnail style={styles.avatar} source={{ uri: friend.photo }}/>;
        } else {
            return <Thumbnail style={styles.avatar} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }}/>;
        }
    }
    renderProfilePictureVideo = (friend) => {

        if (typeof friend.profilePics !== 'undefined' && friend.profilePics !== null && friend.profilePics.length > 0) {
            if (friend.profilePics[friend.profilePics.length - 1].type !== "video") {
                console.log("first chunk ran");
                return (
                    <Fragment>
                        {this.renderPicture(friend)}
                    </Fragment>
                );
            } else {
                console.log(`${Config.wasabi_url}/${friend.profilePics[friend.profilePics.length - 1].picture}`);
                return (
                    <Fragment>
                        <Video  
                            resizeMode="cover"
                            repeat
                            source={{uri: `${Config.wasabi_url}/${friend.profilePics[friend.profilePics.length - 1].picture}` }} 
                            autoplay={true}
                            ref={(ref) => {
                                this.player = ref
                            }}
                            muted={true}
                            style={styles.avatar}
                        />
                    </Fragment>
                );
            }
        } else {
            return (
                <Fragment>
                    <Thumbnail style={styles.avatar} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }}/>
                </Fragment>
            );
        }
    }
    addFriend = (friend) => {
        axios.post(`${Config.ngrok_url}/add/friend`, {
            friend,
            id: this.props.unique_id
        }).then((res) => {
            if (res.data.message === "Added friend!") {
                console.log(res.data);

                const { deleted } = res.data;

                this.setState({
                    friends: this.state.friends.filter((friend) => {
                        if (friend.id !== deleted.id) {
                            return friend;
                        }
                    })
                }, () => {
                    Toast.show({
                        text1: 'Successfully added friend!',
                        text2: 'The selected friend was added to your friends list and you may now see their profile!',
                        position: "top",
                        visibilityTime: 4500,
                        type: "success"
                    });
                })

            } else if (res.data.message === "No requests found!") {
                console.log("err", res.data);

                Toast.show({
                    text1: 'No requests were found!',
                    text2: 'We could not locate any requests, an error occurred...',
                    position: "top",
                    visibilityTime: 4500,
                    type: "error"
                });
            } else {
                Toast.show({
                    text1: 'An error occurred while trying to add or delete a request...',
                    text2: 'We encountered an unexpected erorr while trying to accept or deny the requested friend request, please try again...',
                    position: "top",
                    visibilityTime: 4500,
                    type: "error"
                });
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    deleteRequest = (friend) => {
        axios.post(`${Config.ngrok_url}/delete/friend/request`, {
            friend,
            id: this.props.unique_id
        }).then((res) => {
            if (res.data.message === "Denied friend!") {
                console.log(res.data);

                const { deleted } = res.data;

                this.setState({
                    friends: this.state.friends.filter((friend) => {
                        if (friend.id !== deleted.id) {
                            return friend;
                        }
                    })
                }, () => {
                    Toast.show({
                        text1: 'Successfully deleted/rejected the desired request!',
                        text2: 'You have successfully denied/rejected the desired pending friend request...',
                        position: "top",
                        visibilityTime: 4500,
                        type: "success"
                    });
                })

            } else {
                Toast.show({
                    text1: 'An error occurred while trying to add or delete a request...',
                    text2: 'We encountered an unexpected erorr while trying to accept or deny the requested friend request, please try again...',
                    position: "top",
                    visibilityTime: 4500,
                    type: "error"
                });
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    renderPending = () => {
        const { friends, ready } = this.state;

        if (ready === true && typeof friends !== "undefined" && friends.length > 0) {
            return friends.map((friend, index) => {
                if (friend.status === "pending") {
                    return (
                        <ListItem thumbnail>
                            <Left>
                                {this.renderProfilePictureVideo(friend)}
                            </Left>
                            <Body>
                                <Text>{`${friend.firstName} ${friend.lastName}`}</Text>
                                <Text note numberOfLines={1}>User is looking to <Text style={{ fontWeight: "bold", color: "blue" }}>{friend.accountType}</Text></Text>
                                <View style={{ flexDirection: "row", marginTop: 5 }}>
                                    <Button onPress={() => {
                                        this.setState({
                                            addVisible: true,
                                            friend
                                        })
                                    }} style={[styles.buttonCustom, { marginRight: 15 }]} dark>
                                        <Text style={[styles.customText, { color: "white" }]}>Confirm</Text>
                                    </Button>
                                    <Button onPress={() => {
                                        this.setState({
                                            addDenyVisible: true,
                                            friend
                                        })
                                    }} style={styles.buttonCustom} light>
                                        <Text style={[styles.customText, { color: "white" }]}>Delete</Text>
                                    </Button>
                                </View>
                            </Body>
                        </ListItem>
                    );
                }
            });
        } else {
            if (ready === true && typeof friends !== "undefined" && friends.length === 0) {
                return (
                    <View style={styles.background}>
                        <Image source={require("../../../assets/images/5.png")} resizeMode={"contain"} style={styles.myImage} />
                        <View style={{ marginTop: 20 }} />
                        <Text style={styles.headText}>Oops, We couldn't find any pending friend requests at the current moment...</Text>
                        <View style={{ marginTop: 30 }} />
                        <AwesomeButtonBlue borderColor={"#cccccc"} borderWidth={2} style={{ marginTop: 7.5 }} type={"anchor"} backgroundColor={"#ffffff"} backgroundPlaceholder={"black"} textColor={"black"} shadowColor={"grey"} onPress={() => {
                            this.props.props.navigation.push("homepage");
                        }} stretch={true}>Return to homepage</AwesomeButtonBlue>
                    </View>
                );
            } else {
                return (
                    <Fragment>
                        <View style={styles.margin}>
                            <SkeletonPlaceholder>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                                    <View style={{ marginLeft: 20 }}>
                                    <View style={{ width: width * 0.60, height: 20, borderRadius: 4 }} />
                                    <View
                                        style={{ marginTop: 6, width: width * 0.45, height: 20, borderRadius: 4 }}
                                    />
                                    </View>
                                </View>
                            </SkeletonPlaceholder>
                            <View style={{ marginTop: 20 }} />
                            <SkeletonPlaceholder>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                                    <View style={{ marginLeft: 20 }}>
                                    <View style={{ width: width * 0.60, height: 20, borderRadius: 4 }} />
                                    <View
                                        style={{ marginTop: 6, width: width * 0.45, height: 20, borderRadius: 4 }}
                                    />
                                    </View>
                                </View>
                            </SkeletonPlaceholder>
                            <View style={{ marginTop: 20 }} />
                            <SkeletonPlaceholder>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                                    <View style={{ marginLeft: 20 }}>
                                    <View style={{ width: width * 0.60, height: 20, borderRadius: 4 }} />
                                    <View
                                        style={{ marginTop: 6, width: width * 0.45, height: 20, borderRadius: 4 }}
                                    />
                                    </View>
                                </View>
                            </SkeletonPlaceholder>
                            <View style={{ marginTop: 20 }} />
                            <SkeletonPlaceholder>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                                    <View style={{ marginLeft: 20 }}>
                                    <View style={{ width: width * 0.60, height: 20, borderRadius: 4 }} />
                                    <View
                                        style={{ marginTop: 6, width: width * 0.45, height: 20, borderRadius: 4 }}
                                    />
                                    </View>
                                </View>
                            </SkeletonPlaceholder>
                            <View style={{ marginTop: 20 }} />
                            <SkeletonPlaceholder>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                                    <View style={{ marginLeft: 20 }}>
                                    <View style={{ width: width * 0.60, height: 20, borderRadius: 4 }} />
                                    <View
                                        style={{ marginTop: 6, width: width * 0.45, height: 20, borderRadius: 4 }}
                                    />
                                    </View>
                                </View>
                            </SkeletonPlaceholder>
                            <View style={{ marginTop: 20 }} />
                            <SkeletonPlaceholder>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                                    <View style={{ marginLeft: 20 }}>
                                    <View style={{ width: width * 0.60, height: 20, borderRadius: 4 }} />
                                    <View
                                        style={{ marginTop: 6, width: width * 0.45, height: 20, borderRadius: 4 }}
                                    />
                                    </View>
                                </View>
                            </SkeletonPlaceholder>
                            <View style={{ marginTop: 20 }} />
                            <SkeletonPlaceholder>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                                    <View style={{ marginLeft: 20 }}>
                                    <View style={{ width: width * 0.60, height: 20, borderRadius: 4 }} />
                                    <View
                                        style={{ marginTop: 6, width: width * 0.45, height: 20, borderRadius: 4 }}
                                    />
                                    </View>
                                </View>
                            </SkeletonPlaceholder>
                            <View style={{ marginTop: 20 }} />
                            <SkeletonPlaceholder>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                                    <View style={{ marginLeft: 20 }}>
                                    <View style={{ width: width * 0.60, height: 20, borderRadius: 4 }} />
                                    <View
                                        style={{ marginTop: 6, width: width * 0.45, height: 20, borderRadius: 4 }}
                                    />
                                    </View>
                                </View>
                            </SkeletonPlaceholder>
                            <View style={{ marginTop: 20 }} /><SkeletonPlaceholder>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                                    <View style={{ marginLeft: 20 }}>
                                    <View style={{ width: width * 0.60, height: 20, borderRadius: 4 }} />
                                    <View
                                        style={{ marginTop: 6, width: width * 0.45, height: 20, borderRadius: 4 }}
                                    />
                                    </View>
                                </View>
                            </SkeletonPlaceholder>
                            <View style={{ marginTop: 20 }} />
                        </View>
                    </Fragment>
                );
            }
        }
    }
    render() {
        console.log("pending index.js state", this.state);
        return (
            <Fragment>
                 <Header style={{ backgroundColor: "#303030" }}>
                    <Left>
                        <Button onPress={() => {
                            this.props.props.navigation.goBack();
                        }} transparent>
                            <Image source={require("../../../assets/icons/go-back.png")} style={styles.headerIcon} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={styles.whiteText}>Friends Menu</Title>
                        <Subtitle style={styles.whiteText}>Navigate friend options</Subtitle>
                    </Body>
                    <Right />
                </Header>
                <Toast ref={(ref) => Toast.setRef(ref)} />
                <ScrollView contentContainerStyle={{ paddingBottom: 50 }} style={styles.container}>
                    <View style={styles.margin}>
                        <List>
                            {this.renderPending()}
                        </List>
                    </View>
                </ScrollView>
                <View>
                    <Dialog.Container visible={this.state.addVisible}>
                    <Dialog.Title>Are you sure you'd like to add this person as a friend?</Dialog.Title>
                    <Dialog.Description>
                        You are about to add this person as a friend, is this what you want to do?
                    </Dialog.Description>
                    <Dialog.Button onPress={() => {
                        this.setState({
                            addVisible: false
                        })
                    }} label="Cancel" />
                    <Dialog.Button onPress={() => {
                        this.setState({
                            addVisible: false
                        }, () => {
                            this.addFriend(this.state.friend);
                        })
                    }} label="ADD FRIEND" />
                    </Dialog.Container>
                </View>
                <View>
                    <Dialog.Container visible={this.state.addDenyVisible}>
                    <Dialog.Title>Are you sure you'd like to reject/deny this friend request?</Dialog.Title>
                    <Dialog.Description>
                        You are about to deny this request, this action cannot be undone and you must send them a friend request if you'd like to be friends at a later time...
                    </Dialog.Description>
                    <Dialog.Button onPress={() => {
                        this.setState({
                            addDenyVisible: false
                        })
                    }} label="Cancel" />
                    <Dialog.Button onPress={() => {
                        this.setState({
                            addDenyVisible: false
                        }, () => {
                            this.deleteRequest(this.state.friend);
                        })
                    }} label="REJECT/DENY" />
                    </Dialog.Container>
                </View>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.signupData.authData.unique_id
    }
}
export default connect(mapStateToProps, {  })(PendingFriendsListHelper);