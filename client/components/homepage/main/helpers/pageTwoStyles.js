import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
    container: {
        width: "100%",
        height,
        backgroundColor: "white"
    },
    iconBoxed: {
        maxWidth: 55, 
        maxHeight: 55,
        minHeight: 55,
        minWidth: 55
    },
    iconBoxedTwo: {
        maxWidth: 40, 
        maxHeight: "85%",
        minHeight: "85%",
        minWidth: 40,
        borderRadius: 40,
        margin: 5
    },
    animation: {
        minWidth: 300, 
        maxHeight: 300,
        minHeight: 300,
        maxWidth: 300
    },
    centered: {
        position: "absolute",
        bottom: 0,
        left: (width / 2) - 150 
    }
});

