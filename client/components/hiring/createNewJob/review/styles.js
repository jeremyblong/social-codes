import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    container: {
        width,
        height,
        backgroundColor: "white"
    },
    innerContainer: {
        width,
        height,
        backgroundColor: "white"
    },
    margin: {
        margin: 20
    },
    headerText: {
        fontWeight: "bold",
        fontSize: 15,
        marginBottom: 10
    },
    headerIcon: {
        maxWidth: 35,
        maxHeight: 35
    },
    circle: {
        borderWidth:1,
        borderColor: 'rgba(0,0,0,0.4)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 50,
        position: 'absolute',
        right: 10
    },
    tag: {
        margin: 5,
        backgroundColor: "#ebedeb",
        padding: 6,
        padding: 10,
        borderRadius: 10
    },  
    thinLine: {
        marginTop: 15, 
        marginBottom: 15, 
        borderBottomWidth: 2, 
        borderBottomColor: "lightgrey"
    },
    icon: {
        maxWidth: 25,
        padding: 5,
        maxHeight: 25
    },
    row: {
        flexDirection: "row",
        maxHeight: 60
    },
    rowTwo: {
        flexDirection: "row",
        maxHeight: 120
    },
    headerTextMain: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10
    },
    thickHr: {
        borderBottomColor: "lightgrey",
        borderBottomWidth: 10
    }
});
  