import React, { Component, Fragment } from 'react'
import { Header, Left, Body, Right, Button, Icon, Title, Text as NativeText, Subtitle, Item, Label, Input, Textarea } from 'native-base';
import { View, Text, Image, FlatList, ScrollView, TouchableOpacity, TextInput, Dimensions, Platform } from 'react-native';
import styles from './styles.js';
import Accordion from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import Tags from "react-native-tags";
import Markdown from 'react-native-markdown-display';
import DialogInput from 'react-native-dialog-input';
import { Linking } from 'react-native';
import renderRules from "./renderRules.js";
import uuid from "react-native-uuid";
import RNPickerSelect from 'react-native-picker-select';
import SyntaxHighlighter from 'react-native-syntax-highlighter';
import RBSheet from "react-native-raw-bottom-sheet";
import axios from 'axios';
import Config from 'react-native-config';
import Toast from 'react-native-toast-message';
import { connect } from 'react-redux';

const { height, width } = Dimensions.get("window");

const SECTIONS = [
    {
        title: 'Summarize the problem',
        content: 'Lorem ipsum...',
    },
    {
        title: "Describe what you've tried",
        content: 'Lorem ipsum...',
    }, {
        title: "Show some code",
        content: 'Lorem ipsum...',
    }
];

const bulletsOne = [
    {
        title: "Include details about your goal",
        index: 0
    },
    {
        title: "Described expected and actual results",
        index: 1
    }, 
    {
        title: "Include any error messages",
        index: 2
    }
]

class InitialAskQuestionHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        activeSections: [],
        description: "",
        showBoldModal: false,
        showItalicModal: false,
        showLinkModal: false,
        showCodeModal: false,
        snippetArray: [],
        title: "",
        languageSelected: "",
        comment: "",
        snippet: "",
        tags: []
    }
}
    _renderSectionTitle = (section) => {
        if (section.title === "Second") {
            return (
                <View style={styles.content}>
                    <Text>Step 1. Draft your question</Text>
                </View>
            );
        }
    };

    _renderHeader = (section, index, isActive, sections) => {
        return (
            <Animatable.View
                duration={300}
                transition="backgroundColor"
                style={{ backgroundColor: (isActive ? 'rgba(255,255,255,1)' : 'rgba(245,252,255,1)'), padding: 10 }}>
                <Text style={styles.headerText}><Text style={styles.specialLetter}>{index + 1}.</Text> {section.title}</Text>
            </Animatable.View>
        );
    };
    renderRow = ({ item, index }) => {
        return (
          <Text style={styles.bullet} key={index}>{`\u2022 ${item.title}`}</Text>
        );
    }
    _renderContent = (section, i, isActive, sections) => {
        if (section.title === "Summarize the problem") {
            return (
                <Animatable.View
                    duration={300}
                    transition="backgroundColor"
                    style={{ backgroundColor: (isActive ? 'rgba(255,255,255,1)' : 'rgba(245,252,255,1)') }}
                >
                    <FlatList
                        style={{ margin: 20 }}
                        data={bulletsOne}
                        renderItem={this.renderRow}
                    />
                </Animatable.View>
            );
        } else if (section.title === "Describe what you've tried") {
            return (
                <Animatable.View
                    duration={300}
                    transition="backgroundColor"
                    style={{ backgroundColor: (isActive ? 'rgba(255,255,255,1)' : 'rgba(245,252,255,1)') }}
                >
                    <View style={styles.margin}>
                        <Animatable.Text>
                            Show what you've tried and tell us what you found (on this app or elsewhere) and why it didn't meet your needs. You can get better answers when you provide research.
                        </Animatable.Text>
                    </View>
                </Animatable.View>
            );
        } else if (section.title === "Show some code") {
            return (
                <Animatable.View
                    duration={300}
                    transition="backgroundColor"
                    style={{ backgroundColor: (isActive ? 'rgba(255,255,255,1)' : 'rgba(245,252,255,1)') }}
                >
                    <View style={styles.margin}>
                        <Animatable.Text>
                            When appropriate, share the minimum amount of code others need to reproduce your problem (also called a <Text style={{ color: "blue" }}>minimum, reproducable example</Text>)
                        </Animatable.Text>
                    </View>
                </Animatable.View>
            );
        }
    };

    _updateSections = (activeSections) => {
        this.setState({ activeSections });
    };
    renderConditional = () => {
        const { description, title, snippetArray, tags } = this.state;

        if ((typeof description !== "undefined" && description.length > 0) && (typeof title !== "undefined" && title.length > 0) && (typeof tags !== "undefined" && tags.length > 0)) {
            return false;
        } else {
            return true;
        }
    }
    setSelection = (event) => {
        console.log("foccuseed.", event);
    };
    handleRemoval = (snip) => {
        this.setState({
            snippetArray: this.state.snippetArray.filter((snippet) => {
                if (snip.id !== snippet.id) {
                    return snippet;
                }
            })
        })
    }
    handleSubmission = () => {
        const { description, title, snippetArray, tags } = this.state;


        axios.post(`${Config.ngrok_url}/post/question/discussion/board`, {
            id: this.props.unique_id,
            description, 
            title, 
            snippetArray, 
            tags
        }).then((res) => {
            if (res.data.message === "Posted new forum post and updated DB!") {

                const { data } = res.data;

                this.setState({
                    description: "",
                    title: "",
                    snippetArray: [],
                    tags: []
                }, () => {
                    Toast.show({
                        text1: 'Successfully posted new forum posting!!',
                        text2: `We've successfully updated our database and added your forum post and/or question and it is now live!`,
                        visibilityTime: 4500,
                        type: "success",
                        position: "top"
                    });
    
                    setTimeout(() => {
                        this.props.props.navigation.push("forums-main");
                    }, 4500)
                })
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    render() {
        const { snippetArray } = this.state;

        console.log("THIS STATE CREATEPOST INITIAL:", this.state);
        return (
            <Fragment>
                <Header style={{ backgroundColor: "#303030" }}>
                    <Left>
                        <Button onPress={() => {
                            this.props.props.navigation.goBack();
                        }} transparent>
                            <Icon style={{ color: "#ffd530" }} name='arrow-back' />
                                {Platform.OS === "ios" ? <NativeText style={{ color: "black" }}>Back</NativeText> : null}
                        </Button>
                    </Left>
                    <Body>
                        <Title style={styles.goldText}>Create Question</Title>
                        <Subtitle style={styles.goldText}>Create a question</Subtitle>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon style={{ color: "#ffd530" }} name='menu' />
                        </Button>
                    </Right>
                </Header>
                <Toast ref={(ref) => Toast.setRef(ref)} />
                <ScrollView contentContainerStyle={{ paddingBottom: 50 }} style={styles.container}>
                    <View style={styles.margin}>
                        <Text style={styles.accordianTitleText}>Step 1. Draft your question</Text>
                        <Text style={styles.accordianSubText}>The community is here to help you with specific coding, algorithm, or language problems.</Text>
                        <Accordion
                            sections={SECTIONS}
                            activeSections={this.state.activeSections}
                            renderSectionTitle={this._renderSectionTitle}
                            renderHeader={this._renderHeader}
                            renderContent={this._renderContent}
                            onChange={this._updateSections}
                        />
                        <View style={{ marginTop: 15 }} />
                        <Text style={styles.questionText}>Title/Question</Text>
                        <Text style={{ color: "grey" }}>Be specific and imagine your asking a question to another person</Text>
                        <Item stackedLabel>
                            <Label style={{ fontWeight: "bold" }}>Question Title</Label>
                            <Input onChangeText={(title) => {
                                this.setState({
                                    title
                                })
                            }} value={this.state.title} placeholderTextColor={"grey"} placeholder={"e.g. Is there an R function for finding the index of a circumfrence of a circle?"} />
                        </Item>
                        <Text style={[styles.questionText, { marginTop: 25 }]}>Body</Text>
                        <Text style={{ color: "grey" }}>Include all the information someone would need to answer your question</Text>
                        <View style={{ marginTop: 15 }} />
                        <View style={styles.rowCustom}>
                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    showBoldModal: true
                                })
                            }} style={[styles.section, {  borderLeftColor: "lightgrey", borderLeftWidth: 1 }]}>
                                <Image source={require("../../../../assets/icons/bold.png")} style={styles.textInputIcon} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    showItalicModal: true
                                })
                            }} style={styles.section}>
                                <Image source={require("../../../../assets/icons/italic.png")} style={styles.textInputIcon} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    showLinkModal: true
                                })
                            }} style={styles.section}>
                                <Image source={require("../../../../assets/icons/hyper.png")} style={styles.textInputIcon} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                
                            }} style={styles.section}>
                                <Image source={require("../../../../assets/icons/quote-down.png")} style={styles.textInputIcon} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                this.RBSheet.open();
                            }} style={styles.section}>
                                <Image source={require("../../../../assets/icons/curly.png")} style={styles.textInputIcon} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {}} style={styles.section}>
                                <Image source={require("../../../../assets/icons/landscape-pic.png")} style={styles.textInputIcon} />
                            </TouchableOpacity>
                            {/* <TouchableOpacity onPress={() => {}} style={styles.section}>

                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {}} style={styles.section}>

                            </TouchableOpacity> */}
                        </View>
                        <TextInput 
                            {...this.props}
                            minHeight={200} 
                            maxHeight={200} 
                            onFocus={this.setSelection}
                            onSelectionChange={({ nativeEvent: { selection } }) => {
                                this.setState({ 
                                    selection 
                                }, () => {
                                    console.log(selection);
                                })
                            }} 
                            ref={(ref) => this.textInput = ref} 
                            style={styles.textarea} 
                            onChangeText={(description) => {
                                this.setState({
                                    description,
                                    selectionBool: false
                                }, () => {
                                    this.textInput.focus();
                                })
                            }} 
                            multiline={true}
                            selectionColor={"blue"} 
                            value={this.state.description} 
                            placeholderTextColor={"grey"} 
                            placeholder={"e.g. Is there an R function for finding the index of a circumfrence of a circle?"} 
                        />
                        <View style={{ margin: 15 }}>
                            <Markdown rules={renderRules} onLinkPress={(link) => {
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
                                {this.state.description}
                            </Markdown>
                            {typeof snippetArray !== 'undefined' && snippetArray.length > 0 ? snippetArray.map((snippet, index) => {
                                return (
                                   <Fragment>
                                        <Text style={styles.comment}>{snippet.comment}</Text>
                                        <View style={{ marginTop: 50, marginBottom: 30 }}>
                                            <SyntaxHighlighter 
                                                language={snippet.language} 
                                                highlighter={"prism" || "hljs"}
                                            >
                                                {snippet.codeString}
                                            </SyntaxHighlighter>
                                        </View>
                                        <TouchableOpacity onPress={() => {
                                            this.handleRemoval(snippet);
                                        }} style={styles.positionTouchable}>
                                            <View style={{ flexDirection: "row" }}>
                                                <Image source={require("../../../../assets/icons/close.png")} style={{ maxWidth: 40, maxHeight: 40 }} />
                                                <Text style={{ fontWeight: "bold", marginTop: 10 }}>Delete code block - {index + 1}</Text>
                                            </View>
                                        </TouchableOpacity>
                                   </Fragment>
                                );
                            }) : null}
                        </View>
                        <View style={{ marginTop: 25 }} />
                        <Text style={[styles.questionText, { marginTop: 25 }]}>Tags</Text>
                        <Text style={{ color: "grey" }}>Add UP TO 5 tags to describe what your question is about</Text>
                        <View style={{ marginTop: 15 }} />
                        <Tags   
                            maxNumberOfTags={5}
                            textInputProps={{
                                placeholder: "Any type of animal"
                            }}
                            initialTags={[]}
                            onChangeTags={(tags) => {
                                console.log(tags);

                                this.setState({
                                    tags
                                })
                            }}
                            onTagPress={(index, tagLabel, event, deleted) => {
                                console.log(index, tagLabel, event, deleted ? "deleted" : "not deleted");

                                this.setState({
                                    tags: this.state.tags.filter((tag) => {
                                        if (tag !== tagLabel) {
                                            return tag;
                                        }
                                    })
                                })
                            }}
                            textInputProps={{
                                autoCapitalize: "none"
                            }}
                            containerStyle={{ justifyContent: "center" }}
                            inputStyle={styles.inputStyle}
                            renderTag={({ tag, index, onPress, deleteTagOnPress, readonly }) => {
                                return (
                                    <TouchableOpacity style={styles.taggedOutter} key={`${tag}-${index}`} onPress={onPress}>
                                        <Text style={styles.tagged}>{tag}</Text>
                                    </TouchableOpacity>
                                );
                            }}
                        />
                        <View style={{ marginTop: 25 }} />
                        {this.renderConditional() ? <AwesomeButtonBlue type={"disabled"} stretch={true}>Submit Question & Continue</AwesomeButtonBlue> : <AwesomeButtonBlue type={"secondary"} onPress={this.handleSubmission} stretch={true} backgroundColor={"blue"} textColor={"white"}>Submit Question & Continue</AwesomeButtonBlue>}
                    
                    </View>
                </ScrollView>     
                <DialogInput 
                    modalStyle={styles.modal} 
                    isDialogVisible={this.state.showBoldModal}
                    title={"The text you enter below will be in BOLD..."}
                    message={"Please bold the text you would like emphized in the box below - do not change the symbols"}
                    hintInput ={"Enter what you'd like to BOLD."}
                    submitInput={ (inputText) => {
                        this.setState({
                            showBoldModal: false,
                            description: this.state.description + `**${inputText}** `
                        })
                    }}
                    closeDialog={ () => {
                        this.setState({
                            showBoldModal: false
                        })
                    }}>
                </DialogInput>   
                <DialogInput 
                    modalStyle={styles.modal} 
                    isDialogVisible={this.state.showItalicModal}
                    title={"Enter the text you would like to ITALICIZED"}
                    message={"Please italicize the text you would like emphized in the box below - do not change the symbols"}
                    hintInput ={"Enter what you'd like to ITALICIZED."}
                    submitInput={ (inputText) => {
                        this.setState({
                            showItalicModal: false,
                            description: this.state.description + `*${inputText}* `
                        })
                    }}
                    closeDialog={ () => {
                        this.setState({
                            showItalicModal: false
                        })
                    }}>
                </DialogInput> 
                <DialogInput 
                    modalStyle={styles.modal} 
                    isDialogVisible={this.state.showLinkModal}
                    title={"Enter the URL you would like to reference"}
                    message={"Please enter the URL you would like to link to - include JUST the url e.g. https://www.google.com"}
                    hintInput ={"Enter your URL..."}
                    submitInput={ (inputText) => {
                        this.setState({
                            showLinkModal: false,
                            description: this.state.description + `[${inputText}](${inputText}) `
                        })
                    }}
                    closeDialog={ () => {
                        this.setState({
                            showLinkModal: false
                        })
                    }}>
                </DialogInput>  
                <DialogInput 
                    modalStyle={styles.modal} 
                    isDialogVisible={this.state.showCodeModal}
                    title={"Enter your 'line' of code in the text box..."}
                    message={"Please include only one line of code - if you need to use a snippet, please select the snippet option"}
                    hintInput ={"Paste line of code here..."}
                    submitInput={ (inputText) => {
                        this.setState({
                            showCodeModal: false,
                            description: this.state.description + "`" + inputText + "`"
                        })
                    }}
                    closeDialog={ () => {
                        this.setState({
                            showCodeModal: false
                        })
                    }}>
                </DialogInput> 
                <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    height={height * 0.95}
                    openDuration={250}
                    customStyles={{
                        container: {
                            borderTopLeftRadius: 40, 
                            borderTopRightRadius: 40
                        }
                    }}
                    >
                        <Header>
                            <Left>
                                <Button onPress={() => {
                                    this.RBSheet.close();
                                }} transparent>
                                    <Icon style={{ color: "black" }} name='arrow-back' />
                                    <Text style={{ color: "black" }}>Back</Text>
                                </Button>
                            </Left>
                            <Body>
                                <Title>Code Block/Line</Title>
                                <Subtitle>Add a code block or line</Subtitle>
                            </Body>
                            <Right>
                           
                            </Right>
                        </Header>
                        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }} style={{ margin: 15 }}>
                            <Text style={{ fontWeight: "bold", fontSize: 20, textAlign: "center", marginBottom: 20, marginTop: 15, marginLeft: 10, marginRight: 10 }}>Enter your code snippet below and select the appropriate language syntax...</Text>
                            <Text style={styles.label}>Enter a comment for this code snippet, if you'd like. It will appear above the code snippet...</Text>
                            <Textarea value={this.state.comment} onChangeText={(comment) => {
                                this.setState({
                                    comment
                                })
                            }} rowSpan={4} bordered placeholder="Enter your comment for this snippet" />
                            <Text style={styles.label}>Select the language you're using...</Text>
                            <RNPickerSelect
                                style={styles}
                                onValueChange={(value) => {
                                    this.setState({
                                        languageSelected: value
                                    })
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
                            <Text style={styles.label}>Enter your code snippet...</Text>
                            <Textarea onChangeText={(value) => {
                                this.setState({
                                    snippet: value
                                })
                            }} value={this.state.snippet} rowSpan={10} bordered placeholder="Enter your code snippet here..." />
                            <View style={{ marginTop: 25 }} />
                            <AwesomeButtonBlue type={"secondary"} backgroundColor={"blue"} textColor={"white"} stretch={true} onPress={() => {
                                this.setState({
                                    snippetArray: [...this.state.snippetArray, {
                                        language: this.state.languageSelected,
                                        codeString: this.state.snippet,
                                        comment: this.state.comment,
                                        id: uuid.v4()
                                    }],
                                    showSnippetModal: false,
                                    comment: "",
                                    snippet: ""
                                }, () => {
                                    this.RBSheet.close();
                                })
                            }}>Submit Snippet/Code</AwesomeButtonBlue>
                        </ScrollView>
                    </RBSheet>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.signupData.authData.unique_id
    }
}
export default connect(mapStateToProps, { })(InitialAskQuestionHelper);