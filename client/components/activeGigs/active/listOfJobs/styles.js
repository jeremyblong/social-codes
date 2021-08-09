import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    container: {
        zIndex: -1,
        width,
        height,
        backgroundColor: "#141414"
    },
    headerIcon: {
        tintColor: "#ffffff",
        maxWidth: 35,
        maxHeight: 35
    },  
    margin: {
        margin: 15
    },
    whiteText: {
        color: "#ffffff"
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
        backgroundColor: "#141414",
        padding: 15
    },
    headText: {
        fontSize: 34,
        fontWeight: "bold",
        color: "#ffffff",
        textAlign: "center"
    },
    greyButton: {
        backgroundColor: "#303030",
        width: 125,
        borderColor: "#ffffff",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    }
})