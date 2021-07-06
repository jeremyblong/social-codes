
import { StyleSheet, Dimensions } from "react-native";


const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
    container:{
        width: "100%",
        height: "100%",
        backgroundColor: "white"
    },
    mainTextHeader: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 28,
        color: "blue",
        textDecorationLine: "underline"
    },
    centered: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    thickHr: {
        borderBottomWidth: 5,
        borderBottomColor: "grey",
        marginTop: 15,
        marginBottom: 15
    },
    title: {
        marginTop: 20
    },
    employed: {
        marginTop: 20
    },
    margin: {
        margin: 15
    },
    left: {
        textAlign: "left"
    },
    bold: {
        fontWeight: "bold"
    },
    map: {
        width: "100%",
        height: 225,
        minWidth: "100%",
        minHeight: 225,
        marginTop: 20
    }
}); 