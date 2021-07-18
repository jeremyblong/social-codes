import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    container: {
        zIndex: -1,
        width,
        height,
        backgroundColor: "white"
    },
    headerIcon: {
        tintColor: "#ffd530",
        maxWidth: 35,
        maxHeight: 35
    },  
    margin: {
        margin: 15
    },
    goldText: {
        color: "#ffd530"
    }
})