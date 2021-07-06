import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
    headerIcon: {
        maxWidth: 35, 
        maxHeight: 35
    },
    container: {
        width,
        minHeight: height * 0.50,
        backgroundColor: "white",
        zIndex: -1,
        flex: 1
    },
    margin: {
        margin: 15
    },
    contentContainer: {
        flex: 1
    },
    headerText: {
        fontSize: 18,
        fontWeight: "bold"
    },
    cardContent: {
        marginLeft: 20,
        marginTop: 10,
    },
    footer: {
        flex: 1,
        backgroundColor: "white"
    },
    card:{
        shadowColor: 'black',
        minWidth: width * 0.80,
        shadowOffset: {
          width: 0,
          height: 6,
        },
        maxHeight: height * 0.15,
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
        marginVertical: 10,
        marginHorizontal:20,
        backgroundColor:"white",
        flexBasis: '46%',
        padding: 10,
        flexDirection:'row',
        borderLeftWidth:6,
    },
    description:{
        fontSize:18,
        color:"black",
        fontWeight:'bold',
    },
    date:{
        fontSize:15,
        color:"blue",
        fontWeight: "bold",
        marginTop:5
    }
})