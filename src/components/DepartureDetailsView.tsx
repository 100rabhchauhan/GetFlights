import React,{useEffect,useState} from 'react'
import {View,StyleSheet} from 'react-native'
import { AIRPORT_BOM, AIRPORT_IGI, HEADING_TXT_DEP_DATE, HEADING_TXT_FROM, HEADING_TXT_NOTE, HEADING_TXT_TO } from '../constants/strings'
import DetailsContainer from './DetailsContainer'

interface DepartureProps{
    showNote:boolean,
    onDetailsFilled:(t:boolean) => void
}

const DepartureDetailsView = (props:DepartureProps): JSX.Element => {

    const {showNote,onDetailsFilled} = props
    const [from,setFrom] = useState<string>("")
    const [to,setTo] = useState<string>("")
    const [date,setDate] = useState<string>("")
    const [note,setNote] = useState<string>("")

    useEffect(() => {
        if(showNote){
            if(!!from && !!to && !!date && !!note){
                onDetailsFilled(true)
            }else{
                onDetailsFilled(false)
            }
        }else{
            if(!!from && !!to && !!date){
                onDetailsFilled(true)
            }else{
                onDetailsFilled(false)
            }
        }

    },[from,to,date,note])
    return (
        <View style={styles.root}>
            <DetailsContainer onChange={text => {setFrom(text)}} headingText={HEADING_TXT_FROM}  airportName={AIRPORT_IGI} icon="flight-takeoff" />
            <DetailsContainer onChange={text => {setTo(text)}} style={{ marginTop: 10 }} headingText={HEADING_TXT_TO}  airportName={AIRPORT_BOM} icon="flight-land" />
            <DetailsContainer onChange={text => {setDate(text)}}style={{ marginTop: 10 }} headingText={HEADING_TXT_DEP_DATE} icon="date-range" />
            {showNote ? <DetailsContainer onChange={text => {setNote(text)}} style={{ marginTop: 10 }} headingText={HEADING_TXT_NOTE}  icon="carpenter" /> : null}
        </View>
    )
}

export default DepartureDetailsView

const styles = StyleSheet.create({
    root:{
        alignItems: 'center', 
        width: '100%', 
        marginTop: 10
    }
})