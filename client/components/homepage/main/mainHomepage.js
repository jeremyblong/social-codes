import React, { Component, Fragment, useRef } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Dimensions, Keyboard, RefreshControl, Animated, FlatList, ActivityIndicator, SafeAreaView, Platform } from "react-native";
import styles from "./styles.js";
import { Header, Left, Body, Right, Button, Icon, Footer, FooterTab, Badge, Title, Subtitle, Textarea, List, ListItem, Card, CardItem, Thumbnail } from 'native-base';
import LottieView from 'lottie-react-native';
import axios from "axios";
import Config from "react-native-config";
import SideMenu from "react-native-side-menu";
import Side from "../../navigation/sidemenu/index.js";
import { connect } from "react-redux";
import RBSheet from "react-native-raw-bottom-sheet";
import SlidingUpPanel from 'rn-sliding-up-panel';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Popover from 'react-native-popover-view';
import Spinner from 'react-native-loading-spinner-overlay';
import Video from 'react-native-video';
import ReadMore from 'react-native-read-more-text';
import ProgressiveImage from "../../lazyLoadImage.js";
import Gallery from 'react-native-image-gallery';
import _ from 'lodash';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Toast from 'react-native-toast-message';
import SharedItemPostHelper from "./helpers/posts/sharedPost.js";
import Loading from "../../../loading.js";
import ShareLocationSlideUpPaneHelper from "./slideUpPanes/location/shareLocation.js";
import RBSheetCustomHelper from "./slideUpPanes/RBSheetCustom/index.js";
import { wallPostsAdd } from "../../../actions/wall/wall.js";
import BottomSheetCustomHelper from "./slideUpPanes/share/sharePost.js";
import MapView, { Marker } from 'react-native-maps';
import { addPostCreationOptions, addVideoToWallQueue } from "../../../actions/wall/wall.js";
import MentionsTextInput from 'react-native-mentions';
import Highlighter from 'react-native-highlight-words';
import UploadVideoPaneHelper from "./slideUpPanes/uploadVideo/videoPane.js";
import InView from 'react-native-component-inview';


const { width, height } = Dimensions.get("window");


class HomepageMainPage extends Component {
constructor () {
    super();

    this.state = {
        data: [],
        activeJobs: [],
        pictures: [],
        showDismiss: false,
        countFrom: 5,
        conditionalRender: false,
        images: [],
        wallText: "",
        type: null,
        visibility: "friends",
        spinner: false,
        visible: false,
        showPageOne: false,
        like: "",
        allImages: [],
        profilePic: null,
        index: 0,
        selectedImage: null,
        selectedPost: null,
        pickedOutPost: null,
        responses: [],
        user: null,
        friends: [],
        refreshing: false,
        ready: false,
        text: "",
        postLoaded: false,
        loadingMoreContent: false,
        scrolling: false,
        alreadyPooled: [],
        stored: [],
        taggedUsers: []
    }

    this.sheetRef = React.createRef();
    this.CheckinRBSheet = React.createRef();
    this.UploadVideoPane = React.createRef();
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
    renderOne() {
        const {images} = this.state;
        const {countFrom} = this.state;
        return(
        <View style={{ flexDirection: "row", minHeight: 375, height: 375 }}>
            <TouchableOpacity style={[styles.imageContent, styles.imageContent1]} onPress={() => {
                this.setState({
                    images: this.state.images.filter((picture, index) => {
                        if (picture.uri !== images[0].uri) {
                            return picture;
                        }
                    })
                })
            }}>
                <Image style={styles.image} source={{uri: images[0].uri }}/>
            </TouchableOpacity>
        </View>
        );
    }

    renderTwo() {
        const {images} = this.state;
        const {countFrom} = this.state;
        const conditionalRender = [3, 4].includes(images.length) || images.length > +countFrom && [3, 4].includes(+countFrom);

        return(
        <View style={{ flexDirection: "row" }}>
            <TouchableOpacity style={[styles.imageContent, styles.imageContent2]} onPress={() => {
                this.setState({
                    images: this.state.images.filter((picture, index) => {
                        if ((conditionalRender)) {
                            if (picture.uri !== images[1].uri) {
                                return picture;
                            }
                        } else {
                            if (picture.uri !== images[0].uri) {
                                return picture;
                            }
                        }
                    })
                })
            }}>
            <Image style={styles.image} source={{uri: (conditionalRender) ? images[1].uri : images[0].uri }}/>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.imageContent, styles.imageContent2]} onPress={() => {
                this.setState({
                    images: this.state.images.filter((picture, index) => {
                        if ((conditionalRender)) {
                            if (picture.uri !== images[2].uri) {
                                return picture;
                            }
                        } else {
                            if (picture.uri !== images[1].uri) {
                                return picture;
                            }
                        }
                    })
                })
            }}>
            <Image style={styles.image} source={{uri: (conditionalRender) ? images[2].uri : images[1].uri }}/>
            </TouchableOpacity>
        </View>
        );
    }

    renderThree() {
        const {images} = this.state;
        const {countFrom} = this.state;
        const overlay = !countFrom || countFrom > 5 || images.length > countFrom && [4, 5].includes(+countFrom) ? this.renderCountOverlay(true) : this.renderOverlay();
        const conditionalRender = images.length == 4 || images.length > +countFrom && +countFrom == 4;

        return(
        <View style={{ flexDirection: "row" }}>
            <TouchableOpacity style={[styles.imageContent, styles.imageContent3]} onPress={() => {
                this.setState({
                    images: this.state.images.filter((picture, index) => {
                        if ((conditionalRender)) {
                            if (picture.uri !== images[1].uri) {
                                return picture;
                            }
                        } else {
                            if (picture.uri !== images[0].uri) {
                                return picture;
                            }
                        }
                    })
                })
            }}>
            <Image style={styles.image} source={{uri: (conditionalRender) ? images[1].uri : images[2].uri }}/>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.imageContent, styles.imageContent3]} onPress={() => {
                this.setState({
                    images: this.state.images.filter((picture, index) => {
                        if ((conditionalRender)) {
                            if (picture.uri !== images[2].uri) {
                                return picture;
                            }
                        } else {
                            if (picture.uri !== images[3].uri) {
                                return picture;
                            }
                        }
                    })
                })
            }}>
            <Image style={styles.image} source={{uri: (conditionalRender) ? images[2].uri : images[3].uri }}/>
            </TouchableOpacity>
            {overlay}
        </View>
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
    componentDidMount() {
        axios.get("https://randomuser.me/api/?results=30").then((res) => {
            if (res.data) {
                console.log(res.data);

                const { results } = res.data;

                this.setState({
                    data: results
                })
            } else {
                console.log(res.data);
            }
        }).catch((err) => {
            console.log(err);
        });

        axios.get(`${Config.ngrok_url}/gather/users/usernames/fullnames/friends`, {
            params: {
                id: this.props.unique_id
            }
        }).then((res) => {

            if (res.data.message === "Located friends to tag!") {
                console.log(res.data);

                const { friends, user } = res.data;

                this.setState({
                    friends,
                    user,
                    stored: friends
                })
            } else {
                console.log(res.data);
            }
        }).catch((err) => {
            console.log(err);
        });

        axios.get(`${Config.ngrok_url}/gather/all/wall/posts`).then((res) => {
            if (res.data.message === "Gathered posts!") {
                console.log(res.data);

                const { posts } = res.data;

                const pooled = [];

                const promiseee = new Promise((resolve, reject) => {
                    if (typeof posts !== "undefined" && posts.length > 0) {
                        for (let index = 0; index < posts.length; index++) {
                            const post = posts[index];
                            if (_.has(post, "newData")) {
                                pooled.push(post.newData.id);
    
                                if ((posts.length - 1 ) === index) {
                                    resolve(pooled);
                                }
                            } else {
                                pooled.push(post.id);
    
                                if ((posts.length - 1 ) === index) {
                                    resolve(pooled);
                                }
                            }
                        }
                    } else {
                        resolve([]);
                    }
                })

                promiseee.then((passedValues) => {

                    this.props.wallPostsAdd(posts);

                    this.setState({
                        ready: true,
                        postLoaded: true,
                        alreadyPooled: passedValues
                    })
                })
            } else {
                console.log(res.data);
            }
        }).catch((err) => {
            console.log(err);
        });
    }
    launchImageLibrary = () => {
        console.log("launchImageLibrary clicked");

        const options = {
            mediaType: "photo",
            quality: 1,
            includeBase64: true
        }

        launchImageLibrary(options, this.handleImageUpload)
    }
    handleImageUpload = (data) => {
        console.log("handleImageUpload", data);

        if (_.has(data, "base64")) {
            data.index = this.state.images.length + 1;

            this.setState({
                images: [...this.state.images, data]
            }, () => {
                this._panel.hide();
            })
        }
    }
    handlePostUpload = () => {
        const { images, visibility, wallText, taggedUsers } = this.state;

        const { selection } = this.props;

        const pics = [];

        const formData = new FormData();

        this.setState({
            spinner: true
        }, () => {
            const promiseee = new Promise((resolve, reject) => {
                if (typeof images !== "undefined" && images.length > 0) {
                    for (let index = 0; index < images.length; index++) {
                        const custom = images[index];
                        
                        formData.append("pictures", { uri: custom.uri, name: custom.fileName, type: custom.type });
                        
                        if ((images.length - 1) === index) {
                            resolve();
                        }
                    }
                } else {
                    resolve();
                }
            })
            promiseee.then(() => {
                formData.append("text", wallText);
                formData.append("id", this.props.unique_id);
                formData.append("visibility", visibility);
                formData.append("taggedUsers", JSON.stringify(taggedUsers));
                formData.append("username", this.props.username);
                formData.append("fullName", this.props.fullName);
                formData.append("prep", JSON.stringify(this.props.prep));

                if (selection !== null && Object.keys(selection).length > 0) {

                    formData.append("selection", JSON.stringify(selection));

                    axios({
                        method: "post",
                        url: `${Config.ngrok_url}/post/wall/post`,
                        data: formData,
                        headers: { 
                            "Content-Type": "multipart/form-data" 
                        },
                    }).then((res) => {
                        if (res.data.message === "Posted wall post!") {
                            console.log(res.data);
        
                            this.setState({
                                spinner: false
                            }, () => {
                                this.RBSheet.close();
                            })
                        } else {
                            console.log("err", res.data);
        
                            this.setState({
                                spinner: false
                            })
                        }
                    }).catch((err) => {
                        console.log(err);
        
                        this.setState({
                            spinner: false
                        })
                    })
                } else {
                    axios({
                        method: "post",
                        url: `${Config.ngrok_url}/post/wall/post`,
                        data: formData,
                        headers: { 
                            "Content-Type": "multipart/form-data" 
                        },
                    }).then((res) => {
                        if (res.data.message === "Posted wall post!") {
                            console.log(res.data);
        
                            this.setState({
                                spinner: false
                            }, () => {
                                this.RBSheet.close();
                            })
                        } else {
                            console.log("err", res.data);
        
                            this.setState({
                                spinner: false
                            })
                        }
                    }).catch((err) => {
                        console.log(err);
        
                        this.setState({
                            spinner: false
                        })
                    })
                }
            })
        });
    }
    // redirectToUsersProfile = (user) => {
    //     this.props.props.navigation.push("individual-profile-public", { item: { unique_id: user.poster }});
    // }
    renderPhotoOrVideo = (post, maxDimension) => {
        if (typeof post.profilePics !== 'undefined' && post.profilePics !== null && post.profilePics.length > 0) {
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
                            style={{ minWidth: 50, maxWidth: typeof maxDimension !== "undefined" ? maxDimension : null, maxHeight: typeof maxDimension !== "undefined" ? maxDimension : null, minHeight: 50, borderRadius: 5, bottom: -2.5 }}
                        />
                    </TouchableOpacity>
                );
            } else {
                const picture = post.profilePics[post.profilePics.length - 1].picture;
                return (
                    <TouchableOpacity onPress={() => {
                        this.redirectToUsersProfileWithoutPane(post);
                    }}>
                        <Thumbnail source={{ uri: `${Config.wasabi_url}/${picture}` }} style={{ minWidth: typeof maxDimension !== "undefined" ? maxDimension : 50, minHeight: typeof maxDimension !== "undefined" ? maxDimension : 50, maxWidth: typeof maxDimension !== "undefined" ? maxDimension : null, maxHeight: typeof maxDimension !== "undefined" ? maxDimension : null, borderRadius: 5, bottom: -2.5 }} />
                    </TouchableOpacity>
                );
            }
        } else if (post.photo !== null && typeof post.photo !== "undefined") {
            return (
                <TouchableOpacity onPress={() => {
                    this.redirectToUsersProfileWithoutPane(post);
                }}>
                    <Thumbnail source={{ uri: post.photo }} style={{ minWidth: typeof maxDimension !== "undefined" ? maxDimension : 50, minHeight: typeof maxDimension !== "undefined" ? maxDimension : 50, maxWidth: typeof maxDimension !== "undefined" ? maxDimension : null, maxHeight: typeof maxDimension !== "undefined" ? maxDimension : null, borderRadius: 5, bottom: -2.5 }} />
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity onPress={() => {
                    this.redirectToUsersProfileWithoutPane(post);
                }}>
                    <Thumbnail source={{ uri: Config.no_image_avaliable }} style={{ minWidth: typeof maxDimension !== "undefined" ? maxDimension : 50, minHeight: typeof maxDimension !== "undefined" ? maxDimension : 50, maxWidth: typeof maxDimension !== "undefined" ? maxDimension : null, maxHeight: typeof maxDimension !== "undefined" ? maxDimension : null, borderRadius: 5, bottom: -2.5 }} />
                </TouchableOpacity>
            );
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
    
                const checkIndex = this.props.posts.findIndex(({ id }) => {
                    if (id === alteredID) {
                        return id;
                    }
                });

                console.log("checkIndex ADDED LIKE: ", checkIndex);
    
                if (checkIndex !== -1) {
                    
                    const copy = [...this.props.posts];
    
                    copy[checkIndex] = post;

                    this.props.wallPostsAdd(copy);
    
                    this.setState({
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
                
                const checkIndex = this.props.posts.findIndex(({ id }) => {
                    if (id === post.id) {
                        return id;
                    }
                });
                
                console.log("check index REMOVE LIKE....:", checkIndex);

                if (checkIndex !== -1) {
                    
                    const copy = [...this.props.posts];
    
                    copy[checkIndex] = post;

                    this.props.wallPostsAdd(copy);
    
                    this.setState({
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
    redirectToUsersProfile = (user) => {
        this._panelCustom.hide();

        this.RBSheetCustom.close();

        setTimeout(() => {
            this.props.props.navigation.push("individual-profile-public", { item: { unique_id: user.reactingPersonID }});
        }, 1000);
    }
    redirectToUsersProfileWithoutPane = (post) => {
        this.props.props.navigation.push("individual-profile-public", { item: { unique_id: post.poster }});
    }
    onRefresh = () => {
        console.log("refreshing...");

        this.setState({
            refreshing: true
        }, () => {
            axios.get(`${Config.ngrok_url}/gather/user`, {
                params: {
                    id: this.props.unique_id
                }
            }).then((res) => {
    
                if (res.data.message === "Located the desired user!") {
                    console.log(res.data);
    
                    const { user } = res.data;
    
                    this.setState({
                        user
                    })
                } else {
                    console.log(res.data);
                }
            }).catch((err) => {
                console.log(err);
            });
            
            axios.get(`${Config.ngrok_url}/gather/all/wall/posts`).then((res) => {
                if (res.data.message === "Gathered posts!") {
                    console.log(res.data);
    
                    const { posts } = res.data;

                    this.props.wallPostsAdd(posts);
    
                    this.setState({
                        refreshing: false,
                        ready: true,
                        postLoaded: true
                    })
                } else {
                    console.log(res.data);

                    this.setState({
                        refreshing: false,
                        ready: true
                    })
                }
            }).catch((err) => {
                console.log(err);

                this.setState({
                    refreshing: false,
                    ready: true
                })
            });
        })
    }
    renderAfterInitialLoad = () => {
        const { ready } = this.state;
        const { posts } = this.props;

        if (ready === false) {
            return (
                <View style={{ margin: 15 }}>
                    <SkeletonPlaceholder>
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ flexDirection: "column", width: width * 0.40, minHeight: 240, marginTop: 5 }}></View>
                                <View style={{ flexDirection: "column" }}>
                                    <View style={{ flexDirection: "row", width: width * 0.50, height: 56.25, marginLeft: 10, marginTop: 5 }} />
                                    <View style={{ flexDirection: "row", width: width * 0.50, height: 56.25, marginLeft: 10, marginTop: 5 }} />
                                    <View style={{ flexDirection: "row", width: width * 0.50, height: 56.25, marginLeft: 10, marginTop: 5 }} />
                                    <View style={{ flexDirection: "row", width: width * 0.50, height: 56.25, marginLeft: 10, marginTop: 5 }} />
                                </View>
                            </View>
                        </SkeletonPlaceholder>
                        <View style={{ marginTop: 20 }} />
                        <SkeletonPlaceholder>
                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ flexDirection: "column", width: width * 0.40, minHeight: 240, marginTop: 5 }}></View>
                                    <View style={{ flexDirection: "column" }}>
                                        <View style={{ flexDirection: "row", width: width * 0.50, height: 56.25, marginLeft: 10, marginTop: 5 }} />
                                        <View style={{ flexDirection: "row", width: width * 0.50, height: 56.25, marginLeft: 10, marginTop: 5 }} />
                                        <View style={{ flexDirection: "row", width: width * 0.50, height: 56.25, marginLeft: 10, marginTop: 5 }} />
                                        <View style={{ flexDirection: "row", width: width * 0.50, height: 56.25, marginLeft: 10, marginTop: 5 }} />
                                    </View>
                                </View>
                        </SkeletonPlaceholder>
                        <View style={{ marginTop: 20 }} />
                        <SkeletonPlaceholder>
                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ flexDirection: "column", width: width * 0.40, minHeight: 240, marginTop: 5 }}></View>
                                    <View style={{ flexDirection: "column" }}>
                                        <View style={{ flexDirection: "row", width: width * 0.50, height: 56.25, marginLeft: 10, marginTop: 5 }} />
                                        <View style={{ flexDirection: "row", width: width * 0.50, height: 56.25, marginLeft: 10, marginTop: 5 }} />
                                        <View style={{ flexDirection: "row", width: width * 0.50, height: 56.25, marginLeft: 10, marginTop: 5 }} />
                                        <View style={{ flexDirection: "row", width: width * 0.50, height: 56.25, marginLeft: 10, marginTop: 5 }} />
                                    </View>
                                </View>
                        </SkeletonPlaceholder>
                        <View style={{ marginTop: 20 }} />
                        <SkeletonPlaceholder>
                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ flexDirection: "column", width: width * 0.40, minHeight: 240, marginTop: 5 }}></View>
                                    <View style={{ flexDirection: "column" }}>
                                        <View style={{ flexDirection: "row", width: width * 0.50, height: 56.25, marginLeft: 10, marginTop: 5 }} />
                                        <View style={{ flexDirection: "row", width: width * 0.50, height: 56.25, marginLeft: 10, marginTop: 5 }} />
                                        <View style={{ flexDirection: "row", width: width * 0.50, height: 56.25, marginLeft: 10, marginTop: 5 }} />
                                        <View style={{ flexDirection: "row", width: width * 0.50, height: 56.25, marginLeft: 10, marginTop: 5 }} />
                                    </View>
                                </View>
                        </SkeletonPlaceholder>
                    </View>
            );
        } else if (ready === true && typeof posts !== "undefined" && posts.length === 0) {
            return (
                <Fragment>
                    <View style={[styles.centeredSlideUp, { margin: 30 }]} onPress={() => {}}>
                        <Text style={styles.largerText}>We experienced an error loading the page, pull <Text style={{ textDecorationLine: "underline" }}>DOWN</Text> to reload the page...</Text>
                        <View style={styles.hr} />
                        <Image source={require("../../../assets/icons/swipe-down.png")} style={[styles.centeredSlideUp, { maxWidth: 150, maxHeight: 150, minWidth: 150, minHeight: 150 }]} />
                    </View>
                </Fragment>
            );
        } else {
            return null;
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
    
                const checkIndex = this.props.posts.findIndex(({ id }) => {
                    if (id === alteredID) {
                        return id;
                    }
                });

                console.log("checkIndex ADDED LIKE: ", checkIndex);
    
                if (checkIndex !== -1) {
                    
                    const copy = [...this.props.posts];
    
                    copy[checkIndex] = post;

                    this.props.wallPostsAdd(copy);
    
                    this.setState({
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
    revokeSharedLikeResponse = (post) => {
        console.log("revokeSharedLikeResponse", post);

        axios.post(`${Config.ngrok_url}/like/react/post/wall/revoke/remove/shared`, {
            post,
            id: this.props.unique_id
        }).then((res) => {
            if (res.data.message === "Revoke/remove like!") {
                console.log(res.data);

                const { post } = res.data;
                
                const checkIndex = this.props.posts.findIndex(({ id }) => {
                    if (id === post.id) {
                        return id;
                    }
                });
                
                console.log("check index REMOVE LIKE....:", checkIndex);

                if (checkIndex !== -1) {
                    
                    const copy = [...this.props.posts];
    
                    copy[checkIndex] = post;

                    this.props.wallPostsAdd(copy);
    
                    this.setState({
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
    handleRedirectToIndividualPage = (post) => {
        this.props.props.navigation.push("individual-wall-posting-view", { post })
    }
    loadMoreContentForWall = (info) => {

        console.log("LOAD MORE CONTENT FOR WALL............", info);

        if (info.distanceFromEnd >= 0) {
            axios.get(`${Config.ngrok_url}/gather/more/wall/posts/unique`, {
                params: {
                    alreadyPooled: this.state.alreadyPooled
                }
            }).then((res) => {
                if (res.data.message === "Gathered MORE posts!") {
                    console.log(res.data);
    
                    const { posts } = res.data;
    
                    const pooled = [];
    
                    const promiseee = new Promise((resolve, reject) => {
                        for (let index = 0; index < posts.length; index++) {
                            const post = posts[index];
    
                            if (_.has(post, "newData")) {
                                
                                pooled.push(post.newData.id);
    
                                if ((posts.length - 1 ) === index) {
                                    resolve(pooled);
                                }
                            } else {
                                pooled.push(post.id);
    
                                if ((posts.length - 1 ) === index) {
                                    resolve(pooled);
                                }
                            }
                        }
                    })
    
                    promiseee.then((passedValues) => {

                        this.props.wallPostsAdd([...this.props.posts, ...posts]);
    
                        this.setState({
                            loadingMoreContent: false,
                            alreadyPooled: [...this.state.alreadyPooled, ...passedValues],
                            scrolling: false,
                            onEndReachedCalledDuringMomentum: false
                        })
                    })
                } else {
                    console.log("ERr", res.data);
    
                    this.setState({
                        loadingMoreContent: false,
                        scrolling: false,
                        onEndReachedCalledDuringMomentum: false
                    })
                }
            }).catch((err) => {
                console.log(err);
    
                this.setState({
                    loadingMoreContent: false,
                    scrolling: false,
                    onEndReachedCalledDuringMomentum: false
                })
            })
        }
    }   
    renderFooter = () => {
        if (this.state.loadingMoreContent === true) {
            return <Loading />;
        } else {
            return null;
        }
    }
    openBottomSheetCustom = () => {
        this.sheetRef.current.open();
    }
    renderNameAndActivity = () => {
        const { selection } = this.props;
        return (
            <Text style={styles.fullName}>{this.props.fullName}{selection !== null ? <Fragment><Text style={{ fontWeight: "normal", top: 10 }}> is at </Text>{selection.poi.name}</Fragment> : ""}</Text>
        );
    }
    renderSuggestionsRow = ({ item }, hidePanel) => {
        console.log("item", item);
        return (
            <TouchableOpacity onPress={() => {
                this.onSuggestionTap(item.acquaintanceUsername, hidePanel)
            }}>
              <View style={styles.suggestionsRowContainer}>
                <View style={styles.userIconBox}>
                  <Text style={styles.usernameInitials}>{item.acquaintance.split(" ")[0].split("")[0].toUpperCase()}{item.acquaintance.split(" ")[1].split("")[0].toUpperCase()}</Text>
                </View>
                <View style={styles.userDetailsBox}>
                  <Text style={styles.displayNameText}>{item.acquaintance}</Text>
                  <Text style={styles.usernameText}>@{item.acquaintanceUsername}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )
    }
    onSuggestionTap = (username, hidePanel) => {
        console.log("username", username);

        this.setState({
            wallText: this.state.wallText + username,
            taggedUsers: [...this.state.taggedUsers, username]
        }, () => {
            hidePanel();
        });
    }
    checkUsernames = () => {
        const split = this.state.wallText.split(" ");

        const taggedUsers = [];

        for (let index = 0; index < split.length; index++) {
            let char = split[index];

            if (char.includes("@") && char.split("@")[1].length > 0) {

                if (char.includes("’")) {
                    char = char.split("’")[0];
                } else if (char.includes('”')) {
                    char = char.split('”')[0];
                } else if (char.includes(";")) {
                    char = char.split(';')[0];
                }

                console.log("char", char);

                const regexed = char.split("@")[1].replace(/[\W_]+/g, "");

                taggedUsers.push(regexed);
            }
        }

        this.setState({
            taggedUsers: [...new Set(this.state.taggedUsers.filter((username) => {
                if (taggedUsers.indexOf(username) !== -1) {
                    return username;
                } 
            }))]
        })
    }
    wallPostCallback = (data) => {
        console.log("callback ", data);

        if (data === "@") {
            this.setState({
                friends: typeof this.state.stored !== "undefined" && this.state.stored.length > 0 ? [...this.state.stored] : []
            })
        } else {
            this.setState({
                friends: typeof this.state.friends !== "undefined" && this.state.friends.length > 0 ? this.state.friends.filter((friend) => {
                    if (friend.acquaintanceUsername.includes(data.split("@")[1])) {
                        return friend;
                    }
                }) : []
            })
        }
    }
    onChangeTextMainInput = (wallText) => {
        console.log("wallText", wallText);

        this.setState({
            wallText
        })
    }
    errored = (error) => {
        console.log("error", error);
    }
    completedEditing = (event) => {
        console.log("event", event);
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
    lookupCompany = (info) => {
        console.log("company info", info);
    }
    checkHighlight = (post) => {
        if (typeof post.taggedUsers !== "undefined" && _.has(post, "taggedUsers") && Array.isArray(post["taggedUsers"]) && post.taggedUsers !== null && post.taggedUsers.length > 0) {
            return true;
        } else {
            return false;
        }
    }
    handlePlaying = (isVisible, index) => {
        console.log("isvisible", isVisible);
        if (this.state.postLoaded === true && this.state[`playing-${index}`] !== true) {
            console.log("SETSTATE");
            this.setState({
                [`playing-${index}`]: true
            })
        }
    }
    render() {
        const menu = <Side props={this.props} />;

        const { posts, selection } = this.props;

        const { countFrom, selectedPost, ready, user, data, pictures, images } = this.state;

        const imagesToShow = [...images];

        if(countFrom && images.length > countFrom) {
            imagesToShow.length = countFrom;
        }

        console.log("mainHomepage state:", this.state);
        return (
            <Fragment>
            <SideMenu openMenuOffset={width * 0.80} menuPosition={"right"} isOpen={this.state.menuOpen} menu={menu}>
                <TouchableOpacity onPress={() => {
                    this.setState({
                        menuOpen: !this.state.menuOpen
                    })
                }} style={styles.bottomRightCorner}>
                    <Image source={require("../../../assets/icons/circle-menu.png")} style={styles.circleMenu} />
                </TouchableOpacity>
                <Toast ref={(ref) => Toast.setRef(ref)} /> 
                <SafeAreaView>    
                <View style={Platform.OS === "android" ? styles.containerAndroid : styles.containerIos}>              
                    {ready === true ? <FlatList   
                        ListHeaderComponent={() => {
                            return (
                                <View style={{ height: 340, minHeight: 340 }}>
                                    <Header style={{ borderBottomColor: "transparent", backgroundColor: "#303030", paddingTop: 15, paddingBottom: 10, height: 100 }}>
                                        <Left>
                                            <Button transparent>
                                                <Image source={require("../../../assets/images/social_code_long.png")} style={styles.maxedIconLogo} />
                                            </Button>
                                        </Left>
                                        <Body>
                                    
                                        </Body>
                                        <Right style={{ position: "absolute", right: -15 }}>
                                            
                                            <Button transparent>
                                                <Icon style={{ color: "#fdd530" }} name='search' />
                                            </Button>
                                            <Button button={true} onPress={() => {
                                                this.props.props.navigation.push("messaging-conversations");
                                            }} transparent>
                                                <Image source={require("../../../assets/icons/chat.png")} style={[styles.maxedIcon, { tintColor: "#fdd530" }]} />
                                            </Button>
                                        </Right>
                                    </Header>
                                    <Footer style={{ borderColor: "transparent", height: 65 }}>
                                        <FooterTab style={{ backgroundColor: "#303030" }}>
                                            <Button style={{ backgroundColor: "#fdd530" }} active>
                                                <Image source={require("../../../assets/icons/home.png")} style={[styles.maxedIconSmall, { tintColor: "#303030" }]} />
                                            </Button>
                                            <Button button={true} onPress={() => {
                                                this.props.props.navigation.push("jobs-homepage");
                                            }}>
                                                <Image source={require("../../../assets/icons/seeker.png")} style={[styles.maxedIconSmallCustom, { tintColor: "#fdd530" }]} />
                                            </Button>
                                            <Button button={true} onPress={() => {
                                                this.props.props.navigation.push("people-list-all");
                                            }}>
                                                <Image source={require("../../../assets/icons/people.png")} style={[styles.maxedIconSmall, { tintColor: "#fdd530" }]} />
                                            </Button>
                                            <Button button={true} onPress={() => {
                                                this.props.props.navigation.push("notifications");
                                            }}>
                                                <Image source={require("../../../assets/icons/bell.png")} style={[styles.maxedIconSmall, { tintColor: "#fdd530" }]} />
                                                {/* <LottieView source={require('../../../assets/icons/notify-gold.json')} autoPlay loop /> */}
                                                <Badge style={styles.absoluteBadge}><Text style={{ color: "white", fontSize: 10 }}>51</Text></Badge>
                                            </Button>
                                            <Button onPress={() => {
                                                this.props.props.navigation.push("navigation-menu-main");
                                            }}>
                                                <Image source={require("../../../assets/icons/menu.png")} style={[styles.maxedIconSmall, { tintColor: "#fdd530" }]} />
                                            </Button>
                                        </FooterTab>
                                    </Footer>
                                    
                                    <Footer style={Platform.OS === "android" ? { borderColor: "transparent", height: 50 } : { borderColor: "transparent", height: 50 }}>
                                        <FooterTab>
                                            <Button style={styles.greyButton}>
                                                <View style={styles.row}>
                                                    <Image source={require("../../../assets/icons/video-on.png")} style={[styles.maxedIconSmallTwo, { tintColor: "#fdd530" }]} />
                                                    <Text style={styles.iconText}>Go Live</Text>
                                                </View>
                                            </Button>
                                            <Button style={styles.greyButton}>
                                                <View style={styles.row}>
                                                    <Image source={require("../../../assets/icons/gallery.png")} style={[styles.maxedIconSmallTwo, { tintColor: "#fdd530" }]} />
                                                    <Text style={styles.iconText}>Photo</Text>
                                                </View>
                                            </Button>
                                            <Button style={styles.greyButton}>
                                                <View style={styles.row}>
                                                    <Image source={require("../../../assets/icons/job.png")} style={[styles.maxedIconSmallTwo, { tintColor: "#fdd530" }]} />
                                                    <Text style={styles.iconText}>Active Jobs</Text>
                                                </View>
                                            </Button>
                                        </FooterTab>
                                    </Footer>
                                    {/* <View style={styles.thickLine} /> */}
                                    <View style={[styles.row, { height: 100 }]}>
                                        {user !== null ? <View style={styles.columnSmall}>
                                            {this.renderPhotoOrVideo(user, 45)}
                                        </View> : <Fragment><View style={styles.loadingProfileOutter}><View style={styles.loadingProfilePic}></View></View></Fragment>}
                                        <TouchableOpacity onPress={() => {
                                            console.log("clicked");
                                            
                                            this.RBSheet.open();
                                        }} style={styles.columnLarge}>
                                            <View style={{ height: 45, borderColor: '#ffd530', borderWidth: 1, borderRadius: 5, maxWidth: "90%", marginBottom: 5, paddingLeft: 15 }} >
                                                <Text style={{ marginTop: 12, fontSize: 15, color: "white" }}>What's got ya thinkin'...</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    {/* <View style={styles.thickLine} /> */}
                                    <ScrollView showsHorizontalScrollIndicator={false} style={styles.horizontalScroll} horizontal={true}>
                                        <TouchableOpacity style={styles.buttonCustom}>
                                            <View style={styles.roundedButton}>
                                                <Image source={require("../../../assets/icons/job.png")} style={styles.createMeetingIcon} />
                                                <Text style={styles.innerText}>Create {"\n"}Job Stream</Text>
                                            </View>
                                        </TouchableOpacity>
                                        {typeof data !== "undefined" && data.length > 0 ? data.map((item, index) => {
                                            return (
                                                <Fragment key={index}>
                                                    <TouchableOpacity style={styles.centered} onPress={() => {}}>
                                                        <Image source={{ uri: item.picture.medium }} style={styles.contact} />
                                                        <Image source={require("../../../assets/icons/green-circle.png")} style={styles.online} />
                                                    </TouchableOpacity>
                                                </Fragment>
                                            );
                                        }) : null}
                                    </ScrollView>
                                    <View style={styles.thickLine} />
                                </View>
                            );
                        }}
                        data={this.props.posts}
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh}
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
                                            <Footer style={{ width: width, backgroundColor: "#303030" }}>
                                                <FooterTab style={{ width: width }}>
                                                    {post.newData.peopleReactedIDs.includes(this.props.unique_id) ? <Popover  
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
                                                            }} style={{ flexDirection: "column", width: width * 0.33333333333, backgroundColor: "#fdd530" }}>
                                                                <Image source={require("../../../assets/icons/like.png")} style={{ maxWidth: 20, maxHeight: 20, tintColor: "#303030" }} />
                                                                <Text style={{ color: "#303030", fontWeight: "bold" }}>Un-Like</Text>
                                                            </Button>
                                                        )}>
                                                        <View style={styles.popoverTwo}>
                                                            <View style={{ paddingTop: 5, width: "100%" }}>
                                                                <AwesomeButtonBlue backgroundColor={"blue"} textColor={"white"} type={"secondary"} onPress={() => {
                                                                this.setState({
                                                                    [`visible-${index}`]: !`visible-${index}`
                                                                }, () => {
                                                                    this.revokeSharedLikeResponse(post);
                                                                })
                                                            }} stretch={true}>Remove/Revoke Response</AwesomeButtonBlue>
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
                                                                <Image source={require("../../../assets/icons/like.png")} style={{ maxWidth: 20, maxHeight: 20, tintColor: "#fdd530" }} />
                                                                <Text style={{ color: "#fdd530" }}>Like</Text>
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
                                                        <Image source={require("../../../assets/icons/add-comment.png")} style={{ maxWidth: 20, maxHeight: 20, tintColor: "#fdd530" }} />
                                                        <Text style={{ color: "#fdd530" }}>Comment</Text>
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
                                                        <Image source={require("../../../assets/icons/share.png")} style={{ maxWidth: 20, maxHeight: 20, tintColor: "#fdd530" }} />
                                                        <Text style={{ color: "#fdd530" }}>Share</Text>
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
                                    <Fragment key={index}>
                                    {_.has(post, "videoLinkIncluded") && post.videoLinkIncluded === true ? <InView onChange={(viewport) => {
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
                                                        highlightStyle={{backgroundColor: '#fdd530'}}
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
                                                    <FooterTab style={{ width: width, backgroundColor: "#fdd530" }}>
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
                                                                }} style={{ flexDirection: "column", width: width * 0.33333333333 }}>
                                                                    <Image source={require("../../../assets/icons/like.png")} style={{ maxWidth: 20, maxHeight: 20, tintColor: "#fdd530" }} />
                                                                    <Text style={{ color: "#303030", fontWeight: "bold" }}>Un-Like</Text>
                                                                </Button>
                                                            )}>
                                                            <View style={styles.popoverTwo}>
                                                                <View style={{ paddingTop: 5, width: "100%" }}>
                                                                    <AwesomeButtonBlue backgroundColor={"blue"} textColor={"white"} type={"secondary"} onPress={() => {
                                                                    this.setState({
                                                                        [`visible-${index}`]: !`visible-${index}`
                                                                    }, () => {
                                                                        this.removeLikeResponse(post);
                                                                    })
                                                                }} stretch={true}>Remove/Revoke Response</AwesomeButtonBlue>
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
                                                                    <Image source={require("../../../assets/icons/like.png")} style={{ maxWidth: 20, maxHeight: 20, tintColor: "#fdd530" }} />
                                                                    <Text style={{ color: "#fdd530" }}>Like</Text>
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
                                                            <Image source={require("../../../assets/icons/add-comment.png")} style={{ maxWidth: 20, maxHeight: 20, tintColor: "#fdd530" }} />
                                                            <Text style={{ color: "#fdd530" }}>Comment</Text>
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
                                                            <Image source={require("../../../assets/icons/share.png")} style={{ maxWidth: 20, maxHeight: 20, tintColor: "#fdd530"}} />
                                                            <Text style={{ color: "#fdd530" }}>Share</Text>
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
                                                        highlightStyle={{backgroundColor: '#fdd530'}}
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
                                                                            }} style={{ flexDirection: "column", width: width * 0.33333333333, backgroundColor: "#fdd530" }}>
                                                                                <Image source={require("../../../assets/icons/like.png")} style={{ maxWidth: 20, maxHeight: 20, tintColor: "#303030" }} />
                                                                                <Text style={{ color: "#303030", fontWeight: "bold" }}>Un-Like</Text>
                                                                            </Button>
                                                                        )}>
                                                                        <View style={styles.popoverTwo}>
                                                                            <View style={{ paddingTop: 5, width: "100%" }}>
                                                                                <AwesomeButtonBlue backgroundColor={"blue"} textColor={"white"} type={"secondary"} onPress={() => {
                                                                                this.setState({
                                                                                    [`visible-${index}`]: !`visible-${index}`
                                                                                }, () => {
                                                                                    this.removeLikeResponse(post);
                                                                                })
                                                                            }} stretch={true}>Remove/Revoke Response</AwesomeButtonBlue>
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
                                                                                <Image source={require("../../../assets/icons/like.png")} style={{ maxWidth: 20, maxHeight: 20, tintColor: "#fdd530" }} />
                                                                                <Text style={{ color: "#fdd530" }}>Like</Text>
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
                                                                        <Image source={require("../../../assets/icons/add-comment.png")} style={{ maxWidth: 20, maxHeight: 20, tintColor: "#fdd530" }} />
                                                                        <Text style={{ color: "#fdd530" }}>Comment</Text>
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
                                                                        <Image source={require("../../../assets/icons/share.png")} style={{ maxWidth: 20, maxHeight: 20, tintColor: "#fdd530" }} />
                                                                        <Text style={{ color: "#fdd530" }}>Share</Text>
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
                    /> : null}
                {typeof posts !== 'undefined' && posts.length > 0 ? null : this.renderAfterInitialLoad()}
                </View>
                </SafeAreaView> 
                <RBSheet
                    animation={new Animated.Value(0)}
                    ref={ref => {
                        this.RBSheetGallery = ref;
                    }}
                    height={height}
                    openDuration={250}
                    customStyles={{
                        container: {
                        
                        }
                    }}
                    >
                    <TouchableOpacity onPress={() => {
                        this.RBSheetGallery.close();
                    }} style={styles.closeIconTopLeft}>
                        <Image source={require("../../../assets/icons/close.png")} style={styles.innerImage} />
                    </TouchableOpacity>
                    {typeof this.state.allImages !== "undefined" && this.state.allImages.length > 0 ? <Gallery 
                        initialPage={this.state.index}
                        style={{ flex: 1, backgroundColor: 'black', width, height: 500, minHeight: 500, minWidth: width }}
                        images={this.state.allImages.map((image) => {
                            return { source: { uri: `${Config.wasabi_url}/${image}` } };
                        })}
                    /> : null}
                </RBSheet>
                {selectedPost !== null ? <RBSheet 
                    animation={new Animated.Value(0)}
                    closeOnDragDown={true}
                    ref={ref => {
                        this.RBSheetCustom = ref;
                    }}
                    height={height}
                    openDuration={250}
                    customStyles={{
                        container: {
                            paddingTop: 40
                        },
                        draggableIcon: {
                            backgroundColor: "grey",
                            width: 250
                        }
                    }}
                >
                    <RBSheetCustomHelper selectedPost={this.state.selectedPost} props={this.props} />
                </RBSheet> : null}
                <BottomSheetCustomHelper pickedOutPost={this.state.pickedOutPost} sheetRef={this.sheetRef} />
                
                <RBSheet 
                    animation={new Animated.Value(0)}
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
                        <ScrollView contentContainerStyle={{ paddingBottom: 50 }} style={styles.container}>
                        <ShareLocationSlideUpPaneHelper CheckinRBSheet={this.CheckinRBSheet} />
                        <UploadVideoPaneHelper props={this.props} uploadVideoPaneRef={this.UploadVideoPane} />
                            <Header style={{ backgroundColor: "#303030" }}>
                                <Left>
                                    <Button onPress={() => {
                                        this.setState({
                                            wallText: "",
                                            images: []
                                        }, () => {
                                            this.props.addPostCreationOptions({});

                                            this.RBSheet.close();
                                        })
                                    }} transparent>
                                            <Icon name='arrow-back' />
                                            {Platform.OS === "ios" ? <Text style={{ fontSize: 18 }}>Back</Text> : null}
                                    </Button>
                                </Left>
                                <Body>
                                    <Title style={{ color: "#ffd530" }}>Create Post</Title>
                                </Body>
                                <Right>
                                    <Button onPress={() => {
                                        this.handlePostUpload();
                                    }} style={styles.myButton}>
                                        <Text style={{ color: "white", fontWeight: "bold" }}>POST</Text>
                                    </Button>
                                </Right>
                            </Header>
                            <View style={styles.margin}>
                                <View style={{ flexDirection: "row", maxWidth: width }}>
                                    <Image source={require("../../../assets/images/me.jpg")} style={styles.profilePicTwo} />
                                    <View style={{ flexDirection: "column", maxWidth: width * 0.75 }}>
                                        {this.renderNameAndActivity()}
                                        <View style={styles.visibility}>
                                            <Popover    
                                                placement={"bottom"}
                                                from={(
                                                    <TouchableOpacity>
                                                    <Text>Visibility</Text>
                                                    </TouchableOpacity>
                                                )}>
                                                <View style={styles.popover}>
                                                    <List>
                                                        <ListItem button={true} onPress={() => {
                                                            this.setState({
                                                                visibility: "public"
                                                            })
                                                        }} icon>
                                                            <Left>
                                                            <Button transparent>
                                                                <Image source={require("../../../assets/icons/globe.png")} style={{ maxWidth: "100%", maxHeight: "100%" }} />
                                                            </Button>
                                                            </Left>
                                                            <Body>
                                                                <Text style={this.state.visibility === "public" ? styles.textColorBlue : null}>Public (anyone)</Text>
                                                                <Text style={this.state.visibility === "public" ? styles.textColorBlue : null}>Everyone can view</Text>
                                                            </Body>
                                                            <Right>
                                                                <Icon style={this.state.visibility === "public" ? { color: "blue" } : null} active name="arrow-forward" />
                                                            </Right>
                                                        </ListItem>
                                                        <ListItem button={true} onPress={() => {
                                                            this.setState({
                                                                visibility: "friends"
                                                            })
                                                        }} icon>
                                                            <Left>
                                                            <Button transparent>
                                                                <Image source={require("../../../assets/icons/groups.png")} style={{ maxWidth: "100%", maxHeight: "100%" }} />
                                                            </Button>
                                                            </Left>
                                                            <Body>
                                                                <Text style={this.state.visibility === "friends" ? styles.textColorBlue : null}>Friends</Text>
                                                                <Text style={this.state.visibility === "friends" ? styles.textColorBlue : null}>Only friends can view</Text>
                                                            </Body>
                                                            <Right>
                                                                <Icon style={this.state.visibility === "friends" ? { color: "blue" } : null} active name="arrow-forward" />
                                                            </Right>
                                                        </ListItem>
                                                        
                                                    </List>
                                                </View>
                                            </Popover>
                                            <Image source={require("../../../assets/icons/down.png")} style={{ maxWidth: 20, maxHeight: 20 }} />
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <MentionsTextInput
                                textInputStyle={{ borderColor: '#ebebeb', borderWidth: 1, padding: 5, fontSize: 15 }}
                                suggestionsPanelStyle={{ backgroundColor: 'rgba(100,100,100,0.1)' }}
                                loadingComponent={() => <View style={{ flex: 1, width, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator style={{ paddingTop: 15 }} /></View>}
                                textInputMinHeight={100}
                                placeholder={"What's on your mind? \nTag a friend with the @ symbol"}
                                textInputMaxHeight={(typeof pictures !== "undefined" && pictures.length > 0) || (this.props.selection !== null) ? 150 : 250}
                                trigger={'@'}
                                triggerLocation={'new-word-only'} // 'new-word-only', 'anywhere'
                                value={this.state.wallText}
                                onBlur={() => {
                                    this.checkUsernames();
                                }}
                                onChangeText={this.onChangeTextMainInput}
                                triggerCallback={this.wallPostCallback}
                                renderSuggestionsRow={this.renderSuggestionsRow}
                                suggestionsData={this.state.friends} 
                                keyExtractor={(item, index) => item.acquaintance} 
                                suggestionRowHeight={45}
                                placeholderTextColor={"grey"}
                                horizontal={false} 
                                MaxVisibleRowCount={5}
                            />
                            {this.props.selection !== null ? <View style={{ marginBottom: 35 }} /> : null}
                            <View style={typeof pictures !== "undefined" && pictures.length > 0 ? styles.pictureContainer : styles.hideContainer}>
                                <View style={{ flex: 1, minHeight: 500, marginBottom: 50 }}>
                                    {[1, 3, 4].includes(imagesToShow.length)  && this.renderOne()}
                                    {imagesToShow.length >= 2 && imagesToShow.length != 4 && this.renderTwo()}
                                    {imagesToShow.length >= 4 && this.renderThree()}
                                </View>
                            </View>
                            {this.props.prep !== null ? <View style={{ marginTop: 20 }}>
                            <Video 
                                source={{ uri: this.props.prep, type: "mp4" }}   // Can be a URL or a local file.
                                ref={(player) => {
                                    this.player = player;
                                }} 
                                controls={true}
                                muted={true}
                                onError={this.errored}
                                repeat={true}
                                style={styles.backgroundVideo} 
                            />
                            <TouchableOpacity onPress={() => {
                                this.props.addVideoToWallQueue({});

                                this.setState({
                                    
                                })
                            }} style={styles.closeVideo}>
                                <Image source={require("../../../assets/icons/close.png")} style={{ maxWidth: 30, maxHeight: 30 }} />
                                <Text style={styles.closeVideoText}>Remove video from post</Text>
                            </TouchableOpacity>
                            </View> : null}
                            {selection !== null ? <Fragment>
                            <TouchableOpacity onPress={() => {
                                this.props.addPostCreationOptions({});
                            }} style={styles.mapTouchable}>
                                <Image source={require("../../../assets/icons/close.png")} style={styles.mapCloseIcon} />
                            </TouchableOpacity>
                            <View style={styles.centered}>   
                                <MapView
                                    loadingEnabled 
                                    style={styles.map}
                                    region={{
                                        latitude: selection.position.lat, 
                                        longitude: selection.position.lon,
                                        latitudeDelta: 0.0922,
                                        longitudeDelta: 0.0421
                                    }}
                                >
                                    {/* <TouchableOpacity onPress={() => {
                                        this.props.addPostCreationOptions({});
                                    }} style={styles.mapTouchable}>
                                        <Image source={require("../../../assets/icons/close.png")} style={styles.mapCloseIcon} />
                                    </TouchableOpacity> */}
                                    <Marker
                                        key={1}
                                        coordinate={{ 
                                            latitude: selection.position.lat, 
                                            longitude: selection.position.lon 
                                        }}
                                        title={selection.poi.name}
                                        description={selection.address.freeformAddress}
                                    >
                                        <Image source={require("../../../assets/icons/map-pin.png")} style={{ maxWidth: 30, maxHeight: 30 }} />
                                    </Marker>
                                </MapView>
                            </View></Fragment> : null}
                           
                        </ScrollView>
                        <Spinner
                            overlayColor={"rgba(0, 0, 0, 0.75)"}
                            visible={this.state.spinner}
                            textContent={'Uploading content...'}
                            textStyle={styles.spinnerTextStyle}
                        />
                        <View style={Platform.OS === "ios" ? styles.bottomContainer : styles.bottomContainerAndroid}>
                                <TouchableOpacity onPress={() => {
                                    this._panel.show()
                                }}>
                                    <Text style={styles.addText}>Add to your post</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    this._panel.show();
                                }} style={{ flexDirection: "row", position: "absolute", right: 0}}>
                                    <Image source={require("../../../assets/icons/pictures.png")} style={styles.iconSmall} />
                                    <Image source={require("../../../assets/icons/groups.png")} style={styles.iconSmall} />
                                    <Image source={require("../../../assets/icons/grinning.png")} style={styles.iconSmall} />
                                    <Image source={require("../../../assets/icons/marker.png")} style={styles.iconSmall} />
                                </TouchableOpacity>
                        </View>
                        <SlidingUpPanel allowDragging={false} ref={c => this._panel = c}>
                            <ScrollView contentContainerStyle={{ paddingBottom: 20 }} style={styles.paneContainer}>
                            <List>
                                <ListItem button={true} onPress={this.launchImageLibrary} icon>
                                    <Left>
                                    <Button transparent>
                                        <Image source={require("../../../assets/icons/gallery.png")} style={{ maxWidth: "100%", maxHeight: "100%", tintColor: "green" }} />
                                    </Button>
                                    </Left>
                                    <Body>
                                    <Text>Upload photo(s)</Text>
                                    </Body>
                                    <Right>
                                    <Icon active name="arrow-forward" />
                                    </Right>
                                </ListItem>
                                <ListItem button={true} onPress={() => {
                                    this._panel.hide();

                                    setTimeout(() => {
                                        this.UploadVideoPane.current.open();
                                    }, 1000);
                                }} icon>
                                    <Left>
                                    <Button transparent>
                                       <Image source={require("../../../assets/icons/video-reel.png")} style={{ maxWidth: "100%", maxHeight: "100%" }} />
                                    </Button>
                                    </Left>
                                    <Body>
                                    <Text>Upload A Video</Text>
                                    </Body>
                                    <Right>
                                    <Icon active name="arrow-forward" />
                                    </Right>
                                </ListItem>
                                <ListItem icon>
                                    <Left>
                                    <Button transparent>
                                       <Image source={require("../../../assets/icons/grinning.png")} style={{ maxWidth: "100%", maxHeight: "100%" }} />
                                    </Button>
                                    </Left>
                                    <Body>
                                    <Text>Feeling/Activity</Text>
                                    </Body>
                                    <Right>
                                    <Icon active name="arrow-forward" />
                                    </Right>
                                </ListItem>
                                <ListItem button={true} onPress={() => {
                                    this._panel.hide();

                                    setTimeout(() => {
                                        this.CheckinRBSheet.current.open();
                                    }, 1000);
                                }} icon>
                                    <Left>
                                    <Button transparent>
                                       <Image source={require("../../../assets/icons/marker.png")} style={{ maxWidth: "100%", maxHeight: "100%" }} />
                                    </Button>
                                    </Left>
                                    <Body>
                                    <Text>Check-in</Text>
                                    </Body>
                                    <Right>
                                    <Icon active name="arrow-forward" />
                                    </Right>
                                </ListItem>
                                <ListItem icon>
                                    <Left>
                                    <Button transparent>
                                       <Image source={require("../../../assets/icons/video-on.png")} style={{ maxWidth: "100%", maxHeight: "100%", tintColor: "blue" }} />
                                    </Button>
                                    </Left>
                                    <Body>
                                    <Text>Live Video</Text>
                                    </Body>
                                    <Right>
                                    <Icon active name="arrow-forward" />
                                    </Right>
                                </ListItem>
                                <ListItem icon>
                                    <Left>
                                    <Button transparent>
                                       <Image source={require("../../../assets/icons/camera.png")} style={{ maxWidth: "100%", maxHeight: "100%", tintColor: "darkred" }} />
                                    </Button>
                                    </Left>
                                    <Body>
                                    <Text>Camera</Text>
                                    </Body>
                                    <Right>
                                    <Icon active name="arrow-forward" />
                                    </Right>
                                </ListItem>
                                <ListItem icon>
                                    <Left>
                                    <Button transparent>
                                       <Image source={require("../../../assets/icons/room.png")} style={{ maxWidth: "100%", maxHeight: "100%" }} />
                                    </Button>
                                    </Left>
                                    <Body>
                                    <Text>Create Room</Text>
                                    </Body>
                                    <Right>
                                    <Icon active name="arrow-forward" />
                                    </Right>
                                </ListItem>
                                <ListItem icon>
                                    <Left>
                                    <Button transparent>
                                       <Image source={require("../../../assets/icons/text.png")} style={{ maxWidth: "100%", maxHeight: "100%" }} />
                                    </Button>
                                    </Left>
                                    <Body>
                                    <Text>Text Background Color</Text>
                                    </Body>
                                    <Right>
                                    <Icon active name="arrow-forward" />
                                    </Right>
                                </ListItem>
                                <ListItem icon>
                                    <Left>
                                    <Button transparent>
                                       <Image source={require("../../../assets/icons/hint.png")} style={{ maxWidth: "100%", maxHeight: "100%" }} />
                                    </Button>
                                    </Left>
                                    <Body>
                                    <Text>Ask for recommendations</Text>
                                    </Body>
                                    <Right>
                                    <Icon active name="arrow-forward" />
                                    </Right>
                                </ListItem>
                                
                            </List>
                            </ScrollView>
                        </SlidingUpPanel>
                </RBSheet>
                </SideMenu>
            </Fragment>
        ) 
    }
}
const mapStateToProps = (state) => {
    console.log("state", state);
    return {
        unique_id: state.signupData.authData.unique_id,
        fullName: `${state.signupData.authData.firstName} ${state.signupData.authData.lastName}`,
        posts: _.has(state, "wallPosts") && _.has(state.wallPosts, "posts") ? state.wallPosts.posts : [],
        selection: _.has(state.wallPosts, "options") && _.has(state.wallPosts.options, "selection") ? state.wallPosts.options.selection : null,
        username: state.signupData.authData.username,
        prep: _.has(state.wallPosts, "prep") && typeof state.wallPosts.prep !== "undefined" && Object.keys(state.wallPosts.prep).length > 0 ? state.wallPosts.prep : null
    }
}
export default connect(mapStateToProps, { wallPostsAdd, addPostCreationOptions, addVideoToWallQueue })(HomepageMainPage);