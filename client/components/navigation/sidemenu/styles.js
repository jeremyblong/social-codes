
import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    container:{
        flex:1,
        paddingTop:40,
        backgroundColor:'#141414',
    },
    list: {
        paddingHorizontal: 5,
        backgroundColor:"#141414",
    },
    listContainer:{
        alignItems:'center'
    },
      /******** card **************/
    card:{
        shadowColor: '#ffffff',
        shadowOffset: {
          width: 2,
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
        color:"#ffffff",
        fontWeight: 'bold'
    }
})