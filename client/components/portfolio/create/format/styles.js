import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    container: {
        width,
        height,
        backgroundColor: "white"
    },
    headerIcon: {
        maxWidth: 35,
        maxHeight: 35
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
    },
    margin: {
        margin: 15
    },
    boxed: {
        marginTop: 20,
        borderColor: "lightgrey",
        borderWidth: 2,
        borderRadius: 20,
        shadowColor: "black",
        shadowOffset: {
            width: 10,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,
        elevation: 13,
        height: 250, 
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        width: "100%"
    },
    thickHr: {
        borderBottomColor: "darkblue",
        borderBottomWidth: 5,
        marginTop: 30, 
        marginBottom: 10
    },      
    selected: {
        marginTop: 20,
        borderColor: "blue",
        borderWidth: 2,
        borderRadius: 20,
        shadowColor: "blue",
        shadowOffset: {
            width: 10,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,
        elevation: 13,
        height: 250, 
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        width: "100%"
    },
    bold: {
        fontWeight: "bold",
        textAlign: "center"
    }
});
  