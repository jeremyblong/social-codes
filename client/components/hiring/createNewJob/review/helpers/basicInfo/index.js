import React, { Component, Fragment } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import { Header, Left, Body, Right, Title, Subtitle, Button, Input, Item, Icon, Form, Textarea } from 'native-base';
import styles from './styles.js';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { addJobData } from "../../../../../../actions/jobs/data.js";
import { connect } from "react-redux";
import Unorderedlist from 'react-native-unordered-list';
import RBSheet from "react-native-raw-bottom-sheet";


const { height, width } = Dimensions.get("window");

class BasicInfoStartJobListingHelperSubComponent extends Component {
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
    handleSubmission = () => {
        const { title, description } = this.state;

        this.props.addJobData({
            ...this.props.data,
            title,
            description
        });

        this.RBSheet.close();
    }
    render() {
        const { title, description, count } = this.state;

        console.log(this.state);
        return (
           <Fragment>
                <View style={styles.row}>
                    <Text style={styles.headerTextMain}>Title</Text>
                    <TouchableOpacity onPress={() => {
                        this.RBSheet.open();
                    }} style={styles.circle}>
                        <Image source={require("../../../../../../assets/icons/pencil.png")} style={styles.icon} />
                    </TouchableOpacity>
                </View>
                <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    height={height}
                    openDuration={250}
                    customStyles={{
                        container: {
                       
                        }
                    }}
                >
                    <Header>
                        <Left>
                            <Button onPress={() => {
                                this.RBSheet.close();
                            }} transparent>
                                <Image source={require("../../../../../../assets/icons/go-back.png")} style={styles.headerIcon} />
                            </Button>
                        </Left>
                    <Body>
                        <Title>Post a job</Title>
                        <Subtitle>Create a job listing</Subtitle>
                    </Body>
                    <Right>

                    </Right>
                    </Header>
                    <ScrollView contentContainerStyle={{ paddingBottom: 50 }} style={styles.container}>
                    <KeyboardAwareScrollView>
                        <View style={styles.margin}>
                            <Text style={styles.headerText}>Great! Let's give your job more details</Text>
                            <View style={{ marginTop: 20 }} />
                            <View style={styles.aboveRight}>
                                <Text style={title.length >= 10 ? styles.greenText : styles.redText}>{title.length}/50</Text>
                            </View>
                        <Form>
                            <Text style={styles.label}>Enter a title</Text>
                            <Item success={this.renderSuccess()} error={this.renderErr()} regular>
                                <Input value={title} onChangeText={(value) => {
                                    this.setState({
                                        title: value
                                    })
                                }} placeholderTextColor={"grey"} placeholder='e.g. I need a designer for my hunting companys website' />
                                {this.renderIcon() === null ? null : this.renderIcon() ? <Icon style={{ color: "green" }} name='checkmark-circle' /> : <Icon style={{ color: "red" }} name='close-circle' />}
                            </Item>
                            {title.length === 0 ? null : <Text style={title.length >= 10 ? styles.greenTextTwo : styles.redTextTwo}>Please enter at least 10 charectors</Text>}
                            <View style={{ marginTop: 20 }} />
                            
                            
                            <Text style={{ fontWeight: "bold", marginBottom: 15 }}>A good description includes</Text>
                            <Unorderedlist style={{}}><Text>What the deliverable is</Text></Unorderedlist>
                            <Unorderedlist style={{}}><Text>Type of freelancer or agency you're looking for</Text></Unorderedlist>
                            <Unorderedlist style={{ marginBottom: 30 }}><Text>Anything unique about the project, team, or your company</Text></Unorderedlist>
                            <Text style={styles.label}>Enter a detailed description</Text>
                            <Text style={styles.smallRed}>We will exactract the data from your description and provide relevant "key-words"/tags from the text you provide so please be as detailed as possible with your description.</Text>
                            <View style={styles.aboveRight}>
                                <Text style={description.length >= 100 ? styles.greenText : styles.redText}>{description.length}/5000</Text>
                            </View>
                            <Textarea keyboardType="default" rowSpan={5} bordered value={description} onChangeText={(value) => {
                                this.setState({
                                    description: value
                                })
                            }} placeholderTextColor={"grey"} placeholder='e.g. I need a squarespace developer ALL-STAR.
                            
                            I have a food and health blog that I am always making updates to uploading my latest press and info.... Most of my site has been customized from a template.
                            
                            ' />
                            {description.length === 0 ? null : <Text style={description.length >= 100 ? styles.greenTextTwo : styles.redTextTwo}>Please enter at least 100 charectors</Text>}

                            <TouchableOpacity style={{ maxHeight: 20 }} onPress={() => {
                                Keyboard.dismiss();
                            }} style={styles.dismissText}><Text style={{ textAlign: "center", marginTop: 10 }}>Dismiss Keyboard</Text></TouchableOpacity>
                        </Form>
                        </View>
                        </KeyboardAwareScrollView>
                    </ScrollView>
                    <View style={styles.bottomView}>
                        {this.renderContinuation() ? <AwesomeButtonBlue type={"disabled"} stretch={true}>Submit & Continue</AwesomeButtonBlue> : <AwesomeButtonBlue type={"secondary"} onPress={this.handleSubmission} stretch={true}>Submit & Continue</AwesomeButtonBlue>}
                    </View>
                </RBSheet>
           </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        data: state.jobData.data
    }
}
export default connect(mapStateToProps, { addJobData })(BasicInfoStartJobListingHelperSubComponent);