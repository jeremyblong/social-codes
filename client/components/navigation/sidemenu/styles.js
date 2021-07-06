
import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    container:{
        flex:1,
        marginTop:40,
        backgroundColor:'#f6f6f6',
    },
    list: {
        paddingHorizontal: 5,
        backgroundColor:"#f6f6f6",
    },
    listContainer:{
        alignItems:'center'
    },
      /******** card **************/
    card:{
        shadowColor: '#474747',
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
    
        elevation: 12,
        marginVertical: 20,
        marginHorizontal: 20,
        backgroundColor:"#e2e2e2",
        //flexBasis: '42%',
        width:120,
        height:120,
        borderRadius:60,
        alignItems:'center',
        justifyContent:'center'
    },
    cardHeader: {
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
    cardFooter:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 12.5,
        paddingBottom: 25,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
    },
    cardImage:{
        height: 50,
        width: 50,
        alignSelf:'center'
    },
    title:{
        fontSize:18,
        flex:1,
        alignSelf:'center',
        color:"#696969"
    }
})