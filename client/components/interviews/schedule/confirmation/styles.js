import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
    headerIcon: {
        maxWidth: 35, 
        maxHeight: 35,
        tintColor: "#ffffff"
    },
    whiteText: {
        color: "#ffffff"
    },
    container: {
        backgroundColor: "white",
        zIndex: -1,
        flex: 1
    },
    absolute: {
        position: 'absolute',
        left: (width / 2) - 100,
        top: 50
    },
    bottom: {
        margin: 10,
        backgroundColor: "white"
    },
    largeText: {
        textAlign: "center",
        fontSize: 22,
        fontWeight: "bold"
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: "center",
        position: "absolute",
        top: 300,
        padding: 10
    },
    animation: {
        maxWidth: 200,
        minWidth: 200,
        maxHeight: 200,
        minHeight: 200
    }
})