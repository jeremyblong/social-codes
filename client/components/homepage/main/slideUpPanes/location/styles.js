import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    container: {
        backgroundColor: "white",
        zIndex: 9999999999999999999999999999999999999,
        height: "100%",
        width,
        flex: 1
    },
    centered: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    goldText: {
        color: "#ffd530"
    },
    checkinIconExit: {
        maxWidth: 25, 
        maxHeight: 25, 
        minWidth: 25, 
        minHeight: 25,
        tintColor: "#ffd530"
    },
    customIconButton: {
        backgroundColor: "#E9EBEE",
        minWidth: 45,
        borderRadius: 0,
        minHeight: 45,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    listIcon: {
        maxWidth: 25,
        maxHeight: 25,
        minWidth: 25,
        borderRadius: 0,
        minHeight: 25
    }
})