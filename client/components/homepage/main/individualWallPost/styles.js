import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    profilePicHeader: {
        minWidth: 45, 
        minHeight: 45, 
        maxWidth: 45, 
        maxHeight: 45, 
        borderRadius: 35
    },
    maxedAnimationBoxHeader: {
        minWidth: 45, 
        minHeight: 45, 
        maxWidth: 45, 
        maxHeight: 45
    },
    animationContainerHeader: {
        marginRight: 15
    },
    container: {
        minHeight: height,
        backgroundColor: "white"
    },
    header: {
        backgroundColor: "#fdd530"
    }
})