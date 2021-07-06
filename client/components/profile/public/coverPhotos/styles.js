import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white"
    },
    item: {
      backgroundColor: '#ffffff',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },
    itemInvisible: {
      backgroundColor: 'transparent',
    },
  
   /************ modals ************/
    popup: {
      backgroundColor: 'white',
      marginTop: 80,
      marginHorizontal: 20,
      borderRadius: 7,
    },
    popupOverlay: {
      backgroundColor: "#00000057",
      flex: 1,
      marginTop: 20
    },
    popupContent: {
      //alignItems: 'center',
      margin: 5,
      height:250,
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
    popupHeader: {
      marginBottom: 45
    },
    exitContainer: {
        position: "absolute",
        top: 40,
        left: 13,
        zIndex: 999
    },
    popupButtons: {
      marginTop: 15,
      flexDirection: 'row',
      borderTopWidth: 1,
      borderColor: "#eee",
      justifyContent:'center'
    },
    row: {
        flexDirection: "row",
        maxHeight: 30
    },
    outterLayer: {
        margin: 15
    },
    topRightIcons: {
        position: "absolute",
        top: 40,
        right: 10,
        zIndex: 999
    },
    icon: {
        tintColor: "white",
        maxWidth: 30, 
        maxHeight: 30,
        zIndex: 999
    },
    popupButton: {
      flex: 1,
      marginVertical: 16
    },
    btnClose:{
      height:20,
      backgroundColor:'#20b2aa',
      padding:20
    },
    modalInfo:{
      alignItems:'center',
      justifyContent:'center',
    },
    maxedIconSmall: {
        maxHeight: 35,
        maxWidth: 35
    },
    centered: {
        justifyContent: "center",
        alignItems: "center", 
        alignContent: "center"
    },
    absoluteBadge: {
        position: "absolute",
        bottom: 0,
        zIndex: -1,
        top: 0
    },
});