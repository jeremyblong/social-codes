
import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    container:{
        flex:1, 
        backgroundColor: 'white',
        zIndex: -1,
        width,
        height
    },
    headerIcon: {
        maxWidth: 35,
        maxHeight: 35
    },
    margin: {
        margin: 15
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
    headerText: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "left"
    },
    freelancers: {
        fontSize: 18,
        textDecorationLine: "underline"
    },
    subText: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 15,
        textAlign: "center",
        marginTop: 15
    },
    larger: { 
        flexDirection: 'row', 
        flexWrap: 'wrap',
        marginTop: 20
    },
    smaller: {
        flexDirection: 'row', 
        flexWrap: 'wrap',
        marginTop: 20
    },
    margin: {
        margin: 15
    },
    boxOne: {
        marginTop: 15
    },
    column: {
        width: width * 0.50
    },
    tagger: {
        backgroundColor: "#f2f0f0",
        padding: 8,
        margin: 5
    },
    hr: {
        borderBottomColor: "lightgrey",
        borderBottomWidth: 1.5,
        marginTop: 10,
        marginBottom: 10
    },
    blueTextSmall: {
        fontWeight: "bold",
        color: "blue"
    },
    posted: {
        marginTop: 10,
        color: "grey"
    },
    row: {
        flexDirection: "row",
        maxWidth: width * 0.80
    },
    thickHr: {
        borderBottomColor: "lightgrey",
        borderBottomWidth: 10
    },
    thinLine: {
        borderBottomWidth: 1,
        borderBottomColor: "lightgrey",
        marginTop: 15
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        marginTop: 10
    },
    greybox: {
        backgroundColor: "#f2f2f2",
        minHeight: 65,
        marginTop: 15,
        flexDirection: "row",
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: "center"
    },
    leftText: {
        marginRight: 15,
        fontWeight: "bold",
        fontSize: 18
    },
    leftTextTwo: {
        marginRight: 15,
        fontWeight: "bold",
        fontSize: 15
    },
    rightText: {
        fontWeight: "bold",
        fontSize: 18
    },
    rightTextTwo: {
        fontWeight: "bold",
        fontSize: 15
    },
    yourRate: {
        fontSize: 18, 
        fontWeight: "bold",
        marginTop: 13
    },
    alignRight: {
        position: "absolute",
        right: -30
    },
    sendIcon: {
        width: 60,
        height: 60
    },
    textarea: {
        height: "90%"
    },
    rowCustom: {
        flexDirection: "row"
    },
    bottomRightSend: {
        position: 'absolute',
        bottom: 25,
        width: 150,
        height: 65,
        right: 50
    },  
    specialTextSend: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 15
    },
    subText: {
        textAlign: "left"
    },
    dollarsign: {
        maxWidth: 25, 
        maxHeight: 25
    },
    topLeftAbsolute: {
        position: "absolute",
        left: 15,
        top: 10
    },
    centered: {
        justifyContent: "center", 
        alignItems: "center", 
        alignContent: "center"
    },
    closeIcon: {
        maxWidth: 35,
        maxHeight: 35
    },
    proposalViewBtn: {
        width: width * 0.75,
        justifyContent: "center", 
        alignItems: "center", 
        alignContent: "center"
    },
    proposalBtnText: {
        color: "white",
        fontWeight: "bold"
    },
    modalStyles: {
        flex: 1, 
        backgroundColor: "white", 
        maxHeight: height * 0.50, 
        justifyContent: "center", 
        alignItems: "center", 
        alignContent: "center"
    },
    warningTextTwo: {
        color: "#ff3700",
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 15,
        marginBottom: 15
    },
    rate: {
        textAlign: "center", 
        fontWeight: "bold",
        marginTop: 10,
        fontSize: 15
    },
    xIcon: {
        maxWidth: 30, 
        maxHeight: 30,
        justifyContent: "flex-end",
        alignItems: "flex-end",
        alignSelf: "flex-end"
    },
    iconFloatRight: {
        justifyContent: "flex-end",
        alignItems: "flex-end",
        alignSelf: "flex-end",
        marginBottom: 15,
        marginRight: 15
    },
    addMilestone: {
        flexDirection: "row"
    },
    infoText: { 
        fontWeight: "bold", 
        color: "#ffd530", 
        marginLeft: 15 
    },
    coverletterbox: {
        borderWidth: 2, 
        borderColor: "blue"
    },
    spinnerTextStyle: {
        color: "white"
    },
    clip: {
        maxWidth: 30, 
        maxHeight: 30,
        tintColor: "#ffd530"
    },
    fee: {
        color: "grey", 
        fontWeight: "bold",
        position: "absolute",
        right: -40,
        fontSize: 18,
        top: 15
    },
    warningText: {
        marginLeft: 15
    },
    circleOrange: { 
        maxWidth: 20, 
        maxHeight: 20 
    }
})