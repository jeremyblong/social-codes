import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    container: {
        zIndex: -1,
        width,
        height: "100%",
        backgroundColor: "white",
        flex: 1
    },
    headerIcon: {
        tintColor: "#ffd530",
        maxWidth: 35,
        maxHeight: 35
    },  
    margin: {
        margin: 15
    },
    modalPicOrVideo: {
        width: "100%", 
        height: "100%", 
        minWidth: "100%", 
        minHeight: "100%"
    },
    row: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        padding: 10,
        minWidth: "100%"
    },
    with: {
        fontSize: 24,
        fontWeight: "bold",
        color: "darkred",
        marginTop: 15
    },
    icon: {
        maxWidth: 40,
        maxHeight: 40,
        marginRight: 10
    },
    modal: {
        minWidth: "90%",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        margin: 20,
        backgroundColor: "white",
        flex: 1,
        height: 325,
        maxHeight: 350
    },
    iconText: {
        fontWeight: "bold",
        fontSize: 16
    },
    boxed: {
        borderWidth: 2,
        borderColor: "black",
        minWidth: "100%"
    },
    greyHr: {
        borderBottomWidth: 2,
        borderBottomColor: "grey",
        width: "100%",
        marginTop: 15,
        marginBottom: 15
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