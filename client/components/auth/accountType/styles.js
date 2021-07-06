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
        color: "grey"
    },
    selectedRow: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "blue",
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
        color: "blue",
        fontSize: 18
    },
    image: {
        maxWidth: 100,
        maxHeight: 100,
        marginLeft: 10
    }
})