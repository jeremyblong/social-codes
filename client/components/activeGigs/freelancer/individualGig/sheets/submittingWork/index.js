import React, { Fragment, useState, useEffect } from 'react';
import styles from './styles.js';
import { Dimensions, View, Text, Platform, Image } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { Header, Left, Body, Right, Button, Icon, Title, Text as NativeText, Subtitle, List, ListItem } from 'native-base';
import AwesomeButtonCartman from 'react-native-really-awesome-button/src/themes/cartman';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from "rn-fetch-blob";
import Modal from 'react-native-modal';

const { height } = Dimensions.get("window");

const SubmitWorkRefPane = ({ submitWorkRef }) => {
    const [ uploaded, setUploaded ] = useState([]);
    const [ isVisible, setVisiblity ] = useState(false);
    const [ selected, setSelected ] = useState(null);


    const findFilesAndSelect = async () => {
        try {
            const results = await DocumentPicker.pickMultiple({
                type: [DocumentPicker.types.allFiles]
            });
            for (const res of results) {

                const { uri, type, name, size } = res;
    
                let imagePath = null;

                if (Platform.OS === "ios") {
                    RNFetchBlob.config({
                        fileCache: true
                    }).fetch("GET", uri)
                    // the image is now downloaded to device's storage
                    .then(resp => {
                        // the image path you can use it directly with Image component
                        imagePath = resp.path();
                        return resp.readFile("base64");
                    })
                    .then((base64Data) => {
                        
                        setUploaded([...uploaded, base64Data]);
                    });
                } else {
                    RNFetchBlob.fs.readFile(uri, 'base64').then(base64Data => {
                        setUploaded(prevArray => [...prevArray, {
                            base64: base64Data,
                            type,
                            name,
                            size
                        }]);
                    }).catch(err => {
                        console.log(err);
                    });
                }
            }
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
                console.log(err);
            } else {
                console.log("err", err);
                throw err;
            }
        }
    }
    useEffect(() => {
        setUploaded([]);
    }, [])
    console.log("uploaded", uploaded);
    return (
        <Fragment>
            <RBSheet
                ref={submitWorkRef}
                height={height * 0.90}
                closeOnDragDown={true}
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
                <View style={styles.container}>
                    <Header style={{ backgroundColor: "white" }}>
                        <Left>
                            <Button onPress={() => {
                                submitWorkRef.current.close();
                            }} transparent>
                                <Icon style={{ color: "#303030" }} name='arrow-back' />
                                {Platform.OS === "ios" ? <NativeText>Back</NativeText> : null}
                            </Button>
                        </Left>
                        <Body>
                            <Title style={styles.greyText}>Work Submissions</Title>
                            <Subtitle style={styles.greyText}>Submit work & more!</Subtitle>
                        </Body>
                        <Right />
                    </Header>
                    {selected !== null ? <Modal isVisible={isVisible}>
                        <View style={styles.modal}>
                            <View style={styles.margin}>
                                <Image source={{ uri: `data:${selected.type};base64,${selected.base64}` }} style={{ width: "100%", height: "100%", minWidth: "100%", minHeight: "100%"}} />
                            </View>
                        </View>
                        <AwesomeButtonCartman type={"anchor"} textColor={"white"} onPress={() => {
                            setVisiblity(false);
                        }} stretch={true}>Close Preview</AwesomeButtonCartman>
                    </Modal> : null}
                    <View style={styles.margin}>
                        <Text style={styles.mainText}>Submit your work only AFTER confirming the client has deposited funds. Submit appropriate amounts of work or if paid in full, complete and send over the files or code in whole.</Text>
                        <AwesomeButtonCartman style={{ marginTop: 15 }} type={"anchor"} textColor={"white"} onPress={findFilesAndSelect} stretch={true}>Select File(s)</AwesomeButtonCartman>
                        <List>
                            {uploaded.map((upload, index) => {
                                return (
                                    <Fragment key={index}>
                                        <ListItem button={true} onPress={() => {
                                            if (upload.type === "image/png" || upload.type === "image/jpg" || upload.type === "image/jpeg") {
                                                setSelected(upload);
                                            
                                                setTimeout(() => {
                                                    setVisiblity(true);
                                                }, 500)
                                            }
                                        }}>
                                            <Left>
                                                <Text>{upload.name}</Text>
                                            </Left>
                                            <Right>
                                                <Icon name="arrow-forward" />
                                            </Right>
                                        </ListItem>
                                    </Fragment>
                                );
                            })}
                        </List>
                    </View>
                </View>
            </RBSheet>
        </Fragment>
    );
}
export default SubmitWorkRefPane;