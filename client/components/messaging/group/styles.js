
import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

const screenHeight = Dimensions.get("screen").height;

export default StyleSheet.create({
    container:{
        flex:1, 
        backgroundColor: 'white',
    },
    headerProfilePic: {
        maxWidth: 40, 
        minWidth: 40,
        minHeight: "150%",
        borderRadius: 120,
        maxHeight: "150%"
    },
    title: {
        fontSize: 20,
        marginLeft: 0,
        width: 175
    },
    columnLeft: {
        width: width * 0.20
    },
    topHeader: {
        borderBottomColor: "transparent",
        backgroundColor: "white",
        height: 60
    },
    centered: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },  
    smallerIcon: {
        maxWidth: 35,
        tintColor: "#ffffff",
        maxHeight: 35
    },
    bottomButton: {
        position: "absolute",
        bottom: 0,
        width
    },
    rightTyping: {
        position: "absolute",
        left: 10
    },
    topTextSmall: {
        fontWeight: "bold"
    },
    previewImage: {
        minWidth: 200,
        maxWidth: 200,
        maxHeight: "80%",
        minHeight: "80%"
    },
    footerContainer: {
        margin: 10,
        marginBottom: 50
    },
    footerText: {

    },
    circleMenu: {
        maxWidth: 65,
        maxHeight: 65,
        zIndex: 9999
    },
    icon: {
        maxWidth: 25, 
        tintColor: "#ffffff",
        maxHeight: 25
    }
})