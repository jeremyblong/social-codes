import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    maxedIcon: {
        maxWidth: 30,
        maxHeight: "100%"
    },
    maxedIconLogo: {
        maxWidth: 225,
        maxHeight: 50
    },
    maxedIconSmall: {
        maxHeight: 35,
        maxWidth: 35
    },
    maxedIconSmallTwo: {
        maxHeight: 25,
        maxWidth: 25
    },
    mediumColumn: {
        width: width * 0.50
    },
    nameText: {
        fontWeight: "bold",
        fontSize: 18
    },
    customRow: {
        flexDirection: "row"
    },
    row: {
        flexDirection: "row",
        margin: 10,
        maxHeight: 40
    },
    columnLarge: {
        width: width * 0.85
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
    innerText: {
        padding: 10,
        fontSize: 12
    },
    columnSmall: {
        width: width * 0.15
    },
    myProfileBtn: {
        flexDirection: "row",
        padding: 5,
        borderWidth: 1,
        borderColor: "grey",
        width: "50%"
    },
    expandSmall: {
        maxWidth: 15,
        maxHeight: 15
    },
    contact: {
        minHeight: "70%",
        minWidth: 50,
        borderRadius: 50,
        marginRight: 10
    },
    buttonCustom: {
        justifyContent: "center",
        alignItems: "center", 
        alignContent: "center",
        marginLeft: 10,
        margin: 5
    },
    absoluteBadge: {
        position: "absolute",
        bottom: 0,
        zIndex: -1,
        top: 0
    },
    textarea: {
        height: "70%",
        borderColor: "transparent",
        fontSize: 18,
        maxHeight: 200
    },
    rightLikeIcon: {
        position: "absolute",
        right: 10,
        top: -7.5
    },
    replyName: {
        fontWeight: "bold", 
        marginTop: 5, 
        marginLeft: 10
    },
    underlay: {
        flexDirection: "row", 
        justifyContent: "center", 
        alignItems: "center", 
        marginTop: 10
    },
    comment: {
        marginTop: 10
    },
    likeTouch: {
        marginLeft: 15
    },
    topRow: {
        minHeight: 45,
        marginTop: 20,
        borderBottomColor: "lightgrey",
        borderBottomWidth: 2,
        paddingBottom: 10
    },
    peopleText: {
        marginTop: 5,
        fontWeight: "bold",
        marginLeft: 10
    },
    popoverTwo: {
        width: width * 0.95,
        height: 70,
        borderRadius: 20,
        flexDirection: "row"
    },
    likeCount: {
        marginTop: 5,
        marginLeft: 10,
        fontWeight: "bold"
    },
    pictureContainer: {
        height: "85%"
    },
    hideContainer: {
        height: 0
    },
    lottiContainer: {
        justifyContent: "center",
        alignItems: "center", 
        alignContent: "center",
        maxHeight: 70,
        maxWidth: 55
    },
    spinnerTextStyle: {
        fontSize: 18,
        color: "white",
        fontWeight: "bold"
    },
    textareaSmall: {
        maxHeight: "35%",
        borderColor: "transparent",
        fontSize: 18,
        marginBottom: 20
    },
    bottomContainer: {
        position: "absolute",
        backgroundColor: "white",
        borderTopColor: "grey",
        borderTopWidth: 2,
        left: 0,
        right: 0,
        bottom: 15,
        flexDirection: "row"
    },
    textColorBlue: {
        color: "blue"
    },
    popover: {
        width: width * 0.95,
        height: "100%",
        padding: 10,
        backgroundColor: "white"
    },
    addText: {
        marginRight: 20,
        marginTop: 8,
        marginLeft: 10,
        fontWeight: "bold",
        fontSize: 18
    },
    right: {
        alignItems: "flex-end",
    },
    iconSmall: {
        maxWidth: 30,
        maxHeight: 30,
        margin: 5
    },
    profilePic: {
        maxWidth: 50,
        maxHeight: 50,
        borderRadius: 40
    },
    profilePicTwo: {
        maxWidth: 60,
        maxHeight: 60,
        borderRadius: 50
    },
    online: {
        maxWidth: 20,
        maxHeight: 20,
        position: "absolute",
        bottom: 7, 
        right: 7
    },
    container: {
        marginTop: -5,
        zIndex: -1,
        backgroundColor: "white"
    },
    iconText: {
        marginLeft: 10,
        marginTop: 5
    },
    thickLine: {
        borderBottomColor: "lightgrey",
        borderBottomWidth: 10
    },
    horizontalScroll: {
        minHeight: 70,
        maxHeight: 70
    },
    pictureBoxedCustom: {
        backgroundColor: "white",
        marginBottom: 15, 
        borderColor: "black",
        borderWidth: 2.5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.46,
        shadowRadius: 11.14,
        elevation: 17
    },
    picturesBoxedTrue: {
        marginBottom: 15
    },
    wallScroller: {
        minHeight: "100%"
    },
    picturesBoxedElseCustom: { 
        backgroundColor: "white",
        marginBottom: 15, 
        borderColor: "black", 
        borderWidth: 2.5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.46,
        shadowRadius: 11.14,
        elevation: 17
    },
    picturesBoxedElse: {
        marginBottom: 15
    },
    textContainer: {
        padding: 7.5,
        paddingBottom: 25
    },
    borderedShare: {
        borderColor: "black", 
        margin: 12.5,
        borderWidth: 2.5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.46,
        shadowRadius: 11.14,
        elevation: 17,
        backgroundColor: "white"
    },
    normallyBoxedElse: {
        flex: 1, 
        height: 380, 
        marginBottom: 50,
        maxHeight: 380,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.46,
        shadowRadius: 11.14,
        elevation: 17
    },
    noShadow: {
        marginTop: 25, 
        marginBottom: 20,
        marginLeft: 15,
        marginRight: 15
    },
    normallyBoxed: {
        flex: 1, 
        height: 210, 
        marginBottom: 50, 
        maxHeight: 210,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.46,
        shadowRadius: 11.14,
        elevation: 17
    },
    roundedButton: {
        borderRadius: 25,
        borderWidth: 1,
        width: 125,
        flexDirection: "row",
        borderColor: "#3D90F6",
        justifyContent: "center",
        alignItems: "center", 
        alignContent: "center"
    },
    createMeetingIcon: {
        width: 25,
        height: 25,
        marginLeft: 5
    },
    fullName: {
        fontWeight: "bold",
        fontSize: 18,
        marginLeft: 10,
        marginTop: 0
    },
    visibility: {
        marginLeft: 10,
        borderRadius: 10,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "black",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center", 
        alignContent: "center",
        padding: 4,
        marginTop: 5
    },  
    paneContainer: {
        width,
        position: "absolute",
        bottom: 0,
        height: height * 0.50,
        backgroundColor: "white"
    },
    centered: {
        justifyContent: "center",
        alignItems: "center", 
        alignContent: "center"
    },
    largerText: {
        fontStyle: "italic",
        fontWeight: "bold", 
        color: "#660000", 
        fontSize: 26,
        textAlign: "center"
    },
    closeIconTopLeft: {
        position: "absolute",
        top: 40,
        left: 20,
        zIndex: 9999999999
    },  
    centeredSlideUp: {
        justifyContent: "center",
        alignItems: "center", 
        alignContent: "center",
        marginTop: 50
    },
    innerImage: {
        maxWidth: 50, 
        maxHeight: 50, 
        minWidth: 50, 
        minHeight: 50, 
        tintColor: "white",
        zIndex: 9999999999
    },
    textareabox: {
        borderWidth: 2, 
        borderColor: "grey", 
        borderRadius: 30,
        paddingLeft: 10,
        paddingTop: 15
    },
    hr: {
        borderBottomWidth: 2,
        borderBottomColor: "grey",
        marginTop: 40,
        width: 350
    },
    myButton: {
        width: 75, 
        justifyContent: "center", 
        alignItems: "center", 
        alignContent: "center"
    },
    margin: {
        margin: 15
    },
    imageContent:{
        borderWidth:1,
        borderColor:'black',
        height: 150, 
    },
    imageContent1:{
        width:'100%',
        height: 200
    },
    imageContentCustom: {
        width: "100%",
        height: 275
    },
    imageContent2:{
        width:'50%',
        height: 170
    },
    imageContent3:{
        width:'33.33%',
        height: 170
    },
    image:{
        width:'100%',
        height:'100%',
    },
      //overlay efect
    overlayContent: {
        flex: 1,
        position: 'absolute',
        zIndex: 100,
        right: 0,
        width:'100%',
        height:'100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent:'center',
        alignItems:'center'
    },
    count:{
        fontSize:50,
        color: "#ffffff",
        fontWeight:'bold',
        textShadowColor: 'rgba(0, 0, 139, 1)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    },
    avatar: {
        minWidth: 50,
        maxWidth: 50,
        maxHeight: 50,
        minHeight: 50,
        borderRadius: 40
    }, 
    addFriendBtn: {
        minWidth: 100, 
        justifyContent: "center", 
        alignContent: "center", 
        alignItems: "center"
    },
    profilePicture: {
        minWidth: 55,
        minHeight: 55,
        maxHeight: 55,
        maxWidth: 55,
        borderRadius: 40
    }
})