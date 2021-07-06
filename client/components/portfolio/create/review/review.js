import React, { Component, Fragment } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Image, ScrollView, Animated } from 'react-native';
import SideMenu from "react-native-side-menu";
import Side from "../../../navigation/sidemenu/index.js";
import styles from "./styles.js";
import { Header, Left, Body, Right, Button, Icon, Title, Subtitle, Item, Input, Textarea } from 'native-base';
import { connect } from "react-redux";
import { addPortfolioData } from "../../../../actions/portfolio/index.js";
import * as Progress from 'react-native-progress';
import ReadMore from 'react-native-read-more-text';
import FileViewer from 'react-native-file-viewer';
import Config from 'react-native-config';
import RNFS from 'react-native-fs';
import RBSheet from "react-native-raw-bottom-sheet";
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import GallerySVG from "../../../../assets/images/gallery.svg";
import CaseSVG from "../../../../assets/images/case.svg";
import ClassicSVG from "../../../../assets/images/classic.svg";
import { TagSelect } from 'react-native-tag-select';
import axios from "axios";
import _ from "lodash";

const { width, height } = Dimensions.get("window");

class ReviewPortfolioHelper extends Component {
constructor (props) {
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

        if (typeof this.props.portfolio.relevantTags !== "undefined" && this.props.portfolio.relevantTags.length > 0) {
            const { relevantTags } = this.props.portfolio;

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
    }
    viewSolutionDoc = () => {
        const url = `${Config.wasabi_url}/${this.props.portfolio.projectSolutionFileLink}`;
        // create a local file path from url
        const localFile = `${RNFS.DocumentDirectoryPath}/${this.props.portfolio.solutionFileName}`;
        
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
        const url = `${Config.wasabi_url}/${this.props.portfolio.projectTaskFileLink}`;
        // create a local file path from url
        const localFile = `${RNFS.DocumentDirectoryPath}/${this.props.portfolio.projectTaskFileLinkName}`;
        
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
            portfolio: this.props.portfolio,
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

        const { relevantTags } = this.props.portfolio;

        const { selected } = this.state;

        console.log("this.state. review review", this.state);

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
                    <Right>
                        <Button onPress={this.handleReset} transparent>
                            <Text>Restart</Text>
                        </Button>
                        </Right>
                    </Header>
                    <Progress.Bar unfilledColor={"lightgrey"} progress={1} height={4} width={width} />
                    <TouchableOpacity onPress={() => {
                        this.setState({
                            menuOpen: !this.state.menuOpen
                        })
                    }} style={styles.bottomRightCorner}>
                        <Image source={require("../../../../assets/icons/circle-menu.png")} style={styles.circleMenu} />
                    </TouchableOpacity>
                    <ScrollView contentContainerStyle={{ paddingBottom: 50 }} style={styles.container}>
                        
                        <View style={styles.margin}>
                            <View style={styles.boxed}>
                                <Text style={styles.headerText}>Title</Text>
                                <TouchableOpacity
                                    style={styles.rightIcon} onPress={() => {
                                        this.RBSheet.open();
                                    }}>
                                    <Image source={require("../../../../assets/icons/pencil.png")} style={styles.icon} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.bottomChunk}>
                                <Text style={styles.smallerText}>{this.props.portfolio.title}</Text>
                            </View>
                            <View style={{ marginTop: 25 }} />
                            <View style={styles.boxed}>
                                <Text style={styles.headerText}>Description</Text>
                                <TouchableOpacity
                                    style={styles.rightIcon} onPress={() => {
                                        this.RBSheetDescription.open();
                                    }}>
                                    <Image source={require("../../../../assets/icons/pencil.png")} style={styles.icon} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.bottomChunk}>
                                <ReadMore
                                    numberOfLines={3}
                                    renderTruncatedFooter={this._renderTruncatedFooter}
                                    renderRevealedFooter={this._renderRevealedFooter}
                                    onReady={this._handleTextReady}>
                                    <Text style={styles.smallerText}>{this.props.portfolio.description}</Text>
                                </ReadMore>
                            </View>
                            <View style={{ marginTop: 25 }} />
                            <View style={styles.boxed}>
                                <Text style={styles.headerText}>Role</Text>
                                <TouchableOpacity
                                    style={styles.rightIcon} onPress={() => {
                                        this.RBSheetRole.open();
                                    }}>
                                    <Image source={require("../../../../assets/icons/pencil.png")} style={styles.icon} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.bottomChunk}>
                                <Text style={styles.smallerText}>{this.props.portfolio.rolePosition}</Text>
                            </View>
                            <View style={{ marginTop: 25 }} />
                            <View style={styles.boxed}>
                                <Text style={styles.headerText}>Project Task/Challenge</Text>
                                <TouchableOpacity
                                    style={styles.rightIcon} onPress={() => {
                                        this.RBSheetChallenge.open();
                                    }}>
                                    <Image source={require("../../../../assets/icons/pencil.png")} style={styles.icon} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.bottomChunk}>
                                <ReadMore
                                    numberOfLines={3}
                                    renderTruncatedFooter={this._renderTruncatedFooter}
                                    renderRevealedFooter={this._renderRevealedFooter}
                                    onReady={this._handleTextReady}>
                                    <Text style={styles.smallerText}>{this.props.portfolio.projectTask}</Text>
                                </ReadMore>
                            </View>
                            <View style={{ marginTop: 25 }}>
                                {_.has(this.props.portfolio, "solutionFileName") ? <TouchableOpacity onPress={() => {
                                    this.viewTaskDoc();
                                }} style={styles.projectTaskFile}>
                                    <Text style={{ color: "blue", fontWeight: "bold", fontSize: 18 }}>{`View ${this.props.portfolio.projectTaskFileLinkName} file`}</Text>
                                </TouchableOpacity> : null}
                            </View>
                            <View style={{ marginTop: 25 }} />
                            <View style={styles.boxed}>
                                <Text style={styles.headerText}>Project Solution</Text>
                                <TouchableOpacity
                                    style={styles.rightIcon} onPress={() => {
                                        this.RBSheetProjectSolution.open();
                                    }}>
                                    <Image source={require("../../../../assets/icons/pencil.png")} style={styles.icon} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.bottomChunk}>
                                <ReadMore
                                    numberOfLines={3}
                                    renderTruncatedFooter={this._renderTruncatedFooter}
                                    renderRevealedFooter={this._renderRevealedFooter}
                                    onReady={this._handleTextReady}>
                                    <Text style={styles.smallerText}>{this.props.portfolio.projectSolution}</Text>
                                </ReadMore>
                            </View>
                            <View style={{ marginTop: 25 }} />
                            {_.has(this.props.portfolio, "solutionFileName") ? <TouchableOpacity onPress={() => {
                                this.viewSolutionDoc();
                            }} style={styles.projectTaskFile}>
                                <Text style={{ color: "blue", fontWeight: "bold", fontSize: 18 }}>{`View ${this.props.portfolio.solutionFileName} file`}</Text>
                            </TouchableOpacity> : null}
                            <View style={{ marginTop: 25 }} />
                            <View style={styles.boxed}>
                                <Text style={styles.headerText}>Format/Display Type</Text>
                                <TouchableOpacity
                                    style={styles.rightIcon} onPress={() => {
                                        this.RBSheetDisplayType.open();
                                    }}>
                                    <Image source={require("../../../../assets/icons/pencil.png")} style={styles.icon} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.bottomChunk}>
                                <Text style={styles.smallerText}>{this.props.portfolio.contentDisplayType}</Text>
                            </View>
                            <View style={{ marginTop: 25 }} />
                            <View style={styles.boxed}>
                                <Text style={styles.headerText}>Relevant Tags</Text>
                                <TouchableOpacity
                                style={styles.rightIcon} onPress={() => {
                                    this.RBSheetTags.open();
                                }}>
                                <Image source={require("../../../../assets/icons/pencil.png")} style={styles.icon} />
                            </TouchableOpacity>
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
                            <View>
                                <AwesomeButtonBlue type={"secondary"} onPress={this.handleSubmissionAndUpload} stretch={true}>Submit & Continue</AwesomeButtonBlue>
                            </View>
                        </View>
                    </ScrollView>
                    <RBSheet    
                        animation={new Animated.Value(0)}
                        ref={ref => {
                            this.RBSheet = ref;
                        }}
                        height={height * 0.65}
                        openDuration={250}
                        closeOnDragDown={true}
                        closeOnPressMask={false}
                        customStyles={{
                            container: {
                             
                            }, 
                            draggableIcon: {
                                backgroundColor: "black",
                                width: 150
                            }
                        }}
                        >
                            <View style={[styles.margin, { position: "absolute", bottom: 10, width: "90%" }]}>
                                <Text style={[styles.headerText, { marginBottom: 15 }]}>Title</Text>
                                <Item style={styles.item} regular>
                                    <Input placeholder={this.props.portfolio.title} value={this.state.placeholder} onChangeText={(value) => {
                                        this.setState({
                                            placeholder: value
                                        })
                                    }} />
                                </Item>
                                <View style={{ marginTop: 20 }} />
                                <AwesomeButtonBlue type={"secondary"} onPress={() => {
                                    this.props.addPortfolioData({
                                        ...this.props.portfolio,
                                        title: this.state.placeholder
                                    })

                                    setTimeout(() => {
                                        this.setState({
                                            placeholder: ""
                                        }, () => {
                                            this.RBSheet.close();
                                        })
                                    }, 1000);
                                }} stretch={true}>Submit & Change</AwesomeButtonBlue>
                                
                            </View>
                            <TouchableOpacity onPress={() => {
                                this.RBSheet.close();
                            }} style={styles.bottomClose}>
                                <Image source={require("../../../../assets/icons/close.png")} style={{ maxWidth: 45, maxHeight: 45 }} />
                            </TouchableOpacity>
                    </RBSheet>
                    <RBSheet    
                        animation={new Animated.Value(0)}
                        ref={ref => {
                            this.RBSheetDescription = ref;
                        }}
                        height={height * 0.65}
                        openDuration={250}
                        closeOnDragDown={true}
                        closeOnPressMask={false}
                        customStyles={{
                            container: {
                             
                            }, 
                            draggableIcon: {
                                backgroundColor: "black",
                                width: 150
                            }
                        }}
                        >
                            <View style={[styles.margin, { position: "absolute", bottom: 10, width: "90%" }]}>
                                <Text style={[styles.headerText, { marginBottom: 15 }]}>Description</Text>
                                <Textarea rowSpan={5} bordered placeholder={this.props.portfolio.description} value={this.state.placeholder} onChangeText={(value) => {
                                    this.setState({
                                        placeholder: value
                                    })
                                }} />
                                <View style={{ marginTop: 20 }} />
                                <AwesomeButtonBlue type={"secondary"} onPress={() => {
                                    this.props.addPortfolioData({
                                        ...this.props.portfolio,
                                        description: this.state.placeholder
                                    })

                                    setTimeout(() => {
                                        this.setState({
                                            placeholder: ""
                                        }, () => {
                                            this.RBSheetDescription.close();
                                        })
                                    }, 1000);
                                }} stretch={true}>Submit & Change</AwesomeButtonBlue>
                                
                            </View>
                            <TouchableOpacity onPress={() => {
                                this.RBSheetDescription.close();
                            }} style={styles.bottomClose}>
                                <Image source={require("../../../../assets/icons/close.png")} style={{ maxWidth: 45, maxHeight: 45 }} />
                            </TouchableOpacity>
                    </RBSheet>
                    <RBSheet    
                        animation={new Animated.Value(0)}
                        ref={ref => {
                            this.RBSheetRole = ref;
                        }}
                        height={height * 0.65}
                        openDuration={250}
                        closeOnDragDown={true}
                        closeOnPressMask={false}
                        customStyles={{
                            container: {
                             
                            }, 
                            draggableIcon: {
                                backgroundColor: "black",
                                width: 150
                            }
                        }}
                        >
                            <View style={[styles.margin, { position: "absolute", bottom: 10, width: "90%" }]}>
                                <Text style={[styles.headerText, { marginBottom: 15 }]}>Role/Position</Text>
                                <Item style={styles.item} regular>
                                    <Input placeholder={this.props.portfolio.rolePosition} value={this.state.placeholder} onChangeText={(value) => {
                                        this.setState({
                                            placeholder: value
                                        })
                                    }} />
                                </Item>
                                <View style={{ marginTop: 20 }} />
                                <AwesomeButtonBlue type={"secondary"} onPress={() => {
                                    this.props.addPortfolioData({
                                        ...this.props.portfolio,
                                        rolePosition: this.state.placeholder
                                    })

                                    setTimeout(() => {
                                        this.setState({
                                            placeholder: ""
                                        }, () => {
                                            this.RBSheetRole.close();
                                        })
                                    }, 1000);
                                }} stretch={true}>Submit & Change</AwesomeButtonBlue>
                                
                            </View>
                            <TouchableOpacity onPress={() => {
                                this.RBSheetRole.close();
                            }} style={styles.bottomClose}>
                                <Image source={require("../../../../assets/icons/close.png")} style={{ maxWidth: 45, maxHeight: 45 }} />
                            </TouchableOpacity>
                    </RBSheet>
                    <RBSheet    
                        animation={new Animated.Value(0)}
                        ref={ref => {
                            this.RBSheetChallenge = ref;
                        }}
                        height={height * 0.65}
                        openDuration={250}
                        closeOnDragDown={true}
                        closeOnPressMask={false}
                        customStyles={{
                            container: {
                             
                            }, 
                            draggableIcon: {
                                backgroundColor: "black",
                                width: 150
                            }
                        }}
                        >
                            <View style={[styles.margin, { position: "absolute", bottom: 10, width: "90%" }]}>
                                <Text style={[styles.headerText, { marginBottom: 15 }]}>Role/Position</Text>
                                <Textarea rowSpan={5} bordered placeholder={this.props.portfolio.projectTask} value={this.state.placeholder} onChangeText={(value) => {
                                    this.setState({
                                        placeholder: value
                                    })
                                }} />
                                <View style={{ marginTop: 20 }} />
                                <AwesomeButtonBlue type={"secondary"} onPress={() => {
                                    this.props.addPortfolioData({
                                        ...this.props.portfolio,
                                        projectTask: this.state.placeholder
                                    })

                                    setTimeout(() => {
                                        this.setState({
                                            placeholder: ""
                                        }, () => {
                                            this.RBSheetChallenge.close();
                                        })
                                    }, 1000);
                                }} stretch={true}>Submit & Change</AwesomeButtonBlue>
                                
                            </View>
                            <TouchableOpacity onPress={() => {
                                this.RBSheetChallenge.close();
                            }} style={styles.bottomClose}>
                                <Image source={require("../../../../assets/icons/close.png")} style={{ maxWidth: 45, maxHeight: 45 }} />
                            </TouchableOpacity>
                    </RBSheet>
                    <RBSheet    
                        animation={new Animated.Value(0)}
                        ref={ref => {
                            this.RBSheetProjectSolution = ref;
                        }}
                        height={height * 0.65}
                        openDuration={250}
                        closeOnDragDown={true}
                        closeOnPressMask={false}
                        customStyles={{
                            container: {
                             
                            }, 
                            draggableIcon: {
                                backgroundColor: "black",
                                width: 150
                            }
                        }}
                        >
                            <View style={[styles.margin, { position: "absolute", bottom: 10, width: "90%" }]}>
                                <Text style={[styles.headerText, { marginBottom: 15 }]}>Project Solution</Text>
                                <Textarea rowSpan={5} bordered placeholder={this.props.portfolio.projectSolution} value={this.state.placeholder} onChangeText={(value) => {
                                    this.setState({
                                        placeholder: value
                                    })
                                }} />
                                <View style={{ marginTop: 20 }} />
                                <AwesomeButtonBlue type={"secondary"} onPress={() => {
                                    this.props.addPortfolioData({
                                        ...this.props.portfolio,
                                        projectSolution: this.state.placeholder
                                    })

                                    setTimeout(() => {
                                        this.setState({
                                            placeholder: ""
                                        }, () => {
                                            this.RBSheetProjectSolution.close();
                                        })
                                    }, 1000);
                                }} stretch={true}>Submit & Change</AwesomeButtonBlue>
                                
                            </View>
                            <TouchableOpacity onPress={() => {
                                this.RBSheetProjectSolution.close();
                            }} style={styles.bottomClose}>
                                <Image source={require("../../../../assets/icons/close.png")} style={{ maxWidth: 45, maxHeight: 45 }} />
                            </TouchableOpacity>
                    </RBSheet>
                    <RBSheet    
                        animation={new Animated.Value(0)}
                        ref={ref => {
                            this.RBSheetDisplayType = ref;
                        }}
                        height={height}
                        openDuration={250}
                        closeOnDragDown={false}
                        closeOnPressMask={false}
                        customStyles={{
                            container: {
                             
                            }, 
                            draggableIcon: {
                                backgroundColor: "black",
                                width: 150
                            }
                        }}
                        >
                            <View style={styles.margin}>
                                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50, justifyContent: "center", alignItems: "center" }} style={styles.otherContainer}>
                                    <Text style={{ marginTop: 75 }}>Choose how you want this project to be displayed to clients. You can always switch this template at a later date or change it even after you publish.</Text>
                                    <View style={{ marginTop: 10, marginBottom: 10 }} />
                                    <TouchableOpacity onPress={() => {
                                        this.setState({
                                            selected: "gallery"
                                        })
                                    }} style={selected === "gallery" ? styles.selected : styles.boxedScroll}>
                                        <Text style={styles.bold}>Display images or videos, one at a time.</Text>
                                        <GallerySVG width={200} height={200} />
                                    </TouchableOpacity>
                                    {selected === "gallery" ? <Text style={{ marginTop: 15, fontSize: 15, color: "darkblue" }}>Showcase the work you did on this portfolio project with a description underneath a carousel of images and videos</Text> : null}
                                    <View style={styles.thickHr} />
                                    <TouchableOpacity onPress={() => {
                                        this.setState({
                                            selected: "classic"
                                        })
                                    }} style={selected === "classic" ? styles.selected : styles.boxedScroll}>
                                        <Text style={styles.bold}>Highlight the project {"\n"} problem and your solution.</Text>
                                        <ClassicSVG width={200} height={200} />
                                    </TouchableOpacity>
                                    {selected === "classic" ? <Text style={{ marginTop: 15, fontSize: 15, color: "darkblue" }}>Tell a story about your project by framing the problem you set out to solve and the solution you came up with. Only images and videos can be uploaded.</Text> : null}
                                    <View style={styles.thickHr} />
                                    <TouchableOpacity onPress={() => {
                                        this.setState({
                                            selected: "case"
                                        })
                                    }} style={selected === "case" ? styles.selected : styles.boxedScroll}>
                                        <Text style={styles.bold}>Allow clients to scroll through your work.</Text>
                                        <CaseSVG width={200} height={200} />
                                    </TouchableOpacity>
                                    {selected === "case" ? <Text style={{ marginTop: 15, fontSize: 15, color: "darkblue" }}>Highlight the work you did on this portfolio project with a scrollable classic template. You should also choose this option if you are adding files besides videos or images, such as documents or spreadsheets.</Text> : null}

                                    <View style={{ marginTop: 20 }} />
                                    <AwesomeButtonBlue type={"secondary"} onPress={() => {
                                        this.props.addPortfolioData({
                                            ...this.props.portfolio,
                                            contentDisplayType: this.state.selected
                                        })

                                        setTimeout(() => {
                                            this.setState({
                                                placeholder: "",
                                                selected: null
                                            }, () => {
                                                this.RBSheetDisplayType.close();
                                            })
                                        }, 1000);
                                    }} stretch={true}>Submit & Change</AwesomeButtonBlue>
                                </ScrollView>                                
                            </View>
                            <TouchableOpacity onPress={() => {
                                this.RBSheetDisplayType.close();
                            }} style={styles.bottomClosecustom}>
                                <Image source={require("../../../../assets/icons/close.png")} style={{ maxWidth: 45, maxHeight: 45 }} />
                            </TouchableOpacity>
                    </RBSheet>
                    <RBSheet    
                        animation={new Animated.Value(0)}
                        ref={ref => {
                            this.RBSheetTags = ref;
                        }}
                        height={height}
                        openDuration={250}
                        closeOnDragDown={true}
                        closeOnPressMask={false}
                        customStyles={{
                            container: {
                             
                            }, 
                            draggableIcon: {
                                backgroundColor: "black",
                                width: 150
                            }
                        }}
                        >
                            <View style={[styles.margin, { position: "absolute", bottom: 10, width: "90%" }]}>
                                <Text style={[styles.headerText, { marginBottom: 15 }]}>Relevant Tags</Text>
                                <TagSelect 
                                    value={this.state.myTags}
                                    data={this.state.tags}
                                    ref={(tag) => {
                                        this.tag = tag;
                                    }}
                                    onMaxError={() => {
                                        
                                    }}
                                    onItemPress={(item) => {
                                        if (this.state.myTags.includes(item)) {
                                            this.setState({
                                                myTags: this.state.myTags.filter((tag, index) => {
                                                    if (tag.label !== item.label) {
                                                        return tag;
                                                    }
                                                })
                                            })
                                        } else {
                                            this.setState({
                                                myTags: [...this.state.myTags, item]
                                            })
                                        }
                                    }}
                                />
                                <View style={{ marginTop: 20 }} />
                                <AwesomeButtonBlue type={"secondary"} onPress={() => {
                                    this.props.addPortfolioData({
                                        ...this.props.portfolio,
                                        relevantTags: this.state.myTags
                                    })

                                    setTimeout(() => {
                                        this.setState({
                                            placeholder: ""
                                        }, () => {
                                            this.RBSheetTags.close();
                                        })
                                    }, 1000);
                                }} stretch={true}>Submit & Change</AwesomeButtonBlue>
                                
                            </View>
                            <TouchableOpacity onPress={() => {
                                this.RBSheetTags.close();
                            }} style={styles.bottomClosecustom}>
                                <Image source={require("../../../../assets/icons/close.png")} style={{ maxWidth: 45, maxHeight: 45 }} />
                            </TouchableOpacity>
                    </RBSheet>
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
export default connect(mapStateToProps, { addPortfolioData })(ReviewPortfolioHelper);