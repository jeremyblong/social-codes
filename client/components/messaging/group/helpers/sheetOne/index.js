import React, { Component, Fragment, useEffect, useRef, useState } from 'react'
import { ActionSheetCustom as ActionSheetTwo } from 'react-native-actionsheet';
import styles from "./styles.js";
import { ListItem, List, Left, Body, Right, Icon, Title, Subtitle, Header, Button } from "native-base";
import { Text, Image, View, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { Switch } from 'react-native-gesture-handler';
import { connect } from "react-redux";
import { showMessage, hideMessage } from "react-native-flash-message";
import { CometChat } from "@cometchat-pro/react-native-chat";
import Config from "react-native-config";
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import ActionSheet from "react-native-actions-sheet";
import Autocomplete from "react-native-autocomplete-input";
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import RBSheet from "react-native-raw-bottom-sheet";
import Dialog from "react-native-dialog";


const { height, width } = Dimensions.get("window");

const options = [
    <View>
        <Text>Leave Group</Text>
    </View>,
    <View>
        <Text style={{ color: "red" }}>Delete Group</Text>
    </View>,
    <View>
        <Text>Ban/Kick Member(s) From Group</Text>
    </View>,
    <View>
        <Text>Transfer Group Ownership</Text>
    </View>,
    <View>
        <Text>Add Members To Group</Text>
    </View>,
    <View>
        <Text>Cancel/Close</Text>
    </View>
]

const SheetOptionsHelper = ({ sheetRefActions, conversation, unique_id, groupMembers }) => {
    const [members, setMembers] = useState([]);
    const [ query, setQuery ] = useState("");
    const [ searchValue, setSearchValue ] = useState("");
    const scrollViewRef = useRef();
    const myCustomActionSheet = useRef();
    const [relevantUsers, setRelevantMembers] = useState([]);
    const navigation = useNavigation();
    const [ selected, setSelected ] = useState([]);
    const [ hide, setHide ] = useState(true);
    const RBSheetRef = useRef();
    const [ hideBan, setHideBan ] = useState(true);
    const [ available, setAvaliable ] = useState([]);
    const [ isVisible, setVisible ] = useState(false);
    const [ selectedSingle, setSelectedSingle ] = useState(null);

    useEffect(() => {
        console.log("conversation", conversation);

        setMembers(groupMembers);
    }, [])

    const leaveGroup = () => {
        console.log("leaveGroup clicked.");

        const GUID = conversation.guid;

        CometChat.leaveGroup(GUID).then(
            hasLeft => {
                
                console.log("Group left successfully:", hasLeft);

                axios.put(`${Config.ngrok_url}/leave/conversation/only/individual`, {
                    guid: conversation.guid,
                    id: unique_id
                }).then((res) => {
                        if (res.data.message === "Deleted conversation!") {
                            console.log(res.data);

                            setTimeout(() => {
                                navigation.goBack();
                            }, 2000)
                        } else {
                            console.log("Err", res.data);
                        }
                }).catch((err) => {
                    console.log(err);
                })
            },
            error => {
              console.log("Group leaving failed with exception:", error);
            }
        );
    }
    const deleteGroup = () => {
        console.log("deleteGroup clicked.");
        
        const GUID = conversation.guid;

        CometChat.deleteGroup(GUID).then(
            response => {
              console.log("Groups deleted successfully:", response);

                if (response === true) {
                    axios.put(`${Config.ngrok_url}/delete/group/conversation`, {
                        guid: conversation.guid,
                        group: groupMembers,
                        id: unique_id
                    }).then((res) => {
                            if (res.data.message === "Deleted conversation!") {
                                console.log(res.data);

                                setTimeout(() => {
                                    navigation.goBack();
                                }, 2000)
                            } else {
                                console.log("Err", res.data);
                            }
                    }).catch((err) => {
                        console.log(err);
                    })
                }
            },
            error => {
              console.log("Group delete failed with exception:", error);
            }
        );
    }
    const banKickMembers = () => {
        console.log("banKickMembers clicked.");

        const GUID = conversation.guid;
        const limit = 35;
        const groupMemberRequest = new CometChat.GroupMembersRequestBuilder(GUID).setLimit(limit).build();

        groupMemberRequest.fetchNext().then(
            groupMembers => {
                console.log("Group Member list fetched successfully:", groupMembers);

                setMembers(groupMembers);

                setTimeout(() => {
                    RBSheetRef.current.open();
                }, 750)
            },
            error => {
                console.log("Group Member list fetching failed with exception:", error);
            }
        );
    }
    const transferGroupOwnership = () => {
        console.log("transferGroupOwnership clicked.");

    }
    const addMembersToGroup = () => {
        console.log("addMembersToGroup clicked...");

        myCustomActionSheet.current.setModalVisible();
    }
    const handleSearch = (query) => {
        axios.get(`${Config.ngrok_url}/gather/friends/by/name`, {
            params: {
                query
            }
        }).then((res) => {
                if (res.data.message === "Gathered matches!") {

                    const { friends } = res.data;

                    setRelevantMembers(friends);

                    console.log(res.data);
                } else {
                    console.log("Err", res.data);
                }
        }).catch((err) => {
            console.log(err);
        })
    }
    const addUsersToGroupChat = () => {
        const GUID = conversation.guid;
        const membersList = [];
        const membersIDS = [];

        for (let index = 0; index < selected.length; index++) {
            const user = selected[index];
            membersList.push(new CometChat.GroupMember(user.unique_id, CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT));
        }

        CometChat.addMembersToGroup(GUID, membersList, []).then(
            response => {
                console.log("response", response);

                const promiseee = new Promise((resolve, reject) => {
                    
                    const keys = Object.keys(response);

                    const size = Object.keys(response).length - 1;

                    console.log("size", size);

                    keys.forEach((key, index) => {
                        console.log(`${key}: ${response[key]}`, index);

                        if (response[key] !== "Member already has the same scope participant.") {
                            membersIDS.push(user.unique_id);

                            if ((size === index)) {
                                resolve(membersIDS);
                            }
                        } else {
                            if ((size === index)) {
                                resolve(membersIDS);
                            }
                        }
                    });
                })

                promiseee.then((passedValues) => {

                    console.log("passedValues", passedValues);

                    axios.post(`${Config.ngrok_url}/add/additional/users/group/chat`, {
                        membersIDS: passedValues,
                        id: unique_id,
                        conversation
                    }).then((res) => {
                        if (res.data.message === "Added members!") {
                            console.log(res.data);
                        } else {
                            console.log("err", res.data);
                        }
                    }).catch((err) => { 
                        console.log(err);
                    })
                })
            },
            error => {
                console.log("Something went wrong", error);
            }
        );
    }
    const handleSearchBanKick = (value) => {
        console.log("handleSearchBanKick", value);

        setAvaliable(members.filter((member, index) => {
            if (member.name.includes(value.toLowerCase().trim())) {
                return true;
            }
        }));
    }
    const bankKickMemberForGood = () => {
        console.log("bankKickMemberForGood ran...");

        const otherID = selectedSingle.uid;
        const GUID = selectedSingle.guid;

        CometChat.banGroupMember(GUID, otherID).then(
        response => {
            console.log("Group member banned successfully", response);

            axios.put(`${Config.ngrok_url}/ban/user/conversation`, {
                otherID,
                GUID
            }).then((res) => {
                if (res.data.message === "Banned!") {
                    console.log(res.data);

                    showMessage({
                        message: "Banned user successfully!",
                        description: "We have successfully banned this user from your group - they will no longer be able to view this group.",
                        type: "success",
                        duration: 2750
                    });
                } else {
                    console.log("Err", res.data);
                }
            }).catch((err) => {
                console.log(err);
            })
        },
        error => {
            console.log("Group member banning failed with error", error);
        }
        );
    }
    console.log(relevantUsers, selected, selectedSingle);
    return (
        <Fragment>
            {selectedSingle !== null ? <View>
                <Dialog.Container visible={isVisible}>
                <Dialog.Title>Ban/Kick {selectedSingle.name}</Dialog.Title>
                <Dialog.Description>
                    Are you sure you'd like to ban/kick this user from the group chat?
                </Dialog.Description>
                <Dialog.Button onPress={() => {
                    setVisible(false);
                }} label="Cancel" />
                <Dialog.Button onPress={() => {
                    setVisible(false);
                    
                    bankKickMemberForGood();
                }} label="BAN/KICK" />
                </Dialog.Container>
            </View> : null}
            <ActionSheetTwo
                ref={sheetRefActions}
                title={'Selectable chat options...'}
                options={options}
                cancelButtonIndex={5}
                destructiveButtonIndex={1}
                onPress={(index) => {
                    console.log("index", index);
                
                    switch (index) {
                        case 0:
                            leaveGroup();
                            break;
                        case 1:
                            if (conversation.owner === unique_id) {
                                deleteGroup();
                            } else {
                                showMessage({
                                    message: "You do not have the permission to delete this group.",
                                    description: "ONLY group ADMIN(S) may delete groups, you are not an admin.",
                                    type: "danger",
                                    duration: 3500
                                });
                            }
                            break;
                        case 2:
                            if (conversation.owner === unique_id) {
                                banKickMembers();
                            } else {
                                showMessage({
                                    message: "You do not have the permission to ban/kick members.",
                                    description: "ONLY group ADMIN(S) may ban or kick memebers, you are not an admin.",
                                    type: "danger",
                                    duration: 3500
                                });
                            }
                            
                            break;
                        case 3: 
                            if (conversation.owner === unique_id) {
                                transferGroupOwnership();
                            } else {
                                showMessage({
                                    message: "You do not have the permission to transfer group ownership permissions.",
                                    description: "ONLY group ADMIN(S) may transfer group admin ownership, you are not an admin.",
                                    type: "danger",
                                    duration: 3500
                                });
                            }
                            break;
                        case 4:
                            addMembersToGroup();
                            break;
                        default: 
                            return;
                    }
                }}
            />
            <ActionSheet ref={myCustomActionSheet}>
                <View>
                    <ScrollView
                        style={{ minHeight: 450 }}
                        ref={scrollViewRef}
                        nestedScrollEnabled={true}
                        onScrollEndDrag={() =>
                            myCustomActionSheet.current.handleChildScrollEnd()
                        }
                        onScrollAnimationEnd={() =>
                            myCustomActionSheet.current.handleChildScrollEnd()
                        }
                        onMomentumScrollEnd={() =>
                            myCustomActionSheet.current.handleChildScrollEnd()
                        }
                    >
                        <List>
                            <ListItem itemDivider>
                                <Text>Users in this chat group</Text>
                            </ListItem>   
                            <Autocomplete
                                data={relevantUsers}
                                value={query}
                                hideResults={hide}
                                placeholder={"Search for your users name's (first + last)"}
                                placeholderTextColor={"grey"}
                                listContainerStyle={{height: relevantUsers.length * 70}}
                                onChangeText={(text) => {
                                    setQuery(text);
                                    setHide(false);

                                    handleSearch(query);
                                }}
                                flatListProps={{
                                    keyExtractor: (_, idx) => idx,
                                    renderItem: ({ item }) => {
                                        return (
                                            <ListItem style={{ zIndex: 999999 }} button={true} onPress={() => {
                                                if (typeof selected !== "undefined" && selected.length > 0) {
                                                    if (selected.filter(e => e.username === item.username).length > 0) {
                                                        console.log("Includes...");

                                                        setSelected(selected.filter((select, indexxxxx) => {
                                                            if (select.unique_id !== item.unique_id) {
                                                                return select;
                                                            }
                                                        }));
                                                    } else {
                                                        console.log("Doesn't include...");

                                                        setSelected([...selected, item]);
                                                        setHide(true);
                                                        setQuery("");
                                                    }
                                                } else {
                                                    setSelected([...selected, item]);
                                                    setHide(true);
                                                    setQuery("");
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
                            <ScrollView vertical={true} showsVerticalScrollIndicator={false} style={styles.scrollerCustom}>
                                <Text style={styles.midText}>Already added users</Text>
                                <List>
                                    {typeof selected !== "undefined" && selected.length > 0 ? selected.map((item, index) => {
                                        return (
                                            <Fragment>
                                                <ListItem button={true} onPress={() => {
                                                    setSelected(selected.filter((select, indexxxxx) => {
                                                        if (select.unique_id !== item.unique_id) {
                                                            return select;
                                                        }
                                                    }));
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
                                {typeof selected !== "undefined" && selected.length > 0 ? <AwesomeButtonBlue style={{ marginTop: 10 }} type={"secondary"} textColor={"black"} onPress={() => {
                                    addUsersToGroupChat();
                                }} stretch={true}>Add users to group chat</AwesomeButtonBlue> : null}
                            </ScrollView>              
                        </List>
                        </ScrollView>
                </View>
            </ActionSheet>
            <RBSheet
            ref={RBSheetRef}
            height={height * 0.75}
            openDuration={250}
            customStyles={{
                container: {
                
                }
            }}
            >
                <Header>
                    <Left>
                        <Button onPress={() => {
                            RBSheetRef.current.close();
                        }} transparent>
                            <Icon name='close' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Ban/Kick User(s)</Title>
                        <Subtitle>Kick or ban user(s)</Subtitle>
                    </Body>
                    <Right />
                </Header>
                    <List>
                    <ListItem itemDivider>
                        <Text>Search for user(s) in this group to ban/kick</Text>
                    </ListItem>   
                    <Autocomplete
                        data={available}
                        value={searchValue}
                        hideResults={hideBan}
                        placeholder={"Search for your users name's (first + last)"}
                        placeholderTextColor={"grey"}
                        listContainerStyle={{ minHeight: available.length * 70}}
                        onChangeText={(text) => {
                            setSearchValue(text);
                            setHideBan(false);

                            handleSearchBanKick(searchValue);
                        }}
                        flatListProps={{
                            keyExtractor: (_, idx) => idx,
                            renderItem: ({ item }) => {
                                return (
                                    <ListItem style={{ zIndex: 999999 }} button={true} onPress={() => {
                                        
                                        console.log("clicked.");

                                        RBSheetRef.current.close();
                                        
                                        setSelectedSingle(item);

                                        setTimeout(() => {
                                            setVisible(true);
                                        }, 750)
                                    }}>
                                        <Left>
                                            <Text><Text style={{ fontSize: 20 }}>Ban/Kick member {item.name}</Text>{"\n"}Scope: {item.scope}</Text>
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
            </RBSheet>
        </Fragment>
    );
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.signupData.authData.unique_id
    };
}
export default connect(mapStateToProps, { })(SheetOptionsHelper);
