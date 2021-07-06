import React, { useState, useEffect, Fragment } from 'react'
import RBSheet from "react-native-raw-bottom-sheet";
import { View, Text, Image, Dimensions, ScrollView, Linking, TouchableOpacity } from "react-native";
import { Header, Left, Body, Right, Button, Icon, Title, Subtitle, Textarea } from 'native-base';
import Markdown from 'react-native-markdown-display';
import SyntaxHighlighter from 'react-native-syntax-highlighter';
import styles from './styles.js';
import DialogInput from 'react-native-dialog-input';
import Modal from 'react-native-modal';
import RNPickerSelect from 'react-native-picker-select';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import uuid from 'react-native-uuid';
import axios from "axios";
import Config from "react-native-config";
import { addForumComments } from "../../../../../../actions/forum/index.js";
import { connect } from "react-redux";

const { height, width } = Dimensions.get("window");


const LeaveACommentForumPostHelper = ({ rawBottomSheet, unique_id, forum, addForumComments }) => {
    const [ snippets, setSnippets ] = useState([]);
    const [ description, setDescription ] = useState("");
    const [ showBoldModal, setShowBoldModal ] = useState(false);
    const [ showItalicModal, setShowItalicModal ] = useState(false);
    const [ showLinkModal, setShowLinkModal ] = useState(false);
    const [ codeChunk, setCodeChunk ] = useState("");
    const [ isPopupVisible, setIsPopupVisible ] = useState(false);
    const [ language, setLanguage ] = useState("");
    const [ comment, setComment ] = useState("");

    const addToSnippets = () => {
        setSnippets(state => [...state, {
            language,
            codeString: codeChunk,
            comment,
            id: uuid.v4()
        }])


        setComment("");
        setLanguage("");
        setCodeChunk("");
    }

    const handleCommentSubmission = () => {
        console.log("handleCommentSubmission clicked....");

        axios.post(`${Config.ngrok_url}/update/comments/forum/posting`, {
            snippets,
            description,
            id: unique_id,
            forum
        }).then((res) => {
            if (res.data.message === "Successfully updated comments and added new one!") {
                console.log(res.data);

                const { forummm, comment } = res.data;

                addForumComments(state => [...state, comment]);

                setSnippets([]);
                setDescription("");
                setLanguage("");

                rawBottomSheet.current.close();
                
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <Fragment>
            
            <RBSheet
                ref={rawBottomSheet}
                height={height * 0.95}
                openDuration={250}
                customStyles={{
                    container: {
                        borderTopRightRadius: 40,
                        borderTopLeftRadius: 40
                    }
                }}
                >
                    <DialogInput 
                        modalStyle={styles.modal} 
                        isDialogVisible={showBoldModal}
                        title={"The text you enter below will be in BOLD..."}
                        message={"Please bold the text you would like emphized in the box below - do not change the symbols"}
                        hintInput ={"Enter what you'd like to BOLD."}
                        submitInput={ (inputText) => {
                            setShowBoldModal(false);

                            setDescription(description + `**${inputText}** `);
                        }}
                        closeDialog={ () => {
                            setShowBoldModal(false);
                        }}>
                    </DialogInput> 
                    <Modal isVisible={isPopupVisible}>
                        <View style={{ flex: 1, marginTop: 25, justifyContent: 'center', alignItems: 'center', alignContent: "center", width: "100%", height: 375, minHeight: 375, minWidth: "100%", backgroundColor: "white" }}>
                            <TouchableOpacity onPress={() => {
                                setIsPopupVisible(false);
                            }} style={styles.topLeftExit}>
                                <Image source={require("../../../../../../assets/icons/close.png")} style={{ maxWidth: 45, maxHeight: 45 }} />
                            </TouchableOpacity>
                            <Text style={styles.label}>Select the language you're using...</Text>
                            <RNPickerSelect
                                style={styles}
                                onValueChange={(value) => {
                                    setLanguage(value);
                                }}
                                items={[
                                    { label: 'JavaScript', value: 'javascript' },
                                    { label: 'Python', value: 'python' },
                                    { label: 'TypeScript', value: 'typescript' },
                                    { label: "Java", value: "java" },
                                    { label: "Kotlin", value: "kotlin" },
                                    { label: "Swift", value: "swift" },
                                    { label: "C#", value: "c#" },
                                    { label: "C", value: "c" },
                                    { label: "C++", value: "c++" },
                                    { label: "php", value: "php" },
                                    { label: "Go", value: "go" },
                                    { label: "Matlab", value: "matlab" },
                                    { label: "Ruby", value: "ruby" }
                                ]}
                            />
                            <Text style={[styles.headerText, { fontSize: 18, marginBottom: 10 }]}>Enter your code snippet below</Text>
                            <Textarea value={codeChunk} onChangeText={(value) => {
                                setCodeChunk(value);
                            }} rowSpan={8} style={styles.textareaModal} bordered placeholder="Enter your solution/code-snippet here..." placeholderTextColor={"grey"} />
                            <View style={styles.hr} />
                            <Text style={styles.label}>Enter a comment for this code snippet</Text>
                            <Textarea value={comment} onChangeText={(value) => {
                                setComment(value);
                            }} rowSpan={8} style={styles.bareTextArea} bordered placeholder="Enter your comment for this code snippet here.." placeholderTextColor={"grey"} />
                            <AwesomeButtonBlue type={"secondary"} style={{ marginTop: 20 }} onPress={() => {
                                setIsPopupVisible(false);

                                addToSnippets();
                            }} backgroundColor={"blue"} textColor={"white"} stretch={true}>Submit Code Snippet & Comment</AwesomeButtonBlue>
                        </View>
                    </Modal>
                    <DialogInput 
                        modalStyle={styles.modal} 
                        isDialogVisible={showItalicModal}
                        title={"Enter the text you would like to ITALICIZED"}
                        message={"Please italicize the text you would like emphized in the box below - do not change the symbols"}
                        hintInput ={"Enter what you'd like to ITALICIZED."}
                        submitInput={ (inputText) => {
                            setShowItalicModal(false);

                            setDescription(description + `*${inputText}* `);
                        }}
                        closeDialog={ () => {
                            setShowItalicModal(false);
                        }}>
                    </DialogInput> 
                    <DialogInput 
                        modalStyle={styles.modal} 
                        isDialogVisible={showLinkModal}
                        title={"Enter the URL you would like to reference"}
                        message={"Please enter the URL you would like to link to - include JUST the url e.g. https://www.google.com"}
                        hintInput ={"Enter your URL..."}
                        submitInput={ (inputText) => {
                            setShowLinkModal(false);
                            
                            setDescription(description + `[${inputText}](${inputText}) `);
                        }}
                        closeDialog={ () => {
                            setShowLinkModal(false);
                        }}>
                    </DialogInput>
                    <Header>
                        <Left>
                            <Button onPress={() => {
                                rawBottomSheet.current.close();
                            }} transparent>
                                <Icon style={{ color: "black" }} name='arrow-back' />
                            </Button>
                        </Left>
                        <Body>
                            <Title>Comment</Title>
                            <Subtitle>Leave a comment</Subtitle>
                        </Body>
                        <Right>
                         
                        </Right>
                    </Header>
                    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 200 }}>
                        <View style={styles.margin}>
                            <Text style={styles.headerText}>Answer Text</Text>
                                <View style={styles.rowCustom}>
                                    <TouchableOpacity onPress={() => {
                                        setShowBoldModal(true);
                                    }} style={[styles.section, {  borderLeftColor: "lightgrey", borderLeftWidth: 1 }]}>
                                        <Image source={require("../../../../../../assets/icons/bold.png")} style={styles.textInputIcon} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setShowItalicModal(true);
                                    }} style={styles.section}>
                                        <Image source={require("../../../../../../assets/icons/italic.png")} style={styles.textInputIcon} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setShowLinkModal(true);
                                    }} style={styles.section}>
                                        <Image source={require("../../../../../../assets/icons/hyper.png")} style={styles.textInputIcon} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        
                                    }} style={styles.section}>
                                        <Image source={require("../../../../../../assets/icons/quote-down.png")} style={styles.textInputIcon} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setIsPopupVisible(true);
                                    }} style={styles.section}>
                                        <Image source={require("../../../../../../assets/icons/curly.png")} style={styles.textInputIcon} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {}} style={styles.section}>
                                        <Image source={require("../../../../../../assets/icons/landscape-pic.png")} style={styles.textInputIcon} />
                                    </TouchableOpacity>
                                    {/* <TouchableOpacity onPress={() => {}} style={styles.section}>

                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {}} style={styles.section}>

                                    </TouchableOpacity> */}
                                </View>
                                <Textarea value={description} onChangeText={(value) => {
                                    setDescription(value);
                                }} rowSpan={8} style={styles.textarea} bordered placeholder="Enter your solution here..." placeholderTextColor={"grey"} />
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
                                    {description}
                                </Markdown>
                                {typeof snippets !== 'undefined' && snippets.length > 0 ? snippets.map((snippet, index) => {
                                    return (
                                        <View style={styles.highlighter} key={index}>
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
                                <AwesomeButtonBlue style={{ marginTop: 30 }} type={"secondary"} onPress={() => {
                                    handleCommentSubmission();
                                }} backgroundColor={"blue"} textColor={"white"} stretch={true}>Submit Code Snippet & Comment</AwesomeButtonBlue>
                        </View>
                    </ScrollView>
            </RBSheet>
        </Fragment>
    );   
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.signupData.authData.unique_id
    }
}
export default connect(mapStateToProps, { addForumComments })(LeaveACommentForumPostHelper);