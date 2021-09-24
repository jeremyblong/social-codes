import React, { Component, Fragment } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { Header, Left, Body, Right, Button, Icon, Title, Footer, FooterTab, Subtitle, List, ListItem, Item, Label, Input } from 'native-base';
import styles from './styles.js';
import SearchBar from 'react-native-search-bar';
import Config from "react-native-config";
import axios from "axios";
import moment from "moment";
import SideMenu from "react-native-side-menu";
import Side from "../../navigation/sidemenu/index.js";
import { CometChat } from "@cometchat-pro/react-native-chat";
import Video from 'react-native-video';
import { TabBar, TabView, SceneMap } from 'react-native-tab-view';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import RBSheet from "react-native-raw-bottom-sheet";
import Autocomplete from "react-native-autocomplete-input";
import RNPickerSelect from 'react-native-picker-select';
import uuid from "react-native-uuid";
import { connect } from "react-redux";
import Toast from 'react-native-toast-message';
import DialogInput from 'react-native-dialog-input';
import { showMessage, hideMessage } from "react-native-flash-message";
import _ from "lodash";

const { height, width } = Dimensions.get("window");

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
});
  

class MessagingHomeChannelsHelper extends Component {
constructor (props) {
    super(props);

    this.state = {
        data: [],
        conversationList: [],
        selected: [],
        friends: [],
        convos: [],
        hide: true,
        index: 0,
        password: "",
        groupName: "",
        conversationSelected: null,
        groupConversations: [],
        isDialogVisible: false,
        privacy: null,
        routes: [
            { key: 'first', title: 'Private' },
            { key: 'second', title: 'Groups' },
        ]
    }
}
    handleCancellation = () => {
        console.log("cancelled.")
    }
    handleSearch = () => {
        console.log("handleSearch clicked.");
    }
    componentDidMount() {
        const conversationsRequest = new CometChat.ConversationsRequestBuilder().setLimit(50).setConversationType("user").build();

        conversationsRequest.fetchNext().then(
            conversationList => {
                console.log("Conversations list received:", conversationList);

                if (typeof conversationList !== "undefined" && conversationList.length === 0) {
                    this.setState({
                        index: 0
                    })
                } else {
                    axios.post(`${Config.ngrok_url}/gather/profile/pictures`, {
                        conversationList
                    }).then((res) => {
                        if (res.data.message === "Success!") {
                            console.log(res.data);
    
                            const { convos } = res.data;
    
                            this.setState({
                                convos,
                                index: 0
                            })
                        } else {
                            console.log("Err", res.data);
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                }
            },
            error => {
                console.log("Conversations list fetching failed with error:", error);
            }
        );

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
    }
    fetchGroupConversations = () => {
        const groupsRequest = new CometChat.GroupsRequestBuilder().setLimit(35).joinedOnly(true).build();

        groupsRequest.fetchNext().then(
            conversationList => {
                console.log("Group conversations list received:", conversationList);

                if (typeof conversationList !== "undefined" && conversationList.length === 0) {
                    this.setState({
                        groupConversations: []
                    });
                } else {
                    axios.post(`${Config.ngrok_url}/gather/profile/pictures/group`, {
                        conversationList
                    }).then((res) => {
                        if (res.data.message === "Success!") {
                            console.log(res.data);
    
                            const { convos } = res.data;
    
                            this.setState({
                                groupConversations: convos
                            })
                        } else {
                            console.log("Err", res.data);
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                }
            },
            error => {
                console.log("Group conversations list fetching failed with error:", error);
            }
        );
    }
    fetchIndividualConversations = () => {
        const conversationsRequest = new CometChat.ConversationsRequestBuilder().setLimit(50).setConversationType("user").build();

        conversationsRequest.fetchNext().then(
            conversationList => {
                console.log("Conversations list received:", conversationList);

                axios.post(`${Config.ngrok_url}/gather/profile/pictures`, {
                    conversationList
                }).then((res) => {
                    if (res.data.message === "Success!") {
                        console.log(res.data);

                        const { convos } = res.data;

                        this.setState({
                            convos
                        })
                    } else {
                        console.log("Err", res.data);
                    }
                }).catch((err) => {
                    console.log(err);
                })
            },
            error => {
                console.log("Conversations list fetching failed with error:", error);
            }
        );
    }
    _renderTabBar = (props) => {  
        console.log("props", props);  
        return (
            <Footer style={styles.absoluteBottom}>
                {props.navigationState.routes.map((route, i) => {
                    if (route.key === this.state.routes[this.state.index].key) {
                        return (
                            <Button key={i} onPress={() => {
                                    this.setState({ 
                                        index: i 
                                    }, () => {
                                        this.fetchIndividualConversations();
                                    })
                                }} style={styles.greyButton} active>
                                    <Text style={styles.goldText}>{route.title}</Text>
                            </Button>
                        );
                    } else {
                        return (
                            <Button key={i} onPress={() => {
                                this.setState({ 
                                    index: i 
                                }, () => {
                                    this.fetchGroupConversations();
                                })
                            }} style={styles.greyButton} active>
                                <Text style={styles.goldText}>{route.title}</Text>
                            </Button>
                        );
                    }
                })}
          </Footer>
        );
    };
    calculateType = (type) => {
        switch (type) {
            case "password":
                return "Password Required";
                break;
            case "public":
                return "Anyone/Open";
                break;
            case "private":
                return "Invite ONLY";
            default:
                break;
        }
    }
    renderScene = ({ route, jumpTo }) => {
        const { convos, data, groupConversations } = this.state;

        switch (route.key) {
          case 'first':
            return (
                <Fragment>
                    <ScrollView style={styles.container}>
                        <SearchBar
                            ref="searchBar"
                            placeholder="Search"
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
                        <View style={{ margin: 5 }}>
                            <ScrollView showsHorizontalScrollIndicator={false} style={styles.horizontalScroll} horizontal={true}>
                                <TouchableOpacity style={[styles.centered, { marginTop: 10 }]} onPress={() => {

                                }}>
                                    <View style={styles.circle}>
                                        <Image source={require("../../../assets/icons/plus.png")} style={{ maxWidth: 30, maxHeight: 30 }} />    
                                    </View>
                                    <View style={{ marginTop: 0 }} />
                                    <Text style={[styles.name, { marginTop: 10 }]}>Your Story</Text>
                                </TouchableOpacity>
                                {typeof data !== "undefined" && data.length > 0 ? data.map((person, index) => {
                                    if (index % 3 === 0) {
                                        return (
                                            <TouchableOpacity key={index} style={styles.centered} onPress={() => {

                                            }}>
                                                <View style={[styles.circleTwo, { borderColor: "blue", borderWidth: 4 }]}>
                                                    <Image source={{ uri: person.picture.large }} style={{ maxWidth: "100%", maxHeight: "100%", minWidth: "100%", minHeight: "100%", borderRadius: 40, marginTop: 0 }} />    
                                                </View>
                                                <Text style={styles.name}>{person.name.first}</Text>
                                            </TouchableOpacity>
                                        );
                                    } else {
                                        return (
                                            <TouchableOpacity key={index} style={styles.centered} onPress={() => {

                                            }}>
                                                <View style={styles.circleTwo}>
                                                    <Image source={{ uri: person.picture.large }} style={{ maxWidth: "100%", maxHeight: "100%", minWidth: "100%", minHeight: "100%", borderRadius: 40, marginTop: 0 }} />    
                                                </View>
                                                <Text style={styles.name}>{person.name.first}</Text>
                                            </TouchableOpacity>
                                        );
                                    }
                                }) : null}
                            </ScrollView>
                            <ScrollView showsVerticalScrollIndicator={false} style={styles.myScroller} contentContainerStyle={styles.containerStyle}>
                                {typeof convos !== "undefined" && convos.length > 0 ? convos.map((conversation, index) => {
                                    if (conversation.profilePic.type === "video") {
                                        if (index % 3 === 0) {
                                            return (
                                                <TouchableOpacity key={index} style={[styles.centered, { flexDirection: "row" }]} onPress={() => {
                                                    this.props.props.navigation.push("individual-message-thread", { conversation })
                                                }}>
                                                    <View style={styles.columnLeft}>
                                                        <View style={styles.centered}>
                                                            <View style={[styles.circleTwo, { borderColor: "blue", borderWidth: 4 }]}>
                                                                <Video  
                                                                    resizeMode="cover"
                                                                    repeat
                                                                    source={{uri: `${Config.wasabi_url}/${conversation.profilePic.picture}` }} 
                                                                    autoplay={true}
                                                                    ref={(ref) => {
                                                                        this.player = ref
                                                                    }}
                                                                    muted={true}
                                                                    style={{ maxWidth: "100%", maxHeight: "100%", minWidth: "100%", minHeight: "100%", borderRadius: 40, marginTop: 0 }}
                                                                />  
                                                            </View>
                                                        
                                                        </View>
                                                    </View>
                                                    <View style={styles.rightColumn}>
                                                        <Text style={styles.topTextSmall}>{conversation.conversationWith.name}</Text>
                                                        <Text style={styles.topTextSmaller}>{conversation.lastMessage.text && conversation.lastMessage.text.length > 0 ? conversation.lastMessage.text.slice(0, 30) : ""}... {moment(new Date(conversation.lastMessage.sentAt * 1000)).fromNow()}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            );
                                        } else {
                                            return (
                                                <TouchableOpacity key={index} style={[styles.centered, { flexDirection: "row" }]} onPress={() => {
                                                    this.props.props.navigation.push("individual-message-thread", { conversation })
                                                }}>
                                                    <View style={styles.columnLeft}>
                                                        <View style={styles.centered}>
                                                            <View style={styles.circleTwo}>
                                                                <Video  
                                                                    resizeMode="cover"
                                                                    repeat
                                                                    source={{uri: `${Config.wasabi_url}/${conversation.profilePic.picture}` }} 
                                                                    autoplay={true}
                                                                    ref={(ref) => {
                                                                        this.player = ref
                                                                    }}
                                                                    muted={true}
                                                                    style={{ maxWidth: "100%", maxHeight: "100%", minWidth: "100%", minHeight: "100%", borderRadius: 40, marginTop: 0 }}
                                                                />  
                                                            </View>
                                                        
                                                        </View>
                                                    </View>
                                                    <View style={styles.rightColumn}>
                                                        <Text style={styles.topTextSmall}>{conversation.conversationWith.name}</Text>
                                                        <Text style={styles.topTextSmaller}>{conversation.lastMessage.text && conversation.lastMessage.text.length > 0 ? conversation.lastMessage.text.slice(0, 30) : ""}... {moment(new Date(conversation.lastMessage.sentAt * 1000)).fromNow()}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            );
                                        }
                                    } else {
                                        if (index % 3 === 0) {
                                            return (
                                                <TouchableOpacity key={index} style={[styles.centered, { flexDirection: "row" }]} onPress={() => {
                                                    this.props.props.navigation.push("individual-message-thread", { conversation })
                                                }}>
                                                    <View style={styles.columnLeft}>
                                                        <View style={styles.centered}>
                                                            <View style={[styles.circleTwo, { borderColor: "blue", borderWidth: 4 }]}>
                                                                <Image source={{ uri: `${Config.wasabi_url}/${conversation.profilePic.picture}` }} style={{ maxWidth: "100%", maxHeight: "100%", minWidth: "100%", minHeight: "100%", borderRadius: 40, marginTop: 0 }} />    
                                                            </View>
                                                        
                                                        </View>
                                                    </View>
                                                    <View style={styles.rightColumn}>
                                                        <Text style={styles.topTextSmall}>{conversation.conversationWith.name}</Text>
                                                        <Text style={styles.topTextSmaller}>{conversation.lastMessage.text && conversation.lastMessage.text.length > 0 ? conversation.lastMessage.text.slice(0, 30) : ""}... {moment(new Date(conversation.lastMessage.sentAt * 1000)).fromNow()}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            );
                                        } else {
                                            return (
                                                <TouchableOpacity key={index} style={[styles.centered, { flexDirection: "row" }]} onPress={() => {
                                                    this.props.props.navigation.push("individual-message-thread", { conversation })
                                                }}>
                                                    <View style={styles.columnLeft}>
                                                        <View style={styles.centered}>
                                                            <View style={styles.circleTwo}>
                                                                <Image source={{ uri: `${Config.wasabi_url}/${conversation.profilePic.picture}` }} style={{ maxWidth: "100%", maxHeight: "100%", minWidth: "100%", minHeight: "100%", borderRadius: 40, marginTop: 0 }} />    
                                                            </View>
                                                        
                                                        </View>
                                                    </View>
                                                    <View style={styles.rightColumn}>
                                                        <Text style={styles.topTextSmall}>{conversation.conversationWith.name}</Text>
                                                        <Text style={styles.topTextSmaller}>{conversation.lastMessage.text && conversation.lastMessage.text.length > 0 ? conversation.lastMessage.text.slice(0, 30) : ""}... {moment(new Date(conversation.lastMessage.sentAt * 1000)).fromNow()}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            );
                                        }
                                    }
                                }) : null}
                            </ScrollView>
                        </View>
                    </ScrollView>
                </Fragment>
            );
          case 'second':
            return (
                <Fragment>
                    <ScrollView style={styles.container}>
                        <SearchBar
                            ref="searchBar"
                            placeholder="Search"
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
                        <View style={{ margin: 5 }}>
                            <AwesomeButtonBlue type={"secondary"} textColor={"black"} onPress={() => {
                                this.RBSheet.open();
                            }} stretch={true}>Create Group Chat</AwesomeButtonBlue>
                            <ScrollView showsHorizontalScrollIndicator={false} style={styles.horizontalScroll} horizontal={true}>
                                <TouchableOpacity style={[styles.centered, { marginTop: 10 }]} onPress={() => {

                                }}>
                                    <View style={styles.circle}>
                                        <Image source={require("../../../assets/icons/plus.png")} style={{ maxWidth: 30, maxHeight: 30 }} />    
                                    </View>
                                    <View style={{ marginTop: 0 }} />
                                    <Text style={[styles.name, { marginTop: 10 }]}>Your Story</Text>
                                </TouchableOpacity>
                                {typeof data !== "undefined" && data.length > 0 ? data.map((person, index) => {
                                    if (index % 3 === 0) {
                                        return (
                                            <TouchableOpacity key={index} style={styles.centered} onPress={() => {

                                            }}>
                                                <View style={[styles.circleTwo, { borderColor: "blue", borderWidth: 4 }]}>
                                                    <Image source={{ uri: person.picture.large }} style={{ maxWidth: "100%", maxHeight: "100%", minWidth: "100%", minHeight: "100%", borderRadius: 40, marginTop: 0 }} />    
                                                </View>
                                                <Text style={styles.name}>{person.name.first}</Text>
                                            </TouchableOpacity>
                                        );
                                    } else {
                                        return (
                                            <TouchableOpacity key={index} style={styles.centered} onPress={() => {

                                            }}>
                                                <View style={styles.circleTwo}>
                                                    <Image source={{ uri: person.picture.large }} style={{ maxWidth: "100%", maxHeight: "100%", minWidth: "100%", minHeight: "100%", borderRadius: 40, marginTop: 0 }} />    
                                                </View>
                                                <Text style={styles.name}>{person.name.first}</Text>
                                            </TouchableOpacity>
                                        );
                                    }
                                }) : null}
                            </ScrollView>
                            <ScrollView showsVerticalScrollIndicator={false} style={styles.myScroller} contentContainerStyle={styles.containerStyle}>
                                {typeof groupConversations !== "undefined" && groupConversations.length > 0 ? groupConversations.map((conversation, index) => {
                                    if (conversation.profilePic.type === "video") {
                                        if (index % 3 === 0) {
                                            return (
                                                <TouchableOpacity key={index} style={[styles.centered, { flexDirection: "row" }]} onPress={() => {
                                                    if (conversation.type !== "password") {
                                                        this.props.props.navigation.push("group-conversation-thread", { conversation })
                                                    } else {
                                                        this.setState({
                                                            conversationSelected: conversation,
                                                            isDialogVisible: true
                                                        })
                                                    }
                                                }}>
                                                    <View style={styles.columnLeft}>
                                                        <View style={styles.centered}>
                                                            <View style={[styles.circleTwo, { borderColor: "blue", borderWidth: 4 }]}>
                                                                <Video  
                                                                    resizeMode="cover"
                                                                    repeat
                                                                    source={{uri: `${Config.wasabi_url}/${conversation.profilePic.picture}` }} 
                                                                    autoplay={true}
                                                                    ref={(ref) => {
                                                                        this.player = ref
                                                                    }}
                                                                    muted={true}
                                                                    style={{ maxWidth: "100%", maxHeight: "100%", minWidth: "100%", minHeight: "100%", borderRadius: 40, marginTop: 0 }}
                                                                />  
                                                            </View>
                                                        
                                                        </View>
                                                    </View>
                                                    <View style={styles.rightColumn}>
                                                        <Text style={styles.topTextSmall}>{conversation.name}</Text>
                                                        <View style={{ flexDirection: "row", width: width * 0.80 }}>
                                                            <Text style={styles.topTextSmaller}>Members Joined: {conversation.membersCount}</Text>
                                                            <Text style={styles.textRightSmall}>{this.calculateType(conversation.type)}</Text>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                            );
                                        } else {
                                            return (
                                                <TouchableOpacity key={index} style={[styles.centered, { flexDirection: "row" }]} onPress={() => {
                                                    if (conversation.type !== "password") {
                                                        this.props.props.navigation.push("group-conversation-thread", { conversation })
                                                    } else {
                                                        this.setState({
                                                            conversationSelected: conversation,
                                                            isDialogVisible: true
                                                        })
                                                    }
                                                }}>
                                                    <View style={styles.columnLeft}>
                                                        <View style={styles.centered}>
                                                            <View style={styles.circleTwo}>
                                                                <Video  
                                                                    resizeMode="cover"
                                                                    repeat
                                                                    source={{uri: `${Config.wasabi_url}/${conversation.profilePic.picture}` }} 
                                                                    autoplay={true}
                                                                    ref={(ref) => {
                                                                        this.player = ref
                                                                    }}
                                                                    muted={true}
                                                                    style={{ maxWidth: "100%", maxHeight: "100%", minWidth: "100%", minHeight: "100%", borderRadius: 40, marginTop: 0 }}
                                                                />  
                                                            </View>
                                                        
                                                        </View>
                                                    </View>
                                                    <View style={styles.rightColumn}>
                                                        <Text style={styles.topTextSmall}>{conversation.name}</Text>
                                                        <View style={{ flexDirection: "row", width: width * 0.80 }}>
                                                            <Text style={styles.topTextSmaller}>Members Joined: {conversation.membersCount}</Text>
                                                            <Text style={styles.textRightSmall}>{this.calculateType(conversation.type)}</Text>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                            );
                                        }
                                    } else {
                                        if (index % 3 === 0) {
                                            return (
                                                <TouchableOpacity key={index} style={[styles.centered, { flexDirection: "row" }]} onPress={() => {
                                                    if (conversation.type !== "password") {
                                                        this.props.props.navigation.push("group-conversation-thread", { conversation })
                                                    } else {
                                                        this.setState({
                                                            conversationSelected: conversation,
                                                            isDialogVisible: true
                                                        })
                                                    }
                                                }}>
                                                    <View style={styles.columnLeft}>
                                                        <View style={styles.centered}>
                                                            <View style={[styles.circleTwo, { borderColor: "blue", borderWidth: 4 }]}>
                                                                <Image source={{ uri: `${Config.wasabi_url}/${conversation.profilePic.picture}` }} style={{ maxWidth: "100%", maxHeight: "100%", minWidth: "100%", minHeight: "100%", borderRadius: 40, marginTop: 0 }} />    
                                                            </View>
                                                        
                                                        </View>
                                                    </View>
                                                    <View style={styles.rightColumn}>
                                                        <Text style={styles.topTextSmall}>{conversation.name}</Text>
                                                        <View style={{ flexDirection: "row", width: width * 0.80 }}>
                                                            <Text style={styles.topTextSmaller}>Members Joined: {conversation.membersCount}</Text>
                                                            <Text style={styles.textRightSmall}>{this.calculateType(conversation.type)}</Text>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                            );
                                        } else {
                                            return (
                                                <TouchableOpacity key={index} style={[styles.centered, { flexDirection: "row" }]} onPress={() => {
                                                    if (conversation.type !== "password") {
                                                        this.props.props.navigation.push("group-conversation-thread", { conversation })
                                                    } else {
                                                        this.setState({
                                                            conversationSelected: conversation,
                                                            isDialogVisible: true
                                                        })
                                                    }
                                                }}>
                                                    <View style={styles.columnLeft}>
                                                        <View style={styles.centered}>
                                                            <View style={styles.circleTwo}>
                                                                <Image source={{ uri: `${Config.wasabi_url}/${conversation.profilePic.picture}` }} style={{ maxWidth: "100%", maxHeight: "100%", minWidth: "100%", minHeight: "100%", borderRadius: 40, marginTop: 0 }} />    
                                                            </View>
                                                        
                                                        </View>
                                                    </View>
                                                    <View style={styles.rightColumn}>
                                                        <Text style={styles.topTextSmall}>{conversation.name}</Text>
                                                        <View style={{ flexDirection: "row", width: width * 0.80 }}>
                                                            <Text style={styles.topTextSmaller}>Members Joined: {conversation.membersCount}</Text>
                                                            <Text style={styles.textRightSmall}>{this.calculateType(conversation.type)}</Text>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                            );
                                        }
                                    }
                                }) : null}
                            </ScrollView>
                        </View>
                    </ScrollView>
                </Fragment>
            )
        }
    };
    handleSearch = (query) => {
        console.log("query", query);

        axios.get(`${Config.ngrok_url}/gather/friends/by/name`, {
            params: {
                query
            }
        }).then((res) => {
            if (res.data.message === "Gathered matches!") {
                console.log(res.data);
                
                const { friends } = res.data;

                this.setState({
                    friends
                })
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);``
        })
    }
    handleGroupStart = () => {
        const { privacy, selected, groupName, password } = this.state;

        const GUID = uuid.v4();
        const groupNameVar = groupName;
        const groupType = (privacy === "public" ? CometChat.GROUP_TYPE.PUBLIC : privacy === "private" ? CometChat.GROUP_TYPE.PRIVATE : privacy === "password" ? CometChat.GROUP_TYPE.PASSWORD : null);
        const pass = (privacy === "password" ? password : "");

        const group = new CometChat.Group(GUID, groupNameVar, groupType, pass);

        CometChat.createGroup(group).then(
            groupppp => {
                console.log("Group created successfully:", groupppp);

                const membersList = [];
                const members = [];

                const promiseee = new Promise((resolve, reject) => {
                    for (let index = 0; index < selected.length; index++) {
                        const element = selected[index];
                        
                        membersList.push(new CometChat.GroupMember(element.unique_id, CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT));
                        members.push(element.unique_id);

                        if ((selected.length - 1) === index) {
                            resolve({
                                membersList, 
                                members
                            });
                        }
                    }
                })

                promiseee.then((passedValues) => {
                    CometChat.addMembersToGroup(GUID, passedValues.membersList, []).then(
                        response => {
                            console.log("response", response);
    
                            axios.post(`${Config.ngrok_url}/initiate/group/chat`, {
                                privacy,
                                selected,
                                group: groupppp,
                                id: this.props.unique_id,
                                others: passedValues.members,
                                fullName: this.props.fullName
                            }).then((res) => {
                                if (res.data.message === "Initiated group!") {
                                    console.log(res.data);
            
                                    const { customGroup } = res.data;
            
                                    this.setState({
                                        groupConversations: [...this.state.groupConversations, customGroup],
                                        privacy: null,
                                        selected: [],
                                        password: "",
                                        groupName: ""
                                    }, () => {
                                        this.RBSheet.close();
                                    })
                                } else {
                                    console.log("err", res.data);
                                }
                            }).catch((err) => {
                                console.log(err);``
                            })
                        },
                        error => {
                          console.log("Something went wrong", error);
                        }
                    );
                })
            },
            error => {
                console.log("Group creation failed with exception:", error);
            }
        );
    }
    render () {
        console.log("conversations state", this.state);

        const { data, convos, query, friends, selected, groupName, privacy } = this.state;

        const menu = <Side props={this.props} />;
        
        console.log("messaging conversations state", this.state);

        const string = "This is the message that was sent that contains the last message";
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
                        <Header style={styles.topHeader}>
                            <Left style={{ maxWidth: 50 }}>
                                <Button onPress={() => {
                                    this.props.props.navigation.goBack();
                                }} transparent>
                                    <Image source={require("../../../assets/icons/go-back.png")} style={[styles.smallerIcon, { tintColor: "#ffffff" }]} />
                                </Button>
                            </Left>
                            <Left>
                                <Button transparent>
                                    {/* {_.has(this.props.profilePic, "picture") ? <Image source={{ uri: `${Config.wasabi_url}/${this.props.profilePic.picture}` }} style={styles.headerProfilePic} /> : null} */}
                                    <Title style={styles.title}>Chats</Title>
                                </Button>
                            </Left>
                            <Body>
                
                            </Body>
                            <Right>
                                <TouchableOpacity
                                    style={{
                                        borderWidth:1,
                                        borderColor:'rgba(0,0,0,0.2)',
                                        alignItems:'center',
                                        marginRight: 10,
                                        justifyContent:'center',
                                        width: 45,
                                        height: 45,
                                        backgroundColor:'#fff',
                                        borderRadius:45,
                                    }}
                                >
                                    <Icon name={"camera"}  size={30} color="#01a699" />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        borderWidth:1,
                                        borderColor:'rgba(0,0,0,0.2)',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        width: 45,
                                        height: 45,
                                        backgroundColor:'#fff',
                                        borderRadius:45,
                                        }}
                                    >
                                    <Icon name={"pencil"}  size={30} color="#01a699" />
                                </TouchableOpacity>
                            </Right>
                        </Header>
                        <DialogInput 
                            isDialogVisible={this.state.isDialogVisible}
                            title={"Enter Password to enter..."}
                            message={"Please enter the password to enter - if you do not have this password, message the group leader..."}
                            hintInput ={"Password"}
                            submitInput={ (inputText) => {
                                const GUID = this.state.conversationSelected.guid;
                                const groupType = CometChat.GROUP_TYPE.PASSWORD;

                                CometChat.joinGroup(GUID, groupType, inputText).then(
                                group => {
                                    console.log("Group joined successfully:", group);

                                    this.setState({
                                        isDialogVisible: false
                                    }, () => {
                                        this.props.props.navigation.push("group-conversation-thread", { conversation: this.state.conversationSelected });
                                    })
                                },
                                error => {
                                    console.log("Group joining failed with exception:", error);

                                    if (error.code === "ERR_ALREADY_JOINED") {
                                        this.setState({
                                            isDialogVisible: false
                                        }, () => {
                                            this.props.props.navigation.push("group-conversation-thread", { conversation: this.state.conversationSelected });
                                        })
                                    } else {
                                        this.setState({
                                            isDialogVisible: false
                                        }, () => {
                                            showMessage({
                                                message: "Password does NOT match our records...",
                                                description: "The entered password doesn't match our records - passwords are 'case' sensitive.",
                                                type: "danger",
                                                duration: 3500
                                            });
                                        })
                                    }
                                }
                                );
                            }}
                            closeDialog={ () => {
                                this.setState({
                                    isDialogVisible: false
                                })
                            }}
                        >
                        </DialogInput>
                        <TabView 
                            swipeEnabled={false}
                            navigationState={this.state}
                            renderTabBar={this._renderTabBar}
                            onIndexChange={index => this.setState({ index })}
                            renderScene={this.renderScene} 
                        />
                        <RBSheet
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
                            
                            <Header style={{ backgroundColor: "#303030", width }}>
                                <Left>
                                    <Button onPress={() => {
                                        this.RBSheet.close();
                                    }} transparent>
                                        <Icon style={{ color: "#ffffff" }} name='close' />
                                    </Button>
                                </Left>
                                <Body>
                                    <Title style={styles.whiteText}>Group Chat</Title>
                                    <Subtitle style={styles.whiteText}>Manage & Invite</Subtitle>
                                </Body>
                                <Right>
                                    {/* <Button transparent>
                                        <Icon style={{ color: "#ffffff" }} name='heart' />
                                    </Button> */}
                                </Right>
                            </Header>
                            
                            <View style={styles.rbContainer}>
                                
                                <Text style={styles.headerText}>Please select the "Group Type" visibility settings</Text>
                                <RNPickerSelect
                                    value={this.state.privacy}
                                    style={pickerSelectStyles}
                                    onValueChange={(value) => {
                                        this.setState({
                                            privacy: value
                                        })
                                    }}
                                    items={[
                                        { label: 'Public', value: 'public' },
                                        { label: 'Private', value: 'private' },
                                        { label: 'Password Enabled', value: 'password' },
                                    ]}
                                />                               
                                {this.state.privacy === "password" ? <Item stackedLabel>
                                    <Label style={{ color: "black" }}>Group Password</Label>
                                    <Input placeholderTextColor={"grey"} placeholder={"Enter a group password for your chat"} onChangeText={(value) => {
                                        this.setState({
                                            password: value
                                        })
                                    }} value={this.state.password} />
                                </Item> : null}
                                <Item stackedLabel>
                                    <Label style={{ color: "black" }}>Group Name</Label>
                                    <Input placeholderTextColor={"grey"} placeholder={"Enter your group 'name' for your chat"} onChangeText={(value) => {
                                        this.setState({
                                            groupName: value
                                        })
                                    }} value={this.state.groupName} />
                                </Item>
                                <Text style={styles.headerText}>Search for a name(s) - first and last</Text>
                                <List>
                                    <Autocomplete
                                        data={friends}
                                        value={query}
                                        hideResults={this.state.hide}
                                        placeholder={"Search for your friends name's (first + last)"}
                                        placeholderTextColor={"grey"}
                                        listContainerStyle={{height: friends.length * 70}}
                                        onChangeText={(text) => this.setState({ 
                                            query: text,
                                            hide: false
                                        }, () => {
                                            this.handleSearch(this.state.query);
                                        })}
                                        flatListProps={{
                                            keyExtractor: (_, idx) => idx,
                                            renderItem: ({ item }) => {
                                                return (
                                                    <ListItem style={{ zIndex: 999999 }} button={true} onPress={() => {
                                                        if (typeof selected !== "undefined" && selected.length > 0) {
                                                            if (selected.filter(e => e.username === item.username).length > 0) {
                                                                console.log("Includes...");

                                                                Toast.show({
                                                                    type: 'error',
                                                                    text1: 'Already included in selected list!',
                                                                    text2: 'This user is already selected - select a user that you have NOT selected yet...',
                                                                    visibilityTime: 4000,
                                                                    position: "bottom"
                                                                });
                                                            } else {
                                                                console.log("Doesn't include...");

                                                                this.setState({
                                                                    selected: [...this.state.selected, item],
                                                                    hide: true,
                                                                    query: ""
                                                                })
                                                            }
                                                        } else {
                                                            this.setState({
                                                                selected: [...this.state.selected, item],
                                                                hide: true,
                                                                query: ""
                                                            })
                                                        }
                                                    }}>
                                                        <Left>
                                                            <Text><Text style={{ fontSize: 20 }}>{item.firstName + " " + item.lastName}</Text>{"\n"}{item.username}</Text>
                                                        </Left>
                                                        <Right>
                                                            <Icon name="arrow-forward" />
                                                        </Right>
                                                    </ListItem>
                                                );
                                            },
                                        }}
                                    />
                                </List>
                                <ScrollView vertical={true} showsVerticalScrollIndicator={false} style={styles.scrollerCustom}>
                                    <List>
                                        {typeof selected !== "undefined" && selected.length > 0 ? selected.map((item, index) => {
                                            return (
                                                <Fragment>
                                                    <ListItem button={true} onPress={() => {
                                                        this.setState({
                                                            selected: this.state.selected.filter((each, i) => {
                                                                if (each.unique_id !== item.unique_id) {
                                                                    return item;
                                                                }
                                                            }),
                                                            query: ""
                                                        })
                                                    }}>
                                                        <Left>
                                                            <Text><Text style={{ fontSize: 20 }}>{item.firstName + " " + item.lastName}</Text>{"\n"}{item.username}</Text>
                                                        </Left>
                                                        <Right>
                                                            <Icon name="close" />
                                                        </Right>
                                                    </ListItem>
                                                </Fragment>
                                            );
                                        }) : null}
                                    </List>
                                </ScrollView>
                                
                            </View>
                            {(typeof selected !== "undefined" && selected.length > 0) && (typeof groupName !== "undefined" && groupName.length > 0) && (privacy !== null) ? <AwesomeButtonBlue type={"secondary"} textColor={"black"} onPress={() => {
                                this.handleGroupStart();
                            }} stretch={true}>Start Group Chat</AwesomeButtonBlue> : null}
                            <Toast ref={(ref) => Toast.setRef(ref)} />
                        </RBSheet>
                </SideMenu>
            </Fragment>
        );
    }
};
const mapStateToProps = (state) => {
    // console.log("!!!", state, `${state.signupData.authData.firstName} ${state.signupData.authData.lastName}`, state.signupData.authData.firstName);
    return {
        unique_id: state.signupData.authData.unique_id,
        fullName: `${state.signupData.authData.firstName} ${state.signupData.authData.lastName}`,
        profilePic: typeof state.signupData.authData.profilePics !== "undefined" && state.signupData.authData.profilePics.length > 0 ? state.signupData.authData.profilePics[state.signupData.authData.profilePics - 1] : null
    }
}
export default connect(mapStateToProps, {})(MessagingHomeChannelsHelper);