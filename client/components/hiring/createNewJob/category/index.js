import React, { Fragment, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Header, Left, Body, Right, Title, Subtitle, Button } from 'native-base';
import styles from './styles.js';
import LinearGradient from 'react-native-linear-gradient';
import { addJobData } from "../../../../actions/jobs/data.js";
import { connect } from "react-redux";

const CategoryStartJobCreationHelper = (props) => {
    const handleRedirect = (selection) => {
        props.addJobData({
            category: selection,
            page: 1
        })

        setTimeout(() => {
            props.props.navigation.replace("create-job-basic-info");
        }, 650)
    }
    return (
        <Fragment>
            <Header style={{ backgroundColor: "#303030" }}>
                <Left>
                    <Button onPress={() => {
                        props.props.navigation.goBack();
                    }} transparent>
                        <Image source={require("../../../../assets/icons/go-back.png")} style={[styles.headerIcon, { tintColor: "#fdd530" }]} />
                    </Button>
                </Left>
            <Body>
                <Title style={styles.goldText}>Post a job</Title>
                <Subtitle style={styles.goldText}>Create a job listing</Subtitle>
            </Body>
                <Right />
            </Header>
            <ScrollView contentContainerStyle={{ paddingBottom: 25, backgroundColor: "white"}} style={styles.container}>
                <View style={styles.margin}>
                    <Text style={styles.largeText}>I need help with...</Text>
                    <View style={{ marginTop: 10 }} />
                    <TouchableOpacity onPress={() => {
                        handleRedirect("web-mobile-software-development")
                    }}>
                        <LinearGradient colors={['#AFF8D8', "#AFF8D8",'#AFF8D8']} style={styles.boxedLong}>
                            <Text style={styles.topLeftText}>Web, Mobile & Software {"\n"}Development</Text>
                            {/* <View style={styles.centered}>
                                <Image style={[styles.centerImage, { top: -20 }]} source={require("../../../../assets/icons/globe-3d.png")}/>
                            </View> */}
                        </LinearGradient>
                    </TouchableOpacity>
                    <View style={{ marginTop: 10 }} />
                    <View style={styles.row}>
                        <TouchableOpacity style={styles.boxedShort} onPress={() => {
                             handleRedirect("mobile-app-development")
                        }}>
                            <LinearGradient style={{ minWidth: "100%", minHeight: "90%" }} colors={["#FFB7B2", "#FFB7B2", "#FFB7B2"]}>
                                <Text style={styles.topLeftText}>Mobile App Development</Text>
                                {/* <View style={styles.centered}>
                                    <Image style={[styles.centerImageCustom, { marginTop: 80 }]} source={require("../../../../assets/icons/phone.png")}/>
                                </View> */}
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.boxedShort} onPress={() => {
                             handleRedirect("writing")
                        }}>
                            <LinearGradient style={{ minWidth: "100%", minHeight: "90%" }} colors={["#FFDAC1", "#FFDAC1", "#FFDAC1"]}>
                                <Text style={styles.topLeftText}>Writing</Text>
                                {/* <View style={styles.centeredCustom}>
                                    <Image style={[styles.centerImageCustom, { marginTop: 50 }]} source={require("../../../../assets/icons/writing.png")}/>
                                </View> */}
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 10 }} />
                        <TouchableOpacity onPress={() => {
                             handleRedirect("artifical-intelligence-machine-learning")
                        }}>
                            <LinearGradient style={{ minWidth: "100%", minHeight: "90%" }} colors={["#E2F0CB", "#E2F0CB", "#E2F0CB"]} style={styles.boxedLong}>
                                <Text style={styles.topLeftText}>Artificial Intelligence - {"\n"}Machine Learning</Text>
                                {/* <View style={styles.centered}>
                                    <Image style={[styles.centerImage, { marginTop: 0 }]} source={require("../../../../assets/icons/humanoid.png")}/>
                                </View> */}
                            </LinearGradient>
                        </TouchableOpacity>
                    <View style={{ marginTop: 10 }} />
                    <View style={styles.row}>
                        <TouchableOpacity onPress={() => {
                             handleRedirect("graphic-design")
                        }} style={styles.boxedShort}>
                            <LinearGradient style={{ minWidth: "100%", minHeight: "90%" }} colors={["#B5EAD7", "#B5EAD7", "#B5EAD7"]}>
                                <Text style={styles.topLeftText}>Graphic Design & Video Animations</Text>
                                {/* <View style={styles.centered}>
                                    <Image style={[styles.centerImageCustom, { marginTop: 100 }]} source={require("../../../../assets/icons/info-flex.png")}/>
                                </View> */}
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                             handleRedirect("game-development")
                        }} style={styles.boxedShort}>
                            <LinearGradient style={{ minWidth: "100%", minHeight: "90%" }} colors={["#C7CEEA", "#C7CEEA", "#C7CEEA"]}>
                                <Text style={styles.topLeftText}>Game Development</Text>
                                {/* <View style={styles.centeredCustom}>
                                    <Image style={[styles.centerImageCustom, { marginTop: 125 }]} source={require("../../../../assets/icons/gear.png")}/>
                                </View> */}
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 10 }} />
                        <TouchableOpacity onPress={() => {
                             handleRedirect("it-networking")
                        }}>
                            <LinearGradient style={{ minWidth: "100%", minHeight: "90%" }} colors={["#E8D595", "#E8D595", "#E8D595"]} style={styles.boxedLong}>
                                <Text style={styles.topLeftText}>IT - Networking</Text>
                                {/* <View style={styles.centered}>
                                    <Image style={[styles.centerImageCustomTwo, { marginTop: 75 }]} source={require("../../../../assets/icons/server.png")}/>
                                </View> */}
                            </LinearGradient>
                        </TouchableOpacity>
                    <View style={{ marginTop: 10 }} />
                    <View style={styles.row}>
                        <TouchableOpacity onPress={() => {
                             handleRedirect("translation")
                        }} style={styles.boxedShort}>
                            <LinearGradient style={{ minWidth: "100%", minHeight: "90%" }} colors={["#AAD9CD", "#AAD9CD", "#AAD9CD"]}>
                                <Text style={styles.topLeftText}>Translation</Text>
                                {/* <View style={styles.centeredCustom}>
                                    <Image style={[styles.centerImageCustom, { marginTop: 150 }]} source={require("../../../../assets/icons/data.png")}/>
                                </View> */}
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                             handleRedirect("sales-marketing")
                        }} style={styles.boxedShort}>
                            <LinearGradient style={{ minWidth: "100%", minHeight: "90%" }} colors={["#FFB7B2", "#FFB7B2", "#FFB7B2"]}>
                                <Text style={styles.topLeftText}>Sales Marketing</Text>
                                {/* <View style={styles.centered}>
                                    <Image style={[styles.centerImageCustom, { marginTop: 100 }]} source={require("../../../../assets/icons/soc.png")}/>
                                </View> */}
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 10 }} />
                        <TouchableOpacity onPress={() => {
                             handleRedirect("legal")
                        }}>
                            <LinearGradient style={{ minWidth: "100%", minHeight: "90%" }} colors={["#FBE4FF", "#FBE4FF", "#FBE4FF"]} style={styles.boxedLong}>
                                <Text style={styles.topLeftText}>Legal & More</Text>
                                {/* <View style={styles.centered}>
                                    <Image style={[styles.centerImage, { maxWidth: 300 }]} source={require("../../../../assets/icons/legal.png")}/>
                                </View> */}
                            </LinearGradient>
                        </TouchableOpacity>
                    <View style={{ marginTop: 10 }} />
                    <View style={styles.row}>
                        <TouchableOpacity onPress={() => {
                             handleRedirect("social-media-and-marketing")
                        }} style={styles.boxedShort}>
                            <LinearGradient style={{ minWidth: "100%", minHeight: "90%" }} colors={["#85E3FF", "#85E3FF", "#85E3FF"]}>
                                <Text style={styles.topLeftText}>Social Media / Marketing</Text>
                                {/* <View style={styles.centered}>
                                    <Image style={[styles.centerImageCustom, { marginTop: 150 }]} source={require("../../../../assets/icons/social-media.png")}/>
                                </View> */}
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            handleRedirect("engineering-and-architecture")
                        }} style={styles.boxedShort}>
                            <LinearGradient style={{ minWidth: "100%", minHeight: "90%" }} colors={["#FFDAC1", "#FFDAC1", "#FFDAC1"]}>
                                <Text style={styles.topLeftText}>Engineering & Architecture</Text>
                                {/* <View style={styles.centeredCustom}>
                                    <Image style={[styles.centerImageCustom, { marginTop: 75 }]} source={require("../../../../assets/icons/arch.png")}/>
                                </View> */}
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </Fragment>
    )
}
export default connect(null, { addJobData })(CategoryStartJobCreationHelper);