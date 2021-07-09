import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    container: {
        zIndex: -1,
        width,
        height,
        backgroundColor: "white"
    },
    margin: {
        margin: 20
    },
    headerText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "blue"
    },
    headerIcon: {
        maxWidth: 35,
        maxHeight: 35
    },
    goldText: {
        color: "#ffd530"
    },
    hr: {
        borderBottomColor: "grey",
        borderBottomWidth: 2,
        marginTop: 15,
        marginBottom: 15
    }
})