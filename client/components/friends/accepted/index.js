import React, { Component, Fragment } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { Header, Left, Body, Right, Button, Title, Subtitle, } from 'native-base';
import styles from './styles.js';
import axios from "axios";
import Config from "react-native-config";
import { connect } from "react-redux";
import SearchBar from 'react-native-search-bar';
import _ from "lodash";
import Video from 'react-native-video';



class ViewAlreadyAcceptedFriendsHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        friends: [],
        searchValue: ""
    }
}

    componentDidMount() {
        const url = `${Config.ngrok_url}/gather/already/accepted/friends`;
        
        axios.get(url, {
            params: {
                id: this.props.unique_id
            }
        }).then((res) => {
            console.log(res.data);

            if (res.data.message === "Gathered accepted friends!") {
                console.log(res.data);

                const { friends } = res.data;

                this.setState({
                    friends
                })
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    renderImageOrVideo = (item) => {
        if (typeof item.profilePics !== "undefined" && item.profilePics !== null && item.profilePics.length > 0) {
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
    renderCoverPhoto = (item) => {
        if (typeof item.coverPhotos !== "undefined" && item.coverPhotos.length > 0) {
            return { uri: `${Config.wasabi_url}/${item.coverPhotos[item.coverPhotos.length - 1].picture}` };
        } else {
            return require("../../../assets/images/beach.jpg");
        }
    }
    render() {
        console.log("this.state friends accepted", this.state);

        const { friends } = this.state;
        return (
            <Fragment>
                <Header style={{ backgroundColor: "#303030" }}>
                    <Left>
                        <Button onPress={() => {
                            this.props.props.navigation.goBack();
                        }} transparent>
                            <Image source={require("../../../assets/icons/go-back.png")} style={styles.headerIcon} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={styles.whiteText}>Accepted Friends</Title>
                        <Subtitle style={styles.whiteText}>View your friends!</Subtitle>
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
                <ScrollView contentContainerStyle={styles.containerStyle} style={styles.list}>
                    {typeof friends !== "undefined" && friends.length > 0 ? friends.map((item, index) => {
                        console.log(item);
                        let fullName = item.firstName + ' ' + item.lastName;
                            
                        if (fullName.toLowerCase().includes(this.state.searchValue.toLowerCase())) {
                            return (
                                <TouchableOpacity key={index} style={styles.card} onPress={() => {
                                    this.handleClick(item);
                                }}>
                                    <Image style={styles.iconSpecial} source={{ uri: "https://img.icons8.com/flat_round/64/000000/hearts.png" }}/>
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
                                </TouchableOpacity>
                            )
                        }
                    }) : null}
                </ScrollView>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.signupData.authData.unique_id
    }
}
export default connect(mapStateToProps, {  })(ViewAlreadyAcceptedFriendsHelper);