import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    scrollRow: {
        minHeight: 100,
        maxHeight: 100
    },
    block: {
        height: "75%",
        alignSelf: 'flex-start',
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        borderColor: "grey",
        padding: 15,
        backgroundColor: "white"
    },
    questionBox: {  
        flexDirection: "row",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
        borderWidth: 1,
        height: height * 0.20,
        borderColor: "grey",
        margin: 7.5
    },
    normalColumn: {
        flexDirection: "column"
    },
    upDownImage: {
        maxWidth: 30,
        maxHeight: 30  
    },
    smallColumn: {
        width: "20%",
        backgroundColor: "#EEEBEE",
        borderRightColor: "black",
        borderRightWidth: 1,
        height: "100%"
    },
    innerRow: {
        flexDirection: "row",
        height: "50%",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        borderBottomColor: "grey", 
        borderBottomWidth: 1
    },
    countText: {
        fontSize: 16,
        textAlign: "center",
        fontWeight: "bold",
        marginRight: 5
    },
    largeRow: {
        flexDirection: "row",
        margin: 5
    },
    tag: {
        backgroundColor: "#EEEBEE",
        borderWidth: 1,
        alignSelf: 'flex-start',
        borderColor: "grey",
        margin: 5,
        padding: 4,

    },  
    largeRowTwo: {
        flexDirection: "row",
        flexWrap: 'wrap'
    },
    mainText: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#0057ff"
    },  
    largeColumn: {
        width: "80%",
        backgroundColor: "white",
        height: "100%"
    },
    outter: {
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.48,
        shadowRadius: 3.95,
        elevation: 10
    },
    innerTagText: {
        color: "black", 
        fontSize: 15, 
        fontWeight: "bold"
    },
    hr: {
        width: "100%",
        borderBottomColor: "lightgrey",
        borderBottomWidth: 3,
        marginBottom: 15
    },      
    headerText: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "left",
        textDecorationLine: "underline"
    },
    margin: {
        margin: 15
    }
})