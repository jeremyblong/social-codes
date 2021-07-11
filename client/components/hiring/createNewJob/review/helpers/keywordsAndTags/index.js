import React, { Component, Fragment } from 'react';
import { View, Text, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { Header, Left, Body, Right, Title, Subtitle, Button } from 'native-base';
import styles from './styles.js';
import Icon from "react-native-vector-icons/MaterialIcons";
import * as Progress from 'react-native-progress';
import { addJobData } from "../../../../../../actions/jobs/data.js";
import { connect } from "react-redux";
import { TagSelect } from 'react-native-tag-select';
import AwesomeButtonCartman from 'react-native-really-awesome-button/src/themes/cartman';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import languages from "../../../../../../data_sets/listOfAllProgrammingLanguages.json";
import uuid from "react-native-uuid";
import Tags from "react-native-tags";
import RBSheet from "react-native-raw-bottom-sheet";
import MultiSelect from 'react-native-multiple-select';


const { height, width } = Dimensions.get("window");


class SkillsAndMoreInformationSubComponent extends Component {
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
        softSkills: [],
        hardSkills: [],
        preselected: [],
        softPreselected: []
    }
}   

    renderButtons = () => {
        const { languagesSelected, selected, additionalTags } = this.state;
        const { selectedTags } = this.props;

        if ((typeof selected !== "undefined" && selected.length > 0) && (typeof languagesSelected !== "undefined" && languagesSelected.length > 0) && ((typeof selectedTags !== "undefined" && selectedTags.length > 0) || (typeof additionalTags !== "undefined" && additionalTags.length > 0))) {
            return <AwesomeButtonCartman type={"anchor"} textColor={"white"} onPress={this.handleSubmission} stretch={true}>Submit & Continue</AwesomeButtonCartman>
        } else {
            return <AwesomeButtonCartman type={"disabled"} onPress={() => {}} stretch={true}>Submit & Continue</AwesomeButtonCartman>;
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
        const softPreselected = [];
        const preselected = [];

        for (let index = 0; index < this.props.tags.length; index++) {
            const tag = this.props.tags[index];
            
            if (tag.type.name === "Hard Skill") {
                const newData = { id: tag.name, name: tag.name };

                hardSkills.push(newData);

                if (this.props.selectedTags.includes(tag.name)) {
                    console.log("includes one")
                    preselected.push(tag.name);
                }
            } else {
                const newData = { id: tag.name, name: tag.name };

                softSkills.push(newData);

                if (this.props.selectedTags.includes(tag.name)) {
                    console.log("includes")
                    softPreselected.push(tag.name);
                }
            }
        }
        this.setState({
            languages: langArr,
            softSkills: softSkills,
            softPreselected,
            preselected,
            hardSkills: hardSkills,
            ready: true
        })
    }
    handleSubmission = () => {
        console.log("handleSubmission clicked");

        const { languagesSelected, selected } = this.state;
        const { selectedTags } = this.props;

        const combined = [...this.state.preselected, ...this.state.softPreselected];

        this.props.addJobData({
            ...this.props.data,
            selectedTags: combined.concat(this.state.additionalTags),
            languagesSelected,
            skillLevel: selected
        });

        this.RBSheet.close();
    }
    onSelectedItemsChange = (value) => {
        console.log(value);
    }
    onSelectedItemsChange = (value) => {
        console.log(value);

        this.setState({
            preselected: value
        }, () => {
            this.props.addJobData({
                ...this.props.data,
                selectedTags: [...this.state.preselected, ...this.state.softPreselected]
            })
        });
    }
    onSelectedItemsChangeSoft = (value) => {
        console.log(value);

        this.setState({
            softPreselected: value
        }, () => {
            this.props.addJobData({
                ...this.props.data,
                selectedTags: [...this.state.preselected, ...this.state.softPreselected]
            })
        });
    }
    render() {
        console.log(this.state, this.props);

        const { selected, ready } = this.state;
        return (
           <Fragment>
                <View style={[styles.rowTwo, { marginBottom: 25 }]}>
                    <Text style={styles.headerTextMain}>Experience & Relevant {"\n"}Keywords</Text>
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
                     <ScrollView style={styles.container}>
                        <Header style={{ backgroundColor: "#303030" }}>
                            <Left>
                                <Button onPress={() => {
                                    this.RBSheet.close();
                                }} transparent>
                                    <Image source={require("../../../../../../assets/icons/go-back.png")} style={styles.headerIcon} />
                                </Button>
                            </Left>
                        <Body>
                            <Title style={styles.goldText}>Post a job</Title>
                            <Subtitle style={styles.goldText}>Create a job listing</Subtitle>
                        </Body>
                            <Right>
                                
                            </Right>
                        </Header>
                        <View style={styles.margin}>
                            <Text style={styles.headerText}>These are the tags we've generated by your description provided earlier. Please select the applicable tags or add more if you'd like! <Text style={{ color: "red" }}>(Required)</Text></Text>
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
                                    tagRemoveIconColor="darkred"
                                    tagBorderColor="darkred"
                                    tagTextColor="darkred"
                                    selectedItemTextColor="darkred"
                                    selectedItemIconColor="darkred"
                                    itemTextColor="#000"
                                    displayKey="name"
                                    searchInputStyle={{ color: 'darkred' }}
                                    submitButtonColor="darkred"
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
                                    tagRemoveIconColor="darkred"
                                    tagBorderColor="darkred"
                                    tagTextColor="darkred"
                                    selectedItemTextColor="darkred"
                                    selectedItemIconColor="darkred"
                                    itemTextColor="#000"
                                    displayKey="name"
                                    searchInputStyle={{ color: 'darkred' }}
                                    submitButtonColor="darkred"
                                    submitButtonText="Submit"
                                />
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
                                    console.log("tagLabel", tagLabel);
                                    this.setState({
                                        additionalTags: this.state.additionalTags.filter((item) => {
                                            if (item !== tagLabel) {
                                                return item;
                                            }
                                        })
                                    })
                                }}
                                deleteTagsOnPress={true}
                                readonly={false}
                                containerStyle={{ justifyContent: "center" }}
                                inputStyle={{ backgroundColor: "white" }}
                                renderTag={({ tag, index, onPress, deleteTagOnPress, readonly }) => (
                                    <TouchableOpacity style={styles.tagger} key={`${tag}-${index}`} onPress={onPress}>
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
                                        <Image source={require("../../../../../../assets/icons/beginner.png")} style={styles.icon} />
                                        <Text style={{ fontWeight: "bold", marginLeft: 10 }}>Entry-Level</Text>
                                    </View>
                                    <View style={styles.right}>
                                        {selected === "entry-level" ? <Image source={require("../../../../../../assets/icons/selected.png")} style={[styles.icon, { marginLeft: 5 }]} /> : <Image source={require("../../../../../../assets/icons/un-selected.png")} style={styles.icon} />}
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
                                        <Image source={require("../../../../../../assets/icons/average.png")} style={styles.icon} />
                                        <Text style={{ fontWeight: "bold", marginLeft: 10 }}>Intermediate</Text>
                                    </View>
                                    <View style={styles.right}>
                                        {selected === "intermediate" ? <Image source={require("../../../../../../assets/icons/selected.png")} style={[styles.icon, { marginLeft: 5 }]} /> : <Image source={require("../../../../../../assets/icons/un-selected.png")} style={styles.icon} />}
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
                                        <Image source={require("../../../../../../assets/icons/expert.png")} style={styles.icon} />
                                        <Text style={{ fontWeight: "bold", marginLeft: 10 }}>Expert</Text>
                                    </View>
                                    <View style={styles.right}>
                                        {selected === "expert" ? <Image source={require("../../../../../../assets/icons/selected.png")} style={[styles.icon, { marginLeft: 5 }]} /> : <Image source={require("../../../../../../assets/icons/un-selected.png")} style={styles.icon} />}
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
                </RBSheet>
           </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        category: state.jobData.data.category,
        data: state.jobData.data,
        tags: state.jobData.data.tags,
        selectedTags: state.jobData.data.selectedTags ? state.jobData.data.selectedTags : []
    }
}
export default connect(mapStateToProps, { addJobData })(SkillsAndMoreInformationSubComponent);