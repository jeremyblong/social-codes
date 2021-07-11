import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    headerIcon: {
        maxWidth: 35,
        maxHeight: 35,
        tintColor: "#ffd530"
    },
    goldText: {
        color: "#ffd530"
    },
    container: {
        width,
        height,
        zIndex: -1,
        backgroundColor: "white"
    },
    margin: {
        margin: 20
    },
    headerText: {
        margin: 10,
        fontSize: 16,
        fontWeight: "bold"
    },
    thickHr: {
        borderBottomColor: "lightgrey",
        borderBottomWidth: 10
    },
    line: {
        backgroundColor: 'black', 
        height: 2, 
        flex: 1, 
        alignSelf: 'center'
    },
    maxWidth: {

    },
    specialText: {
        alignSelf:'center', 
        paddingHorizontal:5, 
        fontSize: 18
    },
    boxed: {
        borderWidth: 2,
        borderColor: "lightgrey",
        marginTop: 15
    },
    selected: {
        borderWidth: 2,
        borderColor: "darkred",
        marginTop: 15
    },
    tagger: {
        backgroundColor: "#f7f8fa",
        padding: 10,
        margin: 5,
        borderWidth: 1,
        borderColor: "lightgrey"
    },
    right: {
        position: "absolute",
        right: 20,
        paddingTop: 8
    },
    icon: {
        maxWidth: 35,
        maxHeight: 35
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
    }
})