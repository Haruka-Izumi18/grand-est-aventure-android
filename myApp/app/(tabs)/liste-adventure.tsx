import { useState } from "react"; 
import { View, Text } from "react-native";
import { globalStyles } from '@/styles/global';
import { FONT } from "@/styles/theme";

export default function listAdventure () {

    return(
        <View style={globalStyles.screen}>
        <Text style={{ fontFamily: FONT.regular}}>
            Liste des aventures
        </Text>
        </View>
    )
}