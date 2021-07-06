import React, { Component, Fragment } from 'react'
import { View, Text, Image } from 'react-native';
import { Button, ListItem, Text as NativeText, Icon, Left, Body, Right, List } from 'native-base';
import styles from './styles.js';

const SheetInnerOptions = (props) => {
    return (
        <Fragment>
           <List>
                <ListItem thumbnail>
                    <Left>
                        <Button transparent>
                            <Image source={require("../../../../../assets/icons/pin.png")} style={styles.icon} />
                        </Button>
                    </Left>
                    <Body>
                        <NativeText>Save post</NativeText>
                        <NativeText note>Add this post to your saved posts</NativeText>
                    </Body>
                </ListItem>
                <ListItem thumbnail>
                    <Left>
                        <Button transparent>
                            <Image source={require("../../../../../assets/icons/star.png")} style={styles.icon} />
                        </Button>
                    </Left>
                    <Body>
                        <NativeText>Add (user) to Favorites</NativeText>
                        <NativeText note>See posts from (user) first in your News Feed</NativeText>
                    </Body>
                </ListItem>
                <ListItem thumbnail>
                    <Left>
                        <Button transparent>
                            <Image source={require("../../../../../assets/icons/hide-large.png")} style={styles.icon} />
                        </Button>
                    </Left>
                    <Body>
                        <NativeText>Hide post</NativeText>
                        <NativeText note>See fewer posts like this...</NativeText>
                    </Body>
                </ListItem>
                <ListItem thumbnail>
                    <Left>
                        <Button transparent>
                            <Image source={require("../../../../../assets/icons/snooze.png")} style={styles.icon} />
                        </Button>
                    </Left>
                    <Body>
                        <NativeText>Snooze (user) for 30 days</NativeText>
                        <NativeText numberOfLines={2} note>Unfollow this user for 30 days, temporarily stop seeing posts from them</NativeText>
                    </Body>
                </ListItem>
                <ListItem thumbnail>
                    <Left>
                        <Button transparent>
                            <Image source={require("../../../../../assets/icons/hide-all.png")} style={styles.icon} />
                        </Button>
                    </Left>
                    <Body>
                        <NativeText>Hide all from this user - (user's name)</NativeText>
                        <NativeText note>Stop seeing posts from this user</NativeText>
                    </Body>
                </ListItem>
                <ListItem thumbnail>
                    <Left>
                        <Button transparent>
                            <Image source={require("../../../../../assets/icons/hint.png")} style={styles.icon} />
                        </Button>
                    </Left>
                    <Body>
                        <NativeText>Find support or report post</NativeText>
                        <NativeText note>I'm genuinely concerned about this post...</NativeText>
                    </Body>
                </ListItem>
           </List>
        </Fragment>
    );
}
export default SheetInnerOptions;