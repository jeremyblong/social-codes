import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    headerIcon: {
        maxWidth: 35,
        maxHeight: 35
    },
    container: {
        width,
        height,
        zIndex: 999,
        backgroundColor: "black"
    },
    margin: {
        padding: 10,
        zIndex: 999,
        backgroundColor: "#303030"
    },
    largeText: {
        fontSize: 26,
        fontWeight: "bold",
        textDecorationLine: "underline",
        color: "#ffd530"
    },
    boxedLong: {
        height: 150,
        maxHeight: 150,
        maxWidth: "100%",
        width: "100%",
        borderWidth: 3,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
        borderColor: "white"
    },
    row: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    goldText: {
        color: "#ffd530"
    },
    boxedShort: {
        width: "48.5%",
        height: 157,
        margin: 5,
        borderWidth: 3,
        borderColor: "white",
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
    },
    topLeftText: {
        color: "black", 
        fontSize: 22, 
        position: "absolute", 
        maxWidth: "90%",
        top: 10, 
        fontWeight: "bold",
        left: 10,
        zIndex: 999
    },
    centerImage: {
        maxWidth: 200,
        marginTop: -55,
        zIndex: 0,
        marginLeft: 275,
        maxHeight: 200,
        resizeMode: "contain"
    },
    centered: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        maxHeight: 150
    },
    centeredCustom: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        maxHeight: 150
    },
    centerImageCustom: {
        maxWidth: 100,
        resizeMode: "contain",
        marginTop: -75,
        zIndex: 0,
        maxHeight: 100
    },
    centerImageCustomTwo: {
        maxWidth: 200,
        marginTop: 25,
        marginLeft: 220,
        maxHeight: 200
    }
})