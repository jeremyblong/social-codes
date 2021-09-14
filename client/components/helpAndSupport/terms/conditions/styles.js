import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    whiteText: {
        color: "white"
    },
    container: {
        flex: 1,
        height: "100%",
        width
    },
    webview: {
        width: "100%",
        height: "100%"
    }
})