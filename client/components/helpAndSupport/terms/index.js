import React, { Fragment } from 'react';
import { View, Text, Image } from "react-native";
import { Header, Left, Body, Right, Button, Icon, Title, Subtitle, List, ListItem, Footer, FooterTab, Badge } from 'native-base';
import styles from "./styles.js";


const TermsAndConditionsHelper = (props) => {
    return (
        <Fragment>
            <Header style={{ backgroundColor: "#303030" }}>
                <Left>
                    <Button onPress={() => {
                        props.props.navigation.goBack();
                    }} transparent>
                        <Icon style={{ color: "#ffffff" }} name='arrow-back' />
                    </Button>
                </Left>
                <Body>
                    <Title style={styles.whiteText}>Settings</Title>
                    <Subtitle style={styles.whiteText}>Terms & Conditions</Subtitle>
                </Body>
                <Right>
                    {/* <Button transparent>
                        <Icon style={{ color: "#ffffff" }} name='heart' />
                    </Button> */}
                </Right>
            </Header>
            <View style={styles.container}>
                <List>
                    <ListItem button={true} onPress={() => {
                        props.props.navigation.push("conditions-document");
                    }} icon>
                        <Left>
                        <Button style={{ backgroundColor: "#007AFF" }}>
                            <Icon active name="book" />
                        </Button>
                        </Left>
                        <Body>
                        <Text>Terms of Service</Text>
                        </Body>
                        <Right>
                        <Text>View</Text>
                        <Icon active name="arrow-forward" />
                        </Right>
                    </ListItem>
                    <ListItem button={true} onPress={() => {
                        props.props.navigation.push("privacy-policy");
                    }} icon>
                        <Left>
                        <Button style={{ backgroundColor: "blue" }}>
                            <Icon active name="key" />
                        </Button>
                        </Left>
                        <Body>
                        <Text>Privacy Policy</Text>
                        </Body>
                        <Right>
                        <Text>View</Text>
                        <Icon active name="arrow-forward" />
                        </Right>
                    </ListItem>
                    <ListItem button={true} onPress={() => {
                        props.props.navigation.push(null);
                    }} icon>
                        <Left>
                        <Button style={{ backgroundColor: "lightblue" }}>
                            <Icon active name="shield" />
                        </Button>
                        </Left>
                        <Body>
                        <Text>Community Standards</Text>
                        </Body>
                        <Right>
                        <Text>View</Text>
                        <Icon active name="arrow-forward" />
                        </Right>
                    </ListItem>
                </List>
            </View>
            <Footer style={{ borderColor: "transparent", backgroundColor: "#303030" }}>
                <FooterTab>
                    <Button style={styles.grayButton} onPress={() => {
                        props.props.navigation.push("homepage");
                    }}>
                        <Image source={require("../../../assets/icons/home.png")} style={styles.maxedIconSmall} />
                    </Button>
                    <Button style={styles.grayButton} button={true} onPress={() => {
                        props.props.navigation.push("jobs-homepage");
                    }}>
                        <Image source={require("../../../assets/icons/seeker.png")} style={styles.maxedIconSmall} />
                    </Button>
                    <Button style={styles.grayButton} button={true} onPress={() => {
                        props.props.navigation.push("people-list-all");
                    }}>
                        <Image source={require("../../../assets/icons/people.png")} style={styles.maxedIconSmall} />
                    </Button>
                    <Button style={styles.grayButton} button={true} onPress={() => {
                        props.props.navigation.push("notifications");
                    }}>
                        <Badge style={styles.absoluteBadge}><Text style={{ color: "white", fontSize: 10 }}>51</Text></Badge>
                        <Image source={require("../../../assets/icons/bell.png")} style={[styles.maxedIconSmall, { bottom: 7.5 }]} />
                        
                    </Button>
                </FooterTab>
            </Footer>
        </Fragment>
    )
}

export default TermsAndConditionsHelper;
