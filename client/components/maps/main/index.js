import React, { Component, Fragment } from 'react';
import { Text, View, Image, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import styles from './styles.js';
import { Header, Left, Body, Right, Button, Title, Subtitle } from 'native-base';
import Carousel from 'react-native-snap-carousel';
import SearchBar from 'react-native-search-bar';
import BottomSearchBar from "react-native-bottom-search-bar";
import Config from "react-native-config";
import axios from "axios";
import { connect } from "react-redux";

const { width, height } = Dimensions.get("window");



class MapsMainHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        region: {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
        searchValue: "",
        hide: true,
        entries: [{
            image: require("../../../assets/images/me.jpg"),
            text: "The road leads to nowhere don't you know that???",
            title: "Whats on your mind joe blow... don't you know!",
            index: 0
        }, {
            image: require("../../../assets/images/me.jpg"),
            text: "The road leads to nowhere don't you know that???",
            title: "Whats on your mind joe blow... don't you know!",
            index: 1
        }, {
            image: require("../../../assets/images/me.jpg"),
            text: "The road leads to nowhere don't you know that???",
            title: "Whats on your mind joe blow... don't you know!",
            index: 2
        }, {
            image: require("../../../assets/images/me.jpg"),
            text: "The road leads to nowhere don't you know that???",
            title: "Whats on your mind joe blow... don't you know!",
            index: 3
        }, {
            image: require("../../../assets/images/me.jpg"),
            text: "The road leads to nowhere don't you know that???",
            title: "Whats on your mind joe blow... don't you know!",
            index: 4
        }, {
            image: require("../../../assets/images/me.jpg"),
            text: "The road leads to nowhere don't you know that???",
            title: "Whats on your mind joe blow... don't you know!",
            index: 5
        }, {
            image: require("../../../assets/images/me.jpg"),
            text: "The road leads to nowhere don't you know that???",
            title: "Whats on your mind joe blow... don't you know!",
            index: 6
        }, {
            image: require("../../../assets/images/me.jpg"),
            text: "The road leads to nowhere don't you know that???",
            title: "Whats on your mind joe blow... don't you know!",
            index: 7
        }]
    }
}
    onRegionChange(region) {
        this.setState({ region });
    }  
    componentDidMount() {
        axios.post(`${Config.ngrok_url}/gather/jobs/by/location/nearby`, {
            current_location: this.props.userCurrentLocation
        }).then((res) => {
            if (res.data.message === "Gathered jobs by location") {
                console.log(res.data);
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    _renderItem = ({item, index}) => {
        return (
            <View style={styles.card}>
               
            <View style={styles.cardHeader}>
               <View>
                 <Text style={styles.title}>{item.title}</Text>
                 {/* <Text style={styles.price}>{item.text}</Text> */}
               </View>
             </View>
            
             <View style={styles.centered}>
                <Image style={styles.cardImage} source={item.image}/>
             </View>
             <View style={styles.cardFooter}>
               <View style={styles.socialBarContainer}>
                 <View style={styles.socialBarSection}>
                   <TouchableOpacity onPress={() => {}} style={styles.socialBarButton} onPress={() => {}}>
                     <Image style={styles.icon} source={require("../../../assets/icons/profile.png")}/>
                     <Text style={[styles.socialBarLabel, styles.buyNow]}>View User's Profile</Text>
                   </TouchableOpacity>
                 </View>
                 <View style={styles.socialBarSection}>
                   <TouchableOpacity onPress={() => {}} style={styles.socialBarButton}>
                    <Text style={[styles.socialBarLabel, { marginRight: 10 }]}>Hire</Text> 
                    <Image style={styles.icon} source={require("../../../assets/icons/hire-me.png")}/>
                   </TouchableOpacity>
                 </View>
               </View>
             </View>
           </View>
        );
    }
    render() {
        const { hide } = this.state;
        return (
            <Fragment>
                <View style={styles.outterContainer}>
                    <Header style={{ backgroundColor: "#303030" }}>
                        <Left>
                            <Button onPress={() => {
                                this.props.props.navigation.goBack();
                            }} transparent>
                                <Image source={require("../../../assets/icons/go-back.png")} style={[styles.headerIcon, { tintColor: "#ffffff" }]} />
                            </Button>
                        </Left>
                        <Body>
                            <Title style={{ color: "#ffffff" }}>Local Talent</Title>
                            <Subtitle style={{ color: "#ffffff" }}>View local talent</Subtitle>
                        </Body>
                        <Right>
                            <Button onPress={() => {
                                this.setState({
                                    isVisible: true
                                })
                            }} transparent>
                                <Image source={require("../../../assets/icons/help.png")} style={[styles.headerIconTwo, { tintColor: "#ffffff" }]} />
                            </Button>
                        </Right>
                    </Header>
                    {/* <View style={styles.row}>
                        <SearchBar 
                            style={styles.searchBar}
                            ref="searchBar"
                            placeholder="Search anything..."
                            onChangeText={(value) => {}}
                            onSearchButtonPress={() => {}}
                            onCancelButtonPress={() => {}}
                        />
                        <TouchableOpacity onPress={() => {
                            this.setState({
                                hide: !this.state.hide
                            })
                        }} style={styles.hideTouchOutter}>
                            <Image source={require("../../../assets/icons/hide-150.png")} style={styles.hideTouch} />
                        </TouchableOpacity>
                    </View>  */}
                    
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        onRegionChangeComplete={this.onRegionChange}
                    />
                    
                    {hide === true ? <Carousel
                        containerCustomStyle={styles.containerCustom}
                        ref={(c) => { this._carousel = c; }}
                        data={this.state.entries}
                        renderItem={this._renderItem}
                        sliderWidth={width * 0.85}
                        itemWidth={width}
                    /> : null}
                    <BottomSearchBar
                        style={{ maxHeight: 40 }}
                        height={75}
                        iPhoneXHeight={100}
                        searchBoxWidth={"62.5%"}
                        disableHomeButton
                        buttonText={hide === true ? "Hide pane" : "Show pane"}
                        buttonOnPress={() => {
                            this.setState({
                                hide: !this.state.hide
                            })
                        }}
                        buttonBackgroundColor="#0057ff"
                        onChangeText={(text)=> {
                            console.log(text);

                            this.setState({
                                searchValue: text
                            })
                        }}
                    />
                </View>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        userCurrentLocation: state.signupData.authData.userCurrentLocation
    }
}
export default connect(mapStateToProps, {  })(MapsMainHelper)
