import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    // manageApplicants styles
    container:{
        flex:1, 
        backgroundColor: '#141414',
        width,
        height,
        zIndex: -1
    },
    absoluteBadge: {
        bottom: -7.5
    },
    greyButton: {
        backgroundColor: "#303030"
    },
    headText: {
        fontSize: 34,
        fontWeight: "bold",
        textAlign: "center",
        color: "#ffffff"
    },
    myImage: {
        maxWidth: "100%", 
        maxHeight: height * 0.40
    },
    maxedIconSmall: {
        maxHeight: 35,
        tintColor: "#ffffff",
        maxWidth: 35
    },
    whiteText: {
        color: "#ffffff"
    },  
    headerIcon: {
        maxWidth: 35,
        maxHeight: 35,
        tintColor: "#ffffff"
    },
    centered: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },  
    hr: {
        borderBottomColor: "grey",
        borderBottomWidth: 2
    },
    profilePicImage: {
        maxWidth: 50, 
        maxHeight: 50, 
        minWidth: 50, 
        minHeight: 50, 
        borderRadius: 50
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
        color: "darkblue"
    },
    columnOne: {
        flexDirection: "column",
        width: "50%",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },

    rowww: {
        flexDirection: "row",
        width
    },
    columnTwo: {
        flexDirection: "column",
        width: "50%",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    largeText: {
        fontSize: 20,
        fontWeight: "bold"
    },
    avatarCustom: {
        maxWidth: 70,
        borderRadius: 65,
        maxHeight: 70,
        minHeight: 70,
        minWidth: 70
    },
    positionTopRight: {
        position: "absolute",
        top: 10,
        right: 10
    },
    mediumText: {
        fontSize: 15,
        fontWeight: "bold"
    },
    cardContent: {
        marginLeft:20,
        marginTop:10,
    },
    image:{
        width:25,
        height:25,
    },
    headerText: {
        fontSize: 18, 
        fontWeight: "bold"
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
    horizontalScroll: {

    },
    smallText: {
        fontSize: 12
    },
    greyButton: {
        backgroundColor: "#303030"
    },
    headerFooter: {
        borderColor: "transparent", 
        borderBottomColor: "lightgrey", 
        borderBottomWidth: 2, 
        zIndex: -1, 
        backgroundColor: "#303030"
    },
    scrollContainer: {
        minHeight: height,
        height,
        width,
        zIndex: 9999999999,
        backgroundColor: "white"
    },
    rightTop: {
        position: "absolute",
        top: 10,
        right: 10
    },
    coverLetterTextHeader: {
        fontSize: 15, 
        fontWeight: 'bold', 
        color: "blue"
    },
    contentText: {
        marginTop: 7.5,
        fontSize: 15,
        fontWeight: "bold"
    },
    leftTop: {
        position: "absolute",
        left: 15,
        top: 25
    }
});