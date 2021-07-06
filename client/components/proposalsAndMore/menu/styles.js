import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    listIcon: {
        width: 30,
        marginRight: 15,
        height: 30
    },
    centered: {
        justifyContent: "center",
        alignItems: "center", 
        alignContent: "center"
    },
    innerText: {
        fontSize: 20,
        padding: 10,
        textAlign: 'left',
        width,
        margin: 14,
        color: "black"
    },
    goldText: {
        color: "#ffd530"
    },
    margin: {
        margin: 20,
        width: width * 0.97
    },
    headerIcon: {
        maxWidth: 35,
        maxHeight: 35
    },
    circleMenu: {
        maxWidth: 65,
        maxHeight: 65,
        minWidth: 65,
        minHeight: 65,
        zIndex: 9999
    },
    bottomRightCorner: {
        position: "absolute",
        bottom: 20,
        right: 20,
        zIndex: 9999
    },
    container: {
        width,
        height,
        backgroundColor: "white",
        zIndex: -1
    },
    innerBoxed: {
        flexDirection: "row",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "lightgrey",
        width: "100%",
        minWidth: "100%",
        padding: 10,
        marginTop: 15,
        shadowColor: "#000",
        backgroundColor: "white",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        elevation: 15
    },
    innerBoxedText: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 3.5
    },
})