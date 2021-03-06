import React, { Fragment, Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Header, Left, Right, Button, Title, Text as NativeText, Body, ListItem, List } from 'native-base';
import styles from './styles.js';
import axios from 'axios';
import { connect } from "react-redux";
import Config from "react-native-config";
import _ from "lodash";
import Dialog from "react-native-dialog";

class EditPaymentMethodsHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        cards: [],
        user: null,
        deleteModal: false,
        selected: null
    }
}
    componentDidMount() {
        axios.post(`${Config.ngrok_url}/gather/credit/debit/cards`, {
            id: this.props.unique_id
        }).then((res) => {
            if (res.data.message === "Gathered cards successfully!") {

                const { cards } = res.data;

                this.setState({ 
                    cards 
                });
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
        axios.post(`${Config.ngrok_url}/gather/user`, {
            unique_id: this.props.unique_id
        }).then((res) => {
            if (res.data.message === "Located the desired user!") {
                console.log("RES.data:", res.data);

                const { user } = res.data;

                this.setState({
                    user
                })
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    renderPaypalEmailAddress = () => {
        const { user } = this.state;

        if (_.has(user, "paypal_payment_address")) {
            return (
                <Fragment>
                    <ListItem onPress={() => {
                        this.setState({
                            deleteModal: true,
                            selected: user.paypal_payment_address
                        })
                    }} button={true} style={styles.listItem}>
                        <Left style={{ flexDirection: "row" }}>
                            <TouchableOpacity onPress={() => {}}>
                                <Image source={require("../../../../assets/icons/paypal-colored.png")} style={styles.paymentIcon} />
                            </TouchableOpacity>
                            <NativeText style={{ marginLeft: 20 }}>{user.paypal_payment_address}</NativeText>
                        </Left>
                    </ListItem>
                </Fragment>
            );
        }
    }
    handleDelete = () => {
        console.log("handleDelete");

        axios.post(`${Config.ngrok_url}/delete/paypal/account/email`, {
            id: this.props.unique_id,
            paypal_email: this.state.selected
        }).then((res) => {
            if (res.data.message === "Deleted paypal account!") {
                console.log(res.data);

                this.setState({
                    user: null
                })
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })

        this.setState({
            deleteModal: false
        })
    }
    render () { 
        const { cards } = this.state;
        return (
            <Fragment>
                <View style={styles.container}>
                    <Header style={{ backgroundColor: "#303030" }}>
                        <Left style={{ flexDirection: "row" }}>
                            <Button onPress={() => {
                                this.props.props.navigation.navigate("payments-main");
                            }} transparent>
                                <Image source={require("../../../../assets/icons/go-back.png")} style={[styles.headerIcon, { tintColor: "#ffffff" }]} />
                            </Button>
                            
                        </Left>
                        <Body><Title style={{ paddingTop: 5, color: "#ffffff" }}>Edit your payment methods</Title></Body>
                        <Right></Right>
                    </Header>
                    <List>
                    <ListItem button={true} onPress={() => {
                        this.props.props.navigation.navigate("add-payment-card");
                    }} style={styles.listItem}>
                        <Left>
                            <NativeText style={{ color: "darkblue" }}>Add payment method</NativeText>
                        </Left>
                    </ListItem>
                    
                    {typeof cards !== "undefined" && cards.length > 0 ? cards.map((card, index) => {
                        console.log(card);
                        if (card.type === "master-card") {
                            return (
                                <ListItem onPress={() => {
                                    this.props.props.navigation.push("view-individual-card-info", { card });
                                }} button={true} style={styles.listItem}>
                                    <Left style={{ flexDirection: "row" }}>
                                        <TouchableOpacity onPress={() => {}}>
                                            <Image source={require("../../../../assets/icons/mastercard.png")} style={styles.paymentIcon} />
                                        </TouchableOpacity>
                                        <NativeText style={{ marginLeft: 20 }}>Visa {card.last_four}</NativeText>
                                    </Left>
                                    <Right>
                                        {card.primary === true ? <Text style={styles.default}>Default</Text> : null}
                                    </Right>
                                </ListItem>
                            );
                        } else if (card.type === "visa") {
                            return (
                                <ListItem onPress={() => {
                                    this.props.props.navigation.push("view-individual-card-info", { card });
                                }} button={true} style={styles.listItem}>
                                    <Left style={{ flexDirection: "row" }}>
                                        <TouchableOpacity onPress={() => {}}>
                                            <Image source={require("../../../../assets/icons/visa.png")} style={styles.paymentIcon} />
                                        </TouchableOpacity>
                                        <NativeText style={{ marginLeft: 20 }}>Visa {card.last_four}</NativeText>
                                    </Left>
                                     <Right>
                                        {card.primary === true ? <Text style={styles.default}>Default</Text> : null}
                                    </Right>
                                </ListItem>
                            );
                        } else if (card.type === "discover") {
                            return (
                                <ListItem onPress={() => {
                                    this.props.props.navigation.push("view-individual-card-info", { card });
                                }} button={true} style={styles.listItem}>
                                    <Left style={{ flexDirection: "row" }}>
                                        <TouchableOpacity onPress={() => {}}>
                                            <Image source={require("../../../../assets/icons/discover.png")} style={styles.paymentIcon} />
                                        </TouchableOpacity>
                                        <NativeText style={{ marginLeft: 20 }}>Discover {card.last_four}</NativeText>
                                    </Left>
                                     <Right>
                                        {card.primary === true ? <Text style={styles.default}>Default</Text> : null}
                                    </Right>
                                </ListItem>
                            );
                        } else if (card.type === "american-express") {
                            return (
                                <ListItem onPress={() => {
                                    this.props.props.navigation.push("view-individual-card-info", { card });
                                }} button={true} style={styles.listItem}>
                                    <Left style={{ flexDirection: "row" }}>
                                        <TouchableOpacity onPress={() => {}}>
                                            <Image source={require("../../../../assets/icons/amex.png")} style={styles.paymentIcon} />
                                        </TouchableOpacity>
                                        <NativeText style={{ marginLeft: 20 }}>AE - Exp. {card.expiration}</NativeText>
                                    </Left>
                                     <Right>
                                        {card.primary === true ? <Text style={styles.default}>Default</Text> : null}
                                    </Right>
                                </ListItem>
                            );
                        } else if (card.type === "jcb") {
                            return (
                                <ListItem onPress={() => {
                                    this.props.props.navigation.push("view-individual-card-info", { card });
                                }} button={true} style={styles.listItem}>
                                    <Left style={{ flexDirection: "row" }}>
                                        <TouchableOpacity onPress={() => {}}>
                                            <Image source={require("../../../../assets/icons/jcb.png")} style={styles.paymentIcon} />
                                        </TouchableOpacity>
                                        <NativeText style={{ marginLeft: 20 }}>JCB - {card.last_four}</NativeText>
                                    </Left>
                                     <Right>
                                        {card.primary === true ? <Text style={styles.default}>Default</Text> : null}
                                    </Right>
                                </ListItem>
                            );
                        } else if (card.type === "diners-club") {
                            return (
                                <ListItem onPress={() => {
                                    this.props.props.navigation.push("view-individual-card-info", { card });
                                }} button={true} style={styles.listItem}>
                                    <Left style={{ flexDirection: "row" }}>
                                        <TouchableOpacity onPress={() => {}}>
                                            <Image source={require("../../../../assets/icons/dinners-club.png")} style={styles.paymentIcon} />
                                        </TouchableOpacity>
                                        <NativeText style={{ marginLeft: 20 }}>DC - Ex. {card.expiration}</NativeText>
                                    </Left>
                                     <Right>
                                        {card.primary === true ? <Text style={styles.default}>Default</Text> : null}
                                    </Right>
                                </ListItem>
                            );
                        } else {
                            return (
                                <ListItem onPress={() => {
                                    this.props.props.navigation.push("view-individual-card-info", { card });
                                }} button={true} style={styles.listItem}>
                                    <Left style={{ flexDirection: "row" }}>
                                        <TouchableOpacity onPress={() => {}}>
                                            <Image source={require("../../../../assets/icons/general-card.png")} style={styles.paymentIcon} />
                                        </TouchableOpacity>
                                        <NativeText style={{ marginLeft: 20 }}>General - {card.last_four}</NativeText>
                                    </Left>
                                     <Right>
                                        {card.primary === true ? <Text style={styles.default}>Default</Text> : null}
                                    </Right>
                                </ListItem>
                            );
                        }
                    }) : null}
                    </List>
                    {this.renderPaypalEmailAddress()}
                    <View>
                        <Dialog.Container visible={this.state.deleteModal}>
                        <Dialog.Title>Delete PayPal Email Address</Dialog.Title>
                        <Dialog.Description>
                            Do you want to delete this PayPal account? You cannot undo this action.
                        </Dialog.Description>
                        <Dialog.Button onPress={() => {
                            this.setState({
                                deleteModal: false
                            })
                        }} label="Cancel" />
                        <Dialog.Button onPress={this.handleDelete} label="Delete Card" />
                        </Dialog.Container>
                    </View>
                </View>
            </Fragment>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.signupData.authData.unique_id
    };
}
export default connect(mapStateToProps, {  })(EditPaymentMethodsHelper);