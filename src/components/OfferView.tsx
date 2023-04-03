import React from 'react'
import LinearGradient from "react-native-linear-gradient"
import {Text,StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { FONTS } from '../constants/fonts'
import { OFFER_TEXT } from '../constants/strings'
import { COLORS } from '../constants/colors'

const OfferView = ():JSX.Element => {
    return (
        <LinearGradient
            colors={[COLORS.LIGHT_BLUE,COLORS.SKY_BLUE]}
            locations={[0, 0.9, 1]}
            useAngle={true}
            angle={90}
            style={styles.root}
        >
            <Icon name="gift-open" color={COLORS.GIFT_YELLOW} size={20} />
            <Text style={styles.offerText}>{OFFER_TEXT}</Text>
        </LinearGradient>
    )
}

export default React.memo(OfferView)

const styles  = StyleSheet.create({
    root:{
        padding: 10, 
        flexDirection: 'row', 
        alignItems: 'center', 
        borderRadius: 5, 
        width: '100%', 
        marginTop: 10
    },
    offerText:{
        fontSize: 11, 
        marginLeft: 5, 
        fontFamily: FONTS.FONT_METROPOLIS_400, 
        color: COLORS.BLACK
    }
})