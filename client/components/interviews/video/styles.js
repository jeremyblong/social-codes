import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
    headerIcon: {
        maxWidth: 35, 
        maxHeight: 35
    },
    container: {
        width,
        height,
        backgroundColor: "white",
        zIndex: -1
    },
    spinnerTextStyle: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white"
    },
    optionButtonOne: {
        position: "absolute",
        bottom: 55,
        left: (width / 2) - 37.5,
        backgroundColor: "white",
        borderRadius: 60,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.53,
        shadowRadius: 13.97,
        elevation: 21
    },
    sub: {
        fontSize: 15,
        color: "black",
        fontWeight: "bold",
        textAlign: "center"
    },
    centered: {
        position: 'absolute',
        left: (width / 2) - 150,
        top: height - 325
    },
    hr: {
        marginTop: 15,
        marginBottom: 15,
        borderBottomColor: "green",
        borderBottomWidth: 2
    },
    phone: {
        maxWidth: 75,
        maxHeight: 75
    },
    welcome: {
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 40
    },  
    localVideo: {
        width,
        height,
        zIndex: -1
    },
    iconOne: {
        maxWidth: 30,
        maxHeight: 30
    },
    optionButton: {
        position: "absolute",
        left: 35,
        bottom: 55,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.53,
        shadowRadius: 13.97,
        elevation: 21
    },
    optionButtonFlip: {
        position: "absolute",
        right: 35,
        bottom: 55,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.53,
        shadowRadius: 13.97,
        elevation: 21
    }
})