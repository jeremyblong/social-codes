import { StyleSheet, Dimensions } from "react-native";


const { width, height } = Dimensions.get("window");


export default StyleSheet.create({
    headerIcon: {
        maxWidth: 35,
        maxHeight: 35
    },
    divider: {
        backgroundColor: "#f0f0f0"
    },
    header: {
        backgroundColor: "#303030"
    },  
    goldText: {
        color: "#fdd530"
    },
    container: {
        backgroundColor: "white"
    },
    animation: {
        maxWidth: 350,
        maxHeight: 225,
        minWidth: 350,
        marginTop: 10,
        minHeight: 225
    },
    centered: {
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    }
}); 