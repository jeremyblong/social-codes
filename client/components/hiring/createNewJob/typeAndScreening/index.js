import React, { Component, Fragment } from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { Header, Left, Body, Right, Title, Subtitle, Button, List, ListItem, Icon, Item, Textarea } from 'native-base';
import styles from './styles.js';
import * as Progress from 'react-native-progress';
import RBSheet from "react-native-raw-bottom-sheet";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Switch } from 'react-native-switch';
import AwesomeButtonCartman from 'react-native-really-awesome-button/src/themes/cartman';
import { connect } from 'react-redux';
import { addJobData } from "../../../../actions/jobs/data.js";

const { height, width } = Dimensions.get("window");


class TypeOfProjectAndScreeningHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        selected: "",
        switched: false,
        count: 0,
        questions: [{
            title: "Do you have any questions about the job description?",
            selected: false,
            index: 0
        }, {
            title: "Do you have any suggestions to make this project run successfully?",
            index: 1,
            selected: false
        }, {
            title: "What challenging part of this job are you most experienced in?",
            index: 2,
            selected: false
        }, {
            title: "What part of this project most appeals to you?",
            index: 3,
            selected: false
        }, {
            title: "What past project or job have you had that is most like this one and why?",
            index: 4,
            selected: false
        }, {
            title: "What questions do you have about the project?",
            index: 5,
            selected: false
        }, {
            title: "Which of the required job skills do you feel you are strongest at?",
            index: 6,
            selected: false
        }, {
            title: "Which part of this project do you think will take the most time?",
            index: 7,
            selected: false
        }, {
            title: "Why did you apply to this particular job?",
            index: 8,
            selected: false
        }, {
            title: "Why do you think you are a good fit for this particular project?",
            index: 9,
            selected: false
        }, {
            title: "What intrigues you most about this job?",
            index: 10,
            selected: false
        }, {
            title: "How much experience do you have in the desired required skills?",
            index: 11,
            selected: false
        }],
        error: ""
    }
}   
    renderButtons = () => {
        const { count, selected, switched } = this.state;
        if (typeof selected !== "undefined" && selected.length > 0) {
            return true;
        } else {
            return false;
        }
    }
    handleSubmission = () => {
        console.log("handleSubmission clicked");

        const { questions, selected, switched } = this.state;

        const questionsSelected = [];

        for (let i = 0; i < questions.length; i++) {
            let question = questions[i];

            if (question.selected === true) {
                questionsSelected.push(question.title);
            }
        }
        this.props.addJobData({
            ...this.props.data,
            coverLetterRequired: switched,
            questionsBeforeApplying: questionsSelected,
            typeOfProject: selected,
            page: 4
        });

        setTimeout(() => {
            this.props.props.navigation.replace("skills-and-more-info");
        }, 1000)
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
        const { selected, questions, error, switched } = this.state;

        console.log("this.state. typeAndScreening:", this.state);
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
                    <Title style={styles.goldText}>Post Job</Title>
                    <Subtitle style={styles.goldText}>Timelines & Screening</Subtitle>
                </Body>
                    <Right>
                        <Button transparent onPress={this.restart}>
                            <Text style={styles.goldText}>Restart Process</Text>
                        </Button>
                    </Right>
                </Header>
                <Progress.Bar color={"#ffd530"} unfilledColor={"lightgrey"} progress={0.43} width={width} />
                <ScrollView contentContainerStyle={{ paddingBottom: 50, paddingTop: 10 }} style={styles.container}>
                    <View style={styles.margin}>
                        <Text style={styles.headerText}>What type of project do you have?</Text>
                        <View style={{ marginTop: 20 }} />
                        <TouchableOpacity onPress={() => {
                            this.setState({
                                selected: "one-time-project"
                            })
                        }} style={selected === "one-time-project" ? styles.selected : styles.boxed}>
                            <View style={styles.innerBox}>
                                <View style={styles.left}>
                                    <Image source={require("../../../../assets/icons/acc.png")} style={styles.icon} />
                                    <Text style={{ fontWeight: "bold", marginLeft: 10 }}>One-Time Project</Text>
                                </View>
                                <View style={styles.right}>
                                    {selected === "one-time-project" ? <Image source={require("../../../../assets/icons/selected.png")} style={[styles.icon, { marginLeft: 5 }]} /> : <Image source={require("../../../../assets/icons/un-selected.png")} style={styles.icon} />}
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            this.setState({
                                selected: "ongoing-project"
                            })
                        }} style={selected === "ongoing-project" ? styles.selected : styles.boxed}>
                            <View style={styles.innerBox}>
                                <View style={styles.left}>
                                    <Image source={require("../../../../assets/icons/clip.png")} style={styles.icon} />
                                    <Text style={{ fontWeight: "bold", marginLeft: 10 }}>Ongoing Project</Text>
                                </View>
                                <View style={styles.right}>
                                    {selected === "ongoing-project" ? <Image source={require("../../../../assets/icons/selected.png")} style={[styles.icon, { marginLeft: 5 }]} /> : <Image source={require("../../../../assets/icons/un-selected.png")} style={styles.icon} />}
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            this.setState({
                                selected: "complex-project"
                            })
                        }} style={selected === "complex-project" ? styles.selected : styles.boxed}>
                            <View style={styles.innerBox}>
                                <View style={styles.left}>
                                    <Image source={require("../../../../assets/icons/square.png")} style={styles.icon} />
                                    <Text style={{ fontWeight: "bold", marginLeft: 10 }}>Complex Project</Text>
                                </View>
                                <View style={styles.right}>
                                    {selected === "complex-project" ? <Image source={require("../../../../assets/icons/selected.png")} style={[styles.icon, { marginLeft: 5 }]} /> : <Image source={require("../../../../assets/icons/un-selected.png")} style={styles.icon} />}
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.thickHr} />
                    <View style={styles.margin}>
                        <Text style={styles.headerText}>Screening Questions (Optional)</Text>
                        <View style={{ marginTop: 10 }} />
                        <Text>Add screening questions to find better candiates and better your chances at the perfect match!</Text>
                        <View style={{ margintop: 10 }} />
                        <View style={styles.row}>
                            <TouchableOpacity onPress={() => {
                                this.RBSheet.open();
                            }} style={styles.touchable}>
                                <Image source={require("../../../../assets/icons/plus.png")} style={styles.plus} />
                                <Text style={styles.touchInnerText}>Add a question</Text>
                            </TouchableOpacity>
                        </View>
                        <KeyboardAwareScrollView>
                        {typeof questions !== 'undefined' && questions.length > 0 ? questions.map((question, index) => {
                            if (question.selected === true) {
                                return (
                                    <View style={{ flexDirection: "row" }}>
                                        <Item style={styles.textarea} regular>
                                            <Textarea onChangeText={(value) => {
                                                let items = [...questions];
                                                let item = items[index];
                                                item.title = value;

                                                this.setState({
                                                    questions: items
                                                })
                                                
                                            }} style={{ width: "100%", height: "100%" }} rowSpan={3} bordered placeholder={question.title} value={question.title} placeholderTextColor={"grey"} />
                                        </Item>
                                        <TouchableOpacity onPress={() => {
                                            let items = [...questions];
                                            let item = items[index];

                                            item.selected = false;

                                            this.setState({
                                                questions: items,
                                                count: this.state.count - 1,
                                                error: ""
                                            })
                                        }} style={styles.rightHalf}><Image source={require("../../../../assets/icons/close.png")} style={{ maxWidth: 35, maxHeight: 35 }} /></TouchableOpacity>
                                    </View>
                                );
                            }
                        }) : null}
                        </KeyboardAwareScrollView>
                    </View>
                    <View style={styles.thickHr} />
                        <View style={styles.margin}>
                        <Text style={styles.headerText}>Cover letter</Text>
                        <View style={{ marginTop: 15 }} />
                        <Text>Ask freelancers and agencies to write a cover letter introducing themselves</Text>
                        <View style={styles.specialRow}>
                            <Switch
                                value={this.state.switched}
                                onValueChange={(val) => {                                
                                    this.setState({
                                        switched: val
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
                            <Text style={styles.switchText}>{switched === false ? "No, don't require a cover letter" : "Yes, require a cover letter"}</Text>
                        </View>
                    </View>
                    <View style={[styles.thickHr, { marginBottom: 35 }]} />
                    <View style={styles.margin}>
                        {this.renderButtons() ? <AwesomeButtonCartman type={"anchor"} textColor={"white"} onPress={this.handleSubmission} stretch={true}>Submit & Continue</AwesomeButtonCartman> : <AwesomeButtonCartman type={"disabled"} stretch={true}>Submit & Continue</AwesomeButtonCartman>}
                    </View>
                </ScrollView>
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
                    <Header style={{ backgroundColor: "#303030" }}>
                        <Left>
                            <Button onPress={() => {
                                this.RBSheet.close();
                            }} transparent>
                                <Image source={require("../../../../assets/icons/go-back.png")} style={styles.headerIcon} />
                            </Button>
                        </Left>
                        <Body>
                            <Title style={styles.goldText}>Screening Questions</Title>
                            <Subtitle style={styles.goldText}>Select screening questions</Subtitle>
                        </Body>
                        <Right />
                    </Header>
                    <ScrollView contentContainerStyle={{ paddingBottom: 50, paddingTop: 10 }} style={styles.scroller}>
                        <List>
                            <View style={{ margin: 10 }}>{typeof error !== 'undefined' && error.length > 0 ? <Text style={styles.redText}>{error}</Text> : null}</View> 
                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    questions: [{
                                        title: "Do you have any questions about the job description?",
                                        selected: false,
                                        index: 0
                                    }, {
                                        title: "Do you have any suggestions to make this project run successfully?",
                                        index: 1,
                                        selected: false
                                    }, {
                                        title: "What challenging part of this job are you most experienced in?",
                                        index: 2,
                                        selected: false
                                    }, {
                                        title: "What part of this project most appeals to you?",
                                        index: 3,
                                        selected: false
                                    }, {
                                        title: "What past project or job have you had that is most like this one and why?",
                                        index: 4,
                                        selected: false
                                    }, {
                                        title: "What questions do you have about the project?",
                                        index: 5,
                                        selected: false
                                    }, {
                                        title: "Which of the required job skills do you feel you are strongest at?",
                                        index: 6,
                                        selected: false
                                    }, {
                                        title: "Which part of this project do you think will take the most time?",
                                        index: 7,
                                        selected: false
                                    }, {
                                        title: "Why did you apply to this particular job?",
                                        index: 8,
                                        selected: false
                                    }, {
                                        title: "Why do you think you are a good fit for this particular project?",
                                        index: 9,
                                        selected: false
                                    }, {
                                        title: "What intrigues you most about this job?",
                                        index: 10,
                                        selected: false
                                    }, {
                                        title: "How much experience do you have in the desired required skills?",
                                        index: 11,
                                        selected: false
                                    }],
                                    count: 0,
                                    error: ""
                                })
                            }} style={styles.reset}><Text style={styles.innerText}>Reset Selections</Text></TouchableOpacity>
                            {typeof questions !== "undefined" && questions.length > 0 ? questions.map((question, index) => {
                                return (
                                    <ListItem button={true} onPress={() => {
                                        if (this.state.count === 5) {
                                            this.setState({
                                                error: "You can NOT select more than 5 questions, please continue or re-select your questions by clicking the reset button above."
                                            })
                                        } else {
                                            if (question.selected === false) {
                                                let items = [...questions];
                                                let item = items[index];
                                                item.selected = !item.selected;
                                                items[index] = item;

                                                this.setState({
                                                    questions: items,
                                                    count: this.state.count + 1,
                                                    error: ""
                                                })
                                            } else {
                                                let items = [...questions];
                                                let item = items[index];
                                                item.selected = !item.selected;
                                                items[index] = item;

                                                this.setState({
                                                    questions: items,
                                                    count: this.state.count - 1,
                                                    error: ""
                                                })
                                            }
                                        }
                                    }} selected={question.selected}>
                                        <Left>
                                            <Text style={question.selected === true ? styles.blueText : { color: "black" }}>{question.title}</Text>
                                        </Left>
                                        <Right>
                                            <Icon name="arrow-forward" />
                                        </Right>
                                    </ListItem>
                                );
                            }) : null}
                        </List>
                    </ScrollView>
                </RBSheet>
           </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        data: state.jobData.data
    };
}
export default connect(mapStateToProps, { addJobData })(TypeOfProjectAndScreeningHelper);