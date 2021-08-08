import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    headerIcon: {
        maxWidth: 35,
        maxHeight: 35,
        tintColor: "#ffffff"
    },
    boldDark: {
        color: "black"
    }, 
    iconCustomDark: {
        tintColor: "#141414",
        maxWidth: "70%", 
        maxHeight: "75%"
    },
    whiteText: {
        color: "#ffffff"
    },
    container: {
        width,
        height,
        zIndex: -1,
        backgroundColor: "#141414"
    },
    margin: {
        margin: 20
    },
    headerText: {
        margin: 10,
        fontSize: 18,
        fontWeight: "bold",
        color: "#ffffff"
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
        tintColor: "#ffffff",
        maxWidth: 25, 
        maxHeight: 25
    },
    bold: {
        fontWeight: "bold",
        color: "#ffffff"
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
        backgroundColor: "#ffffff",
        borderColor: "#0057ff",
        height: 75
    },
    redText: {
        color: "red",
        marginTop: 15
    },
    boxedContainerSelected: {
        borderWidth: 1,
        borderColor: "#0057ff",
        backgroundColor: "#ffffff",
        flexDirection: "row",
        height: 50,
        marginTop: 15
    },
    boxedContainer: {
        borderWidth: 1,
        borderColor: "#cccccc",
        flexDirection: "row",
        height: 50,
        marginTop: 15
    },
    blackText: {
        color: "black"
    },
    titleSelected: {
        color: "#0057ff",
        fontSize: 15,
        backgroundColor: "#ffffff",
        fontWeight: "bold",
        textAlign: "left" 
    },
    boxed: {
        flexDirection: "row",
        borderWidth: 2,
        borderColor: "#cccccc",
        height: 75
    },
    graphStyle: {
          
    },
    iconCustom: {
        maxWidth: "70%", 
        maxHeight: "75%",
        tintColor: "#ffffff"
    },
    row: {
        flexDirection: "row"
    },
    icon: {
        maxWidth: "75%",
        maxHeight: "65%",
        tintColor: "#141414"
    },
    title: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#ffffff",
        textAlign: "left"
    },  
    animation: {
        minWidth: "100%",
        backgroundColor: "#ffffff",
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
    iconDark: {
        tintColor: "#ffffff",
        maxWidth: "75%",
        maxHeight: "65%"
    },
    smallColumn: {
        width: "15%",
        marginRight: 4,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
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
    }
})