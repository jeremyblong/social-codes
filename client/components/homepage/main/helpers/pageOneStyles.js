import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
    container: {
        width: "100%",
        minHeight: height,
        backgroundColor: "white"
    },
    boldText: {
        fontWeight: "bold",
        fontSize: 18,
        textAlign: "left"
    },
    subText: {
        fontSize: 15,
        textAlign: "left"
    }
});

