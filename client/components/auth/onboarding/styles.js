import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    headerIcon: {
        maxWidth: 35,
        maxHeight: 35,
        tintColor: "#ffffff"
    },
    goldText: {
        color: "#ffffff"
    },
    container: {
        flex: 1,
        height,
        width,
        backgroundColor: "white"
    }
})