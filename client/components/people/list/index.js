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
        list: false,
        showAddFriendDialog: false
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
                        } else {
                            pooled.push(user.unique_id);
                            
                            usersArrDisplay.push(user);
                        }
    
                        if ((users.length - 1) === index) {
                            this.setState({
                                users: usersArrDisplay,
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

        axios.get(`${Config.ngrok_url}/gather/more/users/list`, { 
            params: {
                alreadyPooled: this.state.alreadyPooled
            }
        }).then((res) => {
            if (res.data.message === "Successfully located people!") {
                console.log(res.data);

                const { people, persons } = res.data;

                this.setState({
                    users: [...this.state.users, ...people],
                    alreadyPooled: [...this.state.alreadyPooled, ...persons]
                })
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
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
    render() {
        const { users, list, showAddFriendDialog, fullName, friend } = this.state;

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
                            list: true
                        })
                    }} transparent>
                        <Image source={require("../../../assets/icons/flip-vertical.png")} style={[styles.headerIconRight, { tintColor: "#ffffff" }]} />
                    </Button>
                </Right>
            </Header>
            <Toast ref={(ref) => Toast.setRef(ref)} />
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
            <SearchBar
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
            {/* <ScrollView contentContainerStyle={styles.containerStyle} style={styles.list}> */}
                {list === true ? <List>
                        <FlatList
                            data={users}
                            keyExtractor={(item) => item._id}
                            onEndReachedThreshold={0.01}
                            onEndReached={info => {
                                this.loadMoreResults(info);
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
                    </List> : <FlatList
                    data={users}
                    keyExtractor={(item) => item._id}
                    onEndReachedThreshold={0.01}
                    onEndReached={info => {
                        this.loadMoreResults(info);
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
                />}
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