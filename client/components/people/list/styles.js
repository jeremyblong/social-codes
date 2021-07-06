
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container:{
        flex:1,
        marginTop:20,
    },
    containerAndroid: {
        flex: 1
    },
    list: {
        paddingHorizontal: 5,
        backgroundColor:"white",
    },
    listContainer:{
        alignItems:'center'
    },
    /******** card **************/
    card:{
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,

        marginVertical: 5,
        backgroundColor:"white",
        flexBasis: '47.5%',
        marginHorizontal: 5,
    },
    loading: {
        margin: 5,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
        backgroundColor:"white",
    },
    containerStyle: {
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        paddingBottom: 50, 
        alignItems:'center', 
        justifyContent: "center", 
        alignContent: "center"
    },
    cardFooter: {
        paddingVertical: 17,
        paddingHorizontal: 16,
        borderTopLeftRadius: 1,
        borderTopRightRadius: 1,
        flexDirection: 'row',
        alignItems:"center", 
        justifyContent:"center"
    },
    cardContent: {
        paddingVertical: 12.5,
        paddingHorizontal: 16,
    },
    centered: {
        justifyContent: "center",
        alignItems:"center",
        alignContent: "center"
    },
    cardHeader:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 12.5,
        paddingBottom: 25,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 1,
        justifyContent: "center",
        alignItems:"center",
        alignContent: "center",
        borderBottomRightRadius: 1,
    },
    userImage:{
        height: 120,
        width: 120,
        minWidth: 120,
        minHeight: 120,
        borderRadius: 60,
        alignSelf:'center',
        borderColor:"#DCDCDC",
        borderWidth:3,
    },
    name:{
        fontSize:18,
        flex:1,
        alignSelf:'center',
        color:"#008080",
        fontWeight:'bold'
    },
    position:{
        fontSize:14,
        flex:1,
        alignSelf:'center',
        color:"#696969"
    },
    followButton: {
        marginTop:10,
        height:35,
        width:150,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:30,
        backgroundColor: "black",
    },
    followButtonText:{
        color: "#FFFFFF",
        fontSize:18,
    },
    icon:{
        height: 20,
        width: 20, 
    },
    ion: {
        zIndex: 9999999999999
    },
    iconSpecial: {
        position: "absolute",
        zIndex: 99999,
        top: 10,
        left: 10,
        width: 35,
        height: 35
    },
    headerIcon: {
        maxWidth: 35,
        maxHeight: 35
    }
}); 