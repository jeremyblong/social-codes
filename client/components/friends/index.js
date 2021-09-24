import React, { Fragment } from 'react'
import { View, Text, Image } from 'react-native';
import { Header, Left, Body, Right, Button, Title, Subtitle, List, ListItem, Icon } from 'native-base';
import styles from './styles.js';
import LottieView from 'lottie-react-native';


const FriendsListHomepageMenuHelper = (props) => {
    return (
        <Fragment>
            <Header style={styles.header}>
                <Left>
                    <Button onPress={() => {
                        props.props.navigation.goBack();
                    }} transparent>
                        <Image source={require("../../assets/icons/go-back.png")} style={[[styles.headerIcon, { tintColor: "#ffffff" }]]} />
                    </Button>
                </Left>
                <Body>
                    <Title style={styles.whiteText}>Friends Menu</Title>
                    <Subtitle style={styles.whiteText}>Navigate friend options</Subtitle>
                </Body>
                <Right />
            </Header>
            <View style={styles.container}>
                <List>
                    <ListItem style={styles.divider} itemDivider>
                    <Text>Manage</Text>
                    </ListItem>                    
                    <ListItem button={true} onPress={() => {
                        props.props.navigation.push("friends-pending");
                    }}>
                        <Left>
                            <Text>Manage pending requests</Text>
                        </Left>
                        <Right>
                            <Icon name="arrow-forward" />
                        </Right>
                    </ListItem>
                    <ListItem button={true} onPress={() => {
                        props.props.navigation.push("accepted-friends");
                    }}>
                        <Left>
                            <Text>View current friends (already accepted)</Text>
                        </Left>
                        <Right>
                            <Icon name="arrow-forward" />
                        </Right>
                    </ListItem>
                    <ListItem button={true} onPress={() => {
                        props.props.navigation.push("people-list-all");
                    }}>
                        <Left>
                            <Text>Add new friends</Text>
                        </Left>
                        <Right>
                            <Icon name="arrow-forward" />
                        </Right>
                    </ListItem>
                    <ListItem style={styles.divider} itemDivider>
                    <Text>Explore</Text>
                    </ListItem>  
                    <ListItem>
                        <Left>
                            <Text>Suggestions</Text>
                        </Left>
                        <Right>
                            <Icon name="arrow-forward" />
                        </Right>
                    </ListItem>
                    <ListItem>
                        <Left>
                            <Text>Find new friends</Text>
                        </Left>
                        <Right>
                            <Icon name="arrow-forward" />
                        </Right>
                    </ListItem>
                </List>
                {/* <View style={styles.centeredOutter}> */}
                    <View style={styles.centered}>
                        <LottieView style={styles.animation} source={require('../../assets/animations/friends.json')} autoPlay loop />
                    </View>
                {/* </View> */}
            </View>
        </Fragment>
    )
}
export default FriendsListHomepageMenuHelper;