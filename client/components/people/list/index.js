import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
  Dimensions,
  Platform,
  FlatList
} from 'react-native';
import styles from './styles.js';
import { Header, Left, Body, Right, Title, Subtitle, Button, List, ListItem, Thumbnail } from 'native-base';
import SearchBar from 'react-native-search-bar';
import Config from "react-native-config";
import axios from "axios";
import _ from "lodash";
import Video from 'react-native-video';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { Fragment } from 'react';
import Dialog from "react-native-dialog";
import { connect } from 'react-redux';
import Toast from 'react-native-toast-message';
import RBSheet from "react-native-raw-bottom-sheet";
import CheckBox from 'react-native-check-box';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';



const { width, height } = Dimensions.get("window");


class PeopleBrowseListHelper extends Component {
  constructor(props) {
    super(props);

    this.state = {
        data: [],
        users: [],
        searchValue: "",
        fullName: "",
        friend: null,
        alreadyPooled: [],
        pending: false,
        filter: false,
        list: false,
        savedUsersInitial: [],
        showAddFriendDialog: false,
        accountTypeArray: [],
        jobsCompletedArray: [],
        ageRangeArray: [],
        allTags: [],
        minAmountEarnedArray: []
    };
}

    handleClick = (item) => {
        console.log("handle click", item);

        this.props.props.navigation.push("individual-profile-public", { item });
    }
    handleSearch = () => {
        console.log("handle search clicked");
    }
    handleCancellation = () => {
        console.log("handle cancellation clicked");
    }
    componentDidMount() {
        const promiseee = new Promise((resolve, reject) => {

            const url = `${Config.ngrok_url}/gather/user`;

            axios.get(url, {
                params: {
                    id: this.props.unique_id
                }
            }).then((res) => {
                console.log(res.data);
    
                const { user } = res.data;
    
                const alreadyFriendsArr = [];
                
                if (typeof user.sentFriendRequests !== "undefined" && user.sentFriendRequests.length > 0) {
                    for (let index = 0; index < user.sentFriendRequests.length; index++) {
                        const request = user.sentFriendRequests[index];
                        alreadyFriendsArr.push(request.otherUser);
                    }
                }

                if (typeof user.acceptedFriendRequests !== "undefined" && user.acceptedFriendRequests.length > 0) {
                    for (let index = 0; index < user.acceptedFriendRequests.length; index++) {
                        const request = user.acceptedFriendRequests[index];
                        alreadyFriendsArr.push(request.acquaintanceID);
                    }
                }

                resolve(alreadyFriendsArr);
    
            }).catch((err) => {
                console.log(err);
            })
        })

        promiseee.then((passedValues) => {
            axios.get(`${Config.ngrok_url}/gather/all/users`).then((res) => {
                if (res.data.message === "Gathered all users!") {
                    console.log(res.data);
    
                    const { users } = res.data;
    
                    const pooled = [];

                    const usersArrDisplay = [];
    
                    for (let index = 0; index < users.length; index++) {
                        const user = users[index];

                        if (passedValues.includes(user.unique_id)) {
                            pooled.push(user.unique_id);

                            usersArrDisplay.push(user);
                        } else {
                            pooled.push(user.unique_id);
                            
                            usersArrDisplay.push(user);
                        }
    
                        if ((users.length - 1) === index) {
                            this.setState({
                                users: usersArrDisplay,
                                savedUsersInitial: usersArrDisplay,
                                alreadyPooled: pooled
                            }) 
                        }
                    }
    
                    
                } else {
                    console.log("Err", res.data);
                }
            }).catch((err) => {
                console.log(err);
            })
        })  
    }
    onBuffer = (buffer) => {
        console.log("buffer", buffer);
    }
    videoError = (err) => {
        console.log("Err", err);
    }
    renderImageOrVideo = (item) => {
        if (typeof item.profilePics !== "undefined" && item.profilePics.length > 0) {
            if (item.profilePics[item.profilePics.length - 1].type === "video") {
                return <Video source={{ uri: `${Config.wasabi_url}/${item.profilePics[item.profilePics.length - 1].picture}` }}   // Can be a URL or a local file.
                    ref={(ref) => {
                        this.player = ref
                    }} 
                    resizeMode={"cover"}
                    autoPlay 
                    repeat={true}    
                    muted={true}                                 // Store reference
                    onBuffer={this.onBuffer}                // Callback when remote video is buffering
                    onError={this.videoError}               // Callback when video cannot be loaded
                    style={styles.userImage} 
                />;
            } else {
                return <Image style={styles.userImage} source={{ uri: `${Config.wasabi_url}/${item.profilePics[item.profilePics.length - 1].picture}` }}/>;
            }
        } else {
            if (_.has(item, "photo")) {
                return <Image style={styles.userImage} source={{ uri: item.photo }}/>;
            } else {
                return <Image style={styles.userImage} source={{ uri: "https://bootdey.com/img/Content/avatar/avatar7.png" }}/>;
            }
        }
    }
    renderCoverPhoto = (item) => {
        if (typeof item.coverPhotos !== "undefined" && item.coverPhotos.length > 0) {
            return { uri: `${Config.wasabi_url}/${item.coverPhotos[item.coverPhotos.length - 1].picture}` };
        } else {
            return require("../../../assets/images/beach.jpg");
        }
    }
    loadMoreResults = (info) => {
        console.log("info", info);

        if (this.state.filter === true) {

        } else {
            axios.get(`${Config.ngrok_url}/gather/more/users/list`, { 
                params: {
                    alreadyPooled: this.state.alreadyPooled,
                    filtrationType: null
                }
            }).then((res) => {
                if (res.data.message === "Successfully located people!") {
                    console.log(res.data);
    
                    const { people, persons } = res.data;
    
                    this.setState({
                        users: [...this.state.users, ...people],
                        savedUsersInitial: [...this.state.savedUsersInitial, ...people],
                        alreadyPooled: [...this.state.alreadyPooled, ...persons],
                        pending: false
                    })
                } else {
                    console.log("err", res.data);
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    }
    renderLoadingContent = () => {
        const { users } = this.state;
        
        if (typeof users === "undefined" || users.length === 0) {
            return (
                <Fragment>
                <View style={{ flexDirection: "row" }}>
                    <SkeletonPlaceholder>
                       <View style={{ flexDirection: "row" }}>
                            <View style={[styles.loading, { flexDirection: "column", minHeight: 200, minWidth: width * 0.475, maxWidth: width * 0.30 }]}>
                            
                            </View>   
                            <View style={[styles.loading, { flexDirection: "column", minHeight: 200, minWidth: width * 0.475, maxWidth: width * 0.30 }]}>
                                
                            </View> 
                       </View>  
                    </SkeletonPlaceholder>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <SkeletonPlaceholder>
                       <View style={{ flexDirection: "row" }}>
                            <View style={[styles.loading, { flexDirection: "column", minHeight: 200, minWidth: width * 0.475, maxWidth: width * 0.30 }]}>
                            
                            </View>   
                            <View style={[styles.loading, { flexDirection: "column", minHeight: 200, minWidth: width * 0.475, maxWidth: width * 0.30 }]}>
                                
                            </View> 
                       </View>  
                    </SkeletonPlaceholder>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <SkeletonPlaceholder>
                       <View style={{ flexDirection: "row" }}>
                            <View style={[styles.loading, { flexDirection: "column", minHeight: 200, minWidth: width * 0.475, maxWidth: width * 0.30 }]}>
                            
                            </View>   
                            <View style={[styles.loading, { flexDirection: "column", minHeight: 200, minWidth: width * 0.475, maxWidth: width * 0.30 }]}>
                                
                            </View> 
                       </View>  
                    </SkeletonPlaceholder>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <SkeletonPlaceholder>
                       <View style={{ flexDirection: "row" }}>
                            <View style={[styles.loading, { flexDirection: "column", minHeight: 200, minWidth: width * 0.475, maxWidth: width * 0.30 }]}>
                            
                            </View>   
                            <View style={[styles.loading, { flexDirection: "column", minHeight: 200, minWidth: width * 0.475, maxWidth: width * 0.30 }]}>
                                
                            </View> 
                       </View>  
                    </SkeletonPlaceholder>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <SkeletonPlaceholder>
                       <View style={{ flexDirection: "row" }}>
                            <View style={[styles.loading, { flexDirection: "column", minHeight: 200, minWidth: width * 0.475, maxWidth: width * 0.30 }]}>
                            
                            </View>   
                            <View style={[styles.loading, { flexDirection: "column", minHeight: 200, minWidth: width * 0.475, maxWidth: width * 0.30 }]}>
                                
                            </View> 
                       </View>  
                    </SkeletonPlaceholder>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <SkeletonPlaceholder>
                       <View style={{ flexDirection: "row" }}>
                            <View style={[styles.loading, { flexDirection: "column", minHeight: 200, minWidth: width * 0.475, maxWidth: width * 0.30 }]}>
                            
                            </View>   
                            <View style={[styles.loading, { flexDirection: "column", minHeight: 200, minWidth: width * 0.475, maxWidth: width * 0.30 }]}>
                                
                            </View> 
                       </View>  
                    </SkeletonPlaceholder>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <SkeletonPlaceholder>
                       <View style={{ flexDirection: "row" }}>
                            <View style={[styles.loading, { flexDirection: "column", minHeight: 200, minWidth: width * 0.475, maxWidth: width * 0.30 }]}>
                            
                            </View>   
                            <View style={[styles.loading, { flexDirection: "column", minHeight: 200, minWidth: width * 0.475, maxWidth: width * 0.30 }]}>
                                
                            </View> 
                       </View>  
                    </SkeletonPlaceholder>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <SkeletonPlaceholder>
                       <View style={{ flexDirection: "row" }}>
                            <View style={[styles.loading, { flexDirection: "column", minHeight: 200, minWidth: width * 0.475, maxWidth: width * 0.30 }]}>
                            
                            </View>   
                            <View style={[styles.loading, { flexDirection: "column", minHeight: 200, minWidth: width * 0.475, maxWidth: width * 0.30 }]}>
                                
                            </View> 
                       </View>  
                    </SkeletonPlaceholder>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <SkeletonPlaceholder>
                       <View style={{ flexDirection: "row" }}>
                            <View style={[styles.loading, { flexDirection: "column", minHeight: 200, minWidth: width * 0.475, maxWidth: width * 0.30 }]}>
                            
                            </View>   
                            <View style={[styles.loading, { flexDirection: "column", minHeight: 200, minWidth: width * 0.475, maxWidth: width * 0.30 }]}>
                                
                            </View> 
                       </View>  
                    </SkeletonPlaceholder>
                </View>
                </Fragment>
            );
        }
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
    addFriendAndSendRequest = (friend) => {
        console.log("addFriendAndSendRequest", friend);

        axios.post(`${Config.ngrok_url}/send/friend/request`, {
            requesteeId: this.props.unique_id,
            requesteeFullName: this.props.fullName,
            otherUserId: friend.unique_id,
            username: this.props.username
        }).then((res) => {
            if (res.data.message === "Sent friend request!") {
                console.log(res.data);

                this.setState({
                    users: this.state.users.filter((user, index) => {
                        if (user.unique_id !== friend.unique_id) {
                            return user;
                        }
                    }),
                    fullName: "",
                    friend: null
                }, () => {
                    Toast.show({
                        text1: "Successfully sent friend request!",
                        text2: "We have notified the other user and sent your friend request, keep adding more friends!",
                        visibilityTime: 3500,
                        position: "top",
                        type: "success"
                    })
                })
            } else {
                console.log("err", res.data);

                Toast.show({
                    text1: "Error occurred while sending your friend request...",
                    text2: "We've experienced an error sending your friend request, please try again or notify us if the problem persists...",
                    visibilityTime: 3500,
                    position: "top",
                    type: "error"
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    gatherAccountTypes = (accountType) => {
        axios.get(`${Config.ngrok_url}/gather/users/account/type`, { 
            params: {
                accountType: accountType
            }
        }).then((res) => {
            if (res.data.message === "Successfully located specific users!") {
                console.log(res.data);

                const { users } = res.data;

                const alreadyPooled = [];

                for (let index = 0; index < users.length; index++) {
                    const user = users[index];
                    alreadyPooled.push(user.unique_id);
                }

                this.setState({
                    users,
                    alreadyPooled: [...this.state.alreadyPooled, ...alreadyPooled]
                })
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    checkAgeSelection = (start, end) => {

        axios.get(`${Config.ngrok_url}/gather/users/age/range`, { 
            params: {
                start,
                end
            }
        }).then((res) => {
            if (res.data.message === "Successfully located specific users!") {
                console.log(res.data);

                const { users } = res.data;
                
                const alreadyPooled = [];

                for (let index = 0; index < users.length; index++) {
                    const user = users[index];
                    alreadyPooled.push(user.unique_id);
                }

                this.setState({
                    users,
                    alreadyPooled: [...this.state.alreadyPooled, alreadyPooled]
                })
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    removeItem = (passed) => {
        const index = this.state.allTags.indexOf(passed);

        this.state.allTags.splice(index, 1);

        return this.state.allTags;
    }
    handleFilterSearch = () => {
        console.log("handleFilterSearch clicked....");

        const { 
            accountTypeArray,
            jobsCompletedArray,
            ageRangeArray,
            allTags,
            minAmountEarnedArray 
        } = this.state;

        axios.post(`${Config.ngrok_url}/filter/people/specifics`, { 
            allTags,
            id: this.props.unique_id,
            accountTypeArray,
            jobsCompletedArray,
            ageRangeArray,
            minAmountEarnedArray,
            alreadyPooled: this.state.alreadyPooled
        }).then((res) => {
            if (res.data.message === "Successfully located queried jobs!") {
                console.log(res.data);

                const { result, alreadyPooled } = res.data;

                this.setState({
                    users: [...result],
                    alreadyPooled: [...this.state.alreadyPooled, ...alreadyPooled],
                    savedUsersInitial: [...this.state.savedUsersInitial, ...result],
                    filter: false
                }, () => {
                    this.RBSheet.close();
                })
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    render() {
        const { users, list, showAddFriendDialog, fullName, friend } = this.state;

        const friendsAmount = ["Up to 100", "100-200 connections", "300-500 connections", "600-1k connections", "1k-2k and beyond"];

        console.log("this.state people list state", this.state);
        return (
        <View style={Platform.OS === "android" ? styles.containerAndroid : styles.container}>
            <Header style={{ backgroundColor: "#303030" }}>
                <Left>
                    <Button onPress={() => {
                        this.props.props.navigation.goBack();
                    }} transparent>
                        <Image source={require("../../../assets/icons/go-back.png")} style={[styles.headerIcon, { tintColor: "#ffffff" }]} />
                    </Button>
                </Left>
                <Body>
                    <Title style={{ color: "#ffffff" }}>Browse People</Title>
                    <Subtitle style={{ color: "#ffffff" }}>Browse people & more...</Subtitle>
                </Body>
                <Right>
                    <Button onPress={() => {
                        this.setState({
                            list: !this.state.list
                        })
                    }} transparent>
                        <Image source={require("../../../assets/icons/flip-vertical.png")} style={[styles.headerIconRight, { tintColor: "#ffffff" }]} />
                    </Button>
                </Right>
            </Header>
            <Toast ref={(ref) => Toast.setRef(ref)} />
            <RBSheet
                ref={ref => {
                    this.RBSheet = ref;
                }}
                height={height}
                closeOnDragDown={false}
                openDuration={250}
                customStyles={{
                    container: {
                        borderTopRightRadius: 40,
                        borderTopLeftRadius: 40
                    }
                }}
            >
                <Header style={{ backgroundColor: "#303030" }}>
                    <Left>
                        <Button onPress={() => {
                            this.RBSheet.close();
                        }} transparent>
                            <Image source={require("../../../assets/icons/go-back.png")} style={[styles.headerIcon, { tintColor: "#ffffff" }]} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: "#ffffff" }}>Filter Options</Title>
                        <Subtitle style={{ color: "#ffffff" }}>Filter users & more...</Subtitle>
                    </Body>
                    <Right />
                </Header>
                <ScrollView contentContainerStyle={{ paddingBottom: 50 }} showsVerticalScrollIndicator={false} style={styles.containerWhite}>
                    <Text style={styles.mainTextHeader}>Please select your filter options - each selected options with be added to the other selected options...</Text>
                    <Text style={styles.label}>Account Type</Text>
                    <View style={{ marginTop: 10 }} />
                    <CheckBox
                        style={{ flex: 1, padding: 10, width: "100%", height: 40 }}
                        onClick={() => {
                            if (this.state.accountTypeArray.includes("hire")) {
                                this.setState({
                                    accountTypeArray: this.state.accountTypeArray.filter((item) => {
                                        if (item !== "hire") {
                                            return item;
                                        }
                                    }),
                                    allTags: this.removeItem({
                                        type: "accountType",
                                        selected: "hire"
                                    })
                                })
                            } else {
                                this.setState({
                                    accountTypeArray: [...this.state.accountTypeArray, "hire"],
                                    allTags: [...this.state.allTags, {
                                        type: "accountType",
                                        selected: "hire"
                                    }]
                                })
                            }
                        }}
                        checkBoxColor={"blue"}
                        rightText={"Hire"}
                        uncheckedCheckBoxColor={"black"}
                        isChecked={this.state.accountTypeArray.includes("hire") ? true : false}
                    />
                    <View style={{ marginTop: 10 }} />
                    <CheckBox
                        style={{ flex: 1, padding: 10, width: "100%", height: 40 }}
                        onClick={() => {
                            if (this.state.accountTypeArray.includes("work")) {
                                this.setState({
                                    accountTypeArray: this.state.accountTypeArray.filter((item) => {
                                        if (item !== "work") {
                                            return item;
                                        }
                                    }),
                                    allTags: this.removeItem({
                                        type: "accountType",
                                        selected: "work"
                                    })
                                })
                            } else {
                                this.setState({
                                    accountTypeArray: [...this.state.accountTypeArray, "work"],
                                    allTags: [...this.state.allTags, {
                                        type: "accountType",
                                        selected: "work"
                                    }]
                                })
                            }
                        }}
                        checkBoxColor={"blue"}
                        rightText={"Work"}
                        uncheckedCheckBoxColor={"black"}
                        isChecked={this.state.accountTypeArray.includes("work") ? true : false}
                    />
                    <View style={{ marginTop: 10 }} />
                    <Text style={styles.label}>Age Range</Text>
                    <View style={{ marginTop: 10 }} />
                    <CheckBox
                        style={{ flex: 1, padding: 10, width: "100%", height: 40 }}
                        onClick={() => {
                            if (this.state.ageRangeArray.includes("18-25")) {
                                this.setState({
                                    ageRangeArray: this.state.ageRangeArray.filter((item) => {
                                        if (item !== "18-25") {
                                            return item;
                                        }
                                    }),
                                    allTags: this.removeItem({
                                        type: "ageRange",
                                        selected: "18-25"
                                    })
                                })
                            } else {
                                this.setState({
                                    ageRangeArray: [...this.state.ageRangeArray, "18-25"],
                                    allTags: [...this.state.allTags, {
                                        type: "ageRange",
                                        selected: "18-25"
                                    }]
                                })
                            }
                        }}
                        checkBoxColor={"blue"}
                        rightText={"Ages 18-25..."}
                        uncheckedCheckBoxColor={"black"}
                        isChecked={this.state.ageRangeArray.includes("18-25") ? true : false}
                    />
                    <View style={{ marginTop: 10 }} />
                    <CheckBox
                        style={{ flex: 1, padding: 10, width: "100%", height: 40 }}
                        onClick={() => {
                            if (this.state.ageRangeArray.includes("26-35")) {
                                this.setState({
                                    ageRangeArray: this.state.ageRangeArray.filter((item) => {
                                        if (item !== "26-35") {
                                            return item;
                                        }
                                    }),
                                    allTags: this.removeItem({
                                        type: "ageRange",
                                        selected: "26-35"
                                    })
                                })
                            } else {
                                this.setState({
                                    ageRangeArray: [...this.state.ageRangeArray, "26-35"],
                                    allTags: [...this.state.allTags, {
                                        type: "ageRange",
                                        selected: "26-35"
                                    }]
                                })
                            }
                        }}
                        checkBoxColor={"blue"}
                        rightText={"Ages 26-35..."}
                        uncheckedCheckBoxColor={"black"}
                        isChecked={this.state.ageRangeArray.includes("26-35") ? true : false}
                    />
                    <View style={{ marginTop: 10 }} />
                    <CheckBox
                        style={{ flex: 1, padding: 10, width: "100%", height: 40 }}
                        onClick={() => {
                            if (this.state.ageRangeArray.includes("36-45")) {
                                this.setState({
                                    ageRangeArray: this.state.ageRangeArray.filter((item) => {
                                        if (item !== "36-45") {
                                            return item;
                                        }
                                    }),
                                    allTags: this.removeItem({
                                        type: "ageRange",
                                        selected: "36-45"
                                    })
                                })
                            } else {
                                this.setState({
                                    ageRangeArray: [...this.state.ageRangeArray, "36-45"],
                                    allTags: [...this.state.allTags, {
                                        type: "ageRange",
                                        selected: "36-45"
                                    }]
                                })
                            }
                        }}
                        checkBoxColor={"blue"}
                        rightText={"Ages 36-45..."}
                        uncheckedCheckBoxColor={"black"}
                        isChecked={this.state.ageRangeArray.includes("36-45") ? true : false}
                    />
                     <View style={{ marginTop: 10 }} />
                    <CheckBox
                        style={{ flex: 1, padding: 10, width: "100%", height: 40 }}
                        onClick={() => {
                            if (this.state.ageRangeArray.includes("46-55")) {
                                this.setState({
                                    ageRangeArray: this.state.ageRangeArray.filter((item) => {
                                        if (item !== "46-55") {
                                            return item;
                                        }
                                    }),
                                    allTags: this.removeItem({
                                        type: "ageRange",
                                        selected: "46-55"
                                    })
                                })
                            } else {
                                this.setState({
                                    ageRangeArray: [...this.state.ageRangeArray, "46-55"],
                                    allTags: [...this.state.allTags, {
                                        type: "ageRange",
                                        selected: "46-55"
                                    }]
                                })
                            }
                        }}
                        checkBoxColor={"blue"}
                        rightText={"Ages 46-55..."}
                        uncheckedCheckBoxColor={"black"}
                        isChecked={this.state.ageRangeArray.includes("46-55") ? true : false}
                    />
                     <View style={{ marginTop: 10 }} />
                    <CheckBox
                        style={{ flex: 1, padding: 10, width: "100%", height: 40 }}
                        onClick={() => {
                            if (this.state.ageRangeArray.includes("56+")) {
                                this.setState({
                                    ageRangeArray: this.state.ageRangeArray.filter((item) => {
                                        if (item !== "56+") {
                                            return item;
                                        }
                                    }),
                                    allTags: this.removeItem({
                                        type: "ageRange",
                                        selected: "56+"
                                    })
                                })
                            } else {
                                this.setState({
                                    ageRangeArray: [...this.state.ageRangeArray, "56+"],
                                    allTags: [...this.state.allTags, {
                                        type: "ageRange",
                                        selected: "56+"
                                    }]
                                })
                            }
                        }}
                        checkBoxColor={"blue"}
                        rightText={"Ages 56+..."}
                        uncheckedCheckBoxColor={"black"}
                        isChecked={this.state.ageRangeArray.includes("56+") ? true : false}
                    />
                    <View style={{ marginTop: 10 }} />
                    <Text style={styles.label}>Jobs Completed</Text>
                    <View style={{ marginTop: 10 }} />
                    <CheckBox
                        style={{ flex: 1, padding: 10, width: "100%", height: 40 }}
                        onClick={() => {
                            if (this.state.jobsCompletedArray.includes("1-3")) {
                                this.setState({
                                    jobsCompletedArray: this.state.jobsCompletedArray.filter((item) => {
                                        if (item !== "1-3") {
                                            return item;
                                        }
                                    }),
                                    allTags: this.removeItem({
                                        type: "jobsCompleted",
                                        selected: "1-3"
                                    })
                                })
                            } else {
                                this.setState({
                                    jobsCompletedArray: [...this.state.jobsCompletedArray, "1-3"],
                                    allTags: [...this.state.allTags, {
                                        type: "jobsCompleted",
                                        selected: "1-3"
                                    }]
                                })
                            }
                        }}
                        checkBoxColor={"blue"}
                        rightText={"Worked 1-3 jobs previously"}
                        uncheckedCheckBoxColor={"black"}
                        isChecked={this.state.jobsCompletedArray.includes("18-25") ? true : false}
                    />
                    <View style={{ marginTop: 10 }} />
                    <CheckBox
                        style={{ flex: 1, padding: 10, width: "100%", height: 40 }}
                        onClick={() => {
                            if (this.state.jobsCompletedArray.includes("4-6")) {
                                this.setState({
                                    jobsCompletedArray: this.state.jobsCompletedArray.filter((item) => {
                                        if (item !== "4-6") {
                                            return item;
                                        }
                                    }),
                                    allTags: this.removeItem({
                                        type: "jobsCompleted",
                                        selected: "4-6"
                                    })
                                })
                            } else {
                                this.setState({
                                    jobsCompletedArray: [...this.state.jobsCompletedArray, "4-6"],
                                    allTags: [...this.state.allTags, {
                                        type: "jobsCompleted",
                                        selected: "4-6"
                                    }]
                                })
                            }
                        }}
                        checkBoxColor={"blue"}
                        rightText={"Worked 4-6 jobs previously..."}
                        uncheckedCheckBoxColor={"black"}
                        isChecked={this.state.jobsCompletedArray.includes("4-6") ? true : false}
                    />
                    <View style={{ marginTop: 10 }} />
                    <CheckBox
                        style={{ flex: 1, padding: 10, width: "100%", height: 40 }}
                        onClick={() => {
                            if (this.state.jobsCompletedArray.includes("7-10")) {
                                this.setState({
                                    jobsCompletedArray: this.state.jobsCompletedArray.filter((item) => {
                                        if (item !== "7-10") {
                                            return item;
                                        }
                                    }),
                                    allTags: this.removeItem({
                                        type: "jobsCompleted",
                                        selected: "7-10"
                                    })
                                })
                            } else {
                                this.setState({
                                    jobsCompletedArray: [...this.state.jobsCompletedArray, "7-10"],
                                    allTags: [...this.state.allTags, {
                                        type: "jobsCompleted",
                                        selected: "7-10"
                                    }]
                                })
                            }
                        }}
                        checkBoxColor={"blue"}
                        rightText={"Worked 7-10 jobs previously..."}
                        uncheckedCheckBoxColor={"black"}
                        isChecked={this.state.jobsCompletedArray.includes("7-10") ? true : false}
                    />
                    <View style={{ marginTop: 10 }} />
                    <CheckBox
                        style={{ flex: 1, padding: 10, width: "100%", height: 40 }}
                        onClick={() => {
                            if (this.state.jobsCompletedArray.includes("10+")) {
                                this.setState({
                                    jobsCompletedArray: this.state.jobsCompletedArray.filter((item) => {
                                        if (item !== "10+") {
                                            return item;
                                        }
                                    }),
                                    allTags: this.removeItem({
                                        type: "jobsCompleted",
                                        selected: "10+"
                                    })
                                })
                            } else {
                                this.setState({
                                    jobsCompletedArray: [...this.state.jobsCompletedArray, "10+"],
                                    allTags: [...this.state.allTags, {
                                        type: "jobsCompleted",
                                        selected: "10+"
                                    }]
                                })
                            }
                        }}
                        checkBoxColor={"blue"}
                        rightText={"Worked 10+ jobs previously..."}
                        uncheckedCheckBoxColor={"black"}
                        isChecked={this.state.jobsCompletedArray.includes("10+") ? true : false}
                    />
                    <View style={{ marginTop: 10 }} />
                    <Text style={styles.label}>Min-Amount Earned</Text>
                    <View style={{ marginTop: 10 }} />
                    <CheckBox
                        style={{ flex: 1, padding: 10, width: "100%", height: 40 }}
                        onClick={() => {
                            if (this.state.minAmountEarnedArray.includes(100)) {
                                this.setState({
                                    minAmountEarnedArray: this.state.minAmountEarnedArray.filter((item) => {
                                        if (item !== 100) {
                                            return item;
                                        }
                                    }),
                                    allTags: this.removeItem({
                                        type: "minAmountEarned",
                                        selected: 100
                                    })
                                })
                            } else {
                                this.setState({
                                    minAmountEarnedArray: [...this.state.minAmountEarnedArray, 100],
                                    allTags: [...this.state.allTags, {
                                        type: "minAmountEarned",
                                        selected: 100
                                    }]
                                })
                            }
                        }}
                        checkBoxColor={"blue"}
                        rightText={"Earned $100 or less..."}
                        uncheckedCheckBoxColor={"black"}
                        isChecked={this.state.minAmountEarnedArray.includes(100) ? true : false}
                    />
                    <View style={{ marginTop: 10 }} />
                    <CheckBox
                        style={{ flex: 1, padding: 10, width: "100%", height: 40 }}
                        onClick={() => {
                            if (this.state.minAmountEarnedArray.includes(500)) {
                                this.setState({
                                    minAmountEarnedArray: this.state.minAmountEarnedArray.filter((item) => {
                                        if (item !== 500) {
                                            return item;
                                        }
                                    }),
                                    allTags: this.removeItem({
                                        type: "minAmountEarned",
                                        selected: 500
                                    })
                                })
                            } else {
                                this.setState({
                                    minAmountEarnedArray: [...this.state.minAmountEarnedArray, 500],
                                    allTags: [...this.state.allTags, {
                                        type: "minAmountEarned",
                                        selected: 500
                                    }]
                                })
                            }
                        }}
                        checkBoxColor={"blue"}
                        rightText={"Earned $500 or less..."}
                        uncheckedCheckBoxColor={"black"}
                        isChecked={this.state.minAmountEarnedArray.includes(500) ? true : false}
                    />
                    <View style={{ marginTop: 10 }} />
                    <CheckBox
                        style={{ flex: 1, padding: 10, width: "100%", height: 40 }}
                        onClick={() => {
                            if (this.state.minAmountEarnedArray.includes(1000)) {
                                this.setState({
                                    minAmountEarnedArray: this.state.minAmountEarnedArray.filter((item) => {
                                        if (item !== 1000) {
                                            return item;
                                        }
                                    }),
                                    allTags: this.removeItem({
                                        type: "minAmountEarned",
                                        selected: 1000
                                    })
                                })
                            } else {
                                this.setState({
                                    minAmountEarnedArray: [...this.state.minAmountEarnedArray, 1000],
                                    allTags: [...this.state.allTags, {
                                        type: "minAmountEarned",
                                        selected: 1000
                                    }]
                                })
                            }
                        }}
                        checkBoxColor={"blue"}
                        rightText={"Earned $1,000 or less..."}
                        uncheckedCheckBoxColor={"black"}
                        isChecked={this.state.minAmountEarnedArray.includes(1000) ? true : false}
                    />
                    <View style={{ marginTop: 10 }} />
                    <CheckBox
                        style={{ flex: 1, padding: 10, width: "100%", height: 40 }}
                        onClick={() => {
                            if (this.state.minAmountEarnedArray.includes(1500)) {
                                this.setState({
                                    minAmountEarnedArray: this.state.minAmountEarnedArray.filter((item) => {
                                        if (item !== 1500) {
                                            return item;
                                        }
                                    }),
                                    allTags: this.removeItem({
                                        type: "minAmountEarned",
                                        selected: 1500
                                    })
                                })
                            } else {
                                this.setState({
                                    minAmountEarnedArray: [...this.state.minAmountEarnedArray, 1500],
                                    allTags: [...this.state.allTags, {
                                        type: "minAmountEarned",
                                        selected: 1500
                                    }]
                                })
                            }
                        }}
                        checkBoxColor={"blue"}
                        rightText={"Earned $1,500 or less..."}
                        uncheckedCheckBoxColor={"black"}
                        isChecked={this.state.minAmountEarnedArray.includes(1500) ? true : false}
                    />
                    <View style={{ marginTop: 10 }} />
                    <CheckBox
                        style={{ flex: 1, padding: 10, width: "100%", height: 40 }}
                        onClick={() => {
                            if (this.state.minAmountEarnedArray.includes(2500)) {
                                this.setState({
                                    minAmountEarnedArray: this.state.minAmountEarnedArray.filter((item) => {
                                        if (item !== 2500) {
                                            return item;
                                        }
                                    }),
                                    allTags: this.removeItem({
                                        type: "minAmountEarned",
                                        selected: 2500
                                    })
                                })
                            } else {
                                this.setState({
                                    minAmountEarnedArray: [...this.state.minAmountEarnedArray, 2500],
                                    allTags: [...this.state.allTags, {
                                        type: "minAmountEarned",
                                        selected: 2500
                                    }]
                                })
                            }
                        }}
                        checkBoxColor={"blue"}
                        rightText={"Earned $2,500 or less..."}
                        uncheckedCheckBoxColor={"black"}
                        isChecked={this.state.minAmountEarnedArray.includes(2500) ? true : false}
                    />
                    <View style={{ marginTop: 10 }} />
                    <CheckBox
                        style={{ flex: 1, padding: 10, width: "100%", height: 40 }}
                        onClick={() => {
                            if (this.state.minAmountEarnedArray.includes(5000)) {
                                this.setState({
                                    minAmountEarnedArray: this.state.minAmountEarnedArray.filter((item) => {
                                        if (item !== 5000) {
                                            return item;
                                        }
                                    }),
                                    allTags: this.removeItem({
                                        type: "minAmountEarned",
                                        selected: 5000
                                    })
                                })
                            } else {
                                this.setState({
                                    minAmountEarnedArray: [...this.state.minAmountEarnedArray, 5000],
                                    allTags: [...this.state.allTags, {
                                        type: "minAmountEarned",
                                        selected: 5000
                                    }]
                                })
                            }
                        }}
                        checkBoxColor={"blue"}
                        rightText={"Earned $5,000 or less..."}
                        uncheckedCheckBoxColor={"black"}
                        isChecked={this.state.minAmountEarnedArray.includes(5000) ? true : false}
                    />
                    <View style={{ marginTop: 10 }} />
                    <CheckBox
                        style={{ flex: 1, padding: 10, width: "100%", height: 40 }}
                        onClick={() => {
                            if (this.state.minAmountEarnedArray.includes(100000)) {
                                this.setState({
                                    minAmountEarnedArray: this.state.minAmountEarnedArray.filter((item) => {
                                        if (item !== 100000) {
                                            return item;
                                        }
                                    }),
                                    allTags: this.removeItem({
                                        type: "minAmountEarned",
                                        selected: 100000
                                    })
                                })
                            } else {
                                this.setState({
                                    minAmountEarnedArray: [...this.state.minAmountEarnedArray, 100000],
                                    allTags: [...this.state.allTags, {
                                        type: "minAmountEarned",
                                        selected: 100000
                                    }]
                                })
                            }
                        }}
                        checkBoxColor={"blue"}
                        rightText={"Earned $5,000 or more..."}
                        uncheckedCheckBoxColor={"black"}
                        isChecked={this.state.minAmountEarnedArray.includes(100000) ? true : false}
                    />
                    <View style={{ marginTop: 50 }} />
                    <AwesomeButtonBlue type={"secondary"} backgroundColor={"#0057ff"} textColor={"#ffffff"} onPress={() => {
                        this.handleFilterSearch();
                    }} stretch={true}>Search with filter options</AwesomeButtonBlue>
                </ScrollView>
            </RBSheet>
            <View>
                <Dialog.Container visible={showAddFriendDialog}>
                <Dialog.Title>Are you sure you'd like to send {fullName} a friend request?</Dialog.Title>
                <Dialog.Description>
                    This will send them a friend request, you cannot undo this action once sent... would you still like to send?
                </Dialog.Description>
                <Dialog.Button onPress={() => {
                    this.setState({
                        fullName: "",
                        showAddFriendDialog: false
                    })
                }} label="Cancel" />
                <Dialog.Button onPress={() => {
                    this.setState({
                        fullName: "",
                        showAddFriendDialog: false
                    }, () => {
                        this.addFriendAndSendRequest(friend);
                    })
                }} label="SEND!" />
                </Dialog.Container>
            </View>
            <View style={styles.row}>
                <SearchBar
                    style={{ width: width * 0.85, height: 55 }}
                    ref="searchBar"
                    placeholder="Search for people's names..."
                    onChangeText={(searchValue) => {
                        this.setState({
                            searchValue
                        })
                    }}
                    barTintColor={"white"}
                    textFieldBackgroundColor={"#f0f0f0"}
                    onSearchButtonPress={this.handleSearch}
                    onCancelButtonPress={this.handleCancellation}
                />
                <View style={{ width: width * 0.15, backgroundColor: "white" }}>
                    <TouchableOpacity onPress={() => {
                        this.setState({
                            alreadyPooled: [],
                            filter: true
                        }, () => {
                            this.RBSheet.open();
                        })
                    }} style={styles.maxedViewOutter}>
                        <Image source={require("../../../assets/icons/filter.png")} style={styles.maxedView} />
                    </TouchableOpacity>
                </View>
            </View>
                {list === true ? <List>
                        <FlatList
                            data={users}
                            keyExtractor={(item) => item._id}
                            onEndReachedThreshold={0.1}
                            onEndReached={info => {
                                if (info.distanceFromEnd >= 0 && this.state.pending === false) {
                                    this.setState({
                                        pending: true
                                    }, () => {
                                        this.loadMoreResults(info);
                                    })
                                }
                            }}
                            contentContainerStyle={{ paddingBottom: 100 }}
                            renderItem={({ item, index }) => {
                                let fullName = item.firstName + ' ' + item.lastName;
                                    
                                if (fullName.toLowerCase().includes(this.state.searchValue.toLowerCase())) {
                                    return (
                                        <ListItem key={index} thumbnail>
                                            <Left>
                                                {this.renderProfilePictureVideo(item)}
                                            </Left>
                                            <Body>
                                                <Text>{fullName}</Text>
                                                <Text style={{ color: "#ffffff" }} note numberOfLines={2}>Connect with {fullName} and send them a friend request!</Text>
                                                <View style={{ flexDirection: "row", marginTop: 5 }}>
                                                    <Button onPress={() => {
                                                        this.setState({
                                                            fullName,
                                                            friend: item,
                                                            showAddFriendDialog: true
                                                        })
                                                    }} style={[styles.buttonCustom, { marginRight: 15 }]} info>
                                                        <Text style={[styles.customText, { color: "white" }]}>Add Friend</Text>
                                                    </Button>
                                                    <Button onPress={() => {
                                                        this.handleClick(item);
                                                    }} style={styles.buttonCustom} light>
                                                        <Text style={[styles.customText, { color: "white" }]}>View Profile</Text>
                                                    </Button>
                                                </View>
                                            </Body>
                                        </ListItem>
                                    )
                                }
                            }}
                        />
                    </List> : <View><FlatList
                    contentContainerStyle={{ flexDirection: "row", flexWrap: 'wrap' }}
                    data={users}
                    keyExtractor={(item) => item._id}
                    onEndReachedThreshold={0.1}
                    onEndReached={info => {
                    
                        if (info.distanceFromEnd >= 0 && this.state.pending === false) {
                            this.setState({
                                pending: true
                            }, () => {
                                this.loadMoreResults(info);
                            })
                        }
                    }}
                    numColumns={2}
                    renderItem={({ item, index }) => {
                        let fullName = item.firstName + ' ' + item.lastName;
                            
                        if (fullName.toLowerCase().includes(this.state.searchValue.toLowerCase())) {
                            return (
                                <View key={index} style={styles.card}>
                                    <TouchableOpacity onPress={() => {}} style={styles.ion}>
                                        <Image style={styles.iconSpecial} source={require("../../../assets/icons/blueheart.png")}/>
                                    </TouchableOpacity>
                                    <ImageBackground source={this.renderCoverPhoto(item)} style={styles.cardHeader}>
                                        <View style={styles.centered}>
                                            {this.renderImageOrVideo(item)}
                                        </View>
                                    </ImageBackground>
                                    <View style={styles.cardFooter}>
                                    <View style={{alignItems:"center", justifyContent:"center"}}>
                                        <Text style={styles.name}>{item.firstName} {item.lastName}</Text>
                                        <Text style={styles.position}>{item.accountType}</Text>
                                        <TouchableOpacity style={styles.followButton} onPress={()=> {
                                            this.handleClick(item);
                                        }}>
                                        <Text style={styles.followButtonText}>View Profile</Text>  
                                        </TouchableOpacity>
                                    </View>
                                    </View>
                                </View>
                            )
                        }
                    }}
                /></View>}
                {this.renderLoadingContent()}
            {/* </ScrollView> */}
        </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.signupData.authData.unique_id,
        fullName: `${state.signupData.authData.firstName} ${state.signupData.authData.lastName}`,
        username: state.signupData.authData.username
    }
}
export default connect(mapStateToProps, { })(PeopleBrowseListHelper);