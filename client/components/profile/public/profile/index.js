import React, { Component, Fragment } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity, 
    Dimensions,
    ImageBackground,
    FlatList, 
    ScrollView,
    Platform
} from 'react-native';
import styles from './styles.js';
import SearchBar from 'react-native-search-bar';
import LottieView from 'lottie-react-native';
import RBSheet from "react-native-raw-bottom-sheet";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { connect } from 'react-redux';
import Config from "react-native-config";
import Spinner from 'react-native-loading-spinner-overlay';
import _ from 'lodash';
import { Card, CardItem, Thumbnail, Text as NativeText, Button, Icon, Left, Body, Right, Header, Title, Subtitle, FooterTab, Footer } from 'native-base';
import AwesomeButtonCartman from 'react-native-really-awesome-button/src/themes/cartman';
import ReadMore from 'react-native-read-more-text';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Video from 'react-native-video';
import RNFetchBlob from "rn-fetch-blob";
import Toast from 'react-native-toast-message';
import SideMenu from "react-native-side-menu";
import Side from "../../../navigation/sidemenu/index.js";
import Tags from "react-native-tags";
import Dialog from "react-native-dialog";
import EducationSlideUpPaneHelper from "./slideUpPanes/education/index.js";
import uuid from "react-native-uuid";
import ImagePicker from 'react-native-image-crop-picker';
import * as RNFS from "react-native-fs";


const { height, width } = Dimensions.get("window");

class PublicProfileHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        data: [],
        friends: [],
        spinner: false,
        coverPhoto: "",
        portfolio: null,
        user: null,
        spinnerTwo: false,
        profilePic: null,
        showDialog: false,
        skills: [],
        ready: false,
        uploadPercentage: 0,
        menuOpen: false,
        deletePortfolioItemDialog: false
    }

    this.EducationRBSheet = React.createRef();
}
    renderImage = () => {
        const { coverPhoto } = this.state;

        if (typeof coverPhoto !== "undefined" && coverPhoto.length > 0) {
            return { uri: coverPhoto };
        } else {
            return require("../../../../assets/images/cover.jpg");
        }
    }
    uploadPhoto = () => {
        console.log("uploadPhoto clicked");

        this.RBSheet.close();

        setTimeout(() => {
            launchImageLibrary({
                includeBase64: true,
                quality: 1,
                storageOptions: {
                    cameraRoll: true,
                    waitUntilSaved: true,
                },
                mediaType: "photo"
            }, this.uploadPhotoCallback)
        },  750);
    }
    uploadVideo = () => {
        console.log("uploadVideo clicked");

        this.RBSheetThree.close();

        if (Platform.OS === "ios") {
            setTimeout(() => {
                launchImageLibrary({
                    quality: 1,
                    mediaType: "video",
                    videoQuality: "medium",
                    durationLimit: 7,
                    path: "video"
                }, this.uploadPhotoCallbackCustom)
            },  750);
        } else {
            ImagePicker.openPicker({
                mediaType: "video",
            }).then((video) => {
                console.log(video);

                const formData = new FormData();

                formData.append("video", { uri: video.path, name: uuid.v4() + ".mp4", type: video.mime });
                formData.append("unique_id", this.props.unique_id);

                axios({
                    method: "post",
                    url: `${Config.ngrok_url}/upload/profile/pic/video/android`,
                    data: formData,
                    headers: { 
                        "Content-Type": "multipart/form-data" 
                    },
                    onUploadProgress: progress => {
                        const { total, loaded } = progress;
                        const totalSizeInMB = total / 1000000;
                        const loadedSizeInMB = loaded / 1000000;
                        const uploadPercentage = (loadedSizeInMB / totalSizeInMB);
                        
                        this.setState({
                            uploadPercentage: uploadPercentage.toFixed(2)
                        })
                        console.log("total size in MB ==> ", totalSizeInMB);
                        console.log("uploaded size in MB ==> ", loadedSizeInMB);
                    }
                }).then((res) => {
                    if (res.data.message === "Uploaded video!") {
                        console.log(res.data);
    
                        const { profilePic } = res.data;
    
                        this.setState({
                            spinner: false,
                            profilePic
                        })
                    } else {
                        console.log("Err", res.data);
    
                        this.setState({
                            spinner: false
                        })
                    }
                }).catch((err) => {
                        
                    if (err.response.status === 413) {

                        console.log("Request failed with status 413!");

                        this.setState({
                            spinner: false
                        }, () => {
                            setTimeout(() => {
                                Toast.show({
                                    text1: 'VIDEO IS TOO LARGE!',
                                    text2: 'Video is too large in size or length - trim the video and try again.',
                                    visibilityTime: 4500,
                                    position: "top",
                                    type: "error"
                                });
                            }, 750)
                        })
                    } else {
                        this.setState({
                            spinner: false
                        })
                    }
                })
            }).catch((err) => {
                console.log(err.message);
            });
        }
    }
    uploadPhotoCallbackCustom = async (data) => {
        console.log("my data custom callback:", data);

        if (!_.has(data, "didCancel")) {
            // do logic here...

            let imagePath = null;

            if (Platform.OS === "ios") {
                this.setState({
                    spinner: true
                }, () => {
                    RNFetchBlob.config({
                        fileCache: true
                    }).fetch("GET", data.uri)
                    // the image is now dowloaded to device's storage
                    .then(resp => {
                        // the image path you can use it directly with Image component
                        console.log("resp:", resp);
        
                        imagePath = resp.path();
                        return resp.readFile("base64");
                    })
                    .then(base64Data => {
                        // here's base64 encoded image
                        console.log(base64Data);
        
                        axios.post(`${Config.ngrok_url}/upload/profile/pic/video`, {
                            base64: base64Data,
                            unique_id: this.props.unique_id
                        }).then((res) => {
                            if (res.data.message === "Uploaded video!") {
                                console.log(res.data);
            
                                const { profilePic } = res.data;
            
                                this.setState({
                                    spinner: false,
                                    profilePic
                                })
                            } else {
                                console.log("Err", res.data);
            
                                this.setState({
                                    spinner: false
                                })
                            }
                        }).catch((err) => {
                            
                            if (err.response.status === 413) {

                                console.log("Request failed with status 413!");

                                this.setState({
                                    spinner: false
                                }, () => {
                                    setTimeout(() => {
                                        Toast.show({
                                            text1: 'VIDEO IS TOO LARGE!',
                                            text2: 'Video is too large in size or length - trim the video and try again.',
                                            visibilityTime: 4500,
                                            position: "top",
                                            type: "error"
                                        });
                                    }, 750)
                                })
                            } else {
                                this.setState({
                                    spinner: false
                                })
                            }
                        })
                    });
                })
            } 
        }
    }
    _renderTruncatedFooter = (handlePress) => {
        return (
          <Text style={{color: "blue", marginTop: 10, fontWeight: "bold" }} onPress={handlePress}>
            Read more
          </Text>
        );
    }
     
    _renderRevealedFooter = (handlePress) => {
        return (
          <Text style={{color: "blue", marginTop: 10, fontWeight: "bold" }} onPress={handlePress}>
            Show less
          </Text>
        );
    }
    uploadPhotoCallback = (data) => {
        console.log("callback data", data, this.props.unique_id);

        if (_.has(data, "base64")) {
            this.setState({
                spinner: true
            }, () => {
                axios.post(`${Config.ngrok_url}/upload/cover/photo`, {
                    base64: data.base64,
                    unique_id: this.props.unique_id
                }).then((res) => {
                    if (res.data.message === "Uploaded!") {
                        console.log(res.data);
    
                        const { generatedID } = res.data;
    
                        this.setState({
                            spinner: false,
                            coverPhoto: `${Config.wasabi_url}/${generatedID}`
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
        }
    }
    componentDidMount() {
        const url = `${Config.ngrok_url}/gather/user`;
        
        axios.get(url, {
            params: {
                id: this.props.unique_id
            }
        }).then((res) => {
            console.log(res.data);

            const { user } = res.data;

            if (user.coverPhotos) {
                this.setState({
                    user,
                    coverPhoto: `${Config.wasabi_url}/${user.coverPhotos[user.coverPhotos.length - 1].picture}`,
                    ready: true,
                    profilePic: _.has(user, "profilePics") && user.profilePics.length > 0 ? user.profilePics[user.profilePics.length - 1] : null,
                    skills: typeof user.skills !== 'undefined' && user.skills.length > 0 ? user.skills : []
                })
            } else {
                this.setState({
                    user,
                    ready: true,
                    profilePic: _.has(user, "profilePics") && user.profilePics.length > 0 ? user.profilePics[user.profilePics.length - 1] : null,
                    skills: typeof user.skills !== 'undefined' && user.skills.length > 0 ? user.skills : []
                })
            }
        }).catch((err) => {
            console.log(err);
        })

        axios.get(`${Config.ngrok_url}/gather/pics/friends`, {
            params: {
                id: this.props.unique_id
            }
        }).then((res) => {
            if (res.data.message === "Could NOT locate any information...") {
                console.log("ERR:", res.data);
            } else if (res.data.message === "Gathered profile pics!") {

                const { passed } = res.data;

                console.log("Success!:", res.data, passed);

                this.setState({
                    friends: passed
                })
            } else {
                console.log("Unknown err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    handleRecordVideoRedirect = () => {
        this.RBSheetThree.close();

        setTimeout(() => {
            this.props.props.navigation.push("record-profile-picture-video");
        }, 750)
    }
    renderPicture = () => {
        const { profilePic, user } = this.state;

        if (user !== null && profilePic !== null) {
            return <Image style={[styles.avatar, { top: -135 }]} source={{ uri: `${Config.wasabi_url}/${profilePic.picture}` }}/>;
        } else if (user.photo) {
            return <Image style={[styles.avatar, { top: -135 }]} source={{ uri: user.photo }}/>;
        } else {
            return <Image style={[styles.avatar, { top: -135 }]} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }}/>;
        }
    }
    renderProfilePictureVideo = () => {
        const { profilePic, user } = this.state;

        if (profilePic !== null) {
            if (profilePic.type !== "video") {
                console.log("first chunk ran");
                return (
                    <Fragment>
                        {this.renderPicture()}
                    </Fragment>
                );
            } else {
                console.log(`${Config.wasabi_url}/${profilePic.picture}`);
                return (
                    <Fragment>
                        <Video  
                            resizeMode="cover"
                            repeat
                            source={{uri: `${Config.wasabi_url}/${profilePic.picture}` }}   // Can be a URL or a local file.
                            autoplay={true}
                            ref={(ref) => {
                                this.player = ref
                            }}
                            muted={true}
                            style={[styles.avatar, { top: -135 }]}
                        />
                    </Fragment>
                );
            }
        } else {
            return (
                <Fragment>
                    {this.renderPicture()}
                </Fragment>
            );
        }
    }
    renderCustomContent = (item) => {
        if (item.solutionFileName.includes(".png")) {
            return <Image style={styles.customImage} source={{ uri: `${Config.wasabi_url}/${item.projectSolutionFileLink}` }} />;
        } else if (item.solutionFileName.includes(".jpg")) {
            return <Image style={styles.customImage} source={{ uri: `${Config.wasabi_url}/${item.projectSolutionFileLink}` }} />;
        } else if (item.solutionFileName.includes(".jpeg")) {
            return <Image style={styles.customImage} source={{ uri: `${Config.wasabi_url}/${item.projectSolutionFileLink}` }} />;
        } else if (item.solutionFileName.includes(".docx")) {
            return <Image style={styles.customImage} source={require("../../../../assets/icons/docx.jpeg")} />;
        } else if (item.solutionFileName.includes(".xlsx")) {
            return <Image style={styles.customImage} source={require("../../../../assets/icons/excel.png")} />;
        } else if (item.solutionFileName.includes(".xls")) {
            return <Image style={styles.customImage} source={require("../../../../assets/icons/excel.png")} />;
        }
    }
    calculateRedirect = () => {
        if (_.has(this.props.portfolio, "page")) {
            if (this.props.portfolio.page === 1) {
                this.props.props.navigation.push("add-portfolio-project");   
            } else if (this.props.portfolio.page === 2) {
                this.props.props.navigation.push("employment-create-display-format");
            } else if (this.props.portfolio.page === 3) {
                this.props.props.navigation.push("portfolio-project-more-info");
            } else if (this.props.portfolio.page === 4) {
                this.props.props.navigation.push("review-portfolio-project");
            }
         } else {
            console.log("else ran");
            this.props.props.navigation.push("add-portfolio-project");
        }
    }
    redirectToUsersProfile = (user) => {
        console.log("user", user);

        this.props.props.navigation.push("individual-profile-public", { item: { unique_id: user.acquaintanceID }});
    }
    deletePortfolioItem = () => {
        axios.put(`${Config.ngrok_url}/delete/portfolio/item`, {
            item: this.state.portfolio,
            id: this.props.unique_id
        }).then((res) => {
            if (res.data.message === "Deleted!") {
                console.log(res.data);

                const { user } = res.data;

                this.setState({
                    user,
                    deletePortfolioItemDialog: false
                })
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    redirectToUsersProfileWithoutPane = () => {
        this.props.props.navigation.push("individual-profile-public", { item: { unique_id: this.props.unique_id }});
    }
    renderHeaderMainContent = () => {
        const { ready, portfolio, user, skills, friends } = this.state;

        if (ready === true) {
            return (
            <Fragment>
                <View style={styles.container}>
                <ImageBackground source={this.renderImage()} style={styles.header}>
                            
                </ImageBackground>
                <TouchableOpacity style={styles.avatar} onPress={() => {
                    this.RBSheetThree.open();
                }}>
                    {this.renderProfilePictureVideo()}
                </TouchableOpacity>
                <View style={styles.body}>
                    <TouchableOpacity style={styles.touchable} onPress={() => {
                        this.RBSheet.open();
                    }}>
                        <LottieView source={require('../../../../assets/animations/camera.json')} autoPlay loop style={styles.animated}  />
                    </TouchableOpacity>
                    <View style={styles.bodyContent}>
                    <TouchableOpacity onPress={() => {}} style={styles.rankContainer}>
                        <Text style={styles.headerText}>Rank #15</Text>
                    </TouchableOpacity>
                    <Text style={styles.name}>{this.props.fullName}</Text>
                    <Text style={styles.info}>$20 Minimum Hourly Charge</Text>
                    <Text style={styles.description}>Bio - Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum electram expetendis, omittam deseruisse consequuntur ius an,</Text>
                    <View style={{ marginTop: 10, width: "100%", margin: 20 }}>
                        <AwesomeButtonCartman textColor={"white"} type={"anchor"} onPress={() => {
                            this.redirectToUsersProfileWithoutPane();
                        }} stretch={true}>View public profile/live view</AwesomeButtonCartman>
                    </View> 
                    <View style={styles.thickHr} />
                    <View style={styles.row}>
                        <View style={styles.leftAlign}>
                            <Text style={styles.viewText}>Profile Actions</Text>
                            <TouchableOpacity onPress={() => {}} style={styles.plusIconContainer}>
                                <Image source={require("../../../../assets/icons/plus.png")} style={styles.plusIcon} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {}} style={styles.plusIconContainer}>
                                <Image source={require("../../../../assets/icons/write.png")} style={styles.plusIcon} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {}} style={styles.plusIconContainer}>
                                <Image source={require("../../../../assets/icons/info.png")} style={styles.plusIcon} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {}} style={styles.plusIconContainer}>
                                <Image source={require("../../../../assets/icons/port.png")} style={styles.plusIcon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.thickHr} />
                    <View style={styles.friendsListContainer}>
                        <View style={{ flexDirection: "row", width: "100%", margin: 15 }}>
                            <View style={styles.friendsTextContainer}>
                                <Text style={styles.headerText}>Friends</Text>
                                <Text style={{ color: "grey" }}>788 friends</Text>
                            </View>
                            <View style={{ position: "absolute", right: 20, top: 0 }}>
                                <Text style={{ color: "blue" }}>Find Friends</Text>
                            </View>
                        </View>
                        <FlatList 
                            style={styles.list}
                            contentContainerStyle={styles.listContainer}
                            data={friends}
                            horizontal={false}
                            numColumns={3}
                            keyExtractor= {(item) => {
                                return item.id;
                            }}
                            ItemSeparatorComponent={() => {
                                return (
                                <View style={styles.separator}/>
                                )
                            }}
                            renderItem={(post) => {
                                const item = post.item;

                                console.log("POST", item);
                                return (
                                    <TouchableOpacity onPress={() => {
                                        this.redirectToUsersProfile(item);
                                    }} style={styles.card}>
                                        <View style={styles.imageContainer}>
                                            {item.type === "video" ? <Video  
                                                resizeMode="cover"
                                                repeat
                                                source={{uri: item.photo }}   // Can be a URL or a local file.
                                                autoplay={true}
                                                ref={(ref) => {
                                                    this.player = ref
                                                }}
                                                muted={true}
                                                style={styles.cardImage}
                                            /> : <Image style={styles.cardImage} source={{uri: item.photo }}/>}
                                        </View>
                                        <View style={styles.cardContent}>
                                            <Text style={styles.title}>{item.acquaintance}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }}/>
                    </View>
                    <View style={styles.thickHr} />
                    <View style={styles.row}>
                        <Text style={styles.viewText}>Portfolio ({_.has(this.state.user, 'portfolioProjects') ? this.state.user.portfolioProjects.length : 0})</Text>
                        <TouchableOpacity onPress={this.calculateRedirect} style={styles.plus}>
                            <Image source={require("../../../../assets/icons/plus.png")} style={styles.plus} />
                        </TouchableOpacity>
                    </View>
                    <FlatList 
                        style={{ width: width * 0.95 }}
                        data={this.state.user.portfolioProjects}
                        numColumns={2}
                        keyExtractor={(item, index) => item.id}
                        renderItem={({ item, index }) => {
                            console.log(item);
                            return (
                                <TouchableOpacity onPress={() => {
                                    this.props.props.navigation.navigate("portfolio-item-individual", { portfolio: item });
                                }} style={styles.touchableSpace}>
                                    <Card style={{ width: width * 0.475, minHeight: 350 }}>
                                        <CardItem>
                                        <Left>
                                            <Body>
                                                <NativeText>{item.title.slice(0, 50)}{typeof item.title !== "undefined" && item.title.length >= 50 ? "..." : ""}</NativeText>
                                                <NativeText note>{item.date}</NativeText>
                                            </Body>
                                        </Left>
                                        </CardItem>
                                        <CardItem>
                                        <Body>
                                            {this.renderCustomContent(item)}
                                        </Body>
                                        </CardItem>
                                        <CardItem>
                                        <Left>
                                            <Button transparent textStyle={{color: '#87838B'}}>
                                                <Image source={require("../../../../assets/icons/write.png")} style={{ height: 30, width: 30 }}/>
                                            </Button>
                                        </Left>
                                        <Right>
                                            <Button onPress={() => {
                                                this.setState({
                                                    deletePortfolioItemDialog: true,
                                                    portfolio: item
                                                })
                                            }} transparent textStyle={{color: '#87838B'}}>
                                                <Image source={require("../../../../assets/icons/trash-small.png")} style={{ height: 25, width: 25 }}/>
                                            </Button>
                                        </Right>
                                        </CardItem>
                                    </Card>
                                </TouchableOpacity>
                            );
                        }}
                    />
                    <TouchableOpacity onPress={() => {}} style={styles.seemoreBox}>
                        <Text style={styles.innerSeemoreBox}>See More Projects</Text>
                    </TouchableOpacity>
                    <View style={styles.thickHr} />
                    <View style={styles.row}>
                        <Text style={styles.viewText}>Skills</Text>
                        <TouchableOpacity onPress={() => {
                            this.RBSheetFour.open();
                        }} style={styles.plusOutside}>
                            <Image source={require("../../../../assets/icons/write.png")} style={styles.plusInner} />
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.rowed, { marginTop: 15 }]}>
                        {skills.map((skill, index) => {
                            return (
                                <View key={index} style={styles.tag}>
                                    <Text style={styles.tagText}>{skill}</Text>
                                </View>
                            );
                        })}
                    </View>
                    </View>
                    <View style={styles.thickHr} />
                    <View style={[styles.row, { margin: 10 }]}>
                        <Text style={styles.viewTextTwo}>Video Introduction</Text>
                        <TouchableOpacity onPress={() => {
                            this.props.props.navigation.push("upload-video-introduction");
                        }} style={styles.plusIconContainerTwo}>
                            <Image source={require("../../../../assets/icons/plus.png")} style={styles.plusIconTwo} />
                        </TouchableOpacity>
                    </View>
                    <Text style={{ marginLeft: 10 }}>Post a video of yourself to help others get to know and trust you more!</Text>
                    <View style={[styles.row, { margin: 10 }]}>
                        <Text style={styles.viewTextTwo}>Hours Avaliable</Text>
                        <TouchableOpacity onPress={() => {
                            this.props.props.navigation.push("create-hours-profile-main");
                        }} style={styles.plusIconContainerTwo}>
                            <Image source={require("../../../../assets/icons/write.png")} style={styles.plusIconTwo} />
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.row, { margin: 10 }]}>
                        <Text style={styles.viewTextTwo}>Education</Text>
                        <TouchableOpacity onPress={() => {
                            this.EducationRBSheet.current.open();
                        }} style={styles.plusIconContainerTwo}>
                            <Image source={require("../../../../assets/icons/plus.png")} style={styles.plusIconTwo} />
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.row, { margin: 10 }]}>
                        <TouchableOpacity onPress={() => {
                            this.props.props.navigation.push("view-schooling-education-history-manage", { unique_id: this.props.unique_id });
                        }} style={styles.customContainer}>
                            <Text style={styles.mediumSized}>View Schooling History</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.row, { margin: 10 }]}>
                        <Text style={[styles.viewTextTwo, { color: "darkblue" }]}>Verifications</Text>
                    </View>
                    <View style={[styles.row, { margin: 10 }]}>
                        <Text style={styles.listText}>Phone Number: <Text style={[styles.verify]}>Verified</Text></Text><Image source={require("../../../../assets/icons/verified.png")} style={styles.shield} />
                    </View>
                    <View style={[styles.row, styles.margin10]}>
                        <Text style={styles.listText}>Email: <Text style={[styles.verify]}>Verified</Text></Text><Image source={require("../../../../assets/icons/verified.png")} style={styles.shield} />
                    </View>
                    <View style={[styles.row, styles.margin10]}>
                        <Text style={styles.listText}>Address: <Text style={[styles.verify]}>Verified</Text></Text><Image source={require("../../../../assets/icons/verified.png")} style={styles.shield} />
                    </View>
                    
                </View>
                    <View style={styles.thickHr} />
                    <View style={styles.row}>
                            <View style={styles.margin10}>
                                <View style={styles.columnCustom}>
                                    <Text style={[styles.viewText, { marginBottom: 5 }]}>Testimonials/Reviews</Text>
                                    <Text>Endorsements from past clients</Text>
                                
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => {}} style={styles.absoluteRight}>
                                <Image source={require("../../../../assets/icons/plus.png")} style={styles.absoluteRight} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.thinHr} />
                    <View style={styles.centeredMargin}>
                        <View style={styles.testimonialsAnimationContainer}>
                            <LottieView source={require('../../../../assets/animations/searching.json')} autoPlay loop style={styles.testimonialsAnimation}  />
                        </View>
                        <Text style={styles.showcaseText}>Showcase your skills with FairWage client testimonials</Text>
                        <Text style={styles.request}>Request a testimonial</Text>
                    </View>
                    <View style={styles.thickHr} />
                    <View style={styles.row}>
                            <View style={styles.margin10}>
                                <View style={styles.columnCustom}>
                                    <Text style={[styles.viewText, { marginBottom: 5 }]}>Certifications</Text>
                                    <Text>Tests & certifications</Text>
                                
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => {}} style={styles.absoluteRight}>
                                <Image source={require("../../../../assets/icons/plus.png")} style={styles.absoluteRight} />
                            </TouchableOpacity>
                    </View>
                    <View style={styles.thinHr} />
                    <View style={styles.centeredMargin}>
                        <View style={styles.testimonialsAnimationContainer}>
                            <LottieView source={require('../../../../assets/animations/trophy.json')} autoPlay loop style={styles.testimonialsAnimation}  />
                        </View>
                        <Text style={styles.showcaseText}>Add Certifications to high your best skills</Text>
                        <Text style={styles.request}>Add certification</Text>
                    </View>
                    <View style={styles.thickHr} />
                    <View>
                        <View style={styles.row}>
                            <View style={styles.margin10}>
                                <View style={styles.columnCustom}>
                                    <Text style={[styles.viewText, { marginBottom: 5 }]}>Employment History</Text>
                                    <Text>Previously employed by these companies</Text>
                                
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => {
                                this.props.props.navigation.push("employment-history-create");
                            }} style={styles.absoluteRight}>
                                <Image source={require("../../../../assets/icons/plus.png")} style={styles.absoluteRight} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.thinHr} />
                        {user !== null && typeof user.employmentHistory !== "undefined" && user.employmentHistory.length > 0 ? user.employmentHistory.slice(0, 2).map((history, index) => {
                            return (
                                <Fragment>
                                <View style={styles.row}>
                                    <View style={{ margin: 10, flexDirection: "row" }}>
                                            <View style={styles.largeColumnCustom}>
                                                <Text style={styles.heavyText}>{history.jobTitle} | {history.companyName}</Text>
                                            </View>
                                            <View style={styles.smallColumnCustom}>
                                                <TouchableOpacity onPress={() => {}} style={styles.iconsRight}>
                                                    <Image source={require("../../../../assets/icons/write.png")} style={styles.iconsRight} />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => {
                                                    this.setState({
                                                        selectedToDelete: history,
                                                        showDialog: true
                                                    })
                                                }} style={styles.iconsRightTwo}>
                                                    <Image source={require("../../../../assets/icons/trash-large.png")} style={styles.iconsRightTwo} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ margin: 10 }}>
                                        <Text style={[styles.smallGrey, { marginBottom: 10 }]}>{history.employmentStartDate} - {history.currentlyWorkingWithEmployer === "Yes" ? "Current" : history.employmentEndDate}</Text>
                                            <ReadMore
                                                numberOfLines={3}
                                                renderTruncatedFooter={this._renderTruncatedFooter}
                                                renderRevealedFooter={this._renderRevealedFooter}
                                                onReady={this._handleTextReady}>
                                                <Text style={styles.cardText}>
                                                    {history.description}
                                                </Text>
                                            </ReadMore>
                                    </View>
                                </Fragment>
                            );
                        }) : null}
                    </View>
            </Fragment>
            );
        } else {
            return (
                <SkeletonPlaceholder>
                    <View style={styles.header}>
                       
                    </View>
                    <View style={{ marginTop: 15 }} />
                    <View style={styles.main}>
                        <View style={styles.skelatonSub}></View>
                    </View>
                    <View style={{ marginTop: 15 }} />
                    <View style={[styles.row , { margin: 10 }]}>
                        <View style={{ width: width * 0.425, minWidth: width * 0.425, height: 125, margin: 10 }}>
                            
                        </View>
                        <View style={{ width: width * 0.425, minWidth: width * 0.425, height: 125, margin: 10  }}>
                                   
                        </View>
                    </View>
                    <View style={[styles.row , { margin: 10 }]}>
                        <View style={{ width: width * 0.425, minWidth: width * 0.425, height: 125, margin: 10 }}>
                            
                        </View>
                        <View style={{ width: width * 0.425, minWidth: width * 0.425, height: 125, margin: 10  }}>
                                   
                        </View>
                    </View>
                    <View style={{ marginTop: 15 }} />
                    <View style={styles.main}>
                        <View style={styles.skelatonSub}></View>
                    </View>
                    <View style={{ marginTop: 15 }} />
                    <View style={styles.main}>
                        <View style={styles.skelatonSub}></View>
                    </View>
                </SkeletonPlaceholder>
            );
        }
    }
    selectProfilePictureCustom = () => {
        const options = {
            mediaType: "photo",
            quality: 1,
            includeBase64: true
        };

        launchImageLibrary(options, this.processImageUpload);
    }
    processImageUpload = (data) => {
        console.log("processImageUpload", data);

        this.CustomShowRBSheet.close();

        setTimeout(() => {
            this.setState({
                spinnerTwo: true
            }, () => {
                axios.post(`${Config.ngrok_url}/upload/new/profile/picture/gallery/images`, {
                    base64: data.base64,
                    unique_id: this.props.unique_id
                }).then((res) => {
                    if (res.data.message === "Uploaded photo!") {
                        console.log(res.data);
    
                        const { picture } = res.data;
    
                        this.setState({
                            spinnerTwo: false,
                            profilePic: picture
                        });
                    } else {
                        console.log("err", res.data);
    
                        this.setState({
                            spinnerTwo: false
                        });
                    }
                }).catch((err) => {
                    console.log(err);
    
                    this.setState({
                        spinnerTwo: false
                    });
                })
            })
        }, 1000)
    }
    handleSavingTags = () => {
        const { skills } = this.state;

        axios.post(`${Config.ngrok_url}/upload/tags`, {
            skills,
            unique_id: this.props.unique_id
        }).then((res) => {
            if (res.data.message === "Uploaded tags!") {
                console.log(res.data);

                this.setState({
                    skills
                }, () => {
                    this.RBSheetFour.close();
                })
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    handleEmploymentDeletion = () => {
        console.log("handleEmploymentDeletion");

        const { selectedToDelete } = this.state;

        axios.post(`${Config.ngrok_url}/delete/employment/job`, {
            selectedToDelete,
            id: this.props.unique_id
        }).then((res) => {
            if (res.data.message === "Deleted!") {
                console.log(res.data); 

                const { user } = res.data;

                this.setState({
                    user
                })
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    
    render() {
        console.log("profile-public state: ", this.state);

        const { user } = this.state;

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
                <ScrollView contentContainerStyle={{ paddingBottom: 120 }} style={styles.scrollbox}>
                    <View style={styles.marginTop}>
                        <View style={styles.smallColumn}>
                            <TouchableOpacity onPress={() => {
                                this.props.props.navigation.push("navigation-menu-main");
                            }}>
                                <Image source={require("../../../../assets/icons/go-back.png")} style={styles.maxed} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.largeColumn}>
                            <SearchBar
                                    ref="searchBar"
                                    placeholder="Search"
                                    onChangeText={(value) => {

                                    }}
                                    onSearchButtonPress={() => {
                                        console.log("pressed.");
                                    }}
                                    onCancelButtonPress={() => {
                                        console.log("cancelled.")
                                    }}
                            />
                        </View>
                    </View>
                    {this.renderHeaderMainContent()}
                </ScrollView>
                <View>
                    <Dialog.Container visible={this.state.deletePortfolioItemDialog}>
                    <Dialog.Title>Delete Portfolio Item</Dialog.Title>
                    <Dialog.Description>
                        Do you want to delete this portfolio item? You cannot undo this action.
                    </Dialog.Description>
                    <Dialog.Button onPress={() => {
                        this.setState({
                            deletePortfolioItemDialog: false
                        })
                    }} label="Cancel" />
                    <Dialog.Button onPress={() => {
                        this.setState({
                            deletePortfolioItemDialog: false
                        }, () => {
                            this.deletePortfolioItem();
                        })
                    }} label="Delete" />
                    </Dialog.Container>
                </View>
                <Toast ref={(ref) => Toast.setRef(ref)} />
                <RBSheet
                        ref={(ref) => this.RBSheet = ref}
                        closeOnDragDown={true}
                        height={width * 0.70}
                        closeOnPressMask={false}
                        customStyles={{
                            wrapper: {
                                backgroundColor: "transparent"
                            },
                            container: {
                                height: width * 0.70,
                                backgroundColor: "#303030",
                                borderTopLeftRadius: 40,
                                borderTopRightRadius: 40
                            },
                            draggableIcon: {
                                backgroundColor: "grey",
                                width: 100
                            }
                        }}
                    >
                        <View style={styles.main}>
                            <TouchableOpacity onPress={() => {
                                this.RBSheet.close();

                                setTimeout(() => {
                                    this.props.props.navigation.push("cover-photos-view");
                                }, 750)
                            }} style={styles.row}>
                                <View style={styles.columnOne}>
                                    <View style={styles.outterContainer}>
                                        <Image source={require("../../../../assets/icons/pictures.png")} style={styles.picture} />
                                    </View>
                                </View>
                                <View style={styles.columnTwo}>
                                    <Text style={styles.panelText}>View Profile Cover Photos</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={{ marginTop: 15 }} />
                            <TouchableOpacity onPress={this.uploadPhoto} style={styles.row}>
                                <View style={styles.columnOne}>
                                    <View style={styles.outterContainer}>
                                        <Image source={require("../../../../assets/icons/pictures.png")} style={styles.picture} />
                                    </View>
                                </View>
                                <View style={styles.columnTwo}>
                                    <Text style={styles.panelText}>Upload Photo</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={{ marginTop: 15 }} />
                            <TouchableOpacity onPress={() => {}} style={styles.row}>
                                <View style={styles.columnOne}>
                                    <View style={styles.outterContainer}>
                                        <Image source={require("../../../../assets/icons/pictures.png")} style={styles.picture} />
                                    </View>
                                </View>
                                <View style={styles.columnTwo}>
                                    <Text style={styles.panelText}>Select Existing Photo On FairWage</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </RBSheet>
                    <RBSheet
                        ref={(ref) => this.CustomShowRBSheet = ref}
                        height={70}
                        closeOnPressMask={true}
                        customStyles={{
                            wrapper: {
                                backgroundColor: "transparent"
                            },
                            container: {
                                
                            }
                        }}
                    >
                        <View style={styles.main}>
                            <View style={{ flexDirection: "row" }}>
                                <View style={styles.customColumn}>
                                    <Button onPress={this.selectProfilePictureCustom} info style={[styles.myButtonSlideUp, { marginRight: 10 }]}>
                                        <Text style={styles.clickText}>Select Existing Photo</Text>
                                    </Button>
                                </View>
                                <View style={styles.customColumn}>
                                    <Button success style={styles.myButtonSlideUp}>
                                        <Text style={styles.clickText}>Upload a photo</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </RBSheet>
                    <RBSheet
                        ref={(ref) => this.RBSheetThree = ref}
                        closeOnDragDown={true}
                        height={width}
                        closeOnPressMask={false}
                        customStyles={{
                            wrapper: {
                                backgroundColor: "transparent"
                            },
                            container: {
                                height: width * 0.70,
                                backgroundColor: "#303030",
                                borderTopLeftRadius: 40,
                                borderTopRightRadius: 40
                            },
                            draggableIcon: {
                                backgroundColor: "#ffffff",
                                width: 100
                            }
                        }}
                    >
                        <ScrollView contentContainerStyle={{ paddingBottom: 25 }} style={styles.main}>
                            <TouchableOpacity onPress={this.handleRecordVideoRedirect} style={styles.row}>
                                <View style={styles.columnOne}>
                                    <View style={styles.outterContainer}>
                                        <Image source={require("../../../../assets/icons/video-reel.png")} style={styles.picture} />
                                    </View>
                                </View>
                                <View style={styles.columnTwo}>
                                    <Text style={styles.panelText}>Take New Profile Video</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={{ marginTop: 15 }} />
                            <TouchableOpacity onPress={this.uploadVideo} style={styles.row}>
                                <View style={styles.columnOne}>
                                    <View style={styles.outterContainer}>
                                        <Image source={require("../../../../assets/icons/vid.png")} style={styles.picture} />
                                    </View>
                                </View>
                                <View style={styles.columnTwo}>
                                    <Text style={styles.panelText}>Select Profile Video (20mb max size)</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={{ marginTop: 15 }} />
                            <TouchableOpacity onPress={() => {}} style={styles.row}>
                                <View style={styles.columnOne}>
                                    <View style={styles.outterContainer}>
                                        <Image source={require("../../../../assets/icons/gallery.png")} style={styles.picture} />
                                    </View>
                                </View>
                                <View style={styles.columnTwo}>
                                    <Text style={styles.panelText}>Select Existing Photo On FairWage</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={{ marginTop: 15 }} />
                            <TouchableOpacity onPress={() => {

                                this.RBSheetThree.close();

                                setTimeout(() => {
                                    this.CustomShowRBSheet.open();
                                }, 750)
                            }} style={styles.row}>
                                <View style={styles.columnOne}>
                                    <View style={styles.outterContainer}>
                                        <Image source={require("../../../../assets/icons/pictures.png")} style={styles.picture} />
                                    </View>
                                </View>
                                <View style={styles.columnTwo}>
                                    <Text style={styles.panelText}>Upload Profile Picture</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={{ marginTop: 15 }} />
                            <TouchableOpacity onPress={() => {}} style={styles.row}>
                                <View style={styles.columnOne}>
                                    <View style={styles.outterContainer}>
                                        <Image source={require("../../../../assets/icons/pictures.png")} style={styles.picture} />
                                    </View>
                                </View>
                                <View style={styles.columnTwo}>
                                    <Text style={styles.panelText}>Select Profile Picture</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={{ marginTop: 15 }} />
                            <TouchableOpacity onPress={() => {
                                this.RBSheetThree.close();

                                setTimeout(() => {
                                    this.props.props.navigation.push("view-all-profile-pictures");
                                }, 750)
                            }} style={styles.row}>
                                <View style={styles.columnOne}>
                                    <View style={styles.outterContainer}>
                                        <Image source={require("../../../../assets/icons/name.png")} style={styles.picture} />
                                    </View>
                                </View>
                                <View style={styles.columnTwo}>
                                    <Text style={styles.panelText}>View Profile Pictures</Text>
                                </View>
                            </TouchableOpacity>
                        </ScrollView>
                    </RBSheet>
                    <RBSheet
                        ref={ref => {
                            this.RBSheetFour = ref;
                        }}
                        height={height}
                        openDuration={250}
                        customStyles={{
                            container: {
                                
                            }
                        }}
                    >
                        <Header style={styles.headerGrey}>
                            <Left>
                                <Button onPress={() => {
                                    this.RBSheetFour.close();
                                }} transparent>
                                    <Icon name="close" style={{ color: "#ffffff" }} />
                                </Button>
                            </Left>
                            <Body>
                                <Title style={styles.whiteText}>My Skills</Title>
                                <Subtitle style={styles.whiteText}>Skills & More...</Subtitle>
                            </Body>
                            <Right />
                        </Header>
                        <View style={styles.tagContainer}>
                            <Tags
                                initialText=""
                                textInputProps={{
                                    placeholder: "Enter a tag..."
                                }}
                                initialTags={this.state.skills}
                                onChangeTags={tags => {
                                    console.log(tags);

                                    this.setState({
                                        skills: tags
                                    })
                                }}
                                onTagPress={(index, tagLabel, event, deleted) => {
                                    console.log(index, tagLabel, event, deleted ? "deleted" : "not deleted");

                                    this.setState({
                                        skills: this.state.skills.filter((skill) => {
                                            if (skill !== tagLabel) {
                                                return skill;
                                            }
                                        })
                                    })
                                }}
                                maxNumberOfTags={10}
                                containerStyle={{  }}
                                inputStyle={{ backgroundColor: "white" }}
                                renderTag={({ tag, index, onPress, deleteTagOnPress, readonly }) => (
                                    <TouchableOpacity style={styles.tagTwo} key={index} onPress={onPress}>
                                        <Text>{tag}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                            <Text style={{ fontWeight: "bold", marginTop: 10 }}>Add up to 10 skills. Remove skills by deleting tags...</Text>
                        </View>
                        <Footer style={Platform.OS === "android" ? { marginBottom: 25 } : {}}>
                            <FooterTab>
                                <Button style={styles.greyButton} onPress={() => {
                                    this.RBSheetFour.close();
                                }} vertical>
                                    <Icon style={{ color: "#ffffff" }} name="close" />
                                    <Text style={styles.whiteText}>Cancel</Text>
                                </Button>
                                <Button style={styles.greyButton} onPress={this.handleSavingTags} vertical>
                                    <Icon style={{ color: "#ffffff" }} name="save" />
                                    <Text style={styles.whiteText}>Save</Text>
                                </Button>
                            </FooterTab>
                        </Footer>
                    </RBSheet>
                    <EducationSlideUpPaneHelper educationPaneRef={this.EducationRBSheet} props={this.props} />
                    <View>
                        <Dialog.Container visible={this.state.showDialog}>
                        <Dialog.Title>Delete Job</Dialog.Title>
                        <Dialog.Description>
                            Do you want to delete this job? You cannot undo this action.
                        </Dialog.Description>
                        <Dialog.Button onPress={() => {
                            this.setState({
                                showDialog: false
                            })
                        }} label="Cancel" />
                        <Dialog.Button onPress={() => {
                            this.setState({
                                showDialog: false
                            }, () => {
                                this.handleEmploymentDeletion();
                            })
                        }} label="Delete" />
                        </Dialog.Container>
                    </View>
                    <Spinner 
                        overlayColor={"rgba(0, 0, 0, 0.75)"}
                        visible={this.state.spinner}
                        textContent={'Uploading your cover photo, \n please wait...'}
                        textStyle={styles.spinnerTextStyle}
                    />
                    <Spinner
                        visible={this.state.spinnerTwo}
                        overlayColor={"rgba(0, 0, 0, 0.75)"}
                        textContent={'Uploading your profile photo, \n please wait...'}
                        textStyle={styles.spinnerTextStyle}
                    />
                    </SideMenu>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.signupData.authData.unique_id,
        fullName: `${state.signupData.authData.firstName} ${state.signupData.authData.lastName}`,
        portfolioPage: _.has(state.portfolio, "portfolio") ? state.portfolio.portfolio.page : 1,
        portfolio: _.has(state.portfolio, "portfolio") ? state.portfolio.portfolio : {},
    }
}
export default connect(mapStateToProps, {})(PublicProfileHelper);