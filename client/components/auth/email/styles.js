import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    headerIcon: {
        maxWidth: 35,
        maxHeight: 35
    },
    container: {
        zIndex: -1,
        width,
        height,
        backgroundColor: "white",
        flex: 1
    },
    goldText: {
        color: "#ffd530"
    },
    margin: {
        margin: 20
    },
    header: {
        fontSize: 24,
        fontWeight: "bold"
    },
    greyText: {
        color: "grey"
    },
    bottomContainer: {
        backgroundColor: "white"
    },
    greenText: {
        color: "green",
        fontSize: 15,
        marginTop: 15
    },
    redText: {
        color: "red",
        fontSize: 15,
        marginTop: 15
    }
})