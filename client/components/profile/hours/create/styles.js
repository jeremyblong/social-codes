import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    headerIcon: {
        maxWidth: 35,
        maxHeight: 35
    },
    container: {
        width,
        height, //
        backgroundColor: "white",
        zIndex: -1
    },
    switchText: {
        marginBottom: 20,
        fontWeight: "bold",
        fontSize: 18
    },
    columnCustom: {
        width: "50%",
        flexDirection: "column"
    },
    centered: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    margin: {
        margin: 15
    },
    row: {
        flexDirection: "row"
    },
    columnHalf: {
        width: "50%",
        padding: 10,
        maxWidth: "50%"
    },
    headerText: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 18
    },
    absoluteBottom: {
        padding: 20,
        backgroundColor: "white"
    }
});
  