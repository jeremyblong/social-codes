import React, { Component, Fragment } from 'react'
import { Text, View, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Header, Left, Body, Right, Button, Icon as Iconnn, Title, Subtitle, Item, Input, Textarea, Picker } from 'native-base';
import styles from './styles';
import axios from "axios";
import Config from "react-native-config";
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { connect } from 'react-redux';
import _ from 'lodash';
import Icon from "react-native-vector-icons/MaterialIcons";
import { addPortfolioData } from "../../../../actions/portfolio/index.js";
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import DocumentPicker from 'react-native-document-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import RNFS from 'react-native-fs';
import DialogInput from 'react-native-dialog-input';
import * as Progress from 'react-native-progress';
import Toast from 'react-native-toast-message';
import SideMenu from "react-native-side-menu";
import Side from "../../../navigation/sidemenu/index.js";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


const { width, height } = Dimensions.get("window");

console.log(RNFS.DocumentDirectoryPath);

class MoreInformationPortfolioHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        role: "",
        task: "",
        suggestions: [],
        selectedItems: [],
        businessSize: null,
        additionalSkills: [],
        spinner: false,
        showDialogTwo: false,
        solutionFileName: "",
        fileName: "",
        showDialog: false,
        taskVideo: "",
        solutionVideo: "",
        menuOpen: false
    }
}
    componentDidMount() {
        axios.post(`${Config.ngrok_url}/search/software/deliverables`, {
            id: this.props.unique_id,
            query: this.props.query
        }).then((res) => {
            if (res.data.message === "Gathered results") {
                console.log(res.data);
                
                const { body } = res.data;

                this.setState({
                    suggestions: body
                })
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    handleReset = () => {
        console.log("handle reset");

        this.props.addPortfolioData({});

        setTimeout(() => {
            this.props.props.navigation.replace("add-portfolio-project");
        }, 750)
    }
    renderContinuation = () => {
        const { task, role, fileName, solutionVideo, taskVideo, url, selectedItems, businessSize, solution } = this.state;
        const { solutionFile, projectTaskFileLink } = this.props;

        if ((typeof role !== 'undefined' && role.length > 0) && (typeof task !== 'undefined' && task.length > 0) && (projectTaskFileLink !== null) && (solutionFile !== null)) {
            return false;
        } else {
            return true;
        }
    }
    selectTaskFile = async () => {
        try {
            const res = await DocumentPicker.pick({
              type: [DocumentPicker.types.images, DocumentPicker.types.docx, DocumentPicker.types.pdf, DocumentPicker.types.csv, DocumentPicker.types.xls, DocumentPicker.types.xlsx],
            });
            const { uri, type, name, size } = res;

            console.log(uri, type, name, size);

            const my64 = await RNFS.readFile(decodeURI(uri), 'base64').then();

            this.setState({
                spinner: true
            }, () => {
                axios.post(`${Config.ngrok_url}/upload/task/file`, {
                    base64: my64, 
                    type, 
                    name, 
                    size,
                    id: this.props.unique_id 
                }).then((res) => {
                    if (res.data.message === "Uploaded file!") {
                        console.log(res.data);
    
                        const { generatedID } = res.data;
    
                        this.setState({
                            fileName: name,
                            spinner: false
                        }, () => {
                            this.props.addPortfolioData({
                                ...this.props.portfolio,
                                projectTaskFileLink: generatedID
                            })
                        })
                    } else {
                        console.log("Err", res.data);
    
                        this.setState({
                            spinner: false
                        })
                    }
                }).catch((err) => {
                    console.log(err);
    
                    this.setState({
                        spinner: false
                    })
                })
            })
          } catch (err) {
            if (DocumentPicker.isCancel(err)) {
              // User cancelled the picker, exit any dialogs or menus and move on
            } else {
              throw err;
            }
          }
    }
    selectSolutionFile = async () => {
        try {
            const res = await DocumentPicker.pick({
              type: [DocumentPicker.types.images, DocumentPicker.types.docx, DocumentPicker.types.pdf, DocumentPicker.types.csv, DocumentPicker.types.xls, DocumentPicker.types.xlsx],
            });
            const { uri, type, name, size } = res;

            console.log(uri, type, name, size);

            const my64 = await RNFS.readFile(decodeURI(uri), 'base64').then();

            this.setState({
                spinner: true
            }, () => {
                axios.post(`${Config.ngrok_url}/upload/solution/file`, {
                    base64: my64, 
                    type, 
                    name, 
                    size,
                    id: this.props.unique_id 
                }).then((res) => {
                    if (res.data.message === "Uploaded file!") {
                        console.log(res.data);
    
                        const { generatedID } = res.data;
    
                        this.setState({
                            solutionFileName: name,
                            spinner: false
                        }, () => {
                            this.props.addPortfolioData({
                                ...this.props.portfolio,
                                projectSolutionFileLink: generatedID
                            })
                        })
                    } else {
                        console.log("Err", res.data);

                        this.setState({
                            spinner: false
                        })
                    }
                }).catch((err) => {
                    console.log(err);

                    this.setState({
                        spinner: false
                    })
                })
            })
          } catch (err) {
            if (DocumentPicker.isCancel(err)) {
              // User cancelled the picker, exit any dialogs or menus and move on
            } else {
              throw err;
            }
          }
    }
    handleSubmission = () => {
        const { businessSize, fileName, role, solution, solutionFileName, solutionVideo, task, taskVideo, url, selectedItems, suggestions } = this.state;

        const selectedTags = [];

        if (typeof suggestions !== "undefined" && suggestions.length > 0) {
            for (let index = 0; index < suggestions.length; index++) {
                const suggestion = suggestions[index];
                if (selectedItems.includes(suggestion.id)) {
                    selectedTags.push(suggestion);
                }
            }
        }

        this.props.addPortfolioData({
            ...this.props.portfolio,
            businessSize, 
            projectTaskFileLinkName: fileName, 
            rolePosition: role, 
            projectSolution: solution, 
            solutionFileName, 
            solutionVideo, 
            projectTask: task, 
            projectTaskVideo: taskVideo, 
            liveProjectURL: url,
            relevantTags: selectedTags,
            page: 4
        })

        setTimeout(() => {
            this.props.props.navigation.navigate("review-portfolio-project");
        }, 1000)
    }
    render() {
        console.log(this.state);

        const { taskVideo, solutionVideo } = this.state;
        const menu = <Side props={this.props} />;
        return (
            <Fragment>
                <SideMenu openMenuOffset={width * 0.80} menuPosition={"right"} isOpen={this.state.menuOpen} menu={menu}>
                
                <TouchableOpacity onPress={() => {
                    this.setState({
                        menuOpen: !this.state.menuOpen
                    })
                }} style={styles.bottomRightCorner}>
                    <Image source={require("../../../../assets/icons/circle-menu.png")} style={styles.circleMenu} />
                </TouchableOpacity>
                <Header>
                    <Left>
                        <Button onPress={() => {
                            this.props.props.navigation.goBack();
                        }} transparent>
                            <Iconnn style={{ color: "black" }} name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Add Portfolio Project</Title>
                        <Subtitle>Add Portfolio Project</Subtitle>
                    </Body>
                    <Right>
                        <Button onPress={() => {
                            this.handleReset();
                        }} transparent>
                            <Text>Restart</Text>
                        </Button>
                    </Right>
                </Header>
                <Progress.Bar unfilledColor={"lightgrey"} progress={0.75} height={4} width={width} />
                <Toast ref={(ref) => Toast.setRef(ref)} />
                <Spinner
                    visible={this.state.spinner}
                    overlayColor={"rgba(0, 0, 0, 0.75)"}
                    textContent={'Uploading your file...'}
                    textStyle={styles.spinnerTextStyle}
                />
                <ScrollView contentContainerStyle={{ paddingBottom: 75 }} style={styles.container}>
                <KeyboardAwareScrollView>
                    <View style={styles.margin}>
                        <Text style={styles.headerText}>Role/Position <Text style={{ color: "red" }}>(required)</Text></Text>
                        <Item regular>
                            <Input value={this.state.role} onChangeText={(value) => {
                                this.setState({
                                    role: value
                                })
                            }} placeholder='Ex. I was the lead developer for a startup co. in SF' />
                        </Item>
                        <View style={{ marginTop: 15 }} />
                        <Text style={styles.headerText}>Project Task/Challenge <Text style={{ color: "red" }}>(required)</Text></Text>
                        <Textarea rowSpan={5} bordered value={this.state.task} onChangeText={(value) => {
                            this.setState({
                                task: value
                            })
                        }} placeholder='Describe the problems or opportunity you manage or controlled in your project'/>
                        <View style={{ marginTop: 15 }} />
                        <View style={styles.centeredCustom}>
                            {this.props.projectTaskFileLink !== null ? <View style={[styles.centeredCustom, { minHeight: 125, marginBottom: 40 }]}>
                                <Text style={styles.fileText}>{this.state.fileName}</Text>
                                <Image source={require("../../../../assets/icons/file.png")} style={{ maxWidth: 45, maxHeight: 45, marginBottom: 20 }} />
                            </View> : null}
                        </View>
                        <TouchableOpacity onPress={() => {
                            this.selectTaskFile()
                        }} style={styles.touchable}>
                            <View style={styles.row}>
                                <Image source={require("../../../../assets/icons/upload.png")} style={styles.icon} />
                                <Text style={styles.buttonText}>Upload file <Text style={{ color: "red" }}>(required)</Text></Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{ marginTop: 15 }} />
                        {typeof taskVideo !== "undefined" && taskVideo.length > 0 ? <View style={{ marginTop: 10, marginBottom: 10 }}><Text style={{ fontWeight: "bold", textAlign: "center" }}>Video URL:</Text><Text style={{ fontSize: 18, fontWeight: "bold", color: "blue", textAlign: "center" }}>{taskVideo}</Text></View> : null}
                        <View style={{ marginTop: 15 }} />
                        <TouchableOpacity onPress={() => {
                            this.setState({
                                showDialog: true
                            })
                        }} style={styles.touchable}>
                            <View style={styles.row}>
                                <Image source={require("../../../../assets/icons/video-on.png")} style={styles.icon} />
                                <Text style={styles.buttonText}>Add Video Link</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{ marginTop: 15 }} />
                        <Text>Upload .jpg, .gif, or .png images up to 10mb each. Images will be displayed at 690px wide, at maximum. You can also upload videos.</Text>
                        <View style={{ marginTop: 15 }} />
                        <Text style={styles.headerText}>Project Solution <Text style={{ color: "red" }}>(required)</Text></Text>
                        <Textarea rowSpan={5} bordered value={this.state.solution} onChangeText={(value) => {
                            this.setState({
                                solution: value
                            })
                        }} placeholder='Describe your solution to the problem outlined above'/>
                        <View style={{ marginTop: 15 }} />
                        <View style={styles.centeredCustom}>
                            {this.props.solutionFile !== null ? <View style={[styles.centeredCustom, { minHeight: 125, marginBottom: 40 }]}>
                                <Text style={styles.fileText}>{this.state.solutionFileName}</Text>
                                <Image source={require("../../../../assets/icons/file.png")} style={{ maxWidth: 45, maxHeight: 45, marginBottom: 20 }} />
                            </View> : null}
                        </View>
                        <TouchableOpacity onPress={() => {
                            this.selectSolutionFile()
                        }} style={styles.touchable}>
                            <View style={styles.row}>
                                <Image source={require("../../../../assets/icons/upload.png")} style={styles.icon} />
                                <Text style={styles.buttonText}>Upload file <Text style={{ color: "red" }}>(required)</Text></Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{ marginTop: 15 }} />
                        {typeof solutionVideo !== "undefined" && solutionVideo.length > 0 ? <View style={{ marginTop: 10, marginBottom: 10 }}><Text style={{ fontWeight: "bold", textAlign: "center" }}>Video URL:</Text><Text style={{ fontSize: 18, fontWeight: "bold", color: "blue", textAlign: "center" }}>{solutionVideo}</Text></View> : null}
                        <View style={{ marginTop: 15 }} />
                        <TouchableOpacity onPress={() => {
                             this.setState({
                                showDialogTwo: true
                            })
                        }} style={styles.touchable}>
                            <View style={styles.row}>
                                <Image source={require("../../../../assets/icons/video-on.png")} style={styles.icon} />
                                <Text style={styles.buttonText}>Add Video Link</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{ marginTop: 15 }} />
                        <Text style={styles.headerText}>Business Size (optional)</Text>
                        <Picker 
                            placeholderTextColor={"black"}
                            placeholder={"Business Size"}
                            mode="dropdown"
                            iosHeader="Select business size..."
                            style={{ width: width * 0.90, height: 40 }}
                            selectedValue={this.state.businessSize}
                            onValueChange={(value) => {
                                this.setState({ businessSize: value })
                            }}
                        >
                            <Picker.Item label="Very Small (1-9 employees)" value="Very Small (1-9 employees)" />
                            <Picker.Item label="Small (10-99 employees)" value="Small (10-99 employees)" />
                            <Picker.Item label="Mid (100-999 employees)" value="Mid (100-999 employees)" />
                            <Picker.Item label="Large (1000+ employees)" value="Large (1000+ employees)" />
                            <Picker.Item label="Startup" value="Startup" />
                            <Picker.Item label="Fortune 500" value="Fortune 500" />
                        </Picker>
                        <View style={{ marginTop: 15 }} />
                        <Text style={styles.headerText}>Live Project URL (optional)</Text>
                        <Item regular>
                            <Input value={this.state.url} onChangeText={(value) => {
                                this.setState({
                                    url: value
                                })
                            }} placeholder='https://wecodewithclarity.herokuapp.com' />
                        </Item>
                        <View style={{ marginTop: 15 }} />
                        <Text style={{ fontWeight: "bold", fontSize: 15 }}>Select the specific services & skills you demonstrated while working on this project</Text>
                        <View style={{ marginTop: 15 }} />
                        <Text style={styles.headerText}>Relevant Tags</Text>
                        <SectionedMultiSelect
                                items={this.state.suggestions}
                                IconRenderer={Icon}
                                uniqueKey="id"
                                selectText="Select software deliverables..."
                                showDropDowns={true}
                                onSelectedItemsChange={(selectedItems) => {
                                    this.setState({ selectedItems });
                                }}
                                selectedItems={this.state.selectedItems}
                            />

                        <View style={{ marginTop: 35 }}>
                        {this.renderContinuation() ? <AwesomeButtonBlue type={"disabled"} onPress={() => {
                            Toast.show({
                                text1: "Please complete each required field before proceeding...",
                                text2: "Make sure each and every required field is completed before submitting & proceeding...",
                                type: "error",
                                visibilityTime: 4500,
                                position: "top"
                            })
                        }} stretch={true}>Submit & Continue</AwesomeButtonBlue> : <AwesomeButtonBlue type={"secondary"} onPress={this.handleSubmission} stretch={true}>Submit & Continue</AwesomeButtonBlue>}
                        </View>
                    </View>
                    </KeyboardAwareScrollView>
                </ScrollView>
                <DialogInput isDialogVisible={this.state.showDialog}
                    title={"Add Task YouTube Video"}
                    message={"Paste a link to the desired YouTube video you wish to link to this project"}
                    hintInput ={"https://www.youtube.com"}
                    submitInput={(inputText) => {
                        console.log(inputText);

                        this.setState({
                            taskVideo: inputText,
                            showDialog: false
                        })
                    }}
                    closeDialog={() => {
                        this.setState({
                            showDialog: false
                        })
                    }}>
                </DialogInput>
                <DialogInput isDialogVisible={this.state.showDialogTwo}
                    title={"Add Solution YouTube Video"}
                    message={"Paste a link to the desired YouTube video you wish to link to this project"}
                    hintInput ={"https://www.youtube.com"}
                    submitInput={(inputText) => {
                        console.log(inputText);

                        this.setState({
                            solutionVideo: inputText,
                            showDialogTwo: false
                        })
                    }}
                    closeDialog={() => {
                        this.setState({
                            showDialogTwo: false
                        })
                    }}>
                </DialogInput>
                </SideMenu>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        portfolio: _.has(state.portfolio, "portfolio") ? state.portfolio.portfolio : {},
        unique_id: state.signupData.authData.unique_id,
        query: state.portfolio.portfolio.selectedSkill,
        solutionFile: _.has(state.portfolio.portfolio, "projectSolutionFileLink") ? state.portfolio.portfolio.projectSolutionFileLink : null,
        projectTaskFileLink: _.has(state.portfolio.portfolio, "projectTaskFileLink") ? state.portfolio.portfolio.projectTaskFileLink : null
    }
}
export default connect(mapStateToProps, { addPortfolioData })(MoreInformationPortfolioHelper);