import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    headerIcon: {
        maxWidth: 35,
        maxHeight: 35,
        tintColor: "#ffffff"
    },
    container: {
        width,
        height,
        zIndex: -1,
        backgroundColor: "#141414"
    },
    margin: {
        margin: 10
    },
    whiteText: {
        color: "#ffffff"
    },
    headerText: {
        margin: 10,
        fontSize: 15,
        fontWeight: "bold",
        color: "#ffffff"
    }
})