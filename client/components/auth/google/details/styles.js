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
        height: "100%",
        backgroundColor: "white",
        flex: 1
    },
    margin: {
        margin: 20
    },
    scroller: {
        height: "100%"
    },
    greenText: {
        color: "green",
        fontSize: 15,
        marginTop: 15
    },
    redText: {
        color: "red",
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 20
    },
    title: {
        marginBottom: 10,
        fontSize: 18
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
    boxed: {
        minHeight: 60, 
        width: "100%",
        borderWidth: 2,
        borderColor: "grey",
        justifyContent: "center",
        alignItems: "center", 
        alignContent: "center"
    },
    centered: {
        justifyContent: "center",
        alignItems: "center", 
        alignContent: "center"
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