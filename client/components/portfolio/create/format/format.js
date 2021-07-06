import React, { Component, Fragment } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import SideMenu from "react-native-side-menu";
import styles from "./styles.js";
import Side from "../../../navigation/sidemenu/index.js";
import { Header, Left, Body, Right, Button, Icon, Title, Subtitle, Input, Item, Textarea } from 'native-base';
import Dialog from "react-native-dialog";
import { addPortfolioData } from "../../../../actions/portfolio/index.js";
import { connect } from "react-redux";
import _ from 'lodash';
import GallerySVG from "../../../../assets/images/gallery.svg";
import CaseSVG from "../../../../assets/images/case.svg";
import ClassicSVG from "../../../../assets/images/classic.svg";
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import * as Progress from 'react-native-progress';


const { width, height } = Dimensions.get("window");


class DisplayFormatPortfolioHelper extends Component {
constructor (props) {
    super(props);

    this.state = {
        menuOpen: false,
        showDialog: false,
        selected: ""
    }
}
    handleReset = () => {
        console.log("handle reset");

        this.props.addPortfolioData({});

        setTimeout(() => {
            this.props.props.navigation.replace("add-portfolio-project");
        }, 750)
    }
    handleSubmission = () => {
        console.log("handle submission");

        this.props.addPortfolioData({
            ...this.props.portfolio,
            contentDisplayType: this.state.selected,
            page: 3
        })

        setTimeout(() => {
            this.props.props.navigation.push("portfolio-project-more-info");
        }, 750)
    }
    render () {
        const menu = <Side props={this.props} />;

        const { selected } = this.state;

        console.log("format state format", this.state);
        return (
            <Fragment>
                <View>
                    <Dialog.Container visible={this.state.showDialog}>
                    <Dialog.Title>Are you sure you'd like to restart?</Dialog.Title>
                    <Dialog.Description>
                        Once you restart, you will lose all of your previous progress adding a portfolio item...
                    </Dialog.Description>
                    <Dialog.Button onPress={() => {
                        this.setState({
                            showDialog: false
                        })
                    }} label="Cancel" />
                    <Dialog.Button onPress={() => {
                        this.setState({
                            showDialog: false
                        })
                    }} label="Delete" />
                    </Dialog.Container>
                </View>
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
                            <Title>Format</Title>
                            <Subtitle>Project format</Subtitle>
                        </Body>
                        <Right>
                            <Button onPress={() => {
                                this.setState({
                                    showDialog: true
                                }, () => {
                                    this.handleReset();
                                })
                            }} transparent>
                                <Text>Restart</Text>
                            </Button>
                            </Right>
                        </Header>
                        <Progress.Bar unfilledColor={"lightgrey"} progress={0.50} height={4} width={width} />
                        <ScrollView contentContainerStyle={{ paddingBottom: 50 }} style={styles.container}>
                            <View style={styles.margin}>
                                <Text>Choose how you want this project to be displayed to clients. You can always switch this template at a later date or change it even after you publish.</Text>
                                <View style={{ marginTop: 10, marginBottom: 10 }} />
                                <TouchableOpacity onPress={() => {
                                    this.setState({
                                        selected: "gallery"
                                    })
                                }} style={selected === "gallery" ? styles.selected : styles.boxed}>
                                    <Text style={styles.bold}>Display images or videos, one at a time.</Text>
                                    <GallerySVG width={200} height={200} />
                                </TouchableOpacity>
                                {selected === "gallery" ? <Text style={{ marginTop: 15, fontSize: 15, color: "darkblue" }}>Showcase the work you did on this portfolio project with a description underneath a carousel of images and videos</Text> : null}
                                <View style={styles.thickHr} />
                                <TouchableOpacity onPress={() => {
                                    this.setState({
                                        selected: "classic"
                                    })
                                }} style={selected === "classic" ? styles.selected : styles.boxed}>
                                    <Text style={styles.bold}>Highlight the project {"\n"} problem and your solution.</Text>
                                    <ClassicSVG width={200} height={200} />
                                </TouchableOpacity>
                                {selected === "classic" ? <Text style={{ marginTop: 15, fontSize: 15, color: "darkblue" }}>Tell a story about your project by framing the problem you set out to solve and the solution you came up with. Only images and videos can be uploaded.</Text> : null}
                                <View style={styles.thickHr} />
                                <TouchableOpacity onPress={() => {
                                    this.setState({
                                        selected: "case"
                                    })
                                }} style={selected === "case" ? styles.selected : styles.boxed}>
                                    <Text style={styles.bold}>Allow clients to scroll through your work.</Text>
                                    <CaseSVG width={200} height={200} />
                                </TouchableOpacity>
                                {selected === "case" ? <Text style={{ marginTop: 15, fontSize: 15, color: "darkblue" }}>Highlight the work you did on this portfolio project with a scrollable classic template. You should also choose this option if you are adding files besides videos or images, such as documents or spreadsheets.</Text> : null}
                            </View>
                            <View style={{ margin: 15 }}>
                                {typeof selected !== "undefined" && selected.length > 0 ? <AwesomeButtonBlue type={"secondary"} onPress={this.handleSubmission} stretch={true}>Submit & Continue</AwesomeButtonBlue> : <AwesomeButtonBlue type={"disabled"} onPress={() => {}} stretch={true}>Submit & Continue</AwesomeButtonBlue>}
                            </View>
                        </ScrollView>
                        <TouchableOpacity onPress={() => {
                            this.setState({
                                menuOpen: !this.state.menuOpen
                            })
                        }} style={styles.bottomRightCorner}>
                            <Image source={require("../../../../assets/icons/circle-menu.png")} style={styles.circleMenu} />
                        </TouchableOpacity>
                    </SideMenu>
                </Fragment>
            )
    }
}
const mapStateToProps = (state) => {
    return {
        portfolio: _.has(state.portfolio, "portfolio") ? state.portfolio.portfolio : {},
        unique_id: state.signupData.authData.unique_id
    }
}
export default connect(mapStateToProps, { addPortfolioData })(DisplayFormatPortfolioHelper);