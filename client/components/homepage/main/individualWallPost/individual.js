import React, { Component, Fragment } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { Header, Left, Body, Right, Button, Icon, Title, Text as NativeText, Subtitle , Thumbnail } from 'native-base';
import Config from 'react-native-config';
import styles from './styles.js';
import _ from 'lodash';
import LottieView from 'lottie-react-native';
import RBSheet from "react-native-raw-bottom-sheet";
import SheetInnerOptions from "./helpers/RBsheetOptions.js";
import Video from 'react-native-video';


const { height, width } = Dimensions.get("window");

class IndividualWallPostingHelper extends Component {
constructor(props) {
    super(props);

    this.state = {

    };
}
    redirectToUsersProfileWithoutPane = () => {
        const passedPost = this.props.props.route.params.post;

        if (_.has(passedPost, "newData")) {
            this.props.props.navigation.push("individual-profile-public", { item: { unique_id: passedPost.newData.poster }});
        } else {
            this.props.props.navigation.push("individual-profile-public", { item: { unique_id: passedPost.poster }});
        }
    }
    componentDidMount() {
        
    }
    renderPhotoOrVideo = (post) => {
        if (post.profilePics !== null && typeof post.profilePics !== 'undefined' && post.profilePics.length > 0) {
            if (post.profilePics[post.profilePics.length - 1].type === "video") {
                const picture = post.profilePics[post.profilePics.length - 1].picture;
                return (
                    <Button onPress={this.redirectToUsersProfileWithoutPane} transparent>
                        <Video  
                            resizeMode="cover"
                            repeat
                            source={{ uri: `${Config.wasabi_url}/${picture}` }}   // Can be a URL or a local file.
                            autoplay={true}
                            ref={(ref) => {
                                this.player = ref
                            }}
                            muted={true}
                            style={styles.profilePicHeader}
                        />
                    </Button>
                );
            } else {
                const picture = post.profilePics[post.profilePics.length - 1].picture;
                return (
                    <Button onPress={this.redirectToUsersProfileWithoutPane} transparent>
                        <Image source={{ uri: `${Config.wasabi_url}/${picture}` }} style={styles.profilePicHeader} />
                    </Button>
                );
            }
        } else if (post.photo !== null && typeof post.photo !== "undefined") {
            return (
                <Button onPress={this.redirectToUsersProfileWithoutPane} transparent>
                    <Image source={{ uri: post.photo }} style={styles.profilePicHeader} />
                </Button>
            );
        } else {
            return (
                <Button onPress={this.redirectToUsersProfileWithoutPane} transparent>
                    <Image source={{ uri: Config.no_image_avaliable }} style={styles.profilePicHeader} />
                </Button>
            );
        }
    }
    render() {
        console.log("IndividualWallPostingHelper", this.props.props);

        const passedPost = this.props.props.route.params.post;
        return (
            <Fragment>
                <Header style={styles.header}>
                    <Left style={{ flexDirection: "row" }}>
                        <Button onPress={() => {
                            this.props.props.navigation.goBack();
                        }} transparent>
                            <Icon style={{ color: "black" }} name='arrow-back' />
                        </Button>
                        {this.renderPhotoOrVideo(_.has(passedPost, "newData") ? passedPost.newData : passedPost)}
                    </Left>
                    <Body style={Platform.OS === "android" ? { marginLeft: 60 } : {}}>
                        <Title style={{ color: "black" }}>{passedPost.firstName} {passedPost.lastName}</Title>
                        <Subtitle style={{ color: "black" }}>Posted by {passedPost.username}</Subtitle>
                    </Body>
                    <Right>
                        <Button onPress={() => {
                            this.RBSheet.open();
                        }} style={styles.animationContainerHeader} transparent>
                            <LottieView style={styles.maxedAnimationBoxHeader} source={require('../../../../assets/animations/dots-loading-box.json')} autoPlay loop />
                        </Button>
                    </Right>
                </Header>
                <ScrollView contentContainerStyle={{ paddingBottom: 50 }} style={styles.container}>

                </ScrollView>
                <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    closeOnDragDown={true}
                    height={height * 0.75}
                    openDuration={250}
                    customStyles={{
                        container: {
                           borderTopRightRadius: 30,
                           borderTopLeftRadius: 30
                        },
                        draggableIcon: {
                            backgroundColor: "grey",
                            width: 250
                        }
                    }}
                    >
                    <SheetInnerOptions props={this.props.props} />
                </RBSheet>
            </Fragment>
        )
    }
}
export default IndividualWallPostingHelper;