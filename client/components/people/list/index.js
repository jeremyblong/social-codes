import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
  Dimensions,
  Platform,
  FlatList
} from 'react-native';
import styles from './styles.js';
import { Header, Left, Body, Right, Title, Subtitle, Button } from 'native-base';
import SearchBar from 'react-native-search-bar';
import Config from "react-native-config";
import axios from "axios";
import _ from "lodash";
import Video from 'react-native-video';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { Fragment } from 'react';

const { width, height } = Dimensions.get("window");


class PeopleBrowseListHelper extends Component {
  constructor(props) {
    super(props);

    this.state = {
        data: [],
        users: [],
        searchValue: "",
        alreadyPooled: []
    };
}

    handleClick = (item) => {
        console.log("handle click", item);

        this.props.props.navigation.push("individual-profile-public", { item });
    }
    handleSearch = () => {
        console.log("handle search clicked");
    }
    handleCancellation = () => {
        console.log("handle cancellation clicked");
    }
    componentDidMount() {
        axios.get(`${Config.ngrok_url}/gather/all/users`).then((res) => {
            if (res.data.message === "Gathered all users!") {
                console.log(res.data);

                const { users } = res.data;

                const pooled = [];

                for (let index = 0; index < users.length; index++) {
                    const user = users[index];
                    
                    pooled.push(user.unique_id);

                    if ((users.length - 1) === index) {
                        this.setState({
                            users,
                            alreadyPooled: pooled
                        }) 
                    }
                }

                
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    onBuffer = (buffer) => {
        console.log("buffer", buffer);
    }
    videoError = (err) => {
        console.log("Err", err);
    }
    renderImageOrVideo = (item) => {
        if (typeof item.profilePics !== "undefined" && item.profilePics.length > 0) {
            if (item.profilePics[item.profilePics.length - 1].type === "video") {
                return <Video source={{ uri: `${Config.wasabi_url}/${item.profilePics[item.profilePics.length - 1].picture}` }}   // Can be a URL or a local file.
                    ref={(ref) => {
                        this.player = ref
                    }} 
                    resizeMode={"cover"}
                    autoPlay 
                    repeat={true}    
                    muted={true}                                 // Store reference
                    onBuffer={this.onBuffer}                // Callback when remote video is buffering
                    onError={this.videoError}               // Callback when video cannot be loaded
                    style={styles.userImage} 
                />;
            } else {
                return <Image style={styles.userImage} source={{ uri: `${Config.wasabi_url}/${item.profilePics[item.profilePics.length - 1].picture}` }}/>;
            }
        } else {
            if (_.has(item, "photo")) {
                return <Image style={styles.userImage} source={{ uri: item.photo }}/>;
            } else {
                return <Image style={styles.userImage} source={{ uri: "https://bootdey.com/img/Content/avatar/avatar7.png" }}/>;
            }
        }
    }
    renderCoverPhoto = (item) => {
        if (typeof item.coverPhotos !== "undefined" && item.coverPhotos.length > 0) {
            return { uri: `${Config.wasabi_url}/${item.coverPhotos[item.coverPhotos.length - 1].picture}` };
        } else {
            return require("../../../assets/images/beach.jpg");
        }
    }
    loadMoreResults = (info) => {
        console.log("info", info);

        axios.get(`${Config.ngrok_url}/gather/more/users/list`, { 
            params: {
                alreadyPooled: this.state.alreadyPooled
            }
        }).then((res) => {
            if (res.data.message === "Successfully located people!") {
                console.log(res.data);

                const { people, persons } = res.data;

                this.setState({
                    users: [...this.state.users, ...people],
                    alreadyPooled: [...this.state.alreadyPooled, ...persons]
                })
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    renderLoadingContent = () => {
        const { users } = this.state;
        
        if (typeof users === "undefined" || users.length === 0) {
            return (
                <Fragment>
                <View style={{ flexDirection: "row" }}>
                    <SkeletonPlaceholder>
                       <View style={{ flexDirection: "row" }}>
                            <View style={[styles.loading, { flexDirection: "column", minHeight: 200, minWidth: width * 0.475, maxWidth: width * 0.30 }]}>
                            
                            </View>   
                            <View style={[styles.loading, { flexDirection: "column", minHeight: 200, minWidth: width * 0.475, maxWidth: width * 0.30 }]}>
                                
                            </View> 
                       </View>  
                    </SkeletonPlaceholder>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <SkeletonPlaceholder>
                       <View style={{ flexDirection: "row" }}>
                            <View style={[styles.loading, { flexDirection: "column", minHeight: 200, minWidth: width * 0.475, maxWidth: width * 0.30 }]}>
                            
                            </View>   
                            <View style={[styles.loading, { flexDirection: "column", minHeight: 200, minWidth: width * 0.475, maxWidth: width * 0.30 }]}>
                                
                            </View> 
                       </View>  
                    </SkeletonPlaceholder>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <SkeletonPlaceholder>
                       <View style={{ flexDirection: "row" }}>
                            <View style={[styles.loading, { flexDirection: "column", minHeight: 200, minWidth: width * 0.475, maxWidth: width * 0.30 }]}>
                            
                            </View>   
                            <View style={[styles.loading, { flexDirection: "column", minHeight: 200, minWidth: width * 0.475, maxWidth: width * 0.30 }]}>
                                
                            </View> 
                       </View>  
                    </SkeletonPlaceholder>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <SkeletonPlaceholder>
                       <View style={{ flexDirection: "row" }}>
                            <View style={[styles.loading, { flexDirection: "column", minHeight: 200, minWidth: width * 0.475, maxWidth: width * 0.30 }]}>
                            
                            </View>   
                            <View style={[styles.loading, { flexDirection: "column", minHeight: 200, minWidth: width * 0.475, maxWidth: width * 0.30 }]}>
                                
                            </View> 
                       </View>  
                    </SkeletonPlaceholder>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <SkeletonPlaceholder>
                       <View style={{ flexDirection: "row" }}>
                            <View style={[styles.loading, { flexDirection: "column", minHeight: 200, minWidth: width * 0.475, maxWidth: width * 0.30 }]}>
                            
                            </View>   
                            <View style={[styles.loading, { flexDirection: "column", minHeight: 200, minWidth: width * 0.475, maxWidth: width * 0.30 }]}>
                                
                            </View> 
                       </View>  
                    </SkeletonPlaceholder>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <SkeletonPlaceholder>
                       <View style={{ flexDirection: "row" }}>
                            <View style={[styles.loading, { flexDirection: "column", minHeight: 200, minWidth: width * 0.475, maxWidth: width * 0.30 }]}>
                            
                            </View>   
                            <View style={[styles.loading, { flexDirection: "column", minHeight: 200, minWidth: width * 0.475, maxWidth: width * 0.30 }]}>
                                
                            </View> 
                       </View>  
                    </SkeletonPlaceholder>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <SkeletonPlaceholder>
                       <View style={{ flexDirection: "row" }}>
                            <View style={[styles.loading, { flexDirection: "column", minHeight: 200, minWidth: width * 0.475, maxWidth: width * 0.30 }]}>
                            
                            </View>   
                            <View style={[styles.loading, { flexDirection: "column", minHeight: 200, minWidth: width * 0.475, maxWidth: width * 0.30 }]}>
                                
                            </View> 
                       </View>  
                    </SkeletonPlaceholder>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <SkeletonPlaceholder>
                       <View style={{ flexDirection: "row" }}>
                            <View style={[styles.loading, { flexDirection: "column", minHeight: 200, minWidth: width * 0.475, maxWidth: width * 0.30 }]}>
                            
                            </View>   
                            <View style={[styles.loading, { flexDirection: "column", minHeight: 200, minWidth: width * 0.475, maxWidth: width * 0.30 }]}>
                                
                            </View> 
                       </View>  
                    </SkeletonPlaceholder>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <SkeletonPlaceholder>
                       <View style={{ flexDirection: "row" }}>
                            <View style={[styles.loading, { flexDirection: "column", minHeight: 200, minWidth: width * 0.475, maxWidth: width * 0.30 }]}>
                            
                            </View>   
                            <View style={[styles.loading, { flexDirection: "column", minHeight: 200, minWidth: width * 0.475, maxWidth: width * 0.30 }]}>
                                
                            </View> 
                       </View>  
                    </SkeletonPlaceholder>
                </View>
                </Fragment>
            );
        }
    }
    render() {
        const { users } = this.state;

        console.log("this.state people list state", this.state);
        return (
        <View style={Platform.OS === "android" ? styles.containerAndroid : styles.container}>
            <Header style={Platform.OS === "android" ? { backgroundColor: "#303030" } : { }}>
                <Left>
                    <Button onPress={() => {
                        this.props.props.navigation.goBack();
                    }} transparent>
                        <Image source={require("../../../assets/icons/go-back.png")} style={[styles.headerIcon, { tintColor: "#fdd530" }]} />
                    </Button>
                </Left>
                <Body>
                    <Title style={Platform.OS === "android" ? { color: "#fdd530" } : {}}>Browse People</Title>
                    <Subtitle style={Platform.OS === "android" ? { color: "#fdd530" } : {}}>Browse people & more...</Subtitle>
                </Body>
                <Right />
            </Header>
            <SearchBar
                ref="searchBar"
                placeholder="Search for people's names..."
                onChangeText={(searchValue) => {
                    this.setState({
                        searchValue
                    })
                }}
                barTintColor={"white"}
                textFieldBackgroundColor={"#f0f0f0"}
                onSearchButtonPress={this.handleSearch}
                onCancelButtonPress={this.handleCancellation}
            />
            {/* <ScrollView contentContainerStyle={styles.containerStyle} style={styles.list}> */}
                <FlatList
                    data={users}
                    keyExtractor={(item) => item._id}
                    onEndReachedThreshold={0.01}
                    onEndReached={info => {
                        this.loadMoreResults(info);
                    }}
                    numColumns={2}
                    renderItem={({ item, index }) => {
                        let fullName = item.firstName + ' ' + item.lastName;
                            
                        if (fullName.toLowerCase().includes(this.state.searchValue.toLowerCase())) {
                            return (
                                <View key={index} style={styles.card}>
                                    <TouchableOpacity onPress={() => {}} style={styles.ion}>
                                        <Image style={styles.iconSpecial} source={require("../../../assets/icons/blueheart.png")}/>
                                    </TouchableOpacity>
                                    <ImageBackground source={this.renderCoverPhoto(item)} style={styles.cardHeader}>
                                        <View style={styles.centered}>
                                            {this.renderImageOrVideo(item)}
                                        </View>
                                    </ImageBackground>
                                    <View style={styles.cardFooter}>
                                    <View style={{alignItems:"center", justifyContent:"center"}}>
                                        <Text style={styles.name}>{item.firstName} {item.lastName}</Text>
                                        <Text style={styles.position}>{item.position}</Text>
                                        <TouchableOpacity style={styles.followButton} onPress={()=> {
                                            this.handleClick(item);
                                        }}>
                                        <Text style={styles.followButtonText}>View Profile</Text>  
                                        </TouchableOpacity>
                                    </View>
                                    </View>
                                </View>
                            )
                        }
                    }}
                />
                {this.renderLoadingContent()}
            {/* </ScrollView> */}
        </View>
        );
    }
}
export default PeopleBrowseListHelper;