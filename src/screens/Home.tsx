
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard,KeyboardAvoidingView,Platform } from 'react-native'
import { DISCLAIMER_TXT, REQUEST_FAILURE_TXT, REQUEST_SUCCESS_TXT } from '../constants/strings';
import Button from '../components/Button';
import { submitRequest } from '../network/Api';
import { BTN_TITLES, SUBMIT_REQ_URL } from '../constants/appConstants';
import OfferView from '../components/OfferView';
import DepartureDetailsView from '../components/DepartureDetailsView';
import { NavigationRoutes } from '../constants/navigationRoutes';
import { COLORS } from '../constants/colors';
import { useHeaderHeight } from '@react-navigation/elements'
import { FONTS } from '../constants/fonts';



const Home = ({ navigation }): JSX.Element => {

    const [btnTitle, setBtnTitle] = useState<string>(BTN_TITLES.SEARCH_FLIGHTS)
    const [detailsFilled,setDetailsFilled] = useState<boolean>(false)
    const height = useHeaderHeight()

    const handleBookNowPress = () => {
        setBtnTitle(BTN_TITLES.SUBMIT_REQUEST)
    }

    const onBtnPress = async () => {
        if (btnTitle === BTN_TITLES.SUBMIT_REQUEST) {
            const resp = await submitRequest(SUBMIT_REQ_URL)
            if (resp?.tripId) {
                alert(REQUEST_SUCCESS_TXT + resp?.tripId)
                setBtnTitle(BTN_TITLES.SEARCH_FLIGHTS)
            } else {
                alert(REQUEST_FAILURE_TXT)
            }

        } else {
            navigation.navigate(NavigationRoutes.SELECT_FLIGHTS, { onPressBookNow: handleBookNowPress })
        }

    }

    return (

        <KeyboardAvoidingView  behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex:1}}>
            <View style = {styles.root}>
            <OfferView />
            <View style ={styles.disclaimerView}>
            {!detailsFilled && <Text style={styles.disclaimer}>{DISCLAIMER_TXT}</Text>}
            </View>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <>
                <DepartureDetailsView onDetailsFilled={t => setDetailsFilled(t)} showNote={btnTitle === BTN_TITLES.SUBMIT_REQUEST} />
                {!!detailsFilled && <Button onPress={onBtnPress} gradientArray={[COLORS.PURPLE, COLORS.PINK, COLORS.ORANGE]} btnText={btnTitle} style={styles.btn} />}</>
            </TouchableWithoutFeedback>
            </View>
        </KeyboardAvoidingView>

    )
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: 10
    },
    btn:{
        marginTop: 30, 
        width: '100%'
    },
    disclaimer:{
        fontSize: 13, 
        marginLeft: 5, 
        fontFamily: FONTS.FONT_METROPOLIS_400, 
        color: COLORS.BLACK
    },
    disclaimerView:{
        width:'100%',
        justifyContent:'center',
        marginTop:15
    }
});

export default Home;
