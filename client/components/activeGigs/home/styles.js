import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    container: {
        zIndex: -1,
        width,
        height: "100%",
        backgroundColor: "#141414",
        flex: 1
    },
    margin: {
        margin: 20
    },
    maxedIconSmall: {
        maxWidth: 35,
        maxHeight: 35,
        tintColor: "#ffffff"
    },
    goldText: {
        color: "#ffffff"
    },
    whiteText: {
        color: "#ffffff"
    },
    grayButton: {
        backgroundColor: "#303030"
    },
    thumbnailVideo: {
        minWidth: 55,
        minHeight: 55,
        maxWidth: 55,
        maxHeight: 55,
        borderRadius: 40
    },
    absoluteBadge: {
        top: 15
    }
})