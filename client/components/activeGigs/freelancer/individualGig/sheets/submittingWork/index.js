import React, { Fragment, useState, useEffect } from 'react';
import styles from './styles.js';
import { Dimensions, View, Text, Platform, Image, TouchableOpacity, ScrollView } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { Header, Left, Body, Right, Button, Icon, Title, Text as NativeText, Subtitle, List, ListItem, Thumbnail } from 'native-base';
import AwesomeButtonCartman from 'react-native-really-awesome-button/src/themes/cartman';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from "rn-fetch-blob";
import Modal from 'react-native-modal';
import uuid from "react-native-uuid";
import Video from 'react-native-video';
import FileViewer from 'react-native-file-viewer';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import Config from 'react-native-config';
import { connect } from 'react-redux';
import * as Progress from 'react-native-progress';
import { saveFilesPane } from "../../../../../../actions/work/index.js";
import Spinner from 'react-native-loading-spinner-overlay';

const { width, height } = Dimensions.get("window");

const SubmitWorkRefPane = ({ submitWorkRef, unique_id, passedData, fullName, saveFilesPane }) => {
    const [ uploaded, setUploaded ] = useState([]);
    const [ isVisible, setVisiblity ] = useState(false);
    const [ selected, setSelected ] = useState(null);
    const [ videoModal, setVisiblityVideo ] = useState(false); 
    const [ fileViewerModal, setFileViewerModal ] = useState(false); 
    const [ progress, setProgress ] = useState(0);
    const [ spinner, setSpinner ] = useState(false);

    const handleSubmissionFilesFinal = () => {
        console.log("handleSubmissionFilesFinal clicked...");

        setSpinner(true);

        const formData = new FormData();

        formData.append("id", unique_id);
        formData.append("otherUser", passedData.with);
        formData.append("jobID", passedData.jobID); 
        formData.append("activeHiredID", passedData.id);
        formData.append("fullName", fullName);

        const config = {
            onUploadProgress: (progressEvent) => {
              let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
              console.log(percentCompleted);

              setProgress(percentCompleted);
            },
            headers: { "Content-Type": "multipart/form-data" }
        }

        for (let index = 0; index < uploaded.length; index++) {
            const file = uploaded[index];
            
            formData.append("files", { uri: file.link, name: file.name, type: file.type });

            if ((uploaded.length - 1) === index) {
                axios.post(`${Config.ngrok_url}/post/files/upload/client`, formData, config).then((res) => {
                    if (res.data.message === "Uploaded Files!") {
                        console.log(res.data);

                        const { files } = res.data;
                        
                        saveFilesPane(files);
                        setUploaded([]);

                        setSpinner(false);

                        Toast.show({
                            text1: "Successfully uploaded content!",
                            text2: "Successfully uploaded content/data, your information is now public to the client!",
                            type: "success",
                            visibilityTime: 4500,
                            position: "top"
                        })

                        setTimeout(() => {
                            submitWorkRef.current.close();
                        }, 2500)
                    } else {
                        console.log("Err", res.data);

                        setSpinner(false);
                    }
                }).catch((err) => {
                    console.log(err.message);

                    setSpinner(false);
                })       
            }
        }
    }

    const findFilesAndSelect = async () => {
        try {
            const results = await DocumentPicker.pickMultiple({
                type: [DocumentPicker.types.allFiles]
            });
            for (const res of results) {

                const { uri, type, name, size } = res;

                console.log(res);
    
                let imagePath = null;

                if (Platform.OS === "ios") {
                    if (type === "image/png" || type === "image/jpg" || type === "image/jpeg") {
                        setUploaded(prevArray => [...prevArray, {
                            link: uri,
                            type,
                            name,
                            size,
                            id: uuid.v4(),
                            video: false
                        }]);
                    } else if (type === "video/mp4") {
                        setUploaded(prevArray => [...prevArray, {
                            link: uri,
                            type,
                            name,
                            size,
                            id: uuid.v4(),
                            video: true
                        }]);
                    }
                } else {
                    if (type === "image/png" || type === "image/jpg" || type === "image/jpeg") {
                        setUploaded(prevArray => [...prevArray, {
                            link: uri,
                            type,
                            name,
                            size,
                            id: uuid.v4(),
                            video: false
                        }]);
                    } else if (type === "video/mp4") {
                        setUploaded(prevArray => [...prevArray, {
                            link: uri,
                            type,
                            name,
                            size,
                            id: uuid.v4(),
                            video: true
                        }]);
                    } else if (type === "application/pdf") {

                        setUploaded(prevArray => [...prevArray, {
                            link: uri,
                            type,
                            name,
                            size,
                            id: uuid.v4(),
                            video: false
                        }]);
                    } else if (type === "application/msword") {

                        // const base64File = await RNFS.readFile(uri, "base64");

                        setUploaded(prevArray => [...prevArray, {
                            link: uri,
                            type,
                            name,
                            size,
                            id: uuid.v4(),
                            video: false
                        }]);
                    }
                }
            }
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
                console.log(err);

                Toast.show({
                    text1: 'Cancelled the picker!',
                    text2: "You have cancelled the picker selection...",
                    type: "info",
                    visibilityTime: 4500,
                    position: "top"
                });
            } else {
                console.log("err", err);

                Toast.show({
                    text1: "Critical error has occurred while picking documents...",
                    text2: "Critical error has occurred.",
                    type: "error",
                    visibilityTime: 4500,
                    position: "top"
                });
                throw err;
            }
        }
    }
    useEffect(() => {
        setUploaded([]);
    }, []);
    console.log("passed:", passedData);
    console.log("uploaded", uploaded);
    return (
        <Fragment>
            <Spinner
                visible={spinner}
                textContent={`Uploading your content, ${progress.toFixed(0)}% complete...`}
                overlayColor={"rgba(0, 0, 0, 0.75)"}
                textStyle={{ color: "white" }}
            />
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
                <Toast ref={(ref) => Toast.setRef(ref)} />
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
                    <Progress.Bar fillStyle={"#ffd530"} progress={progress} width={width} />
                    {selected !== null ? <Modal isVisible={isVisible}>
                        <View style={styles.modal}>
                            <View style={styles.margin}>
                                <Image source={{ uri: selected.link }} style={{ width: "100%", height: "100%", minWidth: "100%", minHeight: "100%"}} />
                            </View>
                        </View>
                        <AwesomeButtonCartman type={"anchor"} textColor={"white"} onPress={() => {
                            setVisiblity(false);
                        }} stretch={true}>Close Preview</AwesomeButtonCartman>
                    </Modal> : null}
                    {selected !== null ? <Modal isVisible={videoModal}>
                        <View style={styles.modal}>
                            <View style={styles.margin}>
                                <Video source={{ uri: selected.link }}
                                    ref={(ref) => {
                                        
                                    }}
                                    loop
                                    autoPlay
                                    style={styles.modalVideoPicture} 
                                />
                            </View>
                        </View>
                        <AwesomeButtonCartman type={"anchor"} textColor={"white"} onPress={() => {
                            setVisiblityVideo(false);
                        }} stretch={true}>Close Preview</AwesomeButtonCartman>
                    </Modal> : null}
                    <ScrollView contentContainerStyle={{ paddingBottom: 150 }} >
                    <View style={styles.margin}>
                        {typeof uploaded !== "undefined" && uploaded.length > 0 ? <AwesomeButtonCartman style={{ marginTop: 15, marginBottom: 15 }} backgroundColor={"#ffd530"} type={"anchor"} textColor={"black"} onPress={() => {
                            handleSubmissionFilesFinal();
                        }} stretch={true}>Submit Selected File(s)</AwesomeButtonCartman> : <AwesomeButtonCartman style={{ marginTop: 15, marginBottom: 15 }} type={"disabled"} textColor={"white"} stretch={true}>Submit Selected File(s)</AwesomeButtonCartman>}
                        <Text style={styles.mainText}>Submit your work only AFTER confirming the client has deposited funds. Submit appropriate amounts of work or if paid in full, complete and send over the files or code in whole. <Text style={{ color: "darkred" }}>Only select LOCAL files as other files (cloud) will close the program... </Text></Text>
                        <AwesomeButtonCartman style={{ marginTop: 15 }} type={"anchor"} textColor={"white"} onPress={findFilesAndSelect} stretch={true}>Select File(s)</AwesomeButtonCartman>
                        
                            <List>
                                {uploaded.map((upload, index) => {
                                    return (
                                        <Fragment key={index}>
                                            <ListItem style={{ maxHeight: 65 }}>
                                                <Left>
                                                    <TouchableOpacity onPress={() => {
                                                        setUploaded(uploaded.filter((item) => {
                                                            if (item.id !== upload.id) {
                                                                return item;
                                                            }
                                                        }))
                                                    }}>
                                                        <Thumbnail style={{ maxWidth: 30, maxHeight: 30, marginRight: 20 }} source={require("../../../../../../assets/icons/close.png")} />
                                                    </TouchableOpacity>
                                                    <Text style={{ marginTop: 10 }}>{upload.name}</Text>
                                                </Left>
                                                <Right>
                                                    <TouchableOpacity onPress={() => {
                                                        if (upload.type === "image/png" || upload.type === "image/jpg" || upload.type === "image/jpeg") {
                                                            setSelected(upload);
                                                        
                                                            setTimeout(() => {
                                                                setVisiblity(true);
                                                            }, 500);
                                                        } else if (upload.type === "video/mp4") {
                                                            setSelected(upload);

                                                            setTimeout(() => {
                                                                setVisiblityVideo(true);
                                                            }, 500);
                                                        } else if (upload.type === "application/pdf") {
                                                            FileViewer.open(upload.link)
                                                            .then(() => {
                                                                // success
                                                            })
                                                            .catch(error => {
                                                                // error
                                                                Toast.show({
                                                                    text1: 'Critical error while trying to open pdf...',
                                                                    text2: 'Please try this action again or choose a *local* file.',
                                                                    type: "error",
                                                                    visibilityTime: 4500,
                                                                    position: "top"
                                                                });
                                                            });
                                                        } else if (upload.type === "application/msword") {
                                                            FileViewer.open(upload.link)
                                                            .then(() => {
                                                                // success
                                                            })
                                                            .catch(error => {
                                                                // error
                                                                Toast.show({
                                                                    text1: 'Critical error while trying to open word doc...',
                                                                    text2: 'Please try this action again or choose a *local* file.',
                                                                    type: "error",
                                                                    visibilityTime: 4500,
                                                                    position: "top"
                                                                });

                                                            });
                                                        }
                                                    }}>
                                                        <Icon style={{ minWidth: 40, minHeight: 40, marginTop: 20 }} name="arrow-forward" />
                                                    </TouchableOpacity>
                                                    
                                                </Right>
                                            </ListItem>
                                        </Fragment>
                                    );
                                })}
                            </List>
                    </View>
                    </ScrollView>
                </View>
            </RBSheet>
        </Fragment>
    );
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.signupData.authData.unique_id,
        fullName: state.signupData.authData.firstName + " " + state.signupData.authData.lastName
    }
}
export default connect(mapStateToProps, { saveFilesPane })(SubmitWorkRefPane);