import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    container: {
        zIndex: -1,
        width,
        height,
        backgroundColor: "white",
        flex: 1
    },
    grayButton: {
        backgroundColor: "#303030"
    },
    absoluteBadge: {
        top: 15
    },
    milestoneText: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "left"
    },
    maxedIconSmall: {
        maxWidth: 35,
        maxHeight: 35,
        tintColor: "#ffd530"
    },
    headerIcon: {
        tintColor: "#ffd530",
        maxWidth: 35,
        maxHeight: 35
    }, 
    blackHr: {
        borderBottomWidth: 2,
        borderBottomColor: "black",
        width: "100%",
        marginTop: 35,
        marginBottom: 35
    },
    thinBlackHr: {
        borderBottomWidth: 2,
        borderBottomColor: "black",
        width: 350,
        marginTop: 10,
        marginBottom: 10
    },
    subHeaderText: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "left"
    },  
    detailsTitle: {
        textDecorationLine: "underline",
        textDecorationColor: "#ffd530",
        textAlign: "center",
        fontSize: 25
    },  
    hr: {
        borderBottomWidth: 2,
        borderBottomColor: "white",
        marginTop: 35,
        marginBottom: 35
    }, 
    priceText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 24,
        textAlign: "center"
    },
    centered: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        zIndex: 999
    },
    greyButton: {
        backgroundColor: "black",
        width: "100%",
        minWidth: "100%",
        borderColor: "#ffd530",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    margin: {
        margin: 20
    },
    thumbnailVideo: {
        minWidth: 55,
        minHeight: 55,
        maxWidth: 55,
        maxHeight: 55,
        borderRadius: 40
    },
    centeredPriceBox: {
        backgroundColor: "#303030",
        width: width * 0.80,
        height: 325,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        borderWidth: 2,
        borderColor: "#ffd530"
    },
    goldText: {
        color: "#ffd530"
    }
})