import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: "100%",
        width
    },
    header: {
        backgroundColor: "white"
    },
    blackHr: {
        width: "100%",
        marginTop: 15,
        marginBottom: 15,
        borderBottomColor: "grey",
        borderBottomWidth: 2
    },  
    margin: {
        margin: 15
    },
    blackText: {
        color: "black"
    },
    headerText: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "left"
    },
    goldText: {
        color: "#ffd530",
        fontWeight: "bold"
    },
    centered: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        flexDirection: "row"
    }
})