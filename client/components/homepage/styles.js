import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    logo: {
        maxWidth: width * 0.80,
        height: 45
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: "center"
    },
    backgroundVideo: {
        position: "absolute",
        bottom: 0,
        left: 0,
        top: 0,
        right: 0,
        width,
        height
    },
    whiteMedium: {
        fontSize: 22,
        color: "white",
        textAlign: "center",
        marginTop: 15,
        fontWeight: "bold"
    },
    container: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        height
    },
    hr: {
        marginTop: 0,
        marginBottom: 10
    },
    background: {
        width,
        height
    },
    image: {
        maxWidth: width,
        maxHeight: 250,
        marginTop: 15
    },
    button: {
        backgroundColor: "white"
    },
    bottom: {
        margin: 20,
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        bottom: 10,
        left: 0,
        right: 0
    }
})