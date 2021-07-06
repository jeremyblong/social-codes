import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    container: {
        width,
        minHeight: height,
        backgroundColor: "white",
        zIndex: -1
    },
    hr: {
        width: "100%",
        borderBottomColor: "lightgrey",
        borderBottomWidth: 3,
        marginBottom: 15
    },    
    blockSkelaton: {
        width: "100%",
        height: 275,
        marginTop: 20
    },
    headerText: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "left",
        textDecorationLine: "underline"
    },
    avatar: {
        minWidth: 55,
        minHeight: 55,
        borderRadius: 30,
        marginRight: 15
    },
    customAvatar: {
        minWidth: 50,
        minHeight: 50,
        maxWidth: 50,
        maxHeight: 50,
        borderRadius: 30
    },
    row: {
        flexDirection: "row"
    },
    likes: {
        fontSize: 30
    },
    voteIcon: {
        maxWidth: 45,
        maxHeight: 45
    },
    margin: {
        margin: 15
    },
    topContainer: {
        width: "100%",
        height: 225,
        borderWidth: 2,
        borderColor: "grey"
    },
    popoverTwo: {
        width: width * 0.95,
        height: 70,
        borderRadius: 20,
        flexDirection: "row"
    },
    date: {
        fontWeight: "bold",
        marginTop: 10
    },
    lottiContainer: {
        justifyContent: "center",
        alignItems: "center", 
        alignContent: "center",
        maxHeight: 70,
        maxWidth: 55
    },
    columnSmallTwo: {
        width: "100%",
        height: 220,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    columnSmall: {
        borderRightWidth: 2,
        borderRightColor: "black",
        width: "20%",
        height: 220,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    tagged: {
        backgroundColor: "#EEEBEE",
        borderWidth: 1,
        alignSelf: 'flex-start',
        borderColor: "grey",
        margin: 5,
        padding: 4
    },
    columnLarge: {
        width: "80%",
        padding: 15,
        flexDirection: "row",
        flexWrap: 'wrap',
        height: 220
    },
    posterText: {
        fontWeight: "bold",
        fontSize: 15
    },
    title: {
        textAlign: "left",
        fontSize: 16,
        marginBottom: 5,
        color: "blue",
        fontWeight: "bold"
    },
    positionTouchable: {
        position: "relative",
        top: 5,
        alignSelf: 'flex-start',
        marginBottom: 125,
        maxHeight: 45,
        left: 0,
        zIndex: 9999999999999999999999999999999999999
    },
    root: {
        backgroundColor: "#ffffff",
        marginTop:10,
    },
    containerTwo: {
        paddingLeft: 19,
        paddingRight: 16,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    content: {
        marginLeft: 10,
        paddingBottom: 30,
        flex: 1,
        flexDirection: 'column'
    },
    customColumnOne: {
        flexDirection: "column", 
        justifyContent: "center", 
        alignItems: "center", 
        alignContent: "center"
    },
    voteIconTwo: {
        maxWidth: 30,
        maxHeight: 30
    },
    likesTwo: {
        fontSize: 22
    },
    contentHeader: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 6
    },
    highlighter: {
        maxHeight: 550
    },
    highlighterComment: {
        marginTop: 20
    },
    separator: {
        height: 1,
        backgroundColor: "#CCCCCC"
    },
    image:{
        width:45,
        height:45,
        borderRadius:20,
        marginLeft:20
    },
    time:{
        fontSize:11,
        color:"#808080",
    },
    name:{
        fontSize:16,
        fontWeight:"bold",
    }
})