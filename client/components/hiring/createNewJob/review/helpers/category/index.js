import React, { Fragment, useRef } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Header, Left, Body, Right, Title, Subtitle, Button } from 'native-base';
import styles from './styles.js';
import LinearGradient from 'react-native-linear-gradient';
import { addJobData } from "../../../../../../actions/jobs/data.js";
import { connect } from "react-redux";
import RBSheet from "react-native-raw-bottom-sheet";

const { width, height } = Dimensions.get("window");

const CategoryStartJobCreationSubComponentHelper = (props) => {
    let RBSheetRef = useRef(null);

    const handleRedirect = (selection) => {
        props.addJobData({
            ...props.data,
            category: selection
        })

        RBSheetRef.close();
    }
    return (
        <Fragment>
            <View style={styles.row}>
                <Text style={styles.headerTextMain}>Category</Text>

                <TouchableOpacity onPress={() => {
                    RBSheetRef.open();
                }} style={styles.circle}>
                    <Image source={require("../../../../../../assets/icons/pencil.png")} style={styles.icon} />
                </TouchableOpacity>
            </View>
            <RBSheet
                ref={ref => {
                    RBSheetRef = ref;
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
                            RBSheetRef.close();
                        }} transparent>
                            <Image source={require("../../../../../../assets/icons/go-back.png")} style={styles.headerIcon} />
                        </Button>
                    </Left>
                <Body>
                    <Title style={styles.goldText}>Post a job</Title>
                    <Subtitle style={styles.goldText}>Create a job listing</Subtitle>
                </Body>
                    <Right />
                </Header>
                <ScrollView contentContainerStyle={{ paddingBottom: 25 }} style={styles.container}>
                    <View style={styles.margin}>
                        <Text style={styles.largeText}>I need help with...</Text>
                        <View style={{ marginTop: 10 }} />
                        <TouchableOpacity onPress={() => {
                            handleRedirect("web-mobile-software-development")
                        }}>
                            <LinearGradient colors={['#AFF8D8', "#AFF8D8",'#AFF8D8']} style={styles.boxedLong}>
                                <Text style={styles.topLeftText}>Web, Mobile & Software {"\n"}Development</Text>
                                <View style={styles.centered}>
                                    <Image style={[styles.centerImage, { top: -20 }]} source={null}/>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                        <View style={{ marginTop: 10 }} />
                        <View style={styles.row}>
                            <TouchableOpacity style={styles.boxedShort} onPress={() => {
                                handleRedirect("mobile-app-development")
                            }}>
                                <LinearGradient colors={["#FFB7B2", "#FFB7B2", "#FFB7B2"]}>
                                    <Text style={styles.topLeftText}>Mobile App Development</Text>
                                    <View style={styles.centered}>
                                        <Image style={[styles.centerImageCustom, { marginTop: 80, minHeight: "100%" }]} source={null}/>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.boxedShort} onPress={() => {
                                handleRedirect("writing")
                            }}>
                                <LinearGradient colors={["#FFDAC1", "#FFDAC1", "#FFDAC1"]}>
                                    <Text style={styles.topLeftText}>Writing</Text>
                                    <View style={styles.centeredCustom}>
                                        <Image style={[styles.centerImageCustom, { marginTop: 50, minHeight: "100%" }]} source={null}/>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 10 }} />
                            <TouchableOpacity onPress={() => {
                                handleRedirect("artifical-intelligence-machine-learning")
                            }}>
                                <LinearGradient colors={["#E2F0CB", "#E2F0CB", "#E2F0CB"]} style={styles.boxedLong}>
                                    <Text style={styles.topLeftText}>Artificial Intelligence - {"\n"}Machine Learning</Text>
                                    <View style={styles.centered}>
                                        <Image style={[styles.centerImage, { marginTop: 0 }]} source={null}/>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>
                        <View style={{ marginTop: 10 }} />
                        <View style={styles.row}>
                            <TouchableOpacity onPress={() => {
                                handleRedirect("graphic-design")
                            }} style={styles.boxedShort}>
                                <LinearGradient colors={["#B5EAD7", "#B5EAD7", "#B5EAD7"]}>
                                    <Text style={styles.topLeftText}>Graphic Design & Video Animations</Text>
                                    <View style={styles.centered}>
                                        <Image style={[styles.centerImageCustom, { marginTop: 100, minHeight: "100%" }]} source={null}/>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                handleRedirect("game-development")
                            }} style={styles.boxedShort}>
                                <LinearGradient colors={["#C7CEEA", "#C7CEEA", "#C7CEEA"]}>
                                    <Text style={styles.topLeftText}>Game Development</Text>
                                    <View style={styles.centeredCustom}>
                                        <Image style={[styles.centerImageCustom, { marginTop: 125, minHeight: "100%" }]} source={null}/>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 10 }} />
                            <TouchableOpacity onPress={() => {
                                handleRedirect("it-networking")
                            }}>
                                <LinearGradient colors={["#E8D595", "#E8D595", "#E8D595"]} style={styles.boxedLong}>
                                    <Text style={styles.topLeftText}>IT - Networking</Text>
                                    <View style={styles.centered}>
                                        <Image style={[styles.centerImageCustomTwo, { marginTop: 75, minHeight: "100%" }]} source={null}/>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>
                        <View style={{ marginTop: 10 }} />
                        <View style={styles.row}>
                            <TouchableOpacity onPress={() => {
                                handleRedirect("translation")
                            }} style={styles.boxedShort}>
                                <LinearGradient colors={["#AAD9CD", "#AAD9CD", "#AAD9CD"]}>
                                    <Text style={styles.topLeftText}>Translation</Text>
                                    <View style={styles.centeredCustom}>
                                        <Image style={[styles.centerImageCustom, { marginTop: 150, minHeight: "100%" }]} source={null}/>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                handleRedirect("sales-marketing")
                            }} style={styles.boxedShort}>
                                <LinearGradient colors={["#FFB7B2", "#FFB7B2", "#FFB7B2"]}>
                                    <Text style={styles.topLeftText}>Sales Marketing</Text>
                                    <View style={styles.centered}>
                                        <Image style={[styles.centerImageCustom, { marginTop: 100, minHeight: "100%" }]} source={null}/>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 10 }} />
                            <TouchableOpacity onPress={() => {
                                handleRedirect("legal")
                            }}>
                                <LinearGradient colors={["#FBE4FF", "#FBE4FF", "#FBE4FF"]} style={styles.boxedLong}>
                                    <Text style={styles.topLeftText}>Legal & More</Text>
                                    <View style={styles.centered}>
                                        <Image style={[styles.centerImage, { maxWidth: 300 }]} source={null}/>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>
                        <View style={{ marginTop: 10 }} />
                        <View style={styles.row}>
                            <TouchableOpacity onPress={() => {
                                handleRedirect("social-media-and-marketing")
                            }} style={styles.boxedShort}>
                                <LinearGradient colors={["#85E3FF", "#85E3FF", "#85E3FF"]}>
                                    <Text style={styles.topLeftText}>Social Media / Marketing</Text>
                                    <View style={styles.centered}>
                                        <Image style={[styles.centerImageCustom, { marginTop: 150, minHeight: "100%" }]} source={null}/>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                handleRedirect("engineering-and-architecture")
                            }} style={styles.boxedShort}>
                                <LinearGradient colors={["#FFDAC1", "#FFDAC1", "#FFDAC1"]}>
                                    <Text style={styles.topLeftText}>Engineering & Architecture</Text>
                                    <View style={styles.centeredCustom}>
                                        <Image style={[styles.centerImageCustom, { marginTop: 75, minHeight: "100%" }]} source={null}/>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </RBSheet>
        </Fragment>
    )
}
const mapStateToProps = (state) => {
    return {
        data: state.jobData.data
    }
}
export default connect(mapStateToProps, { addJobData })(CategoryStartJobCreationSubComponentHelper);