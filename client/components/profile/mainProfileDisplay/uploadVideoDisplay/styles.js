import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    recordButtonContainer: {
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        bottom: 10,
        left: 0,
        right: 0,
        minWidth: 50,
        minHeight: 50
    },
    countdownContainer: {
        position: "absolute",
        bottom: 25,
        left: 25
    },
    countdownText: {
        fontSize: 40,
        fontWeight: "bold",
        color: "white"
    },
    backgroundVideo: {
        flex: 1,
        width,
        height
    },
    spinnerTextStyle: {
        color: "white"
    },
    recordButtonContainerCurrent: {
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        bottom: 10,
        left: 0,
        right: 0,
        minWidth: 50,
        minHeight: 50
    },
    recordButtonEnd: {
        maxWidth: 90,
        maxHeight: 90,
        minWidth: 90,
        minHeight: 90
    },
    recordButton: {
        maxWidth: 90,
        maxHeight: 90,
        minWidth: 90,
        minHeight: 90
    },
    switchCameraContainer: {
        position: "absolute",
        bottom: 50,
        right: 35
    },
    switchButton: {

    },
    bottomRow: {
        flexDirection: "row",
        position: "absolute",
        bottom: 25,
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        paddingTop: 25,
        paddingBottom: 25
    },
    highlighted: {
        position: "absolute",
        bottom: 10
    },
    highlightText: {
        fontSize: 24,
        color: "white",
        fontWeight: "bold"
    },
    highlightedRight: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    highlightedLeft: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    columnBottom: {
        width: width * 0.50
    },
    topLeft: {
        position: "absolute",
        left: 25,
        top: 25,
        flexDirection: "row"
    },
    topLeftImage: {
        maxWidth: 55,
        maxHeight: 55,
        tintColor: "white"
    },
    goBackText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
        marginTop: 15
    }
});
  