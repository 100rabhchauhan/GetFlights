import * as React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import FlightSuggestions from '../screens/FlightSugestions';
import { FONTS } from '../constants/fonts';
import { COLORS } from '../constants/colors';
import { AIR_INDIA, FLIGHT_LOGO } from '../constants/images';
import { HOME_HEADER_TXT, SELECT_FLIGHT_TXT } from '../constants/strings';
import { NavigationRoutes } from '../constants/navigationRoutes';

const Stack = createNativeStackNavigator();

function CustomHeader() {
    return (
        <View style={styles.mainHeaderContainer}>
            <Image
                style={styles.headerLogo}
                source={FLIGHT_LOGO}
            />
            <Text style={styles.headerTxt}>{HOME_HEADER_TXT}</Text>
        </View>
    );
}

const RootStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={NavigationRoutes.HOME}
                component={Home}
                options={{ headerTitle: (props) => <CustomHeader {...props} /> }}
            />
            <Stack.Screen name={NavigationRoutes.SELECT_FLIGHTS} component={FlightSuggestions} options={{
                title: SELECT_FLIGHT_TXT, headerStyle: {
                    backgroundColor: COLORS.HEADER_TINT,
                },
                headerTintColor: COLORS.WHITE,
                headerTitleStyle: {
                    fontFamily: FONTS.FONT_METROPOLIS_400
                },
            }} />
        </Stack.Navigator>
    );
};

export default RootStack

export const styles = StyleSheet.create({
    mainHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.HEADER_TINT,
        flex: 1,
        marginLeft: -16
    },
    headerLogo: {
        width: 60,
        height: 60,
        marginLeft: 10
    },
    headerTxt: {
        fontSize: 18,
        marginLeft: 5,
        fontFamily: FONTS.FONT_METROPOLIS_600,
        color: 'white'
    }
})