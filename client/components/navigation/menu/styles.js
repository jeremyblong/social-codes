import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    maxedIconSmall: {
        maxHeight: 35,
        maxWidth: 35,
        tintColor: "#ffffff"
    },
    centered: {
        justifyContent: "center",
        alignItems: "center", 
        alignContent: "center"
    },
    container: {
        backgroundColor: "#141414"
    },
    greyButton: {
        backgroundColor: "#303030"
    },
    absoluteBadge: {
        position: "absolute",
        bottom: 0,
        zIndex: -1,
        top: 0
    },
    rowCustom: {
        flexDirection: "row",
        margin: 10,
        maxHeight: 50
    },
    smallColumn: {
        width: width * 0.15
    },  
    largeColumn: {
        width: width * 0.85
    },
    customRowTwo: {
        margin: 10,
        maxHeight: 40,
        flexDirection: "row"
    },
    backgroundVideo: {
        maxWidth: 40,
        maxHeight: 40,
        minWidth: 40, 
        minHeight: 40,
        borderRadius: 40
    },
    profilePic: {
        maxWidth: 40,
        maxHeight: 40,
        minWidth: 40, 
        minHeight: 40,
        borderRadius: 40
    },
    tallView: {
        height: 240,
        backgroundColor: "#d4d4d4",
        borderColor: "grey",
        borderWidth: 1,
        minWidth: "90%",
        minHeight: 240,
        borderRadius: 25,
        margin: 5,
        shadowColor: "white",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.3,
        shadowRadius: 7.49,
        elevation: 12
    },
    shortViewIcon: {
        maxWidth: 30,
        maxHeight: 30
    },
    shortViewIconTwo: {
        maxWidth: 60,
        maxHeight: 40
    },
    sub: {
        marginTop: 10,
        marginLeft: 5,
        fontSize: 13
    },
    profileIcon: {
        maxWidth: 40,
        maxHeight: 40,
        tintColor: "#ffffff",
        borderWidth: 2,
        borderRadius: 25,
        position: "absolute",
        position: 'absolute',
        alignSelf: 'center',
        top: "40%"
    },
    profileIconTwo: {
        maxWidth: 40,
        tintColor: "#ffffff",
        maxHeight: 40,
        position: "absolute",
        position: 'absolute',
        alignSelf: 'center',
        top: "40%"
    },
    manageText: {   
        marginTop: 20,
        marginLeft: 5,
        fontSize: 18,
        fontWeight: "bold"
    },
    stretch: {
        maxWidth: "100%",
        minWidth: "100%",
        minHeight: "100%",
        maxHeight: "100%",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25
    },
    innerText: {
        fontSize: 20,
        textAlign: 'left',
        margin: 14,
        color: "black"
    },
    halfHeight: {
        maxHeight: "50%",
        height: "50%"
    },
    hr: {
        marginTop: 10
    },
    margin: {
        margin: 20
    },
    midSized: {
        fontSize: 16,
        marginTop: 15,
        fontWeight: "bold"
    },
    largeSized: {
        fontSize: 16,
        marginTop: 15,
        fontWeight: "bold"
    },
    shortView: {
        height: 130,
        borderColor: "grey",
        backgroundColor: "#d4d4d4",
        borderWidth: 1,
        minWidth: "90%",
        minHeight: 130,
        borderRadius: 25,
        margin: 5,
        padding: 8,
        shadowColor: "white",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.3,
        shadowRadius: 7.49,
        elevation: 12
    },
    menuText: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#ffffff"
    },
    halfed: {
        width: "45%",
        minWidth: "45%"
    },
    greyText: {
        fontSize: 15,
        color: "white"
    },
    title: {
        fontWeight: "bold",
        fontSize: 18,
        color: "#ffffff"
    },
    circledButton: {
        borderRadius: 50,
        maxHeight: 48,
        padding: 10,
        borderWidth: 2,
        borderColor: "lightgrey",
        backgroundColor: "white"
    },
    search: {
        maxWidth: 25,
        maxHeight: 25
    },
    right: {
        position: "absolute",
        right: 10
    },
    innerBoxed: {
        flexDirection: "row",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "lightgrey",
        width: width * 0.90,
        minWidth: width * 0.90,
        padding: 10,
        shadowColor: "white",
        backgroundColor: "white",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        elevation: 15
    },
    innerBoxedText: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 3.5
    },
    listIcon: {
        width: 30,
        marginRight: 15,
        height: 30
    }
})