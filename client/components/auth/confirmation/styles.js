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
    centered: {
        justifyContent: "center",
        alignItems: "center", 
        alignContent: "center",
        marginTop: 15
    },
    emailIcon: {
        maxWidth: 125,
        maxHeight: 125
    },
    emailText: {
        fontSize: 16
    }
})