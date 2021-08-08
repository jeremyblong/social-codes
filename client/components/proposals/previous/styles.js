import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    headerIcon: {
        maxWidth: 35,
        maxHeight: 35
    },
    container: {
        width,
        height,
        backgroundColor: "#141414",
        zIndex: -1
    },
    profile: {
        maxWidth: 35, 
        maxHeight: 35, 
        minHeight: 35, 
        minWidth: 35,
        borderRadius: 35
    },
    centered: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    centeredTitleText: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 18
    },
    hr: {
        borderBottomColor: "lightgrey",
        borderBottomWidth: 1,
        marginTop: 10,
        marginBottom: 10
    },
    midsizedText: {
        fontSize: 15
    },
    thickHr: {
        borderBottomColor: "lightgrey",
        borderBottomWidth: 10,
        marginBottom: 10,
        marginTop: 10
    },
    bottomBorder: {
        borderBottomWidth: 1,
        borderBottomColor: "black"
    },
    topBorder: {
        borderTopWidth: 1,
        borderTopColor: "black"
    },
    headText: {
        fontSize: 34,
        fontWeight: "bold",
        color: "#ffffff",
        textAlign: "center"
    },
    myImage: {
        maxWidth: "100%", 
        maxHeight: height * 0.40
    },
    customText: {
        marginBottom: 50,
        fontSize: 30,
        fontWeight: "bold"
    }
});
  