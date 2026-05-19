import { View, Text } from "react-native";
import { globalStyles } from '@/styles/global';
import { FONT,  } from "@/styles/theme";

export default function question () {

    return(
        <View style={globalStyles.screen}>
        <Text style={{ fontFamily: FONT.regular}}>
            Comment ça marche?
        </Text>
        </View>
    )
}