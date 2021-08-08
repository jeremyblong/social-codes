import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    headerIcon: {
        maxWidth: 35,
        maxHeight: 35,
        tintColor: "#ffffff"
    },
    headerTextMain: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "left"
    },
    icon: {
        maxWidth: 25,
        padding: 5,
        maxHeight: 25
    },
    iconThree: {
        maxWidth: 35,
        maxHeight: 35,
        tintColor: "#ffffff"
    },
    circle: {
        borderWidth:1,
        borderColor: 'rgba(0,0,0,0.4)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 50,
        position: 'absolute',
        right: 10
    },
    container: {
        width,
        height,
        zIndex: -1,
        backgroundColor: "#141414"
    },
    margin: {
        margin: 20
    },
    headerText: {
        margin: 10,
        fontSize: 18,
        fontWeight: "bold",
        color: "#ffffff"
    },
    whiteText: {
        color: "#ffffff"
    },
    lightGreyText: {
        color: "#cccccc"
    },
    innerBox: {
        flexDirection: "row",
        height: 50,
        width: "100%"
    },
    left: {
        justifyContent: "flex-start",
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 10,
        alignContent: "center"
    },
    right: {
        position: "absolute",
        right: 20,
        paddingTop: 8
    },
    boxed: {
        borderWidth: 2,
        borderColor: "#cecece",
        marginTop: 15
    },
    switchText: {
        marginTop: 5,
        marginLeft: 30,
        fontWeight: "bold",
        color: "#ffffff"
    },
    specialRow: {
        marginTop: 10, 
        marginLeft: 15, 
        flexDirection: "row"
    },
    selected: {
        borderWidth: 2,
        borderColor: "#0057ff",
        marginTop: 15
    },
    rightHalf: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        marginLeft: 10
    },
    iconNumberTwo: {
        maxWidth: 35,
        maxHeight: 35,
        tintColor: "#ffffff"
    },
    innerText: {
        textAlign: "center",
        color: "#0057ff",
        marginBottom: 10,
        fontSize: 18
    },      
    textarea: {
        width: width * 0.75,
        marginTop: 15,
        maxHeight: 75
    },
    redText: {
        fontSize: 13,
        color: "red",
        textAlign: "center",
        textDecorationLine: "underline"
    },
    thickHr: {
        borderBottomColor: "lightgrey",
        borderBottomWidth: 10
    },
    blueText: {
        color: "#0057ff"
    },
    row: {
        flexDirection: "row"
    },
    touchInnerText: {
        fontWeight: "bold",
        marginTop: 4,
        marginLeft: 10,
        fontSize: 18,
        color: "#0057ff"
    },
    touchable: {
        flexDirection: "row",
        marginTop: 15,
        maxHeight: 50
    },
    plus: {
        maxWidth: 30,
        tintColor: "#0057ff",
        maxHeight: 30
    }
})