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
    },
    margin: {
        margin: 10
    },
    largeText: {
        fontSize: 26,
        fontWeight: "bold",
        textDecorationLine: "underline"
    },
    boxedLong: {
        height: 150,
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
        borderColor: "black"
    },
    row: {
        flexDirection: "row"
    },
    boxedShort: {
        width: "48.5%",
        height: 157,
        margin: 5,
        borderWidth: 3,
        borderColor: "black",
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
        fontSize: 18, 
        position: "absolute", 
        maxWidth: "90%",
        top: 10, 
        fontWeight: "bold",
        left: 10,
        zIndex: 999
    },
    centerImage: {
        maxWidth: 200,
        marginTop: 25,
        marginLeft: 275,
        maxHeight: 200
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
        maxWidth: 200,
        marginTop: 25,
        marginLeft: 0,
        maxHeight: 200
    },
    centerImageCustomTwo: {
        maxWidth: 200,
        marginTop: 25,
        marginLeft: 220,
        maxHeight: 200
    }
})