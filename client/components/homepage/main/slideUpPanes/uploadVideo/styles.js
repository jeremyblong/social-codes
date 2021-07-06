import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    container: {
        height: "100%",
        width,
        backgroundColor: "white",
        zIndex: 9999999999999999999999999999999999999,
        flex: 1
    },
    headerText: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold"
    },
    margin: {
        margin: 15
    },
    imageContainer: {
        maxHeight: 225,
        width,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        marginTop: 50
    },
    backgroundVideo: {
        width: "100%",
        height: 250
    },
    uploadIcon: {
        maxWidth: 130,
        maxHeight: 130,
        minHeight: 130,
        minWidth: 130
    },
    largeText: {
        fontSize: 22,
        color: "blue",
        fontWeight: "bold",
        marginTop: 15
    }
});