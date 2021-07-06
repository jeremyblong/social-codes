import React, { Component, Fragment } from 'react';
import { View, Text, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { Header, Left, Body, Right, Title, Subtitle, Button } from 'native-base';
import styles from './styles.js';
import Icon from "react-native-vector-icons/MaterialIcons";
import * as Progress from 'react-native-progress';
import { addJobData } from "../../../../actions/jobs/data.js";
import { connect } from "react-redux";
import { TagSelect } from 'react-native-tag-select';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import languages from "../../../../data_sets/listOfAllProgrammingLanguages.json";
import uuid from "react-native-uuid";
import Tags from "react-native-tags";
import MultiSelect from 'react-native-multiple-select';


const { height, width } = Dimensions.get("window");


class SkillsAndMoreInformationHelper extends Component {
constructor (props) {
    super(props);

    this.state = {
        data: [],
        selected: "",
        ready: false,
        languages: [],
        selectedItems: [],
        languagesSelected: [],
        additionalTags: [],
        tags: [],
        preselected: [],
        softSkills: [],
        hardSkills: [],
        softPreselected: []
    }
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
    renderButtons = () => {
        const { languagesSelected, selected, additionalTags, softPreselected } = this.state;
        // const { selectedTags } = this.props;

        if ((typeof selected !== "undefined" && selected.length > 0) && (typeof languagesSelected !== "undefined" && languagesSelected.length > 0) && ((typeof softPreselected !== "undefined" && softPreselected.length > 0) || (typeof additionalTags !== "undefined" && additionalTags.length > 0))) {
            return <AwesomeButtonBlue type={"secondary"} onPress={this.handleSubmission} stretch={true}>Submit & Continue</AwesomeButtonBlue>
        } else {
            return <AwesomeButtonBlue type={"disabled"} onPress={() => {}} stretch={true}>Submit & Continue</AwesomeButtonBlue>;
        }
    }
    componentDidMount() {
        const langArr = [];
        for (let index = 0; index < languages.length; index++) {
            const language = languages[index];
            
            langArr.push({
                id: uuid(),
                name: language
            })
        }
        const softSkills = [];
        const hardSkills = [];

        if (typeof this.props.tags !== "undefined" && this.props.tags.length > 0) {
            for (let index = 0; index < this.props.tags.length; index++) {
                const tag = this.props.tags[index];
                
                if (tag.type.name === "Hard Skill") {
                    hardSkills.push({ id: tag.name, name: tag.name })
                } else {
                    softSkills.push({ id: tag.name, name: tag.name })
                }
            }
        }
        this.setState({
            languages: langArr,
            softSkills: softSkills,
            hardSkills: hardSkills,
            ready: true
        })
    }
    handleSubmission = () => {
        console.log("handleSubmission clicked");

        const { languagesSelected, selected } = this.state;
        // const { selectedTags } = this.props;
        
        // const filteredArray = [];

        const combined = [...this.state.softPreselected, ...this.state.preselected];

        this.props.addJobData({
            ...this.props.data,
            selectedTags: combined.concat(this.state.additionalTags),
            languagesSelected,
            skillLevel: selected,
            page: 5
        });

        setTimeout(() => {
            this.props.props.navigation.replace("visibility-and-quanitity");
        }, 1000);
    }
    onSelectedItemsChange = (value) => {
        console.log(value);

        this.setState({
            preselected: value
        });
    }
    onSelectedItemsChangeSoft = (value) => {
        console.log(value);

        this.setState({
            softPreselected: value
        });
    }
    render() {
        console.log(this.state);

        const { selected, ready } = this.state;

        console.log(this.props.tags);
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
                    <Title>Post a job</Title>
                    <Subtitle>Create a job listing</Subtitle>
                </Body>
                    <Right>
                        <Button transparent onPress={this.restart}>
                            <Text>Restart Process</Text>
                        </Button>
                    </Right>
                </Header>
                <Progress.Bar color={"blue"} unfilledColor={"lightgrey"} progress={0.55} width={width} />
                <ScrollView style={styles.container}>
                    <View style={styles.margin}>
                        <Text style={styles.headerText}>Please select any relevant tags for your job based on the cateogry of job you selected... <Text style={{ color: "red" }}>(Required)</Text></Text>
                        {/* <View style={{ marginTop: 10 }} />
                        <View style={{flexDirection: 'row'}}>
                            <View style={styles.line} />
                            <Text style={styles.specialText}>Devices (Optional)</Text>
                            <View style={styles.line} />
                        </View> */}
                        <View style={{ marginTop: 10 }} />
                        <View style={styles.maxWidth}>
                            <Text style={styles.headerText}>Hard Skills</Text>
                            <MultiSelect
                                items={this.state.hardSkills}
                                uniqueKey="id"
                                tagContainerStyle={{ maxWidth: width * 0.90 }}
                                ref={(component) => { this.multiSelect = component }}
                                onSelectedItemsChange={this.onSelectedItemsChange}
                                selectedItems={this.state.preselected}
                                selectText="Pick Items"
                                searchInputPlaceholderText="Search items..."
                                onChangeInput={ (text)=> console.log(text)}
                                tagRemoveIconColor="blue"
                                tagBorderColor="blue"
                                tagTextColor="blue"
                                selectedItemTextColor="blue"
                                selectedItemIconColor="blue"
                                itemTextColor="#000"
                                displayKey="name"
                                searchInputStyle={{ color: 'blue' }}
                                submitButtonColor="blue"
                                submitButtonText="Submit"
                            />
                            <Text style={styles.headerText}>Soft Skills</Text>
                            <MultiSelect
                                items={this.state.softSkills}
                                uniqueKey="id"
                                tagContainerStyle={{ maxWidth: width * 0.90 }}
                                ref={(component) => { this.multiSelect = component }}
                                onSelectedItemsChange={this.onSelectedItemsChangeSoft}
                                selectedItems={this.state.softPreselected}
                                selectText="Pick Items"
                                searchInputPlaceholderText="Search items..."
                                onChangeInput={ (text)=> console.log(text)}
                                tagRemoveIconColor="blue"
                                tagBorderColor="blue"
                                tagTextColor="blue"
                                selectedItemTextColor="blue"
                                selectedItemIconColor="blue"
                                itemTextColor="#000"
                                displayKey="name"
                                searchInputStyle={{ color: 'blue' }}
                                submitButtonColor="blue"
                                submitButtonText="Submit"
                            />
                        </View>
                        <View style={{ marginTop: 15, marginBottom: 15 }}>
                            <Text style={{ color: "blue" }}>If NO "Soft Skills" are shown - you MUST add custom skills in the box below before proceeding...</Text>
                        </View>
                        <Text style={styles.headerText}>Enter any other tags you would like to include below</Text>
                        <Tags
                            textInputProps={{
                                placeholder: "Type any relevant tags...",
                                placeholderTextColor: "grey"
                            }}
                            initialTags={[]}
                            onChangeTags={tags => {
                                console.log(tags);

                                this.setState({
                                    additionalTags: tags
                                })
                            }} 
                            style={{ backgroundColor: "#f7f8fa", color: "black", borderColor: "black", borderWidth: 2 }}
                            onTagPress={(index, tagLabel, event, deleted) => {
                                console.log("tagLabel", tagLabel.name);
                                this.setState({
                                    additionalTags: this.state.additionalTags.filter((item) => {
                                        if (item.name !== tagLabel.name) {
                                            return item.name;
                                        }
                                    })
                                })
                            }}
                            deleteTagsOnPress={true}
                            readonly={false}
                            containerStyle={{ justifyContent: "center" }}
                            inputStyle={{ backgroundColor: "white" }}
                            renderTag={({ tag, index, onPress, deleteTagOnPress, readonly }) => (
                                <TouchableOpacity style={styles.tagger} key={`${tag.name}-${index}`} onPress={onPress}>
                                    <Text>{tag}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                    <View style={styles.thickHr} />
                        <Text style={styles.headerText}>What languages will be used? <Text style={{ color: "red" }}>(Required)</Text></Text>
                        {ready === true ? <View style={{ margin: 10 }}><SectionedMultiSelect
                            items={this.state.languages}
                            IconRenderer={Icon}
                            uniqueKey="id"
                            subKey="children"
                            selectText="Choose the languages that will be used..."
                            showDropDowns={true}
                            onSelectedItemsChange={(selectedItems) => {
                                console.log("selectedItems", selectedItems);

                                this.setState({
                                    selectedItems
                                })
                            }}
                            onSelectedItemObjectsChange={(items) => {
                                console.log("items", items);

                                this.setState({
                                    languagesSelected: items
                                })
                            }}
                            selectedItems={this.state.selectedItems}
                            /></View> : null}
                    <View style={styles.thickHr} />
                    <View style={styles.margin}>
                        <Text style={styles.headerText}>What experience level should your freelancer have? <Text style={{ color: "red" }}>(Required)</Text></Text>
                        <View style={{ marginTop: 20 }} />
                        <TouchableOpacity onPress={() => {
                           this.setState({
                               selected: "entry-level"
                           })
                        }} style={selected === "entry-level" ? styles.selected : styles.boxed}>
                            <View style={styles.innerBox}>
                                <View style={styles.left}>
                                    <Image source={require("../../../../assets/icons/beginner.png")} style={styles.icon} />
                                    <Text style={{ fontWeight: "bold", marginLeft: 10 }}>Entry-Level</Text>
                                </View>
                                <View style={styles.right}>
                                    {selected === "entry-level" ? <Image source={require("../../../../assets/icons/selected.png")} style={[styles.icon, { marginLeft: 5 }]} /> : <Image source={require("../../../../assets/icons/un-selected.png")} style={styles.icon} />}
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            this.setState({
                               selected: "intermediate"
                           })
                        }} style={selected === "intermediate" ? styles.selected : styles.boxed}>
                            <View style={styles.innerBox}>
                                <View style={styles.left}>
                                    <Image source={require("../../../../assets/icons/average.png")} style={styles.icon} />
                                    <Text style={{ fontWeight: "bold", marginLeft: 10 }}>Intermediate</Text>
                                </View>
                                <View style={styles.right}>
                                    {selected === "intermediate" ? <Image source={require("../../../../assets/icons/selected.png")} style={[styles.icon, { marginLeft: 5 }]} /> : <Image source={require("../../../../assets/icons/un-selected.png")} style={styles.icon} />}
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                             this.setState({
                               selected: "expert"
                           })
                        }} style={selected === "expert" ? styles.selected : styles.boxed}>
                            <View style={styles.innerBox}>
                                <View style={styles.left}>
                                    <Image source={require("../../../../assets/icons/expert.png")} style={styles.icon} />
                                    <Text style={{ fontWeight: "bold", marginLeft: 10 }}>Expert</Text>
                                </View>
                                <View style={styles.right}>
                                    {selected === "expert" ? <Image source={require("../../../../assets/icons/selected.png")} style={[styles.icon, { marginLeft: 5 }]} /> : <Image source={require("../../../../assets/icons/un-selected.png")} style={styles.icon} />}
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.margin}>
                        <View style={{ marginTop: 20 }}>
                            {this.renderButtons()}
                        </View>
                    </View>
                </ScrollView>
           </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        category: state.jobData.data.category,
        data: state.jobData.data,
        tags: state.jobData.data.tags,
        selectedTags: state.jobData.data.selectedTags ? state.jobData.data.selectedTags : [],
        tags: state.jobData.data.tags
    }
}
export default connect(mapStateToProps, { addJobData })(SkillsAndMoreInformationHelper);