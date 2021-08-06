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
    smallColumn: {
        width: "30%",
        marginRight: 20,
        justifyContent: "center", 
        alignContent: "center"
    },
    row: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "lightgrey",
        maxHeight: 250,
        width: "100%"    
    },
    bottomContainer: {
        position: "absolute",
        bottom: 10,
        width
    },
    greyTextTwo: {
        marginBottom: 20,
        textAlign: "center",
        color: "#cccccc"
    },
    selectedRow: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#0057ff",
        maxHeight: 250,
        width: "100%"    
    },
    largeColumn: {
        width: "60%",
        justifyContent: "center", 
        alignContent: "center"
    },
    blueText: {
        textAlign: "left",
        fontWeight: "bold",
        color: "#ffffff",
        fontSize: 18
    },
    innerText: {
        color: "#cccccc"
    },
    image: {
        maxWidth: 100,
        maxHeight: 100,
        marginLeft: 10
    }
})