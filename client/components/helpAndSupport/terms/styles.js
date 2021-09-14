import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    whiteText: {
        color: "white"
    },
    container: {
        padding: 15,
        flex: 1
    },
    paddingRight: {
        
    },
    maxedIconSmall: {
        maxWidth: 35,
        maxHeight: 35,
        tintColor: "#ffffff"
    },
    centered: {
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    absoluteBadge: {
        top: 15
    }
})