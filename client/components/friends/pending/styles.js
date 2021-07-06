import { StyleSheet, Dimensions } from "react-native";


const { width, height } = Dimensions.get("window");


export default StyleSheet.create({
    headerIcon: {
        maxWidth: 35,
        maxHeight: 35
    },
    container: {
        backgroundColor: "white",
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
        borderRadius: 40
    },
    margin: {
        margin: 15
    },
    headText: {
        fontSize: 34,
        fontWeight: "bold",
        textAlign: "center"
    },
    myImage: {
        maxWidth: "100%", 
        maxHeight: height * 0.40
    }
}); 