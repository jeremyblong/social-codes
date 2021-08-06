import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    row: {
        flexDirection: "row",
        paddingTop: 10
    },
    largeColumn: {
        width: width - 60,
        backgroundColor: "white",
        borderRadius: 25
    },
    smallColumn: {
        width: (width * 0.20)
    },
    headerGrey: {
        backgroundColor: "#303030"
    },
    goldText: {
        color: "#ffffff"
    },
    margin: {
        margin: 15
    },
    searchIcon: {
        maxWidth: 35,
        maxHeight: 35
    },
    label: {
        textAlign: "left",
        fontSize: 16,
        fontWeight: "bold"
    },
    searchContainer: {
        borderRadius: 40,
        borderWidth: 2,
        borderColor: "lightgrey",
        maxWidth: 45,
        marginTop: 5,
        maxHeight: 45,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    tagTop: {
        borderWidth: 2,
        borderColor: "grey",
        alignSelf: 'flex-start',
        padding: 5,
        margin: 5,
        borderRadius: 6,
        backgroundColor: "blue"
    },
    inputIOS: {
        marginTop: 10,
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    }
})