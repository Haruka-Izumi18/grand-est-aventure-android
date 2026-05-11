import { useState } from "react"; 
import { View, Text, TextInput, TouchableOpacity, } from "react-native";
import { globalStyles } from '@/styles/global';

export default function listAdventure () {

    return(
        <View style={globalStyles.screen}>
        <Text>
            Liste des aventures
        </Text>
        </View>
    )
}