import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    headerIcon: {
        maxWidth: 35,
        maxHeight: 35
    },
    container: {
        width,
        height, //
        backgroundColor: "white",
        zIndex: -1
    },
    headText: {
        fontSize: 34,
        fontWeight: "bold",
        textAlign: "center"
    },
    thickHr: {
        borderBottomColor: "grey",
        borderBottomWidth: 10,
        width: "100%"
    },
    hr: {
        borderBottomColor: "grey",
        borderBottomWidth: 3,
        width: "100%",
        marginBottom: 15
    },
    row: {
        flexDirection: "row"
    },
    myImage: {
        maxWidth: "100%", 
        maxHeight: height * 0.40
    },
    skelatonSub: {
        width: "100%",
        height: 50
    },
    main: {
        margin: 10
    }
});
  