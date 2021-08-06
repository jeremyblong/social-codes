import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    container: {
        width,
        minHeight: height,
        backgroundColor: "white",
        zIndex: -1
    },
    margin: {
        margin: 15
    },
    topLeftExit: {
        position: "absolute",
        top: 20,
        left: 20,
        minWidth: 45,
        minHeight: 45,
        width: 45,
        height: 45,
        zIndex: 45
    },
    whiteText: {
        color: "#ffffff"
    },
    label: {
        fontSize: 18, //
        textAlign: "left",
        marginBottom: 10,
        marginTop: 10
    },
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        margin: 10,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        margin: 10,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    headerText: {
        fontSize: 15,
        fontWeight: "bold"
    }, 
    highlighter: {
        maxHeight: 550
    },
    comment: {
        marginTop: 20
    },
    textarea: {
        borderWidth: 2,
        borderColor: "#141414"
    },
    bareTextArea: {
        width: "95%",
    },
    textareaModal: {
        width: "95%",
        borderWidth: 2,
        borderColor: "blue"
    },
    textInputIcon: {
        maxWidth: 25,
        maxHeight: 25
    },  
    modal: {
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24
    },
    rowCustom: {
        flexDirection: "row",
        maxHeight: 40
    },
    section: {
        width: "12.5%",
        borderRightColor: "lightgrey",
        borderRightWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        borderTopColor: "lightgrey",
        borderTopWidth: 1,
        backgroundColor: "white"
    }
})