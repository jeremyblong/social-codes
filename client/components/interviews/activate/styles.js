import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
    headerIcon: {
        maxWidth: 35, 
        tintColor: "#ffd530",
        maxHeight: 35
    },
    goldText: {
        color: "#ffd530"
    },
    container: {
        backgroundColor: "white",
        zIndex: -1,
        flex: 1
    },
    hr: {
        borderBottomColor: "lightgrey",
        borderBottomWidth: 2,
        marginTop: 10,
        marginBottom: 10
    },
    bottom: {
        margin: 15,
        position: "absolute",
        bottom: 10,
        width: "90%"
    },
    touchContainer: {
        borderTopWidth: 2,
        borderTopColor: "darkblue",
        borderBottomColor: "darkblue", 
        borderBottomWidth: 2,
        paddingBottom: 15
    },
    touch: {
        textAlign: "center", 
        fontWeight: "bold", 
        fontSize: 18, 
        color: "darkblue", 
        marginTop: 15
    },
    description:{
        fontSize:18,
        fontWeight:'bold',
    },
    date:{
        fontSize:14,
        color:"#696969",
        marginTop: 5,
        fontWeight: "bold"
    },
    margin: {
        margin: 15
    },
    largeText: {
        textAlign: "left",
        fontSize: 20,
        fontWeight: "bold"
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: "center"
    }
})