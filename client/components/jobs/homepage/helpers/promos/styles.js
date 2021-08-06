import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    subText: {
        marginTop: 10,
        color: "white"
    },
    headerText: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#ffffff"
    },
    headerTextSub: {
        fontWeight: "bold", 
        fontSize: 18
    },
    margin10: {
        margin: 10
    }
})