import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    headerIcon: {
        maxWidth: 35,
        maxHeight: 35
    },
    container: {
        width,
        height,
        zIndex: -1,
        backgroundColor: "white"
    },
    margin: {
        margin: 10
    },
    goldText: {
        color: "#ffd530"
    },
    headerText: {
        margin: 10,
        fontSize: 15,
        fontWeight: "bold",
        color: "darkred"
    }
})