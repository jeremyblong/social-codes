import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    container: {
        width,
        height,
        backgroundColor: "white"
    },
    otherContainer: {
        width: "100%",
        height,
        backgroundColor: "white",
        alignContent: "center"
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
        flexDirection: "row"
    },
    rightIcon: {
        position: "absolute",
        right: 10,
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width:40,
        height:40,
        backgroundColor:'#fff',
        borderRadius:50,
    },
    projectTaskFile: {
        borderWidth: 1,
        borderColor: "grey",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        height: 70
    },
    icon: {
        maxWidth: 25,
        maxHeight: 25
    },
    headerText: {
        fontSize: 18,
        fontWeight: "bold"
    },
    bottomChunk: {
        marginTop: 12,
        maxWidth: "80%"
    },
    smallerText: {
        fontSize: 15
    },
    tagText: {
        fontSize: 15,
        fontWeight: "bold"
    },
    item: {
        width: "100%"
    },
    tagger: {
        backgroundColor: "#f2f2f2",
        margin: 5,
        padding: 8
    },
    bottomClose: {
        position: "absolute",
        zIndex: 999,
        left: 10,
        top: 10
    },
    bottomClosecustom: {
        position: "absolute",
        zIndex: 999,
        left: 10,
        top: 30
    },
    centered: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    boxedScroll: {
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
        width: "90%"
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
        width: "90%"
    },
    bold: {
        fontWeight: "bold",
        textAlign: "center"
    }
});
  