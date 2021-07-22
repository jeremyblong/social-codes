import React, { Component, Fragment } from 'react'
import Accordion from 'react-native-collapsible/Accordion';
import { View, Text, Image, TouchableOpacity, Dimensions, FlatList, ScrollView } from 'react-native';
import styles from './styles.js';
import * as Animatable from 'react-native-animatable';
import { List, Header, Left, Body, Right, Button, Icon, Title, ListItem, Thumbnail, Subtitle } from 'native-base';
import SideMenu from "react-native-side-menu";
import Side from "../../navigation/sidemenu/index.js";
import Config from "react-native-config";
import axios from "axios";
import { connect } from 'react-redux';
import moment from "moment";
import uuid from "react-native-uuid";
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';

const { height, width } = Dimensions.get("window");

class ProposalsAndMoreMainHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        activeSections: [],
        alreadySubmitted: [],
        alreadyUsedIDs: [],
        user: null,
        menuOpen: false,
        pending: []
    }
}
    componentDidMount() {
        axios.get(`${Config.ngrok_url}/gather/previously/applied/proposals/limited`, {
            params: {
                id: this.props.unique_id
            }
        }).then((res) => {
            if (res.data.message === "Successfully gathered proposals!") {
                console.log(res.data);

                const { user, values, ids, pending } = res.data

                this.setState({
                    alreadySubmitted: values,
                    user,
                    pending,
                    alreadyUsedIDs: [...ids]
                })
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    renderContentTwo = () => {
        return (
            <Fragment>
                <View style={{ margin: 15 }}>
                    <List>
                        <ListItem thumbnail>
                            <Left>
                                <Thumbnail square source={{ uri: Config.no_image_avaliable }} />
                            </Left>
                            <Body>
                                <Text>Sankhadeep</Text>
                                <Text note numberOfLines={1}>Its time to build a difference . .</Text>
                            </Body>
                            <Right>
                                <Button style={{ marginRight: 10 }} transparent>
                                <Text>View</Text>
                                </Button>
                            </Right>
                        </ListItem>
                    </List>
                </View>
            </Fragment>
        );
    }
    _renderSectionTitle = section => {
    
    };
    _handleLoadMore = () => {
        console.log("load more...");

        const { alreadyUsedIDs, alreadySubmitted } = this.state;

        console.log("alreadyUsedIDs", alreadyUsedIDs)

        axios.post(`${Config.ngrok_url}/gather/more/previously/applied/proposals`, {
            alreadyPooled: alreadyUsedIDs,
            id: this.props.unique_id
        }).then((res) => {
            if (res.data.message === "Successfully gathered more!") {
                console.log(res.data);

                const { proposals, ids } = res.data;

                this.setState({
                    alreadySubmitted: [...alreadySubmitted, ...proposals],
                    alreadyUsedIDs: [...alreadyUsedIDs, ...ids]
                })
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    renderContentOne = () => {
        const { alreadySubmitted } = this.state;
        return (
            <Fragment>
                <View style={{ margin: 15, minHeight: 300, maxHeight: 300 }}>
                    <List>
                        {typeof alreadySubmitted !== "undefined" && alreadySubmitted.length > 0 ? <FlatList
                            data={alreadySubmitted}
                            renderItem={({ item, index }) => {
                                if (item !== null) {
                                    return (
                                        <ListItem button={true} onPress={() => {
                                            this.props.props.navigation.push("already-submitted-proposals-menu", { job: item.jobData, item });
                                        }} style={{ padding: 5 }} key={index}>
                                            <Left>
                                                <Text numberOfLines={4}>{item.jobData.title}{"\n"}{moment(item.systemDate).fromNow()}</Text>
                                            </Left>
                                            <Right>
                                                <Icon name="arrow-forward" />
                                            </Right>
                                        </ListItem>
                                    );
                                }
                            }}
                            // onEndReached={({ distanceFromEnd }) => {
                            //     console.log(distanceFromEnd);
                            // }}
                            keyExtractor={(item) => item !== null ? item.id : uuid.v4()}
                            // onEndReached={this._handleLoadMore}
                            // onEndReachedThreshold={0.005}
                            initialNumToRender={3}
                        /> : null}
                        <View style={styles.margin}>
                            <AwesomeButtonBlue type={"secondary"} onPress={() => {}} stretch={true}>Load more...</AwesomeButtonBlue>
                        </View>
                    </List>
                </View>
            </Fragment>
        );
    }
    renderContentThree = () => {
        const { pending } = this.state;
        return (
            <Fragment>
                <View style={{ margin: 15, minHeight: 300, maxHeight: 300 }}>
                    <List>
                        {typeof pending !== "undefined" && pending.length > 0 ? <FlatList
                            data={pending}
                            renderItem={({ item, index }) => {
                                console.log("item: :)", item);
                                if (item.interviewerID !== this.props.unique_id) {
                                    return (
                                        <ListItem button={true} onPress={() => {
                                            this.props.props.navigation.push("interview-start", { job: item.jobData, item });
                                        }} style={{ padding: 5 }} key={index}>
                                            <Left>
                                                <Text numberOfLines={4}>{item.jobData.title}{"\n"}{moment(item.system_date).fromNow()}</Text>
                                            </Left>
                                            <Right>
                                                <Icon name="arrow-forward" />
                                            </Right>
                                        </ListItem>
                                    );
                                }
                            }}
                            // onEndReached={({ distanceFromEnd }) => {
                            //     console.log(distanceFromEnd);
                            // }}
                            keyExtractor={(item) => item.id}
                            // onEndReached={this._handleLoadMore}
                            // onEndReachedThreshold={0.005}
                            initialNumToRender={3}
                        /> : null}
                        <View style={styles.margin}>
                            <AwesomeButtonBlue type={"secondary"} onPress={() => {}} stretch={true}>Load more...</AwesomeButtonBlue>
                        </View>
                    </List>
                </View>
            </Fragment>
        );
    }
    renderContentFour = () => {
        return (
            <Fragment>
                <View style={{ margin: 15 }}>
                    <List>
                        <ListItem thumbnail>
                            <Left>
                                <Thumbnail square source={{ uri: Config.no_image_avaliable }} />
                            </Left>
                            <Body>
                                <Text>Sankhadeep</Text>
                                <Text note numberOfLines={1}>Its time to build a difference . .</Text>
                            </Body>
                            <Right>
                                <Button style={{ marginRight: 10 }} transparent>
                                <Text>View</Text>
                                </Button>
                            </Right>
                        </ListItem>
                    </List>
                </View>
            </Fragment>
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
            style={{ minHeight: 300, backgroundColor: (isActive ? 'rgba(255,255,255,1)' : 'rgba(245,252,255,1)') }}>
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
    render() {
        const menu = <Side props={this.props} />;

        const sections = [
            {
                title: 'Offers',
                content: this.renderContentTwo(),
            }, 
            {
                title: 'Invitations to interview',
                content: this.renderContentThree(),
            }, 
            {
                title: 'Active proposals',
                content: this.renderContentFour(),
            },
            {
                title: 'Submitted proposals',
                content: this.renderContentOne(),
            }
        ];

        console.log("ProposalsAndMore menu state...:", this.state);
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
                    <Header style={{ backgroundColor: "#303030" }}>
                        <Left>
                            <Button onPress={() => {
                                this.props.props.navigation.goBack();
                            }} transparent>
                                <Image source={require("../../../assets/icons/go-back.png")} style={[styles.headerIcon, { tintColor: "#ffd530" }]} />
                            </Button>
                        </Left>
                        <Body>
                            <Title style={styles.goldText}>Dashboard</Title>
                            <Subtitle style={styles.goldText}>Manage proposals & more</Subtitle>
                        </Body>
                        <Right />
                    </Header>
                    <ScrollView contentContainerStyle={{ paddingBottom: 50 }} style={styles.container}>
                        <View style={styles.centered}>
                            <List>
                                <Accordion  
                                    sections={sections}
                                    activeSections={this.state.activeSections}
                                    renderSectionTitle={this._renderSectionTitle}
                                    renderHeader={this._renderHeader}
                                    renderContent={this._renderContent}
                                    onChange={this._updateSections}
                                />
                            </List>
                        </View>
                    </ScrollView>
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
export default connect(mapStateToProps, {  })(ProposalsAndMoreMainHelper);