import React, { Component, Fragment } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Header, Left, Body, Right, Button, Icon, Title, Subtitle } from 'native-base';
import styles from './styles.js';
import SideMenu from "react-native-side-menu";
import Side from "../../navigation/sidemenu/index.js";
import * as Progress from 'react-native-progress';
import ReadMore from 'react-native-read-more-text';
import FileViewer from 'react-native-file-viewer';
import Config from 'react-native-config';
import RNFS from 'react-native-fs';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import { connect } from "react-redux";
import { addPortfolioData } from "../../../actions/portfolio/index.js";


const { height, width } = Dimensions.get("window");

class IndividualPortfolioHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        menuOpen: false,
        placeholder: "",
        selected: null,
        tags: [],
        myTags: []
    }
}
    handleReset = () => {
        console.log("handle reset");

        this.props.addPortfolioData({});

        setTimeout(() => {
            this.props.props.navigation.replace("add-portfolio-project");
        }, 750)
    }
    _renderTruncatedFooter = (handlePress) => {
        return (
        <Text style={{color: "blue", marginTop: 5 }} onPress={handlePress}>
            Read more
        </Text>
        );
    }
    
    _renderRevealedFooter = (handlePress) => {
        return (
        <Text style={{color: "blue", marginTop: 5 }} onPress={handlePress}>
            Show less
        </Text>
        );
    }
    componentDidMount() {
        console.log("mounted.");

        const { relevantTags } = this.props.props.route.params.portfolio;

        const newTagArr = [];

        for (let index = 0; index < relevantTags.length; index++) {
            const item = relevantTags[index];
            newTagArr.push({
                id: item.id,
                label: item.name,
                name: item.name
            })
        }

        this.setState({
            tags: newTagArr,
            myTags: newTagArr
        })
    }
    viewSolutionDoc = () => {
        
        const url = `${Config.wasabi_url}/${this.props.props.route.params.portfolio.projectSolutionFileLink}`;
        // create a local file path from url
        const localFile = `${RNFS.DocumentDirectoryPath}/${this.props.props.route.params.portfolio.solutionFileName}`;
        
        const options = {
        fromUrl: url,
        toFile: localFile,
        };

        // last step it will download open it with fileviewer.
        RNFS.downloadFile(options).promise.then(() => FileViewer.open(localFile)).then(() => {
            // success
            // Here you can perform any of your completion tasks
        }).catch((error) => {
            // error
        });
    }
    viewTaskDoc = () => {
        const url = `${Config.wasabi_url}/${this.props.props.route.params.portfolio.projectTaskFileLink}`;
        // create a local file path from url
        const localFile = `${RNFS.DocumentDirectoryPath}/${this.props.props.route.params.portfolio.projectTaskFileLinkName}`;
        
        const options = {
        fromUrl: url,
        toFile: localFile,
        };

        // last step it will download open it with fileviewer.
        RNFS.downloadFile(options).promise.then(() => FileViewer.open(localFile)).then(() => {
            // success
            // Here you can perform any of your completion tasks
        }).catch((error) => {
            // error
        });
    }
    handleSubmissionAndUpload = () => {
        console.log("handleSubmissionAndUpload clicked");

        axios.post(`${Config.ngrok_url}/upload/portfolio/project`, {
            portfolio: this.props.props.route.params.portfolio,
            id: this.props.unique_id
        }).then((res) => {
            if (res.data.message === "Uploaded portfolio project!") {
                console.log(res.data); 

                this.props.addPortfolioData({});

                setTimeout(() => {
                    this.props.props.navigation.replace("public-profile-main");
                }, 1000)
            } else {
                console.log("err", res.data);
            }
        }).catch((error) => {
            console.log(error);
        })
    }
    render() {
        const menu = <Side props={this.props} />;

        console.log(this.props);

        const { relevantTags } = this.props.props.route.params.portfolio;

        const { selected } = this.state;
        return (
            <Fragment>
                <SideMenu openMenuOffset={width * 0.80} menuPosition={"right"} isOpen={this.state.menuOpen} menu={menu}>
                    <Header>
                        <Left>
                            <Button onPress={() => {
                                this.props.props.navigation.goBack();
                            }} transparent>
                            <Icon style={{ color: "black" }} name='arrow-back' />
                            </Button>
                        </Left>
                    <Body>
                        <Title>Add Porfolio Project</Title>
                        <Subtitle>Add a new project</Subtitle>
                    </Body>
                    <Right />
                    </Header>
                   
                    <TouchableOpacity onPress={() => {
                        this.setState({
                            menuOpen: !this.state.menuOpen
                        })
                    }} style={styles.bottomRightCorner}>
                        <Image source={require("../../../assets/icons/circle-menu.png")} style={styles.circleMenu} />
                    </TouchableOpacity>
                    <ScrollView contentContainerStyle={{ paddingBottom: 50 }} style={styles.container}>
                        
                        <View style={styles.margin}>
                            <View style={styles.boxed}>
                                <Text style={styles.headerText}>Title</Text>
                                
                            </View>
                            <View style={styles.bottomChunk}>
                                <Text style={styles.smallerText}>{this.props.props.route.params.portfolio.title}</Text>
                            </View>
                            <View style={{ marginTop: 25 }} />
                            <View style={styles.boxed}>
                                <Text style={styles.headerText}>Description</Text>
                              
                            </View>
                            <View style={styles.bottomChunk}>
                                <ReadMore
                                    numberOfLines={3}
                                    renderTruncatedFooter={this._renderTruncatedFooter}
                                    renderRevealedFooter={this._renderRevealedFooter}
                                    onReady={this._handleTextReady}>
                                    <Text style={styles.smallerText}>{this.props.props.route.params.portfolio.description}</Text>
                                </ReadMore>
                            </View>
                            <View style={{ marginTop: 25 }} />
                            <View style={styles.boxed}>
                                <Text style={styles.headerText}>Role</Text>
                                
                            </View>
                            <View style={styles.bottomChunk}>
                                <Text style={styles.smallerText}>{this.props.props.route.params.portfolio.rolePosition}</Text>
                            </View>
                            <View style={{ marginTop: 25 }} />
                            <View style={styles.boxed}>
                                <Text style={styles.headerText}>Project Task/Challenge</Text>
                                
                            </View>
                            <View style={styles.bottomChunk}>
                                <ReadMore
                                    numberOfLines={3}
                                    renderTruncatedFooter={this._renderTruncatedFooter}
                                    renderRevealedFooter={this._renderRevealedFooter}
                                    onReady={this._handleTextReady}>
                                    <Text style={styles.smallerText}>{this.props.props.route.params.portfolio.projectTask}</Text>
                                </ReadMore>
                            </View>
                            <View style={{ marginTop: 25 }}>
                                {this.props.props.route.params.portfolio.projectTaskFileLinkName !== null ? <TouchableOpacity onPress={() => {
                                    this.viewTaskDoc();
                                }} style={styles.projectTaskFile}>
                                    <Text style={{ color: "blue", fontWeight: "bold", fontSize: 18, padding: 10 }}>{`View ${this.props.props.route.params.portfolio.projectTaskFileLinkName} file`}</Text>
                                </TouchableOpacity> : null}
                            </View>
                            <View style={{ marginTop: 25 }} />
                            <View style={styles.boxed}>
                                <Text style={styles.headerText}>Project Solution</Text>
                                
                            </View>
                            <View style={styles.bottomChunk}>
                                <ReadMore
                                    numberOfLines={3}
                                    renderTruncatedFooter={this._renderTruncatedFooter}
                                    renderRevealedFooter={this._renderRevealedFooter}
                                    onReady={this._handleTextReady}>
                                    <Text style={styles.smallerText}>{this.props.props.route.params.portfolio.projectSolution}</Text>
                                </ReadMore>
                            </View>
                            <View style={{ marginTop: 25 }} />
                            {this.props.props.route.params.portfolio.solutionFileName !== null ? <TouchableOpacity onPress={() => {
                                this.viewSolutionDoc();
                            }} style={styles.projectTaskFile}>
                                <Text style={{ color: "blue", fontWeight: "bold", fontSize: 18, padding: 10 }}>{`View ${this.props.props.route.params.portfolio.solutionFileName} file`}</Text>
                            </TouchableOpacity> : null}
                            <View style={{ marginTop: 25 }} />
                            <View style={styles.boxed}>
                                <Text style={styles.headerText}>Format/Display Type</Text>
                                
                            </View>
                            <View style={styles.bottomChunk}>
                                <Text style={styles.smallerText}>{this.props.props.route.params.portfolio.contentDisplayType}</Text>
                            </View>
                            <View style={{ marginTop: 25 }} />
                            <View style={styles.boxed}>
                                <Text style={styles.headerText}>Relevant Tags</Text>
                              
                            </View>                           
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 35 }}>
                                {typeof relevantTags !== 'undefined' && relevantTags.length > 0 ? relevantTags.map((tag, index) => {
                                    return (
                                        <View style={styles.tagger}>
                                            <Text style={styles.tagText}>{tag.name}</Text>
                                        </View>
                                    );
                                }) : null}
                            </View>
                            <View style={{ marginTop: 25 }} />
                            {/* <View>
                                <AwesomeButtonBlue type={"secondary"} onPress={this.handleSubmissionAndUpload} stretch={true}>Submit & Continue</AwesomeButtonBlue>
                            </View> */}
                        </View>
                    </ScrollView>
                </SideMenu>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.signupData.authData.unique_id,
        portfolio: state.portfolio.portfolio
    }
}
export default connect(mapStateToProps, { addPortfolioData })(IndividualPortfolioHelper);