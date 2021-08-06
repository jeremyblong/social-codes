import React, { useState, Fragment, useEffect } from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Dimensions, Image, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Header, Left, Body, Button, Icon, Title, Subtitle, Form, Item, Label, Input } from 'native-base';
import styles from './styles.js';
import AwesomeButtonCartman from 'react-native-really-awesome-button/src/themes/cartman';
import { connect } from 'react-redux';
import ImageSlider from 'react-native-image-slider';

const { width, height } = Dimensions.get("window"); 

const SlideUpViewFilePane = ({ viewFileRef, work, indexxx }) => {
    console.log("work", work);

    const [ ready, setReady ] = useState(false);
    const [ imageArr, setImageArr ] = useState([]);
    const [ index, setIndex ] = useState(0);

    useEffect(() => {
        const newImageArr = [];

        setImageArr([]);

        setIndex(indexxx);

        if (typeof work !== 'undefined' && work.length > 0) {
            console.log("Ran...")
            for (let index = 0; index < work.length; index++) {
                const element = work[index];

                if (element.type !== "application/msword" && element.type !== "application/pdf" && element.type !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
                    setImageArr((previous) => [...previous, element.fullUri]);
                }   
            }

            setReady(true);
        } else {
            setReady(true);
        }
    }, [])
    console.log("imageArr: ", imageArr)
    return (
        <RBSheet
            ref={viewFileRef} 
            closeOnDragDown={true}
            height={height * 0.90}
            openDuration={250}
            customStyles={{
                container: {
                    borderTopLeftRadius: 40,
                    borderTopRightRadius: 40
                },
                draggableIcon: {
                    backgroundColor: "grey",
                    width: 250
                }
            }}
            > 
            {ready === true ? <Fragment>
                <View style={styles.containerOutter}>
                    <Header style={styles.header}>
                        <Left>
                            <Button onPress={() => {
                                viewFileRef.current.close();
                            }} transparent>
                                <Icon style={{ color: "black" }} name='arrow-back' />
                            </Button>
                        </Left>
                        <Body>
                            <Title style={styles.blackText}>Viewing Uploaded File(s)</Title>
                            <Subtitle style={styles.blackText}>Viewing Uploaded file(s)</Subtitle>
                        </Body>
                    </Header>
                </View>
                <ImageSlider  
                    onPositionChanged={(data) => {
                        console.log("changed...", data);
                    }}
                    position={index}
                    loopBothSides 
                    images={imageArr} 
                    style={{ height: "100%" }}
                    customSlide={({ index, item, style, width }) => (
                        // It's important to put style here because it's got offset inside
                        <View key={index} style={styles.container}>
                            <Image source={{ uri: item }} resizeMode={"cover"} style={styles.slideItem} />
                        </View>
                    )}
                    customButtons={(position, move) => (
                        <View style={styles.buttons}>
                            {imageArr.map((image, index) => {
                                return (
                                <TouchableOpacity
                                    key={index}
                                    underlayColor="#ccc"
                                    onPress={() => move(index)}
                                    style={styles.button}
                                >
                                    <Text style={{ paddingLeft: 20, paddingRight: 20 }}>
                                        {index + 1}
                                    </Text>
                                </TouchableOpacity>
                                );
                            })}
                        </View>
                    )}

                />
            </Fragment> : null}
        </RBSheet>
    );
};
const mapStateToProps = (state) => {
    return {
        unique_id: state.signupData.authData.unique_id
    }
}
export default connect(mapStateToProps, {  })(SlideUpViewFilePane);