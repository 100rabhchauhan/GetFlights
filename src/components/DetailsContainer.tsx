import React,{useState} from 'react';
import {View,Text,StyleSheet, ViewStyle,TextInput} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { FONTS } from '../constants/fonts'
import { FROM, TO } from '../constants/strings'

interface DetailContainerProps {
    icon:string,
    headingText: string,
    airportName?: string,
    style?: ViewStyle,
    onChange: (text:string) => void
}

const DetailsContainer = (props:DetailContainerProps):JSX.Element => {

    const {icon,headingText,airportName,style,onChange} = props
    const [placeName,setPlaceName] = useState<string>("")
    
    return(
        <View style={[styles.root,style]}>
        <Icon name={icon} color="grey" size={25} />
        <View style={styles.placeView}>
            {!!placeName && <Text style={styles.txtFrom}>{headingText}</Text>}
            <TextInput multiline={true} placeholder={headingText} onChangeText={text => {
                onChange(text)
                setPlaceName(text)
            }} value={placeName} style={styles.txtPlace}/>
            {airportName && !!placeName  ? <Text style={styles.txtAirport}>{airportName}</Text> : null}
        </View>
    </View>
    )
}

export default DetailsContainer

const styles = StyleSheet.create({
    root:{
        flexDirection: 'row', 
        borderColor: "#D3D3D3", 
        borderWidth: 1, 
        alignItems: 'center', 
        backgroundColor: '#E5E4E2', 
        width: '100%', 
        borderRadius: 5, 
        padding: 8 
    },
    placeView:{
        justifyContent: 'center', 
        marginLeft: 10,
        width:'100%'
    },
    txtFrom:{
        fontSize: 10, 
        fontFamily: FONTS.FONT_METROPOLIS_600
    },
    txtPlace:{
        fontSize: 14, 
        fontFamily: FONTS.FONT_METROPOLIS_700,
        color:'black',
        width:'90%'
    },
    txtAirport:{
        fontSize: 10, 
        fontFamily: FONTS.FONT_METROPOLIS_500
    }
})