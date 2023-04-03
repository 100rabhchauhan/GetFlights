import React, { useEffect, useState, useRef } from 'react'
import { View, Text, FlatList, Image, Pressable,StyleSheet } from 'react-native'
import { FONTS } from '../constants/fonts'
import { AIR_INDIA_TXT, FILTER, JET_SPICE, SORT } from '../constants/strings'
import { FlightSuggestion, SuggestionResponse } from '../models/SuggestionResponseModel'
import { getRequest } from '../network/Api'
import { Modalize } from 'react-native-modalize'
import Tick from 'react-native-vector-icons/Ionicons'
import SortIcon from 'react-native-vector-icons/FontAwesome5'
import Button from '../components/Button'
import { AIRLINE_CODE, BTN_TITLES, GET_FLIGHTS_SUGGESTIONS, LIST_METRIC_FILTER, LIST_METRIC_SORT, SORT_METRIC } from '../constants/appConstants'
import FlightListItem from '../components/FlightListItem'
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS } from '../constants/colors'





const FlightSuggestions = (props): JSX.Element => {

    
    const route = useRoute()
    const navigation = useNavigation();
    const onPressBookNow = route?.params?.onPressBookNow

    const [flightSuggestions, setFlightSuggestions] = useState<Array<FlightSuggestion>>([])
    const [masterData, setMasterData] = useState<Array<FlightSuggestion>>([])
    const [listMetric, setListMetric] = useState<string>("")
    const [filterByProperty, setFilterByProperty] = useState<string>("")
    const [sortByProperty, setSortByProperty] = useState<string>("")
    const [selectedItem,setSelectedItem] = useState<string>("")
    const modalizeRef = useRef<Modalize>(null);

    const onOpen = () => {
        modalizeRef.current?.open();
    };

    useEffect(() => {
        getSuggestions()
    }, [])

    const getSuggestions = async () => {
        const response: SuggestionResponse | boolean = await getRequest(GET_FLIGHTS_SUGGESTIONS)
        if (response && response.result) {
            setMasterData(response.result as Array<FlightSuggestion>)
            setFlightSuggestions(response.result as Array<FlightSuggestion>)
        } else {
            alert("failed")
        }

    }

    const _renderItem = ({ item, index }: { item: FlightSuggestion, index: number }) => {
        return <FlightListItem item={item} selectedItem={selectedItem} setSelectedItem={setSelectedItem}/>
    }

    const onSortClicked = () => {
        setListMetric(LIST_METRIC_SORT)
        onOpen()
    }

    const onFilterClicked = () => {
        setListMetric(LIST_METRIC_FILTER)
        onOpen()
    }

    const listHeaderComponent = (): JSX.Element => {
        return (
            <View style={styles.listHeaderContainer}>
                <Pressable onPress={onSortClicked} style={styles.tabStyle}>
                    <SortIcon name = "sort" size={20} color= {COLORS.GREY}/>
                    <Text style={styles.tabText}>{SORT}</Text>
                </Pressable>
                <Pressable onPress={onFilterClicked} style={styles.tabStyle}>
                <SortIcon name = "filter" size={15} color= {COLORS.GREY}/>
                    <Text style={styles.tabText}>{FILTER}</Text>
                </Pressable>
            </View>
        )
    }

    const sortOptions = (): JSX.Element => {
        return <View style = {styles.sortView}>
            <Pressable onPress={() => { sortList(SORT_METRIC.H2L) }} style={[styles.sortItemView,sortByProperty === SORT_METRIC.H2L? {borderColor:COLORS.GREEN,backgroundColor:COLORS.LIGHT_GREEN,borderWidth:1}:null]}>
                <Text style={[styles.sortItemText,sortByProperty === SORT_METRIC.H2L?{color:'black'}:null]}>Fare Highest to Lowest</Text>
                {!!(sortByProperty === SORT_METRIC.H2L) && <Tick name = "ios-checkmark-done-circle" size={20} color={COLORS.GREEN}/>}
            </Pressable>
            <Pressable onPress={() => { sortList(SORT_METRIC.L2H) }} style={[styles.sortItemView,{ marginTop:15 },sortByProperty === SORT_METRIC.L2H? {borderColor:COLORS.GREEN,backgroundColor:COLORS.LIGHT_GREEN,borderWidth:1}:null]}>
                <Text style={[styles.sortItemText,sortByProperty === SORT_METRIC.L2H?{color:'black'}:null]}>Fare Lowest to Highest</Text>
                {!!(sortByProperty === SORT_METRIC.L2H) && <Tick name = "ios-checkmark-done-circle" size={20} color={COLORS.GREEN}/>}
            </Pressable>
            </View>
    }

    const clearFilter = () => {
        modalizeRef.current?.close()
        setFilterByProperty("")
        setSortByProperty("")
        let temp = [...masterData]
        setFlightSuggestions(temp)
    }

    const filterOptions = (): JSX.Element => {
        return <View style = {[styles.sortView,{alignItems:'center'}]}>
            <Pressable onPress={() => { filterBy(AIRLINE_CODE.AB) }} style={[styles.sortItemView,filterByProperty === AIRLINE_CODE.AB? {borderColor:COLORS.GREEN,backgroundColor:COLORS.LIGHT_GREEN,borderWidth:1}:null]}>
                <Text style={[styles.sortItemText,filterByProperty === AIRLINE_CODE.AB?{color:COLORS.BLACK}:null]}>{JET_SPICE}</Text>
                {!!(filterByProperty === AIRLINE_CODE.AB) && <Tick name = "ios-checkmark-done-circle" size={20} color={COLORS.GREEN}/>}
            </Pressable>
            <Pressable onPress={() => { filterBy(AIRLINE_CODE.CD) }} style={[styles.sortItemView,{ marginTop:15 },filterByProperty === AIRLINE_CODE.CD? {borderColor:COLORS.GREEN,backgroundColor:COLORS.LIGHT_GREEN,borderWidth:1}:null]}>
                <Text style={[styles.sortItemText,filterByProperty === AIRLINE_CODE.CD?{color:COLORS.BLACK}:null]}>{AIR_INDIA_TXT}</Text>
                {!!(filterByProperty === AIRLINE_CODE.CD) && <Tick name = "ios-checkmark-done-circle" size={20} color={COLORS.GREEN}/>}</Pressable>
                {!!filterByProperty && <Button onPress={clearFilter} gradientArray={[COLORS.BLUE_1, COLORS.BLUE_2]} btnText={BTN_TITLES.CLEAR} locations={[0,0.5,1]} style = {styles.clearBtn}/>}
        </View>
    }

    const filterBy = (type: string) => {
        setFilterByProperty(type)
        modalizeRef.current?.close()
        let tempList = masterData.filter(e => e?.displayData?.airlines[0]?.airlineCode === type)
        setFlightSuggestions(tempList)

    }

    const sortList = (sortType: string) => {

        setSortByProperty(sortType)
        modalizeRef.current?.close()
        let tempList = [...flightSuggestions]
        tempList.sort((a, b) => {
            if (a?.fare >= b?.fare) {
                return -1
            } else {
                return 1
            }
        })
        if (sortType === SORT_METRIC.L2H) {
            tempList.reverse()
        }
        setFlightSuggestions(tempList)
    }

    const onBookNowPress = () => {
        navigation.goBack()
        onPressBookNow()
    }
    return (
        <View style={styles.root}>
            <FlatList
                data={flightSuggestions}
                renderItem={_renderItem}
                style={styles.listStyle}
                ListHeaderComponent={listHeaderComponent}
                keyExtractor={(item) => item?.id}
                extraData={selectedItem}
                stickyHeaderIndices={[0]}
            />
            <Modalize tapGestureEnabled={false} adjustToContentHeight={true} closeOnOverlayTap={true} ref={modalizeRef}>
                {listMetric === LIST_METRIC_SORT ? sortOptions():filterOptions()}
            </Modalize>

            {!!selectedItem && <Button onPress={onBookNowPress} gradientArray={[COLORS.PURPLE, COLORS.PINK, COLORS.ORANGE]} btnText={BTN_TITLES.BOOK_NOW} style={styles.btnStyle}/>}
            
        </View>
    )
}

export default FlightSuggestions

const styles = StyleSheet.create({
    root:{
        alignItems: 'center', 
        flex: 1, 
        backgroundColor: COLORS.POWDER_BLUE
    },
    listStyle:{
        width: '100%', 
        paddingHorizontal: 10
    },
    btnStyle:{
        position:'absolute',
        left:10,
        right:10,
        bottom:20,
        paddingVertical:8
    },
    listHeaderContainer:{
        width: '100%', 
        borderRadius: 5, 
        marginTop: 10, 
        flexDirection: 'row', 
        alignItems: 'center',
        backgroundColor:COLORS.CREAM,
        borderColor:'#a3d6f0',
        borderWidth:1 
    },
    tabStyle:{
        flex: 1,
        flexDirection:'row', 
        alignItems: 'center', 
        paddingVertical: 15,  
        borderRadius: 5, 
        justifyContent: 'center'
    },
    tabText:{
        fontSize: 14, 
        marginLeft:12,
        fontFamily: FONTS.FONT_METROPOLIS_SANS_BOLD, 
        color: COLORS.GREY
    },
    sortView:{
        marginVertical:30,
        paddingHorizontal:10
    },
    sortItemView:{
        width: '100%', 
        flexDirection: 'row' ,
        alignItems: 'center',
        justifyContent:'space-between', 
        borderRadius: 3, 
        padding: 15
    },
    sortItemText:{
        fontSize: 14, 
        fontFamily: FONTS.FONT_METROPOLIS_SANS_BOLD, 
        color: COLORS.GREY
    },
    clearBtn:{
        width:'70%',
        marginTop:20
    }
})