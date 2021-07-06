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
        margin: 10
    },
    headerText: {
        fontWeight: "bold",
        fontSize: 15,
        marginBottom: 10
    },
    boxed: {
        borderWidth: 2,
        borderColor: "lightgrey",
        borderRadius: 10,
        justifyContent: "center", 
        alignItems: "center", 
        alignContent: "center",
        minHeight: 50
    },
    completionText: {
        fontSize: 18,
        fontWeight: "bold"
    },
    topLeft: {
        width: 50,
        maxWidth: 50,
        maxHeight: 50,
        height: 50,
        position: "absolute",
        top: 15,
        left: 10,
        zIndex: 999
    },
    customView: {
        flex: 1, 
        backgroundColor: "white", 
        justifyContent: "center", 
        alignItems: "center", 
        alignContent: "center"
    },
    bottom: {
        position: "absolute",
        bottom: 15,
        right: 0,
        left: 0
    }
});
  