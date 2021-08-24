import { StyleSheet, Dimensions } from "react-native";


const { width, height } = Dimensions.get("window");


export default StyleSheet.create({
    container: {
      height,
      width,
      zIndex: -1,
      backgroundColor: "#141414"
    },
    headerIcon: {
      maxWidth: 35,
      maxHeight: 35
    }
}); 