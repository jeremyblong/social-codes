import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    container:{
        flex:1, 
        backgroundColor: '#141414',
        zIndex: -1,
        width,
        height
    },
    headerMain: {
        backgroundColor: '#303030'
    },
    headerIcon: {
        maxWidth: 35,
        maxHeight: 35,
        tintColor: '#ffffff'
    },
    margin: {
        margin: 15
    },
    starContainer: {
        paddingTop: 10
    },
    circleMenu: {
        maxWidth: 65,
        maxHeight: 65,
        zIndex: 9999
    },
    whiteHr: {
        borderBottomColor: "#ffffff",
        borderBottomWidth: 2,
        marginTop: 10,
        marginBottom: 10,
        width: "100%"
    },  
    starText: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold'
    },  
    bottomRightCorner: {
          position: "absolute",
          bottom: 20,
          right: 20,
          zIndex: 9999
    },
    headerText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#ffffff",
        textAlign: "left"
    }
})