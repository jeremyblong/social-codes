import { StyleSheet, Dimensions } from "react-native";


const { width, height } = Dimensions.get("window");


export default StyleSheet.create({
    container: {
      height,
      width,
      zIndex: -1,
      backgroundColor: "#141414"
    },
    margin: {
      margin: 15
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
    webview: {
      width,
      height: "100%",
      flex: 0
    },
    productImg:{
      width: "100%",
      height:200,
      resizeMode: "contain"
    },
    name:{
      fontSize:28,
      color: "#ffffff",
      fontWeight:'bold',
      textAlign:'center'
    },
    price:{
      marginTop:10,
      fontSize:30,
      color:"#0057ff",
      textDecorationLine: "underline",
      fontWeight:'bold'
    },
    description:{
      textAlign:'center',
      marginTop:10,
      color: "#ffffff",
    },
    star:{
      width:40,
      height:40,
    },
    btnColor: {
      height:30,
      width:30,
      borderRadius:30,
      marginHorizontal:3
    },
    btnSize: {
      height:40,
      width:40,
      borderRadius:40,
      borderColor:'#778899',
      borderWidth:1,
      marginHorizontal:3,
      backgroundColor:'white',
  
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    starContainer:{
      justifyContent:'center', 
      marginHorizontal:30, 
      flexDirection:'row', 
      marginTop:20
    },
    contentColors:{ 
      justifyContent:'center', 
      marginHorizontal:30, 
      flexDirection:'row', 
      marginTop:20
    },
    contentSize:{ 
      justifyContent:'center', 
      marginHorizontal:30, 
      flexDirection:'row', 
      marginTop:20
    },
    separator:{
      height:2,
      backgroundColor:"#eeeeee",
      marginTop:20,
      marginHorizontal:30
    },
    shareButton: {
      marginTop:10,
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:30,
      backgroundColor: "#0057ff",
    },
    shareButtonText:{
      color: "#FFFFFF",
      fontSize:20,
    },
    addToCarContainer:{
      marginHorizontal:30
    }
}); 