import React, { Component, Fragment } from 'react';
import styles from './styles.js';
import { Header, Left, Body, Right, Button, Icon, Title, Subtitle, Footer, FooterTab, CardItem, Card } from 'native-base';
import { View, Text, Image, ScrollView, TouchableOpacity, Linking, Dimensions, FlatList } from 'react-native';
import Markdown from 'react-native-markdown-display';
import SyntaxHighlighter from 'react-native-syntax-highlighter';
import Video from 'react-native-video';
import Config from 'react-native-config';
import { connect } from 'react-redux';
import axios from "axios";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Popover from 'react-native-popover-view';
import LottieView from 'lottie-react-native';
import _ from 'lodash';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import LeaveACommentForumPostHelper from "./bottomSheets/commentSheet/index.js";
import { addForumComments } from "../../../../actions/forum/index.js";

const { height, width } = Dimensions.get("window");


class ForumListingIndividualHelper extends Component {
constructor(props) {
    super(props);


    this.state = {
        forum: null,
        ready: false,
        like: null,
        isVisible: false,
        comments: [],
        loading: false
    }

    this.rawBottomSheet = React.createRef();
}
    componentDidMount() {
        const forum = this.props.props.route.params.item;

        console.log(this.props.comments);

        this.props.addForumComments(typeof forum.comments !== "undefined" && forum.comments.length > 0 ? forum.comments : [])

        this.setState({
            forum,
            ready: true
        });

        const promises = [];

        for (let index = 0; index < forum.comments.length; index++) {
            const comment = forum.comments[index];
            

            promises.push(new Promise((resolve, reject) => {
                axios.get(`${Config.ngrok_url}/gather/more/basic/info`, {
                    params: {
                        userID: comment.posterID
                    }
                }).then((res) => {
                    if (res.data.message === "Located the desired user!") {
                        console.log(res.data);

                        const { user } = res.data;

                        comment.profilePics = user.profilePics;
                        comment.firstName = user.firstName;
                        comment.lastName = user.lastName;
                        comment.accountType = user.accountType;
                        comment.username = user.username;
                        comment.birthdate = user.birthdate;

                        resolve(comment);
                    } else {
                        console.log("err", res.data);

                        reject(null);
                    }
                }).catch((err) => {
                    console.log(err);

                    reject(null);
                })
            }))
        }

        Promise.all(promises).then((values) => {
            this.setState({
                comments: values,
                loading: true
            })
        })
    }
    
    renderPicture = (obj) => {

        console.log("MY OBJ", obj);

        if (obj.photo === false) {
            console.log("ran one", obj);
            return (
                <TouchableOpacity onPress={this.handleRedirectToProfile}>
                    <Image style={styles.avatar} source={{ uri: `${Config.wasabi_url}/${obj.profilePic[obj.profilePic.length - 1].picture}` }}/>
                </TouchableOpacity>
            );
        } else if (obj.photo === true && obj.profilePic !== null) {
            console.log("ran two", obj);
            return (
                <TouchableOpacity onPress={this.handleRedirectToProfile}>
                    <Image style={styles.avatar} source={{ uri: obj.profilePic }}/>
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity onPress={this.handleRedirectToProfile}>
                    <Image style={styles.avatar} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }}/>
                </TouchableOpacity>
            );
        }
    }
    handleRedirectToProfile = () => {
        const { forum } = this.state;

        this.props.props.navigation.push("individual-profile-public", { item: { unique_id: forum.poster }});
    }
    componentDidUpdate(prevProps, prevState) {

        const forum = this.props.props.route.params.item;

        if (this.state.loading === true && JSON.stringify(prevProps.comments) !== JSON.stringify(this.props.comments)) {
            console.log("component DID UPDATE!!!", this.props.comments);

            axios.get(`${Config.ngrok_url}/fetch/comments/forum/feed/update`, {
                params: {
                    forumID: forum.id
                }
            }).then((res) => {
                if (res.data.message === "Succesfully gathered updated comments!") {
                    console.log(res.data);

                    const { comments } = res.data;


                    this.setState({
                        comments
                    })
                } else {
                    console.log("err", res.data);
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    }
    renderProfilePictureVideo = (obj) => {

        const profilePic = obj.profilePic[0]; 

        console.log("profilePic", profilePic);

        if (profilePic !== null) {
            if (profilePic.type !== "video") {
                console.log("first chunk ran");
                return (
                    <TouchableOpacity onPress={this.handleRedirectToProfile}>
                        <Fragment>
                            {this.renderPicture(obj)}
                        </Fragment>
                    </TouchableOpacity>
                );
            } else {
                console.log(`${Config.wasabi_url}/${profilePic}`);
                return (
                    <TouchableOpacity onPress={this.handleRedirectToProfile}>
                        <Video  
                            resizeMode="cover"
                            repeat
                            source={{uri: `${Config.wasabi_url}/${profilePic}` }}   // Can be a URL or a local file.
                            autoplay={true}
                            ref={(ref) => {
                                this.player = ref
                            }}
                            muted={true}
                            style={[styles.avatar, { top: -135 }]}
                        />
                    </TouchableOpacity>
                );
            }
        } else {
            return (
                <TouchableOpacity onPress={this.handleRedirectToProfile}>
                    {this.renderPicture(obj)}
                </TouchableOpacity>
            );
        }
    }
    handleUpVote = () => {
        const forummm = this.props.props.route.params.item;

        axios.post(`${Config.ngrok_url}/upvote/forum/posting`, {
            posting: forummm,
            id: this.props.unique_id
        }).then((res) => {
            if (res.data.message === "Located and updated the desired forum!") {
                console.log(res.data);
                
                const { forum } = res.data;

                this.setState({
                    forum: {
                        ...forum,
                        profilePics: forummm.profilePics,
                        photo: forummm.photo,
                        firstName: forummm.firstName,
                        lastName: forummm.lastName,
                        username: forummm.username
                    }
                })
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    handleDownVote = () => {
        const forummm = this.props.props.route.params.item;

        axios.post(`${Config.ngrok_url}/downvote/forum/posting`, {
            posting: forummm,
            id: this.props.unique_id
        }).then((res) => {
            if (res.data.message === "Located and updated the desired forum!") {
                console.log(res.data);
                
                const { forum } = res.data;

                this.setState({
                    forum: {
                        ...forum,
                        profilePics: forummm.profilePics,
                        photo: forummm.photo,
                        firstName: forummm.firstName,
                        lastName: forummm.lastName,
                        username: forummm.username
                    }
                })
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    likeReactPost = () => {
        console.log("likeReactPost");

        const { like, forum } = this.state;

        axios.post(`${Config.ngrok_url}/handle/forum/post/like/response`, {
            like,
            id: this.props.unique_id,
            forum
        }).then((res) => {
            if (res.data.message === "Located and responded with emoji to forum posting!") {
                console.log(res.data);

                const { forummm } = res.data;

                this.setState({
                    forum: {
                        ...forummm,
                        profilePics: forum.profilePics,
                        photo: forum.photo,
                        firstName: forum.firstName,
                        lastName: forum.lastName,
                        username: forum.username
                    },
                    like: null,
                    isVisible: false
                })
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    removeLikeResponse = () => {
        console.log("removeLikeResponse");
    }
    renderPictureComment = (profilePic) => {

        if (typeof profilePic !== "undefined" && profilePic !== null) {
            return <Image style={styles.customAvatar} source={{ uri: `${Config.wasabi_url}/${profilePic.picture}` }}/>;
        } else {
            return <Image style={styles.customAvatar} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }}/>;
        }
    }
    handleCommentRedirectUser = (comment) => {
        const id = comment.posterID;

        this.props.props.navigation.push("individual-profile-public", { item: { unique_id: id }});
    }
    renderProfilePictureVideoComment = (comment) => {
        const profilePic = typeof comment.profilePics !== 'undefined' && comment.profilePics.length > 0 ? comment.profilePics[comment.profilePics.length - 1] : null;

        console.log("profilePic", profilePic);
        
        if (profilePic !== null) {
            if (profilePic.type !== "video") {
                console.log("first chunk ran");
                return (
                    <TouchableOpacity onPress={() => {
                        this.handleCommentRedirectUser(comment);
                    }}>
                        {this.renderPictureComment(profilePic)}
                    </TouchableOpacity>
                );
            } else {
                console.log("video ran!");
                return (
                    <TouchableOpacity onPress={() => {
                        this.handleCommentRedirectUser(comment);
                    }}>
                        <Video  
                            resizeMode="cover"
                            repeat
                            source={{uri: `${Config.wasabi_url}/${profilePic.picture}` }}   // Can be a URL or a local file.
                            autoplay={true}
                            ref={(ref) => {
                                this.player = ref
                            }}
                            muted={true}
                            style={styles.customAvatar}
                        />
                    </TouchableOpacity>
                );
            }
        } else {
            return (
                <Fragment>
                    {this.renderPicture(comment)}
                </Fragment>
            );
        }
    }
    handleDownVoteComment = (commenttt) => {
        console.log("commenttt", commenttt);

        const forummm = this.props.props.route.params.item;

        axios.post(`${Config.ngrok_url}/downvote/subcomment/comment`, {
            forum: forummm,
            id: this.props.unique_id,
            commentID: commenttt.id
        }).then((res) => {
            if (res.data.message === "Downvoted comment!") {
                console.log(res.data);

                const { comment } = res.data;

                const copy = [...this.state.comments];
                const indexxx = this.state.comments.findIndex((x) => x.id === commenttt.id)

                console.log("indexxx", indexxx);

                copy[indexxx] = comment;

                this.setState({
                    comments: copy
                })
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    handleUpVoteComment = (commenttt) => {
        console.log("commenttt", commenttt);

        const forummm = this.props.props.route.params.item;

        axios.post(`${Config.ngrok_url}/upvote/subcomment/comment`, {
            forum: forummm,
            id: this.props.unique_id,
            commentID: commenttt.id
        }).then((res) => {
            if (res.data.message === "Upvoted comment!") {
                console.log(res.data);

                const { comment } = res.data;

                const copy = [...this.state.comments];

                const indexxx = this.state.comments.findIndex((x) => x.id === commenttt.id)

                console.log("indexxx", indexxx);

                copy[indexxx] = comment;

                this.setState({
                    comments: copy
                })
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    handleCommentDeletion = (commenttttttt) => {
        console.log("commenttttttt", commenttttttt);

        const forummm = this.props.props.route.params.item;

        axios.put(`${Config.ngrok_url}/delete/comment/forums/thread`, {
            id: this.props.unique_id,
            comment: commenttttttt,
            forummm
        }).then((res) => {
            if (res.data.message === "Successfully deleted comment!") {
                console.log(res.data);

                const { comment } = res.data;

                const copy = [...this.state.comments];

                const indexxx = this.state.comments.findIndex((x) => x.id === comment.id)

                console.log("indexxx", indexxx);

                copy.splice(indexxx, 1);

                this.setState({
                    comments: copy
                })

            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    renderContentConditional = () => {
        const { forum, ready } = this.state;

        if (ready === true) {

            const selectedEmoji = _.has(forum, "emojiResponses") ? forum.emojiResponses.filter((item) => {
                if (item.id === this.props.unique_id) {
                    return item;
                }
            })[0] : null;

            return (
                <ScrollView contentContainerStyle={{ paddingBottom: 100 }} style={styles.container}>
                    <View style={styles.margin}>
                        <View style={styles.topContainer}>
                            <View style={styles.row}>
                                <View style={styles.columnSmall}>
                                    <TouchableOpacity onPress={() => {
                                        this.handleUpVote();
                                    }}>
                                        <Image source={require("../../../../assets/icons/up.png")} style={styles.voteIcon} />
                                    </TouchableOpacity>
                                    <Text style={styles.likes}>{(forum.likes).toString()}</Text>
                                    <Text style={styles.likes}>{(forum.dislikes).toString()}</Text>
                                    <TouchableOpacity onPress={() => {
                                        this.handleDownVote();
                                    }}>
                                        <Image source={require("../../../../assets/icons/downvote.png")} style={styles.voteIcon} />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.columnLarge}>
                                    <Text style={styles.title}>{forum.title}</Text>
                                    {typeof forum.tags !== "undefined" && forum.tags.length > 0 ? forum.tags.map((tag, index) => {
                                        return (
                                            <View style={styles.tagged}>
                                                <Text style={{ fontWeight: "bold", fontSize: 14 }}>{tag}</Text>
                                            </View>     
                                        );
                                    }) : null}
                                </View>
                            </View>
                        </View>
                        <View style={{ marginTop: 20 }} />
                        <View style={styles.row}>
                            {this.renderProfilePictureVideo(forum.profilePics !== null ? {
                                profilePic: forum.profilePics,
                                photo: false
                            } : {
                                profilePic: forum.photo,
                                photo: true
                            })}
                           <View style={{ flexDirection: "column", marginLeft: 15 }}>
                                <Text style={styles.posterText}>Posted by <Text style={{ color: "blue" }}>{forum.firstName} {forum.lastName}</Text></Text>
                                <Text style={styles.posterText}>Also known as <Text style={{ color: "blue" }}>{forum.username}</Text></Text>
                           </View>
                        </View>
                        <View>
                            <Text style={styles.date}>Posted on: {forum.date}</Text>
                        </View>
                        <View style={{ marginTop: 20 }} />
                        <Card>
                            <CardItem style={{ width: width, marginLeft: -20 }}>
                                <Body>
                                <Footer style={{ width: width }}>
                                    <FooterTab style={{ width: width }}>
                                        {forum.emojiResponses.includes(selectedEmoji) ? <Popover  
                                            onRequestClose={() => {
                                                this.setState({
                                                    isVisible: false
                                                })
                                            }}
                                            isVisible={this.state.isVisible}  
                                            placement={"bottom"}
                                            from={(
                                                <Button onPress={() => {
                                                    this.setState({
                                                        isVisible: true
                                                    })
                                                }} style={{ flexDirection: "column", width: width * 0.33333333333 }}>
                                                    <Image source={require("../../../../assets/icons/like.png")} style={{ maxWidth: 20, maxHeight: 20, tintColor: "blue" }} />
                                                    <Text style={{ color: "blue", fontWeight: "bold" }}>Un-Like</Text>
                                                </Button>
                                            )}>
                                            <View style={styles.popoverTwo}>
                                                <View style={{ paddingTop: 5, width: "100%" }}>
                                                    <AwesomeButtonBlue backgroundColor={"blue"} textColor={"white"} type={"secondary"} onPress={() => {
                                                    this.setState({
                                                        isVisible: !this.state.isVisible
                                                    }, () => {
                                                        this.removeLikeResponse();
                                                    })
                                                }} stretch={true}>Remove/Revoke Response</AwesomeButtonBlue>
                                                </View>
                                            </View>
                                        </Popover> : <Popover  
                                            onRequestClose={() => {
                                                this.setState({
                                                    isVisible: false
                                                })
                                            }}
                                            isVisible={this.state.isVisible}  
                                            placement={"bottom"}
                                            from={(
                                                <Button onPress={() => {
                                                    this.setState({
                                                        isVisible: true
                                                    })
                                                }} style={{ flexDirection: "column", width: width * 0.33333333333 }}>
                                                    <Image source={require("../../../../assets/icons/like.png")} style={{ maxWidth: 20, maxHeight: 20 }} />
                                                    <Text>Like</Text>
                                                </Button>
                                            )}>
                                            <View style={styles.popoverTwo}>
                                                <TouchableOpacity onPress={() => {
                                                    this.setState({
                                                        isVisible: !this.state.isVisible,
                                                        like: "screaming"
                                                    }, () => {
                                                        this.likeReactPost();
                                                    })
                                                }} style={styles.lottiContainer}>
                                                    <LottieView source={require('../../../../assets/animations/screaming.json')} autoPlay loop style={{ width: 50, maxWidth: 50, height: 65 }} />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => {
                                                    this.setState({
                                                        isVisible: !this.state.isVisible,
                                                        like: "exploding"
                                                    }, () => {
                                                        this.likeReactPost();
                                                    })
                                                }} style={styles.lottiContainer}>
                                                    <LottieView source={require('../../../../assets/animations/exploding.json')} autoPlay loop style={{ width: 50, maxWidth: 50, height: 65 }} />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => {
                                                    this.setState({
                                                        isVisible: !this.state.isVisible,
                                                        like: "tearsOfJoy"
                                                    }, () => {
                                                        this.likeReactPost();
                                                    })
                                                }} style={styles.lottiContainer}>
                                                    <LottieView source={require('../../../../assets/animations/tears-of-joy.json')} autoPlay loop style={{ width: 80, maxWidth: 80, height: 65 }} />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => {
                                                    this.setState({
                                                        isVisible: !this.state.isVisible,
                                                        like: "clapping"
                                                    }, () => {
                                                        this.likeReactPost();
                                                    })
                                                }} style={styles.lottiContainer}>
                                                    <LottieView source={require('../../../../assets/animations/clapping.json')} autoPlay loop style={{ width: 50, maxWidth: 50, height: 65 }} />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => {
                                                    this.setState({
                                                        isVisible: !this.state.isVisible,
                                                        like: "angry"
                                                    }, () => {
                                                        this.likeReactPost();
                                                    })
                                                }} style={styles.lottiContainer}>
                                                    <LottieView source={require('../../../../assets/animations/angry.json')} autoPlay loop style={{ width: 50, maxWidth: 50, height: 65 }} />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => {
                                                    this.setState({
                                                        isVisible: !this.state.isVisible,
                                                        like: "heart"
                                                    }, () => {
                                                        this.likeReactPost();
                                                    })
                                                }} style={styles.lottiContainer}>
                                                    <LottieView source={require('../../../../assets/animations/love.json')} autoPlay loop style={{ width: 50, maxWidth: 50, height: 65 }} />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => {
                                                    this.setState({
                                                        isVisible: !this.state.isVisible,
                                                        like: "wow"
                                                    }, () => {
                                                        this.likeReactPost();
                                                    })
                                                }} style={styles.lottiContainer}>
                                                    <LottieView source={require('../../../../assets/animations/wow.json')} autoPlay loop style={{ width: 50, maxWidth: 50, height: 65 }} />
                                                </TouchableOpacity>
                                            </View>
                                        </Popover>}
                                        
                                        <Button onPress={() => {
                                            this.rawBottomSheet.current.open();
                                        }} style={{ flexDirection: "column", width: width * 0.33333333333 }}>
                                            <Image source={require("../../../../assets/icons/add-comment.png")} style={{ maxWidth: 20, maxHeight: 20 }} />
                                            <Text>Comment</Text>
                                        </Button>
                                        
                                    </FooterTab>
                                </Footer>
                                </Body>
                            </CardItem>
                        </Card>
                        <Markdown onLinkPress={(link) => {
                            console.log("link", link); 

                            Linking.canOpenURL(link).then(supported => {
                            if (!supported) {
                                console.log('Can\'t handle link: ' + link);
                            } else {
                                return Linking.openURL(link);
                            }
                            }).catch(err => {
                                console.error('An error occurred', err)
                            });
                        }} style={styles.markdown}>
                            {forum.description}
                        </Markdown>
                        {typeof forum.snippets !== 'undefined' && forum.snippets.length > 0 ? forum.snippets.map((snippet, index) => {
                            return (
                                <View style={{ maxHeight: 550 }}>
                                    <Text style={styles.comment}>{snippet.comment}</Text>
                                    <View style={{ marginTop: 50, marginBottom: 30 }}>
                                        <SyntaxHighlighter 
                                            language={snippet.language} 
                                            highlighter={"prism" || "hljs"}
                                        >
                                            {snippet.codeString}
                                        </SyntaxHighlighter>
                                    </View>
                                </View>
                            );
                        }) : null}

                        <FlatList
                            style={styles.root}
                            data={this.state.comments}
                            extraData={this.state}
                            ItemSeparatorComponent={() => {
                                return (
                                    <View style={styles.separator}/>
                                )
                            }}
                            keyExtractor={(item)=>{
                                return item.id;
                            }}
                            renderItem={(item) => {
                                const comment = item.item;

                                console.log("comment", comment);
                                return(
                                    <View style={[styles.containerTwo, { marginTop: 20 }]}>
                                        <View style={styles.customColumnOne}>
                                            <TouchableOpacity onPress={() => {}}>
                                                {this.renderProfilePictureVideoComment(comment)}
                                            </TouchableOpacity>
                                            <View style={styles.columnSmallTwo}>
                                                <TouchableOpacity onPress={() => {
                                                    this.handleUpVoteComment(comment);
                                                }}>
                                                    <Image source={require("../../../../assets/icons/up.png")} style={styles.voteIconTwo} />
                                                </TouchableOpacity>
                                                <Text style={styles.likesTwo}>{(comment.likes).toString()}</Text>
                                                <Text style={styles.likesTwo}>{(comment.dislikes).toString()}</Text>
                                                <TouchableOpacity onPress={() => {
                                                    this.handleDownVoteComment(comment);
                                                }}>
                                                    <Image source={require("../../../../assets/icons/downvote.png")} style={styles.voteIconTwo} />
                                                </TouchableOpacity>

                                                {this.props.unique_id === comment.posterID ? <TouchableOpacity onPress={() => {
                                                    this.handleCommentDeletion(comment);
                                                }} style={styles.deleteTouchable}>
                                                    <Image source={require("../../../../assets/icons/close.png")} style={{ maxWidth: 40, maxHeight: 40 }} />
                                                </TouchableOpacity> : null}
                                            </View>
                                        </View>
                                        <View style={styles.content}>
                                            <View style={styles.contentHeader}>
                                                <Text  style={styles.name}>{comment.firstName} {comment.lastName}</Text>
                                                <Text style={styles.time}>
                                                    {comment.date}
                                                </Text>
                                            </View>
                                            <Markdown onLinkPress={(link) => {
                                                console.log("link", link); 

                                                Linking.canOpenURL(link).then(supported => {
                                                    if (!supported) {
                                                        console.log('Can\'t handle link: ' + link);
                                                    } else {
                                                        return Linking.openURL(link);
                                                    }
                                                }).catch(err => {
                                                    console.error('An error occurred', err)
                                                });
                                            }} style={styles.markdown}>
                                                {comment.description}
                                            </Markdown>
                                            {typeof comment.snippets !== 'undefined' && comment.snippets.length > 0 ? comment.snippets.map((snippet, index) => {
                                                return (
                                                    <Fragment key={index + 20}>
                                                        <View style={styles.highlighter}>
                                                            <Text style={styles.highlighterComment}>{snippet.comment}</Text>
                                                            <View style={{ marginTop: 50, marginBottom: 30 }}>
                                                                <SyntaxHighlighter 
                                                                    language={snippet.language} 
                                                                    highlighter={"prism" || "hljs"}
                                                                >
                                                                    {snippet.codeString}
                                                                </SyntaxHighlighter>
                                                            </View>
                                                        </View>
                                                    </Fragment>
                                                );
                                            }) : null}
                                        </View>
                                    </View>
                                );
                        }}/>
                    </View>
                </ScrollView>
            );
        } else {
            return (
                <Fragment>
                    <View style={{ margin: 15 }}>
                        <SkeletonPlaceholder>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                                <View style={{ marginLeft: 20 }}>
                                <View style={{ width: width * 0.70, height: 20, borderRadius: 4 }} />
                                <View
                                    style={{ marginTop: 6, width: width * 0.55, height: 20, borderRadius: 4 }}
                                />
                                </View>
                            </View>
                            <View style={styles.blockSkelaton} />
                            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 15 }}>
                                <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                                <View style={{ marginLeft: 20 }}>
                                <View style={{ width: width * 0.70, height: 20, borderRadius: 4 }} />
                                <View
                                    style={{ marginTop: 6, width: width * 0.55, height: 20, borderRadius: 4 }}
                                />
                                </View>
                            </View>
                            <View style={styles.blockSkelaton} />
                        </SkeletonPlaceholder>
                    </View>
                </Fragment>
            );
        }
    }
    render() {
        const { forum } = this.state;

        console.log(this.state);
        return (
            <Fragment>
                <Header>
                    <Left>
                        <Button onPress={() => {
                            this.props.props.navigation.goBack();
                        }} transparent>
                            <Icon style={{ color: "black" }} name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>{forum !== null ? forum.username : "-------------"}</Title>
                        <Subtitle>Individual forum listing</Subtitle>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon style={{ color: "red" }} name='heart' />
                        </Button>
                    </Right>
                </Header>
                <LeaveACommentForumPostHelper forum={forum} props={this.props} rawBottomSheet={this.rawBottomSheet} />
                {this.renderContentConditional()}
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.signupData.authData.unique_id,
        comments: _.has(state.forum, "comments") ? state.forum.comments : []
    }
}
export default connect(mapStateToProps, { addForumComments })(ForumListingIndividualHelper);
