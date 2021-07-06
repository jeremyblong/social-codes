import React, { Component, Fragment } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Header, Left, Body, Right, Button, Icon, Title, Subtitle, Item, Input } from 'native-base';
import styles from './styles.js';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import moment from "moment";
import axios from "axios";
import Config from "react-native-config";
import { connect } from "react-redux";
import Toast from 'react-native-toast-message';
import { Switch } from 'react-native-switch';




class CreateHoursMainHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        isVisible: false,
        selectedDay: "",
        isVisibleEnd: false,
        switchValue: false,
        schedule: {
            mondayStart: null,
            mondayEnd: null,
            tuesdayStart: null,
            tuesdayEnd: null,
            wednesdayStart: null,
            wednesdayEnd: null,
            thursdayStart: null,
            thursdayEnd: null,
            fridayStart: null,
            fridayEnd: null,
            saturdayStart: null,
            saturdayEnd: null,
            sundayStart: null,
            sundayEnd: null
        }
    }
}
    handleConfirmation = (date) => {
        console.log("date", date);

        const { selectedDay } = this.state;

        switch (selectedDay) {
            case "sunday":
                this.setState({
                    schedule: {
                        ...this.state.schedule,
                        sundayStart: moment(date).format("h:mm a")
                    },
                    isVisible: false
                })
                break;
            case "monday":
                this.setState({
                    schedule: {
                        ...this.state.schedule,
                        mondayStart: moment(date).format("h:mm a")
                    },
                    isVisible: false
                })
                break;
            case "tuesday":
                this.setState({
                    schedule: {
                        ...this.state.schedule,
                        tuesdayStart: moment(date).format("h:mm a")
                    },
                    isVisible: false
                })
                break;
            case "wednesday":
                this.setState({
                    schedule: {
                        ...this.state.schedule,
                        wednesdayStart: moment(date).format("h:mm a")
                    },
                    isVisible: false
                })
                break;
            case "thursday":
                this.setState({
                    schedule: {
                        ...this.state.schedule,
                        thursdayStart: moment(date).format("h:mm a")
                    },
                    isVisible: false
                })
                break;
            case "friday":
                this.setState({
                    schedule: {
                        ...this.state.schedule,
                        fridayStart: moment(date).format("h:mm a")
                    },
                    isVisible: false
                })
                break;
            case "saturday":
                this.setState({
                    schedule: {
                        ...this.state.schedule,
                        saturdayStart: moment(date).format("h:mm a")
                    },
                    isVisible: false
                })
                break;
            default:
                break;
        }
    }
    handleConfirmationEnd = (date) => {
        console.log("date", date);

        const { selectedDay } = this.state;

        switch (selectedDay) {
            case "sunday":
                this.setState({
                    schedule: {
                        ...this.state.schedule,
                        sundayEnd: moment(date).format("h:mm a")
                    },
                    isVisibleEnd: false
                })
                break;
            case "monday":
                this.setState({
                    schedule: {
                        ...this.state.schedule,
                        mondayEnd: moment(date).format("h:mm a")
                    },
                    isVisibleEnd: false
                })
                break;
            case "tuesday":
                this.setState({
                    schedule: {
                        ...this.state.schedule,
                        tuesdayEnd: moment(date).format("h:mm a")
                    },
                    isVisibleEnd: false
                })
                break;
            case "wednesday":
                this.setState({
                    schedule: {
                        ...this.state.schedule,
                        wednesdayEnd: moment(date).format("h:mm a")
                    },
                    isVisibleEnd: false
                })
                break;
            case "thursday":
                this.setState({
                    schedule: {
                        ...this.state.schedule,
                        thursdayEnd: moment(date).format("h:mm a")
                    },
                    isVisibleEnd: false
                })
                break;
            case "friday":
                this.setState({
                    schedule: {
                        ...this.state.schedule,
                        fridayEnd: moment(date).format("h:mm a")
                    },
                    isVisibleEnd: false
                })
                break;
            case "saturday":
                this.setState({
                    schedule: {
                        ...this.state.schedule,
                        saturdayEnd: moment(date).format("h:mm a")
                    },
                    isVisibleEnd: false
                })
                break;
            default:
                break;
        }
    }
    renderConditional = () => {
        const comparrison = Object.values(this.state.schedule).every((item) => item !== null);

        if (comparrison) {
            return true;
        } else {
            return false;
        }
    }
    handleSubmissionToDatabase = () => {
        console.log("handleSubmissionToDatabase clicked");

        axios.post(`${Config.ngrok_url}/upload/hours/schedule`, {
            id: this.props.unique_id,
            schedule: this.state.schedule
        }).then((res) => {
            if (res.data.message === "Uploaded hours!") {
                console.log(res.data);

                this.setState({
                    schedule: {
                        mondayStart: null,
                        mondayEnd: null,
                        tuesdayStart: null,
                        tuesdayEnd: null,
                        wednesdayStart: null,
                        wednesdayEnd: null,
                        thursdayStart: null,
                        thursdayEnd: null,
                        fridayStart: null,
                        fridayEnd: null,
                        saturdayStart: null,
                        saturdayEnd: null,
                        sundayStart: null,
                        sundayEnd: null
                    }
                }, () => {
                    Toast.show({
                        text1: "Successfully updated your publicly visible hours!",
                        text2: "Successfully updated your hours and they are now being shown on your profile...",
                        type: "success",
                        position: "top",
                        visibilityTime: 4500
                    })
                })
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    render() {
        console.log("this.state - createHoursMain.js", this.state);
        
        const { schedule } = this.state;

        return (
            <Fragment>
                <Header>
                    <Left>
                        <Button onPress={() => {
                            this.props.props.navigation.goBack();
                        }} transparent>
                            <Image source={require("../../../../assets/icons/go-back.png")} style={styles.headerIcon} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Hours/Schedule</Title>
                        <Subtitle>Hours, Schedule and more...</Subtitle>
                    </Body>
                    <Right />
                </Header>
                <DateTimePickerModal
                    isVisible={this.state.isVisible}
                    mode="time"
                    onConfirm={(date) => {
                        this.handleConfirmation(date, this.state.selectedDay);
                    }}
                    onCancel={() => {
                        this.setState({
                            isVisible: false
                        })
                    }}
                />
                <DateTimePickerModal
                    isVisible={this.state.isVisibleEnd}
                    mode="time"
                    onConfirm={(date) => {
                        this.handleConfirmationEnd(date, this.state.selectedDay);
                    }}
                    onCancel={() => {
                        this.setState({
                            isVisibleEnd: false
                        })
                    }}
                />
                <Toast ref={(ref) => Toast.setRef(ref)} />
                <ScrollView contentContainerStyle={{ paddingBottom: 50 }} style={styles.container}>
                    <View style={styles.margin}>
                        <View style={styles.centered}>
                        <Text style={styles.switchText}>Would you like to set dates to "all the same" for each day of the week?</Text>
                        <Switch
                            value={this.state.switchValue}
                            onValueChange={(val) => {
                                this.setState({
                                    switchValue: val
                                })
                            }}
                            disabled={false}
                            activeText={'On'}
                            inActiveText={'Off'}
                            circleSize={30}
                            barHeight={30}
                            circleBorderWidth={3}
                            backgroundActive={'green'}
                            backgroundInactive={'gray'}
                            circleActiveColor={'#30a566'}
                            circleInActiveColor={'#000000'}
                            changeValueImmediately={true}
                        />
                        <View style={{ marginTop: 15 }} />
                        {this.state.switchValue === true ? <View style={styles.row}>
                            <View style={styles.columnCustom}>
                                <Item regular>
                                    <Input placeholder='Start Time' />
                                </Item>
                            </View>
                            <View style={styles.columnCustom}>
                                <Item regular>
                                    <Input placeholder='End Time' />
                                </Item>
                            </View>
                        </View> : null}
                        <View style={{ marginTop: 15 }} />
                        </View>
                        <Text style={styles.headerText}>Sunday Hours</Text>
                        <View style={styles.row}>
                            <View style={styles.columnHalf}>
                                {schedule.sundayStart === null ? <AwesomeButtonBlue type={"secondary"} onPress={() => {
                                    this.setState({
                                        selectedDay: "sunday",
                                        isVisible: true
                                    })
                                }} stretch={true} backgroundColor={"blue"} textColor={"white"}>Start Time</AwesomeButtonBlue> : <AwesomeButtonBlue type={"secondary"} backgroundDarker={"brown"} onPress={() => {
                                    this.setState({
                                        selectedDay: "sunday",
                                        isVisible: true
                                    })
                                }} stretch={true} backgroundColor={"green"} textColor={"white"}>Start Time</AwesomeButtonBlue>}
                            </View>
                            <View style={styles.columnHalf}>
                                {schedule.sundayEnd === null ? <AwesomeButtonBlue type={"secondary"} onPress={() => {
                                    this.setState({
                                        selectedDay: "sunday",
                                        isVisibleEnd: true
                                    })
                                }} stretch={true} backgroundColor={"lightblue"} textColor={"black"}>End Time</AwesomeButtonBlue> : <AwesomeButtonBlue type={"secondary"} onPress={() => {
                                    this.setState({
                                        selectedDay: "sunday",
                                        isVisibleEnd: true
                                    })
                                }} stretch={true} backgroundColor={"green"} backgroundDarker={"brown"} textColor={"white"}>End Time</AwesomeButtonBlue>}
                            </View>
                        </View>
                        <Text style={styles.headerText}>Monday Hours</Text>
                        <View style={styles.row}>
                            <View style={styles.columnHalf}>
                                {schedule.mondayStart === null ? <AwesomeButtonBlue type={"secondary"} onPress={() => {
                                    this.setState({
                                        selectedDay: "monday",
                                        isVisible: true
                                    })  
                                }} stretch={true} backgroundColor={"blue"} textColor={"white"}>Start Time</AwesomeButtonBlue> : <AwesomeButtonBlue backgroundDarker={"brown"} type={"secondary"} onPress={() => {
                                    this.setState({
                                        selectedDay: "monday",
                                        isVisible: true
                                    })  
                                }} stretch={true} backgroundColor={"green"} textColor={"white"}>Start Time</AwesomeButtonBlue>}
                            </View>
                            <View style={styles.columnHalf}>
                                {schedule.mondayEnd === null ? <AwesomeButtonBlue type={"secondary"} onPress={() => {
                                    this.setState({
                                        selectedDay: "monday",
                                        isVisibleEnd: true
                                    })
                                }} stretch={true} backgroundColor={"lightblue"} textColor={"black"}>End Time</AwesomeButtonBlue> : <AwesomeButtonBlue type={"secondary"} onPress={() => {
                                    this.setState({
                                        selectedDay: "monday",
                                        isVisibleEnd: true
                                    })
                                }} stretch={true} backgroundColor={"green"} backgroundDarker={"brown"} textColor={"white"}>End Time</AwesomeButtonBlue>}
                            </View>
                        </View>
                        <Text style={styles.headerText}>Tuesday Hours</Text>
                        <View style={styles.row}>
                            <View style={styles.columnHalf}>
                                {schedule.tuesdayStart === null ? <AwesomeButtonBlue type={"secondary"} onPress={() => {
                                    this.setState({
                                        selectedDay: "tuesday",
                                        isVisible: true
                                    }) 
                                }} stretch={true} backgroundColor={"blue"} textColor={"white"}>Start Time</AwesomeButtonBlue> : <AwesomeButtonBlue type={"secondary"} onPress={() => {
                                    this.setState({
                                        selectedDay: "tuesday",
                                        isVisible: true
                                    }) 
                                }} stretch={true} backgroundColor={"green"} backgroundDarker={"brown"} textColor={"white"}>Start Time</AwesomeButtonBlue>}
                            </View>
                            <View style={styles.columnHalf}>
                                {schedule.tuesdayEnd === null ? <AwesomeButtonBlue type={"secondary"} onPress={() => {
                                    this.setState({
                                        selectedDay: "tuesday",
                                        isVisibleEnd: true
                                    })
                                }} stretch={true} backgroundColor={"lightblue"} textColor={"black"}>End Time</AwesomeButtonBlue> : <AwesomeButtonBlue type={"secondary"} onPress={() => {
                                    this.setState({
                                        selectedDay: "tuesday",
                                        isVisibleEnd: true
                                    }) 
                                }} stretch={true} backgroundColor={"green"} backgroundDarker={"brown"} textColor={"white"}>End Time</AwesomeButtonBlue>}
                            </View>
                        </View>
                        <Text style={styles.headerText}>Wednesday Hours</Text>
                        <View style={styles.row}>
                            <View style={styles.columnHalf}>
                                {schedule.wednesdayStart === null ? <AwesomeButtonBlue type={"secondary"} onPress={() => {
                                    this.setState({
                                        selectedDay: "wednesday",
                                        isVisible: true
                                    }) 
                                }} stretch={true} backgroundColor={"blue"} textColor={"white"}>Start Time</AwesomeButtonBlue> : <AwesomeButtonBlue type={"secondary"} onPress={() => {
                                    this.setState({
                                        selectedDay: "wednesday",
                                        isVisible: true
                                    }) 
                                }} stretch={true} backgroundColor={"green"} backgroundDarker={"brown"} textColor={"white"}>Start Time</AwesomeButtonBlue>}
                            </View>
                            <View style={styles.columnHalf}>
                                {schedule.wednesdayEnd === null ? <AwesomeButtonBlue type={"secondary"} onPress={() => {
                                    this.setState({
                                        selectedDay: "wednesday",
                                        isVisibleEnd: true
                                    })
                                }} stretch={true} backgroundColor={"lightblue"} textColor={"black"}>End Time</AwesomeButtonBlue> : <AwesomeButtonBlue type={"secondary"} onPress={() => {
                                    this.setState({
                                        selectedDay: "wednesday",
                                        isVisibleEnd: true
                                    }) 
                                }} stretch={true} backgroundColor={"green"} backgroundDarker={"brown"} textColor={"white"}>End Time</AwesomeButtonBlue>}
                            </View>
                        </View>
                        <Text style={styles.headerText}>Thursday Hours</Text>
                        <View style={styles.row}>
                            <View style={styles.columnHalf}>
                                {schedule.thursdayStart === null ? <AwesomeButtonBlue type={"secondary"} onPress={() => {
                                    this.setState({
                                        selectedDay: "thursday",
                                        isVisible: true
                                    }) 
                                }} stretch={true} backgroundColor={"blue"} textColor={"white"}>Start Time</AwesomeButtonBlue> : <AwesomeButtonBlue type={"secondary"} onPress={() => {
                                    this.setState({
                                        selectedDay: "thursday",
                                        isVisible: true
                                    }) 
                                }} stretch={true} backgroundColor={"green"} backgroundDarker={"brown"} textColor={"white"}>Start Time</AwesomeButtonBlue>}
                            </View>
                            <View style={styles.columnHalf}>
                                {schedule.thursdayEnd === null ? <AwesomeButtonBlue type={"secondary"} onPress={() => {
                                    this.setState({
                                        selectedDay: "thursday",
                                        isVisibleEnd: true
                                    })
                                }} stretch={true} backgroundColor={"lightblue"} textColor={"black"}>End Time</AwesomeButtonBlue> : <AwesomeButtonBlue type={"secondary"} onPress={() => {
                                    this.setState({
                                        selectedDay: "thursday",
                                        isVisibleEnd: true
                                    }) 
                                }} stretch={true} backgroundColor={"green"} backgroundDarker={"brown"} textColor={"white"}>End Time</AwesomeButtonBlue>}
                            </View>
                        </View>
                        <Text style={styles.headerText}>Friday Hours</Text>
                        <View style={styles.row}>
                            <View style={styles.columnHalf}>
                                {schedule.fridayStart === null ? <AwesomeButtonBlue type={"secondary"} onPress={() => {
                                    this.setState({
                                        selectedDay: "friday",
                                        isVisible: true
                                    }) 
                                }} stretch={true} backgroundColor={"blue"} textColor={"white"}>Start Time</AwesomeButtonBlue> : <AwesomeButtonBlue type={"secondary"} onPress={() => {
                                    this.setState({
                                        selectedDay: "friday",
                                        isVisible: true
                                    }) 
                                }} stretch={true} backgroundColor={"green"} backgroundDarker={"brown"} textColor={"white"}>Start Time</AwesomeButtonBlue>}
                            </View>
                            <View style={styles.columnHalf}>
                                {schedule.fridayEnd === null ? <AwesomeButtonBlue type={"secondary"} onPress={() => {
                                    this.setState({
                                        selectedDay: "friday",
                                        isVisibleEnd: true
                                    })
                                }} stretch={true} backgroundColor={"lightblue"} textColor={"black"}>End Time</AwesomeButtonBlue> : <AwesomeButtonBlue type={"secondary"} onPress={() => {
                                    this.setState({
                                        selectedDay: "friday",
                                        isVisibleEnd: true
                                    }) 
                                }} stretch={true} backgroundColor={"green"} backgroundDarker={"brown"} textColor={"white"}>End Time</AwesomeButtonBlue>}
                            </View>
                        </View>
                        <Text style={styles.headerText}>Saturday Hours</Text>
                        <View style={styles.row}>
                            <View style={styles.columnHalf}>
                                {schedule.saturdayStart === null ? <AwesomeButtonBlue type={"secondary"} onPress={() => {
                                    this.setState({
                                        selectedDay: "saturday",
                                        isVisible: true
                                    }) 
                                }} stretch={true} backgroundColor={"blue"} textColor={"white"}>Start Time</AwesomeButtonBlue> : <AwesomeButtonBlue type={"secondary"} onPress={() => {
                                    this.setState({
                                        selectedDay: "saturday",
                                        isVisible: true
                                    }) 
                                }} stretch={true} backgroundColor={"green"} backgroundDarker={"brown"} textColor={"white"}>Start Time</AwesomeButtonBlue>}
                            </View>
                            <View style={styles.columnHalf}>
                                {schedule.saturdayEnd === null ? <AwesomeButtonBlue type={"secondary"} onPress={() => {
                                    this.setState({
                                        selectedDay: "saturday",
                                        isVisibleEnd: true
                                    })
                                }} stretch={true} backgroundColor={"lightblue"} textColor={"black"}>End Time</AwesomeButtonBlue> : <AwesomeButtonBlue type={"secondary"} onPress={() => {
                                    this.setState({
                                        selectedDay: "saturday",
                                        isVisibleEnd: true
                                    }) 
                                }} stretch={true} backgroundColor={"green"} backgroundDarker={"brown"} textColor={"white"}>End Time</AwesomeButtonBlue>}
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.absoluteBottom}>
                    {this.renderConditional() ? <AwesomeButtonBlue type={"secondary"} onPress={() => {
                        this.handleSubmissionToDatabase();
                    }} stretch={true}>Submit Hours & Continue</AwesomeButtonBlue> : <AwesomeButtonBlue type={"disabled"} onPress={() => {}} stretch={true}>Submit Hours & Continue</AwesomeButtonBlue>}
                </View>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.signupData.authData.unique_id
    }
}
export default connect(mapStateToProps, { })(CreateHoursMainHelper);