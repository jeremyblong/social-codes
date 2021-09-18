import React, { Component, Fragment } from 'react'
import Config from 'react-native-config';
import { connect } from 'react-redux';
import { GiftedChat, Composer, Bubble } from 'react-native-gifted-chat';
import { CometChat } from "@cometchat-pro/react-native-chat";
import uuid from 'react-native-uuid';
import moment from 'moment';
import { Header, Left, Body, Right, Button, Icon, Title, ListItem, List, Text as NativeText, Thumbnail } from 'native-base';
import styles from './styles.js';
import { View, Text, Image, TouchableOpacity, Dimensions, Platform, ScrollView } from 'react-native';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import RBSheet from "react-native-raw-bottom-sheet";
import ActionSheet from "react-native-actions-sheet";
import SheetOptionsHelper from "./helpers/sheetOne/index.js";

const { height, width } = Dimensions.get("window");


class IndividualGroupConversationHelper extends Component {
constructor(props){ 
    super(props);

    this.state = {
        messages: [],
        isTyping: false,
        message: "",
        isVisible: false,
        mediaMsg: null,
        groupMembers: []
    }

    this.scrollViewRef = React.createRef();
    this.actionSheetRef = React.createRef();
    this.actionSheetRefTwo = React.createRef();
    this.sheetRefActions = React.createRef();
}
    componentDidMount() {
        const { conversation } = this.props.props.route.params;

        const groupMemberRequest = new CometChat.GroupMembersRequestBuilder(conversation.guid).setLimit(50).build();

        groupMemberRequest.fetchNext().then(
            groupMembers => {
                console.log("Group Member list fetched successfully:", groupMembers);

                this.setState({
                    groupMembers
                })
            },
            error => {
                console.log("Group Member list fetching failed with exception:", error);
            }
        );

        console.log("conversation", conversation);
    }
    renderPicOrVideo = () => {
        const { conversation } = this.props.props.route.params;

        if (conversation.profilePic.type === "video") {
            return <Video  
                resizeMode="cover"
                repeat
                source={{uri: `${Config.wasabi_url}/${conversation.profilePic.picture}` }} 
                autoplay={true}
                ref={(ref) => {
                    this.player = ref
                }}
                muted={true}
                style={styles.headerProfilePic}
            />;
        } else {
            return <Image source={require("../../../assets/images/me.jpg")} style={styles.headerProfilePic} />;
        }
    }
    handleMessageSend = (message) => {
        console.log("message", message);
        // const { conversation } = this.props.props.route.params;

        // const receiverID = conversation.conversationWith.uid;
        // const messageText = message;
        // const receiverType = CometChat.RECEIVER_TYPE.USER;
        // const textMessage = new CometChat.TextMessage(
        //     receiverID,
        //     messageText,
        //     receiverType
        // );

        // CometChat.sendMessage(textMessage).then(
        //     message => {
        //         console.log("Message sent successfully:", message);

        //         const UID = conversation.conversationWith.uid;
        //         const limit = 50;
        
        //         const messagesRequest = new CometChat.MessagesRequestBuilder()
        //         .setLimit(limit)
        //         .setUID(UID)
        //         .build();

        //         messagesRequest.fetchPrevious().then(
        //             messages => {
        //                 console.log("Message list fetched:", messages);
        //                 // Handle the list of messages
        
        //                 const messageArray = [];
        
        //                 const reversed = messages.reverse();
        
        //                 for (let index = 0; index < reversed.length; index++) {
        //                     const message = reversed[index];
        
        //                     console.log(message);
                            
        //                     if (message.type === "text") {
        //                         if (message.sender.uid !== this.props.unique_id) {
        
        //                             let customName = message.sender.name.replace(" ", "+");
        //                             // this is the other user 
        //                             messageArray.push({
        //                                 _id: uuid(),
        //                                 text: <Text>{message.text}</Text>,
        //                                 createdAt: moment(new Date(message.sentAt * 1000)).format("MM-DD-YYYY HH:mm:ss"),
        //                                 user: {
        //                                   _id: message.sender.uid,
        //                                   name: message.sender.name,
        //                                   avatar: `https://ui-avatars.com/api/?name=${customName}`,
        //                                 },
        //                             })
        //                         } else {
        //                             let customName = message.sender.name.replace(" ", "+");
        //                             // this is the logged in user
        //                             messageArray.push({
        //                                 _id: uuid(),
        //                                 text: <Text onPress={() => {
        //                                     this.setState({
        //                                         isVisible: !this.state.isVisible,
        //                                         selected: message.id
        //                                     })
        //                                 }}>{message.text}</Text>,
        //                                 createdAt: moment(new Date(message.sentAt * 1000)).format("MM-DD-YYYY HH:mm:ss"),
        //                                 user: {
        //                                   _id: this.props.unique_id,
        //                                   name: message.sender.name,
        //                                   avatar: `https://ui-avatars.com/api/?name=${customName}`,
        //                                 },
        //                             })
        //                         }
        //                     } else if (message.type === "file") {
        //                         console.log("message is a file", message);

        //                         if (message.sender.uid !== this.props.unique_id) {

        //                             let customName = message.sender.name.replace(" ", "+");
        //                             // this is the logged in user
        //                             messageArray.push({
        //                                 _id: uuid(),
        //                                 image: message.data.url,
        //                                 createdAt: moment(new Date(message.sentAt * 1000)).format("MM-DD-YYYY HH:mm:ss"),
        //                                 user: {
        //                                 _id: message.sender.uid,
        //                                 name: message.sender.name,
        //                                 avatar: `https://ui-avatars.com/api/?name=${customName}`,
        //                                 },
        //                             })
        //                         } else {
        //                             let customName = message.sender.name.replace(" ", "+");
        //                             // this is the logged in user
        //                             messageArray.push({
        //                                 _id: uuid(),
        //                                 image: message.data.url,
        //                                 createdAt: moment(new Date(message.sentAt * 1000)).format("MM-DD-YYYY HH:mm:ss"),
        //                                 user: {
        //                                 _id: this.props.unique_id,
        //                                 name: message.sender.name,
        //                                 avatar: `https://ui-avatars.com/api/?name=${customName}`,
        //                                 },
        //                             })
        //                         }
        //                     }
        //                 }
        
        //                 this.setState({
        //                     messages: messageArray,
        //                     message: ""
        //                 })
        //             },
        //             error => {
        //                 console.log("Message fetching failed with error:", error);
        //             }
        //         );
        //     },
        //     error => {
        //         console.log("Message sending failed with error:", error);
        //     }
        // );
    }
    pickPicture = () => {
        const options = {
            mediaType: "photo",
            quality: 1
        };
        launchImageLibrary(options, this.imageCallback);
    }
    getMimeType = (ext) => {
        console.log("Ext:", ext);

        switch (ext) {
            case "jpg":
                return "image/jpg";
            case "jpeg":
                return "image/jpeg";
            case "png":
                return "image/png";
            default: 
                return "";
        }
    }
    imageCallback = (response) => {
        if (response.didCancel) {
            console.log('User cancelled photo picker');
        } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        } else {
            console.log('ImagePicker Response: ', response);
            if (Platform.OS === 'ios' && response.fileName != undefined) {
                const ext = response.fileName.split('.')[1].toLowerCase();
                const type = this.getMimeType(ext);
                const name = response.fileName;

                const file = {
                    name: Platform.OS === "android" ? response.fileName : name,
                    type: Platform.OS === "android" ? response.type : type,
                    uri: Platform.OS === "android" ? response.uri : response.uri.replace("file://", ""),
                }
                console.log('file: ', file);
    
                this.setState({ mediaMsg: file }, () => {
                    this.RBSheet.open();
                })
            } else {
                const type = response.type;
                const name = response.fileName;

                const file = {
                    name: Platform.OS === "android" ? response.fileName : name,
                    type: Platform.OS === "android" ? response.type : type,
                    uri: Platform.OS === "android" ? response.uri : response.uri.replace("file://", ""),
                }
                console.log('file: ', file);
    
                this.setState({ mediaMsg: file }, () => {
                    this.RBSheet.open();
                })
            }
        }
    }
    renderComposer = props => {
        return (
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => {
                this.pickPicture();
            }}>
                <Icon type='SimpleLineIcons' name='paper-clip' style={{ fontSize: 20, justifyContent: 'center', paddingTop: 10, paddingLeft: 5 }}/>
            </TouchableOpacity>
            <Composer {...props} />
            <Button onPress={() => {
                this.handleMessageSend(this.state.message);
            }} transparent><Text style={{ marginRight: 8 }}>Send</Text></Button>
          </View>
        );
    };
    render() {
        const { conversation } = this.props.props.route.params;

        const { groupMembers } = this.state;
        return (
            <Fragment>
                <Header style={{ backgroundColor: "#303030" }}>
                    <Left style={{ maxWidth: 50 }}>
                        <Button onPress={() => {
                            this.props.props.navigation.replace("messaging-conversations");
                        }} transparent>
                            <Image source={require("../../../assets/icons/go-back.png")} style={styles.smallerIcon} />
                        </Button>
                    </Left>
                    <Left>
                        <Button transparent>
                            {/* {this.renderPicOrVideo()} */}
                            {Platform.OS === "ios" ? <Title style={Platform.OS === "ios" ? [styles.title, { color: "white" }] : styles.title}>{this.props.props.route.params.conversation.name}</Title> : null}
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
                                marginRight: 5,
                                justifyContent:'center',
                                width: 35,
                                height: 35,
                                backgroundColor:'#141414',
                                borderRadius:35,
                            }}
                        >
                            <Image source={require("../../../assets/icons/phone-2.png")} style={styles.icon} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                borderWidth:1,
                                borderColor:'rgba(0,0,0,0.2)',
                                alignItems:'center',
                                marginRight: 5,
                                justifyContent:'center',
                                width: 35,
                                height: 35,
                                backgroundColor:'#141414',
                                borderRadius:35,
                            }}
                        >
                            <Image source={require("../../../assets/icons/video-on.png")} style={styles.icon} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                borderWidth:1,
                                borderColor:'rgba(0,0,0,0.2)',
                                alignItems:'center',
                                justifyContent:'center',
                                width: 35,
                                height: 35,
                                backgroundColor:'#141414',
                                borderRadius:35,
                                }}
                            >
                            <Image source={require("../../../assets/icons/info.png")} style={{ maxWidth: 25, maxHeight: 25 }} />
                        </TouchableOpacity>
                    </Right>
                </Header>
                <AwesomeButtonBlue borderColor={"#cccccc"} borderWidth={2} type={"anchor"} backgroundColor={"#ffffff"} backgroundPlaceholder={"black"} textColor={"black"} shadowColor={"grey"} onPress={() => {
                    this.actionSheetRef.current.setModalVisible();
                }} stretch={true}>User's List (involved member's)</AwesomeButtonBlue>
                <GiftedChat 
                    onInputTextChanged={(value) => {
                        // this.typing(value);
                    }}
                    renderComposer={this.renderComposer}
                    infiniteScroll
                    messages={this.state.messages}
                    onSend={messages => {
                        console.log("messages", messages);

                        this.handleMessageSend(messages[0]);
                    }}
                    user={{
                        _id: this.props.unique_id,
                    }}
                    renderFooter={this.renderFooter}
                    text={this.state.message}
                />
                <TouchableOpacity onPress={() => {
                    this.sheetRefActions.current.show();
                }} style={styles.absolutelyPositioned}>
                    <Image source={require("../../../assets/icons/more.png")} style={{ maxHeight: 50, maxWidth: 50 }} />
                </TouchableOpacity>
                <ActionSheet ref={this.actionSheetRef}>
                    <View>
                    <ScrollView
                        ref={this.scrollViewRef}
                        nestedScrollEnabled={true}
                        onScrollEndDrag={() =>
                            this.actionSheetRef.current.handleChildScrollEnd()
                        }
                        onScrollAnimationEnd={() =>
                            this.actionSheetRef.current.handleChildScrollEnd()
                        }
                        onMomentumScrollEnd={() =>
                            this.actionSheetRef.current.handleChildScrollEnd()
                        }
                    >
                        <List>
                            <ListItem itemDivider>
                                <Text>Users in this chat group</Text>
                            </ListItem>       
                            {typeof groupMembers !== "undefined" && groupMembers.length > 0 ? groupMembers.map((member, index) => {
                                console.log("Member", member)
                                return (
                                    <ListItem avatar>
                                        <Left>
                                            {member.status === "offline" ? <Thumbnail style={{ maxWidth: 40, maxHeight: 40 }} source={require("../../../assets/icons/offline-dot.png")} /> : <Thumbnail style={{ maxWidth: 40, maxHeight: 40 }} source={require("../../../assets/icons/online-dot.png")} />}
                                        </Left>
                                        <Body>
                                            <NativeText style={{ fontWeight: "bold" }}>{member.name}</NativeText>
                                            <NativeText style={{ color: "black" }} note>{member.scope}</NativeText>
                                        </Body>
                                        <Right>
                                            <NativeText style={{ color: "black" }} note>Last Active: {moment(member.lastActiveAt * 1000).fromNow()}</NativeText>
                                        </Right>
                                    </ListItem>
                                );
                            }) : null}               
                        </List>
                        </ScrollView>
                    </View>
                </ActionSheet>
                <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    closeOnDragDown={true}
                    height={height * 0.40}
                    openDuration={250}
                    customStyles={{
                        container: {
                            width
                        },
                        draggableIcon: {
                            borderBottomColor: "grey",
                            borderBottomWidth: 2,
                            width: 200
                        }
                    }}
                >
                    <View style={styles.centered}>
                        {this.state.mediaMsg !== null ? <Image source={{ uri: this.state.mediaMsg.uri }} style={styles.previewImage} /> : null}
                    </View>
                    <View style={styles.bottomButton}>
                    <AwesomeButtonBlue borderColor={"#cccccc"} borderWidth={2} type={"anchor"} backgroundColor={"#ffffff"} backgroundPlaceholder={"black"} textColor={"black"} shadowColor={"grey"} onPress={this.sendMediaMessage} stretch={true}>Submit & Send Message</AwesomeButtonBlue>
                    </View>
                </RBSheet>
                <SheetOptionsHelper groupMembers={groupMembers} props={this.props} conversation={conversation} sheetRefActions={this.sheetRefActions} />
            </Fragment>
        )
    }
}
export default IndividualGroupConversationHelper;