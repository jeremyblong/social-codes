import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    headerIcon: {
        maxWidth: 35,
        maxHeight: 35,
        tintColor: "#ffffff"
    },
    container: {
        width,
        height, //
        backgroundColor: "white",
        zIndex: -1
    },
    whiteText: {
        color: "#ffffff"
    },
    margin: {
        margin: 15
    },
    headerText: {
        fontWeight: "bold",
        fontSize: 18
    },
    centered: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"  
    },
    priorIcon: {
        minWidth: 350,
        marginTop: 50,
        minHeight: 350,
        maxWidth: 350,
        maxHeight: 350
    },
    hr: {
        borderBottomColor: "lightgrey",
        borderBottomWidth: 1,
        marginTop: 10,
        marginBottom: 10
    },
    backgroundVideo: {
        width: "100%",
        height: 300,
        borderWidth: 3,
        borderColor: "blue",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16
    },
    spinnerTextStyle: {
        color: "white",
        textAlign: "center"
    }
});
  