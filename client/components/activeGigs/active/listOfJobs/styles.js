import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    container: {
        zIndex: -1,
        width,
        height,
        backgroundColor: "white"
    },
    headerIcon: {
        tintColor: "#ffd530",
        maxWidth: 35,
        maxHeight: 35
    },  
    margin: {
        margin: 15
    },
    goldText: {
        color: "#ffd530"
    },
    thumbnailVideo: {
        minWidth: 55,
        minHeight: 55,
        maxWidth: 55,
        maxHeight: 55,
        borderRadius: 40
    },
    myImage: {
        maxWidth: "100%", 
        maxHeight: height * 0.40
    },
    background: {
        width,
        height,
        backgroundColor: "white",
        padding: 15
    },
    headText: {
        fontSize: 34,
        fontWeight: "bold",
        textAlign: "center"
    },
    greyButton: {
        backgroundColor: "#303030",
        width: 125,
        borderColor: "#ffd530",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    }
})