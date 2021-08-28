import React, { Component, Fragment } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Dimensions, Platform, TextInput, InteractionManager, Keyboard } from 'react-native';
import { Header, Left, Body, Right, Button, Icon, Footer, FooterTab, Badge, Title, Text as NativeText, Subtitle , Card, CardItem, Thumbnail, List, ListItem, Textarea } from 'native-base';
import Config from 'react-native-config';
import styles from './styles.js';
import _ from 'lodash';
import LottieView from 'lottie-react-native';
import RBSheet from "react-native-raw-bottom-sheet";
import SheetInnerOptions from "./helpers/RBsheetOptions.js";
import Video from 'react-native-video';
import SharedItemPostHelper from "../helpers/posts/sharedPost.js";
import Popover from 'react-native-popover-view';
import ReadMore from 'react-native-read-more-text';
import Highlighter from 'react-native-highlight-words';
import axios from "axios";
import MapView, { Marker } from 'react-native-maps';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
import { launchImageLibrary } from 'react-native-image-picker';
import { connect } from "react-redux";
import Spinner from 'react-native-loading-spinner-overlay';
import ActionSheet from 'react-native-actionsheet'
import Clipboard from '@react-native-community/clipboard';

const { height, width } = Dimensions.get("window");

class IndividualWallPostingHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        post: null,
        postLoaded: false,
        rbsheetHeight: 0,
        additionalComment: "",
        selectedSubComment: {},
        selectedComment: null,
        spinnerLoading: false,
        visible: false,
        comment: "",
        selection: {
            start: 0,
            end: 0
        },
        comments: [],
        base64: null,
        picture: null
    };
    this.myTextInput = React.createRef();
    this.myTextInputPersonAdd = React.createRef();
}
    redirectToUsersProfileWithoutPane = () => {
        const passedPost = this.props.props.route.params.post;

        if (_.has(passedPost, "newData")) {
            this.props.props.navigation.push("individual-profile-public", { item: { unique_id: passedPost.newData.poster }});
        } else {
            this.props.props.navigation.push("individual-profile-public", { item: { unique_id: passedPost.poster }});
        }
    }
    focusInputWithKeyboard = () => {
        InteractionManager.runAfterInteractions(() => {
            this.myTextInput.current.focus()
        });
    }
    focusInputAddPerson = () => {
        InteractionManager.runAfterInteractions(() => {
            this.myTextInputPersonAdd.current.focus();

            setTimeout(() => {
                this.myTextInputPersonAdd.current.setNativeProps({ selection: this.state.selection })
            }, 750)
        });
    }
    componentDidMount() {
        const passedPost = this.props.props.route.params.post;

        console.log("passedPost", passedPost);

        const promises = [];

        axios.get(`${Config.ngrok_url}/gather/post/comments`, {
            params: {
                id: passedPost.id
            }
        }).then((res) => {
            if (res.data.message === "Found comments!") {
                const { comments } = res.data;

                console.log(res.data);

                if (typeof comments !== "undefined" && comments.length > 0) {
                    for (let index = 0; index < comments.length; index++) {
                        const comment = comments[index];
                        console.log("comment: ", comment);
                        if (_.has(comment, "subComments") && comment.subComments.length > 0) {
                            console.log("first");

                            promises.push(new Promise((resolve, reject) => {
                                axios.get(`${Config.ngrok_url}/gather/brief/info/name/and/pictures`, {
                                    params: {
                                        id: comment.poster
                                    }
                                }).then((res) => {
                                    if (res.data.message === "Located data!") {
                                        console.log(res.data);
                
                                        const { photo, name, type } = res.data;
                
                                        comment.profilePic = photo;
                                        comment.type = type;
                                        comment.name = name;
            
                                        for (let iiii = 0; iiii < comment.subComments.length; iiii++) {
                                            const subComment = comment.subComments[iiii];
            
                                            axios.get(`${Config.ngrok_url}/gather/brief/info/name/and/pictures`, {
                                                params: {
                                                    id: subComment.poster
                                                }
                                            }).then((res) => {
                                                if (res.data.message === "Located data!") {
                                                    console.log(res.data);
                            
                                                    const { photo, name, type } = res.data;
                            
                                                    subComment.profilePic = photo;
                                                    subComment.type = type;
                                                    subComment.name = name;
                        
                                                    resolve(comment);
                                                } else {
                                                    console.log("err", res.data);
                                                }
                                            }).catch((err) => {
                                                console.log(err);
                                            })
                                        }
                                    } else {
                                        console.log("err", res.data);
                                    }
                                }).catch((err) => {
                                    console.log(err);
                                })
                            }))
                        } else {
                            console.log("second");
                            promises.push(new Promise((resolve, reject) => {
                                axios.get(`${Config.ngrok_url}/gather/brief/info/name/and/pictures`, {
                                    params: {
                                        id: comment.poster
                                    }
                                }).then((res) => {
                                    if (res.data.message === "Located data!") {
                                        console.log(res.data);
                
                                        const { photo, name, type } = res.data;
                
                                        comment.profilePic = photo;
                                        comment.type = type;
                                        comment.name = name;
            
                                        resolve(comment);
                                    } else {
                                        console.log("err", res.data);
                                    }
                                }).catch((err) => {
                                    console.log(err);
                                })
                            }))
                        }
                    }
                    Promise.all(promises).then((passedValues) => {
                        console.log("passedValues", passedValues);
                        this.setState({
                            post: passedPost,
                            postLoaded: true,
                            comments: passedValues
                        }, () => {
                            this.RBSheet.open();
                
                            setTimeout(() => {
                                this.focusInputWithKeyboard();
                            }, 750)
                        })
                    }).catch((err) => {
                        console.log(err);
                    })
                } else {
                    this.setState({
                        post: passedPost,
                        postLoaded: true,
                        comments: []
                    }, () => {
                        this.RBSheet.open();
            
                        setTimeout(() => {
                            this.focusInputWithKeyboard();
                        }, 750)
                    })
                }
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    renderPhotoOrVideo = (post) => {
        if (post.profilePics !== null && typeof post.profilePics !== 'undefined' && post.profilePics.length > 0) {
            if (post.profilePics[post.profilePics.length - 1].type === "video") {
                const picture = post.profilePics[post.profilePics.length - 1].picture;
                return (
                    <Button onPress={this.redirectToUsersProfileWithoutPane} transparent>
                        <Video  
                            resizeMode="cover"
                            repeat
                            source={{ uri: `${Config.wasabi_url}/${picture}` }}   // Can be a URL or a local file.
                            autoplay={true}
                            ref={(ref) => {
                                this.player = ref
                            }}
                            muted={true}
                            style={styles.profilePicHeader}
                        />
                    </Button>
                );
            } else {
                const picture = post.profilePics[post.profilePics.length - 1].picture;
                return (
                    <Button onPress={this.redirectToUsersProfileWithoutPane} transparent>
                        <Image source={{ uri: `${Config.wasabi_url}/${picture}` }} style={styles.profilePicHeader} />
                    </Button>
                );
            }
        } else if (post.photo !== null && typeof post.photo !== "undefined") {
            return (
                <Button onPress={this.redirectToUsersProfileWithoutPane} transparent>
                    <Image source={{ uri: post.photo }} style={styles.profilePicHeader} />
                </Button>
            );
        } else {
            return (
                <Button onPress={this.redirectToUsersProfileWithoutPane} transparent>
                    <Image source={{ uri: Config.no_image_avaliable }} style={styles.profilePicHeader} />
                </Button>
            );
        }
    }
    likeSharedPostRespond = (post) => {

        axios.post(`${Config.ngrok_url}/like/react/post/wall/shared/posting`, {
            post,
            id: this.props.unique_id,
            like: this.state.like
        }).then((res) => {
            if (res.data.message === "Reacted to post!") {
                console.log(res.data);
    
                const { post, alteredID } = res.data;
    
                this.setState({
                    post
                })
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    revokeSharedLikeResponse = (post) => {
        console.log("revokeSharedLikeResponse", post);

        axios.post(`${Config.ngrok_url}/like/react/post/wall/revoke/remove/shared`, {
            post,
            id: this.props.unique_id
        }).then((res) => {
            if (res.data.message === "Revoke/remove like!") {
                console.log(res.data);

                const { post } = res.data;
                
                this.setState({
                    post
                })
            } else {
                console.log("Err", res.data);
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
                return <Image source={require("../../../../assets/icons/screaming.png")} style={{ maxWidth: 25, maxHeight: 25, minWidth: 25, minHeight: 25 }} />;
            } else if (emoji === "exploding") {
                return <Image source={require("../../../../assets/icons/exploding.png")} style={{ maxWidth: 25, maxHeight: 25, minWidth: 25, minHeight: 25 }} />;
            } else if (emoji === "tearsOfJoy") {
                return <Image source={require("../../../../assets/icons/laughing.png")} style={{ maxWidth: 25, maxHeight: 25, minWidth: 25, minHeight: 25 }} />;
            } else if (emoji === "clapping") {
                return <Image source={require("../../../../assets/icons/clapping.png")} style={{ maxWidth: 25, maxHeight: 25, minWidth: 25, minHeight: 25 }} />;
            } else if (emoji === "angry") {
                return <Image source={require("../../../../assets/icons/angry.png")} style={{ maxWidth: 25, maxHeight: 25, minWidth: 25, minHeight: 25 }} />;
            } else if (emoji === "heart") {
                return <Image source={require("../../../../assets/icons/heart-face.png")} style={{ maxWidth: 25, maxHeight: 25, minWidth: 25, minHeight: 25 }} />;
            } else if (emoji === "wow") {
                return <Image source={require("../../../../assets/icons/starstruck.png")} style={{ maxWidth: 25, maxHeight: 25, minWidth: 25, minHeight: 25 }} />;
            }
        });
    }
    checkHighlight = (post) => {
        if (typeof post.taggedUsers !== "undefined" && _.has(post, "taggedUsers") && Array.isArray(post["taggedUsers"]) && post.taggedUsers !== null && post.taggedUsers.length > 0) {
            return true;
        } else {
            return false;
        }
    }
    errored = (err) => {
        console.log(err);
    }
    openComment = () => {
        this.RBSheet.open();

        setTimeout(() => {
            this.focusInputWithKeyboard();
        }, 750)
    }
    submitComment = () => {
        console.log("submitComment clicked...");
    }
    deleteComment = (sub, comment) => {
        console.log("Delete sub comment", sub, comment);

        const passedPost = this.props.props.route.params.post;

        axios.put(`${Config.ngrok_url}/delete/sub/comment/own`, {
            id: this.props.unique_id,
            subComment: sub,
            comment,
            postID: passedPost.id
        }).then((res) => {
            console.log(res.data);
            if (res.data.message === "Deleted sub-comment!") {

                const comments = this.state.comments.filter((item, index) => {
                    if (item.id === comment.id) {

                        if (typeof item.subComments !== "undefined" && item.subComments.length > 0) {
                            for (let idxxxx = 0; idxxxx < item.subComments.length; idxxxx++) {
                                const subcomment = item.subComments[idxxxx];
                                if (subcomment.id === sub.id) {
                                    console.log("match!");
                                    item.subComments.splice(idxxxx, 1);
                                }
                            }
                            return item;
                        } else {
                            return item;
                        }
                    } else {
                        return item;
                    }
                });

                this.setState({
                    comments
                }, () => {
                    this.ActionSheet.hide();
                })
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    renderContent = () => {
        const { post, postLoaded, comments } = this.state;

        if (post !== null && postLoaded === true) {
            if (_.has(post, "newData") && post.shared === true) {
                return (
                    <Card>
                        <SharedItemPostHelper 
                            postLoaded={this.state.postLoaded} 
                            index={1} 
                            post={post} 
                            props={this.props} 
                        />
                        <CardItem style={{ width: width, marginLeft: -20 }}>
                            <Body>
                                <Footer style={{ width: width, backgroundColor: "#303030" }}>
                                    <FooterTab style={{ width: width }}>
                                        {post.newData.peopleReactedIDs.includes(this.props.unique_id) ? <Popover  
                                            onRequestClose={() => {
                                                this.setState({
                                                    visible: false
                                                })
                                            }}
                                            isVisible={this.statevisible}  
                                            placement={"top"}
                                            from={(
                                                <Button onPress={() => {
                                                    this.setState({
                                                        visible: true
                                                    })
                                                }} style={{ flexDirection: "column", width: width * 0.33333333333, backgroundColor: "#ffffff" }}>
                                                    <Image source={require("../../../../assets/icons/like.png")} style={{ maxWidth: 20, maxHeight: 20, tintColor: "#303030" }} />
                                                    <Text style={{ color: "#303030", fontWeight: "bold" }}>Un-Like</Text>
                                                </Button>
                                            )}>
                                            <View style={styles.popoverTwo}>
                                                <View style={{ paddingTop: 5, width: "100%" }}>
                                                    <AwesomeButtonBlue backgroundColor={"blue"} textColor={"white"} type={"secondary"} onPress={() => {
                                                    this.setState({
                                                        visible: visible                                            
                                                    }, () => {
                                                        this.revokeSharedLikeResponse(post);
                                                    })
                                                }} stretch={true}>Remove/Revoke Response</AwesomeButtonBlue>
                                                </View>
                                            </View>
                                        </Popover> : <Popover  
                                            onRequestClose={() => {
                                                this.setState({
                                                    visible: false
                                                })
                                            }}
                                            isVisible={this.statevisible}  
                                            placement={"top"}
                                            from={(
                                                <Button onPress={() => {
                                                    this.setState({
                                                        visible: true
                                                    })
                                                }} style={{ flexDirection: "column", width: width * 0.33333333333, backgroundColor: "grey" }}>
                                                    <Image source={require("../../../../assets/icons/like.png")} style={{ maxWidth: 20, maxHeight: 20, tintColor: "#ffffff" }} />
                                                    <Text style={{ color: "#ffffff" }}>Like</Text>
                                                </Button>
                                            )}>
                                            <View style={styles.popoverTwo}>
                                                <TouchableOpacity onPress={() => {
                                                    this.setState({
                                                        visible,
                                                        like: "screaming"
                                                    }, () => {
                                                        this.likeSharedPostRespond(post);
                                                    })
                                                }} style={styles.lottiContainer}>
                                                    <LottieView source={require('../../../../assets/animations/screaming.json')} autoPlay loop style={{ width: 50, maxWidth: 50, height: 65 }} />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => {
                                                    this.setState({
                                                        visible,
                                                        like: "exploding"
                                                    }, () => {
                                                        this.likeSharedPostRespond(post);
                                                    })
                                                }} style={styles.lottiContainer}>
                                                    <LottieView source={require('../../../../assets/animations/exploding.json')} autoPlay loop style={{ width: 50, maxWidth: 50, height: 65 }} />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => {
                                                    this.setState({
                                                        visible,
                                                        like: "tearsOfJoy"
                                                    }, () => {
                                                        this.likeSharedPostRespond(post);
                                                    })
                                                }} style={styles.lottiContainer}>
                                                    <LottieView source={require('../../../../assets/animations/tears-of-joy.json')} autoPlay loop style={{ width: 80, maxWidth: 80, height: 65 }} />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => {
                                                    this.setState({
                                                        visible,
                                                        like: "clapping"
                                                    }, () => {
                                                        this.likeSharedPostRespond(post);
                                                    })
                                                }} style={styles.lottiContainer}>
                                                    <LottieView source={require('../../../../assets/animations/clapping.json')} autoPlay loop style={{ width: 50, maxWidth: 50, height: 65 }} />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => {
                                                    this.setState({
                                                        visible,
                                                        like: "angry"
                                                    }, () => {
                                                        this.likeSharedPostRespond(post);
                                                    })
                                                }} style={styles.lottiContainer}>
                                                    <LottieView source={require('../../../../assets/animations/angry.json')} autoPlay loop style={{ width: 50, maxWidth: 50, height: 65 }} />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => {
                                                    this.setState({
                                                        visible,
                                                        like: "heart"
                                                    }, () => {
                                                        this.likeSharedPostRespond(post);
                                                    })
                                                }} style={styles.lottiContainer}>
                                                    <LottieView source={require('../../../../assets/animations/love.json')} autoPlay loop style={{ width: 50, maxWidth: 50, height: 65 }} />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => {
                                                    this.setState({
                                                        visible,
                                                        like: "wow"
                                                    }, () => {
                                                        this.likeSharedPostRespond(post);
                                                    })
                                                }} style={styles.lottiContainer}>
                                                    <LottieView source={require('../../../../assets/animations/wow.json')} autoPlay loop style={{ width: 50, maxWidth: 50, height: 65 }} />
                                                </TouchableOpacity>
                                            </View>
                                        </Popover>}
                                        
                                        <Button onPress={() => {
                                            this.openComment();
                                        }} style={{ flexDirection: "column", width: width * 0.33333333333, backgroundColor: "grey" }}>
                                            <Image source={require("../../../../assets/icons/add-comment.png")} style={{ maxWidth: 20, maxHeight: 20, tintColor: "#ffffff" }} />
                                            <Text style={{ color: "#ffffff" }}>Comment</Text>
                                        </Button>
                                        
                                    </FooterTab>
                                </Footer>
                                </Body>
                            </CardItem>
                        </Card>
                    );
            } else {
                console.log("POST", post);
                return (
                    <Fragment key={1}>
                    {_.has(post, "videoLinkIncluded") && post.videoLinkIncluded === true ? <Fragment>
                        <Card>
                            <CardItem>
                            <Left>
                                {this.renderPhotoOrVideo(post)}
                                <Body>
                                <Text><Text style={{ fontWeight: "bold" }}>{`${post.firstName} ${post.lastName}`}</Text>{post.taggedLocation === true ? ` is at ` : null} <TouchableOpacity style={{ }} onPress={() => {
                                    this.lookupCompany(post.taggedLocationData);
                                }}><Text style={{ fontWeight: "bold" }}>{post.taggedLocation === true ? post.taggedLocationData.poi.name : null}</Text></TouchableOpacity></Text>
                                <Text note>{post.date}</Text>
                                </Body>
                            </Left>
                            </CardItem>
                            <CardItem>
                            <Body style={{  }}>
                                {typeof post.pictures !== "undefined" && post.pictures !== null ? <View style={{  }}>
                                    <View style={post.pictures !== null && typeof post.pictures !== "undefined" && post.pictures.length <= 2 ? styles.normallyBoxed : styles.normallyBoxedElse}>
                                        {[1, 3, 4].includes(post.pictures.length)  && this.renderOneLive(post.pictures)}
                                        {post.pictures.length >= 2 && post.pictures.length != 4 && this.renderTwoLive(post.pictures)}
                                        {post.pictures.length >= 4 && this.renderThreeLive(post.pictures)}
                                    </View>
                                </View> : null}
                                <ReadMore
                                numberOfLines={3}
                                renderTruncatedFooter={this._renderTruncatedFooter}
                                renderRevealedFooter={this._renderRevealedFooter}
                                onReady={this._handleTextReady}>
                                    {this.checkHighlight(post) ? <Highlighter 
                                        onPressHighlightedText={(username) => {
                                            this.redirectBasedOnUsername(username);
                                        }}
                                        highlightStyle={{backgroundColor: '#0057ff', color: "white" }}
                                        searchWords={post.taggedUsers}
                                        textToHighlight={post.text}
                                    /> : <Text style={styles.cardText}>
                                        {post.text}
                                    </Text>}
                                </ReadMore>
    
                                {typeof post.taggedLocation !== 'undefined' && post.taggedLocation === true ? <MapView
                                    style={styles.mapCustom}
                                    region={{
                                        latitude: post.taggedLocationData.position.lat, 
                                        longitude: post.taggedLocationData.position.lon,
                                        latitudeDelta: 0.0922,
                                        longitudeDelta: 0.0421
                                    }}
                                >
                                    <Marker
                                        key={10}
                                        coordinate={{ 
                                            latitude: post.taggedLocationData.position.lat, 
                                            longitude: post.taggedLocationData.position.lon 
                                        }}
                                        title={post.taggedLocationData.poi.name}
                                        description={post.taggedLocationData.address.freeformAddress}
                                    >
                                        <Image source={require("../../../../assets/icons/map-pin.png")} style={{ maxWidth: 30, maxHeight: 30 }} />
                                    </Marker>
                                </MapView> : null}
                                <Video 
                                    source={{ uri: post.videoLink }}   // Can be a URL or a local file.
                                    ref={ref => { this.video = ref}} 
                                    muted={true}
                                    paused={false} 
                                    controls={true}
                                    onError={this.errored}
                                    style={styles.postVideoStyles} 
                                />
                            </Body>
                            </CardItem>
                            <CardItem>
                                <View style={{ alignContent: "flex-start", flexDirection: "row", width: width * 0.65 }}>
                                    {this.renderEmojis(post)}
                                    <Text style={styles.likeCount}>{this.calculateLikeCount(post)}</Text>
                                </View>
                                <TouchableOpacity onPress={() => {
                                    this.setState({
                                        selectedPost: post
                                    }, () => {
                                        this.RBSheetCustom.open();
                                    })
                                }} style={{ alignContent: "flex-end", width: width * 0.35 }}>
                                    <Text style={{ textAlign: "right", marginRight: 30 }}>5 Comments</Text>
                                </TouchableOpacity>
                            </CardItem>
                            <CardItem style={{ width: width, marginLeft: -20 }}>
                                <Body>
                                <Footer style={{ width: width }}>
                                    <FooterTab style={{ width: width, backgroundColor: "#ffffff" }}>
                                        {post.peopleReactedIDs.includes(this.props.unique_id) ? <Popover  
                                            onRequestClose={() => {
                                                this.setState({
                                                    visible: false
                                                })
                                            }}
                                            isVisible={this.statevisible}  
                                            placement={"top"}
                                            from={(
                                                <Button onPress={() => {
                                                    this.setState({
                                                        visible: true
                                                    })
                                                }} style={{ flexDirection: "column", width: width * 0.33333333333 }}>
                                                    <Image source={require("../../../../assets/icons/like.png")} style={{ maxWidth: 20, maxHeight: 20, tintColor: "#303030" }} />
                                                    <Text style={{ color: "#303030", fontWeight: "bold" }}>Un-Like</Text>
                                                </Button>
                                            )}>
                                            <View style={styles.popoverTwo}>
                                                <View style={{ paddingTop: 5, width: "100%" }}>
                                                    <AwesomeButtonBlue backgroundColor={"blue"} textColor={"white"} type={"secondary"} onPress={() => {
                                                    this.setState({
                                                        visible: visible                                                }, () => {
                                                        this.removeLikeResponse(post);
                                                    })
                                                }} stretch={true}>Remove/Revoke Response</AwesomeButtonBlue>
                                                </View>
                                            </View>
                                        </Popover> : <Popover  
                                            onRequestClose={() => {
                                                this.setState({
                                                    visible: false
                                                })
                                            }}
                                            isVisible={this.statevisible}  
                                            placement={"top"}
                                            from={(
                                                <Button onPress={() => {
                                                    this.setState({
                                                        visible: true
                                                    })
                                                }} style={{ flexDirection: "column", width: width * 0.33333333333, backgroundColor: "grey" }}>
                                                    <Image source={require("../../../../assets/icons/like.png")} style={{ maxWidth: 20, maxHeight: 20, tintColor: "#ffffff" }} />
                                                    <Text style={{ color: "#ffffff" }}>Like</Text>
                                                </Button>
                                            )}>
                                            <View style={styles.popoverTwo}>
                                                <TouchableOpacity onPress={() => {
                                                    this.setState({
                                                        visible,
                                                        like: "screaming"
                                                    }, () => {
                                                        this.likeReactPost(post);
                                                    })
                                                }} style={styles.lottiContainer}>
                                                    <LottieView source={require('../../../../assets/animations/screaming.json')} autoPlay loop style={{ width: 50, maxWidth: 50, height: 65 }} />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => {
                                                    this.setState({
                                                        visible,
                                                        like: "exploding"
                                                    }, () => {
                                                        this.likeReactPost(post);
                                                    })
                                                }} style={styles.lottiContainer}>
                                                    <LottieView source={require('../../../../assets/animations/exploding.json')} autoPlay loop style={{ width: 50, maxWidth: 50, height: 65 }} />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => {
                                                    this.setState({
                                                        visible,
                                                        like: "tearsOfJoy"
                                                    }, () => {
                                                        this.likeReactPost(post);
                                                    })
                                                }} style={styles.lottiContainer}>
                                                    <LottieView source={require('../../../../assets/animations/tears-of-joy.json')} autoPlay loop style={{ width: 80, maxWidth: 80, height: 65 }} />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => {
                                                    this.setState({
                                                        visible,
                                                        like: "clapping"
                                                    }, () => {
                                                        this.likeReactPost(post);
                                                    })
                                                }} style={styles.lottiContainer}>
                                                    <LottieView source={require('../../../../assets/animations/clapping.json')} autoPlay loop style={{ width: 50, maxWidth: 50, height: 65 }} />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => {
                                                    this.setState({
                                                        visible,
                                                        like: "angry"
                                                    }, () => {
                                                        this.likeReactPost(post);
                                                    })
                                                }} style={styles.lottiContainer}>
                                                    <LottieView source={require('../../../../assets/animations/angry.json')} autoPlay loop style={{ width: 50, maxWidth: 50, height: 65 }} />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => {
                                                    this.setState({
                                                        visible,
                                                        like: "heart"
                                                    }, () => {
                                                        this.likeReactPost(post);
                                                    })
                                                }} style={styles.lottiContainer}>
                                                    <LottieView source={require('../../../../assets/animations/love.json')} autoPlay loop style={{ width: 50, maxWidth: 50, height: 65 }} />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => {
                                                    this.setState({
                                                        visible,
                                                        like: "wow"
                                                    }, () => {
                                                        this.likeReactPost(post);
                                                    })
                                                }} style={styles.lottiContainer}>
                                                    <LottieView source={require('../../../../assets/animations/wow.json')} autoPlay loop style={{ width: 50, maxWidth: 50, height: 65 }} />
                                                </TouchableOpacity>
                                            </View>
                                        </Popover>}
                                        
                                        <Button onPress={() => {
                                            this.openComment();
                                        }} style={{ flexDirection: "column", width: width * 0.33333333333, backgroundColor: "grey" }}>
                                            <Image source={require("../../../../assets/icons/add-comment.png")} style={{ maxWidth: 20, maxHeight: 20, tintColor: "#ffffff" }} />
                                            <Text style={{ color: "#ffffff" }}>Comment</Text>
                                        </Button>
                                        
                                    </FooterTab>
                                </Footer>
                                </Body>
                            </CardItem>
                        </Card>
                        <View style={styles.thickLine} />
                        <List>
                        {typeof comments !== "undefined" && comments.length > 0 ? comments.map((each, index) => {
                                console.log("comment one", each);
                                return (
                                    <Fragment>
                                        <View key={index} style={styles.comment}>
                                            <ListItem button={true} onPress={() => {
                                                this.setState({
                                                    selectedSubComment: {
                                                        sub: null, 
                                                        comment: each
                                                    },
                                                    selectedComment: each,
                                                    additionalComment: `@${each.name} `
                                                }, () => {
                                                    this.ActionSheetTwo.show();
                                                })
                                            }} avatar>
                                                <Left>
                                                    {each.type === "video" ? null : <Thumbnail style={styles.thumbnailImage} source={{ uri: each.profilePic }} />}
                                                </Left>
                                                <Body style={styles.bodyBody}>
                                                    <Text style={{ fontWeight: "bold" }}>{each.name}</Text>
                                                    <Text note>{each.comment}</Text>
                                                    
                                                    {each.attachedPhoto !== null ? <Image source={{ uri: `${Config.wasabi_url}/${each.attachedPhoto}` }} style={styles.commentImage} /> : null}
                                                </Body>
                                                <Right />
                                            </ListItem>
                                            <View style={styles.underlay}>
                                                <Text>2h ago</Text>
                                                <TouchableOpacity onPress={() => {}} style={styles.likeTouch}><Text style={{ fontWeight: "bold", color: "grey" }}>Like</Text></TouchableOpacity>
                                                <TouchableOpacity onPress={() => {
                                                    this.setState({
                                                        selectedComment: each,
                                                        additionalComment: `@${each.name} `,
                                                        selection: {
                                                            start: each.name.length + 2,
                                                            end: each.name.length + 2
                                                        }
                                                    }, () => {
                                                        this.RBSheetTagPerson.open();
                                                        
                                                        this.focusInputAddPerson();
                                                    })
                                                }} style={styles.likeTouch}><Text style={{ fontWeight: "bold", color: "grey", marginRight: 10 }}>Reply</Text></TouchableOpacity>
                                                <Image source={require("../../../../assets/icons/clapping.png")} style={{ maxWidth: 25, maxHeight: 25, minWidth: 25, minHeight: 25 }} />
                                            </View>
                                        </View>
                                        {typeof each.subComments !== "undefined" && each.subComments.length > 0 ? each.subComments.map((sub, indexxx) => {
                                            return (
                                                <TouchableOpacity onPress={() => {
                                                    this.setState({
                                                        selectedSubComment: {
                                                            sub, 
                                                            comment: each
                                                        }
                                                    }, () => {
                                                        this.ActionSheet.show();
                                                    })
                                                }} key={indexxx} style={{ flexDirection: "row", marginLeft: 60, alignSelf: 'flex-end' }}>
                                                {sub.type === "video" ? null : <Image source={{ uri: sub.profilePic }} style={{ borderRadius: 40, maxWidth: 45, maxHeight: 45, minWidth: 45, minHeight: 45, marginTop: 12, marginRight: 10 }} />}
                                                    <View style={[styles.comment, { maxWidth: width - 125, backgroundColor: "#ededed", borderRadius: 25, padding: 10, marginRight: 10 }]}>
                                                        <View style={{ marginTop: 3.5, flexDirection: "row" }}>
                                                            <View style={{ flexDirection: "row", marginTop: 7.5, width: "100%" }}>
                                                                <Text style={styles.replyName}>{sub.name}</Text>
                                                            </View>
                                                        </View>
                                                        <View style={{ marginTop: 10 }}>
                                                            <Highlighter 
                                                                onPressHighlightedText={(username) => {
                                                                    // this.redirectBasedOnUsername(username);

                                                                    console.log("username", username);
                                                                }}
                                                                highlightStyle={{backgroundColor: '#0057ff', color: "white", marginBottom: -2.5 }}
                                                                searchWords={[sub.taggedUser.otherUserName]}
                                                                textToHighlight={sub.comment}
                                                            />
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                            );
                                        }) : null}
                                    </Fragment>
                                );
                            }) : null}
                        </List>
                        </Fragment> : <Fragment>
                        <Card>
                            <CardItem>
                            <Left>
                                {this.renderPhotoOrVideo(post)}
                                <Body>
                                <Text><Text style={{ fontWeight: "bold" }}>{`${post.firstName} ${post.lastName}`}</Text>{post.taggedLocation === true ? ` is at ` : null} <TouchableOpacity style={{ }} onPress={() => {
                                    this.lookupCompany(post.taggedLocationData);
                                }}><Text style={{ fontWeight: "bold" }}>{post.taggedLocation === true ? post.taggedLocationData.poi.name : null}</Text></TouchableOpacity></Text>
                                <Text note>{post.date}</Text>
                                </Body>
                            </Left>
                            </CardItem>
                            <CardItem>
                            <Body style={{}}>
                                {typeof post.pictures !== "undefined" && post.pictures !== null ? <View style={{  }}>
                                    <View style={post.pictures !== null && typeof post.pictures !== "undefined" && post.pictures.length <= 2 ? styles.normallyBoxed : styles.normallyBoxedElse}>
                                        {[1, 3, 4].includes(post.pictures.length)  && this.renderOneLive(post.pictures)}
                                        {post.pictures.length >= 2 && post.pictures.length != 4 && this.renderTwoLive(post.pictures)}
                                        {post.pictures.length >= 4 && this.renderThreeLive(post.pictures)}
                                    </View>
                                </View> : null}
                                <ReadMore
                                numberOfLines={3}
                                renderTruncatedFooter={this._renderTruncatedFooter}
                                renderRevealedFooter={this._renderRevealedFooter}
                                onReady={this._handleTextReady}>
                                    {this.checkHighlight(post) ? <Highlighter 
                                        onPressHighlightedText={(username) => {
                                            this.redirectBasedOnUsername(username);
                                        }}
                                        highlightStyle={{backgroundColor: '#0057ff', color: "white" }}
                                        searchWords={post.taggedUsers}
                                        textToHighlight={post.text}
                                    /> : <Text style={styles.cardText}>
                                        {post.text}
                                    </Text>}
                                </ReadMore>
    
                                    {typeof post.taggedLocation !== 'undefined' && post.taggedLocation === true ? <MapView
                                        style={styles.mapCustom}
                                        region={{
                                            latitude: post.taggedLocationData.position.lat, 
                                            longitude: post.taggedLocationData.position.lon,
                                            latitudeDelta: 0.0922,
                                            longitudeDelta: 0.0421
                                        }}
                                    >
                                        <Marker
                                            key={1}
                                            coordinate={{ 
                                                latitude: post.taggedLocationData.position.lat, 
                                                longitude: post.taggedLocationData.position.lon 
                                            }}
                                            title={post.taggedLocationData.poi.name}
                                            description={post.taggedLocationData.address.freeformAddress}
                                        >
                                            <Image source={require("../../../../assets/icons/map-pin.png")} style={{ maxWidth: 30, maxHeight: 30 }} />
                                        </Marker>
                                    </MapView> : null}
                                    </Body>
                                        </CardItem>
                                        <CardItem>
                                            <View style={{ alignContent: "flex-start", flexDirection: "row", width: width * 0.65 }}>
                                                {this.renderEmojis(post)}
                                                <Text style={styles.likeCount}>{this.calculateLikeCount(post)}</Text>
                                            </View>
                                            <TouchableOpacity onPress={() => {
                                                this.setState({
                                                    selectedPost: post
                                                }, () => {
                                                    this.RBSheetCustom.open();
                                                })
                                            }} style={{ alignContent: "flex-end", width: width * 0.35 }}>
                                                <Text style={{ textAlign: "right", marginRight: 30 }}>5 Comments</Text>
                                            </TouchableOpacity>
                                        </CardItem>
                                        <CardItem style={{ width: width, marginLeft: -20 }}>
                                            <Body>
                                            <Footer style={{ width: width }}>
                                                <FooterTab style={{ width: width }}>
                                                    {post.peopleReactedIDs.includes(this.props.unique_id) ? <Popover  
                                                        onRequestClose={() => {
                                                            this.setState({
                                                                visible: false
                                                            })
                                                        }}
                                                        isVisible={this.statevisible}  
                                                        placement={"top"}
                                                        from={(
                                                            <Button onPress={() => {
                                                                this.setState({
                                                                    visible: true
                                                                })
                                                            }} style={{ flexDirection: "column", width: width * 0.33333333333, backgroundColor: "#ffffff" }}>
                                                                <Image source={require("../../../../assets/icons/like.png")} style={{ maxWidth: 20, maxHeight: 20, tintColor: "#303030" }} />
                                                                <Text style={{ color: "#303030", fontWeight: "bold" }}>Un-Like</Text>
                                                            </Button>
                                                        )}>
                                                        <View style={styles.popoverTwo}>
                                                            <View style={{ paddingTop: 5, width: "100%" }}>
                                                                <AwesomeButtonBlue backgroundColor={"blue"} textColor={"white"} type={"secondary"} onPress={() => {
                                                                this.setState({
                                                                    visible: visible                                                            }, () => {
                                                                    this.removeLikeResponse(post);
                                                                })
                                                            }} stretch={true}>Remove/Revoke Response</AwesomeButtonBlue>
                                                            </View>
                                                        </View>
                                                    </Popover> : <Popover  
                                                        onRequestClose={() => {
                                                            this.setState({
                                                                visible: false
                                                            })
                                                        }}
                                                        isVisible={this.statevisible}  
                                                        placement={"top"}
                                                        from={(
                                                            <Button onPress={() => {
                                                                this.setState({
                                                                    visible: true
                                                                })
                                                            }} style={{ flexDirection: "column", width: width * 0.33333333333, backgroundColor: "#303030" }}>
                                                                <Image source={require("../../../../assets/icons/like.png")} style={{ maxWidth: 20, maxHeight: 20, tintColor: "#ffffff" }} />
                                                                <Text style={{ color: "#ffffff" }}>Like</Text>
                                                            </Button>
                                                        )}>
                                                        <View style={styles.popoverTwo}>
                                                            <TouchableOpacity onPress={() => {
                                                                this.setState({
                                                                    visible,
                                                                    like: "screaming"
                                                                }, () => {
                                                                    this.likeReactPost(post);
                                                                })
                                                            }} style={styles.lottiContainer}>
                                                                <LottieView source={require('../../../../assets/animations/screaming.json')} autoPlay loop style={{ width: 50, maxWidth: 50, height: 65 }} />
                                                            </TouchableOpacity>
                                                            <TouchableOpacity onPress={() => {
                                                                this.setState({
                                                                    visible,
                                                                    like: "exploding"
                                                                }, () => {
                                                                    this.likeReactPost(post);
                                                                })
                                                            }} style={styles.lottiContainer}>
                                                                <LottieView source={require('../../../../assets/animations/exploding.json')} autoPlay loop style={{ width: 50, maxWidth: 50, height: 65 }} />
                                                            </TouchableOpacity>
                                                            <TouchableOpacity onPress={() => {
                                                                this.setState({
                                                                    visible,
                                                                    like: "tearsOfJoy"
                                                                }, () => {
                                                                    this.likeReactPost(post);
                                                                })
                                                            }} style={styles.lottiContainer}>
                                                                <LottieView source={require('../../../../assets/animations/tears-of-joy.json')} autoPlay loop style={{ width: 80, maxWidth: 80, height: 65 }} />
                                                            </TouchableOpacity>
                                                            <TouchableOpacity onPress={() => {
                                                                this.setState({
                                                                    visible,
                                                                    like: "clapping"
                                                                }, () => {
                                                                    this.likeReactPost(post);
                                                                })
                                                            }} style={styles.lottiContainer}>
                                                                <LottieView source={require('../../../../assets/animations/clapping.json')} autoPlay loop style={{ width: 50, maxWidth: 50, height: 65 }} />
                                                            </TouchableOpacity>
                                                            <TouchableOpacity onPress={() => {
                                                                this.setState({
                                                                    visible,
                                                                    like: "angry"
                                                                }, () => {
                                                                    this.likeReactPost(post);
                                                                })
                                                            }} style={styles.lottiContainer}>
                                                                <LottieView source={require('../../../../assets/animations/angry.json')} autoPlay loop style={{ width: 50, maxWidth: 50, height: 65 }} />
                                                            </TouchableOpacity>
                                                            <TouchableOpacity onPress={() => {
                                                                this.setState({
                                                                    visible,
                                                                    like: "heart"
                                                                }, () => {
                                                                    this.likeReactPost(post);
                                                                })
                                                            }} style={styles.lottiContainer}>
                                                                <LottieView source={require('../../../../assets/animations/love.json')} autoPlay loop style={{ width: 50, maxWidth: 50, height: 65 }} />
                                                            </TouchableOpacity>
                                                            <TouchableOpacity onPress={() => {
                                                                this.setState({
                                                                    visible,
                                                                    like: "wow"
                                                                }, () => {
                                                                    this.likeReactPost(post);
                                                                })
                                                            }} style={styles.lottiContainer}>
                                                                <LottieView source={require('../../../../assets/animations/wow.json')} autoPlay loop style={{ width: 50, maxWidth: 50, height: 65 }} />
                                                            </TouchableOpacity>
                                                        </View>
                                                    </Popover>}
                                                    
                                                    <Button onPress={() => {
                                                        this.openComment();
                                                    }} style={{ flexDirection: "column", width: width * 0.33333333333, backgroundColor: "#303030" }}>
                                                        <Image source={require("../../../../assets/icons/add-comment.png")} style={{ maxWidth: 20, maxHeight: 20, tintColor: "#ffffff" }} />
                                                        <Text style={{ color: "#ffffff" }}>Comment</Text>
                                                    </Button>
                                                   
                                                </FooterTab>
                                            </Footer>
                                            </Body>
                                        </CardItem>
                                    </Card>
                                    <View style={styles.thickLine} />
                                    <List>
                                    {typeof comments !== "undefined" && comments.length > 0 ? comments.map((each, index) => {
                                        console.log("comment two", each);
                                        return (
                                            <Fragment>
                                                <View key={index} style={styles.comment}>
                                                    <ListItem button={true} onPress={() => {

                                                        this.setState({
                                                            selectedSubComment: {
                                                                sub: null, 
                                                                comment: each
                                                            },
                                                            selectedComment: each,
                                                            additionalComment: `@${each.name} `
                                                        }, () => {
                                                            this.ActionSheetTwo.show();
                                                        })
                                                    }} avatar>
                                                        <Left>
                                                            {each.type === "video" ? null : <Thumbnail style={styles.thumbnailImage} source={{ uri: each.profilePic }} />}
                                                        </Left>
                                                        <Body style={styles.bodyBody}>
                                                            <Text style={{ fontWeight: "bold" }}>{each.name}</Text>
                                                            <Text note>{each.comment}</Text>
                                                            
                                                            {_.has(each, "attachedPhoto") && each.attachedPhoto !== null ? <Image source={{ uri: `${Config.wasabi_url}/${each.attachedPhoto}` }} style={styles.commentImage} /> : null}
                                                        </Body>
                                                        <Right />
                                                    </ListItem>
                                                    <View style={styles.underlay}>
                                                        <Text>2h ago</Text>
                                                        <TouchableOpacity onPress={() => {}} style={styles.likeTouch}><Text style={{ fontWeight: "bold", color: "grey" }}>Like</Text></TouchableOpacity>
                                                        <TouchableOpacity onPress={() => {
                                                            this.setState({
                                                                selectedComment: each,
                                                                additionalComment: `@${each.name} `,
                                                                selection: {
                                                                    start: each.name.length + 2,
                                                                    end: each.name.length + 2
                                                                }
                                                            }, () => {
                                                                this.RBSheetTagPerson.open();
                                                                
                                                                this.focusInputAddPerson();
                                                            })
                                                        }} style={styles.likeTouch}><Text style={{ fontWeight: "bold", color: "grey", marginRight: 10 }}>Reply</Text></TouchableOpacity>
                                                        <Image source={require("../../../../assets/icons/clapping.png")} style={{ maxWidth: 25, maxHeight: 25, minWidth: 25, minHeight: 25 }} />
                                                    </View>
                                                </View>
                                                {typeof each.subComments !== "undefined" && each.subComments.length > 0 ? each.subComments.map((sub, indexxx) => {
                                                    return (
                                                        <TouchableOpacity onPress={() => {
                                                            this.setState({
                                                                selectedSubComment: {
                                                                    sub, 
                                                                    comment: each
                                                                }
                                                            }, () => {
                                                                this.ActionSheet.show();
                                                            })
                                                        }} key={indexxx} style={{ flexDirection: "row", marginLeft: 60, alignSelf: 'flex-end' }}>
                                                        {sub.type === "video" ? null : <Image source={{ uri: sub.profilePic }} style={{ borderRadius: 40, maxWidth: 45, maxHeight: 45, minWidth: 45, minHeight: 45, marginTop: 12, marginRight: 10 }} />}
                                                            <View style={[styles.comment, { maxWidth: width - 125, backgroundColor: "#ededed", borderRadius: 25, padding: 10, marginRight: 10 }]}>
                                                                <View style={{ marginTop: 3.5, flexDirection: "row" }}>
                                                                    <View style={{ flexDirection: "row", marginTop: 7.5, width: "100%" }}>
                                                                        <Text style={styles.replyName}>{sub.name}</Text>
                                                                    </View>
                                                                </View>
                                                                <View style={{ marginTop: 10 }}>
                                                                    <Highlighter 
                                                                        onPressHighlightedText={(username) => {
                                                                            // this.redirectBasedOnUsername(username);

                                                                            console.log("username", username);
                                                                        }}
                                                                        highlightStyle={{backgroundColor: '#0057ff', color: "white", marginBottom: -2.5 }}
                                                                        searchWords={[sub.taggedUser.otherUserName]}
                                                                        textToHighlight={sub.comment}
                                                                    />
                                                                </View>
                                                            </View>
                                                        </TouchableOpacity>
                                                    );
                                                }) : null}
                                            </Fragment>
                                        );
                                    }) : null}
                                    </List>
                        </Fragment>}
                    </Fragment>
                );
            }
        }
    }
    sendComment = () => {
        const { comment, post, picture, base64 } = this.state;

        if (picture !== null) {
            this.setState({
                spinnerLoading: true
            }, () => {
                axios.post(`${Config.ngrok_url}/post/comment/wall/posting/sub`, {
                    comment,
                    id: this.props.unique_id,
                    post,
                    picture,
                    base64
                }).then((res) => {
                    if (res.data.message === "Posted comment!") {
                        console.log(res.data);
        
                        const { picture, comment, message } = res.data;
        
                        if (picture !== null) {
        
                            comment.attachedPhoto = `${Config.wasabi_url}/${picture}`;
        
                            this.setState({
                                comment: "",
                                comments: [...this.state.comments, comment],
                                spinnerLoading: false
                            }, () => {
                                Keyboard.dismiss();
            
                                this.RBSheet.close();
                            })
                        } else {
                            this.setState({
                                comment: "",
                                comments: [...this.state.comments, comment],
                                spinnerLoading: false
                            }, () => {
                                Keyboard.dismiss();
            
                                this.RBSheet.close();
                            })
                        }
                    } else {
                        console.log("Err", res.data);

                        this.setState({
                            spinnerLoading: false
                        })
                    }
                }).catch((err) => {
                    console.log(err);

                    this.setState({
                        spinnerLoading: false
                    })
                })
            })
        } else {
            axios.post(`${Config.ngrok_url}/post/comment/wall/posting/sub`, {
                comment,
                id: this.props.unique_id,
                post,
                picture,
                base64
            }).then((res) => {
                if (res.data.message === "Posted comment!") {
                    console.log(res.data);
    
                    const { picture, comment, message } = res.data;
    
                    if (picture !== null) {
    
                        comment.attachedPhoto = `${Config.wasabi_url}/${picture}`;
    
                        this.setState({
                            comment: "",
                            comments: [...this.state.comments, comment]
                        }, () => {
                            Keyboard.dismiss();
        
                            this.RBSheet.close();
                        })
                    } else {
                        this.setState({
                            comment: "",
                            comments: [...this.state.comments, comment]
                        }, () => {
                            Keyboard.dismiss();
        
                            this.RBSheet.close();
                        })
                    }
                } else {
                    console.log("Err", res.data);
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    }
    redirectBasedOnUsername = (username) => {

        console.log("clicked", username);

        axios.get(`${Config.ngrok_url}/locate/unique_id/by/username`, {
            params: {
                username
            }
        }).then((res) => {
            if (res.data.message === "Found user unique id!") {
                const { unique_id } = res.data;

                this.props.props.navigation.push("individual-profile-public", { item: { unique_id }})
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    updateSize = (height) => {
        this.setState({
            height
        });
    }
    updateSizePerson = (height) => {
        this.setState({
            height
        });
    }
    pictureSelectedCallback = (data) => {
        console.log("Data", data);

        this.setState({
            picture: data,
            base64: data.base64
        })
    }
    handlePictureSelection = () => {
        const options = {
            mediaType: "photo",
            quality: 1,
            includeBase64: true,
            selectionLimit: 1
        };
        launchImageLibrary(options, this.pictureSelectedCallback)
    }
    sendCommentSubReply = (selected) => {
        console.log("sendCommentSubReply clicked...");

        const { additionalComment, post, picture, base64, selectedComment } = this.state;

        if (picture !== null) {
            this.setState({
                spinnerLoading: true
            }, () => {
                axios.post(`${Config.ngrok_url}/post/comment/wall/posting/sub/reply/sub`, {
                    comment: additionalComment,
                    id: this.props.unique_id,
                    post,
                    picture,
                    base64,
                    commentID: selected.id,
                    otherUserName: selected.name,
                    selectedComment: selected.poster
                }).then((res) => {
                    if (res.data.message === "Posted comment!") {
                        console.log(res.data);
        
                        const { picture, comment, message } = res.data;
        
                        if (picture !== null) {
        
                            comment.attachedPhoto = `${Config.wasabi_url}/${picture}`;

                            for (let index = 0; index < this.state.comments.length; index++) {
                                const existingComment = this.state.comments[index];
                                // check if match
                                if (existingComment.id === selectedComment.id) {
                                    existingComment.subComments.push(comment);
                                }
                            }

                            this.setState({
                                additionalComment: "",
                                comments: [...this.state.comments],
                                spinnerLoading: false
                            }, () => {
                                Keyboard.dismiss();
            
                                this.RBSheetTagPerson.close();
                            })
                        } else {
                            for (let index = 0; index < this.state.comments.length; index++) {
                                const existingComment = this.state.comments[index];
                                // check if match
                                if (existingComment.id === selectedComment.id) {
                                    existingComment.subComments.push(comment);
                                }
                            }

                            this.setState({
                                additionalComment: "",
                                comments: [...this.state.comments],
                                spinnerLoading: false
                            }, () => {
                                Keyboard.dismiss();
            
                                this.RBSheetTagPerson.close();
                            })
                        }
                    } else {
                        console.log("Err", res.data);

                        this.setState({
                            spinnerLoading: false
                        })
                    }
                }).catch((err) => {
                    console.log(err);

                    this.setState({
                        spinnerLoading: false
                    })
                })
            })
        } else {
            axios.post(`${Config.ngrok_url}/post/comment/wall/posting/sub/reply/sub`, {
                comment: additionalComment,
                id: this.props.unique_id,
                post,
                picture,
                base64,
                commentID: selected.id,
                otherUserName: selected.name,
                selectedComment: selected.poster
            }).then((res) => {
                if (res.data.message === "Posted comment!") {
                    console.log(res.data);
    
                    const { picture, comment, message } = res.data;
    
                    if (picture !== null) {
    
                        comment.attachedPhoto = `${Config.wasabi_url}/${picture}`;

                        for (let index = 0; index < this.state.comments.length; index++) {
                            const existingComment = this.state.comments[index];
                            // check if match
                            if (existingComment.id === selectedComment.id) {
                                existingComment.subComments.push(comment);
                            }
                        }

                        this.setState({
                            additionalComment: "",
                            comments: [...this.state.comments]
                        }, () => {
                            Keyboard.dismiss();
        
                            this.RBSheetTagPerson.close();
                        })
                    } else {

                        for (let index = 0; index < this.state.comments.length; index++) {
                            const existingComment = this.state.comments[index];
                            // check if match
                            if (existingComment.id === selectedComment.id) {
                                existingComment.subComments.push(comment);
                            }
                        }

                        this.setState({
                            additionalComment: "",
                            comments: [...this.state.comments]
                        }, () => {
                            Keyboard.dismiss();
        
                            this.RBSheetTagPerson.close();
                        })
                    }
                } else {
                    console.log("Err", res.data);
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    }
    handleSelectionChange = ({ nativeEvent: { selection } }) => {
        this.setState({ selection })
    };
    deleteCommentMainComment = (sub, comment) => {
        console.log("deleteCommentMainComment", sub, comment);

        const passedPost = this.props.props.route.params.post;

        axios.put(`${Config.ngrok_url}/delete/main/comment/own`, {
            id: this.props.unique_id,
            subComment: sub,
            comment,
            postID: passedPost.id
        }).then((res) => {
            console.log(res.data);
            if (res.data.message === "Deleted main-comment!") {

                const comments = this.state.comments.filter((item, index) => {
                    if (item.id !== comment.id) {
                        return item;
                    }
                });

                this.setState({
                    comments
                }, () => {
                    this.ActionSheetTwo.hide();
                })
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    render() {
        console.log("IndividualWallPostingHelper", this.props.props, this.state);

        const { base64, picture, selectedSubComment } = this.state;

        const passedPost = this.props.props.route.params.post;

        const options = [
            // <TouchableOpacity style={styles.touchableAction} onPress={() => {
            //     console.log("clicked one");

            //     this.ActionSheet.hide();

            //     setTimeout(() => {
            //         this.RBSheetTagPerson.open();

            //         this.focusInputAddPerson();
            //     }, 1500)
            // }}><Text style={{color: '#0057ff'}}>Reply</Text></TouchableOpacity>,
            <TouchableOpacity style={styles.touchableAction} onPress={() => {
                console.log("clicked two.");

                Clipboard.setString(selectedSubComment.sub.comment);

                this.ActionSheet.hide();
            }}><Text style={{color: '#0057ff'}}>Copy</Text></TouchableOpacity>, 
            <TouchableOpacity style={styles.touchableAction} onPress={() => {
                console.log("clicked three.");

                this.deleteComment(selectedSubComment.sub, selectedSubComment.comment);
            }}><Text style={{color: 'red'}}>Delete</Text></TouchableOpacity>,
            <TouchableOpacity style={styles.touchableAction} onPress={() => {
                console.log("clicked four");

                this.ActionSheet.hide();
            }}><Text style={{color: '#0057ff'}}>Cancel</Text></TouchableOpacity>
        ]
        const optionsTwo = [
            <TouchableOpacity style={styles.touchableAction} onPress={() => {
                console.log("clicked one");

                this.ActionSheetTwo.hide();

                setTimeout(() => {
                    this.RBSheetTagPerson.open();

                    this.focusInputWithKeyboard();
                }, 1500)
            }}><Text style={{color: '#0057ff'}}>Reply</Text></TouchableOpacity>,
            <TouchableOpacity style={styles.touchableAction} onPress={() => {
                console.log("clicked two.");

                Clipboard.setString(selectedSubComment.comment.comment);

                this.ActionSheetTwo.hide();
            }}><Text style={{color: '#0057ff'}}>Copy</Text></TouchableOpacity>, 
            <TouchableOpacity style={styles.touchableAction} onPress={() => {
                console.log("clicked three.");

                this.deleteCommentMainComment(selectedSubComment.sub, selectedSubComment.comment);
            }}><Text style={{color: 'red'}}>Delete</Text></TouchableOpacity>,
            <TouchableOpacity style={styles.touchableAction} onPress={() => {
                console.log("clicked four");

                this.ActionSheetTwo.hide();
            }}><Text style={{color: '#0057ff'}}>Cancel</Text></TouchableOpacity>
        ]
        return (
            <Fragment>
                <Header style={styles.header}>
                    <Left style={{ flexDirection: "row" }}>
                        <Button onPress={() => {
                            this.props.props.navigation.goBack();
                        }} transparent>
                            <Icon style={{ color: "#ffffff" }} name='arrow-back' />
                        </Button>
                        {this.renderPhotoOrVideo(_.has(passedPost, "newData") ? passedPost.newData : passedPost)}
                    </Left>
                    <Body style={Platform.OS === "android" ? { marginLeft: 60 } : {}}>
                        <Title style={{ color: "#ffffff" }}>{passedPost.firstName} {passedPost.lastName}</Title>
                        <Subtitle style={{ color: "#ffffff" }}>Posted by {passedPost.username}</Subtitle>
                    </Body>
                    <Right>
                        <Button onPress={() => {
                            this.RBSheetTwo.open();
                        }} style={styles.animationContainerHeader} transparent>
                            <LottieView style={styles.maxedAnimationBoxHeader} source={require('../../../../assets/animations/dots-loading-box.json')} autoPlay loop />
                        </Button>
                    </Right>
                </Header>
                <Spinner
                    visible={this.state.spinnerLoading}
                    textContent={'Uploading your content...'}
                    overlayColor={"rgba(0, 0, 0, 0.75)"}
                    textStyle={{ color: "#ffffff", fontWeight: "bold" }}
                />
                <ScrollView keyboardShouldPersistTaps='always' contentContainerStyle={{ paddingBottom: 100 }} style={styles.container}>
                    {this.renderContent()}
                </ScrollView>
                <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    closeOnDragDown={true}
                    height={this.state.rbsheetHeight}
                    openDuration={250}
                    customStyles={{
                        container: {
                           borderTopRightRadius: 30,
                           borderTopLeftRadius: 30,
                           height: "35%"
                        },
                        draggableIcon: {
                            backgroundColor: "grey",
                            width: 250
                        }
                    }}
                    >
                    <View style={{ margin: 15 }}>
                        {base64 !== null ? <View style={{ minWidth: 100, minHeight: 100 }}><Image style={styles.selectedImage} source={{ uri: picture.uri }} /><TouchableOpacity onPress={() => {
                            this.setState({
                                picture: null,
                                base64: null
                            })
                        }} style={styles.touchable}>
                            <Image style={{ maxWidth: 35, maxHeight: 35 }} source={require("../../../../assets/icons/close-window.png")} />
                        </TouchableOpacity></View> : null}
                        <View style={styles.inputBox}>
                            <TouchableOpacity onPress={this.handlePictureSelection} style={styles.pictureTouch}>
                                <Image source={require("../../../../assets/icons/camera-custom.png")} style={styles.touchImage} />
                            </TouchableOpacity>
                            <TextInput
                                onChangeText={(comment) => {
                                    this.setState({
                                        comment
                                    })
                                }} 
                                style={{ height: 50, minHeight: 50, width: "78%", top: 0 }}
                                editable
                                multiline
                                value={this.state.comment}
                                placeholder={"Write a comment..."}
                                ref={this.myTextInput}
                                onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
                            />
                            {typeof this.state.comment !== "undefined" && this.state.comment.length > 0 ? <TouchableOpacity onPress={() => {
                                this.sendComment();
                            }} style={styles.pictureTouchTwo}>
                                <Image source={require("../../../../assets/icons/email-send.png")} style={styles.sendImage} />
                            </TouchableOpacity> : null}
                        </View>
                    </View>
                </RBSheet>
                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    title={'What would you like to do?'}
                    options={options}
                />
                <ActionSheet
                    ref={o => this.ActionSheetTwo = o}
                    title={'What would you like to do?'}
                    options={optionsTwo}
                />
                <RBSheet
                    height={this.state.rbsheetHeight}
                    ref={ref => {
                        this.RBSheetTagPerson = ref;
                    }}
                    closeOnDragDown={true}
                    openDuration={250}
                    customStyles={{
                        container: {
                           borderTopRightRadius: 30,
                           borderTopLeftRadius: 30,
                           height: "35%"
                        },
                        draggableIcon: {
                            backgroundColor: "grey",
                            width: 250
                        }
                    }}
                    >
                    <View style={{ margin: 15 }}>
                        {base64 !== null ? <View style={{ minWidth: 100, minHeight: 100 }}><Image style={styles.selectedImage} source={{ uri: picture.uri }} /><TouchableOpacity onPress={() => {
                            this.setState({
                                picture: null,
                                base64: null
                            })
                        }} style={styles.touchable}>
                            <Image style={{ maxWidth: 35, maxHeight: 35 }} source={require("../../../../assets/icons/close-window.png")} />
                        </TouchableOpacity></View> : null}
                        <View style={styles.inputBox}>
                            <TouchableOpacity onPress={this.handlePictureSelection} style={styles.pictureTouch}>
                                <Image source={require("../../../../assets/icons/camera-custom.png")} style={styles.touchImage} />
                            </TouchableOpacity>
                            <TextInput  
                                onChangeText={(comment) => {
                                    this.setState({
                                        additionalComment: comment
                                    })
                                }} 
                                onSelectionChange={this.handleSelectionChange}
                                selection={this.state.selection}
                                style={{ height: 50, minHeight: 50, width: "78%", top: 0 }}
                                multiline={true}
                                value={this.state.additionalComment}
                                placeholder={"Write a comment..."}
                                ref={this.myTextInputPersonAdd}
                                onContentSizeChange={(e) => this.updateSizePerson(e.nativeEvent.contentSize.height)}
                            />
                            {typeof this.state.additionalComment !== "undefined" && this.state.additionalComment.length > 0 ? <TouchableOpacity onPress={() => {
                                this.sendCommentSubReply(this.state.selectedComment);
                            }} style={styles.pictureTouchTwo}>
                                <Image source={require("../../../../assets/icons/email-send.png")} style={styles.sendImage} />
                            </TouchableOpacity> : null}
                        </View>
                    </View>
                </RBSheet>
                <RBSheet
                    ref={ref => {
                        this.RBSheetTwo = ref;
                    }}
                    closeOnDragDown={true}
                    openDuration={250}
                    customStyles={{
                        container: {
                           borderTopRightRadius: 30,
                           borderTopLeftRadius: 30
                        },
                        draggableIcon: {
                            backgroundColor: "grey",
                            width: 250
                        }
                    }}
                    >
                    <SheetInnerOptions props={this.props} />
                </RBSheet>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.signupData.authData.unique_id
    };
}
export default connect(mapStateToProps, { })(IndividualWallPostingHelper);