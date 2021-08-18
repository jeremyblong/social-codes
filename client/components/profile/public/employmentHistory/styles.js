import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    headerIcon: {
        maxHeight: 35,
        maxWidth: 35
    },
    header: {
        backgroundColor: "#303030"
    },
    whiteText: {
        color: "#ffffff"
    },
    container: {
        zIndex: -1,
        width,
        height,
        backgroundColor: "white"
    },
    margin: {
        margin: 10
    },
    label: {
        fontSize: 15,
        marginBottom: 10
    },
    hr: {
        marginTop: 5,
        marginBottom: 5
    },
    listItemTwo: {
        minHeight: 35,
        padding: 10
    },
    row: {
        flexDirection: "row"
    },
    centered: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    boxed: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        width: width * 0.445,
        margin: 5,
        borderWidth: 2,
        borderColor: "lightgrey",
        padding: 10
    }
});
  