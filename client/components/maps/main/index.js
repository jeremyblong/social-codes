import React, { Component, Fragment } from 'react';
import { Text, View, Image, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import styles from './styles.js';
import { Header, Left, Body, Right, Button, Title, Subtitle } from 'native-base';
import Carousel from 'react-native-snap-carousel';
import SearchBar from 'react-native-search-bar';
import BottomSearchBar from "react-native-bottom-search-bar";
import Config from "react-native-config";
import axios from "axios";
import { connect } from "react-redux";
import moment from "moment";
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-toast-message';

const { width, height } = Dimensions.get("window");



class MapsMainHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        spinner: true,
        region: {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
        searchValue: "",
        hide: true,
        jobs: [],
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

                const { jobs } = res.data;

                this.setState({
                    jobs,
                    spinner: false
                })
            } else {
                console.log("Err", res.data);

                this.setState({
                    spinner: false
                }, () => {
                    Toast.show({
                        text1: 'An error occurred while fetching jobs...',
                        text2: 'An error occurred and we are unable to retrieve the requested jobs... please navigate away and back to this page to try again.',
                        visibilityTime: 4000,
                        position: "top",
                        type: "error"
                    });
                })
            }
        }).catch((err) => {
            console.log(err);

            this.setState({
                spinner: false
            }, () => {
                Toast.show({
                    text1: 'An error occurred while fetching jobs...',
                    text2: 'An error occurred and we are unable to retrieve the requested jobs... please navigate away and back to this page to try again.',
                    visibilityTime: 4000,
                    position: "top",
                    type: "error"
                });
            })
        })
    }
    _renderItem = ({item, index}) => {
        return (
            <View style={styles.card}>
               
            <View style={styles.cardHeader}>
               <View>
                <Text style={styles.title}>{item.title.slice(0, 45)}{typeof item.title !== "undefined" && item.title.length >= 45 ? "..." : ""}</Text>
                <Text style={styles.cardText}>
                    {item.description.slice(0, 110)}{typeof item.description !== "undefined" && item.description.length >= 110 ? "..." : ""}
                </Text>
               </View>
             </View>
            
             <View style={styles.centered}>
                {item.pricing.fixedOrHourly === "hourly" ? <Text style={[styles.price, { fontWeight: "bold" }]} note>Hourly: <Text style={{ color: "blue" }}>${item.pricing.minHourly} - ${item.pricing.maxHourly}</Text> {"\n"}{"\n"}Posted {moment(item.system_date).fromNow()}</Text> : <Text style={[styles.price, { fontWeight: "bold" }]} note>Fixed-Price - {moment(item.system_date).fromNow()}</Text>}
                <View style={styles.hr} />
                {item.pricing.fixedOrHourly === "hourly" ? null : <Text style={[styles.price, { color: "blue", fontWeight: "bold" }]}>${item.pricing.fixedBudgetPrice} - entire project</Text>}
             </View>
             <View style={styles.cardFooter}>
               <View style={styles.socialBarContainer}>
                 <View style={styles.socialBarSection}>
                   <TouchableOpacity onPress={() => {
                       this.props.props.navigation.push("view-job-individual", { item });
                   }} style={styles.socialBarButton}>
                     <Image style={styles.icon} source={require("../../../assets/icons/profile.png")}/>
                     <Text style={[styles.socialBarLabel, styles.buyNow]}>View Job</Text>
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
        const { hide, jobs } = this.state;
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
                    <Toast ref={(ref) => Toast.setRef(ref)} />
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
                    <Spinner
                        visible={this.state.spinner}
                        textContent={'Loading content...'}
                        textStyle={styles.spinnerTextStyle}
                        overlayColor={"rgba(0, 0, 0, 0.75)"}
                        cancelable={true}
                        color={"#0057ff"}
                    />
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        onRegionChangeComplete={this.onRegionChange}
                    >
                        {typeof jobs !== "undefined" && jobs.length > 0 ? jobs.map((job, indexxxx) => {
                            return (
                                <Marker
                                    key={indexxxx}
                                    coordinate={{
                                        latitude: job.address.position.lat,
                                        longitude: job.address.position.lon
                                    }}
                                >
                                    <Callout onPress={() => {
                                        console.log("clicked....!!!");

                                        this.props.props.navigation.push("view-job-individual", { item: job });
                                    }}>
                                        <Text style={styles.headerCallout}>{job.title}</Text>
                                        <Text style={styles.subCallout}>{job.description}</Text>
                                    </Callout>
                                </Marker>
                            );
                        }) : null}
                    </MapView>
                    
                    {hide === true ? <Carousel
                        containerCustomStyle={styles.containerCustom}
                        ref={(c) => { this._carousel = c; }}
                        data={jobs}
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
