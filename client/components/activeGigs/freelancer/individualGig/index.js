import React, { Component, Fragment } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { Header, Left, Body, Right, Title, Subtitle, Button, Text as NativeText } from 'native-base';
import styles from './styles.js';
import AwesomeButtonCartman from 'react-native-really-awesome-button/src/themes/cartman';
import SheetHelperPaymentsDisplayRef from "./sheets/payments.js";

class ViewJobActiveClientFreelancerHelper extends Component {
constructor(props) {
    super(props);

    this.state = {

    }
    this.paymentsRef = React.createRef(null);
}
    componentDidMount() {
        const passedData = this.props.props.route.params.item;
    }
    render() {
        console.log(this.props.props.route.params.item);

        const passedData = this.props.props.route.params.item;
        return (
            <Fragment>
                <Header style={{ backgroundColor: "#303030" }}>
                    <Left>
                        <Button onPress={() => {
                            this.props.props.navigation.goBack();
                        }} transparent>
                            <Image source={require("../../../../assets/icons/go-back.png")} style={styles.headerIcon} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={styles.goldText}>Manage</Title>
                        <Subtitle style={styles.goldText}>Manage your active gig</Subtitle>
                    </Body>
                    <Right />
                </Header>
                <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
                    <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>
                            Contract with {passedData.otherUserFirstName} {passedData.otherUserLastName}
                        </Text>
                    </View>

                    <View style={styles.postContent}>
                        <Text style={styles.postTitle}>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                        </Text>

                        <Text style={styles.postDescription}>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. 
                            Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. 
                            Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. 
                        </Text>

                        <Text style={styles.tags}>
                            Lorem, ipsum, dolor, sit, amet, consectetuer, adipiscing, elit. 
                        </Text>

                        <Text style={styles.date}>
                            2017-11-27 13:03:01
                        </Text>

                        <View style={styles.profile}>
                            {passedData.type === "picture" ? <Image style={styles.avatar}
                            source={{uri: passedData.photo }}/> : null}

                            <Text style={styles.name}>
                                {passedData.otherUserFirstName} {passedData.otherUserLastName} {"\n"}aka {passedData.otherUserUsername}
                            </Text>
                        </View>
                        <SheetHelperPaymentsDisplayRef payments={passedData.payments} props={this.props} paymentsRef={this.paymentsRef} />
                        <AwesomeButtonCartman style={{ marginTop: 20 }} type={"anchor"} textColor={"white"} onPress={() => {
                            this.paymentsRef.current.open();
                        }} stretch={true}>View payments from client</AwesomeButtonCartman>
                    </View>
                    </View>
                </ScrollView>
            </Fragment>
        )
    }
}

export default ViewJobActiveClientFreelancerHelper
