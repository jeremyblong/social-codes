import React, { Fragment } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Header, Left, Right, Button, Body, Title, Text as NativeText, ListItem, List } from 'native-base';
import styles from './styles.js';

const PaymentCardAddNewHelper =  (props) => {
    return (
        <Fragment>
            <View style={styles.container}>
                <Header style={{ backgroundColor: "#303030" }}>
                    <Left style={{ flexDirection: "row" }}>
                        <Button onPress={() => {
                            props.props.navigation.push("payments-cards");
                        }} transparent>
                            <Image source={require("../../../../assets/icons/go-back.png")} style={[styles.headerIcon, { tintColor: "#ffffff" }]} />
                        </Button>
                        
                    </Left>
                    <Body><Title style={{ paddingTop: 5, color: "#ffffff" }}>New payment form</Title></Body>
                    <Right></Right>
                </Header>
                <List>
                    <ListItem button={true} onPress={() => {
                        props.props.navigation.navigate("create-payment");
                    }} style={styles.listItemCustom}>
                        <Left style={{ flexDirection: "row" }}>
                            
                            <Image source={require("../../../../assets/icons/payment-methods.png")} style={styles.specialIcon} />
                    
                            <Text style={{ padding: 8 }}>Credit or debit card</Text>
                        </Left>
                        <Body></Body>
                        <Right>
                            <Image source={require("../../../../assets/icons/forward.png")} style={styles.specialIcon} />
                        </Right>
                    </ListItem>
                    <ListItem button={true} onPress={() => {
                        props.props.navigation.navigate("create-payment-paypal");
                    }} style={styles.listItemCustom}>
                        <Left style={{ flexDirection: "row" }}>
                        
                            <Image source={require("../../../../assets/icons/paypal-colored.png")} style={styles.specialIcon} />
                            
                            <Text style={{ padding: 8 }}>Paypal</Text>
                        </Left>
                        <Body></Body>
                        <Right>
                            <Image source={require("../../../../assets/icons/forward.png")} style={styles.specialIcon} />
                        </Right>
                    </ListItem>
                </List>
            </View>
        </Fragment>
    );
}
export default PaymentCardAddNewHelper;