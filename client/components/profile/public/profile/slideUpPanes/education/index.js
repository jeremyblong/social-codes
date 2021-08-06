import React, { Fragment, useState, useEffect } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Platform, ScrollView } from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";
import { Header, Left, Body, Right, Button, Title, Text as NativeText, Subtitle, Icon, Item, Input, Label, Textarea, Form } from 'native-base';
import styles from './styles.js';
import Autocomplete from "react-native-autocomplete-input";
import axios from "axios";
import Config from "react-native-config";
import RNPickerSelect from 'react-native-picker-select';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import moment from "moment";
import Toast from 'react-native-toast-message';
import { connect } from 'react-redux';

const { height, width } = Dimensions.get("window");

const startYearArr = [];

for (let i = new Date().getFullYear(); i > 1940 ; i--) {
    startYearArr.push({ label: (i).toString(), value: (i).toString() });
}


const EducationSlideUpPaneHelper = ({ educationPaneRef, unique_id }) => {

    const [ schoolName, setSchoolName ] = useState("");
    const [ hideOrNot, setHide ] = useState(false);
    const [ schools, setSchools ] = useState([]);
    const [ selected, setSelected ] = useState(null);
    const [ areaOfStudy, setStudy ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ startDate, setStartDate ] = useState(null);
    const [ endDate, setEndDate ] = useState(null);
    const [ degree, setDegree ] = useState(null);

    useEffect(() => {
        axios.get(`https://api.tomtom.com/search/2/categorySearch/${schoolName}.JSON?key=${Config.tomtom_api_key}&categorySet=COLLEGE_UNIVERSITY`).then((res) => {
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }, []);


    const handleSchoolSearchChange = () => {

        // https://api.tomtom.com/search/2/poiCategories.JSON?key=${Config.tomtom_api_key}

        axios.get(`https://api.tomtom.com/search/2/poiSearch/${schoolName}.JSON?key=${Config.tomtom_api_key}&categorySet=7377&countrySet=US&limit=20`).then((res) => {
            console.log(res.data);

            const { results } = res.data;

            setSchools(results);
        }).catch((err) => {
            console.log(err);
        })
    }
    const renderConditional = () => {
        if (typeof schoolName !== 'undefined' && schoolName.length > 0) {
            return false;
        } else {
            return true;
        }
    }
    const handleFinalUpload = () => {
        axios.post(`${Config.ngrok_url}/upload/school/history`, {
            schoolName: selected,   
            startDate,
            endDate,
            degree,
            areaOfStudy,
            description,
            unique_id
        }).then((res) => {
            if (res.data.message === "Uploaded new schooling history!") {
                console.log(res.data);

                const { schooling } = res.data;

                setSelected(null);
                setStartDate(null);
                setEndDate(null);
                setDegree(null);
                setDescription("");
                setStudy("");

                educationPaneRef.current.close();

                Toast.show({
                    text1: 'Successfully updated schooling history!',
                    text2: `You've successfully uploaded & updated your education/schooling history...`,
                    position: "top",
                    visibilityTime: 4000,
                    type: "success"
                });
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <Fragment>
            <Toast ref={(ref) => Toast.setRef(ref)} />
            <RBSheet
                ref={educationPaneRef}
                closeOnDragDown={false}
                height={height - 75}
                openDuration={250}
                customStyles={{
                    container: {
                        borderTopRightRadius: 35,
                        borderTopLeftRadius: 35
                    }
                }}
            >
                
               <Header style={{ backgroundColor: "#303030" }}>
                    <Left>
                        <Button onPress={() => {
                            educationPaneRef.current.close();
                        }} transparent>
                            <Icon style={{ color: "#ffffff" }} name="arrow-back" />
                            {Platform.OS === "ios" ? <NativeText style={{ color: "#ffffff" }}>Back</NativeText> : null}
                        </Button>
                    </Left>
                    <Body>
                        <Title style={styles.whiteText}>Education</Title>
                        <Subtitle style={styles.whiteText}>Add Education & more</Subtitle>
                    </Body>
                    <Right>
                        
                    </Right>
                </Header>
                <ScrollView contentContainerStyle={{ paddingBottom: 50 }} style={styles.container}>
                    <Form>
                    <View style={styles.margin15}>
                        <Text style={styles.label}>School Name</Text>
                        <Autocomplete
                            data={schools}
                            value={schoolName}
                            onChangeText={(text) => {
                                setHide(false);
                                setSchoolName(text);

                                handleSchoolSearchChange();
                            }}
                            placeholder={"Search for your school..."}
                            placeholderTextColor={"grey"}
                            hideResults={hideOrNot}
                            flatListProps={{
                                keyExtractor: (_, idx) => idx,
                                renderItem: ({ item }) => {
                                    return (
                                        <TouchableOpacity onPress={() => {
                                            setSelected(item);
                                            setSchoolName(item.poi.name);
                                            setHide(true);
                                        }} style={styles.touchable}>
                                            <Text style={styles.schoolName}>{item.poi.name}</Text>
                                            <Text style={styles.smallerText}>{item.address.freeformAddress}</Text>
                                        </TouchableOpacity>    
                                    );
                                },
                            }}
                        />
                        <Text style={[styles.label, { paddingTop: 10 }]}>Dates attended (Optional) </Text>
                        <Text style={[styles.label, { paddingTop: 10, paddingBottom: 10 }]}>Select a start date...</Text>
                        <RNPickerSelect 
                            style={styles}
                            onValueChange={(value) => {
                                setStartDate(moment(value).format("YYYY-MM-DD"));
                            }}
                            placeholderTextColor={"grey"}
                            placeholder={{ label: "Select your start date...", value: null }}
                            items={startYearArr}
                        />
                        <Text style={[styles.label, { paddingTop: 10, paddingBottom: 10 }]}>Select a completion date (To - or expected graduation year) - (Optional)...</Text>
                        <RNPickerSelect 
                            style={styles}
                            onValueChange={(value) => {
                                setEndDate(moment(value).format("YYYY-MM-DD"));
                            }}
                            placeholderTextColor={"grey"}
                            placeholder={{ label: "Select completion date...", value: null }}
                            items={startYearArr}
                        />
                        <Text style={[styles.label, { paddingTop: 10, paddingBottom: 10 }]}>Degree (Optional)</Text>
                        <RNPickerSelect 
                            style={styles}
                            onValueChange={(value) => {
                                setDegree(value);
                            }}
                            placeholderTextColor={"grey"}
                            placeholder={{ label: "Select your degree...", value: null }}
                            items={[
                                { label: "Doctor of Engineering (DEng)", value: "Doctor of Engineering (DEng)" },
                                { label: "Associate's Degree", value: "Associate's Degree" },
                                { label: "Associate's of Arts (AA)", value: "Associate's of Arts (AA)" },
                                { label: "Associate's of Arts and Sciences (AAS)", value: "Associate's of Arts and Sciences (AAS)" },
                                { label: "Associate of Science (AS)", value: "Associate of Science (AS)" },
                                { label: "Bachelor's Degree", value: "Bachelor's Degree" },
                                { label: "Bachelor of Applied Science (BASc)", value: "Bachelor of Applied Science (BASc)" },
                                { label: "Bachelor of Architecture (BArch)", value: "Bachelor of Architecture (BArch)" },
                                { label: "Bachelor of Arts (BA)", value: "Bachelor of Arts (BA)" },
                                { label: "Bachelor of Business Administration (BBA)", value: "Bachelor of Business Administration (BBA)" },
                                { label: "Bachelor of Commerce (BCom)", value: "Bachelor of Commerce (BCom)" },
                                { label: "Bachelor of Education (BEd)", value: "Bachelor of Education (BEd)" },
                                { label: "Bachelor of Engineering (BEng)", value: "Bachelor of Engineering (BEng)" },
                                { label: "Bachelor of Fine Arts (BFA)", value: "Bachelor of Fine Arts (BFA)" },
                                { label: "Bachelor of Laws (LLB)", value: "Bachelor of Laws (LLB)" },
                                { label: "Bachelor of Medicine, Bachelor of Surgery (MBBS)", value: "Bachelor of Medicine, Bachelor of Surgery (MBBS)" },
                                { label: "Bachelor of Pharmacy (BPharm)", value: "Bachelor of Pharmacy (BPharm)" },
                                { label: "Bachelor of Science (BS)", value: "Bachelor of Science (BS)" },
                                { label: "Bachelor of Technology (Btech)", value: "Bachelor of Technology (Btech)" },
                                { label: "Master's Degree", value: "Master's Degree" },
                                { label: "Master of Architecture (MArch)", value: "Master of Architecture (MArch)" },
                                { label: "Master of Arts (MA)", value: "Master of Arts (MA)" },
                                { label: "Master of Business Adminstration (MBA)", value: "Master of Business Adminstration (MBA)" },
                                { label: "Master of Computer Applications (MCA)", value: "Master of Computer Applications (MCA)" },
                                { label: "Master of Divinity (MDiv)", value: "Master of Divinity (MDiv)" },
                                { label: "Master of Fine Arts (MFA)", value: "Master of Fine Arts (MFA)" },
                                { label: "Master of Education (MEd)", value: "Master of Education (MEd)" },
                                { label: "Master of Laws (LLM)", value: "Master of Laws (LLM)" },
                                { label: "Master of Library & information Science (MLIS)", value: "Master of Library & information Science (MLIS)" },
                                { label: "Master of Philosophy (MPhil)", value: "Master of Philosophy (MPhil)" },
                                { label: "Master of Commerce (MCom)", value: "Master of Commerce (MCom)" },
                                { label: "Master of Public Health (MPH)", value: "Master of Public Health (MPH)" },
                                { label: "Master of Science (MS)", value: "Master of Science (MS)" },
                                { label: "Master of Social Work (MSW)", value: "Master of Social Work (MSW)" },
                                { label: "Master of Technology (MTech)", value: "Master of Technology (MTech)" },
                                { label: "Doctor of Education (EdD)", value: "Doctor of Education (EdD)" },
                                { label: "Doctor of Law (JD)", value: "Doctor of Law (JD)" },
                                { label: "Doctor of Medicine (MD)", value: "Doctor of Medicine (MD)" },
                                { label: "Doctor of Pharmacy (PharmD)", value: "Doctor of Pharmacy (PharmD)" },
                                { label: "Doctor of Philosophy (PhD)", value: "Doctor of Philosophy (PhD)" },
                                { label: "Engineer's Degree", value: "Engineer's Degree" },
                                { label: "Foundation Degree", value: "Foundation Degree" },
                                { label: "Licentiate Degree", value: "Licentiate Degree" },
                                { label: "High School Degree", value: "High School Degree" },
                                { label: "Docotr of Business Adminstration (DBA)", value: "Docotr of Business Adminstration (DBA)" },
                                { label: "Master of Public Administration (MPA)", value: "Master of Public Administration (MPA)" },
                                { label: "Bachelor of Science in Information Technology", value: "Bachelor of Science in Information Technology" },
                                { label: "Master of Design (MDes)", value: "Master of Design (MDes)" },
                                { label: "Master of Industrial Design", value: "Master of Industrial Design" },
                                { label: "Master of Engineering (MEng)", value: "Master of Engineering (MEng)" },
                                { label: "Master of Science in Project Management (MSPM)", value: "Master of Science in Project Management (MSPM)" },
                                { label: "Master of science in Information Technology", value: "Master of science in Information Technology" },
                                { label: "Master of Information Technology", value: "Master of Information Technology" },
                                { label: "Master of Computer Science (MSCS)", value: "Master of Computer Science (MSCS)" },
                                { label: "Bachelor of Computer Science (BCompSc)", value: "Bachelor of Computer Science (BCompSc)" },
                                { label: "Bachelor of Computer Applications", value: "Bachelor of Computer Applications" },
                                { label: "Bachelors of Music (BM)", value: "Bachelors of Music (BM)" },
                                { label: "Bachelor of Science in Journalism", value: "Bachelor of Science in Journalism" },
                                { label: "Master of Educational Technology", value: "Master of Educational Technology" },
                                { label: "Master of Accountancy (MAcc)", value: "Master of Accountancy (MAcc)" },
                                { label: "Bachelor of science in Nursing (BSN)", value: "Bachelor of science in Nursing (BSN)" },
                                { label: "Bachelor of Visual Communication Design", value: "Bachelor of Visual Communication Design" }, 
                                { label: "Master of Music (MM)", value: "Master of Music (MM)" },
                                { label: "NOT LISTED - N/A", value: "NOT LISTED - N/A" }
                            ]}
                        />
                        <Item style={{ marginTop: 20 }} floatingLabel>
                            <Label>Area of Study (Optional)</Label>
                            <Input value={areaOfStudy} placeholder={"Area of Study (Optional)"} onChangeText={(areaOfStudy) => {
                                setStudy(areaOfStudy);
                            }} />
                        </Item>
                        <View style={{ marginTop: 20 }} />
                        <Text style={[styles.label, { paddingTop: 10, paddingBottom: 10 }]}>Description (Optional)</Text>
                        <Textarea value={description} onChangeText={(value) => {
                            setDescription(value);
                        }} rowSpan={5} bordered placeholderTextColor={"grey"} placeholder="Enter a description here... elaborate on your schooling experience!" />
                        <View style={{ marginTop: 20 }} />
                        {renderConditional() ? <AwesomeButtonBlue type={"disabled"} stretch={true}>Submit & Continue</AwesomeButtonBlue> : <AwesomeButtonBlue type={"secondary"} backgroundColor={"blue"} textColor={"white"} onPress={handleFinalUpload} stretch={true}>Submit & Continue</AwesomeButtonBlue>}
                    </View>
                    </Form>
                    
                </ScrollView>
            </RBSheet>
        </Fragment>
    );
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.signupData.authData.unique_id
    }
}
export default connect(mapStateToProps, {  })(EducationSlideUpPaneHelper);