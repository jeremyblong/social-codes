import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    container:{
        backgroundColor: '#141414',
        width,
        minHeight: height,
        height: "100%",
        flex: 0
    },
    maxedIconSmall: {
        maxHeight: 35,
        maxWidth: 35,
        tintColor: "#ffffff"
    },
    absoluteBadge: {
        top: 20
    },
    margin10: {
        margin: 10
    },
    subText: {
        marginTop: 10
    },
    goldButton: {
        backgroundColor: "#303030"
    },
    headerText: {
        fontSize: 22,
        fontWeight: "bold"
    },
    tabBar: {
        height: 50,
        minHeight: 50,
        maxHeight: 50,
        flex: 1,
        flexDirection: "row"
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
        height: 50,
        minHeight: 50
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
        flex: 0, 
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

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