import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
    headerIcon: {
        maxWidth: 35, 
        maxHeight: 35
    },
    container: {
        backgroundColor: "white",
        zIndex: -1,
        flex: 1
    },
    largeText: {
        textAlign: "center",
        fontSize: 22,
        fontWeight: "bold"
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: "center"
    },
    cardContent: {
        marginLeft:20,
        marginTop:10,
    },
    image:{
        width:25,
        height:25,
    },
    name: {
        marginBottom: 10,
        fontSize: 20,
        fontWeight: "bold"
    },
    sub: {
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 10
    },
    card:{
        shadowColor: 'black',
        shadowOffset: {
          width: 5,
          height: 6,
        },
        flex: 1,
        height: "100%",
        maxHeight: height * 0.40,
        shadowOpacity: 0.37,
        marginBottom: 20,
        shadowRadius: 7.49,
        elevation: 12,
        marginHorizontal:10,
        backgroundColor:"white",
        padding: 10,
        flexDirection:'row',
        flexWrap: 'wrap',
        borderLeftWidth:6,
    },
    description:{
        fontSize:18,
        color:"blue",
        fontWeight:'bold',
    },
    date:{
        fontSize:14,
        color:"#696969",
        marginTop: 5,
        fontWeight: "bold"
    },
    headText: {
        fontSize: 34,
        fontWeight: "bold",
        textAlign: "center"
    },
    myImage: {
        maxWidth: "100%", 
        maxHeight: height * 0.40
    },
    customText: {
        marginBottom: 50,
        fontSize: 30,
        fontWeight: "bold"
    }
})