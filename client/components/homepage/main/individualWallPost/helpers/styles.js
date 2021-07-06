import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    icon: {
        maxWidth: 40,
        maxHeight: 40,
        minWidth: 40,
        minHeight: 40
    }
})