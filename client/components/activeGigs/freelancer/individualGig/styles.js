import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    container: {
        zIndex: -1,
        width,
        height,
        backgroundColor: "white"
    },
    headerIcon: {
        tintColor: "#ffd530",
        maxWidth: 35,
        maxHeight: 35
    },  
    margin: {
        margin: 15
    },
    goldText: {
        color: "#ffd530"
    },
    headText: {
        fontSize: 34,
        fontWeight: "bold",
        textAlign: "center"
    },
    greyButton: {
        backgroundColor: "#303030",
        width: 125,
        borderColor: "#ffd530",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    header:{
        padding:30,
        alignItems: 'center',
        backgroundColor: "#ffd530",
    },
    headerTitle:{
        fontSize:30,
        color: "#303030",
        marginTop:10,
        textAlign: "center",
        fontWeight: "bold"
    },
    name:{
        fontSize:22,
        color:"#FFFFFF",
        fontWeight:'600',
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
        color: 'darkred',
        marginTop:10,
    },
    date:{
        color: '#696969',
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
        color:"darkred",
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
        backgroundColor: "#ffd530",
    },
    shareButtonText:{
        color: "#FFFFFF",
        fontSize:20,
    }
})