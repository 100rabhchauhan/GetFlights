import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { ViewStyle } from 'react-native/Libraries/StyleSheet/StyleSheet'
import { FONTS } from '../constants/fonts'

interface ButtonProps {
    gradientArray: Array<string>,
    btnText: string,
    style?: ViewStyle,
    locations?: Array<number>,
    onPress: () => void
}

const Button = (props: ButtonProps): JSX.Element => {
    const { gradientArray, btnText, style, locations = [0, 0.3, 1],onPress = () => {} } = props
    return (
        
            <LinearGradient
                colors={gradientArray}
                locations={locations}
                useAngle={true}
                angle={90}
                style={[styles.root, {marginTop:10},style]}
            >
                <Pressable style={[styles.root,{padding:10}]} onPress={onPress}>
                <Text style={{ fontSize: 14, marginLeft: 5, fontFamily: FONTS.FONT_METROPOLIS_SANS_BOLD, color: "white" }}>{btnText}</Text>
                </Pressable>
                
            </LinearGradient>

    )
}

export default Button

const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
    }
})

