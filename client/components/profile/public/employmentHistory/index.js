import React, { Component, Fragment } from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView, Keyboard } from 'react-native';
import { Header, Left, Body, Button, Right, Title, Subtitle, Footer, FooterTab, Icon, Item, Input, Textarea } from 'native-base';
import styles from './styles.js';
import Autocomplete from "react-native-autocomplete-input";
import Config from 'react-native-config';
import axios from 'axios';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Switch } from 'react-native-switch';
import moment from 'moment';
import { connect } from "react-redux";
import Toast from 'react-native-toast-message';


class EmploymentHistoryCreateHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        location: [],
        companyName: "",
        query: "",
        selected: null,
        hideOrNot: false,
        full: null,
        start: null,
        end: null,
        isDatePickerVisible: false,
        isDatePickerVisibleEnd: false,
        switched: false,
        title: ""
    }
}
    saveInformation = () => {
        console.log("saveInformation clicked");

        const { companyName, description, end, start, full, selected, switched, title } = this.state;

        if (switched === true) {
            if ((typeof companyName !== "undefined" && companyName.length > 0) && (typeof description !== "undefined" && description.length > 0) && (start !== null) && (full !== null) && (typeof title !== "undefined" && title.length > 0)) {
                axios.post(`${Config.ngrok_url}/upload/employment/history`, {
                    companyName, 
                    description, 
                    employmentEndDate: "N/A", 
                    employmentStartDate: start, 
                    location: full, 
                    fullLocation: selected, 
                    currentlyWorkingWithEmployer: switched === true ? "Yes" : "No", 
                    jobTitle: title,
                    id: this.props.unique_id
                }).then((res) => {
                    if (res.data.message === "Uploaded content!") {
                        console.log(res.data); 
    
                        this.setState({
                            location: [],
                            companyName: "",
                            query: "",
                            selected: null,
                            hideOrNot: true,
                            full: null,
                            start: null,
                            end: null,
                            switched: false,
                            title: "",
                            description: ""
                        }, () => {
                            Toast.show({
                                text1: 'Successfully updated employment history!',
                                text2: 'Successfully updated content and employment data, your information is now live!',
                                position: "top",
                                visibilityTime: 4500,
                                type: "success"
                            });
                        })
                    } else {
                        console.log("Err", res.data);
                    }
                }).catch((err) => {
                    console.log(err);
                })
            } else {
                Toast.show({
                    text1: 'Please complete the required fields!',
                    text2: 'Please complete each and every field in the form before submitting the data!',
                    position: "top",
                    visibilityTime: 4500,
                    type: "error"
                });
            }
        } else {
            if ((typeof companyName !== "undefined" && companyName.length > 0) && (typeof description !== "undefined" && description.length > 0) && (end !== null && start !== null) && (full !== null) && (typeof title !== "undefined" && title.length > 0)) {
                axios.post(`${Config.ngrok_url}/upload/employment/history`, {
                    companyName, 
                    description, 
                    employmentEndDate: end, 
                    employmentStartDate: start, 
                    location: full, 
                    fullLocation: selected, 
                    currentlyWorkingWithEmployer: switched === true ? "Yes" : "No", 
                    jobTitle: title,
                    id: this.props.unique_id
                }).then((res) => {
                    if (res.data.message === "Uploaded content!") {
                        console.log(res.data); 
    
                        this.setState({
                            location: [],
                            companyName: "",
                            query: "",
                            selected: null,
                            hideOrNot: true,
                            full: null,
                            start: null,
                            end: null,
                            switched: false,
                            title: "",
                            description: ""
                        }, () => {
                            Toast.show({
                                text1: 'Successfully updated employment history!',
                                text2: 'Successfully updated content and employment data, your information is now live!',
                                position: "top",
                                visibilityTime: 4500,
                                type: "success"
                            });
                        })
                    } else {
                        console.log("Err", res.data);
                    }
                }).catch((err) => {
                    console.log(err);
                })
            } else {
                Toast.show({
                    text1: 'Please complete the required fields!',
                    text2: 'Please complete each and every field in the form before submitting the data!',
                    position: "top",
                    visibilityTime: 4500,
                    type: "error"
                });
            }
        }
    } 
    clearInputs = () => {
        this.setState({
            location: [],
            companyName: "",
            query: "",
            selected: null,
            hideOrNot: true,
            full: null,
            start: null,
            end: null,
            switched: false,
            title: "",
            description: ""
        })
    }
    handleSearch = (value) => {
        const configggg = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                'Content-Type': 'application/json'
            }
        }

        axios.get(`https://api.tomtom.com/search/2/search/${value.toLowerCase()}.json?key=${Config.tomtom_api_key}&language=en-US`).then((res) => {
            console.log(res.data);

            const { results } = res.data;

            this.setState({
                location: results
            })
        }).catch((err) => {
            console.log("ERRRRRRR", err);
        })
    }
    hideDatePicker = () => {
        this.setState({
            isDatePickerVisible: false
        })
    }
    handleConfirm = (date) => {
        console.log("date", date);

        this.setState({
            start: moment(date).format("dddd, MMMM Do YYYY"),
            isDatePickerVisible: false
        })
    }
    hideDatePickerEnd = () => {
        this.setState({
            isDatePickerVisibleEnd: false
        })
    }
    handleConfirmEnd = (date) => {
        console.log("date", date);

        this.setState({
            end: moment(date).format("dddd, MMMM Do YYYY"),
            isDatePickerVisibleEnd: false
        })
    }

    render() {
        console.log("this.state. employmentHistory", this.state);

        const { start, end, switched } = this.state;
        return (
            <Fragment>
                <Header>
                    <Left>
                        <Button onPress={() => {
                            this.props.props.navigation.push("public-profile-main");
                        }} transparent>
                            <Image source={require("../../../../assets/icons/go-back.png")} style={styles.headerIcon} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Employment</Title>
                        <Subtitle>Employment History</Subtitle>
                    </Body>
                    <Right />
                </Header>
                <Toast ref={(ref) => Toast.setRef(ref)} />
                <ScrollView contentContainerStyle={{ paddingBottom: 50 }} style={styles.container}>
                    <View style={styles.margin}>
                        <Text style={styles.label}>Company Name</Text>
                        <Item regular>
                            <Input value={this.state.companyName} placeholderTextColor={"grey"} onChangeText={(value) => {
                                this.setState({
                                    companyName: value
                                })
                            }} placeholder={"Company Name"} />
                        </Item>
                        <View style={styles.hr} />
                        <Text style={styles.label}>Location</Text>
                        <Autocomplete 
                            placeholderTextColor={"grey"}
                            placeholder={"City"}
                            data={this.state.location}
                            defaultValue={this.state.query} 
                            hideResults={this.state.hideOrNot} 
                            onChangeText={(text) => {
                                this.setState({ 
                                    query: text,
                                    hideOrNot: false 
                                }, () => { 
                                    this.handleSearch(this.state.query) 
                                });
                            }}
                            renderItem={({ item, i }) => (
                                <TouchableOpacity style={styles.listItemTwo} onPress={() => {
                                    this.setState({
                                        selected: item.address.freeformAddress,
                                        hideOrNot: true,
                                        full: item
                                    }, () => {
                                        Keyboard.dismiss();
                                    })
                                }}>
                                <Text style={{ color: "black", fontWeight: "bold" }}>{item.address.freeformAddress}</Text>
                            </TouchableOpacity>
                            )}
                        />
                        <View style={styles.hr} />
                        <Text style={styles.label}>Title</Text>
                        <Item regular>
                            <Input value={this.state.title} onChangeText={(value) => {
                                this.setState({
                                    title: value
                                })
                            }} placeholder={"Title"} placeholderTextColor={"grey"} />
                        </Item>
                        <View style={styles.hr} />
                        <View style={styles.row}>
                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    isDatePickerVisible: true
                                })
                            }} style={styles.boxed}>
                                {start === null ? <Text>Select Start Date</Text> : <Text>{start}</Text>}
                            </TouchableOpacity>
                            {switched === false ? <TouchableOpacity onPress={() => {
                                this.setState({
                                    isDatePickerVisibleEnd: true
                                })
                            }} style={styles.boxed}>
                                {end === null ? <Text>Select End Date</Text> : <Text>{end}</Text>}
                            </TouchableOpacity> : null}
                        </View>
                        <View style={styles.hr} />
                           <View style={styles.centered}>
                                <Text style={styles.label}>I currently work here</Text>
                                <Switch
                                    value={this.state.switched}
                                    onValueChange={(val) => {                                
                                        this.setState({
                                            switched: val,
                                            end: null
                                        })
                                    }}
                                    disabled={false}
                                    activeText={'YES'}
                                    inActiveText={"NO"}
                                    circleSize={30}
                                    barHeight={30}
                                    circleBorderWidth={5}
                                    backgroundActive={'green'}
                                    backgroundInactive={'gray'}
                                    circleActiveColor={'#30a566'}
                                    circleInActiveColor={'white'}
                                    changeValueImmediately={true}
                                />
                           </View>
                        <View style={styles.hr} />  
                        <Textarea onChangeText={(value) => {
                            this.setState({
                                description: value
                            })
                        }} placeholder={"Enter your job description here..."} value={this.state.description} placeholderTextColor={"grey"} rowSpan={5} bordered />
                    </View>
                    <DateTimePickerModal
                        isVisible={this.state.isDatePickerVisible}
                        mode="date"
                        onConfirm={this.handleConfirm}
                        onCancel={this.hideDatePicker}
                    />
                    <DateTimePickerModal
                        isVisible={this.state.isDatePickerVisibleEnd}
                        mode="date"
                        onConfirm={this.handleConfirmEnd}
                        onCancel={this.hideDatePickerEnd}
                    />
                </ScrollView>
                <Footer>
                    <FooterTab>
                        <Button onPress={this.clearInputs} vertical>
                            <Icon name="close" />
                            <Text>Clear Inputs</Text>
                        </Button>
                        <Button onPress={this.saveInformation} vertical>
                            <Icon style={{ color: "blue" }} name="save" />
                            <Text style={{ color: "blue" }}>Save Job</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.signupData.authData.unique_id
    }
}
export default connect(mapStateToProps, { })(EmploymentHistoryCreateHelper);