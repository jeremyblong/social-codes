import React, { useState, Fragment } from 'react'
import { View, Text, Image, FlatList, Keyboard, Dimensions } from 'react-native';
import styles from './styles.js';
import SearchBar from 'react-native-search-bar';
import axios from 'axios';
import { connect, useDispatch } from 'react-redux';
import Config from 'react-native-config';
import { List, ListItem, Left, Body, Right, Thumbnail, Text as NativeText, Button, Header, Subtitle, Title } from 'native-base';
import RBSheet from "react-native-raw-bottom-sheet";
import { addPostCreationOptions } from "../../../../../actions/wall/wall.js";

const { width, height } = Dimensions.get("window");


const ShareLocationSlideUpPaneHelper = ({ CheckinRBSheet, userCurrentLocation }) => { 
    const [ results, setResults] = useState([]);
    const [ searchValue, setSearchValue ] = useState("");
    
    const dispatch = useDispatch();

    const handleSearch = () => {
        console.log("handle search clicked");

        const { latitude, longitude } = userCurrentLocation;

        // axios.get(`https://api.tomtom.com/search/2/nearbySearch/${this.state.searchValue}.JSON?key=6HvPX5DCMcnnPomyWgJOkTnbhSoCoGWX&countrySet=USA&limit=25&lat=${latitude}&lon=${longitude}&radius=300`).then((res) => {
        //     console.log("MAGIC:", res.data);

        //     const { results } = res.data;

        //     this.setState({
        //         results
        //     })
        // }).catch((err) => {
        //     console.log(err);
        // })

        axios.get(`https://api.tomtom.com/search/2/poiSearch/${searchValue}.JSON?key=6HvPX5DCMcnnPomyWgJOkTnbhSoCoGWX&countrySet=USA&limit=25&lat=${latitude}&lon=${longitude}`).then((res) => {
            console.log("MAGIC:", res.data);

            const { results } = res.data;

            setResults(results);
        }).catch((err) => {
            console.log(err);
        })
    }
    const handleSelection = (selection) => {
        console.log("selection:", selection);

        dispatch(addPostCreationOptions({
            selection
        }));

        CheckinRBSheet.current.close();
    } 
    const _renderItem = ({ item, index }) => {
        console.log("item", item);

        switch (item.poi.classifications[0].code) {
            case "MARKET":
                return (
                    <ListItem button={true} onPress={() => {
                        handleSelection(item);
                    }} avatar>
                        <Left>
                            <Button style={styles.customIconButton} onPress={() => {}}>
                                <Thumbnail style={styles.listIcon} source={require("../../../../../assets/icons/shop.png")} />
                            </Button>
                        </Left>
                        <Body>
                            <NativeText>{item.poi.name}</NativeText>
                            <NativeText note>{item.address.freeformAddress}</NativeText>
                        </Body>
                        <Right>
                            <NativeText note>{item.address.localName}, {item.address.countrySubdivision}</NativeText>
                        </Right>
                    </ListItem>
                );
                break;
            case "SHOP":
                return (
                    <ListItem button={true} onPress={() => {
                        handleSelection(item);
                    }} avatar>
                        <Left>
                            <Button style={styles.customIconButton} onPress={() => {}}>
                                <Thumbnail style={styles.listIcon} source={require("../../../../../assets/icons/shop.png")} />
                            </Button>
                        </Left>
                        <Body>
                            <NativeText>{item.poi.name}</NativeText>
                            <NativeText note>{item.address.freeformAddress}</NativeText>
                        </Body>
                        <Right>
                            <NativeText note>{item.address.localName}, {item.address.countrySubdivision}</NativeText>
                        </Right>
                    </ListItem>
                );
                break;
            case "RESTAURANT":
            case "RESTAURANT_AREA":
                return (
                    <ListItem button={true} onPress={() => {
                        handleSelection(item);
                    }} avatar>
                        <Left>
                            <Button style={styles.customIconButton} onPress={() => {}}>
                                <Thumbnail style={styles.listIcon} source={require("../../../../../assets/icons/resturant.png")} />
                            </Button>
                        </Left>
                        <Body>
                            <NativeText>{item.poi.name}</NativeText>
                            <NativeText note>{item.address.freeformAddress}</NativeText>
                        </Body>
                        <Right>
                            <NativeText note>{item.address.localName}, {item.address.countrySubdivision}</NativeText>
                        </Right>
                    </ListItem>
                );
                break;
            case "REST_AREA":
                return (
                    <ListItem button={true} onPress={() => {
                        handleSelection(item);
                    }} avatar>
                        <Left>
                            <Button style={styles.customIconButton} onPress={() => {}}>
                                <Thumbnail style={styles.listIcon} source={require("../../../../../assets/icons/car-pin.png")} />
                            </Button>
                        </Left>
                        <Body>
                            <NativeText>{item.poi.name}</NativeText>
                            <NativeText note>{item.address.freeformAddress}</NativeText>
                        </Body>
                        <Right>
                            <NativeText note>{item.address.localName}, {item.address.countrySubdivision}</NativeText>
                        </Right>
                    </ListItem>
                );
                break;
            case "PUBLIC_TRANSPORT_STOP":
            case "PUBLIC_AMENITY":
                return (
                    <ListItem button={true} onPress={() => {
                        handleSelection(item);
                    }} avatar>
                        <Left>
                            <Button style={styles.customIconButton} onPress={() => {}}>
                                <Thumbnail style={styles.listIcon} source={require("../../../../../assets/icons/public-transport.png")} />
                            </Button>
                        </Left>
                        <Body>
                            <NativeText>{item.poi.name}</NativeText>
                            <NativeText note>{item.address.freeformAddress}</NativeText>
                        </Body>
                        <Right>
                            <NativeText note>{item.address.localName}, {item.address.countrySubdivision}</NativeText>
                        </Right>
                    </ListItem>
                );
                break;
            case "RAILWAY_STATION": 
                return (
                    <ListItem button={true} onPress={() => {
                        handleSelection(item);
                    }} avatar>
                        <Left>
                            <Button style={styles.customIconButton} onPress={() => {}}>
                                <Thumbnail style={styles.listIcon} source={require("../../../../../assets/icons/railroad.png")} />
                            </Button>
                        </Left>
                        <Body>
                            <NativeText>{item.poi.name}</NativeText>
                            <NativeText note>{item.address.freeformAddress}</NativeText>
                        </Body>
                        <Right>
                            <NativeText note>{item.address.localName}, {item.address.countrySubdivision}</NativeText>
                        </Right>
                    </ListItem>
                );
            break;
            case "SCHOOL":
                return (
                    <ListItem button={true} onPress={() => {
                        handleSelection(item);
                    }} avatar>
                        <Left>
                            <Button style={styles.customIconButton} onPress={() => {}}>
                                <Thumbnail style={styles.listIcon} source={require("../../../../../assets/icons/school.png")} />
                            </Button>
                        </Left>
                        <Body>
                            <NativeText>{item.poi.name}</NativeText>
                            <NativeText note>{item.address.freeformAddress}</NativeText>
                        </Body>
                        <Right>
                            <NativeText note>{item.address.localName}, {item.address.countrySubdivision}</NativeText>
                        </Right>
                    </ListItem>
                );
                break;
            case "POLICE_STATION": 
                return (
                    <ListItem button={true} onPress={() => {
                        handleSelection(item);
                    }} avatar>
                        <Left>
                            <Button style={styles.customIconButton} onPress={() => {}}>
                                <Thumbnail style={styles.listIcon} source={require("../../../../../assets/icons/police.png")} />
                            </Button>
                        </Left>
                        <Body>
                            <NativeText>{item.poi.name}</NativeText>
                            <NativeText note>{item.address.freeformAddress}</NativeText>
                        </Body>
                        <Right>
                            <NativeText note>{item.address.localName}, {item.address.countrySubdivision}</NativeText>
                        </Right>
                    </ListItem>
                );
            break;
            case "PLACE_OF_WORSHIP": 
                return (
                    <ListItem button={true} onPress={() => {
                        handleSelection(item);
                    }} avatar>
                        <Left>
                            <Button style={styles.customIconButton} onPress={() => {}}>
                                <Thumbnail style={styles.listIcon} source={require("../../../../../assets/icons/church.png")} />
                            </Button>
                        </Left>
                        <Body>
                            <NativeText>{item.poi.name}</NativeText>
                            <NativeText note>{item.address.freeformAddress}</NativeText>
                        </Body>
                        <Right>
                            <NativeText note>{item.address.localName}, {item.address.countrySubdivision}</NativeText>
                        </Right>
                    </ListItem>
                );
            break;
            case "PHARMACY": 
                return (
                    <ListItem button={true} onPress={() => {
                        handleSelection(item);
                    }} avatar>
                        <Left>
                            <Button style={styles.customIconButton} onPress={() => {}}>
                                <Thumbnail style={styles.listIcon} source={require("../../../../../assets/icons/rx.png")} />
                            </Button>
                        </Left>
                        <Body>
                            <NativeText>{item.poi.name}</NativeText>
                            <NativeText note>{item.address.freeformAddress}</NativeText>
                        </Body>
                        <Right>
                            <NativeText note>{item.address.localName}, {item.address.countrySubdivision}</NativeText>
                        </Right>
                    </ListItem>
                );
            break;
            case "PARKING_GARAGE": 
            case "OPEN_PARKING_AREA":
                return (
                    <ListItem button={true} onPress={() => {
                        handleSelection(item);
                    }} avatar>
                        <Left>
                            <Button style={styles.customIconButton} onPress={() => {}}>
                                <Thumbnail style={styles.listIcon} source={require("../../../../../assets/icons/parking-garage.png")} />
                            </Button>
                        </Left>
                        <Body>
                            <NativeText>{item.poi.name}</NativeText>
                            <NativeText note>{item.address.freeformAddress}</NativeText>
                        </Body>
                        <Right>
                            <NativeText note>{item.address.localName}, {item.address.countrySubdivision}</NativeText>
                        </Right>
                    </ListItem>
                );
            break;
            case "NIGHTLIFE": 
                return (
                    <ListItem button={true} onPress={() => {
                        handleSelection(item);
                    }} avatar>
                        <Left>
                            <Button style={styles.customIconButton} onPress={() => {}}>
                                <Thumbnail style={styles.listIcon} source={require("../../../../../assets/icons/nightlife.png")} />
                            </Button>
                        </Left>
                        <Body>
                            <NativeText>{item.poi.name}</NativeText>
                            <NativeText note>{item.address.freeformAddress}</NativeText>
                        </Body>
                        <Right>
                            <NativeText note>{item.address.localName}, {item.address.countrySubdivision}</NativeText>
                        </Right>
                    </ListItem>
                );
            break;
            case "IMPORTANT_TOURIST_ATTRACTION": 
                return (
                    <ListItem button={true} onPress={() => {
                        handleSelection(item);
                    }} avatar>
                        <Left>
                            <Button style={styles.customIconButton} onPress={() => {}}>
                                <Thumbnail style={styles.listIcon} source={require("../../../../../assets/icons/tourist.png")} />
                            </Button>
                        </Left>
                        <Body>
                            <NativeText>{item.poi.name}</NativeText>
                            <NativeText note>{item.address.freeformAddress}</NativeText>
                        </Body>
                        <Right>
                            <NativeText note>{item.address.localName}, {item.address.countrySubdivision}</NativeText>
                        </Right>
                    </ListItem>
                );
            break;
            case "HOTEL_MOTEL": 
                return (
                    <ListItem button={true} onPress={() => {
                        handleSelection(item);
                    }} avatar>
                        <Left>
                            <Button style={styles.customIconButton} onPress={() => {}}>
                                <Thumbnail style={styles.listIcon} source={require("../../../../../assets/icons/hotel.png")} />
                            </Button>
                        </Left>
                        <Body>
                            <NativeText>{item.poi.name}</NativeText>
                            <NativeText note>{item.address.freeformAddress}</NativeText>
                        </Body>
                        <Right>
                            <NativeText note>{item.address.localName}, {item.address.countrySubdivision}</NativeText>
                        </Right>
                    </ListItem>
                );
            break;
            case "GOVERNMENT_OFFICE": 
            case "COURTHOUSE":
                return (
                    <ListItem button={true} onPress={() => {
                        handleSelection(item);
                    }} avatar>
                        <Left>
                            <Button style={styles.customIconButton} onPress={() => {}}>
                                <Thumbnail style={styles.listIcon} source={require("../../../../../assets/icons/government.png")} />
                            </Button>
                        </Left>
                        <Body>
                            <NativeText>{item.poi.name}</NativeText>
                            <NativeText note>{item.address.freeformAddress}</NativeText>
                        </Body>
                        <Right>
                            <NativeText note>{item.address.localName}, {item.address.countrySubdivision}</NativeText>
                        </Right>
                    </ListItem>
                );
            break;
            case "GEOGRAPHIC_FEATURE": 
                return (
                    <ListItem button={true} onPress={() => {
                        handleSelection(item);
                    }} avatar>
                        <Left>
                            <Button style={styles.customIconButton} onPress={() => {}}>
                                <Thumbnail style={styles.listIcon} source={require("../../../../../assets/icons/geographic.png")} />
                            </Button>
                        </Left>
                        <Body>
                            <NativeText>{item.poi.name}</NativeText>
                            <NativeText note>{item.address.freeformAddress}</NativeText>
                        </Body>
                        <Right>
                            <NativeText note>{item.address.localName}, {item.address.countrySubdivision}</NativeText>
                        </Right>
                    </ListItem>
                );
            break;
            case "ENTERTAINMENT": 
                return (
                    <ListItem button={true} onPress={() => {
                        handleSelection(item);
                    }} avatar>
                        <Left>
                            <Button style={styles.customIconButton} onPress={() => {}}>
                                <Thumbnail style={styles.listIcon} source={require("../../../../../assets/icons/entertainment.png")} />
                            </Button>
                        </Left>
                        <Body>
                            <NativeText>{item.poi.name}</NativeText>
                            <NativeText note>{item.address.freeformAddress}</NativeText>
                        </Body>
                        <Right>
                            <NativeText note>{item.address.localName}, {item.address.countrySubdivision}</NativeText>
                        </Right>
                    </ListItem>
                );
            break;
            case "DOCTOR": 
                return (
                    <ListItem button={true} onPress={() => {
                        handleSelection(item);
                    }} avatar>
                        <Left>
                            <Button style={styles.customIconButton} onPress={() => {}}>
                                <Thumbnail style={styles.listIcon} source={require("../../../../../assets/icons/entertainment.png")} />
                            </Button>
                        </Left>
                        <Body>
                            <NativeText>{item.poi.name}</NativeText>
                            <NativeText note>{item.address.freeformAddress}</NativeText>
                        </Body>
                        <Right>
                            <NativeText note>{item.address.localName}, {item.address.countrySubdivision}</NativeText>
                        </Right>
                    </ListItem>
                );
            break;
            case "DEPARTMENT_STORE": 
                return (
                    <ListItem button={true} onPress={() => {
                        handleSelection(item);
                    }} avatar>
                        <Left>
                            <Button style={styles.customIconButton} onPress={() => {}}>
                                <Thumbnail style={styles.listIcon} source={require("../../../../../assets/icons/department.png")} />
                            </Button>
                        </Left>
                        <Body>
                            <NativeText>{item.poi.name}</NativeText>
                            <NativeText note>{item.address.freeformAddress}</NativeText>
                        </Body>
                        <Right>
                            <NativeText note>{item.address.localName}, {item.address.countrySubdivision}</NativeText>
                        </Right>
                    </ListItem>
                );
            break;
            case "COMPANY": 
                return (
                    <ListItem button={true} onPress={() => {
                        handleSelection(item);
                    }} avatar>
                        <Left>
                            <Button style={styles.customIconButton} onPress={() => {}}>
                                <Thumbnail style={styles.listIcon} source={require("../../../../../assets/icons/company.png")} />
                            </Button>
                        </Left>
                        <Body>
                            <NativeText>{item.poi.name}</NativeText>
                            <NativeText note>{item.address.freeformAddress}</NativeText>
                        </Body>
                        <Right>
                            <NativeText note>{item.address.localName}, {item.address.countrySubdivision}</NativeText>
                        </Right>
                    </ListItem>
                );
                break;
            case "COLLEGE_UNIVERSITY": 
                return (
                    <ListItem button={true} onPress={() => {
                        handleSelection(item);
                    }} avatar>
                        <Left>
                            <Button style={styles.customIconButton} onPress={() => {}}>
                                <Thumbnail style={styles.listIcon} source={require("../../../../../assets/icons/college.png")} />
                            </Button>
                        </Left>
                        <Body>
                            <NativeText>{item.poi.name}</NativeText>
                            <NativeText note>{item.address.freeformAddress}</NativeText>
                        </Body>
                        <Right>
                            <NativeText note>{item.address.localName}, {item.address.countrySubdivision}</NativeText>
                        </Right>
                    </ListItem>
                );
                break;
            case "CAMPING_GROUND": 
                return (
                    <ListItem button={true} onPress={() => {
                        handleSelection(item);
                    }} avatar>
                        <Left>
                            <Button style={styles.customIconButton} onPress={() => {}}>
                                <Thumbnail style={styles.listIcon} source={require("../../../../../assets/icons/camping.png")} />
                            </Button>
                        </Left>
                        <Body>
                            <NativeText>{item.poi.name}</NativeText>
                            <NativeText note>{item.address.freeformAddress}</NativeText>
                        </Body>
                        <Right>
                            <NativeText note>{item.address.localName}, {item.address.countrySubdivision}</NativeText>
                        </Right>
                    </ListItem>
                );
                break;
            case "BANK": 
                return (
                    <ListItem button={true} onPress={() => {
                        handleSelection(item);
                    }} avatar>
                        <Left>
                            <Button style={styles.customIconButton} onPress={() => {}}>
                                <Thumbnail style={styles.listIcon} source={require("../../../../../assets/icons/bank-02.png")} />
                            </Button>
                        </Left>
                        <Body>
                            <NativeText>{item.poi.name}</NativeText>
                            <NativeText note>{item.address.freeformAddress}</NativeText>
                        </Body>
                        <Right>
                            <NativeText note>{item.address.localName}, {item.address.countrySubdivision}</NativeText>
                        </Right>
                    </ListItem>
                );
                break;
            case "AUTOMOTIVE_DEALER": 
                return (
                    <ListItem button={true} onPress={() => {
                        handleSelection(item);
                    }} avatar>
                        <Left>
                            <Button style={styles.customIconButton} onPress={() => {}}>
                                <Thumbnail style={styles.listIcon} source={require("../../../../../assets/icons/car-dealership.png")} />
                            </Button>
                        </Left>
                        <Body>
                            <NativeText>{item.poi.name}</NativeText>
                            <NativeText note>{item.address.freeformAddress}</NativeText>
                        </Body>
                        <Right>
                            <NativeText note>{item.address.localName}, {item.address.countrySubdivision}</NativeText>
                        </Right>
                    </ListItem>
                );
                break;
            case "AIRPORT": 
                return (
                    <ListItem button={true} onPress={() => {
                        handleSelection(item);
                    }} avatar>
                        <Left>
                            <Button style={styles.customIconButton} onPress={() => {}}>
                                <Thumbnail style={styles.listIcon} source={require("../../../../../assets/icons/airport.png")} />
                            </Button>
                        </Left>
                        <Body>
                            <NativeText>{item.poi.name}</NativeText>
                            <NativeText note>{item.address.freeformAddress}</NativeText>
                        </Body>
                        <Right>
                            <NativeText note>{item.address.localName}, {item.address.countrySubdivision}</NativeText>
                        </Right>
                    </ListItem>
                );
                break;
            case "ADMINISTRATIVE_DIVISION": 
                return (
                    <ListItem button={true} onPress={() => {
                        handleSelection(item);
                    }} avatar>
                        <Left>
                            <Button style={styles.customIconButton} onPress={() => {}}>
                                <Thumbnail style={styles.listIcon} source={require("../../../../../assets/icons/admin.png")} />
                            </Button>
                        </Left>
                        <Body>
                            <NativeText>{item.poi.name}</NativeText>
                            <NativeText note>{item.address.freeformAddress}</NativeText>
                        </Body>
                        <Right>
                            <NativeText note>{item.address.localName}, {item.address.countrySubdivision}</NativeText>
                        </Right>
                    </ListItem>
                );
                break;
            case "CASH_DISPENSER": 
                return (
                    <ListItem button={true} onPress={() => {
                        handleSelection(item);
                    }} avatar>
                        <Left>
                            <Button style={styles.customIconButton} onPress={() => {}}>
                                <Thumbnail style={styles.listIcon} source={require("../../../../../assets/icons/cash-2.png")} />
                            </Button>
                        </Left>
                        <Body>
                            <NativeText>{item.poi.name}</NativeText>
                            <NativeText note>{item.address.freeformAddress}</NativeText>
                        </Body>
                        <Right>
                            <NativeText note>{item.address.localName}, {item.address.countrySubdivision}</NativeText>
                        </Right>
                    </ListItem>
                );
                break;
            case "MILITARY_INSTALLATION": 
                return (
                    <ListItem button={true} onPress={() => {
                        handleSelection(item);
                    }} avatar>
                        <Left>
                            <Button style={styles.customIconButton} onPress={() => {}}>
                                <Thumbnail style={styles.listIcon} source={require("../../../../../assets/icons/military.png")} />
                            </Button>
                        </Left>
                        <Body>
                            <NativeText>{item.poi.name}</NativeText>
                            <NativeText note>{item.address.freeformAddress}</NativeText>
                        </Body>
                        <Right>
                            <NativeText note>{item.address.localName}, {item.address.countrySubdivision}</NativeText>
                        </Right>
                    </ListItem>
                );
            default:
                return (
                    <ListItem button={true} onPress={() => {
                        handleSelection(item);
                    }} avatar>
                        <Left>
                            <Button style={styles.customIconButton} onPress={() => {}}>
                                <Thumbnail style={styles.listIcon} source={require("../../../../../assets/icons/location-nomatch.png")} />
                            </Button>
                        </Left>
                        <Body>
                            <NativeText>{item.poi.name}</NativeText>
                            <NativeText note>{item.address.freeformAddress}</NativeText>
                        </Body>
                        <Right>
                            <NativeText note>{item.address.localName}, {item.address.countrySubdivision}</NativeText>
                        </Right>
                    </ListItem>
                );
                break;
        }
    }
    const handleFinalSearch = () => {
        console.log("handleFinalSearch");
    }
    return (
        <View style={styles.container}>
        <RBSheet
            ref={CheckinRBSheet}
            height={height * 0.95}
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
            <Header style={{ backgroundColor: "#303030" }}>
                <Left>
                    <Button onPress={() => {
                        CheckinRBSheet.current.close();
                    }} transparent>
                        <Image source={require("../../../../../assets/icons/x.png")} style={styles.checkinIconExit} />
                    </Button>
                </Left>
                <Body>
                    <Title style={styles.goldText}>Check-in</Title>
                    <Subtitle style={styles.goldText}>Share a location!</Subtitle>
                </Body>
                <Right>
                    {/* <Button onPress={() => {
                        CheckinRBSheet.current.close();

                        setTimeout(() => {
                            this.RBSheet.close();
                        }, 500);

                        setTimeout(() => {
                            this.props.props.navigation.push("public-profile-main");
                        }, 1250);
                    }} transparent>
                        <Image source={require("../../../../../assets/icons/acc.png")} style={styles.checkinIcon} />
                    </Button> */}
                </Right>
            </Header>
            <SearchBar
                placeholder="Search for businesses..."
                onChangeText={(value) => {
                    setSearchValue(value);

                    handleSearch();
                }}
                onSearchButtonPress={handleFinalSearch}
                onCancelButtonPress={() => {
                    setSearchValue("");

                    Keyboard.dismiss();
                }}
                textColor={"#303030"}
            />
            <List style={{ flex: 1 }}>
                <FlatList
                    data={results}
                    keyExtractor={(item) => item.id}
                    renderItem={_renderItem}
                />
            </List>
        </RBSheet>
        </View>
    )
}
const mapStateToProps = (state) => {
    return {
        userCurrentLocation: state.location.current_location_user
    }
}
export default connect(mapStateToProps, { addPostCreationOptions })(ShareLocationSlideUpPaneHelper);