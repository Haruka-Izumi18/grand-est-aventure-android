import { useState } from "react"; 
import { View, Text } from "react-native";
import { globalStyles } from '@/styles/global';

export default function question () {

    return(
        <View style={globalStyles.screen}>
        <Text>
            Comment ça marche?
        </Text>
        </View>
    )
}