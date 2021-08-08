import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    headerIcon: {
        maxWidth: 35,
        maxHeight: 35,
        tintColor: "#ffffff"
    },
    whiteText: {
        color: "#ffffff"
    },
    container: {
        width,
        height,
        zIndex: -1,
        backgroundColor: "#141414"
    },
    margin: {
        margin: 20
    },
    headerText: {
        margin: 10,
        fontSize: 18,
        fontWeight: "bold",
        color: "#ffffff"
    },
    right: {
        position: "absolute",
        right: 20,
        paddingTop: 8
    },
    icon: {
        maxWidth: 35,
        maxHeight: 35,
        tintColor: "#ffffff"
    }, 
    errorText: {
        color: "red",
        marginTop: 15,
        margin: 10
    },  
    normalText: {
        fontSize: 15,
        color: "#ffffff"
    },
    thickHr: {
        borderBottomColor: "lightgrey",
        borderBottomWidth: 10
    },
    innerBox: {
        flexDirection: "row",
        height: 50,
        width: "100%"
    },
    innerBox: {
        flexDirection: "row",
        height: 50,
        width: "100%"
    },
    left: {
        justifyContent: "flex-start",
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 10,
        alignContent: "center"
    },
    boxed: {
        borderWidth: 2,
        borderColor: "#cccccc",
        marginTop: 15
    },
    selected: {
        borderWidth: 2,
        borderColor: "#0057ff",
        marginTop: 15
    }
})