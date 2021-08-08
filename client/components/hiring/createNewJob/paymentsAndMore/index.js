import React, { Component, Fragment } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Header, Left, Body, Right, Title, Subtitle, Button, Item, Input, Icon, Picker } from 'native-base';
import styles from './styles.js';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import { connect } from 'react-redux';
import { addJobData } from "../../../../actions/jobs/data.js";
import * as Progress from 'react-native-progress';
import LottieView from 'lottie-react-native';
import {
    BarChart
} from "react-native-chart-kit";


const { height, width } = Dimensions.get("window");

const chartConfig = {
    backgroundGradientFrom: "#0057ff",
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "black",
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
    fillShadowGradient: "black",
    fillShadowGradientOpacity: "black"
};

class PaymentsAndMoreHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        data: [],
        timeRequirement: "",
        rate: "",
        fixed: false,
        min: 0,
        max: 0,
        lengthOfProject: "",
        fixedBudget: 0,
        error: "",
        tokensRequired: 0
    }
}
    restart = () => {
        console.log("restart");

        this.props.addJobData({
            page: 1
        })

        setTimeout(() => {
            this.props.props.navigation.navigate("start-a-project-hiring");
        }, 750);
    }
    handleSubmission = () => {
        console.log("handleSubmission clicked");

        const { rate, fixed, timeRequirement, lengthOfProject, min, max, error, fixedBudget, tokensRequired } = this.state;

        if (fixed === false) {
            this.props.addJobData({
                ...this.props.data,
                pricing: {
                    rate,
                    timeRequirement,
                    lengthOfProject,
                    fixedOrHourly: fixed === false ? "hourly" : "fixed",
                    minHourly: min,
                    maxHourly: max
                },
                page: 7,
                tokensRequiredToApply: tokensRequired
            })

            setTimeout(() => {
                this.props.props.navigation.replace("list-a-job-review");
            }, 750)
        } else {
            this.props.addJobData({
                ...this.props.data,
                pricing: {
                    rate,
                    timeRequirement,
                    lengthOfProject,
                    fixedOrHourly: fixed === false ? "hourly" : "fixed",
                    fixedBudgetPrice: fixedBudget
                },
                page: 7,
                tokensRequiredToApply: tokensRequired
            })

            setTimeout(() => {
                this.props.props.navigation.replace("list-a-job-review");
            }, 750)
        }
    }
    renderButtons = () => {
        const { rate, fixed, timeRequirement, lengthOfProject, min, max, error, fixedBudget, tokensRequired } = this.state;

        if (fixed === false) {
            if ((typeof rate !== "undefined" && rate.length > 0) && (typeof lengthOfProject !== "undefined" && lengthOfProject.length > 0) && (typeof timeRequirement !== "undefined" && timeRequirement.length > 0) && (min !== 0 && max !== 0) && (typeof error !== "undefined" && error.length === 0) && tokensRequired !== 0) {
                return <AwesomeButtonBlue borderColor={"#141414"} borderWidth={2} style={{ marginTop: 20 }} type={"secondary"} backgroundColor={"#ffffff"} backgroundPlaceholder={"black"} textColor={"black"} shadowColor={"grey"} onPress={this.handleSubmission} stretch={true}>Submit & Continue</AwesomeButtonBlue>;
            } else {
                return <AwesomeButtonBlue type={"disabled"} stretch={true} onPress={() => {}}>Submit & Continue</AwesomeButtonBlue>;
            }
        } else {
            if ((typeof rate !== "undefined" && rate.length > 0) && (fixedBudget !== 0) && (typeof lengthOfProject !== "undefined" && lengthOfProject.length > 0) && (typeof timeRequirement !== "undefined" && timeRequirement.length > 0) && tokensRequired !== 0) {
                return <AwesomeButtonBlue borderColor={"#141414"} borderWidth={2} style={{ marginTop: 20 }} type={"secondary"} backgroundColor={"#ffffff"} backgroundPlaceholder={"black"} textColor={"black"} shadowColor={"grey"} onPress={this.handleSubmission} stretch={true}>Submit & Continue</AwesomeButtonBlue>;
            } else {
                return <AwesomeButtonBlue type={"disabled"} stretch={true} onPress={() => {}}>Submit & Continue</AwesomeButtonBlue>;
            } 
        }
    }
    renderAdditional = () => {
        if (this.state.fixed === true) {
            return (
                <Fragment>
                    <View style={{ marginTop: 15 }} />
                    <Text style={styles.headerText}>Do you have a specific budget?</Text>
                    <Item style={{ width: "100%" }} regular>
                        <Icon style={{ color: "#ffffff" }} name="attach-money" type="MaterialIcons" />
                        <Input onChangeText={(value) => {
                            this.setState({
                                fixedBudget: Number(value)
                            })
                        }} keyboardType={"number-pad"} returnKeyType={'done'} style={{ textAlign: "right", paddingRight: 10, color: "#ffffff" }} placeholder='0.00' />
                    </Item>
                </Fragment>
            );
        }
    }
    render() {
        console.log(this.state);

        const data = {
            labels: ["$10/hr", "$20/hr", "$30/hr", "$40/hr", "$50/hr", "$60/hr", "$70/hr", "$80/hr", "$90/hr", "$100/hr"],
            datasets: [
              {
                data: [20, 45, 28, 80, 99, 43, 20, 45, 28, 80, 100]
              }
            ]
        };

        const { rate, lengthOfProject, timeRequirement, fixed, min, max, error } = this.state;
        return (
            <Fragment>
                <Header style={{ backgroundColor: "#303030" }}>
                    <Left>
                        <Button onPress={() => {
                            this.props.props.navigation.goBack();
                        }} transparent>
                            <Image source={require("../../../../assets/icons/go-back.png")} style={styles.headerIcon} />
                        </Button>
                    </Left>
                <Body>
                    <Title style={styles.whiteText}>Post Job</Title>
                    <Subtitle style={styles.whiteText}>Payments & More...</Subtitle>
                </Body>
                    <Right>
                        <Button transparent onPress={this.restart}>
                            <Text style={styles.whiteText}>Restart Process</Text>
                        </Button>
                    </Right>
                </Header>
                <Progress.Bar color={"#0057ff"} unfilledColor={"#ffffff"} progress={0.90} width={width} />
                <ScrollView contentContainerStyle={{ paddingBottom: 50 }} style={styles.container}>
                    <View style={styles.margin}>
                        <Text style={styles.headerText}>How would you like to pay your freelancer or agency?</Text>
                        <View style={{ marginTop: 15 }} />
                        <TouchableOpacity onPress={() => {
                            this.setState({
                                rate: "hourly",
                                fixed: false
                            })
                        }} style={rate === "hourly" ? styles.boxedSelected : styles.boxed}>
                            <View style={styles.smallColumn}>
                                <LottieView
                                    ref={animation => {
                                        this.animation = animation;
                                    }} 
                                    style={styles.animation}
                                    autoPlay  
                                    loop 
                                    source={require("../../../../assets/animations/clock.json")}
                                />
                            </View>
                            <View style={styles.largeColumn}>
                                <Text style={rate === "hourly" ? styles.titleSelected : styles.title}>Pay by the hour</Text>
                                <Text style={rate === "hourly" ? styles.blackText : styles.whiteText}>Pay hourly to easily scale up and down</Text>
                                <View style={styles.topRight}>
                                    {rate === "hourly" ? <Image source={require("../../../../assets/icons/selected.png")} style={{ maxWidth: 25, maxHeight: 25, tintColor: "#0057ff" }} /> : <Image source={require("../../../../assets/icons/un-selected.png")} style={{ maxWidth: 25, maxHeight: 25 }} />}
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={{ marginTop: 20 }} />
                        <TouchableOpacity onPress={() => {
                            this.setState({
                                rate: "fixed-rate",
                                fixed: true
                            })
                        }} style={rate === "fixed-rate" ? styles.boxedSelected : styles.boxed}>
                            <View style={styles.smallColumn}>
                                <Image source={require("../../../../assets/icons/price-tag.png")} style={rate === "fixed-rate" ? styles.icon : styles.iconDark} />
                            </View>
                            <View style={styles.largeColumn}>
                                <Text style={rate === "fixed-rate" ? styles.titleSelected : styles.title}>Pay a fixed price</Text>
                                <Text style={rate === "fixed-rate" ? styles.blackText : styles.whiteText}>Define a payment before work begins and pay only when the work is delivered</Text>
                                <View style={styles.topRight}>
                                    {rate === "fixed-rate" ? <Image source={require("../../../../assets/icons/selected.png")} style={{ maxWidth: 25, maxHeight: 25, tintColor: "#0057ff" }} /> : <Image source={require("../../../../assets/icons/un-selected.png")} style={{ maxWidth: 25, maxHeight: 25 }} />}
                                </View>
                            </View>
                        </TouchableOpacity>
                        {this.renderAdditional()}
                    </View>
                    <View style={styles.margin}>
                        <Text style={styles.headerText}>These are other freelancers rates plotted on a bar chart</Text>
                        <View style={{ marginTop: 15 }} />
                        <Text style={{ fontSize: 15, marginLeft: 10 }}>See what other freelancers are charging!</Text>
                    </View>
                    <BarChart
                        showValuesOnTopOfBars={true}
                        style={styles.graphStyle}
                        data={data}
                        width={width}
                        height={300}
                        yAxisLabel=""
                        chartConfig={chartConfig}
                        verticalLabelRotation={30}
                    />
                    {fixed === false ? <View style={styles.margin}>
                        <View style={styles.row}>
                        <Item style={{ width: width * 0.35 }} regular>
                            <Icon style={{ color: "#ffffff" }} name="attach-money" type="MaterialIcons" />
                            <Input value={this.state.min} onChangeText={(value) => {
                                if (value.length === 0) {
                                    this.setState({
                                        min: 0
                                    })
                                } else {
                                    this.setState({
                                        min: Number(value)
                                    })
                                }
                            }} keyboardType={"number-pad"} returnKeyType={'done'} style={{ textAlign: "right", paddingRight: 10, color: "white" }} placeholder='0.00' />
                        </Item>
                        <View style={styles.contain}>
                            <Text style={{ color: "#ffffff" }}> /hr <Text style={{ fontWeight: "bold" }}>to </Text></Text>
                        </View>
                        <Item style={{ width: width * 0.35 }} regular>
                            <Icon style={{ color: "#ffffff" }} name="attach-money" type="MaterialIcons" />
                            <Input value={this.state.max} onChangeText={(value) => {
                                if (value.length === 0) {
                                    this.setState({
                                        max: 0
                                    }, () => {
                                        this.setState({
                                            error: ""
                                        })
                                    })
                                } else {
                                    this.setState({
                                        max: Number(value)
                                    }, () => {
                                        if (min >= this.state.max) {
                                            this.setState({
                                                error: "Maximum number must be greater than the minimum value..."
                                            })
                                        } else {
                                            this.setState({
                                                error: ""
                                            })
                                        }
                                    })
                                }
                            }} keyboardType={"number-pad"} returnKeyType={'done'} style={{ textAlign: "right", paddingRight: 10, color: "#ffffff" }} placeholder='0.00' />
                        </Item>
                        <View style={styles.contain}>
                            <Text style={styles.whiteText}> /hr </Text>
                        </View>
                        </View>
                        {typeof error !== "undefined" && error.length > 0 ? <Text style={styles.redText}>{error}</Text> : null}
                    </View> : null}
                    <View style={styles.margin}>
                    <Text style={styles.headerText}>How long do you expect this project to last?</Text>
                        <TouchableOpacity onPress={() => {
                            this.setState({
                                lengthOfProject: "more-than-6-months"
                            })
                        }} style={lengthOfProject === "more-than-6-months" ? styles.boxedContainerSelected : styles.boxedContainer}>
                            <View style={styles.smallColumnCustom}>
                                <Image source={require("../../../../assets/icons/calendar-6.png")} style={lengthOfProject === "more-than-6-months" ? styles.iconCustomDark : styles.iconCustom} />
                            </View>
                            <View style={styles.larger}>
                                <Text style={lengthOfProject === "more-than-6-months" ? styles.boldDark : styles.bold}>More than 6 months</Text>
                               
                            </View>
                            <Image source={require("../../../../assets/icons/un-selected.png")} style={lengthOfProject === "more-than-6-months" ? [styles.absoluteRight, { tintColor: "#0057ff" }] : styles.absoluteRight} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            this.setState({
                                lengthOfProject: "3-6-months"
                            })
                        }} style={lengthOfProject === "3-6-months" ? styles.boxedContainerSelected : styles.boxedContainer}>
                            <View style={styles.smallColumnCustom}>
                                <Image source={require("../../../../assets/icons/calendar-3.png")} style={lengthOfProject === "3-6-months" ? styles.iconCustomDark : styles.iconCustom} />
                            </View>
                            <View style={styles.larger}>
                                <Text style={lengthOfProject === "3-6-months" ? styles.boldDark : styles.bold}>3 to 6 months</Text>
                               
                            </View>
                            <Image source={require("../../../../assets/icons/un-selected.png")} style={lengthOfProject === "3-6-months" ? [styles.absoluteRight, { tintColor: "#0057ff" }] : styles.absoluteRight} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            this.setState({
                                lengthOfProject: "1-3-months"
                            })
                        }} style={lengthOfProject === "1-3-months" ? styles.boxedContainerSelected : styles.boxedContainer}>
                            <View style={styles.smallColumnCustom}>
                                <Image source={require("../../../../assets/icons/calendar-3.png")} style={lengthOfProject === "1-3-months" ? styles.iconCustomDark : styles.iconCustom} />
                            </View>
                            <View style={styles.larger}>
                                <Text style={lengthOfProject === "1-3-months" ? styles.boldDark : styles.bold}>1 to 3 months</Text>
                               
                            </View>
                            <Image source={require("../../../../assets/icons/un-selected.png")} style={lengthOfProject === "1-3-months" ? [styles.absoluteRight, { tintColor: "#0057ff" }] : styles.absoluteRight} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            this.setState({
                                lengthOfProject: "less-than-1-month"
                            })
                        }} style={lengthOfProject === "less-than-1-month" ? styles.boxedContainerSelected : styles.boxedContainer}>
                            <View style={styles.smallColumnCustom}>
                                <Image source={require("../../../../assets/icons/calendar.png")} style={lengthOfProject === "less-than-1-month" ? styles.iconCustomDark : styles.iconCustom} />
                            </View>
                            <View style={styles.larger}>
                                <Text style={lengthOfProject === "less-than-1-month" ? styles.boldDark : styles.bold}>Less than 1 month</Text>
                               
                            </View>
                            <Image source={require("../../../../assets/icons/un-selected.png")} style={lengthOfProject === "less-than-1-month" ? [styles.absoluteRight, { tintColor: "#0057ff" }] : styles.absoluteRight} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.margin}>
                        <Text style={styles.headerText}>Do you have a time requirement for this project?</Text>
                        <View style={{ marginTop: 15 }} />
                        <TouchableOpacity onPress={() => {
                            this.setState({
                                timeRequirement: "more-than-30-hours-week"
                            })
                        }} style={timeRequirement === "more-than-30-hours-week" ? styles.boxedContainerSelected : styles.boxedContainer}>
                            <View style={styles.smallColumnCustom}>
                                <Image source={require("../../../../assets/icons/calendar-3.png")} style={timeRequirement === "more-than-30-hours-week" ? styles.iconCustomDark : styles.iconCustom} />
                            </View>
                            <View style={styles.larger}>
                                <Text style={timeRequirement === "more-than-30-hours-week" ? styles.boldDark : styles.bold}>More than 30 hours a week</Text>
                               
                            </View>
                            <Image source={require("../../../../assets/icons/un-selected.png")} style={timeRequirement === "more-than-30-hours-week" ? [styles.absoluteRight, { tintColor: "#0057ff" }] : styles.absoluteRight} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            this.setState({
                                timeRequirement: "less-than-30-hours-week"
                            })
                        }} style={timeRequirement === "less-than-30-hours-week" ? styles.boxedContainerSelected : styles.boxedContainer}>
                            <View style={styles.smallColumnCustom}>
                                <Image source={require("../../../../assets/icons/calendar-3.png")} style={timeRequirement === "less-than-30-hours-week" ? styles.iconCustomDark : styles.iconCustom} />
                            </View>
                            <View style={styles.larger}>
                                <Text style={timeRequirement === "less-than-30-hours-week" ? styles.boldDark : styles.bold}>Less than 30 hours a week</Text>
                               
                            </View>
                            <Image source={require("../../../../assets/icons/un-selected.png")} style={timeRequirement === "less-than-30-hours-week" ? [styles.absoluteRight, { tintColor: "#0057ff" }] : styles.absoluteRight} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            this.setState({
                                timeRequirement: "unknown"
                            })
                        }} style={timeRequirement === "unknown" ? styles.boxedContainerSelected : styles.boxedContainer}>
                            <View style={styles.smallColumnCustom}>
                                <Image source={require("../../../../assets/icons/calendar.png")} style={timeRequirement === "unknown" ? styles.iconCustomDark : styles.iconCustom} />
                            </View>
                            <View style={styles.larger}>
                                <Text style={timeRequirement === "unknown" ? styles.boldDark : styles.bold}>I don't know yet</Text>
                               
                            </View>
                            <Image source={require("../../../../assets/icons/un-selected.png")} style={timeRequirement === "unknown" ? [styles.absoluteRight, { tintColor: "#0057ff" }] : styles.absoluteRight} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.margin}>
                        <Text style={styles.headerText}>Select how many "Tokens/Credits" are required to apply for your listing</Text>
                        <View style={{ backgroundColor: "#ffffff" }}>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            style={{ width: "100%" }}
                            placeholder="Select token amount..."
                            placeholderStyle={{ color: "black" }}
                            placeholderIconColor="darkred"
                            selectedValue={this.state.tokensRequired}
                            onValueChange={(value) => {
                                this.setState({
                                    tokensRequired: value
                                })
                            }}
                        >
                            <Picker.Item label="2 Tokens" value={2} />
                            <Picker.Item label="3 Tokens" value={3} />
                            <Picker.Item label="4 Tokens" value={4} />
                            <Picker.Item label="5 Tokens" value={5} />
                            <Picker.Item label="6 Tokens" value={6} />
                        </Picker>
                        </View>
                    </View>
                    <View style={styles.margin}>
                        {this.renderButtons()}
                    </View>
                </ScrollView>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        data: state.jobData.data
    };
}
export default connect(mapStateToProps, { addJobData })(PaymentsAndMoreHelper);