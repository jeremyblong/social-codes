import React, { Component, Fragment } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Header, Left, Body, Right, Button, Icon, Title, Footer, FooterTab } from 'native-base';
import styles from './styles.js';
import SearchBar from 'react-native-search-bar';
import Config from "react-native-config";
import axios from "axios";
import moment from "moment";
import SideMenu from "react-native-side-menu";
import Side from "../../navigation/sidemenu/index.js";
import { CometChat } from "@cometchat-pro/react-native-chat";
import Video from 'react-native-video';

const { height, width } = Dimensions.get("window");

class MessagingHomeChannelsHelper extends Component {
constructor (props) {
    super(props);

    this.state = {
        data: [],
        conversationList: [],
        convos: []
    }
}
    handleCancellation = () => {
        console.log("cancelled.")
    }
    handleSearch = () => {
        console.log("handleSearch clicked.");
    }
    componentDidMount() {
        const conversationsRequest = new CometChat.ConversationsRequestBuilder().setLimit(50).build();

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
    render () {
        console.log("coverstaions state", this.state);

        const { data, convos } = this.state;

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
                                    this.props.props.navigation.push("homepage");
                                }} transparent>
                                    <Image source={require("../../../assets/icons/go-back.png")} style={[styles.smallerIcon, { tintColor: "#ffd530" }]} />
                                </Button>
                            </Left>
                            <Left>
                                <Button transparent>
                                    <Image source={require("../../../assets/images/me.jpg")} style={styles.headerProfilePic} />
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
                    <Footer>
                        <FooterTab>
                            <Button style={styles.greyButton} active>
                                <Text style={styles.goldText}>Chats</Text>
                            </Button>
                            <Button style={styles.greyButton}>
                                <Text style={styles.goldText}>People</Text>
                            </Button>
                        </FooterTab>
                    </Footer>
                </SideMenu>
            </Fragment>
        );
    }
};

export default MessagingHomeChannelsHelper;