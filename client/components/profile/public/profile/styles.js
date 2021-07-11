import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    header:{
      backgroundColor: "#00BFFF",
      height:200,
      maxHeight: 200,
      margin: 15
    },
    greyButton: {
      backgroundColor: "#303030"
    },
    headerGrey: {
      backgroundColor: "#303030"
    },    
    goldText: {
      color: "#ffd530"
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
    rankContainer: {
      
    },
    topLeftIcon: {
        maxWidth: 50, 
        maxHeight: 50
    },
    tagContainer: {
      marginTop: 10,
      marginLeft: 15,
      marginRight: 15,
      flex: 1
    },
    topLeft: {
        position: "absolute",
        left: 20,
        width: 50,
        height: 50,
        top: 35
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
    customImage: {
      maxWidth: "100%",
      maxHeight: 125,
      minWidth: "100%",
      minHeight: 125
    },
    clickText: {
      color: "white", 
      fontWeight: "bold"
    },
    myButtonSlideUp: {
      width: "90%", 
      justifyContent: "center", 
      alignItems: "center", 
      alignContent: "center"
    },
    customColumn: {
      width: width * 0.50
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
    plusInner: {
      width: 25,
      height: 25,
      margin: 4
    },
    rowed: {
      flexDirection: 'row', 
      flexWrap: 'wrap',
      margin: 0
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
      maxHeight: 35,
      minWidth: 35, 
      minHeight: 35
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
    tagTwo: {
      backgroundColor: "lightgrey",
      borderRadius: 15,
      margin: 5,
      padding: 10
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
        borderColor: "white",
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
        maxHeight: 30,
        tintColor: "#fdd530"
    },
    panelText: {
        marginTop: 15,
        fontSize: 16,
        fontWeight: "bold",
        color: "#ffd530",
        marginLeft: 20
    },
    body:{
      marginTop:40,
    },
    bodyContent: {
      alignItems: 'center',
      padding:30,
    },
    name:{
      fontSize:28,
      color: "#696969",
      fontWeight: "600"
    },
    mediumSized: {
      textAlign: "left",
      fontSize: 15,
      fontWeight: "bold"
    },
    info:{
      fontSize:16,
      color: "blue",
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
    largeSeeMore: {
      maxWidth: 30,
      maxHeight: 30
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
    animated: {
        maxWidth: 50,
        maxHeight: 50
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
      right: 20
    },
    iconsRightTwo: {
      maxWidth: 25,
      maxHeight: 25,
      position: "absolute",
      right: 40
    },
    heavyText: {
      fontSize: 15,
      fontWeight: "bold"
    },
    smallGrey: {
      color: "grey",
      fontWeight: "bold"
    },
    // friends list logic
    friendsListContainer: {
      width
    },
    friendsTextContainer: {
      flexDirection: "column",
      alignContent: "flex-start", 
      alignItems: "flex-start"
    },
    headerText: {
      fontSize: 20,
      fontWeight: "bold"
    },
    list: {
      paddingHorizontal: 10,
    },
    listContainer:{
      alignItems:'center'
    },
    separator: {
      marginTop: 10,
    },
    /******** card **************/
    card:{
      backgroundColor:"white",
      flexBasis: '33.333%',
      marginHorizontal: 4,
    },
    cardContent: {
      paddingVertical: 17,
      justifyContent: 'space-between',
    },
    cardImage:{
      flex: 1,
      height: 125,
      minHeight: 125,
      width: "100%",
      minWidth: "100%",
      resizeMode: "cover",
      borderRadius: 15
    },
    imageContainer:{
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.32,
      shadowRadius: 5.46,
  
      elevation: 9,
    },
    /******** card components **************/
    title:{
      fontSize:14,
      fontWeight: "bold",
      textAlign: "center",
      flex: 1,
      color:"#778899"
    },
    count:{
      fontSize:18,
      flex:1,
      color:"#B0C4DE"
    }
    // friends list logic end
});
  