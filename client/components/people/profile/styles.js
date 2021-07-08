
import { StyleSheet, Dimensions } from "react-native";


const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
    container:{
        flex: 1,
        width,
        height,
        backgroundColor: "white"
    },
    headerIcon: {
        maxWidth: 35,
        maxHeight: 35
    },
    goldText: {
        color: "#ffd530"
    },
    header:{
        backgroundColor: "#303030",
        height:200,
        maxHeight: 200,
        margin: 15
    },
    likeCount: {
        marginTop: 5,
        marginLeft: 10,
        fontWeight: "bold"
    },
    avatar: {
        width: 160,
        height: 160,
        minWidth: 160,
        minHeight: 160,
        borderRadius: 90,
        borderWidth: 4,
        borderColor: "white",
        marginBottom:10,
        alignSelf:'center',
        position: 'absolute',
        marginTop:130
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
    headerText: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "left"
    },
    pricingText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "blue", 
        marginTop: 15
    },
    lottiContainer: {
        justifyContent: "center",
        alignItems: "center", 
        alignContent: "center",
        maxHeight: 70,
        maxWidth: 55
    },
    imageContent:{
        borderWidth:1,
        borderColor:'black',
        height: 150, 
    },
    imageContent1:{
        width: width * 1.05,
        marginLeft: -20,
        height: 500
    },
    normallyBoxedElse: {  
        marginBottom: 50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.46,
        shadowRadius: 11.14,
        elevation: 17
    },
    introVideo: {
        width: "100%",
        height: 275,
        minHeight: 275,
        minWidth: "100%",
        borderWidth: 5,
        borderColor: "black"
    },
    normallyBoxed: {
        marginBottom: 50, 
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.46,
        shadowRadius: 11.14,
        elevation: 17
    },
    count:{
        fontSize:50,
        color: "#ffffff",
        fontWeight:'bold',
        textShadowColor: 'rgba(0, 0, 139, 1)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    },
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
    specialRow: {
        flexDirection: "row", 
        marginBottom: 20, 
        width, 
        marginLeft: -20
    },
    imageContentCustom: {
        width: width * 1.05,
        marginLeft: -20,
        height: 350
    },
    imageContent2:{
        width: width * 0.535,
        marginLeft: -20,
        height: 170
    },
    imageContent3:{
        width: "34.35%",
        height: 170
    },
    image:{
        width:'100%',
        height:'100%',
    },
    popoverTwo: {
        width: width * 0.95,
        height: 70,
        borderRadius: 20,
        flexDirection: "row"
    },
    avatarCustom: {
        maxWidth: 40,
        maxHeight: 40,
        minHeight: 40,
        minWidth: 40,
        borderRadius: 40
    },
    scroller: {
        flexDirection: "row"
    },
    sendIcon: {
        width: 60,
        height: 60
    },
    closeIcon: {
        width: 40,
        marginTop: 25,
        height: 40
    },
    textarea: {
        height: "90%"
    },
    scrollbox: {
        backgroundColor: "white"
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
    skelatonSub: {
        width: "100%",
        height: 50
    },
    main: {
        margin: 10
    },
    marginTop: {
        marginTop: 25,
        flexDirection: "row",
        maxHeight: 55,
        backgroundColor: "transparent"
    },
    row: {
        flexDirection: "row",
        width: width * 0.95
    },
    plus: {
        width: 35,
        height: 35,
        marginLeft: 5
    },
    rowCustom: {
        flexDirection: "row"
    },
    seemoreBox: {
        borderWidth: 1,
        borderColor: "grey",
        margin: 10,
        width: "100%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    innerSeemoreBox: {
        fontSize: 18,
        fontWeight: "bold"
    },
    smallerText: {
        fontSize: 15
    },
    smallText: {
        fontSize: 18
    },
    bold: {
        fontWeight: "bold"
    },
    plusInner: {
        width: 25,
        height: 25,
        margin: 4
    },
    rowed: {
        flexDirection: 'row', 
        flexWrap: 'wrap',
        margin: 10
    },
    verify: {
        fontWeight: "normal"
    },
    listText: {
        fontWeight: "bold",
        fontSize: 15
    },
    absoluteRight: {  
        position: "absolute",
        right: 10,
        top: 10,
        maxWidth: 35,
        maxHeight: 35
    },
    centeredMargin: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    centered: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    thinHr: {
        borderWidth: 1,
        borderColor: "lightgrey",
        marginTop: 10,
        marginBottom: 10
    },
    tag: {
        backgroundColor: "lightgrey",
        borderRadius: 15,
        margin: 5
    },
    tagText: {
        fontSize: 15,
        fontWeight: "bold",
        padding: 8
    },
    margin10: {
        margin: 10
    },
    plusOutside: {
        borderRadius: 30,
        borderWidth: 1,
        borderColor: "grey",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        marginLeft: 10
    },
    spinnerTextStyle: {
        color: "white", 
        fontSize: 18, 
        textAlign: "center"
    },
    maxed: {
        maxWidth: 35,
        maxHeight: 35
    },
    smallColumn: {
        width: width * 0.15,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    largeColumn: {
        width: width * 0.85
    },
    name:{
        fontSize:22,
        color:"#FFFFFF",
        fontWeight:'600',
    },
    outterContainer: {
        borderRadius: 30,
        borderColor: "black",
        borderWidth: 1,
        padding: 4,
        maxHeight: 55,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        marginLeft: 4
    },
    
    picture: {
        maxWidth: 30,
        maxHeight: 30
    },
    panelText: {
        marginTop: 15,
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 20
    },
    postVideoStyles: {
        height: 325,
        minWidth: width * 1.05,
        minHeight: 325,
        width: width * 1.05,
        marginLeft: -20,
        marginTop: 25
    },
    body:{
        paddingTop: 65,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 30
    },
    mapCustom: {
        width: width * 1.05,
        marginTop: 25,
        height: 225,
        marginLeft: -20,
        borderWidth: 3,
        borderColor: "black"
    },
    bodyContent: {
        padding: 15,
    },
    name:{
        fontSize:28,
        color: "#696969",
        fontWeight: "600"
    },
    info:{
        fontSize:16,
        color: "blue",
        fontWeight: "bold",
        marginTop:10
    },
    plusIcon: {
        width: 25,
        height: 25
    },
    plusIconTwo: {
        width: 15,
        height: 15
    },
    leftAlign: {
        alignSelf: "flex-start",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        flexDirection: "row"
    },  
    viewText: {
        fontSize: 20, 
        fontWeight: "bold", 
        marginTop: 5
    },
    viewTextTwo: {
        fontSize: 16, 
        fontWeight: "bold", 
        marginTop: 5
    },
    plusIconContainer: {
        borderRadius: 30,
        borderWidth: 2,
        borderColor: "grey",
        padding: 5,
        marginLeft: 10
    }, 
    plusIconContainerTwo: {
        borderRadius: 30,
        borderWidth: 2,
        borderColor: "grey",
        padding: 5,
        marginLeft: 10
    },  
    shield: {
        maxWidth: 20,
        maxHeight: 20
    },
    thickHr: {
        borderBottomColor: "lightgrey",
        borderBottomWidth: 10,
        marginTop: 15,
        marginBottom: 15,
        width
    },  
    largeColumnCustom: {
        width: width * 0.70
    },
    smallColumnCustom: {
        width: width * 0.30,
        zIndex: 99
    },
    iconsRight: {
        maxWidth: 35,
        maxHeight: 35,
        minWidth: 35,
        minHeight: 35,
        position: "absolute",
        zIndex: 9999999999999,
        right: 20
    },
    heavyText: {
        fontSize: 15,
        fontWeight: "bold"
    },
    smallGrey: {
        color: "grey",
        fontWeight: "bold"
    },
    iconsRightTwo: {
        maxWidth: 25,
        maxHeight: 25,
        position: "absolute",
        right: 40
    },
    description:{
        fontSize:16,
        color: "#696969",
        marginTop:10,
        textAlign: 'left'
    },
    buttonContainer: {
        marginTop:10,
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:30,
        backgroundColor: "#00BFFF",
    },
    headerGrey: {
        backgroundColor: "#303030"
    },
    tagger: {
        backgroundColor: "#f5f5f5",
        padding: 10,
        borderWidth: 1,
        borderColor: "grey",
        margin: 5,
        borderRadius: 20
    },
    tag: {
        fontWeight: "bold"
    },
    animated: {
        maxWidth: 50,
        maxHeight: 50
    },
    touchableTwo: {
        position: "absolute",
        top: 15,
        left: 15,
        zIndex: 9999999999
    },
    touchable: {
        minWidth: 50,
        minHeight: 50,
        position: 'absolute',
        right: 15,
        top: -40
    },
    columnOne: {
        width: width * 0.15
    },
    columnTwo: {
        width: width * 0.85
    },
    testimonialsAnimation: {
        maxWidth: width * 0.90,
        maxHeight: 200,
        minWidth: width * 0.90,
        minHeight: 200,
        position: 'absolute',
        top: 0,
        left: 10,
        right: 0,
        bottom: 0
    },
    testimonialsAnimationContainer: {
        minHeight: 225,
        width
    },
    showcaseText: {
        marginTop: 25,
        color: "darkblue",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center"
    },
    request: {
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "center"
    },
    largeColumnCustom: {
        width: width * 0.70
    },
    smallColumnCustom: {
        width: width * 0.30
    },
    iconsRight: {
        maxWidth: 25,
        maxHeight: 25,
        position: "absolute",
        right: 34
    },
    iconsRightTwo: {
        maxWidth: 25,
        maxHeight: 25,
        position: "absolute",
        right: 40
    },
    carddd: {
        shadowColor: "black",
        paddingBottom: 20,
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        width: "100%",
        elevation: 12,
        flex: 0
    },
    heavyText: {
        fontSize: 15,
        fontWeight: "bold"
    },
    smallGrey: {
        color: "grey",
        fontWeight: "bold"
    },
    rowTwo: {
        flexDirection: "row",
        maxHeight: 165
    },
    topText: {
        fontWeight: "bold"
    },
    columnCustom: {
        width: "50%",
        padding: 3,
        height: 165
    }
}); 