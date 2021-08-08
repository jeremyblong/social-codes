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
        fontSize: 16,
        fontWeight: "bold",
        color: "#ffffff"
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
    rowTwo: {
        flexDirection: "row"
    },
    specialText: {
        alignSelf:'center', 
        paddingHorizontal:5, 
        fontSize: 18
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
    },
    tagger: {
        backgroundColor: "#f7f8fa",
        padding: 10,
        margin: 5,
        borderWidth: 1,
        borderColor: "lightgrey"
    },
    iconCustomTwo: {
        tintColor: "#ffffff",
        maxWidth: 35,
        maxHeight: 35 
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
    headerTextMain: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "left"
    },
    icon: {
        maxWidth: 25,
        padding: 5,
        maxHeight: 25
    }
})