import React, { Component, Fragment } from 'react'
import { View, Text, Image, TouchableOpacity, ImageBackground, Dimensions, ScrollView, FlatList, Platform } from 'react-native';
import { Header, Left, Body, Right, Title, Subtitle, Button, Item, Input, Textarea, Card, CardItem, Thumbnail, List, ListItem, FooterTab, Footer } from 'native-base';
import styles from './styles.js';
import AwesomeButtonCartman from 'react-native-really-awesome-button/src/themes/cartman';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import Config from 'react-native-config';
import axios from "axios";
import _ from "lodash";
import Video from 'react-native-video';
import RBSheet from "react-native-raw-bottom-sheet";
import { CometChat } from "@cometchat-pro/react-native-chat";
import { connect } from "react-redux";
import moment from 'moment';
import ReadMore from 'react-native-read-more-text';
import SlidingUpPanel from 'rn-sliding-up-panel';
import RenderSlideUpPane from "./helpers/slideUpPaneEmployment.js";
import Carousel from 'react-native-snap-carousel';
import SharedItemPostHelper from "../../homepage/main/helpers/posts/sharedPost.js";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Dialog from "react-native-dialog";
import ProgressiveImage from "../../lazyLoadImage.js";
import Popover from 'react-native-popover-view';
import LottieView from 'lottie-react-native';
import InView from 'react-native-component-inview';
import Highlighter from 'react-native-highlight-words';
import MapView, { Marker } from 'react-native-maps';


const { width, height } = Dimensions.get("window");


class PublicProfileOtherUserHelper extends Component {
constructor (props) {
    super(props);

    this.state = {
        user: null,
        coverPhoto: "",
        profilePic: "",
        allImages: [],
        index: 0,
        postLoaded: false,
        countFrom: 5,
        selectedImage: null,
        ready: false,
        posts: [],
        subject: "",
        selected: null,
        alreadyFriends: false
    }
}
    likeSharedPostRespond = (post) => {

        console.log("post :)", post);

        axios.post(`${Config.ngrok_url}/like/react/post/wall/shared/posting`, {
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
                        selectedPost: post,
                        posts: copy
                    })
                }
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    renderProfilePictureVideo = () => {
        const { profilePic, user } = this.state;

        if (profilePic !== null) {
            if (profilePic.type !== "video") {
                console.log("first chunk ran");
                return (
                    <Fragment>
                        {this.renderPicture()}
                    </Fragment>
                );
            } else {
                console.log(`${Config.wasabi_url}/${profilePic.picture}`);
                return (
                    <Fragment>
                        <Video  
                            resizeMode="cover"
                            repeat
                            source={{uri: `${Config.wasabi_url}/${profilePic.picture}` }}   // Can be a URL or a local file.
                            autoplay={true}
                            ref={(ref) => {
                                this.player = ref
                            }}
                            muted={true}
                            style={[styles.avatar, { top: -135 }]}
                        />
                    </Fragment>
                );
            }
        } else {
            return (
                <Fragment>
                    {this.renderPicture()}
                </Fragment>
            );
        }
    }
    loadMoreContentForWall = (info) => {
        console.log("info: ", info);
    }
    renderPicture = () => {
        const { profilePic, user } = this.state;

        if (user !== null && profilePic !== null) {
            return <Image style={[styles.avatar, { top: -135 }]} source={{ uri: `${Config.wasabi_url}/${profilePic.picture}` }}/>;
        } else if (_.has(user, "photo")) {
            return <Image style={[styles.avatar, { top: -135 }]} source={{ uri: user.photo }}/>;
        } else {
            return <Image style={[styles.avatar, { top: -135 }]} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }}/>;
        }
    }
    renderPictureCustom = () => {
        const { profilePic, user } = this.state;

        if (user !== null && profilePic !== null) {
            return <Image style={styles.avatarCustom} source={{ uri: `${Config.wasabi_url}/${profilePic.picture}` }}/>;
        } else if (_.has(user, "photo")) {
            return <Image style={styles.avatarCustom} source={{ uri: user.photo }}/>;
        } else {
            return <Image style={styles.avatarCustom} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }}/>;
        }
    }
    renderProfilePictureVideoCustom = () => {
        const { profilePic, user } = this.state;

        if (profilePic !== null) {
            if (profilePic.type !== "video") {
                console.log("first chunk ran");
                return (
                    <Fragment>
                        {this.renderPictureCustom()}
                    </Fragment>
                );
            } else {
                console.log(`${Config.wasabi_url}/${profilePic.picture}`);
                return (
                    <Fragment>
                        <Video  
                            resizeMode="cover"
                            repeat
                            source={{uri: `${Config.wasabi_url}/${profilePic.picture}` }}   // Can be a URL or a local file.
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
        } else {
            return (
                <Fragment>
                    {this.renderPictureCustom()}
                </Fragment>
            );
        }
    }
    renderPictureCustom = () => {
        const { profilePic, user } = this.state;

        if (user !== null && profilePic !== null) {
            return <Image style={styles.avatarCustom} source={{ uri: `${Config.wasabi_url}/${profilePic.picture}` }}/>;
        } else if (_.has(user, "photo")) {
            return <Image style={styles.avatarCustom} source={{ uri: user.photo }}/>;
        } else {
            return <Image style={styles.avatarCustom} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }}/>;
        }
    }
    renderImage = () => {
        const { coverPhoto } = this.state;

        if (typeof coverPhoto !== "undefined" && coverPhoto.length > 0) {
            return { uri: coverPhoto };
        } else {
            return require("../../../assets/images/cover.jpg");
        }
    }
    componentDidMount() {
        const url = `${Config.ngrok_url}/gather/user/wall/posts/individual`;

        const passed = this.props.props.route.params.item;
        
        axios.get(url, {
            params: {
                id: passed.unique_id
            }
        }).then((res) => {
            console.log(res.data);

            const { user, posts } = res.data;

            const promiseee = new Promise((resolve, reject) => {
                if (typeof user.activeJobs !== "undefined" && user.activeJobs.length > 0) {
                    for (let index = 0; index < user.activeJobs.length; index++) {
                        const job = user.activeJobs[index];
                        
                        axios.get(`${Config.ngrok_url}/gather/job`, {
                            params: {
                                id: job
                            }
                        }).then((res) => {
                            if (res.data.message === "Found job!") {
                                const { job } = res.data
    
                                if (user.currentActiveJobs) {
                                    user.currentActiveJobs.push(job)
                                } else {
                                    user["currentActiveJobs"] = [job];
                                }
    
                                if ((user.activeJobs.length - 1) === index) {
                                    resolve(user);
                                }
                            } else {
                                console.log("Err:", res.data);
    
                                if ((user.activeJobs.length - 1) === index) {
                                    resolve(user);
                                }
                            }
                        }).catch((err) => {
                            console.log(err);
    
                            if ((user.activeJobs.length - 1) === index) {
                                resolve(user);
                            }
                        })
                    }
                } else {
                    resolve(user);
                }
            })

            promiseee.then((user) => {
                if (user.coverPhotos) {
                    this.setState({
                        user,
                        posts,
                        postLoaded: true,
                        coverPhoto: `${Config.wasabi_url}/${user.coverPhotos[user.coverPhotos.length - 1].picture}`,
                        ready: true,
                        profilePic: _.has(user, "profilePics") && user.profilePics.length > 0 ? user.profilePics[user.profilePics.length - 1] : null
                    })
                } else {
                    this.setState({
                        user,
                        posts,
                        postLoaded: true,
                        ready: true,
                        profilePic: _.has(user, "profilePics") && user.profilePics.length > 0 ? user.profilePics[user.profilePics.length - 1] : null
                    })
                }
            })
        }).catch((err) => {
            console.log(err);
        });

        axios.get(`${Config.ngrok_url}/gather/user`, {
            params: {
                id: this.props.unique_id
            }
        }).then((res) => {

            const { user } = res.data;

            if (typeof user.sentFriendRequests !== "undefined" && user.sentFriendRequests.length > 0) {
                for (let index = 0; index < user.sentFriendRequests.length; index++) {
                    const friend = user.sentFriendRequests[index];
                    
                    if (friend.otherUser === passed.unique_id) {
                        this.setState({
                            alreadyFriends: true
                        })
                    }
                }
            }
            if (typeof user.acceptedFriendRequests !== "undefined" && user.acceptedFriendRequests.length > 0) {
                for (let index = 0; index < user.acceptedFriendRequests.length; index++) {
                    const friend = user.acceptedFriendRequests[index];
                    
                    if (friend.acquaintanceID === passed.unique_id) {
                        this.setState({
                            alreadyFriends: true
                        })
                    }
                }
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    sendPrivateMessage = () => {
        const { subject, message, user } = this.state;

        const receiverID = user.unique_id;
        const messageText = message;
        const receiverType = CometChat.RECEIVER_TYPE.USER;
        const textMessage = new CometChat.TextMessage(
            receiverID,
            messageText,
            receiverType
        );

        CometChat.sendMessage(textMessage).then(messageeee => {
                console.log("Message sent successfully:", messageeee);

                axios.post(`${Config.ngrok_url}/start/conversation/save`, {
                    other_user: user.unique_id,
                    user: this.props.unique_id,
                    message,
                    subject,
                    fullName: this.props.fullName
                }).then((res) => {
                    if (res.data.message === "Sent notification and message!") {
                        console.log(res.data);
        
                        this.setState({
                            message: "",
                            subject: ""
                        }, () => {
                            this.RBSheet.close();
                        })
                    } else {
                        console.log("Err", res.data);
                    }
                }).catch((err) => {
                    console.log(err);
                })
            }, error => {
                console.log("Message sending failed with error:", error);
            }
        );
    }
    handlePressMore = (history) => {
        this.setState({
            selected: history
        }, () => {
            console.log("clicked", history, this.state);
            
            setTimeout(() => {
                this._panel.show();
            }, 650)
        })
    }
    sendFriendRequest = () => {
        console.log("sendFriendRequest clicked");

        const { user } = this.state;

        axios.post(`${Config.ngrok_url}/send/friend/request`, {
            requesteeId: this.props.unique_id,
            requesteeFullName: this.props.fullName,
            otherUserId: user.unique_id,
            username: this.props.username
        }).then((res) => {
            if (res.data.message === "Sent friend request!") {
                console.log(res.data);
                
                this.setState({
                    alreadyFriends: true
                })
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    handlePlaying = (isVisible, index) => {
        console.log("isvisible", isVisible);
        if (this.state[`playing-${index}`] !== true) {
            console.log("SETSTATE");
            this.setState({
                [`playing-${index}`]: true
            })
        }
    }
    errored = (err) => {
        console.log("err", err);
    }
    renderPhotoOrVideo = (post, maxDimension) => {
        if (post.profilePics !== null && typeof post.profilePics !== 'undefined' && post.profilePics.length > 0) {
            if (post.profilePics[post.profilePics.length - 1].type === "video") {
                const picture = post.profilePics[post.profilePics.length - 1].picture;
                return (
                    <TouchableOpacity onPress={() => {
                        this.redirectToUsersProfileWithoutPane(post);
                    }}>
                        <Video  
                            resizeMode="cover"
                            repeat
                            source={{ uri: `${Config.wasabi_url}/${picture}` }}   // Can be a URL or a local file.
                            autoplay={true}
                            ref={(ref) => {
                                this.player = ref
                            }}
                            muted={true}
                            style={{ minWidth: 50, maxWidth: typeof maxDimension !== "undefined" ? maxDimension : null, maxHeight: typeof maxDimension !== "undefined" ? maxDimension : null, minHeight: 50, borderRadius: 40 }}
                        />
                    </TouchableOpacity>
                );
            } else {
                const picture = post.profilePics[post.profilePics.length - 1].picture;
                return (
                    <TouchableOpacity onPress={() => {
                        this.redirectToUsersProfileWithoutPane(post);
                    }}>
                        <Thumbnail source={{ uri: `${Config.wasabi_url}/${picture}` }} style={{ minWidth: typeof maxDimension !== "undefined" ? maxDimension : 50, minHeight: typeof maxDimension !== "undefined" ? maxDimension : 50, maxWidth: typeof maxDimension !== "undefined" ? maxDimension : null, maxHeight: typeof maxDimension !== "undefined" ? maxDimension : null, borderRadius: 40 }} />
                    </TouchableOpacity>
                );
            }
        } else if (post.photo !== null && typeof post.photo !== "undefined") {
            return (
                <TouchableOpacity onPress={() => {
                    this.redirectToUsersProfileWithoutPane(post);
                }}>
                    <Thumbnail source={{ uri: post.photo }} style={{ minWidth: typeof maxDimension !== "undefined" ? maxDimension : 50, minHeight: typeof maxDimension !== "undefined" ? maxDimension : 50, maxWidth: typeof maxDimension !== "undefined" ? maxDimension : null, maxHeight: typeof maxDimension !== "undefined" ? maxDimension : null, borderRadius: 40 }} />
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity onPress={() => {
                    this.redirectToUsersProfileWithoutPane(post);
                }}>
                    <Thumbnail source={{ uri: Config.no_image_avaliable }} style={{ minWidth: typeof maxDimension !== "undefined" ? maxDimension : 50, minHeight: typeof maxDimension !== "undefined" ? maxDimension : 50, maxWidth: typeof maxDimension !== "undefined" ? maxDimension : null, maxHeight: typeof maxDimension !== "undefined" ? maxDimension : null, borderRadius: 40 }} />
                </TouchableOpacity>
            );
        }
    }
    redirectToUsersProfileWithoutPane = (post) => {
        this.props.props.navigation.push("individual-profile-public", { item: { unique_id: post.poster }});
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
                        selectedPost: post,
                        posts: copy
                    })
                }
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
                return <Image source={require("../../../assets/icons/screaming.png")} style={{ maxWidth: 25, maxHeight: 25, minWidth: 25, minHeight: 25 }} />;
            } else if (emoji === "exploding") {
                return <Image source={require("../../../assets/icons/exploding.png")} style={{ maxWidth: 25, maxHeight: 25, minWidth: 25, minHeight: 25 }} />;
            } else if (emoji === "tearsOfJoy") {
                return <Image source={require("../../../assets/icons/laughing.png")} style={{ maxWidth: 25, maxHeight: 25, minWidth: 25, minHeight: 25 }} />;
            } else if (emoji === "clapping") {
                return <Image source={require("../../../assets/icons/clapping.png")} style={{ maxWidth: 25, maxHeight: 25, minWidth: 25, minHeight: 25 }} />;
            } else if (emoji === "angry") {
                return <Image source={require("../../../assets/icons/angry.png")} style={{ maxWidth: 25, maxHeight: 25, minWidth: 25, minHeight: 25 }} />;
            } else if (emoji === "heart") {
                return <Image source={require("../../../assets/icons/heart-face.png")} style={{ maxWidth: 25, maxHeight: 25, minWidth: 25, minHeight: 25 }} />;
            } else if (emoji === "wow") {
                return <Image source={require("../../../assets/icons/starstruck.png")} style={{ maxWidth: 25, maxHeight: 25, minWidth: 25, minHeight: 25 }} />;
            }
        });
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
                        selectedPost: post,
                        posts: copy
                    })
                }
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    _renderTruncatedFooter = (handlePress) => {
        return (
        <Text style={{ color: "blue", fontSize: 15, marginTop: 5 }} onPress={handlePress}>
            Read more
        </Text>
        );
    }
    
    _renderRevealedFooter = (handlePress) => {
        return (
        <Text style={{ color: "blue", fontSize: 15, marginTop: 5 }} onPress={handlePress}>
            Show less
        </Text>
        );
    }
    renderOneLive = (images) => {
        const {countFrom} = this.state;

        return(
        <View style={{ flexDirection: "row" }}>
            <TouchableOpacity style={images.length === 3 ? [styles.imageContent, styles.imageContentCustom] : [styles.imageContent, styles.imageContent1]} onPress={() => {
                this.setState({
                    selectedImage: images[0],
                    allImages: images,
                    index: images.indexOf(images[0])
                }, () => {
                    this.RBSheetGallery.open();
                })
            }}>
                <ProgressiveImage style={styles.image} source={{uri: `${Config.wasabi_url}/${images[0]}` }}/>
            </TouchableOpacity>
        </View>
        );
    }

    renderTwoLive = (images) => {
        const {countFrom} = this.state;
        const conditionalRender = [3, 4].includes(images.length) || images.length > +countFrom && [3, 4].includes(+countFrom);

        return(
        <View style={{ flexDirection: "row" }}>
            <TouchableOpacity style={[styles.imageContent, styles.imageContent2]} onPress={() => {
                this.setState({
                    selectedImage: (conditionalRender) ? images[1] : images[0],
                    allImages: images,
                    index: images.indexOf((conditionalRender) ? images[1] : images[0])
                }, () => {
                    this.RBSheetGallery.open();
                })
            }}>
            <ProgressiveImage style={styles.image} source={{uri: (conditionalRender) ? `${Config.wasabi_url}/${images[1]}` : `${Config.wasabi_url}/${images[0]}` }}/>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.imageContent, styles.imageContent2]} onPress={() => {
                this.setState({
                    selectedImage: (conditionalRender) ? images[2] : images[1],
                    allImages: images,
                    index: images.indexOf((conditionalRender) ? images[2] : images[1])
                }, () => {
                    this.RBSheetGallery.open();
                })
            }}>
            <ProgressiveImage style={styles.image} source={{uri: (conditionalRender) ? `${Config.wasabi_url}/${images[2]}` : `${Config.wasabi_url}/${images[1]}` }}/>
            </TouchableOpacity>
        </View>
        );
    }

    renderThreeLive = (images) => {
        const {countFrom} = this.state;
        const overlay = !countFrom || countFrom > 5 || images.length > countFrom && [4, 5].includes(+countFrom) ? this.renderCountOverlayLive(images) : this.renderOverlayLive(images);
        const conditionalRender = images.length == 4 || images.length > +countFrom && +countFrom == 4;
        return(
        <View style={styles.specialRow}>
            <TouchableOpacity style={[styles.imageContent, styles.imageContent3]} onPress={() => {
                this.setState({
                    selectedImage: (conditionalRender) ? images[1] : images[2],
                    allImages: images,
                    index: images.indexOf((conditionalRender) ? images[1] : images[2])
                }, () => {
                    this.RBSheetGallery.open();
                })
            }}>
            <ProgressiveImage style={styles.image} source={{uri: (conditionalRender) ? `${Config.wasabi_url}/${images[1]}` : `${Config.wasabi_url}/${images[2]}` }}/>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.imageContent, styles.imageContent3]} onPress={() => {
                this.setState({
                    selectedImage: (conditionalRender) ? images[2] : images[3],
                    allImages: images,
                    index: images.indexOf((conditionalRender) ? images[2] : images[3])
                }, () => {
                    this.RBSheetGallery.open();
                })
            }}>
            <ProgressiveImage style={styles.image} source={{uri: (conditionalRender) ? `${Config.wasabi_url}/${images[2]}` : `${Config.wasabi_url}/${images[3]}` }}/>
            </TouchableOpacity>
            {overlay}
        </View>
        );
    }

    renderOverlayLive = (images) => {
        return(
            <TouchableOpacity style={[styles.imageContent, styles.imageContent3]} onPress={() => {
                this.setState({
                    selectedImage: images[images.length - 1],
                    allImages: images,
                    index: images.indexOf(images[images.length - 1])
                }, () => {
                    this.RBSheetGallery.open();
                })
            }}>
                <ProgressiveImage style={styles.image} source={{uri: `${Config.wasabi_url}/${images[images.length - 1]}` }}/>
            </TouchableOpacity>
        );
    }

    renderCountOverlayLive = (images) => {
        const { countFrom } = this.state;
        const extra = images.length - (countFrom && countFrom > 5 ? 5 : countFrom);
        const conditionalRender = images.length == 4 || images.length > +countFrom && +countFrom == 4;
        return(
            <TouchableOpacity style={[styles.imageContent, styles.imageContent3]} onPress={() => {
                this.setState({
                    selectedImage: (conditionalRender) ? images[3] : images[4],
                    allImages: images,
                    index: images.indexOf((conditionalRender) ? images[3] : images[4])
                }, () => {
                    this.RBSheetGallery.open();
                })
            }}>
            <ProgressiveImage style={styles.image} source={{uri: (conditionalRender) ? `${Config.wasabi_url}/${images[3]}` : `${Config.wasabi_url}/${images[4]}` }}/>
            <View style={styles.overlayContent}>
                <View>
                    <Text style={styles.count}>+{extra}</Text>
                </View>
            </View>
            </TouchableOpacity>
        );
    }

    renderOverlay() {
        const { images } = this.state;
        return(
            <TouchableOpacity style={[styles.imageContent, styles.imageContent3]} onPress={() => {
                const items = [...this.state.images];
                items.pop();

                this.setState({
                    images: items
                })
            }}>
            <Image style={styles.image} source={{uri: images[images.length - 1].uri }}/>
            </TouchableOpacity>
        );
    }

    renderCountOverlay(more) {
        const { images } = this.state;
        const { countFrom } = this.state;
        const extra = images.length - (countFrom && countFrom > 5 ? 5 : countFrom);
        const conditionalRender = images.length == 4 || images.length > +countFrom && +countFrom == 4;
        return(
            <TouchableOpacity style={[styles.imageContent, styles.imageContent3]} onPress={() => {
                this.setState({
                    images: this.state.images.filter((picture, index) => {
                        if (picture.uri !== images[images.length - 1].uri) {
                            return picture;
                        }
                    })
                })
            }}>
            <Image style={styles.image} source={{uri: (conditionalRender) ? images[3].uri : images[4].uri }}/>
            <View style={styles.overlayContent}>
                <View>
                <Text style={styles.count}>+{extra}</Text>
                </View>
            </View>
            </TouchableOpacity>
        );
    }
    redirectBasedOnUsername = (username) => {

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
    renderContent = () => {
        const { user, alreadyFriends, posts } = this.state;

        if (user !== null) {
            return (
                <Fragment>
                    <View style={styles.body}>
                        <View style={styles.bodyContent}>
                            <View style={styles.centered}>
                                <Text style={styles.name}>{user !== null ? `${user.firstName} ${user.lastName}` : "Loading..."}</Text>
                                <Text style={styles.info}>{user.accountType === "hire" ? "Employer" : "Freelancer"} Account</Text>
                                <Text style={styles.info}>$20 Minimum Hourly Charge</Text>
                                <View style={[styles.centered, { marginTop: 15 }]}>
                                    <View style={{ flexDirection: "row" }}>
                                        <Image source={require("../../../assets/icons/marker.png")} style={{ maxWidth: 20, maxHeight: 20 }} />
                                        <Text style={[styles.smallText, { marginLeft: 14 }]}>Lives in <Text style={styles.bold}>Charlotte, North Carolina</Text></Text>
                                    </View>
                                </View>
                                <View style={[styles.centered, { marginTop: 15 }]}>
                                    <View style={{ flexDirection: "row" }}>
                                        <Image source={require("../../../assets/icons/birthdate.png")} style={{ maxWidth: 20, maxHeight: 20 }} />
                                        <Text style={[styles.smallText, { marginLeft: 14 }]}>Born <Text style={styles.bold}>{moment(user.birthdate).format("YYYY-MM-DD")}</Text></Text>
                                    </View>
                                </View>
                            </View>
                            {typeof user.skills !== "undefined" && user.skills.length > 0 ? <Fragment>
                            <Text style={[styles.headerText, { textDecorationLine: "underline", textAlign: "left", marginTop: 15 }]}>Skills & Languages</Text>
                            <Text style={[styles.smallerText, { marginBottom: 15, marginTop: 10 }]}>These are various tags, skills, languages and various technologies that this user is proficent with...</Text>
                                <View style={[styles.centered, { marginTop: 15 }]}>
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                        {typeof user.skills !== "undefined" && user.skills.length > 0 ? user.skills.map((skill, index) => {
                                            return (
                                                <View style={styles.tagger}>
                                                    <Text style={styles.tag}>{skill}</Text>
                                                </View>
                                            );
                                        }) : null}
                                    </View>
                                </View>
                            </Fragment> : null}
                            <Text style={styles.description}>Bio - Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum electram expetendis, omittam deseruisse consequuntur ius an,</Text>
                            <View style={{ marginTop: 10, margin: 20 }}>
                                {user !== null ? <AwesomeButtonBlue borderColor={"#141414"} borderWidth={2} style={{ marginTop: 20 }} type={"secondary"} backgroundColor={"#ffffff"} backgroundPlaceholder={"black"} textColor={"black"} shadowColor={"grey"} onPress={() => {
                                   this.RBSheet.open();
                                }} stretch={true}>Send Private Message</AwesomeButtonBlue> : null}
                                <View style={{ marginTop: 20 }} />
                                {user !== null && alreadyFriends === false ? <AwesomeButtonBlue borderColor={"#141414"} borderWidth={2} style={{ marginTop: 20 }} type={"secondary"} backgroundColor={"#ffffff"} backgroundPlaceholder={"black"} textColor={"black"} shadowColor={"grey"} onPress={() => {
                                   this.setState({
                                        isVisible: true
                                    })
                                }} stretch={true}>Send Friend Request</AwesomeButtonBlue> : null}
                            </View>
                            {user !== null && _.has(user, "introductionVideo") ? <View style={styles.margin10}>
                                <Text style={[styles.headerText, { textDecorationLine: "underline" }]}>Introductory video</Text>
                                <Text style={[styles.smallerText, { marginBottom: 25, marginTop: 10 }]}>This is an introductory video about {user.firstName} {user.lastName}! These are made to give eachother more information or a better idea of what candiates and clients are looking for...</Text>
                                <Video  
                                    resizeMode="cover"
                                    repeat
                                    controls={true}
                                    source={{uri: `${Config.wasabi_url}/${user.introductionVideo}` }}   // Can be a URL or a local file.
                                    paused={true}
                                    ref={(ref) => {
                                        this.player = ref
                                    }}
                                    style={styles.introVideo}
                                />
                            </View> : null}
                        </View>
                    </View>
                    {typeof user.currentActiveJobs !== "undefined" && user.currentActiveJobs.length > 0 ? <Fragment><View style={{ margin: 15 }}><Text style={styles.headerText}>Active Jobs</Text>
                    <Text style={styles.subText}>These are active jobs posted by this user</Text></View>
                    <Carousel
                        ref={(c) => { this._carousel = c; }}
                        data={this.state.user.currentActiveJobs}
                        renderItem={this._renderItem}
                        sliderWidth={width}
                        itemWidth={width * 0.90}
                    /></Fragment> : null}
                    <View style={{ marginTop: 25 }} />
                    <View style={styles.nextContainer}>
                        {user !== null && typeof user.employmentHistory !== "undefined" && user.employmentHistory.length > 0 ? user.employmentHistory.slice(0, 2).map((history, index) => {
                            return (
                                <Fragment key={index}>
                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ margin: 10, flexDirection: "row", zIndex: 999999999999 }}>
                                            <View style={styles.largeColumnCustom}>
                                                <Text style={styles.heavyText}>{history.jobTitle} | {history.companyName}</Text>
                                            </View>
                                            <View style={styles.smallColumnCustom}>
                                                <TouchableOpacity onPress={() => {
                                                    this.handlePressMore(history);
                                                }} style={styles.iconsRight}>
                                                    <Image style={{ maxWidth: 30, maxHeight: 30 }} source={require("../../../assets/icons/more.png")} />
                                                </TouchableOpacity>
                                               
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ margin: 10 }}>
                                        <Text style={[styles.smallGrey, { marginBottom: 10 }]}>{history.employmentStartDate} - {history.currentlyWorkingWithEmployer === "Yes" ? "Current" : history.employmentEndDate}</Text>
                                            <ReadMore
                                                numberOfLines={3}
                                                renderTruncatedFooter={this._renderTruncatedFooter}
                                                renderRevealedFooter={this._renderRevealedFooter}
                                                onReady={this._handleTextReady}>
                                                <Text style={styles.cardText}>
                                                    {history.description}
                                                </Text>
                                            </ReadMore>
                                    </View>
                                </Fragment>
                            );
                        }) : null}
                    </View>
                    <View style={{ marginTop: 25 }} />
                    <View style={styles.nextContainer}>
                        <View style={{ margin: 10 }}>
                            <List>
                                {_.has(user, "schoolingHistory") && typeof user.schoolingHistory !== "undefined" && user.schoolingHistory.length > 0 ? <View>
                                    <Text style={[styles.headerText, { marginBottom: 15 }]}>Schooling/Education History</Text>
                                    <Text>This user has attended the following schools whether past or present or both! Click any listing to go to their full schooling page.</Text>
                                </View> : null}
                                {_.has(user, "schoolingHistory") && typeof user.schoolingHistory !== "undefined" && user.schoolingHistory.length > 0 ? user.schoolingHistory.map((school, index) => {
                                    return (
                                        <ListItem button={true} onPress={() => {
                                            this.props.props.navigation.push("view-schooling-education-history-manage", { unique_id: school.poster })
                                        }} avatar>
                                            <Left>
                                                <Thumbnail source={require("../../../assets/icons/school-drawing.png")} style={{ maxWidth: 55, maxHeight: 55 }} />
                                            </Left>
                                            <Body>
                                                <Text>{school.schoolName.poi.name}</Text>
                                                <Text note>{school.schoolName.poi.url}</Text>
                                                <Text note>{school.degree !== null ? school.degree : "No Degree Provided."}</Text>
                                                {school.startDate !== null && school.endDate !== null ? <Text note>{school.startDate} - {school.endDate}</Text> : school.areaOfStudy !== null ? <Text note>{school.areaOfStudy}</Text> : school.description !== null ? <Text note>{school.description}</Text> : null}
                                            </Body>
                                        </ListItem>
                                    );
                                }) : null}
                            </List>
                        </View>
                    </View>
                    <View style={{ marginTop: 25 }} />
                    <View style={styles.nextContainer}>
                        <FlatList   
                            data={posts}
                            renderItem={({ item, index }) => {
                                const post = item;
                                if (_.has(post, "newData") && post.shared === true) {
                                    return (
                                        <Card>
                                            <SharedItemPostHelper 
                                                postLoaded={this.state.postLoaded} 
                                                index={index} 
                                                post={post} 
                                                props={this.props} 
                                            />
                                            <CardItem style={{ width: width, marginLeft: -20 }}>
                                                <Body>
                                                    <Footer style={{ width: width }}>
                                                        <FooterTab style={{ width: width }}>
                                                            {post.newData.peopleReactedIDs.includes(this.props.unique_id) ? <Popover  
                                                                onRequestClose={() => {
                                                                    this.setState({
                                                                        [`visible-${index}`]: false
                                                                    })
                                                                }}
                                                                isVisible={this.state[`visible-${index}`]}  
                                                                placement={"bottom"}
                                                                from={(
                                                                    <Button onPress={() => {
                                                                        this.setState({
                                                                            [`visible-${index}`]: true
                                                                        })
                                                                    }} style={{ flexDirection: "column", width: width * 0.33333333333, backgroundColor: "#303030" }}>
                                                                        <Image source={require("../../../assets/icons/like.png")} style={{ maxWidth: 20, maxHeight: 20, tintColor: "#ffffff" }} />
                                                                        <Text style={{ color: "#ffffff", fontWeight: "bold" }}>Un-Like</Text>
                                                                    </Button>
                                                                )}>
                                                                <View style={styles.popoverTwo}>
                                                                    <View style={{ paddingTop: 5, width: "100%" }}>
                                                                        <AwesomeButtonCartman backgroundColor={"#303030"} textColor={"#ffffff"} onPress={() => {
                                                                        this.setState({
                                                                            [`visible-${index}`]: !`visible-${index}`
                                                                        }, () => {
                                                                            this.revokeSharedLikeResponse(post);
                                                                        })
                                                                    }} stretch={true}>Remove/Revoke Response</AwesomeButtonCartman>
                                                                    </View>
                                                                </View>
                                                            </Popover> : <Popover  
                                                                onRequestClose={() => {
                                                                    this.setState({
                                                                        [`visible-${index}`]: false
                                                                    })
                                                                }}
                                                                isVisible={this.state[`visible-${index}`]}  
                                                                placement={"bottom"}
                                                                from={(
                                                                    <Button onPress={() => {
                                                                        this.setState({
                                                                            [`visible-${index}`]: true
                                                                        })
                                                                    }} style={{ flexDirection: "column", width: width * 0.33333333333, backgroundColor: "#303030" }}>
                                                                        <Image source={require("../../../assets/icons/like.png")} style={{ maxWidth: 20, maxHeight: 20, tintColor: "#ffffff" }} />
                                                                        <Text style={{ color: "#ffffff" }}>Like</Text>
                                                                    </Button>
                                                                )}>
                                                                <View style={styles.popoverTwo}>
                                                                    <TouchableOpacity onPress={() => {
                                                                        this.setState({
                                                                            [`visible-${index}`]: !`visible-${index}`,
                                                                            like: "screaming"
                                                                        }, () => {
                                                                            this.likeSharedPostRespond(post);
                                                                        })
                                                                    }} style={styles.lottiContainer}>
                                                                        <LottieView source={require('../../../assets/animations/screaming.json')} autoPlay loop style={{ width: 50, maxWidth: 50, height: 65 }} />
                                                                    </TouchableOpacity>
                                                                    <TouchableOpacity onPress={() => {
                                                                        this.setState({
                                                                            [`visible-${index}`]: !`visible-${index}`,
                                                                            like: "exploding"
                                                                        }, () => {
                                                                            this.likeSharedPostRespond(post);
                                                                        })
                                                                    }} style={styles.lottiContainer}>
                                                                        <LottieView source={require('../../../assets/animations/exploding.json')} autoPlay loop style={{ width: 50, maxWidth: 50, height: 65 }} />
                                                                    </TouchableOpacity>
                                                                    <TouchableOpacity onPress={() => {
                                                                        this.setState({
                                                                            [`visible-${index}`]: !`visible-${index}`,
                                                                            like: "tearsOfJoy"
                                                                        }, () => {
                                                                            this.likeSharedPostRespond(post);
                                                                        })
                                                                    }} style={styles.lottiContainer}>
                                                                        <LottieView source={require('../../../assets/animations/tears-of-joy.json')} autoPlay loop style={{ width: 80, maxWidth: 80, height: 65 }} />
                                                                    </TouchableOpacity>
                                                                    <TouchableOpacity onPress={() => {
                                                                        this.setState({
                                                                            [`visible-${index}`]: !`visible-${index}`,
                                                                            like: "clapping"
                                                                        }, () => {
                                                                            this.likeSharedPostRespond(post);
                                                                        })
                                                                    }} style={styles.lottiContainer}>
                                                                        <LottieView source={require('../../../assets/animations/clapping.json')} autoPlay loop style={{ width: 50, maxWidth: 50, height: 65 }} />
                                                                    </TouchableOpacity>
                                                                    <TouchableOpacity onPress={() => {
                                                                        this.setState({
                                                                            [`visible-${index}`]: !`visible-${index}`,
                                                                            like: "angry"
                                                                        }, () => {
                                                                            this.likeSharedPostRespond(post);
                                                                        })
                                                                    }} style={styles.lottiContainer}>
                                                                        <LottieView source={require('../../../assets/animations/angry.json')} autoPlay loop style={{ width: 50, maxWidth: 50, height: 65 }} />
                                                                    </TouchableOpacity>
                                                                    <TouchableOpacity onPress={() => {
                                                                        this.setState({
                                                                            [`visible-${index}`]: !`visible-${index}`,
                                                                            like: "heart"
                                                                        }, () => {
                                                                            this.likeSharedPostRespond(post);
                                                                        })
                                                                    }} style={styles.lottiContainer}>
                                                                        <LottieView source={require('../../../assets/animations/love.json')} autoPlay loop style={{ width: 50, maxWidth: 50, height: 65 }} />
                                                                    </TouchableOpacity>
                                                                    <TouchableOpacity onPress={() => {
                                                                        this.setState({
                                                                            [`visible-${index}`]: !`visible-${index}`,
                                                                            like: "wow"
                                                                        }, () => {
                                                                            this.likeSharedPostRespond(post);
                                                                        })
                                                                    }} style={styles.lottiContainer}>
                                                                        <LottieView source={require('../../../assets/animations/wow.json')} autoPlay loop style={{ width: 50, maxWidth: 50, height: 65 }} />
                                                                    </TouchableOpacity>
                                                                </View>
                                                            </Popover>}
                                                            
                                                            <Button onPress={() => {
                                                                this.handleRedirectToIndividualPage(post);
                                                            }} style={{ flexDirection: "column", width: width * 0.33333333333, backgroundColor: "#303030" }}>
                                                                <Image source={require("../../../assets/icons/add-comment.png")} style={{ maxWidth: 20, maxHeight: 20, tintColor: "#ffffff" }} />
                                                                <Text style={{ color: "#ffffff" }}>Comment</Text>
                                                            </Button>
                                                            <Button onPress={() => {
                                                                this.setState({
                                                                    pickedOutPost: post
                                                                }, () => {
                                                                    setTimeout(() => {
                                                                        this.openBottomSheetCustom();
                                                                    }, 650)
                                                                })
                                                            }} style={{ flexDirection: "column", width: width * 0.33333333333, backgroundColor: "#303030" }}>
                                                                <Image source={require("../../../assets/icons/share.png")} style={{ maxWidth: 20, maxHeight: 20, tintColor: "#ffffff" }} />
                                                                <Text style={{ color: "#ffffff" }}>Share</Text>
                                                            </Button>
                                                        </FooterTab>
                                                    </Footer>
                                                    </Body>
                                                </CardItem>
                                        </Card>
                                    );
                                } else {
                                    return (
                                        <Fragment key={index}>
                                        {post.videoLinkIncluded === true ? <InView onChange={(viewport) => {
                                            this.handlePlaying(viewport, index);
                                        }}>
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
                                                    {post.pictures !== null ? <View style={{  }}>
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
                                                        {typeof post.taggedUsers !== "undefined" && _.has(post, "taggedUsers") && Array.isArray(post["taggedUsers"]) && post.taggedUsers.length > 0 ? <Highlighter 
                                                            onPressHighlightedText={(username) => {
                                                                this.redirectBasedOnUsername(username);
                                                            }}
                                                            highlightStyle={{backgroundColor: '#3feafc'}}
                                                            searchWords={post.taggedUsers}
                                                            textToHighlight={post.text}
                                                        /> : <Text style={styles.cardText}>
                                                            {post.text}
                                                        </Text>}
                                                    </ReadMore>

                                                    {post.taggedLocation === true ? <MapView
                                                        style={styles.mapCustom}
                                                        region={{
                                                            latitude: post.taggedLocationData.position.lat, 
                                                            longitude: post.taggedLocationData.position.lon,
                                                            latitudeDelta: 0.0922,
                                                            longitudeDelta: 0.0421
                                                        }}
                                                    >
                                                        <Marker
                                                            key={index}
                                                            coordinate={{ 
                                                                latitude: post.taggedLocationData.position.lat, 
                                                                longitude: post.taggedLocationData.position.lon 
                                                            }}
                                                            title={post.taggedLocationData.poi.name}
                                                            description={post.taggedLocationData.address.freeformAddress}
                                                        >
                                                            <Image source={require("../../../assets/icons/map-pin.png")} style={{ maxWidth: 30, maxHeight: 30 }} />
                                                        </Marker>
                                                    </MapView> : null}
                                                    <Video 
                                                        source={{ uri: post.videoLink }}   // Can be a URL or a local file.
                                                        ref={ref => { this.video = ref}} 
                                                        muted={true}
                                                        paused={!this.state[`playing-${index}`]} 
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
                                                        <FooterTab style={{ width: width }}>
                                                            {post.peopleReactedIDs.includes(this.props.unique_id) ? <Popover  
                                                                onRequestClose={() => {
                                                                    this.setState({
                                                                        [`visible-${index}`]: false
                                                                    })
                                                                }}
                                                                isVisible={this.state[`visible-${index}`]}  
                                                                placement={"bottom"}
                                                                from={(
                                                                    <Button onPress={() => {
                                                                        this.setState({
                                                                            [`visible-${index}`]: true
                                                                        })
                                                                    }} style={{ flexDirection: "column", width: width * 0.33333333333 }}>
                                                                        <Image source={require("../../../assets/icons/like.png")} style={{ maxWidth: 20, maxHeight: 20, tintColor: "#ffffff" }} />
                                                                        <Text style={{ fontWeight: "bold", color: "#ffffff" }}>Un-Like</Text>
                                                                    </Button>
                                                                )}>
                                                                <View style={styles.popoverTwo}>
                                                                    <View style={{ paddingTop: 5, width: "100%" }}>
                                                                        <AwesomeButtonCartman backgroundColor={"#303030"} textColor={"#ffffff"} onPress={() => {
                                                                        this.setState({
                                                                            [`visible-${index}`]: !`visible-${index}`
                                                                        }, () => {
                                                                            this.removeLikeResponse(post);
                                                                        })
                                                                    }} stretch={true}>Remove/Revoke Response</AwesomeButtonCartman>
                                                                    </View>
                                                                </View>
                                                            </Popover> : <Popover  
                                                                onRequestClose={() => {
                                                                    this.setState({
                                                                        [`visible-${index}`]: false
                                                                    })
                                                                }}
                                                                isVisible={this.state[`visible-${index}`]}  
                                                                placement={"bottom"}
                                                                from={(
                                                                    <Button onPress={() => {
                                                                        this.setState({
                                                                            [`visible-${index}`]: true
                                                                        })
                                                                    }} style={{ flexDirection: "column", width: width * 0.33333333333, backgroundColor: "#303030" }}>
                                                                        <Image source={require("../../../assets/icons/like.png")} style={{ maxWidth: 20, maxHeight: 20, tintColor: "#ffffff" }} />
                                                                        <Text style={{ color: "#ffffff" }}>Like</Text>
                                                                    </Button>
                                                                )}>
                                                                <View style={styles.popoverTwo}>
                                                                    <TouchableOpacity onPress={() => {
                                                                        this.setState({
                                                                            [`visible-${index}`]: !`visible-${index}`,
                                                                            like: "screaming"
                                                                        }, () => {
                                                                            this.likeReactPost(post);
                                                                        })
                                                                    }} style={styles.lottiContainer}>
                                                                        <LottieView source={require('../../../assets/animations/screaming.json')} autoPlay loop style={{ width: 50, maxWidth: 50, height: 65 }} />
                                                                    </TouchableOpacity>
                                                                    <TouchableOpacity onPress={() => {
                                                                        this.setState({
                                                                            [`visible-${index}`]: !`visible-${index}`,
                                                                            like: "exploding"
                                                                        }, () => {
                                                                            this.likeReactPost(post);
                                                                        })
                                                                    }} style={styles.lottiContainer}>
                                                                        <LottieView source={require('../../../assets/animations/exploding.json')} autoPlay loop style={{ width: 50, maxWidth: 50, height: 65 }} />
                                                                    </TouchableOpacity>
                                                                    <TouchableOpacity onPress={() => {
                                                                        this.setState({
                                                                            [`visible-${index}`]: !`visible-${index}`,
                                                                            like: "tearsOfJoy"
                                                                        }, () => {
                                                                            this.likeReactPost(post);
                                                                        })
                                                                    }} style={styles.lottiContainer}>
                                                                        <LottieView source={require('../../../assets/animations/tears-of-joy.json')} autoPlay loop style={{ width: 80, maxWidth: 80, height: 65 }} />
                                                                    </TouchableOpacity>
                                                                    <TouchableOpacity onPress={() => {
                                                                        this.setState({
                                                                            [`visible-${index}`]: !`visible-${index}`,
                                                                            like: "clapping"
                                                                        }, () => {
                                                                            this.likeReactPost(post);
                                                                        })
                                                                    }} style={styles.lottiContainer}>
                                                                        <LottieView source={require('../../../assets/animations/clapping.json')} autoPlay loop style={{ width: 50, maxWidth: 50, height: 65 }} />
                                                                    </TouchableOpacity>
                                                                    <TouchableOpacity onPress={() => {
                                                                        this.setState({
                                                                            [`visible-${index}`]: !`visible-${index}`,
                                                                            like: "angry"
                                                                        }, () => {
                                                                            this.likeReactPost(post);
                                                                        })
                                                                    }} style={styles.lottiContainer}>
                                                                        <LottieView source={require('../../../assets/animations/angry.json')} autoPlay loop style={{ width: 50, maxWidth: 50, height: 65 }} />
                                                                    </TouchableOpacity>
                                                                    <TouchableOpacity onPress={() => {
                                                                        this.setState({
                                                                            [`visible-${index}`]: !`visible-${index}`,
                                                                            like: "heart"
                                                                        }, () => {
                                                                            this.likeReactPost(post);
                                                                        })
                                                                    }} style={styles.lottiContainer}>
                                                                        <LottieView source={require('../../../assets/animations/love.json')} autoPlay loop style={{ width: 50, maxWidth: 50, height: 65 }} />
                                                                    </TouchableOpacity>
                                                                    <TouchableOpacity onPress={() => {
                                                                        this.setState({
                                                                            [`visible-${index}`]: !`visible-${index}`,
                                                                            like: "wow"
                                                                        }, () => {
                                                                            this.likeReactPost(post);
                                                                        })
                                                                    }} style={styles.lottiContainer}>
                                                                        <LottieView source={require('../../../assets/animations/wow.json')} autoPlay loop style={{ width: 50, maxWidth: 50, height: 65 }} />
                                                                    </TouchableOpacity>
                                                                </View>
                                                            </Popover>}
                                                            
                                                            <Button onPress={() => {
                                                                this.handleRedirectToIndividualPage(post);
                                                            }} style={{ flexDirection: "column", width: width * 0.33333333333, backgroundColor: "#303030" }}>
                                                                <Image source={require("../../../assets/icons/add-comment.png")} style={{ maxWidth: 20, maxHeight: 20, tintColor: "#ffffff" }} />
                                                                <Text style={{ color: "#ffffff" }}>Comment</Text>
                                                            </Button>
                                                            <Button onPress={() => {
                                                                this.setState({
                                                                    pickedOutPost: post
                                                                }, () => {
                                                                    setTimeout(() => {
                                                                        this.openBottomSheetCustom();
                                                                    }, 650)
                                                                })
                                                            }} style={{ flexDirection: "column", width: width * 0.33333333333, backgroundColor: "#303030" }}>
                                                                <Image source={require("../../../assets/icons/share.png")} style={{ maxWidth: 20, maxHeight: 20, tintColor: "#ffffff" }} />
                                                                <Text style={{ color: "#ffffff" }}>Share</Text>
                                                            </Button>
                                                        </FooterTab>
                                                    </Footer>
                                                    </Body>
                                                </CardItem>
                                            </Card>
                                            <View style={styles.thickLine} />
                                            </InView> : <Fragment>
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
                                                    {post.pictures !== null ? <View style={{  }}>
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
                                                        {typeof post.taggedUsers !== "undefined" && _.has(post, "taggedUsers") && Array.isArray(post["taggedUsers"]) && post.taggedUsers.length > 0 ? <Highlighter 
                                                            onPressHighlightedText={(username) => {
                                                                this.redirectBasedOnUsername(username);
                                                            }}
                                                            highlightStyle={{backgroundColor: '#3feafc'}}
                                                            searchWords={post.taggedUsers}
                                                            textToHighlight={post.text}
                                                        /> : <Text style={styles.cardText}>
                                                            {post.text}
                                                        </Text>}
                                                    </ReadMore>

                                                        {post.taggedLocation === true ? <MapView
                                                            style={styles.mapCustom}
                                                            region={{
                                                                latitude: post.taggedLocationData.position.lat, 
                                                                longitude: post.taggedLocationData.position.lon,
                                                                latitudeDelta: 0.0922,
                                                                longitudeDelta: 0.0421
                                                            }}
                                                        >
                                                            <Marker
                                                                key={index}
                                                                coordinate={{ 
                                                                    latitude: post.taggedLocationData.position.lat, 
                                                                    longitude: post.taggedLocationData.position.lon 
                                                                }}
                                                                title={post.taggedLocationData.poi.name}
                                                                description={post.taggedLocationData.address.freeformAddress}
                                                            >
                                                                <Image source={require("../../../assets/icons/map-pin.png")} style={{ maxWidth: 30, maxHeight: 30 }} />
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
                                                                                    [`visible-${index}`]: false
                                                                                })
                                                                            }}
                                                                            isVisible={this.state[`visible-${index}`]}  
                                                                            placement={"top"}
                                                                            from={(
                                                                                <Button onPress={() => {
                                                                                    this.setState({
                                                                                        [`visible-${index}`]: true
                                                                                    })
                                                                                }} style={{ flexDirection: "column", width: width * 0.33333333333, backgroundColor: "#303030" }}>
                                                                                    <Image source={require("../../../assets/icons/like.png")} style={{ maxWidth: 20, maxHeight: 20, tintColor: "#ffffff" }} />
                                                                                    <Text style={{ color: "#ffffff", fontWeight: "bold" }}>Un-Like</Text>
                                                                                </Button>
                                                                            )}>
                                                                            <View style={styles.popoverTwo}>
                                                                                <View style={{ paddingTop: 5, width: "100%" }}>
                                                                                    <AwesomeButtonCartman backgroundColor={"#303030"} textColor={"#ffffff"} onPress={() => {
                                                                                    this.setState({
                                                                                        [`visible-${index}`]: !`visible-${index}`
                                                                                    }, () => {
                                                                                        this.removeLikeResponse(post);
                                                                                    })
                                                                                }} stretch={true}>Remove/Revoke Response</AwesomeButtonCartman>
                                                                                </View>
                                                                            </View>
                                                                        </Popover> : <Popover  
                                                                            onRequestClose={() => {
                                                                                this.setState({
                                                                                    [`visible-${index}`]: false
                                                                                })
                                                                            }}
                                                                            isVisible={this.state[`visible-${index}`]}  
                                                                            placement={"top"}
                                                                            from={(
                                                                                <Button onPress={() => {
                                                                                    this.setState({
                                                                                        [`visible-${index}`]: true
                                                                                    })
                                                                                }} style={{ flexDirection: "column", width: width * 0.33333333333, backgroundColor: "#303030" }}>
                                                                                    <Image source={require("../../../assets/icons/like.png")} style={{ maxWidth: 20, maxHeight: 20, tintColor: "#ffffff" }} />
                                                                                    <Text style={{ color: "#ffffff" }}>Like</Text>
                                                                                </Button>
                                                                            )}>
                                                                            <View style={styles.popoverTwo}>
                                                                                <TouchableOpacity onPress={() => {
                                                                                    this.setState({
                                                                                        [`visible-${index}`]: !`visible-${index}`,
                                                                                        like: "screaming"
                                                                                    }, () => {
                                                                                        this.likeReactPost(post);
                                                                                    })
                                                                                }} style={styles.lottiContainer}>
                                                                                    <LottieView source={require('../../../assets/animations/screaming.json')} autoPlay loop style={{ width: 50, maxWidth: 50, height: 65 }} />
                                                                                </TouchableOpacity>
                                                                                <TouchableOpacity onPress={() => {
                                                                                    this.setState({
                                                                                        [`visible-${index}`]: !`visible-${index}`,
                                                                                        like: "exploding"
                                                                                    }, () => {
                                                                                        this.likeReactPost(post);
                                                                                    })
                                                                                }} style={styles.lottiContainer}>
                                                                                    <LottieView source={require('../../../assets/animations/exploding.json')} autoPlay loop style={{ width: 50, maxWidth: 50, height: 65 }} />
                                                                                </TouchableOpacity>
                                                                                <TouchableOpacity onPress={() => {
                                                                                    this.setState({
                                                                                        [`visible-${index}`]: !`visible-${index}`,
                                                                                        like: "tearsOfJoy"
                                                                                    }, () => {
                                                                                        this.likeReactPost(post);
                                                                                    })
                                                                                }} style={styles.lottiContainer}>
                                                                                    <LottieView source={require('../../../assets/animations/tears-of-joy.json')} autoPlay loop style={{ width: 80, maxWidth: 80, height: 65 }} />
                                                                                </TouchableOpacity>
                                                                                <TouchableOpacity onPress={() => {
                                                                                    this.setState({
                                                                                        [`visible-${index}`]: !`visible-${index}`,
                                                                                        like: "clapping"
                                                                                    }, () => {
                                                                                        this.likeReactPost(post);
                                                                                    })
                                                                                }} style={styles.lottiContainer}>
                                                                                    <LottieView source={require('../../../assets/animations/clapping.json')} autoPlay loop style={{ width: 50, maxWidth: 50, height: 65 }} />
                                                                                </TouchableOpacity>
                                                                                <TouchableOpacity onPress={() => {
                                                                                    this.setState({
                                                                                        [`visible-${index}`]: !`visible-${index}`,
                                                                                        like: "angry"
                                                                                    }, () => {
                                                                                        this.likeReactPost(post);
                                                                                    })
                                                                                }} style={styles.lottiContainer}>
                                                                                    <LottieView source={require('../../../assets/animations/angry.json')} autoPlay loop style={{ width: 50, maxWidth: 50, height: 65 }} />
                                                                                </TouchableOpacity>
                                                                                <TouchableOpacity onPress={() => {
                                                                                    this.setState({
                                                                                        [`visible-${index}`]: !`visible-${index}`,
                                                                                        like: "heart"
                                                                                    }, () => {
                                                                                        this.likeReactPost(post);
                                                                                    })
                                                                                }} style={styles.lottiContainer}>
                                                                                    <LottieView source={require('../../../assets/animations/love.json')} autoPlay loop style={{ width: 50, maxWidth: 50, height: 65 }} />
                                                                                </TouchableOpacity>
                                                                                <TouchableOpacity onPress={() => {
                                                                                    this.setState({
                                                                                        [`visible-${index}`]: !`visible-${index}`,
                                                                                        like: "wow"
                                                                                    }, () => {
                                                                                        this.likeReactPost(post);
                                                                                    })
                                                                                }} style={styles.lottiContainer}>
                                                                                    <LottieView source={require('../../../assets/animations/wow.json')} autoPlay loop style={{ width: 50, maxWidth: 50, height: 65 }} />
                                                                                </TouchableOpacity>
                                                                            </View>
                                                                        </Popover>}
                                                                        
                                                                        <Button onPress={() => {
                                                                            this.handleRedirectToIndividualPage(post);
                                                                        }} style={{ flexDirection: "column", width: width * 0.33333333333, backgroundColor: "#303030" }}>
                                                                            <Image source={require("../../../assets/icons/add-comment.png")} style={{ maxWidth: 20, maxHeight: 20, tintColor: "#ffffff" }} />
                                                                            <Text style={{ color: "#ffffff" }}>Comment</Text>
                                                                        </Button>
                                                                        <Button onPress={() => {
                                                                            this.setState({
                                                                                pickedOutPost: post
                                                                            }, () => {
                                                                                setTimeout(() => {
                                                                                    this.openBottomSheetCustom();
                                                                                }, 650)
                                                                            })
                                                                        }} style={{ flexDirection: "column", width: width * 0.33333333333, backgroundColor: "#303030" }}>
                                                                            <Image source={require("../../../assets/icons/share.png")} style={{ maxWidth: 20, maxHeight: 20, tintColor: "#ffffff" }} />
                                                                            <Text style={{ color: "#ffffff" }}>Share</Text>
                                                                        </Button>
                                                                    </FooterTab>
                                                                </Footer>
                                                                </Body>
                                                            </CardItem>
                                                        </Card>
                                                        <View style={styles.thickLine} />
                                            </Fragment>}
                                        </Fragment>
                                    );
                                }
                            }}
                            extraData={this.state}
                            initialNumToRender={5}
                            onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
                            onScroll={(value) => {
                                if (this.state.scrolling === false) {
                                        this.setState({
                                            scrolling: true,
                                            onEndReachedCalledDuringMomentum: false
                                        })
                                }
                            }}
                            keyExtractor={(item) => _.has(item, "newData") ? item.newData.unique_id : item.unique_id}
                            onEndReachedThreshold={0.25}
                            onEndReached={(info) => {
                                if (!this.state.onEndReachedCalledDuringMomentum) {
                                    this.setState({
                                        onEndReachedCalledDuringMomentum: true
                                    }, () => {
                                        this.loadMoreContentForWall(info);
                                    })
                                }
                            }}
                        />
                    </View>
                </Fragment>
            );
        } else {
            return (
                <View style={{ marginTop: 100 }}>
                    <SkeletonPlaceholder>
                        <View style={{ width: "100%", height: 50 }} />
                        <View style={{ marginTop: 10 }} />
                        <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 10 }}>
                            <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                            <View style={{ marginLeft: 20 }}>
                            <View style={{ width: 230, height: 20, borderRadius: 4 }} />
                            <View
                                style={{ marginTop: 6, width: 160, height: 20, borderRadius: 4 }}
                            />
                            </View>
                        </View>
                        <View style={{ marginTop: 10 }} />
                        <View style={{ width: "100%", height: 50 }} />
                        <View style={{ marginTop: 10 }} />
                        <View style={{ width: "100%", height: 50 }} />
                        <View style={{ marginTop: 10 }} />
                        <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 10 }}>
                            <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                            <View style={{ marginLeft: 20 }}>
                            <View style={{ width: 230, height: 20, borderRadius: 4 }} />
                            <View
                                style={{ marginTop: 6, width: 160, height: 20, borderRadius: 4 }}
                            />
                            </View>
                        </View>
                        <View style={{ marginTop: 10 }} />
                        <View style={{ width: "100%", height: 50 }} />
                        <View style={{ marginTop: 10 }} />
                        <View style={{ width: "100%", height: 50 }} />
                        <View style={{ marginTop: 10 }} />
                        <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 10 }}>
                            <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                            <View style={{ marginLeft: 20 }}>
                            <View style={{ width: 230, height: 20, borderRadius: 4 }} />
                            <View
                                style={{ marginTop: 6, width: 160, height: 20, borderRadius: 4 }}
                            />
                            </View>
                        </View>
                        <View style={{ marginTop: 10 }} />
                        <View style={{ width: "100%", height: 50 }} />
                        <View style={{ marginTop: 10 }} />
                        <View style={{ width: "100%", height: 50 }} />
                        <View style={{ marginTop: 10 }} />
                        <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 10 }}>
                            <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                            <View style={{ marginLeft: 20 }}>
                            <View style={{ width: 230, height: 20, borderRadius: 4 }} />
                            <View
                                style={{ marginTop: 6, width: 160, height: 20, borderRadius: 4 }}
                            />
                            </View>
                        </View>
                        <View style={{ marginTop: 10 }} />
                        <View style={{ width: "100%", height: 50 }} />
                        <View style={{ marginTop: 10 }} />
                        <View style={{ width: "100%", height: 50 }} />
                        <View style={{ marginTop: 10 }} />
                        <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 10 }}>
                            <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                            <View style={{ marginLeft: 20 }}>
                            <View style={{ width: 230, height: 20, borderRadius: 4 }} />
                            <View
                                style={{ marginTop: 6, width: 160, height: 20, borderRadius: 4 }}
                            />
                            </View>
                        </View>
                        <View style={{ marginTop: 10 }} />
                        <View style={{ width: "100%", height: 50 }} />
                        <View style={{ marginTop: 10 }} />
                        <View style={{ width: "100%", height: 50 }} />
                        <View style={{ marginTop: 10 }} />
                        <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 10 }}>
                            <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                            <View style={{ marginLeft: 20 }}>
                            <View style={{ width: 230, height: 20, borderRadius: 4 }} />
                            <View
                                style={{ marginTop: 6, width: 160, height: 20, borderRadius: 4 }}
                            />
                            </View>
                        </View>
                        <View style={{ marginTop: 10 }} />
                        <View style={{ width: "100%", height: 50 }} />
                    </SkeletonPlaceholder>
                </View>
            );
        }
    }
    renderTimeRequirement = (time) => {
        switch (time) {
            case "more-than-30-hours-week":
                return "More Than 30 Hours/Week";
            case "less-than-30-hours-week":
                return "Less Than 30 Hours/Week";
            case "unknown":
                return "None Specified";
            default: 
                return;
        }
    }
    renderDuration = (length) => {
        switch (length) {
            case "1-3-months":
                return "1-3 Months";
            case "3-6-months":
                return "3-6 Months";
            case "more-than-6-months":
                return "More Than 6 Months";
            case "less-than-1-month":
                return "Less than 1 Month";
            default: 
                return;
        }
    }
    renderCategory = (category) => {
        switch (category) {
            case "web-mobile-software-development":
                return "Web/Mobile Software Dev"                
                break;
            case "mobile-app-development":
                return "Mobile App Dev";
            case "writing":
                return "Writing";
            case "artifical-intelligence-machine-learning":
                return "Artificial Intelligence & Machine Learning";
            case "graphic-design":
                return "Graphic Design";
            case "game-development":
                return "Game Development";
            case "it-networking":
                return "IT-Networking";
            case "translation": 
                return "translation";
            case "sales-marketing":
                return "Sales Marketing";
            case "legal":
                return "legal";
            case "social-media-and-marketing":
                return "Social Media & Marketing";
            case "engineering-and-architecture":
                return "Engineering & Architecture";
            default:
                break;
        }
    }
    _renderItem = ({item, index}) => {
        return (
            <Card style={styles.carddd}>
                <CardItem>
                <Left>
                    {this.renderProfilePictureVideoCustom()}
                    <Body>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.title}</Text>
                    <Text note>Posted on {item.date}</Text>
                    </Body>
                </Left>
                </CardItem>
                <CardItem>
                <Body>
                    <View style={styles.rowTwo}>
                        <View style={styles.columnCustom}>
                            <Text style={styles.topText}>{this.renderTimeRequirement(item.pricing.timeRequirement)}</Text>
                            <Text style={styles.normalText}>Hours Needed</Text>
                            <View style={{ marginTop: 15 }} />
                            <Text style={styles.topText}>Expert</Text>
                            <Text style={styles.normalText}>Experience Level</Text>
                        </View>
                        <View style={styles.columnCustom}>
                            <Text style={styles.topText}>{this.renderDuration(item.pricing.lengthOfProject)}</Text>
                            <Text style={styles.normalText}>Duration</Text>
                            <View style={{ marginTop: 15 }} />
                            <Text style={styles.topText}>{item.multipleOrSingularFreelancersRequired === "multiple-freelancers" ? `Multiple Freelancers(${item.numberOfFreelancersRequired})` : "One Freelancer"}</Text>
                            <Text style={styles.normalText}># Of Freelancers Required</Text>
                        </View>
                    </View>
                    <View style={styles.rowTwo}>
                        <View style={styles.columnCustom}>
                            <Text style={styles.topText}>{item.task}</Text>
                            <Text style={styles.normalText}>Sub Category</Text>
                            <View style={{ marginTop: 15 }} />
                            <Text style={styles.topText}>{item.multipleOrSingularFreelancersRequired === "multiple-freelancers" ? "Multiple Freelancers" : "One Freelancer"}</Text>
                            <Text style={styles.normalText}>Freelancers Required</Text>
                        </View>
                        <View style={styles.columnCustom}>
                            <Text style={styles.topText}>{this.renderCategory(item.category)}</Text>
                            <Text style={styles.normalText}>Type Of Applicant</Text>
                            <View style={{ marginTop: 15 }} />
                            <Text style={styles.topText}>{item.typeOfProject === "complex-project" ? "Complex Project" : item.typeOfProject === "ongoing-project" ? "ongoing Project" : item.typeOfProject === "one-time-project" ? "One-Time Project" : ""}</Text>
                            <Text style={styles.normalText}>Duration</Text>
                        </View>
                    </View>
                    <ReadMore
                        numberOfLines={3}
                        renderTruncatedFooter={this._renderTruncatedFooter}
                        renderRevealedFooter={this._renderRevealedFooter}
                        onReady={this._handleTextReady}>
                        <Text style={styles.cardText}>
                            {item.description}
                        </Text>
                    </ReadMore>
                    <View style={styles.hr} />
                    <Text style={styles.pricingText}>{item.pricing.fixedOrHourly === "hourly" ? `$${item.pricing.minHourly.toFixed(2)} to $${item.pricing.maxHourly.toFixed(2)} per hour` : `$${item.pricing.fixedBudgetPrice.toFixed(2)} upon completion of project`}</Text>
                </Body>
                </CardItem>
                <CardItem>
                    <ScrollView showsHorizontalScrollIndicator={false} style={styles.scroller} horizontal={true}>
                        {typeof item.selectedTags !== 'undefined' && item.selectedTags.length > 0 ? item.selectedTags.map((tag, index) => {
                            return (
                                <View style={styles.tagger}>
                                    <Text style={styles.tag}>{tag}</Text>
                                </View>
                            );
                        }) : null}
                    </ScrollView>
                </CardItem>
                <CardItem>
                    <AwesomeButtonCartman type={"anchor"} textColor={"white"} onPress={() => {
                        this.props.props.navigation.push("view-job-individual", { item });
                    }} stretch={true}>Visit Listing</AwesomeButtonCartman>
                </CardItem>
            </Card>
        );
    }
    _renderTruncatedFooter = (handlePress) => {
        return (
          <Text style={{color: "blue", marginTop: 10, fontWeight: "bold" }} onPress={handlePress}>
            Read more
          </Text>
        );
    }
     
    _renderRevealedFooter = (handlePress) => {
        return (
          <Text style={{color: "blue", marginTop: 10, fontWeight: "bold" }} onPress={handlePress}>
            Show less
          </Text>
        );
    }
    render() {
        console.log("this.state.publicProfile", this.state);

        const { user } = this.state;

        const passed = this.props.props.route.params.item;
        return (
            <Fragment>
                <Header style={styles.headerGrey}>
                    <Left>
                        <Button onPress={() => {
                            this.props.props.navigation.goBack();
                        }} transparent>
                            <Image source={require("../../../assets/icons/go-back.png")} style={[styles.headerIcon, { tintColor: "#ffffff" }]} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={styles.whiteText}>Public Profile</Title>
                        <Subtitle style={styles.whiteText}>View wall, photos & more...</Subtitle>
                    </Body>
                    <Right />
                </Header>
                <View>
                    <Dialog.Container visible={this.state.isVisible}>
                    <Dialog.Title>Send Friend Request?</Dialog.Title>
                    <Dialog.Description>
                        Are you sure you'd like to send this friend request?
                    </Dialog.Description>
                    <Dialog.Button onPress={() => {
                        this.setState({
                            isVisible: false
                        })
                    }} label="Cancel" />
                    <Dialog.Button onPress={() => {
                        this.setState({
                            isVisible: false
                        }, () => {
                            this.sendFriendRequest();
                        })
                    }} label="SEND" />
                    </Dialog.Container>
                </View>
                <ScrollView contentContainerStyle={{ paddingBottom: 50 }} style={styles.container}>
                    <ImageBackground source={this.renderImage()} style={styles.header}>
                            
                    </ImageBackground>
                    <TouchableOpacity style={styles.avatar} onPress={() => {
                        
                    }}>
                        {this.renderProfilePictureVideo()}
                    </TouchableOpacity>
                        {this.renderContent()}
                    
                </ScrollView>
                {user !== null ? <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    height={height}
                    openDuration={250}
                    customStyles={{
                        container: {
                            
                        }
                    }}
                >
                    <Header style={{ backgroundColor: "#303030" }}>
                        <Left>
                            <Button onPress={() => {
                                this.RBSheet.close();
                            }} transparent>
                                <Image source={require("../../../assets/icons/close.png")} style={[styles.headerIcon, { tintColor: "#ffffff" }]} />
                            </Button>
                        </Left>
                        <Body style={{ width: 250, minWidth: 250 }}>
                            <Title style={Platform.OS === "android" ? { textAlign: "left", marginLeft: 30, color: "#ffffff" } : { textAlign: "left", color: "#ffffff" }}>Message {`${user.firstName} ${user.lastName}`}</Title>
                        </Body>
                        <Right />
                    </Header>
                    <View style={styles.container}>
                        <Item regular>
                            <Input placeholderTextColor={"grey"} value={this.state.subject} onChangeText={(value) => {
                                this.setState({
                                    subject: value
                                })
                            }} placeholder={"Subject and/or title..."} />
                        </Item>
                        <Textarea style={styles.textarea} bordered placeholderTextColor={"grey"} value={this.state.message} onChangeText={(value) => {
                                this.setState({
                                    message: value
                                })
                        }} placeholder={"Write a message..."} />
                        <TouchableOpacity onPress={this.sendPrivateMessage} style={styles.bottomRightSend}>
                            <View style={styles.rowCustom}>
                                <Image source={require("../../../assets/icons/send.png")} style={styles.sendIcon} />
                                <Text style={styles.specialTextSend}>Send Message</Text>
                            </View>
                        </TouchableOpacity>    
                    </View>
                </RBSheet> : null}
                {this.state.selected !== null ? <SlidingUpPanel allowDragging={false} ref={c => this._panel = c}>
                    <TouchableOpacity onPress={() => {
                        this._panel.hide();
                    }} style={styles.touchableTwo}>
                        <Image source={require("../../../assets/icons/close.png")} style={styles.closeIcon} />
                    </TouchableOpacity>
                    <RenderSlideUpPane  selected={this.state.selected} props={this.props.props} />
                </SlidingUpPanel> : null}
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.signupData.authData.unique_id,
        fullName: `${state.signupData.authData.firstName} ${state.signupData.authData.lastName}`,
        username: state.signupData.authData.username
    }
}
export default connect(mapStateToProps, { })(PublicProfileOtherUserHelper);