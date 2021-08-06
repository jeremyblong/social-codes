import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    container: {
        zIndex: -1,
        width,
        height,
        backgroundColor: "white"
    },
    margin: {
        margin: 20
    },
    headerText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "blue"
    },
    headerMainText: {
        fontWeight: "bold",
        color: "darkred",
        textDecorationLine: "underline",
        paddingBottom: 10,
        fontSize: 24
    },
    hr: {
        borderBottomColor: "lightgrey",
        borderBottomWidth: 2,
        marginTop: 10,
        marginBottom: 10,
        width: 200
    },
    workName: {
        paddingTop: 5,
        paddingBottom: 5,
        fontSize: 20,
        fontWeight: "bold"
    },
    headerIcon: {
        maxWidth: 35,
        tintColor: "#ffd530",
        maxHeight: 35
    },
    goldText: {
        color: "#ffd530"
    },
    hr: {
        borderBottomColor: "grey",
        borderBottomWidth: 2,
        marginTop: 15,
        marginBottom: 15
    }
})