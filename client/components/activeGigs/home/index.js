import React, { Component, Fragment } from 'react';
import { View, Text, Image, Dimensions, ScrollView, FlatList } from 'react-native';
import { Subtitle, Header, Left, Body, Right, Button, Icon, Title, Card, CardItem, Thumbnail, Footer, FooterTab, Badge, List, ListItem } from 'native-base';
import SideMenu from "react-native-side-menu";
import Side from "../../navigation/sidemenu/index.js";
import styles from "./styles.js";
import SearchBar from 'react-native-search-bar';
import LottieView from 'lottie-react-native';
import Config from "react-native-config";
import axios from "axios";
import { connect } from "react-redux";
import Video from "react-native-video";

const { width, height } = Dimensions.get("window");

class HomeActiveGigsDashboardHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        menuOpen: false,
        user: null
    }
}
    handleSearch = () => {
        console.log("handleSearch clicked");
    }
    handleCancellation = () => {
        console.log("handleCancellation clicked");
    }
    componentDidMount() {
        axios.get(`${Config.ngrok_url}/gather/active/gigs/jobs`, {
            params: {
                id: this.props.unique_id
            }
        }).then((res) => {
            if (res.data.message === "Located active jobs!") {
                console.log(res.data);

                const { user, activeHiredJobs } = res.data;

                this.setState({
                    activeJobs: activeHiredJobs,
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
        const menu = <Side props={this.props} />;
        return (
           <Fragment>
                <SideMenu openMenuOffset={width * 0.80} menuPosition={"right"} isOpen={this.state.menuOpen} menu={menu}>
                    <Header style={{ backgroundColor: "#303030" }}>
                            <Left>
                                <Button onPress={() => {
                                    this.props.props.navigation.goBack();
                                }} transparent>
                                    <Icon style={{ color: "#ffd530" }} name='arrow-back' />
                                </Button>
                            </Left>
                            <Body>
                                <Title style={styles.goldText}>Active Jobs</Title>
                                <Subtitle style={styles.goldText}>Actively in progress jobs</Subtitle>
                            </Body>
                            <Right>
                                <Button onPress={() => {
                                    this.setState({
                                        menuOpen: !this.state.menuOpen
                                    })
                                }} transparent>
                                    <Icon style={{ color: "#ffd530" }} name='menu' />
                                </Button>
                            </Right>
                        </Header>
                        <View contentContainerStyle={{ paddingBottom: 50 }} style={styles.container}>
                            <List>
                            <FlatList  
                                style={{ minHeight: height }}
                                data={this.state.activeJobs}
                                renderItem={({item}) => {
                                    return (
                                        <ListItem button={true} onPress={() => {
                                            this.props.props.navigation.push("individual-active-gig-manage", { item });
                                        }} thumbnail>
                                            <Left>
                                            {item.type === "video" ? <Video source={{uri: item.photo }} 
                                            ref={(ref) => {
                                                this.player = ref
                                            }}
                                            style={styles.thumbnailVideo} /> : <Thumbnail style={styles.thumbnailVideo} source={{uri: item.photo }} />}
                                            </Left>
                                            <Body>
                                                <Text>{item.otherUserFirstName} {item.otherUserLastName}</Text>
                                                <Text note numberOfLines={1}>{item.date}</Text>
                                            </Body>
                                            <Right>
                                                <Button onPress={() => {
                                                    this.props.props.navigation.push("individual-active-gig-manage", { item });
                                                }} transparent>
                                                    <Text>View</Text>
                                                </Button>
                                            </Right>
                                        </ListItem>
                                    );
                                }}
                                keyExtractor={item => item.id}
                                ListHeaderComponent={
                                    <SearchBar
                                        ref={(ref) => this.searchBar = ref}
                                        placeholder="Search for job title's..."
                                        onChangeText={(value) => {
                                            this.setState({
                                                searchValue: value
                                            })
                                        }}
                                        onSearchButtonPress={this.handleSearch}
                                        onCancelButtonPress={this.handleCancellation}
                                    />
                                }
                            />   
                        </List>     
                        </View>
                        <Footer style={{ borderColor: "transparent", backgroundColor: "#303030" }}>
                            <FooterTab>
                                <Button style={styles.grayButton} onPress={() => {
                                    this.props.props.navigation.push("homepage");
                                }}>
                                    <Image source={require("../../../assets/icons/home.png")} style={styles.maxedIconSmall} />
                                </Button>
                                <Button style={styles.grayButton} button={true} onPress={() => {
                                    this.props.props.navigation.push("jobs-homepage");
                                }}>
                                    <Image source={require("../../../assets/icons/seeker.png")} style={styles.maxedIconSmall} />
                                </Button>
                                <Button style={styles.grayButton} button={true} onPress={() => {
                                    this.props.props.navigation.push("people-list-all");
                                }}>
                                    <Image source={require("../../../assets/icons/people.png")} style={styles.maxedIconSmall} />
                                </Button>
                                <Button style={styles.grayButton} button={true} onPress={() => {
                                    this.props.props.navigation.push("notifications");
                                }}>
                                    <Badge style={styles.absoluteBadge}><Text style={{ color: "white", fontSize: 10 }}>51</Text></Badge>
                                    <Image source={require("../../../assets/icons/bell.png")} style={[styles.maxedIconSmall, { bottom: 7.5 }]} />
                                    
                                </Button>
                            </FooterTab>
                        </Footer>
                </SideMenu>
           </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.signupData.authData.unique_id
    }
}
export default connect(mapStateToProps, {  })(HomeActiveGigsDashboardHelper);