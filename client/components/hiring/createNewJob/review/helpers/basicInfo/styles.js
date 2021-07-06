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
        backgroundColor: "white"
    },
    circle: {
        borderWidth:1,
        borderColor: 'rgba(0,0,0,0.4)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 50,
        position: 'absolute',
        right: 10
    },
    icon: {
        maxWidth: 25,
        padding: 5,
        maxHeight: 25
    },
    margin: {
        margin: 20
    },
    lefted: {
        maxWidth: 25,
        maxHeight: 25
    },
    row: {
        flexDirection: "row",
        maxHeight: 60
    },
    rowTwo: {
        flexDirection: "row",
        maxHeight: 120
    },
    headerTextMain: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10
    },
    label: {
        fontSize: 18
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
        fontWeight: "bold"
    },
    greenText: { 
        textAlign: "right", 
        marginBottom: 10, 
        fontSize: 15, 
        color: "green" 
    },
    redText: { 
        textAlign: "right", 
        marginBottom: 10, 
        fontSize: 15, 
        color: "red" 
    },
    greenTextTwo: { 
        display: "none" 
    },
    redTextTwo: { 
        textAlign: "left", 
        marginTop: 10,
        marginLeft: 5, 
        fontSize: 15, 
        color: "red" 
    },
    bottomView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0
    }
})