import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    scene: {
        flex: 1
    },
    headerIcon: {
        maxWidth: 35,
        maxHeight: 35,
        tintColor: "#fdd530"
    },
    hr: {
        marginTop: 25,
        marginBottom: 15,
        borderBottomColor: "grey",
        borderBottomWidth: 3
    },
    animation: {
        maxWidth: width * 0.80, maxHeight: height * 0.30, minWidth: width * 0.80, minHeight: height * 0.30
    },
    centered: {
        position: "absolute",
        left: (width / 2) - width * 0.40,
        bottom: -50
    },
    whiteText: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10
    },
    smallGrey: {
        color: "grey",
        marginTop: 15
    },
    bottomed: {
        margin: 10
    },
    redTextSmall: {
        color: "red",
        marginTop: 10
    },
    greenText: {
        color: "green",
        fontSize: 15
    },
    redText: {
        color: "red",
        fontSize: 15
    }
})