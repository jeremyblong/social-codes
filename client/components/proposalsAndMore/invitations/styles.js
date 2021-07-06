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
        minHeight: height,
        backgroundColor: "white",
        zIndex: -1
    },
    header:{
        padding:30,
        alignItems: 'center',
        backgroundColor: "#303030",
    },
    goldText: {
        color: "#ffd530"
    },  
    headerTitle:{
        fontSize:30,
        color:"#FFFFFF",
        marginTop:10,
    },
    postContent: {
        flex: 1,
        padding:30,
    },
    postTitle:{
        fontSize:26,
        fontWeight:'600',
    },
    postDescription:{
        fontSize:16,
        marginTop:10,
    },
    tags:{
        color: 'blue',
        marginTop:10,
    },
    date:{
        color: '#303030',
        marginTop:10,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 35,
        borderWidth: 4,
        borderColor: "#ffd530",
    },
    profile:{
        flexDirection: 'row',
        marginTop:20
    },
    name:{
        fontSize:22,
        color:"#303030",
        fontWeight:'600',
        alignSelf:'center',
        marginLeft:10
    }, 
    shareButton: {
        marginTop:10,
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:30,
        backgroundColor: "blue",
    },
    shareButtonText:{
        color: "white",
        fontSize:20,
    }
})