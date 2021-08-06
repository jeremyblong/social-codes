import React, { Fragment } from 'react';
import styles from './styles.js';
import { Dimensions, View, Text } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { List, ListItem, Left, Body, Right, Thumbnail, Text as NativeText } from 'native-base';
import AwesomeButtonCartman from 'react-native-really-awesome-button/src/themes/cartman';
import moment from 'moment';

const { width, height } = Dimensions.get("window");

const SheetHelperPaymentsDisplayRef = ({ paymentsRef, payments }) => {
    console.log(payments);
    return (
        <Fragment>
            <RBSheet
                ref={paymentsRef}
                height={height * 0.90}
                closeOnDragDown={true}
                openDuration={250}
                customStyles={{
                    container: {
                        borderTopLeftRadius: 40,
                        borderTopRightRadius: 40,
                        backgroundColor: "#303030"
                    },
                    draggableIcon: {
                        backgroundColor: "grey",
                        width: 250
                    }
                }}
                >
                <View style={styles.container}>
                    <View style={{ margin: 20 }}>
                        <AwesomeButtonCartman raiseLevel={3} borderColor={"#ffffff"} backgroundDarker={"#cccccc"} style={{ marginTop: 20 }} type={"anchor"} textColor={"white"} onPress={() => {
                            paymentsRef.current.close();
                        }} stretch={true}>Close/Exit</AwesomeButtonCartman>
                    </View>
                    <List style={styles.list}>
                        {payments.map((payment, index) => {
                            console.log(payment);
                            return (
                                <ListItem style={styles.listitem} key={index} avatar>
                                    <Left>
                                        <Thumbnail source={require("../../../../../../assets/icons/usdollar.png")} />
                                    </Left>
                                    <Body>
                                        <Text style={styles.whiteText}>Amount paid: <Text style={{ fontWeight: "bold", color: "#ffd530" }}>${(payment.amount / 100).toFixed(2)}</Text></Text>
                                        <Text style={styles.whiteText} note>Social Codes has taken an taxes and service fee of <Text style={{ fontWeight: "bold", color: "#ffd530" }}>${(payment.application_fee_amount / 100).toFixed(2)}</Text></Text>
                                    </Body>
                                    <Right>
                                        <Text style={styles.whiteText} note>{moment(payment.created * 1000).fromNow()}</Text>
                                    </Right>
                                </ListItem>
                            );
                        })}
                    </List>
                </View>
            </RBSheet>
        </Fragment>
    );
}
export default SheetHelperPaymentsDisplayRef;