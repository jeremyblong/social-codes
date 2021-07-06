import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    container: {
        width,
        height,
        backgroundColor: "white"
    },
    margin: {
        margin: 15
    },
    headerText: {
        fontSize: 18,
        marginBottom: 10
    },
    touchable: {
        borderWidth: 2,
        borderColor: "lightgrey",
        justifyContent: "center",
        alignItems: "center",
        alignItems: "center",
        padding: 10
    },
    spinnerTextStyle: {
        color: "white", 
        fontSize: 18
    },
    fileText: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 15,
        marginTop: 20
    },
    row: {
        flexDirection: "row"
    },
    buttonText: {
        marginTop: 5,
        marginLeft: 10,
        color: "blue"
    },
    centeredCustom: {
        justifyContent: "center",
        alignItems: "center",
        alignItems: "center",
        maxHeight: 100
    },
    icon: {
        maxWidth: 25, 
        maxHeight: 25, 
        tintColor: "blue"
    },
    circleMenu: {
        maxWidth: 65,
        maxHeight: 65,
        zIndex: 9999
    },
    bottomRightCorner: {
        position: "absolute",
        bottom: 20,
        right: 20,
        zIndex: 9999
    }
});
  