import React, { Component, Fragment } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { Button, Footer, FooterTab, Badge, List } from 'native-base';
import styles from './styles.js';
import LottieView from 'lottie-react-native';
import { useRoute } from '@react-navigation/native';
import { connect } from 'react-redux';
import Accordion from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import Dialog from "react-native-dialog";
import { signedInUserData } from "../../../actions/auth/signup.js";
import SideMenu from "react-native-side-menu";
import Side from "../sidemenu/index.js";
import _ from 'lodash';
import { addJobData } from "../../../actions/jobs/data.js";
import { CometChat } from "@cometchat-pro/react-native-chat";
import axios from "axios";
import Config from "react-native-config";
import Video from 'react-native-video';
import { addPortfolioData } from "../../../actions/portfolio/index.js";

const { height, width } = Dimensions.get("window");

class NavigationMainHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        activeSections: [],
        showDialog: false,
        menuOpen: false,
        user: null,
        sections: [
            // {
            //     title: 'See More...',
            //     content: this.renderContentOne(),
            // },
            {
                title: 'Help & Support',
                content: this.renderContentTwo(),
            }, 
            {
                title: 'Settings & Privacy',
                content: this.renderContentThree(),
            }, 
            {
                title: 'Sign-out/logout',
                content: this.renderContentFour(),
            }
        ]
           
    }
}
    renderContentTwo = () => {
        return (
            <View>
                <View style={{ margin: 20 }}>
                    <View style={styles.innerBoxed}>
                        <Image source={require("../../../assets/icons/life-raft.png")} style={styles.listIcon} />
                        <Text style={styles.innerBoxedText}>Help Center</Text>
                    </View>
                    <View style={styles.hr} />
                    <View style={styles.innerBoxed}>
                    <LottieView source={require('../../../assets/icons/letter.json')} autoPlay loop style={styles.listIcon} />
                        <Text style={styles.innerBoxedText}>Support Inbox</Text>
                    </View>
                    <View style={styles.hr} />
                    <View style={styles.innerBoxed}>
                        <Image source={require("../../../assets/icons/message.png")} style={styles.listIcon} />
                        <Text style={styles.innerBoxedText}>Help Community</Text>
                    </View>
                    <View style={styles.hr} />
                    <View style={styles.innerBoxed}>
                        <Image source={require("../../../assets/icons/life-raft.png")} style={styles.listIcon} />
                        <Text style={styles.innerBoxedText}>Report a Problem</Text>
                    </View>
                    <View style={styles.hr} />
                    <View style={styles.innerBoxed}>
                        <Image source={require("../../../assets/icons/terms.png")} style={styles.listIcon} />
                        <Text style={styles.innerBoxedText}>Terms & Policies</Text>
                    </View>
                </View>
            </View>
        );
    }
    _renderSectionTitle = section => {
       
    };
    renderContentOne = () => {
        return <Text>hello 1</Text>
    }
    renderContentThree = () => {
        return (
            <View style={{ margin: 20 }}>
                <View style={{ margin: 20 }}>
                    <View style={styles.innerBoxed}>
                        <Image source={require("../../../assets/icons/acc.png")} style={styles.listIcon} />
                        <Text style={styles.innerBoxedText}>Settings</Text>
                    </View>
                    <View style={styles.hr} />
                    <View style={styles.innerBoxed}>
                    <LottieView source={require('../../../assets/icons/lock.json')} autoPlay loop style={styles.listIcon} />
                        <Text style={styles.innerBoxedText}>Privacy Shortcuts</Text>
                    </View>
                    <View style={styles.hr} />
                    <View style={styles.innerBoxed}>
                        <LottieView source={require('../../../assets/icons/moon.json')} autoPlay loop style={styles.listIcon} />
                        <Text style={styles.innerBoxedText}>Dark Mode</Text>
                    </View>
                    <View style={styles.hr} />
                    <View style={styles.innerBoxed}>
                        <Image source={require("../../../assets/icons/globe.png")} style={styles.listIcon} />
                        <Text style={styles.innerBoxedText}>Language</Text>
                    </View>
                    <View style={styles.hr} />
                    <View style={styles.innerBoxed}>
                        <Image source={require("../../../assets/icons/ana.png")} style={styles.listIcon} />
                        <Text style={styles.innerBoxedText}>Your Analytics</Text>
                    </View>
                </View>
            </View>
        );
    }
    renderContentFour = () => {
        return (
            <View style={styles.margin}>        
                <View style={[styles.margin, { minWidth: width * 0.85 }]}>
                    <AwesomeButtonBlue type={"secondary"} onPress={() => {
                        this.setState({
                            showDialog: true,
                            activeSections: []
                        })
                    }} stretch={true}>Sign-out/Deauthenticate</AwesomeButtonBlue>
                </View>
            </View>
        );
    }
    _renderHeader = (section, index, isActive, sections) => {
        return (
          <Animatable.View
            duration={300}
            transition="backgroundColor"
            style={{ backgroundColor: (isActive ? 'rgba(255,255,255,1)' : 'rgba(245,252,255,1)') }}>
            <Text style={styles.innerText}>{section.title}</Text>
          </Animatable.View>
        );
    }
     
    _renderContent = (section, i, isActive, sections) => {
        return (
          <Animatable.View
            duration={300}
            transition="backgroundColor"
            style={{ backgroundColor: (isActive ? 'rgba(255,255,255,1)' : 'rgba(245,252,255,1)') }}>
            <Animatable.Text
              duration={300}
              easing="ease-out"
              animation={isActive ? 'zoomIn' : false}>
              {section.content}
            </Animatable.Text>
          </Animatable.View>
        );
    }
    
    _updateSections = activeSections => {
        this.setState({ activeSections });
    };
    componentDidMount() {
        const url = `${Config.ngrok_url}/gather/user`;
        
        axios.get(url, {
            params: {
                id: this.props.unique_id
            }
        }).then((res) => {
            console.log(res.data);

            const { user } = res.data;

            this.setState({
                user
            })

        }).catch((err) => {
            console.log(err);
        })
    }
    signOut = () => {

        CometChat.logout().then(() => {
                console.log("Logout completed successfully");
                
                this.setState({
                    showDialog: false
                }, () => {
                    this.props.signedInUserData({});
                    this.props.addJobData({});
                    this.props.addPortfolioData({});

                    setTimeout(() => {
                        this.props.props.navigation.navigate("homepage-main");
                    }, 750)
                })
            }
                //Logout completed successfully
            , (error) => {
                //Logout failed with exception
                console.log("Logout failed with exception:", { error });
            }
        )
    }
    handleRedirect = () => {
        switch (this.props.page) {
            case 1:
                this.props.props.navigation.push("start-a-project-hiring");
                break;
            case 2:
                this.props.props.navigation.push("list-a-job-type");
                break;
            case 3:
                this.props.props.navigation.push("type-of-project-screening");
                break;
            case 4: //
                this.props.props.navigation.push("skills-and-more-info");
                break;
            case 5: //
                this.props.props.navigation.navigate("visibility-and-quanitity");
                break;
            case 6: //
                this.props.props.navigation.navigate("payments-and-more");
                break;
            case 7: //
                this.props.props.navigation.navigate("list-a-job-review");
                break;
            default:
                break;
        }
    }
    renderMenuButtons = () => {
        if (this.props.props.route.name !== "navigation-menu-main") {
            return (
                <Button style={styles.greyButton} active onPress={() => {
                    this.props.props.navigation.push("navigation-menu-main");               
                }}>
                    <Image source={require("../../../assets/icons/squared-menu.png")} style={styles.maxedIconSmall} />
                </Button>
            );
        } else {
            return (
                <Button style={styles.greyButton} active onPress={() => {
                    this.setState({
                        menuOpen: !this.state.menuOpen
                    })             
                }}>
                    <Image source={require("../../../assets/icons/menu.png")} style={styles.maxedIconSmall} />
                </Button>
            );
        }
    }
    render() {
        const menu = <Side props={this.props} />;

        const { user } = this.state;

        console.log(this.state);
        return (
            <Fragment>
             <SideMenu openMenuOffset={width * 0.80} menuPosition={"right"} isOpen={this.state.menuOpen} menu={menu}>
                <View style={{ backgroundColor: "white" }}>
                    <Footer style={{ borderColor: "transparent" }}>
                        <FooterTab>
                            <Button style={styles.greyButton} onPress={() => {
                                this.props.props.navigation.push("homepage");
                            }}>
                                <Image source={require("../../../assets/icons/home.png")} style={styles.maxedIconSmall} />
                            </Button>
                            <Button style={styles.greyButton} button={true} onPress={() => {
                                this.props.props.navigation.push("jobs-homepage");
                            }}>
                                <Image source={require("../../../assets/icons/seeker.png")} style={styles.maxedIconSmall} />
                            </Button>
                            <Button style={styles.greyButton} button={true} onPress={() => {
                                this.props.props.navigation.push("people-list-all");
                            }}>
                                <Image source={require("../../../assets/icons/people.png")} style={styles.maxedIconSmall} />
                            </Button>
                            <Button style={styles.greyButton} button={true} onPress={() => {
                                this.props.props.navigation.push("notifications");
                            }}>
                                
                                <Badge style={styles.absoluteBadge}><Text style={{ color: "white", fontSize: 10 }}>51</Text></Badge>
                                <Image source={require("../../../assets/icons/bell.png")} style={styles.maxedIconSmall} />
                            </Button>
                            {this.renderMenuButtons()}
                        </FooterTab>
                    </Footer>
                    <View style={styles.container}>
                        <ScrollView contentContainerStyle={{ paddingBottom: 250 }} style={styles.scroller}>
                            <View style={styles.rowCustom}>
                                <View style={styles.left}>
                                    <Text style={styles.menuText}>Menu</Text>
                                </View>
                                <View style={styles.right}>
                                    <TouchableOpacity style={styles.circledButton} onPress={() => {}}>
                                        <Image source={require("../../../assets/icons/search.png")} style={styles.search} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.customRowTwo}>
                                <View style={styles.smallColumn}>
                                    {user !== null && typeof user !== "undefined" && typeof user.profilePics !== "undefined" && user.profilePics.length > 0 && user.profilePics[user.profilePics.length - 1].type === "video" ? <Video source={{uri: `${Config.wasabi_url}/${user.profilePics[user.profilePics.length - 1].picture}` }} 
                                        ref={(ref) => {
                                            this.player = ref
                                        }} 
                                        resizeMode="cover"
                                        muted={true}
                                        repeat={true} 
                                        autoPlay
                                        style={styles.backgroundVideo} 
                                    /> : <Image source={{ uri: user !== null && typeof user !== "undefined" &&  typeof user.profilePics !== "undefined" && user.profilePics.length > 0 ? `${Config.wasabi_url}/${user.profilePics[user.profilePics.length - 1].picture}` : user !== null && typeof user !== "undefined" && typeof user.photo !== "undefined" && user.photo.length > 0 ? user.photo : `${Config.no_image_avaliable}` }} style={styles.profilePic} />}
                                </View>
                                <TouchableOpacity onPress={() => {
                                    this.props.props.navigation.push("public-profile-main");
                                }} style={styles.largeColumn}>
                                    <Text style={styles.title}>{this.props.fullName}</Text>
                                    <Text style={styles.greyText}>See your profile</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: "row", margin: 15 }}>
                                <View style={styles.halfed}>
                                    {this.props.accountType === "work" ? <TouchableOpacity onPress={() => {
                                        this.props.props.navigation.push("payment-onboarding");
                                    }} style={styles.shortView}>
                                        <Image source={require("../../../assets/icons/onboarding.png")} style={[styles.shortViewIcon, {   tintColor: "black" }]} />
                                        <Text style={styles.largeSized}>Onboarding & Payment Set-up</Text>
                                    </TouchableOpacity> : null}
                                    <TouchableOpacity onPress={() => {}} style={styles.tallView}>
                                        <View style={styles.halfHeight}>
                                            {user !== null && typeof user !== "undefined" && typeof user.profilePics !== "undefined" && user.profilePics.length > 0 && user.profilePics[user.profilePics.length - 1].type === "video" ? <Video source={{uri: `${Config.wasabi_url}/${user.profilePics[user.profilePics.length - 1].picture}` }} 
                                            ref={(ref) => {
                                                this.player = ref
                                            }} 
                                            muted={true}
                                            resizeMode="cover"
                                            repeat={true} 
                                            autoPlay
                                            style={styles.stretch} 
                                        /> : <Image source={{ uri: user !== null && typeof user !== "undefined" && typeof user.profilePics !== "undefined" && user.profilePics.length > 0 ? `${Config.wasabi_url}/${user.profilePics[user.profilePics.length - 1].picture}` : user !== null && typeof user !== "undefined" && typeof user.photo !== "undefined" && user.photo.length > 0 ? user.photo : `${Config.no_image_avaliable}` }} style={styles.stretch} />}
                                        
                                        </View>
                                        <Image source={require("../../../assets/icons/test.png")} style={styles.profileIcon} />
                                        <View style={styles.halfHeight}>
                                            <Text style={styles.manageText}>Manage your profile</Text>
                                            <Text style={styles.sub}>Pictures, info, settings, etc...</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        this.props.props.navigation.push("friends-menu");
                                    }} style={styles.shortView}>
                                        <Image source={require("../../../assets/icons/user-group.png")} style={[styles.shortViewIconTwo, { tintColor: "purple" }]} />
                                        <Text style={styles.largeSized}>Friends</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        this.props.props.navigation.push("purchase-boost");
                                    }} style={styles.shortView}>
                                        <Image source={require("../../../assets/icons/token.png")} style={styles.shortViewIcon} />
                                        <Text style={styles.largeSized}>Purchase/activate Boost(s)</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        this.props.props.navigation.push("purchase-tokens-homepage");
                                    }} style={styles.shortView}>
                                        <Image source={require("../../../assets/icons/coin.png")} style={[styles.shortViewIcon, { tintColor: "purple" }]} />
                                        <Text style={styles.largeSized}>Purchase Credits/Tokens</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        this.props.props.navigation.push("manage-all-active-proposal-related");
                                    }} style={styles.tallView}>
                                        <View style={styles.halfHeight}>
                                            <Image source={require("../../../assets/images/handshake.jpg")} style={styles.stretch} />
                                        </View>
                                        <Image source={require("../../../assets/icons/newjob.png")} style={styles.profileIconTwo} />
                                        <View style={styles.halfHeight}>
                                            <Text style={styles.manageText}>Manage Jobs</Text>
                                            <Text style={styles.sub}>Manage active, pending and submitted proposals</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <View style={styles.shortView}>
                                        
                                    </View>
                                    <View style={styles.shortView}>
                                        
                                    </View>
                                </View>
                                <View style={styles.halfed}>
                                    {this.props.accountType === "work" ? <TouchableOpacity onPress={() => {
                                        this.props.props.navigation.push("active-live-jobs-main");
                                    }} style={styles.shortView}>
                                        <Image source={require("../../../assets/icons/job-job.png")} style={[styles.shortViewIcon, {   tintColor: "black" }]} />
                                        <Text style={styles.largeSized}>Active Gigs/Current Jobs</Text>
                                    </TouchableOpacity> : null}
                                    {this.props.accountType === "hire" ? <TouchableOpacity onPress={() => {
                                        this.props.props.navigation.push("active-live-gigs-in-progress");
                                    }} style={styles.shortView}>
                                        <Image source={require("../../../assets/icons/seeker.png")} style={[styles.shortViewIcon, { tintColor: "purple" }]} />
                                        <Text style={styles.largeSized}>Active Gigs/Jobs</Text>
                                        <Text>Current *active* accepted jobs</Text>
                                    </TouchableOpacity> : null}
                                    {this.props.accountType === "hire" ? <TouchableOpacity onPress={() => {
                                        this.props.props.navigation.push("manage-applicants-jobs");
                                    }} style={styles.shortView}>
                                        <Image source={require("../../../assets/icons/applicant.png")} style={styles.shortViewIcon} />
                                        <Text style={styles.midSized}>View/Manage applicants</Text>
                                    </TouchableOpacity> : null}
                                    <TouchableOpacity onPress={() => {
                                        this.props.props.navigation.push("forums-main");
                                    }} style={styles.tallView}>
                                        <View style={styles.halfHeight}>
                                            <Image source={require("../../../assets/images/forum.jpg")} style={styles.stretch} />
                                        </View>
                                        <Image source={require("../../../assets/icons/4.png")} style={styles.profileIcon} />
                                        <View style={styles.halfHeight}>
                                            <Text style={styles.manageText}>Forums</Text>
                                            <Text style={styles.sub}>Ask questions, answer questions, community help & more...</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        this.props.props.navigation.push("payments-main");
                                    }} style={styles.shortView}>
                                        <Image source={require("../../../assets/icons/topoff.png")} style={[styles.shortViewIcon, { tintColor: "blue" }]} />
                                        <Text style={styles.largeSized}>Payment Methods</Text>
                                    </TouchableOpacity>
                                    {this.props.accountType === "hire" ? <TouchableOpacity onPress={() => {
                                        this.handleRedirect();
                                    }} style={styles.shortView}>
                                        <Image source={require("../../../assets/icons/card.png")} style={styles.shortViewIcon} />
                                        <Text style={styles.largeSized}>Create a project and/or job</Text>
                                    </TouchableOpacity> : null}
                                    <TouchableOpacity onPress={() => {
                                        this.props.props.navigation.push("previously-submitted-proposals");
                                    }} style={styles.shortView}>
                                        <Image source={require("../../../assets/icons/apply-2.png")} style={[styles.shortViewIcon, {   tintColor: "blue" }]} />
                                        <Text style={styles.largeSized}>View Previous Proposals</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        this.props.props.navigation.push("video-interview-calls-homepage");
                                    }} style={styles.shortView}>
                                        <Image source={require("../../../assets/icons/reel.png")} style={[styles.shortViewIcon, {   tintColor: "black" }]} />
                                        <Text style={styles.largeSized}>Active Interviews & Video calls</Text>
                                    </TouchableOpacity>
                                    <View style={styles.shortView}>
                                        
                                    </View>
                                </View>   
                            </View>
                            <List>
                            <Accordion
                                sections={this.state.sections}
                                activeSections={this.state.activeSections}
                                renderSectionTitle={this._renderSectionTitle}
                                renderHeader={this._renderHeader}
                                renderContent={this._renderContent}
                                onChange={this._updateSections}
                            />
                            </List>
                        </ScrollView>
                    </View>
                    <View>
                        <Dialog.Container visible={this.state.showDialog}>
                        <Dialog.Title>Are you sure you want to Sign-out?</Dialog.Title>
                        <Dialog.Description>
                            Are you sure you want to sign-out? This will clear any and all pending stored transactions that have NOT been completed yet such as jobs, pending transactions & more...
                        </Dialog.Description>
                        <Dialog.Button onPress={() => {
                            this.setState({
                                showDialog: false
                            })
                        }} label="Cancel" />
                        <Dialog.Button onPress={this.signOut} label="Sign-out" />
                        </Dialog.Container>
                    </View>
                </View>
                </SideMenu>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        page: _.has(state.jobData, "data") && _.has(state.jobData.data, "page") ? state.jobData.data.page : 1,
        fullName: `${state.signupData.authData.firstName} ${state.signupData.authData.lastName}`,
        unique_id: state.signupData.authData.unique_id,
        accountType: state.signupData.authData.accountType
    }
}
export default connect(mapStateToProps, { signedInUserData, addJobData, addPortfolioData })((props) => {

    const route = useRoute();
  
    return <NavigationMainHelper {...props} route={route} />;
})