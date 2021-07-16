import React, { Fragment } from 'react';
import JobHelperSubComponent from "../job.js";
import { Dimensions, View, Text } from "react-native";
import Carousel from 'react-native-snap-carousel';
import styles from './styles.js';

const { height, width } = Dimensions.get("window");



const PromoHelper = (props) => {
    console.log("props", props);
    const _renderItem = ({item, index}) => {
        return (
            <Fragment>
                <JobHelperSubComponent manage={false} props={props} item={item} />
            </Fragment>
        );
    }
    return (
        <View style={{ flex: 0 }}>
                <View style={[styles.margin10, { marginBottom: 20 }]}>
                    <Text style={styles.headerText}>View our promoted and premier job postings - check back throughout the days as we have newly posted jobs every hour!</Text>
                    <Text style={styles.subText}>These are paid promotions and each listed was "boosted". These boosts are daily boosts so check back daily for new gigs...</Text>
                </View> 
                {typeof props.activeJobs !== "undefined" && props.activeJobs.length > 0 && props.loaded === true ? <Carousel
                    data={props.activeJobs}
                    renderItem={_renderItem}
                    containerCustomStyle={{
                        flexGrow: 0,
                    }}
                    containerStyle={{ paddingVertical: 0 }}
                    sliderWidth={width}
                    itemWidth={width * 0.90}
                /> : null}
                <View style={[styles.margin10, { marginBottom: 20, maxHeight: 250 }]}>
                    <Text style={styles.headerText}>Check out more jobs by FairWage client's and filter your results for more accurate postings!</Text>
                    <Text style={styles.subText}>Use the filters to navigate our posted jobs and find the "right" fit for you. Some jobs may have restrictions as to who can apply so use the filter and find your "perfect" gig.</Text>
                </View> 
        </View>
    );
}
export default PromoHelper;