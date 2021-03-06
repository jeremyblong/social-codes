import { StyleSheet, Dimensions } from "react-native";


const { width, height } = Dimensions.get("window");


export default StyleSheet.create({
    headerIcon: {
        maxWidth: 35,
        tintColor: "#ffffff",
        maxHeight: 35
    },
    whiteText: {
        color: "#ffffff"
    },
    container: {
        backgroundColor: "#141414",
        width,
        height,
        zIndex: -1
    },
    buttonCustom: {
        padding: 7.5, 
        width: 100, 
        justifyContent: "center",
        alignItems: "center", 
        alignContent: "center"
    },
    customText: {
        fontWeight: "bold" 
    },
    avatar: {
        borderRadius: 40,
        minWidth: 45,
        minHeight: 45,
        maxHeight: 45,
        maxWidth: 45
    },
    margin: {
        margin: 15
    },
    headText: {
        fontSize: 34,
        fontWeight: "bold",
        color: "#ffffff",
        textAlign: "center"
    },
    myImage: {
        maxWidth: "100%", 
        maxHeight: height * 0.40
    }
}); 