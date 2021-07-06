import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    container: {
        width,
        height: "100%",
        backgroundColor: "white",
        zIndex: -1
    },
    margin15: {
        margin: 15
    },
    smallerText: {
        fontSize: 14,
        marginTop: 10
    },
    schoolName: {
        fontWeight: "bold",
        color: "blue"
    },
    touchable: {
        borderBottomWidth: 2,
        borderLeftWidth: 4,
        borderLeftColor: "black",
        borderRightColor: "black",
        borderRightWidth: 4,
        borderBottomColor: "blue",
        padding: 10
    },
    label: {
        paddingBottom: 10,
        fontWeight: "bold",
        fontSize: 15
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
});
  