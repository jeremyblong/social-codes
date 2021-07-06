import React, { Component, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import styles from './styles.js';
import { useNavigation } from '@react-navigation/native';


const SideNavigationCustom = (props) => {
  const [data, setData] = useState([
    {id:1, route: "public-profile-main", title: "View Profile", image: require("../../../assets/icons/test.png")},
    {id:2, route: "jobs-homepage", title: "View Jobs", image: require("../../../assets/icons/suitcase.png")},
    {id:3, route: "public-profile-main", title: "Contracts", image: require("../../../assets/icons/contract.png")} ,
    {id:4, route: "public-profile-main", title: "Proposals", image: require("../../../assets/icons/document.png")} ,
    {id:5, route: "messaging-conversations", title: "Messages", image: require("../../../assets/icons/messages.png")} ,
    {id:6, route: "public-profile-main", title: "Alerts", image: require("../../../assets/icons/bell-circle.png")} ,
    {id:7, route: "public-profile-main", title: "Public Wall", image: require("../../../assets/icons/wall.png")} ,
    {id:8, route: "public-profile-main", title: "Forums", image: require("../../../assets/icons/forum.png")} ,
    {id:9, route: "public-profile-main", title: "New Post", image: require("../../../assets/icons/new-post.png")} ,
    {id:10, route: "public-profile-main", title: "Friends",image: require("../../../assets/icons/friends.png")} ,
  ]);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <FlatList style={styles.list}
        contentContainerStyle={styles.listContainer}
        data={data}
        horizontal={false}
        numColumns={2}
        keyExtractor= {(item) => {
          return item.id;
        }}
        renderItem={({item}) => {
          return (
            <View>
              <TouchableOpacity style={styles.card} onPress={() => {
                navigation.push(item.route);
              }}>
                <Image style={styles.cardImage} source={typeof item.image === "string" ? {uri:item.image} : item.image} />
              </TouchableOpacity>

              <View style={styles.cardHeader}>
                <View style={{alignItems:"center", justifyContent:"center"}}>
                  <Text style={styles.title}>{item.title}</Text>
                </View>
              </View>
            </View>
          )
        }}/>
    </View>
  );
}
export default SideNavigationCustom;