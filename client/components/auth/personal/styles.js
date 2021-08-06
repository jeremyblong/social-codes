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
        backgroundColor: "#141414",
        flex: 1
    },
    whiteText: {
        color: "#ffffff"
    },
    goldText: {
        color: "#ffffff"
    },
    margin: {
        margin: 20
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#ffffff"
    },
    greyText: {
        color: "#cccccc"
    },
    bottomContainer: {
        backgroundColor: "white"
    },
    title: {
        marginBottom: 10,
        fontSize: 18,
        color: "#ffffff"
    },
    redText: {
        color: "red",
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 20
    },
    centered: {
        justifyContent: "center",
        alignItems: "center", 
        alignContent: "center"
    },
    boxed: {
        minHeight: 60, 
        width: "100%",
        borderWidth: 2,
        borderColor: "grey",
        justifyContent: "center",
        alignItems: "center", 
        alignContent: "center"
    },
    hr: {
        borderBottomColor: "grey",
        borderBottomWidth: 2,
        marginTop: 15,
        marginBottom: 15
    }
})