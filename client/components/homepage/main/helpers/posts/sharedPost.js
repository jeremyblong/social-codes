import React, { Component, Fragment } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import styles from "./styles.js";
import { Header, Left, Body, Button, Footer, FooterTab, CardItem, Thumbnail } from 'native-base';
import ReadMore from 'react-native-read-more-text';
import _ from 'lodash';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import Config from "react-native-config";
import Video from 'react-native-video';
import ProgressiveImage from "../../../../lazyLoadImage.js";
import { connect } from "react-redux";
import axios from "axios";
import Popover from 'react-native-popover-view';
import { wallPostsAdd } from "../../../../../actions/wall/wall.js";
import LottieView from 'lottie-react-native';
import Highlighter from 'react-native-highlight-words';


const { width, height } = Dimensions.get("window");

class SharedItemPostHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        pickedOutPost: null,
        countFrom: 0,
        selectedImage: null,
        selectedPost: null,
        allImages: [],
        index: 0
    }
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
                        <Thumbnail source={{ uri: `${Config.wasabi_url}/${picture}` }} style={{ minWidth: 50, minHeight: 50, borderRadius: 40 }} />
                    </TouchableOpacity>
                );
            }
        } else if (post.photo !== null && typeof post.photo !== "undefined") {
            return (
                <TouchableOpacity onPress={() => {
                    this.redirectToUsersProfileWithoutPane(post);
                }}>
                    <Thumbnail source={{ uri: post.photo }} style={{ minWidth: 50, minHeight: 50, borderRadius: 40 }} />
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity onPress={() => {
                    this.redirectToUsersProfileWithoutPane(post);
                }}>
                    <Thumbnail source={{ uri: Config.no_image_avaliable }} style={{ minWidth: 50, minHeight: 50, width: 50, height: 50, borderRadius: 40 }} />
                </TouchableOpacity>
            );
        }
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
        <View style={{ flexDirection: "row", marginBottom: 20 }}>
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
    calculateCommentsLength = (comments) => {
        let sum = 0;
        if (typeof comments !== "undefined" && comments.length > 0) {
            for (let index = 0; index < comments.length; index++) {
                const comment = comments[index];
                sum += 1;
                if (typeof comment.subComments !== "undefined" && comment.subComments.length > 0) {
                    for (let iiii = 0; iiii < comment.subComments.length; iiii++) {
                        const subCom = comment.subComments[iiii];
                        sum += 1;
                    }
                }
            }
        }
        return `${sum} comments`;
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
    redirectToUsersProfileWithoutPane = (post) => {
        this.props.props.props.navigation.push("individual-profile-public", { item: { unique_id: post.poster }});
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
    redirectBasedOnUsername = (username) => {

        axios.get(`${Config.ngrok_url}/locate/unique_id/by/username`, {
            params: {
                username
            }
        }).then((res) => {
            if (res.data.message === "Found user unique id!") {
                const { unique_id } = res.data;

                this.props.props.props.navigation.push("individual-profile-public", { item: { unique_id }})
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
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
    handleRedirectToIndividualPage = (post) => {
        this.props.props.props.navigation.push("individual-wall-posting-view", { post })
    }
    render() {
        const post = this.props.post;
        const index = this.props.index;
        const postLoaded = this.props.postLoaded;

        const { text, date, systemDate, id, peopleReactedIDs, peopleReacted, visibility, reactions, except, poster, firstName, lastName } = this.props.post.newData;
        console.log(this.props);
        return (
            <Fragment key={index}>
                <CardItem>
                    <Left>
                        {this.renderPhotoOrVideo(post.newData)}
                        <Body>
                        <Text>{`${firstName} ${lastName}`}</Text>
                        <Text note>{date}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem>
                <Body>
                    <View style={styles.textContainer}>
                        {_.has(post.newData, "taggedUsers") && post.newData.taggedUsers !== null ? <Highlighter 
                            onPressHighlightedText={(username) => {
                                this.redirectBasedOnUsername(username);
                            }}
                            highlightStyle={{backgroundColor: '#0057ff', color: "white" }}
                            searchWords={post.newData.taggedUsers}
                            textToHighlight={post.newData.text}
                        /> : <Text style={styles.reshareText}>
                            {post.newData.text}
                        </Text>}
                    </View>
                    {post.pictures !== null ? <View>
                        <View style={post.pictures !== null && typeof post.pictures !== "undefined" && post.pictures.length <= 2 ? styles.pictureBoxedCustom : styles.picturesBoxedElseCustom}>
                            <CardItem>
                                <Left>
                                    {this.renderPhotoOrVideo(post)}
                                    <Body>
                                    <Text>{`${post.firstName} ${post.lastName}`}</Text>
                                    <Text note>{post.date}</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                            <View style={post.pictures !== null && typeof post.pictures !== "undefined" && post.pictures.length <= 2 ? styles.picturesBoxedTrue : styles.picturesBoxedElse}>
                                {[1, 3, 4].includes(post.pictures.length)  && this.renderOneLive(post.pictures)}
                                {post.pictures !== null && post.pictures.length >= 2 && post.pictures.length != 4 && this.renderTwoLive(post.pictures)}
                                {post.pictures !== null && post.pictures.length >= 4 && this.renderThreeLive(post.pictures)}
                            </View>
                            <View style={styles.noShadow}>
                                <ReadMore
                                    numberOfLines={3}
                                    renderTruncatedFooter={this._renderTruncatedFooter}
                                    renderRevealedFooter={this._renderRevealedFooter}
                                    onReady={this._handleTextReady}>
                                        <Text style={styles.cardText}>
                                            {post.text}
                                        </Text>
                                </ReadMore>
                            </View>
                            <CardItem>
                                <View style={{ alignContent: "flex-start", flexDirection: "row", width: "65%" }}>
                                    {this.renderEmojis(post)}
                                    {/* insert here */}
                                    <Text style={styles.likeCount}>{this.calculateLikeCount(post)}</Text>
                                </View>
                                <TouchableOpacity onPress={() => {
                                    this.setState({
                                        selectedPost: post
                                    }, () => {
                                        
                                    })
                                }} style={{ alignContent: "flex-end", width: "35%" }}>
                                    <Text style={{ textAlign: "right", marginRight: 30 }}>{this.calculateCommentsLength(post.comments)}</Text>
                                </TouchableOpacity>
                            </CardItem>
                        </View>
                    </View> : null}
                    
                </Body>
                </CardItem>
                {post.pictures === null && postLoaded === true ? <View style={styles.borderedShare}>
                    <CardItem>
                        <Left>
                            {this.renderPhotoOrVideo(post)}
                            <Body>
                            <Text>{`${post.firstName} ${post.lastName}`}</Text>
                            <Text note>{post.date}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <View style={styles.noShadow}>
                                <ReadMore
                                    numberOfLines={3}
                                    renderTruncatedFooter={this._renderTruncatedFooter}
                                    renderRevealedFooter={this._renderRevealedFooter}
                                    onReady={this._handleTextReady}>
                                        {_.has(post.newData, "taggedUsers") && post.newData.taggedUsers !== null && post.newData.taggedUsers.length > 0 ? <Highlighter 
                                            onPressHighlightedText={(username) => {
                                                this.redirectBasedOnUsername(username);
                                            }}
                                            highlightStyle={{backgroundColor: '#0057ff', color: "white" }}
                                            searchWords={post.newData.taggedUsers}
                                            textToHighlight={post.newData.text}
                                        /> : <Text style={styles.cardText}>
                                            {post.text}
                                        </Text>}
                                </ReadMore>
                            </View>
                        </Body>
                    </CardItem>
                    <CardItem>
                        <View style={{ alignContent: "flex-start", flexDirection: "row", width: "65%" }}>
                            {this.renderEmojis(post)}
                            {/* insert here */}
                            <Text style={styles.likeCount}>{this.calculateLikeCount(post)}</Text>
                        </View>
                        <TouchableOpacity onPress={() => {
                            this.setState({
                                selectedPost: post
                            }, () => {
                                
                            })
                        }} style={{ alignContent: "flex-end", width: "35%" }}>
                            <Text style={{ textAlign: "right", marginRight: 0 }}>{this.calculateCommentsLength(post.comments)}</Text>
                        </TouchableOpacity>
                    </CardItem>
                </View> : null}
                <CardItem style={{ marginTop: 25 }}>
                    <View style={{ alignContent: "flex-start", flexDirection: "row", width: "65%" }}>
                        {this.renderEmojis(post.newData)}
                        {/* insert here */}
                        <Text style={styles.likeCount}>{this.calculateLikeCount(post.newData)}</Text>
                    </View>
                    <TouchableOpacity onPress={() => {
                        this.setState({
                            selectedPost: post
                        }, () => {
                            this.RBSheetCustom.open();
                        })
                    }} style={{ alignContent: "flex-end", width: "35%" }}>
                        <Text style={{ textAlign: "right", marginRight: 0 }}>{this.calculateCommentsLength(post.comments)}</Text>
                    </TouchableOpacity>
                </CardItem>
            </Fragment>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.signupData.authData.unique_id,
        posts: _.has(state.wallPosts, "posts") ? state.wallPosts.posts : []
    }
}
export default connect(mapStateToProps, { wallPostsAdd })(SharedItemPostHelper);