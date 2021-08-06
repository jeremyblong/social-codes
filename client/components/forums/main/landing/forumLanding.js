import React, { Component, Fragment } from 'react'
import { View, Text, Image } from 'react-native';
import { Header, Left, Body, Right, Title, Subtitle, Button } from 'native-base';
import styles from './styles.js';
import HomepageAllPostsHelper from "./helpers/allPosts.js";
import LottieView from 'lottie-react-native';

class ForumLandingHomepageConditionalHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        finished: false
    }
}
    renderMainContent = () => {
        const { finished } = this.state;

        if (finished === false) {
            return <HomepageAllPostsHelper props={this.props.props} />
        } else {

        }
    }
    render() {
        return (
            <Fragment>
                <Header style={{ backgroundColor: "#303030" }}>
                    <Left>
                        <Button transparent onPress={() => {
                            this.props.props.navigation.goBack();
                        }}>
                            <Image source={require("../../../../assets/icons/go-back.png")} style={[styles.headerIcon, { tintColor: "#ffffff" }]} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: "#ffffff" }}>Forum(s)</Title>
                        <Subtitle style={{ color: "#ffffff" }}>Forums Homepage & more...</Subtitle>
                    </Body>
                    <Right>
                        <Button transparent style={{ flexDirection: 'row-reverse' }} onPress={() => {
                            this.props.props.navigation.navigate("forums-create-post-initial-page");
                        }}>
                            <Image source={require("../../../../assets/icons/plus.png")} style={[styles.headerIcon, { tintColor: "#ffffff" }]} />
                        </Button>
                    </Right>
                </Header>
                <View style={styles.container}>
                    {this.renderMainContent()}
                </View>
            </Fragment>
        )
    }
}
export default ForumLandingHomepageConditionalHelper;