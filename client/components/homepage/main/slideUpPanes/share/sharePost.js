import React, { useState, useEffect, Fragment } from 'react';
import { View, Text, Image, TouchableOpacity, Keyboard, Dimensions, ActivityIndicator } from "react-native";
import styles from "./styles.js";
import { Header, Left, Body, Right, Button, Title, Subtitle, Textarea, Thumbnail } from 'native-base';
import axios from "axios";
import Config from "react-native-config";
import RBSheet from "react-native-raw-bottom-sheet";
import Video from 'react-native-video';
import _ from 'lodash';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import Share from 'react-native-share';
import PageOneShowMoreHelper from "../../helpers/pageOne.js";
import PageTwoHelperPageComponent from "../../helpers/pageTwo.js";
import RNFetchBlob from "rn-fetch-blob";
import myLogoURL from "../../../../../data_sets/myLogoBase64.js";
import RNFS from 'react-native-fs';
import Toast from 'react-native-toast-message';
import { connect } from "react-redux";
import MentionsTextInput from 'react-native-mentions';
import Highlighter from 'react-native-highlight-words';



const { height, width } = Dimensions.get("window");

const BottomSheetCustomHelper = ({ sheetRef, pickedOutPost, unique_id, fullName, selection, username }) => {
    const [showPageOne, setPageOne] = useState(false);
    const [showPageTwo, setPageTwo] = useState(false);
    const [user, setUser] = useState(null);
    const [showDismiss, setDismiss] = useState(false);
    const [ text, setText ] = useState("");
    const [friends, setFriends] = useState([]);
    const [stored, setStorage] = useState([]);
    const [taggedUsers, setTaggedUsers] = useState([]);

    useEffect(() => {
        axios.get(`${Config.ngrok_url}/gather/users/usernames/fullnames/friends`, {
            params: {
                id: unique_id
            }
        }).then((res) => {

            if (res.data.message === "Located friends to tag!") {

                console.log(res.data);

                const { friends, user } = res.data;

                setUser(user);

                setFriends(friends);
                setStorage(friends);
            } else {
                console.log(res.data);
            }
        }).catch((err) => {
            console.log(err);
        });
    }, [])

    const redirectToUsersProfileWithoutPane = (post) => {
        props.props.navigation.push("individual-profile-public", { item: { unique_id: post.poster }});
    }

    const renderPhotoOrVideo = (user, maxDimension) => {
        if (user.profilePics !== null && typeof user.profilePics !== 'undefined' && user.profilePics.length > 0) {
            if (user.profilePics[user.profilePics.length - 1].type === "video") {
                const picture = user.profilePics[user.profilePics.length - 1].picture;
                return (
                    <TouchableOpacity onPress={() => {
                        redirectToUsersProfileWithoutPane(user);
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
                const picture = user.profilePics[user.profilePics.length - 1].picture;
                return (
                    <TouchableOpacity onPress={() => {
                        redirectToUsersProfileWithoutPane(user);
                    }}>
                        <Thumbnail source={{ uri: `${Config.wasabi_url}/${picture}` }} style={{ minWidth: typeof maxDimension !== "undefined" ? maxDimension : 50, minHeight: typeof maxDimension !== "undefined" ? maxDimension : 50, maxWidth: typeof maxDimension !== "undefined" ? maxDimension : null, maxHeight: typeof maxDimension !== "undefined" ? maxDimension : null, borderRadius: 40 }} />
                    </TouchableOpacity>
                );
            }
        } else if (user.photo !== null && typeof user.photo !== "undefined") {
            return (
                <TouchableOpacity onPress={() => {
                    redirectToUsersProfileWithoutPane(user);
                }}>
                    <Thumbnail source={{ uri: user.photo }} style={{ minWidth: typeof maxDimension !== "undefined" ? maxDimension : 50, minHeight: typeof maxDimension !== "undefined" ? maxDimension : 50, maxWidth: typeof maxDimension !== "undefined" ? maxDimension : null, maxHeight: typeof maxDimension !== "undefined" ? maxDimension : null, borderRadius: 40 }} />
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity onPress={() => {
                    redirectToUsersProfileWithoutPane(user);
                }}>
                    <Thumbnail source={{ uri: Config.no_image_avaliable }} style={{ minWidth: typeof maxDimension !== "undefined" ? maxDimension : 50, minHeight: typeof maxDimension !== "undefined" ? maxDimension : 50, maxWidth: typeof maxDimension !== "undefined" ? maxDimension : null, maxHeight: typeof maxDimension !== "undefined" ? maxDimension : null, borderRadius: 40 }} />
                </TouchableOpacity>
            );
        }
    }
    const sharePostToOtherSources = (post) => {

        sheetRef.current.close();

        console.log("REAL POST:", post);

        const promises = [];

        setTimeout(() => {
            if (typeof post.pictures !== "undefined" && post.pictures !== null && post.pictures.length > 0) {
                for (let index = 0; index < post.pictures.length; index++) {
                    promises.push(new Promise((resolve, reject) => {
                        const picture = post.pictures[index];
                        
                        const fs = RNFetchBlob.fs;
    
                        let imagePath = null;
    
                        RNFetchBlob.config({
                            fileCache: true
                        })
                        .fetch("GET", `${Config.wasabi_url}/${picture}`).then( async (resp) => {
                            // the image path you can use it directly with Image component
                            imagePath = resp.path();
        
                            const stats = await RNFS.stat(imagePath);
        
                            console.log("stats", stats);
                            
                            RNFS.readFile(imagePath, 'base64')
                            .then(res =>{
                                console.log(res);
    
                                resolve(res);
                            });
                        });
                    }))
                }
    
                Promise.all(promises).then((passedValues) => {
                    const options = {
                        title: `Shared post by ${post.firstName} ${post.lastName}`,
                        message: post.text,
                        url: myLogoURL.logo,
                        urls: [...passedValues],
                        subject: "I'm sharing this post from the FairWage Freelancing mobile app!"
                    };      
                    Share.open(options).then((res) => {
                        console.log("RESSSSSS:", res);
                    }).catch((err) => {
                        console.log(err);
                    });
                })
            } else {
                const options = {
                    title: `Shared post by ${post.firstName} ${post.lastName}`,
                    message: post.text,
                    url: myLogoURL.logo,
                    subject: "I'm sharing this post from the FairWage Freelancing mobile app!"
                };      
                Share.open(options).then((res) => {
                    console.log("RESSSSSS:", res);
                }).catch((err) => {
                    console.log(err);
                });
            }
        }, 750);
    }
    const renderSuggestionsRow = ({ item }, hidePanel) => {
        return (
            <TouchableOpacity onPress={() => {
                onSuggestionTap(item.acquaintanceUsername, hidePanel)
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
    const onSuggestionTap = (username, hidePanel) => {
        console.log("username", username);

        setText(text + username);
        setTaggedUsers([...taggedUsers, username]);

        hidePanel();
    }
    const checkUsernames = () => {
        const split = text.split(" ");

        const taggedUsersData = [];

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

                taggedUsersData.push(regexed);
            }
        }

        setTaggedUsers([...new Set(taggedUsers.filter((username) => {
            
            console.log("USERNAME", username);

            if (taggedUsersData.indexOf(username) !== -1) {
                console.log("true:", username);
                return username;
            } else {
                console.log("false", username);
            }
        }))]);
    }
    const wallPostCallback = (data) => {
        console.log("callback ", data);

        if (data === "@") {
            setFriends([...stored]);
        } else {
            setFriends(friends.filter((friend) => {
                if (friend.acquaintanceUsername.includes(data.split("@")[1])) {
                    return friend;
                }
            }));
        }
    }
    const onChangeTextMainInput = (wallText) => {
        console.log("wallText", wallText);

        setText(wallText);
    }
    const renderCustom = (post) => {

        if (showPageOne === true) {
            return (
                <View style={styles.margin}>
                    <View style={{ flex: 1 }}>
                        <Header style={{ backgroundColor: "white", marginBottom: 25 }}>
                            <Left>
                                <Button onPress={() => {
                                    setPageOne(false);
                                    setPageTwo(false);
                                }} transparent>
                                    <Image source={require("../../../../../assets/icons/go-back.png")} style={{ maxWidth: 30, maxHeight: 30, tintColor: "#141414" }} />
                                </Button>
                            </Left>
                            <Body>
                                <Title style={{ color: "#141414" }}>Audience</Title>
                                <Subtitle style={{ color: "#141414" }}>Post filters & more...</Subtitle>
                            </Body>
                            <Right />
                        </Header>
                        <PageOneShowMoreHelper props={pickedOutPost} />
                    </View>
                </View>
            );
        } else if (showPageTwo === true) {
            return (
                <View style={styles.margin}>
                    <View>
                        <Header style={{ backgroundColor: "white", marginBottom: 25 }}>
                            <Left>
                                <Button onPress={() => {
                                    setPageOne(false);
                                    setPageTwo(false);
                                }} transparent>
                                    <Image source={require("../../../../../assets/icons/go-back.png")} style={{ maxWidth: 30, maxHeight: 30, tintColor: "#141414" }} />
                                </Button>
                            </Left>
                            <Body>
                                <Title style={{ color: "#141414" }}>Destination</Title>
                                <Subtitle style={{ color: "#141414" }}>Post destination</Subtitle>
                            </Body>
                            <Right />
                        </Header>
                        <PageTwoHelperPageComponent props={pickedOutPost} />
                    </View>
                </View>
            );
        } else {
            return (
                <View style={styles.margin}>
                    <View style={styles.customRow}>
                        <View style={styles.mediumColumn}>
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ width: "25%", flexDirection: "column" }}>
                                    {user !== null ? renderPhotoOrVideo(user, 50) : <Fragment><View style={styles.loadingProfileOutter}><View style={styles.loadingProfilePic}></View></View></Fragment>}
                                </View>
                                <View style={{ flexDirection: "column", width: "75%", marginLeft: 15 }}>
                                    <Text style={styles.nameText}>{fullName}</Text>
                                    <View style={{ flexDirection: "row", marginTop: 7.5 }}>
                                        <TouchableOpacity onPress={() => {
                                            setPageTwo(true);
                                        }} style={styles.myProfileBtn}>
                                            <Text style={{ color: "grey", fontSize: 15 }}>Feed</Text>
                                            <Image source={require("../../../../../assets/icons/expand-small.png")} style={styles.expandSmall} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                            setPageOne(true);
                                        }} style={[styles.myProfileBtn, { marginLeft: 10 }]}>
                                            <Text style={{ color: "grey", fontSize: 15 }}>Friends</Text>
                                            <Image source={require("../../../../../assets/icons/expand-small.png")} style={styles.expandSmall} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            
                        </View>
                        
                    </View>
                    <View style={styles.underbody}>
                        <MentionsTextInput
                            textInputStyle={{ borderColor: '#ebebeb', borderWidth: 1, padding: 5, fontSize: 15 }}
                            suggestionsPanelStyle={{ backgroundColor: 'rgba(100,100,100,0.1)' }}
                            loadingComponent={() => <View style={{ flex: 1, width, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator style={{ paddingTop: 15 }} /></View>}
                            textInputMinHeight={100}
                            placeholder={"Say something about this post... \nTag a friend with the @ symbol"}
                            textInputMaxHeight={250}
                            trigger={'@'}
                            triggerLocation={'new-word-only'} // 'new-word-only', 'anywhere'
                            value={text}
                            onBlur={() => {
                                setDismiss(false);

                                checkUsernames();
                            }}
                            onFocus={() => {
                                setDismiss(true);
                            }}
                            onChangeText={onChangeTextMainInput}
                            triggerCallback={wallPostCallback}
                            renderSuggestionsRow={renderSuggestionsRow}
                            suggestionsData={friends} // array of objects
                            keyExtractor={(item, index) => item.acquaintance} 
                            suggestionRowHeight={45}
                            placeholderTextColor={"grey"}
                            horizontal={false} // default is true, change the orientation of the list
                            MaxVisibleRowCount={5} // this is required if horizontal={false}
                        />
                        {/* <Textarea style={styles.textareabox} rowSpan={7} bordered onChangeText={(text) => {
                            setText(text);
                        }} onFocus={() => {
                            setDismiss(true);
                        }} onBlur={() => {
                            setDismiss(false);
                        }} value={text} placeholder="Say something about this..." /> */}
                        <View style={{ marginTop: 30 }} />
                        <AwesomeButtonBlue backgroundColor={"blue"} textColor={"white"} type={"secondary"} onPress={() => {
                            sharePostToWall();
                        }} stretch={true}>Share post to wall</AwesomeButtonBlue>
                        <View style={{ marginTop: 30 }} />
                        <AwesomeButtonBlue backgroundColor={"darkblue"} textColor={"white"} type={"secondary"} onPress={() => {
                            sharePostToOtherSources(post);
                        }} stretch={true}>Share to other sources</AwesomeButtonBlue>
                        <View style={{ marginTop: 20 }} />
                        {showDismiss === true ? <TouchableOpacity onPress={() => {

                            setDismiss(false);

                            Keyboard.dismiss();
                        }}>
                            <Text style={{ fontWeight: "bold", textAlign: "center" }}>Dismiss Keyboard</Text>
                        </TouchableOpacity> : null}
                    </View>
                </View>
            );
        }
    }
    const sharePostToWall = () => {

        console.log("pickedOutPost", pickedOutPost);

        sheetRef.current.close();

        axios.post(`${Config.ngrok_url}/share/post/wall/others`, {
            post: pickedOutPost,
            id: unique_id,
            newText: text,
            fullName: fullName,
            tagged: taggedUsers,
            username
        }).then((res) => {
            if (res.data.message === "Successfully shared wall post!") {
                console.log(res.data);

                Toast.show({
                    text1: "Successfully shared wall posting!",
                    text2: `You've successfully shared ${pickedOutPost.firstName} ${pickedOutPost.lastName}'s post, we have notified them as well.`,
                    position: "top",
                    type: "success",
                    visibilityTime: 4500
                })
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    return(
        <RBSheet
            ref={sheetRef} 
            onClose={() => {
                setPageOne(false);
                setPageTwo(false);
            }}
            closeOnDragDown={true}
            height={height * 0.90}
            openDuration={250}
            customStyles={{
                container: {
                    borderTopLeftRadius: 40,
                    borderTopRightRadius: 40
                },
                draggableIcon: {
                    backgroundColor: "grey",
                    width: 250
                }
            }}
            >
                {typeof pickedOutPost !== "undefined" && pickedOutPost !== null ? renderCustom(pickedOutPost) : null}
        </RBSheet>
    );
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.signupData.authData.unique_id,
        fullName: `${state.signupData.authData.firstName} ${state.signupData.authData.lastName}`,
        selection: _.has(state.wallPosts, "options") && _.has(state.wallPosts.options, "selection") ? state.wallPosts.options.selection : null,
        username: state.signupData.authData.username
    }
}
export default connect(mapStateToProps, {  })(BottomSheetCustomHelper);