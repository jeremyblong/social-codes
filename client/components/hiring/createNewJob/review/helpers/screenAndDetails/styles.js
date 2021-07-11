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
        fontSize: 18,
        fontWeight: "bold"
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
    right: {
        position: "absolute",
        right: 20,
        paddingTop: 8
    },
    boxed: {
        borderWidth: 2,
        borderColor: "lightgrey",
        marginTop: 15
    },
    switchText: {
        marginTop: 5,
        marginLeft: 30,
        fontWeight: "bold"
    },
    specialRow: {
        marginTop: 10, 
        marginLeft: 15, 
        flexDirection: "row"
    },
    selected: {
        borderWidth: 2,
        borderColor: "darkred",
        marginTop: 15
    },
    rightHalf: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        marginLeft: 10
    },
    icon: {
        maxWidth: 35,
        maxHeight: 35
    },
    innerText: {
        textAlign: "center",
        color: "darkred",
        marginBottom: 10,
        fontSize: 18
    },      
    textarea: {
        width: width * 0.75,
        marginTop: 15,
        maxHeight: 75
    },
    redText: {
        fontSize: 13,
        color: "red",
        textAlign: "center",
        textDecorationLine: "underline"
    },
    thickHr: {
        borderBottomColor: "lightgrey",
        borderBottomWidth: 10
    },
    blueText: {
        color: "darkred"
    },
    row: {
        flexDirection: "row"
    },
    touchInnerText: {
        fontWeight: "bold",
        marginTop: 4,
        marginLeft: 10,
        fontSize: 18,
        color: "darkred"
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
    touchable: {
        flexDirection: "row",
        marginTop: 15,
        maxHeight: 50
    },
    plus: {
        maxWidth: 30,
        tintColor: "darkred",
        maxHeight: 30
    }
})