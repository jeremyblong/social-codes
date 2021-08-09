import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    container: {
        zIndex: -1,
        width,
        height,
        backgroundColor: "#141414"
    },
    margin: {
        margin: 20
    },
    myImage: {
        maxWidth: "100%", 
        maxHeight: height * 0.40
    },
    greyHr: {
        borderBottomColor: "lightgrey",
        borderBottomWidth: 2,
        marginTop: 10,
        marginBottom: 10,
        width: "100%"
    },  
    headText: {
        color: "#ffffff",
        textAlign: "center",
        fontSize: 22,
        fontWeight: "bold"
    },  
    headerText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "blue"
    },
    headerMainText: {
        fontWeight: "bold",
        color: "darkred",
        textDecorationLine: "underline",
        paddingBottom: 10,
        fontSize: 24
    },
    hr: {
        borderBottomColor: "lightgrey",
        borderBottomWidth: 2,
        marginTop: 10,
        marginBottom: 10,
        width: 200
    },
    workName: {
        paddingTop: 5,
        paddingBottom: 5,
        fontSize: 20,
        fontWeight: "bold"
    },
    headerIcon: {
        maxWidth: 35,
        tintColor: "#ffffff",
        maxHeight: 35
    },
    whiteText: {
        color: "#ffffff"
    },
    hr: {
        borderBottomColor: "grey",
        borderBottomWidth: 2,
        marginTop: 15,
        marginBottom: 15
    }
})