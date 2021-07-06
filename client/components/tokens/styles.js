import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    container: {
        width,
        height,
        zIndex: -1,
        backgroundColor: "white"
    },
    headerIcon: {
        maxWidth: 35,
        maxHeight: 35
    },
    margin: {
        margin: 15
    },
    boxed: {
        minHeight: 100,
        maxHeight: 100,
        borderColor: "grey",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    hr: {
        borderBottomWidth: 2,
        borderBottomColor: "lightgrey",
        marginTop: 10,
        marginBottom: 10
    },
    headerText: {
        fontSize: 18,
        fontWeight: "bold",
    },
    viewer: {
        margin: 15
    },
    selected: {
        minHeight: 100,
        maxHeight: 100,
        borderColor: "blue",
        borderWidth: 3,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    row: {
        flexDirection: "row"
    },
    boxedText: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 7.5,
        marginLeft: 10
    }
});