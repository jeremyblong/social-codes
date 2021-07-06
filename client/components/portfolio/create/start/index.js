import React, { Component, Fragment } from 'react';
import { View, Text, Dimensions, Image, TouchableOpacity } from "react-native";
import { Header, Left, Body, Right, Button, Icon, Title, Subtitle, Input, Item, Textarea, Picker } from 'native-base';
import SideMenu from "react-native-side-menu";
import styles from "./styles.js";
import Side from "../../../navigation/sidemenu/index.js";
import Modal from 'react-native-modal';
import { CalendarList } from 'react-native-calendars';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import { addPortfolioData } from "../../../../actions/portfolio/index.js";
import { connect } from "react-redux";
import * as Progress from 'react-native-progress';


const { height, width } = Dimensions.get("window");

const categories = [{
    key: "Software Development",
    value: "development"
}, {
    key: "Mobile App Development",
    value: "app"
}, {
    key: "writing",
    value: "writing"
}, {
    key: "Artificial Intelligence",
    value: "intelligence"
}, {
    key: "Game Development",
    value: "game"
}, {
    key: "Graphic Design",
    value: "design"
}, {
    key: "IT Networking",
    value: "networking"
}, {
    key: "Translation",
    value: "translation"
}, {
    key: "Sales",
    value: "sales"
}, {
    key: "Legal",
    value: "legal"
}, {
    key: "Marketing",
    value: "marketing"
}, {
    key: "Engineering/Architecture",
    value: "engineering"
}]

class StartPorfolioAddProjectHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        menuOpen: false,
        isModalOpen: false,
        day: null,
        title: "",
        description: "",
        selectedSkill: null
    }
}
    renderConditional = () => {
        const { title, description, day, selectedSkill } = this.state;

        if ((typeof title !== "undefined" && title.length > 0) && (typeof description !== "undefined" && description.length > 0) && day !== null && selectedSkill !== null) {
            return false;
        } else {
            return true;
        }
    }
    handleNextPageTransition = () => {
        console.log("handleNextPage clicked");

        const { title, description, day, selectedSkill } = this.state;

        this.props.addPortfolioData({
            title,
            description,
            completionDate: day,
            page: 2,
            selectedSkill
        })

        setTimeout(() => {
            this.props.props.navigation.push("employment-create-display-format");
        }, 750)
    }
    onValueChange = (value) => {
        this.setState({
            selectedSkill: value
        })
    }
    render() {
        const menu = <Side props={this.props} />;

        console.log("portfolio state create", this.state);
        return (
            <Fragment>
                <SideMenu openMenuOffset={width * 0.80} menuPosition={"right"} isOpen={this.state.menuOpen} menu={menu}>
                    <View>
                        <Header>
                            <Left>
                                <Button onPress={() => {
                                    this.props.props.navigation.goBack();
                                }} transparent>
                                <Icon style={{ color: "black" }} name='arrow-back' />
                                </Button>
                            </Left>
                            <Body>
                                <Title>Add Porfolio Project</Title>
                                <Subtitle>Add a new project</Subtitle>
                            </Body>
                            <Right>
                                <Button onPress={() => {
                                    this.setState({
                                        menuOpen: !this.state.menuOpen
                                    })
                                }} transparent>
                                <Icon style={{ color: "black" }} name='menu' />
                                </Button>
                                </Right>
                            </Header>
                        </View>
                        <Progress.Bar progress={0.25} unfilledColor={"lightgrey"} height={4} width={width} />
                        <View style={styles.innerContainer}>
                            <View style={styles.margin}>
                                <Text style={styles.headerText}>Project Title</Text>
                                <Item regular>
                                    <Input value={this.state.title} onChangeText={(value) => {
                                        this.setState({
                                            title: value
                                        })
                                    }} placeholder="Enter your project title" />
                                </Item>
                                <View style={{ marginTop: 20 }} />
                                <Text style={styles.headerText}>Project Description</Text>
                                <Textarea value={this.state.description} onChangeText={(value) => {
                                        this.setState({
                                            description: value
                                        })
                                    }} rowSpan={5} bordered placeholder="Enter your description..." />
                                <View style={{ marginTop: 20 }} />
                            
                                    <Picker
                                        note    
                                        placeholderTextColor={"black"}
                                        placeholder={"Select a skill category..."}
                                        iosIcon={<Icon name="arrow-down" />}
                                        mode="dropdown"
                                        style={{ width: width * 0.90, height: 40 }}
                                        selectedValue={this.state.selectedSkill}
                                        onValueChange={this.onValueChange}
                                    >
                                        {categories.map((category, index) => {
                                            return <Picker.Item key={index} label={category.key} value={category.value} />;
                                        })}
                                    </Picker>
                                    <View style={{ marginTop: 20 }}>
                                </View>
                                <TouchableOpacity onPress={() => {
                                    this.setState({
                                        isModalOpen: true
                                    })
                                }} style={styles.boxed}>
                                    <Text style={styles.completionText}>Select completion date</Text>
                                </TouchableOpacity>
                                <View style={{ marginTop: 20 }} />
                                
                            </View>
                        </View>
                        <View style={styles.bottom}>
                            {this.renderConditional() ? <AwesomeButtonBlue type={"disabled"} onPress={() => {}} stretch={true}>Submit & Continue</AwesomeButtonBlue> : <AwesomeButtonBlue type={"secondary"} onPress={this.handleNextPageTransition} stretch={true}>Submit & Continue</AwesomeButtonBlue>}
                        </View>
                </SideMenu>
                <Modal style={{ width: width * 0.90 }} isVisible={this.state.isModalOpen}>
                    <TouchableOpacity onPress={() => {
                        this.setState({
                            isModalOpen: false
                        })
                    }} style={styles.topLeft}>
                        <Image source={require("../../../../assets/icons/close.png")} style={styles.topLeft} />
                    </TouchableOpacity>
                    <View style={styles.customView}>
                    <CalendarList
                        // Callback which gets executed when visible months change in scroll view. Default = undefined
                        onVisibleMonthsChange={(months) => {
                            console.log('now these months are visible', months)
                        }}
                        // Max amount of months allowed to scroll to the past. Default = 50
                        pastScrollRange={50}
                        // Max amount of months allowed to scroll to the future. Default = 50
                        futureScrollRange={50}
                        // Enable or disable scrolling of calendar list
                        scrollEnabled={true}
                        // Enable or disable vertical scroll indicator. Default = false
                        showScrollIndicator={true}
                        onDayPress={(day) => {
                            console.log('selected day', day);

                            this.setState({
                                day,
                                isModalOpen: false
                            })
                        }}
                    />
                    </View>
                </Modal>
            </Fragment>
        )
    }
}
export default connect(null, { addPortfolioData })(StartPorfolioAddProjectHelper);