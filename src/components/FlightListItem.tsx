import React from 'react'
import {View,Text,Pressable,Image,StyleSheet} from 'react-native'
import { FONTS } from '../constants/fonts'
import { AIR_INDIA, JET_AIR } from '../constants/images'
import { FlightSuggestion } from '../models/SuggestionResponseModel'
import { getTimeString } from '../utils/AppUtils'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { DISCOUNT_TEXT } from '../constants/strings'
import { COLORS } from '../constants/colors'
import { AIRLINE_CODE } from '../constants/appConstants'

interface FlightListItemProps{
    item: FlightSuggestion,
    setSelectedItem: (id:string) => {},
    selectedItem: string
}

const FlightListItem = (props:FlightListItemProps):JSX.Element => {
    const {item,setSelectedItem,selectedItem} = props
    return (
        <Pressable onPress={() => {setSelectedItem(item?.id)}} style={[styles.root,selectedItem === item?.id ? {borderColor:COLORS.GREEN,borderWidth:2}:null]}>
            <View style={styles.headerContainer}>
                <View style={styles.headerLeft}>
                    {item?.displayData?.airlines[0]?.airlineCode === AIRLINE_CODE.CD ? <Image resizeMode='contain' source={AIR_INDIA} style={styles.headerImage} /> : <Image resizeMode='contain' source={JET_AIR} style={styles.headerImage} />}
                    <Text style={styles.headerLeftTxt}>{item?.displayData?.airlines[0]?.airlineName}</Text>
                </View>
                <View style={styles.headerLeft}>
                    <Icon name="flight-takeoff" color={COLORS.GREEN} size={15} />
                    <Text style={styles.headerRightTxt}>{item?.displayData?.airlines[0]?.flightNumber}</Text>
                </View>
            </View>
            <View style={styles.centerContainer}>
                <View style={styles.middleLeftContainer}>
                    <View>
                        <Text style={styles.timeTxt}>{getTimeString(item?.displayData?.source?.depTime)}</Text>
                        <Text style={styles.placeText}>{item?.displayData?.source?.airport?.cityName}</Text>
                    </View>

                    <View style={styles.centerAlignedView}>
                        <Text style={styles.durationTxt}>{item?.displayData?.totalDuration}</Text>
                        <View style={styles.horizontalLine} />
                        <Text style={styles.stopInfoTxt}>{item?.displayData?.stopInfo}</Text>
                    </View>

                    <View>
                        <Text style={styles.timeTxt}>{getTimeString(item?.displayData?.destination?.arrTime)}</Text>
                        <Text style={styles.placeText}>{item?.displayData?.destination?.airport?.cityName}</Text>
                    </View>

                </View>
                <View style={styles.fareView}>
                    <Text style={styles.fareTxt}>{"₹"}{item?.fare}</Text>
                </View>

            </View>
            <View style={styles.offerContainer}>
                <View style={styles.circle} />
                <Text style={styles.discountTxt}>{DISCOUNT_TEXT}</Text>
            </View>

        </Pressable>
    )
}

export default FlightListItem

const styles = StyleSheet.create({
    root:{
        padding: 5, 
        paddingVertical: 10, 
        marginTop: 8, 
        backgroundColor: COLORS.CREAM, 
        borderRadius: 6,
        elevation:0.8
    },
    headerContainer:{
        width: '100%', 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        paddingHorizontal: 5
    },
    headerLeft:{
        flexDirection: 'row', 
        alignItems: 'center'
    },
    headerImage:{
        height: 35, 
        width: 50
    },
    headerLeftTxt:{
        fontSize: 10, 
        marginLeft: 5, 
        fontFamily: FONTS.FONT_METROPOLIS_600, 
        color: COLORS.BLACK
    },
    headerRightTxt:{
        fontSize: 8, 
        marginLeft: 5, 
        fontFamily: FONTS.FONT_METROPOLIS_500
    },
    centerContainer:{
        width: '100%', 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        paddingHorizontal: 10
    },
    middleLeftContainer:{
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        flex: 1
    },
    timeTxt:{
        fontSize: 14, 
        fontFamily: FONTS.FONT_METROPOLIS_SANS_BOLD, 
        color: COLORS.BLACK
    },
    placeText:{
        fontSize: 10, 
        marginTop: 4, 
        fontFamily: FONTS.FONT_METROPOLIS_500, 
        color: COLORS.BLACK
    },
    centerAlignedView:{
        alignItems: 'center', 
        justifyContent: 'center'
    },
    durationTxt:{
        fontSize: 12, 
        fontFamily: FONTS.FONT_METROPOLIS_400, 
        color: COLORS.BLACK
    },
    horizontalLine:{
        height: 1, 
        width: "100%", 
        backgroundColor: COLORS.GREEN,
        marginTop: 2
    },
    stopInfoTxt:{
        fontSize: 10, 
        marginTop: 2, 
        fontFamily: FONTS.FONT_METROPOLIS_500
    },
    fareView:{
        flex: 0.7, 
        alignItems: 'center', 
        justifyContent: 'flex-end', 
        flexDirection: 'row'
    },
    fareTxt:{
        fontSize: 12, 
        marginLeft: 5, 
        fontFamily: FONTS.FONT_METROPOLIS_600, 
        color: COLORS.BLACK
    },
    offerContainer:{
        alignItems: 'center', 
        marginHorizontal: 10, 
        flexDirection: 'row', 
        backgroundColor: COLORS.LIGHT_ORANGE, 
        padding: 4, 
        borderRadius: 4, 
        marginTop: 10
    },
    circle:{
        height: 4, 
        width: 4, 
        borderRadius: 2, 
        backgroundColor: COLORS.ORANGE_2
    },
    discountTxt:{
        fontSize: 8, 
        marginLeft: 5, 
        fontFamily: FONTS.FONT_METROPOLIS_500
    }
})