import React, { PureComponent, Fragment } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import styles from "./styles.js";
import { Header, Left, Body, Right, Button, List, ListItem, Thumbnail } from 'native-base';
import LottieView from 'lottie-react-native';
import axios from "axios";
import Config from "react-native-config";
import SlidingUpPanel from 'rn-sliding-up-panel';
import Popover from 'react-native-popover-view';
import Video from 'react-native-video';
import _ from 'lodash';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';


const { height, width } = Dimensions.get("window");


class RBSheetCustomHelper extends PureComponent {
constructor(props) {
    super(props);

    this.state = {
        innerLikeVisible: false,
        removeLikeVisible: false,
        like: ""
    }
}
    redirectToUsersProfile = (user) => {
        this.props.props.navigation.push("individual-profile-public", { item: { unique_id: user.poster }});
    }
    renderEmojis = (post) => {
        const emojis = [];

        for (const key in post.reactions) {
            const reaction = post.reactions[key];

            if (reaction > 0) {
                emojis.push(key);
            };
        };

        return emojis.map((emoji) => {
            if (emoji === "screaming") {
                return <Image source={require("../../../../../assets/icons/screaming.png")} style={{ maxWidth: 25, maxHeight: 25, minWidth: 25, minHeight: 25 }} />;
            } else if (emoji === "exploding") {
                return <Image source={require("../../../../../assets/icons/exploding.png")} style={{ maxWidth: 25, maxHeight: 25, minWidth: 25, minHeight: 25 }} />;
            } else if (emoji === "tearsOfJoy") {
                return <Image source={require("../../../../../assets/icons/laughing.png")} style={{ maxWidth: 25, maxHeight: 25, minWidth: 25, minHeight: 25 }} />;
            } else if (emoji === "clapping") {
                return <Image source={require("../../../../../assets/icons/clapping.png")} style={{ maxWidth: 25, maxHeight: 25, minWidth: 25, minHeight: 25 }} />;
            } else if (emoji === "angry") {
                return <Image source={require("../../../../../assets/icons/angry.png")} style={{ maxWidth: 25, maxHeight: 25, minWidth: 25, minHeight: 25 }} />;
            } else if (emoji === "heart") {
                return <Image source={require("../../../../../assets/icons/heart-face.png")} style={{ maxWidth: 25, maxHeight: 25, minWidth: 25, minHeight: 25 }} />;
            } else if (emoji === "wow") {
                return <Image source={require("../../../../../assets/icons/starstruck.png")} style={{ maxWidth: 25, maxHeight: 25, minWidth: 25, minHeight: 25 }} />;
            }
        });
    }
    gatherAdditionalInfo = (post) => {
        
        axios.post(`${Config.ngrok_url}/gather/users/liked/post/additional/info`, {
            id: this.props.unique_id,
            post
        }).then((res) => {
            if (res.data.message === "Gathered information!") {
                console.log(res.data);

                const { values } = res.data;

                this.setState({
                    responses: values
                })

                this._panelCustom.show(height * 0.50);
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    calculateLikeCount = (post) => {
        let sum = 0;
        for (const key in post.reactions) {
            const reaction = post.reactions[key];

            if (reaction > 0) {
                sum += reaction;
            }
        }
        if (sum === 0) {
            return "";
        } else {
            return sum.toString();
        }
    }
    likeReactPost = (post) => {
        console.log("POSTIE:", post);
    
        axios.post(`${Config.ngrok_url}/like/react/post/wall`, {
            post,
            id: this.props.unique_id,
            like: this.state.like
        }).then((res) => {
            if (res.data.message === "Reacted to post!") {
                console.log(res.data);
    
                const { post, alteredID } = res.data;
    
                const checkIndex = this.state.posts.findIndex(({ id }) => {
                    if (id === alteredID) {
                        return id;
                    }
                });

                console.log("checkIndex ADDED LIKE: ", checkIndex);
    
                if (checkIndex !== -1) {
                    
                    const copy = [...this.state.posts];
    
                    copy[checkIndex] = post;
    
                    this.setState({
                        posts: copy,
                        selectedPost: post
                    })
                }
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    removeLikeResponse = (post) => {
        console.log("revoke like....", post);

        axios.post(`${Config.ngrok_url}/like/react/post/wall/revoke/remove`, {
            post,
            id: this.props.unique_id
        }).then((res) => {
            if (res.data.message === "Revoke/remove like!") {
                console.log(res.data);

                const { post } = res.data;
                
                const checkIndex = this.state.posts.findIndex(({ id }) => {
                    if (id === post.id) {
                        return id;
                    }
                });
                
                console.log("check index REMOVE LIKE....:", checkIndex);

                if (checkIndex !== -1) {
                    
                    const copy = [...this.state.posts];
    
                    copy[checkIndex] = post;
    
                    this.setState({
                        posts: copy,
                        selectedPost: post
                    })
                }
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    render() {
        const { responses } = this.state;
        const { selectedPost } = this.props;
        return (
            <Fragment>
                <View>
                    <View style={[styles.topRow, { paddingTop: 0 }]}>
                        <View style={{ flexDirection: "row" }}>
                            {this.renderEmojis(this.props.selectedPost)}
                            <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => {
                                this.gatherAdditionalInfo(this.props.selectedPost);
                            }}>
                                <Text style={styles.peopleText}>{this.calculateLikeCount(this.props.selectedPost)}</Text>
                                <Image source={require("../../../../../assets/icons/right.png")} style={{ maxWidth: 35, maxHeight: 35, minWidth: 35, minHeight: 35, marginTop: -2.5 }} />
                            </TouchableOpacity>

                            <View onPress={() => {}} style={styles.rightLikeIcon}>
                            {selectedPost.peopleReactedIDs.includes(this.props.unique_id) ? <Popover  
                                onRequestClose={() => {
                                    this.setState({
                                        removeLikeVisible: false
                                    })
                                }}
                                isVisible={this.state.removeLikeVisible}  
                                placement={"bottom"}
                                from={(
                                    <Button transparent onPress={() => {
                                        this.setState({
                                            removeLikeVisible: true
                                        })
                                    }} style={{ flexDirection: "column", width: width * 0.125, marginBottom: 20 }}>
                                        <Image source={require("../../../../../assets/icons/undo.png")} style={{ maxWidth: 45, maxHeight: 45, minWidth: 45, minHeight: 45 }} />
                                    </Button>
                                )}>
                                <View style={styles.popoverTwo}>
                                    <View style={{ paddingTop: 5, width: "100%" }}>
                                        <AwesomeButtonBlue backgroundColor={"blue"} textColor={"white"} type={"secondary"} onPress={() => {
                                        this.setState({
                                            removeLikeVisible: !this.state.removeLikeVisible
                                        }, () => {
                                            this.removeLikeResponse(selectedPost);
                                        })
                                    }} stretch={true}>Remove/Revoke Response</AwesomeButtonBlue>
                                    </View>
                                </View>
                            </Popover> : <Popover  
                                    onRequestClose={() => {
                                        this.setState({
                                            innerLikeVisible: false
                                        })
                                    }}
                                    isVisible={this.state.innerLikeVisible}  
                                    placement={"bottom"}
                                    from={(
                                        <Button transparent onPress={() => {
                                            this.setState({
                                                innerLikeVisible: true
                                            })
                                        }} style={{ flexDirection: "column", width: width * 0.125 }}>
                                            <Image source={require("../../../../../assets/icons/like.png")} style={{ maxWidth: 35, maxHeight: 35, minWidth: 35, minHeight: 35 }} />
                                        </Button>
                                )}>
                                    <View style={styles.popoverTwo}>
                                        <TouchableOpacity onPress={() => {
                                            this.setState({
                                                innerLikeVisible: !this.state.innerLikeVisible,
                                                like: "screaming"
                                            }, () => {
                                                this.likeReactPost(this.props.selectedPost);
                                            });
                                        }} style={styles.lottiContainer}>
                                            <LottieView source={require('../../../../../assets/animations/screaming.json')} autoPlay loop style={{ width: 50, maxWidth: 50, height: 65 }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                            this.setState({
                                                innerLikeVisible: !this.state.innerLikeVisible,
                                                like: "exploding"
                                            }, () => {
                                                this.likeReactPost(this.props.selectedPost);
                                            });
                                        }} style={styles.lottiContainer}>
                                            <LottieView source={require('../../../../../assets/animations/exploding.json')} autoPlay loop style={{ width: 50, maxWidth: 50, height: 65 }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                            this.setState({
                                                innerLikeVisible: !this.state.innerLikeVisible,
                                                like: "tearsOfJoy"
                                            }, () => {
                                                this.likeReactPost(this.props.selectedPost);
                                            });
                                        }} style={styles.lottiContainer}>
                                            <LottieView source={require('../../../../../assets/animations/tears-of-joy.json')} autoPlay loop style={{ width: 80, maxWidth: 80, height: 65 }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                            this.setState({
                                                innerLikeVisible: !this.state.innerLikeVisible,
                                                like: "clapping"
                                            }, () => {
                                                this.likeReactPost(this.props.selectedPost);
                                            });
                                        }} style={styles.lottiContainer}>
                                            <LottieView source={require('../../../../../assets/animations/clapping.json')} autoPlay loop style={{ width: 50, maxWidth: 50, height: 65 }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                            this.setState({
                                                innerLikeVisible: !this.state.innerLikeVisible,
                                                like: "angry"
                                            }, () => {
                                                this.likeReactPost(this.props.selectedPost);
                                            });
                                        }} style={styles.lottiContainer}>
                                            <LottieView source={require('../../../../../assets/animations/angry.json')} autoPlay loop style={{ width: 50, maxWidth: 50, height: 65 }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                            this.setState({
                                                innerLikeVisible: !this.state.innerLikeVisible,
                                                like: "love"
                                            }, () => {
                                                this.likeReactPost(this.props.selectedPost);
                                            });
                                        }} style={styles.lottiContainer}>
                                            <LottieView source={require('../../../../../assets/animations/love.json')} autoPlay loop style={{ width: 50, maxWidth: 50, height: 65 }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                            this.setState({
                                                innerLikeVisible: !this.state.innerLikeVisible,
                                                like: "wow"
                                            }, () => {
                                                this.likeReactPost(this.props.selectedPost);
                                            });
                                        }} style={styles.lottiContainer}>
                                            <LottieView source={require('../../../../../assets/animations/wow.json')} autoPlay loop style={{ width: 50, maxWidth: 50, height: 65 }} />
                                        </TouchableOpacity>
                                    </View>
                                </Popover>}
                            </View>
                        </View>
                    </View>
                    <ScrollView contentContainerStyle={{ paddingBottom: 100 }} style={styles.commentsContainer}>
                        <List style={{ marginTop: 12 }}>
                            <View style={styles.comment}>
                                <ListItem avatar>
                                    <Left>
                                        <Thumbnail source={{ uri: "https://s3.us-central-1.wasabisys.com/fairwage-freelancing/01125701-2fdf-4044-b87a-590945d5d4a1" }} />
                                    </Left>
                                    <Body style={{ backgroundColor: "#ededed", padding: 10, borderRadius: 25 }}>
                                        <Text style={{ fontWeight: "bold" }}>Kumar Pratik</Text>
                                        <Text note>Doing what you like will always keep you happy . .</Text>
                                    </Body>
                                    <Right />
                                </ListItem>
                                <View style={styles.underlay}>
                                    <Text>2h ago</Text>
                                    <TouchableOpacity onPress={() => {}} style={styles.likeTouch}><Text style={{ fontWeight: "bold", color: "grey" }}>Like</Text></TouchableOpacity>
                                    <TouchableOpacity onPress={() => {}} style={styles.likeTouch}><Text style={{ fontWeight: "bold", color: "grey", marginRight: 10 }}>Reply</Text></TouchableOpacity>
                                    <Image source={require("../../../../../assets/icons/clapping.png")} style={{ maxWidth: 25, maxHeight: 25, minWidth: 25, minHeight: 25 }} />
                                </View>
                                <View style={styles.underlay}>
                                    <TouchableOpacity onPress={() => {}}>
                                        <Text style={{ fontWeight: "bold" }}>View 1 previous reply</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ marginTop: 3.5, flexDirection: "row", marginLeft: 100 }}>
                                    <View style={{ flexDirection: "row", marginTop: 7.5 }}>
                                        <Image source={{ uri: "https://s3.us-central-1.wasabisys.com/fairwage-freelancing/01125701-2fdf-4044-b87a-590945d5d4a1" }} style={{ borderRadius: 40, maxWidth: 30, maxHeight: 30, minWidth: 30, minHeight: 30 }} />
                                        <Text style={styles.replyName}>Jeremy Blong</Text>
                                        <Text style={{ marginTop: 5 }}>This is the mes...</Text>
                                    </View>
                                    
                                </View>
                                <View style={{ marginTop: 3.5, flexDirection: "row", marginLeft: 100 }}>
                                    <View style={{ flexDirection: "row", marginTop: 7.5 }}>
                                        <Image source={{ uri: "https://s3.us-central-1.wasabisys.com/fairwage-freelancing/08b9a1f1-799b-414f-b950-ba9af71448a4" }} style={{ borderRadius: 40, maxWidth: 30, maxHeight: 30, minWidth: 30, minHeight: 30 }} />
                                        <Text style={styles.replyName}>Rene Adams</Text>
                                        <Text style={{ marginTop: 5 }}>Yeah thats wha...</Text>
                                    </View>
                                </View>
                                <View style={{ marginTop: 3.5, flexDirection: "row", marginLeft: 100 }}>
                                    <View style={{ flexDirection: "row", marginTop: 7.5 }}>
                                        <Image source={{ uri: "https://s3.us-central-1.wasabisys.com/fairwage-freelancing/08b9a1f1-799b-414f-b950-ba9af71448a4" }} style={{ borderRadius: 40, maxWidth: 30, maxHeight: 30, minWidth: 30, minHeight: 30 }} />
                                        <Text style={styles.replyName}>Jocob Panama</Text>
                                        <Text style={{ marginTop: 5 }}>Real relationsh...</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.comment}>
                                <ListItem avatar>
                                    <Left>
                                        <Thumbnail source={{ uri: "https://s3.us-central-1.wasabisys.com/fairwage-freelancing/08b9a1f1-799b-414f-b950-ba9af71448a4" }} />
                                    </Left>
                                    <Body style={{ backgroundColor: "#ededed", padding: 10, borderRadius: 25 }}>
                                        <Text style={{ fontWeight: "bold" }}>Jeremy Blong</Text>
                                        <Text note>Sick post bro! I really like what you're doing</Text>
                                    </Body>
                                    <Right />
                                </ListItem>
                                <View style={styles.underlay}>
                                    <Text>4h ago</Text>
                                    <TouchableOpacity onPress={() => {}} style={styles.likeTouch}><Text style={{ fontWeight: "bold", color: "grey" }}>Like</Text></TouchableOpacity>
                                    <TouchableOpacity onPress={() => {}} style={styles.likeTouch}><Text style={{ fontWeight: "bold", color: "grey", marginRight: 10 }}>Reply</Text></TouchableOpacity>
                                    <Image source={require("../../../../../assets/icons/laughing.png")} style={{ maxWidth: 25, maxHeight: 25, minWidth: 25, minHeight: 25 }} />
                                </View>
                            </View>
                            <View style={styles.comment}>
                                <ListItem avatar>
                                    <Left>
                                        <Thumbnail source={{ uri: "https://s3.us-central-1.wasabisys.com/fairwage-freelancing/08b9a1f1-799b-414f-b950-ba9af71448a4" }} />
                                    </Left>
                                    <Body style={{ backgroundColor: "#ededed", padding: 10, borderRadius: 25 }}>
                                        <Text style={{ fontWeight: "bold" }}>Adam Smith</Text>
                                        <Text note>How much did you pay for your RV? I wanna buy one myself so I'm curious</Text>
                                    </Body>
                                    <Right />
                                </ListItem>
                                <View style={styles.underlay}>
                                    <Text>5h ago</Text>
                                    <TouchableOpacity onPress={() => {}} style={styles.likeTouch}><Text style={{ fontWeight: "bold", color: "grey" }}>Like</Text></TouchableOpacity>
                                    <TouchableOpacity onPress={() => {}} style={styles.likeTouch}><Text style={{ fontWeight: "bold", color: "grey", marginRight: 10 }}>Reply</Text></TouchableOpacity>
                                    <Image source={require("../../../../../assets/icons/starstruck.png")} style={{ maxWidth: 25, maxHeight: 25, minWidth: 25, minHeight: 25 }} />
                                </View>
                            </View>
                            <View style={styles.comment}>
                                <ListItem avatar>
                                    <Left>
                                        <Thumbnail source={{ uri: "https://s3.us-central-1.wasabisys.com/fairwage-freelancing/08b9a1f1-799b-414f-b950-ba9af71448a4" }} />
                                    </Left>
                                    <Body style={{ backgroundColor: "#ededed", padding: 10, borderRadius: 25 }}>
                                        <Text style={{ fontWeight: "bold" }}>Barak Obama</Text>
                                        <Text note>I'm president bitch! Whatchu know....</Text>
                                    </Body>
                                    <Right />
                                </ListItem>
                                <View style={styles.underlay}>
                                    <Text>12h ago</Text>
                                    <TouchableOpacity onPress={() => {}} style={styles.likeTouch}><Text style={{ fontWeight: "bold", color: "grey" }}>Like</Text></TouchableOpacity>
                                    <TouchableOpacity onPress={() => {}} style={styles.likeTouch}><Text style={{ fontWeight: "bold", color: "grey", marginRight: 10 }}>Reply</Text></TouchableOpacity>
                                    <Image source={require("../../../../../assets/icons/starstruck.png")} style={{ maxWidth: 25, maxHeight: 25, minWidth: 25, minHeight: 25 }} />
                                </View>
                            </View>
                            
                        </List>
                    </ScrollView>
                </View>
                <SlidingUpPanel height={400} allowDragging={true} ref={c => this._panelCustom = c}>
                    <View style={{ width, height: height * 0.50, backgroundColor: "white", zIndex: 9999999999999999999999999999999999999 }}>
                        <ScrollView vertical={true} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>
                            <List>
                                {typeof responses !== "undefined" && responses.length > 0 ? responses.map((person, index) => {
                                    console.log("person: ", person);
                                    return (
                                        <ListItem avatar>
                                            <Left>
                                                <TouchableOpacity onPress={() => {
                                                    this.redirectToUsersProfile(person);
                                                }}>
                                                    {person.profilePicType === "video" ? <Video  
                                                        resizeMode="cover"
                                                        repeat
                                                        source={{uri: person.profilePic }} 
                                                        autoplay={true}
                                                        ref={(ref) => {
                                                            this.player = ref
                                                        }}
                                                        muted={true}
                                                        style={styles.avatar}
                                                    /> : <Thumbnail style={styles.avatar} source={{ uri: person.profilePic }} />}
                                                </TouchableOpacity>
                                            </Left>
                                            <Body style={{ height: 75 }}>
                                                <Text style={{ paddingTop: 10 }}><Text style={{ fontWeight: "bold", color: "blue", justifyContent: "center" }}>{`${person.firstName} ${person.lastName}`}</Text> - {person.username}</Text>
                                                <Text note>{Math.floor(Math.random() * 250) + 1} Mutual friends</Text>
                                            </Body>
                                            <Right>
                                                <Button style={styles.addFriendBtn} primary onPress={() => {}}>
                                                    <Text style={{ fontWeight: "bold", color: "white" }}>Add friend</Text>
                                                </Button>
                                            </Right>
                                        </ListItem>
                                    );
                                }) : null}
                            </List>
                        </ScrollView>
                    </View>
                </SlidingUpPanel>
            </Fragment>
        )
    }
}
export default RBSheetCustomHelper;