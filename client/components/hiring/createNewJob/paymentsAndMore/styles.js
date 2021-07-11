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
    contain: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        marginLeft: 10
    },
    absoluteRight: {
        position: "absolute",
        right: 10,
        top: 10,
        maxWidth: 25, 
        maxHeight: 25
    },
    bold: {
        fontWeight: "bold"
    },
    larger: {
        maxWidth: "80%",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    smallColumnCustom: {
        maxWidth: "20%",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        maxHeight: 50  
    },
    boxedSelected: {
        flexDirection: "row",
        borderWidth: 2,
        backgroundColor: "#ffd530",
        borderColor: "darkred",
        height: 75
    },
    redText: {
        color: "red",
        marginTop: 15
    },
    boxedContainerSelected: {
        borderWidth: 1,
        borderColor: "darkred",
        backgroundColor: "#ffd530",
        flexDirection: "row",
        height: 50,
        marginTop: 15
    },
    boxedContainer: {
        borderWidth: 1,
        borderColor: "lightgrey",
        flexDirection: "row",
        height: 50,
        marginTop: 15
    },
    titleSelected: {
        color: "darkred",
        fontSize: 15,
        backgroundColor: "#ffd530",
        fontWeight: "bold",
        textAlign: "left" 
    },
    boxed: {
        flexDirection: "row",
        borderWidth: 2,
        borderColor: "lightgrey",
        height: 75
    },
    graphStyle: {
          
    },
    row: {
        flexDirection: "row"
    },
    icon: {
        maxWidth: "75%",
        maxHeight: "65%"
    },
    title: {
        fontSize: 15,
        fontWeight: "bold",
        textAlign: "left"
    },  
    animation: {
        minWidth: "100%",
        minHeight: "100%"
    },
    largeColumn: {
        justifyContent: "center",
        width: "85%"
    },
    topRight: {
        position: "absolute",
        right: 20,
        top: 3
    },
    smallColumn: {
        width: "15%",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    }
})