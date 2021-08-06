import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    headerIcon: {
        maxWidth: 40,
        maxHeight: 40,
        tintColor: "#ffffff"
    },
    goldText: {
        color: "#ffffff"
    },
    container: {
        backgroundColor: "white",
        minHeight: height,
        width,
        zIndex: -1
    },
    mainHeaderText: {
        fontSize: 30,
        fontWeight: "bold"
    },
    headerText: {
        fontSize: 18, 
        fontWeight: "bold", 
        color: "#0057ff"
    },
    margin: {
        margin: 20
    },
    listitem: {
        minHeight: 100
    }
})