import React, { Component, Fragment } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import { Header, Left, Body, Right, Title, Subtitle, Button, Input, Item, Icon, Form, Textarea } from 'native-base';
import styles from './styles.js';
import * as Progress from 'react-native-progress';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { addJobData } from "../../../../actions/jobs/data.js";
import { connect } from "react-redux";
import Unorderedlist from 'react-native-unordered-list';
import Config from 'react-native-config';
import axios from "axios";

const { height, width } = Dimensions.get("window");

class BasicInfoStartJobListingHelper extends Component {
constructor (props) {
    super(props);

    this.state = {
        title: "",
        description: ""
    }
}   
    renderSuccess = () => {
        const { title } = this.state;
        if (title.length > 0) {
            if (title.length >= 10) {
                return true;
            } else {
                return false;
            }
        } else {
            return null;
        }
    }
    renderErr = () => {
        const { title } = this.state;
        if (title.length > 0) {
            if (title.length >= 10) {
                return false;
            } else {
                return true;
            }
        } else {
            return null;
        }
    }
    renderIcon = () => {
        const { title } = this.state;

        if (title.length > 0) {
            if (title.length >= 10) {
                return true;
            } else {
                return false;
            }
        } else {
            return null;
        }
    }
    renderContinuation = () => {
        const { title, description } = this.state;
        if (title.length >= 10 && (typeof description !== "undefined" && description.length > 100)) {
            return false;
        } else {
            return true;
        }
    }
    renderQuery = (category) => {
        console.log("category", category);
        switch (category) {
            case "web-mobile-software-development":
                return "development";
            case "mobile-app-development": 
                return "app";
            case "writing":
                return "writing";
            case "artifical-intelligence-machine-learning":
                return "intelligence";
            case "game-development":
                return "game";
            case "graphic-design":
                return "design";
            case "it-networking":
                return "networking";
            case "translation":
                return "translation";
            case "sales-marketing":
                return "sales";
            case "legal": 
                return "legal";
            case "social-media-and-marketing":
                return "marketing";
            case "engineering-and-architecture":
                return "engineering";
            default: 
                return;
        }
    }
    handleSubmission = () => {
        const { title, description } = this.state;

        axios.post(`${Config.ngrok_url}/generate/tags`, {
            query: this.renderQuery(this.props.data.category),
            id: this.props.unique_id,
            title,
            description
        }).then((res) => {
            if (res.data.message === "Generated tags!") {
                console.log(res.data);

                const { tags } = res.data;

                this.props.addJobData({
                    ...this.props.data,
                    page: 2,
                    title,
                    description,
                    tags
                });
        
                setTimeout(() => {
                    this.props.props.navigation.replace("list-a-job-type");
                }, 750)
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    restart = () => {
        console.log("restart");

        this.props.addJobData({
            page: 1
        })

        setTimeout(() => {
            this.props.props.navigation.navigate("start-a-project-hiring");
        }, 750)
    }
    render() {
        const { title, description, count } = this.state;

        console.log(this.state);
        return (
           <Fragment>
                {this.props.props.review === true ? null : <Header style={{ backgroundColor: "#303030" }}>
                    <Left>
                        <Button onPress={() => {
                            this.props.props.navigation.goBack();
                        }} transparent>
                            <Image source={require("../../../../assets/icons/go-back.png")} style={[styles.headerIcon, { tintColor: "#ffffff" }]} />
                        </Button>
                    </Left>
                <Body>
                    <Title style={styles.whiteText}>Post a job</Title>
                    <Subtitle style={styles.whiteText}>Create a job listing</Subtitle>
                </Body>
                    <Right>
                        <Button transparent onPress={this.restart}>
                            <Text style={styles.whiteText}>Restart Process</Text>
                        </Button>
                    </Right>
                </Header>}
                <Progress.Bar color={"#0057ff"} unfilledColor={"#ffffff"} progress={0.15} width={width} />
                <ScrollView contentContainerStyle={{ paddingBottom: 50 }} style={styles.container}>
                    <View style={styles.margin}>
                        <Text style={styles.headerText}>Great! Let's give your job more details</Text>
                        <View style={{ marginTop: 20 }} />
                        <View style={styles.aboveRight}>
                            <Text style={title.length >= 10 ? styles.greenText : styles.redText}>{title.length}/50</Text>
                        </View>
                    <Form>
                    <KeyboardAwareScrollView>
                        <Text style={styles.label}>Enter a title</Text>
                        <Item success={this.renderSuccess()} error={this.renderErr()} regular>
                            <Input style={{ color: "white" }} value={title} onChangeText={(value) => {
                                this.setState({
                                    title: value
                                })
                            }} placeholderTextColor={"grey"} placeholder='e.g. I need a designer for my hunting companys website' />
                            {this.renderIcon() === null ? null : this.renderIcon() ? <Icon style={{ color: "green" }} name='checkmark-circle' /> : <Icon style={{ color: "red" }} name='close-circle' />}
                        </Item>
                        {title.length === 0 ? null : <Text style={title.length >= 10 ? styles.greenTextTwo : styles.redTextTwo}>Please enter at least 10 charectors</Text>}
                        <View style={{ marginTop: 20 }} />
                        
                        
                        <Text style={{ fontWeight: "bold", marginBottom: 15, color: "#cecece" }}>A good description includes</Text>
                        <Unorderedlist><Text style={styles.whiteText}>What the deliverable is</Text></Unorderedlist>
                        <Unorderedlist><Text style={styles.whiteText}>Type of freelancer or agency you're looking for</Text></Unorderedlist>
                        <Unorderedlist style={{ marginBottom: 30 }}><Text style={styles.whiteText}>Anything unique about the project, team, or your company</Text></Unorderedlist>
                        <Text style={styles.label}>Enter a detailed description</Text>
                        {/* <Text style={styles.smallRed}>We will exactract the data from your description and provide relevant "key-words"/tags from the text you provide so please be as detailed as possible with your description.</Text> */}
                        <View style={styles.aboveRight}>
                            <Text style={description.length >= 100 ? styles.greenText : styles.redText}>{description.length}/5000</Text>
                        </View>
                        <Textarea style={styles.whiteText} keyboardType="default" rowSpan={5} bordered value={description} onChangeText={(value) => {
                            this.setState({
                                description: value
                            })
                        }} placeholderTextColor={"grey"} placeholder='e.g. I need a squarespace developer ALL-STAR.
                        
                        I have a food and health blog that I am always making updates to uploading my latest press and info.... Most of my site has been customized from a template.
                        
                        ' />
                        {description.length === 0 ? null : <Text style={description.length >= 100 ? styles.greenTextTwo : styles.redTextTwo}>Please enter at least 100 charectors</Text>}

                        <TouchableOpacity style={{ maxHeight: 20 }} onPress={() => {
                            Keyboard.dismiss();
                        }} style={styles.dismissText}><Text style={{ textAlign: "center", marginTop: 10, color: "#ffffff" }}>Dismiss Keyboard</Text></TouchableOpacity>
                    </KeyboardAwareScrollView>
                    </Form>
                    </View>
                    
                </ScrollView>
                <View style={styles.bottomView}>
                    {this.renderContinuation() ? <AwesomeButtonBlue textColor={"white"} type={"disabled"} stretch={true}>Submit & Continue</AwesomeButtonBlue> : <AwesomeButtonBlue borderColor={"#141414"} borderWidth={2} style={{ marginTop: 20 }} type={"secondary"} backgroundColor={"#ffffff"} backgroundPlaceholder={"black"} textColor={"black"} shadowColor={"grey"} onPress={this.handleSubmission} stretch={true}>Submit & Continue</AwesomeButtonBlue>}
                </View>
           </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        data: state.jobData.data,
        unique_id: state.signupData.authData.unique_id
    }
}
export default connect(mapStateToProps, { addJobData })(BasicInfoStartJobListingHelper);