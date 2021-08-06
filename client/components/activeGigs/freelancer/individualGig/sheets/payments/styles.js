import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    container: {
        zIndex: -1,
        width,
        height,
        backgroundColor: "#303030"
    },
    headerIcon: {
        tintColor: "#ffffff",
        maxWidth: 35,
        maxHeight: 35
    },  
    list: {
        backgroundColor: "#303030"
    },
    margin: {
        margin: 15
    },
    goldText: {
        color: "#ffffff"
    },
    listitem: {
        backgroundColor: "#303030"
    },
    whiteText: {
        color: "#ffffff"
    }
})