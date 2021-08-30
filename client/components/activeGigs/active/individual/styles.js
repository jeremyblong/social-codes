import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    container: {
        zIndex: -1,
        width,
        height: "100%",
        backgroundColor: "#141414",
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
        color: "#ededed",
        textAlign: "left"
    },
    maxedIconSmall: {
        maxWidth: 35,
        maxHeight: 35,
        tintColor: "#ffffff"
    },
    headerIcon: {
        tintColor: "#ffffff",
        maxWidth: 35,
        maxHeight: 35
    }, 
    blackHr: {
        borderBottomWidth: 1,
        borderBottomColor: "#ededed",
        width: "70%",
        marginTop: 35,
        marginBottom: 35
    },
    mainText: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        color: "#ededed",
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 25
    },
    thinBlackHr: {
        borderBottomWidth: 2,
        borderBottomColor: "#ededed",
        width: "100%",
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
        textDecorationColor: "#ffffff",
        color: "#ededed",
        textAlign: "center",
        fontSize: 25
    },  
    note: {
        color: "#ffffff"
    },
    hr: {
        borderBottomWidth: 1,
        borderBottomColor: "#ededed",
        marginTop: 20,
        marginBottom: 20,
        width: 250
    }, 
    hrCustom: {
        borderBottomWidth: 1,
        borderBottomColor: "#ededed",
        marginTop: 10,
        marginBottom: 10,
        width: 250
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
        borderColor: "#ffffff",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    containerBoxed: {
        padding: 20,
        margin: 0,
        borderWidth: 2,
        borderColor: "#303030",
        backgroundColor: "#303030"
    },
    totalLeft: {
        fontSize: 20,
        color: "#ededed"
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
        height: 375,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        borderWidth: 2,
        borderColor: "#ffffff"
    },
    goldText: {
        color: "#ffffff"
    }
})