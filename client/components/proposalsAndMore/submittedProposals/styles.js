import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    headerIcon: {
        maxWidth: 35,
        maxHeight: 35
    },
    container: {
        width,
        height,
        backgroundColor: "white",
        zIndex: -1
    },
    headerText: {
        fontSize: 20,
        fontWeight: "bold"
    },
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
    cardContent: {
        marginLeft:20,
        marginTop:10,
    },
    image:{
        width:25,
        height:25,
    },
    
    card:{
        shadowColor: 'black',
        shadowOffset: {
          width: 5,
          height: 6,
        },
        shadowOpacity: 0.70,
        shadowRadius: 7.49,
        elevation: 12,
    
        marginVertical: 10,
        marginHorizontal:20,
        backgroundColor:"white",
        flexBasis: '46%',
        padding: 10,
        flexDirection:'row',
        flexWrap: 'wrap',
        borderLeftWidth:6,
    },
    description:{
        fontSize:18,
        flex:1,
        color:"black",
        fontWeight:'bold',
    },
    date:{
        fontSize:14,
        flex:1,
        color:"#696969",
        marginTop:5
    },
    milestone: {
        borderWidth: 1,
        borderColor: "grey",
        padding: 10,
        marginRight: 10,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        alignContent: "flex-start"
    },
    milestoneOutter: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12
    },
    milestoneIcon: {
        maxWidth: 45, 
        maxHeight: 45
    },
    larger: { 
        flexDirection: 'row', 
        flexWrap: 'wrap',
        marginTop: 20
    },
    largeText: {
        fontSize: 18  
    },
    mediumText: {
        fontSize: 15
    },
    smallText: {
        fontSize: 12
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
        color: "white", 
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
        maxHeight: 30
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
    },
    circleMenu: {
        maxWidth: 65,
        maxHeight: 65,
        minWidth: 65,
        minHeight: 65,
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
    }
})