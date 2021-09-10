import { StyleSheet, Dimensions } from "react-native";


const { width, height } = Dimensions.get("window");


export default StyleSheet.create({
    root: {
      backgroundColor: "#FFFFFF",
      height: "100%"
    },
    blackBackground: {
      backgroundColor: "#141414"
    },
    container: {
      padding: 16,
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderColor: "#FFFFFF",
      backgroundColor: "#141414",
      alignItems: 'flex-start'
    },
    hintText: {
      marginBottom: 25,
      fontWeight: "bold",
      fontSize: 15
    },
    closeTouch: {
      position: "absolute",
      bottom: 15,
      left: 15
    },
    closeIcon: {
      maxWidth: 45,
      maxHeight: 45
    },
    blueContainer: {
      padding: 16,
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderColor: "#FFFFFF",
      alignItems: 'flex-start',
      backgroundColor: "#cecece"
    },
    customModalBody: {
      flex: 1, 
      padding: 20,
      shadowColor: "blue",
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.00,
      elevation: 24,
      backgroundColor: "white", 
      maxWidth: "100%", 
      justifyContent: "center",
      alignItems: "center",
      alignContent: "center",
      maxHeight: height * 0.50
    },
    swipeIcon: {
      maxWidth: 200,
      maxHeight: 200
    },
    greyLightText: {
      color: "#d4d4d4"
    },
    whiteText: {
      color: "#ffffff"
    },  
    avatar: {
      width:50,
      height:50,
      minWidth: 50,
      minHeight: 50,
      borderRadius:25,
    },
    text: {
      marginBottom: 5,
      maxWidth: width * 0.80
    },
    headerIcon: {
        maxWidth: 35,
        maxHeight: 35
    },
    headerIconTwo: {
      maxWidth: 35,
      maxHeight: 35,
      position: "absolute",
      right: 15
    },
    content: {
      flex: 1,
      marginLeft: 16,
      marginRight: 0
    },
    mainContent: {
      marginRight: 60
    },
    hr: {
      borderBottomWidth: 1,
      borderBottomColor: "grey",
      marginTop: 5,
      marginBottom: 5
    },
    img: {
      height: 50,
      width: 50,
      margin: 0
    },
    attachment: {
      position: 'absolute',
      right: 0,
      height: 50,
      width: 50
    },
    separator: {
      height: 1,
      backgroundColor: "#CCCCCC"
    },
    background: {
      width,
      height,
      backgroundColor: "white",
      padding: 15
    },
    timeAgo:{
      fontSize:12,
      color:"#696969"
    },
    name:{
      fontSize:16,
      color:"#303030",
      fontWeight: "bold"
    },
    headText: {
      fontSize: 34,
      fontWeight: "bold",
      textAlign: "center"
    },
    myImage: {
      maxWidth: "100%", 
      maxHeight: height * 0.40
    }
}); 