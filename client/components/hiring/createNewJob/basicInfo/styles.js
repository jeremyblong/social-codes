import React from "react";
import { StyleSheet, Dimensions, Platform } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    headerIcon: {
        maxWidth: 35,
        maxHeight: 35
    },
    container: {
        width,
        height: Platform.OS === "ios" ? height - 94 : height - 74,
        zIndex: -1,
        backgroundColor: "#141414"
    },
    whiteText: {
        color: "#ffffff"
    },
    margin: {
        margin: 20
    },
    lefted: {
        maxWidth: 25,
        maxHeight: 25
    },
    label: {
        fontSize: 18,
        color: "#ffffff"
    },
    smallRed: {
        marginTop: 10,
        color: "blue"
    },
    leftMore: {
       maxHeight: 30,
       top: -25
    },  
    headerText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#ffffff"
    },
    greenText: { 
        textAlign: "right", 
        marginBottom: 10, 
        fontSize: 15, 
        color: "#22e000" 
    },
    redText: { 
        textAlign: "right", 
        marginBottom: 10, 
        fontSize: 15, 
        color: "#ff0022" 
    },
    greenTextTwo: { 
        display: "none" 
    },
    redTextTwo: { 
        textAlign: "left", 
        marginTop: 10,
        marginLeft: 5, 
        fontSize: 15, 
        color: "#ff0022" 
    },
    bottomView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0
    }
})