import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    container:{
        flex:1, 
        backgroundColor: 'white',
    },
    maxedIconSmall: {
        maxHeight: 35,
        maxWidth: 35
    },
    margin10: {
        margin: 10
    },
    headerText: {
        fontSize: 22,
        fontWeight: "bold"
    },
    smallerText: {
        fontSize: 15
    },
    maxedIconSmallTwo: {
        maxHeight: 25,
        maxWidth: 25
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
    headerTextSub: {
        fontWeight: "bold", 
        fontSize: 18
    },
    row: {
        flexDirection: "row",
        maxHeight: 125
    },
    cardie: { 
        marginBottom: 15,
        flex: 0, 
        shadowColor: "blue",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        paddingVertical: 0, 
        elevation: 11 
    },
    topText: {
        fontWeight: "bold"
    },
    column: {
        width: "50%",
        height: 125
    },
    hr: {
        marginTop: 10,
        marginBottom: 10,
        borderBottomColor: "lightgrey",
        borderBottomWidth: 1
    }
})