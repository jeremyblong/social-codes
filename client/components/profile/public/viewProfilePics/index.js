import React, { Component, Fragment } from 'react';
import { 
  Text, 
  View, 
  FlatList, 
  Dimensions,
  TouchableOpacity,
  Image
} from 'react-native';
import styles from './styles.js';
import { Button, Footer, FooterTab, Badge } from 'native-base';
import SideMenu from "react-native-side-menu";
import Side from "../../../navigation/sidemenu/index.js";
import LottieView from 'lottie-react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import Config from 'react-native-config';
import Modal from 'react-native-modal';
import Gallery from 'react-native-image-gallery';
import Video from 'react-native-video';
import ProgressiveImage from "../../../lazyLoadImage.js";



const { width, height } = Dimensions.get("window"); 

class ViewProfilePicsHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        numColumns: 3,
        userSelected: {},
        selected: null,
        modalVisible: false,
        data: [],
        menuOpen: false,
        profilePics: [],
        gallery: [],
        initialPage: 0
    };
}
    componentDidMount() {
        axios.get(`${Config.ngrok_url}/gather/profile/pictures/all`, {
            params: {
                unique_id: this.props.unique_id
            }
        }).then((res) => {
            if (res.data.message === "Gathered profile pics!") {

                console.log(res.data);

                const { profilePics } = res.data;
                
                const galleryArray = [];

                for (let i = 0; i < profilePics.length; i++) {
                    const imgData = profilePics[i];
                    
                    galleryArray.push({
                        ...imgData,
                        source: { uri: `${Config.wasabi_url}/${imgData.picture}` }
                    });
                }

                this.setState({ 
                    data: profilePics,
                    gallery: galleryArray
                });
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    renderItem = ({item, index}) => {
        if (item.empty === true) {
            return <View style={[styles.item, styles.itemInvisible]} />;
        }
        const itemDimension = Dimensions.get('window').width / this.state.numColumns;
        return (
        <TouchableOpacity index={index} style={[styles.item, {height: itemDimension }]} onPress={() => {
            this.setState({
                modalVisible: true,
                selected: item,
                initialPage: index
            })
        }}>
            {item.type === "video" ? <Video  
                resizeMode="cover"
                repeat
                source={{ uri: `${Config.wasabi_url}/${item.picture}` }}
                autoplay={true}
                ref={(ref) => {
                    this.player = ref
                }}
                muted={true}
                style={{ height: itemDimension - 2, width: itemDimension - 2, minHeight: itemDimension - 2, minWidth: itemDimension - 2 }}
            /> : <ProgressiveImage style={{ height: itemDimension - 2, width: itemDimension - 2, minHeight: itemDimension - 2, minWidth: itemDimension - 2 }} source={{ uri: `${Config.wasabi_url}/${item.picture}` }}/>}
        </TouchableOpacity>
        );
    }
    
    formatRow = (data, numColumns) => {
        const numberOfFullRows = Math.floor(data.length / numColumns);
        let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
        while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
            data.push({ id: `blank-${numberOfElementsLastRow}`, empty: true });
            numberOfElementsLastRow++;
        }
        return data;
    }

    render() {
        const menu = <Side props={this.props} />;

        const { gallery } = this.state;

        console.log("This state cover photo state...:", this.state);
        return (
            <Fragment>
                <SideMenu openMenuOffset={width * 0.80} menuPosition={"right"} isOpen={this.state.menuOpen} menu={menu}>
                <Modal style={{ backgroundColor: "white", flex: 1, margin: 0 }} coverScreen={true} isVisible={this.state.modalVisible}>
                    <TouchableOpacity onPress={() => {
                        this.setState({
                            modalVisible: false
                        })
                    }} style={styles.exitContainer}>
                        <Image source={require("../../../../assets/icons/close.png")} style={{ tintColor: "white", maxWidth: 50, maxHeight: 50 }} />
                    </TouchableOpacity>
                    <View style={styles.topRightIcons}>
                        <View style={styles.row}>
                            <TouchableOpacity onPress={() => {}} style={styles.outterLayer}>
                                <Image source={require("../../../../assets/icons/update.png")} style={styles.icon} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {}} style={styles.outterLayer}>
                                <Image source={require("../../../../assets/icons/user-location.png")} style={styles.icon} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {}} style={styles.outterLayer}>
                                <Image source={require("../../../../assets/icons/menu-dots.png")} style={styles.icon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.centered}>
                        <Gallery 
                            initialPage={this.state.initialPage}
                            style={{ backgroundColor: 'black', minWidth: width, width, height: height, minHeight: height }}
                            images={gallery}
                        />
                    </View>
                </Modal>
                <TouchableOpacity onPress={() => {
                    this.setState({
                        menuOpen: !this.state.menuOpen
                    })
                }} style={styles.bottomRightCorner}>
                    <Image source={require("../../../../assets/icons/circle-menu.png")} style={styles.circleMenu} />
                </TouchableOpacity>
                    <Footer style={{ borderColor: "transparent" }}>
                        <FooterTab>
                            <Button button={true} onPress={() => {
                                this.props.props.navigation.push("homepage");
                            }}>
                                <Image source={require("../../../../assets/icons/home.png")} style={styles.maxedIconSmall} />
                            </Button>
                            <Button button={true} onPress={() => {
                                this.props.props.navigation.push("jobs-homepage");
                            }}>
                                <Image source={require("../../../../assets/icons/seeker.png")} style={styles.maxedIconSmall} />
                            </Button>
                            <Button>
                                <Image source={require("../../../../assets/icons/people.png")} style={styles.maxedIconSmall} />
                            </Button>
                            <Button>
                                <LottieView source={require('../../../../assets/icons/bell.json')} autoPlay loop />
                                <Badge style={styles.absoluteBadge}><Text style={{ color: "white", fontSize: 10 }}>51</Text></Badge>
                            </Button>
                            <Button onPress={() => {
                                this.props.props.navigation.push("navigation-menu-main");
                            }}>
                                <Image source={require("../../../../assets/icons/squared-menu.png")} style={styles.maxedIconSmall} />
                            </Button>
                        </FooterTab>
                    </Footer>
                    <View style={styles.container}>
                        <FlatList
                        data={this.formatRow(this.state.data, this.state.numColumns)}
                        keyExtractor= {(item) => {
                            return item.id;
                        }}
                        renderItem={this.renderItem}
                        numColumns={this.state.numColumns}/>

                       
                    </View>
                </SideMenu>
            </Fragment>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.signupData.authData.unique_id
    }
}
export default connect(mapStateToProps, {  })(ViewProfilePicsHelper);