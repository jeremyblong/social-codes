import React from "react";
import { StyleSheet, Dimensions } from "react-native";


const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    slide: {
        maxWidth: width,
        height,
        width: "100%",
        resizeMode: "stretch",
        flex: 1,
        justifyContent: 'center',
        alignContent: "center",
        alignItems: "center"
    },
    container: {
        backgroundColor: "rgba(255, 255, 255, 0.6)",
        borderWidth: 2,
        borderColor: "black",
        margin: 15,
        shadowColor: "black",
        padding: 10,
        borderRadius: 25,
        minHeight: 300,
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        height: "80%",
        marginBottom: 100,
        elevation: 24,
        justifyContent: 'center',
        alignContent: "center",
        alignItems: "center"
    },
    absoluteBtn: {
        position: "absolute",
        bottom: 20
    },
    wrapper: {
        flex: 1
    },
    hr: {
        borderBottomColor: "white",
        borderBottomWidth: 2,
        marginTop: 10,
        marginBottom: 10
    },
    title: {
        fontSize: 30,
        top: 50,
        fontWeight: "bold",
        color: "black",
        textAlign: "center"
    },
    text: {
        color: "black",
        fontSize: 20,
        marginBottom: 125,
        textAlign: "center"
    },
    vector: {
        maxWidth: width,
        maxHeight: height
    },
    icon: {
        maxWidth: width,
        maxHeight: 200,
        height: 200,
        width: width
    },
    iconTwo: {
        maxWidth: width,
        maxHeight: 200,
        height: 200,
        width: width
    }
})