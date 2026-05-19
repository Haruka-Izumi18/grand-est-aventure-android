import { View, Text } from "react-native";
import { globalStyles } from '@/styles/global';
import { FONT } from "@/styles/theme";

export default function contact () {
    return(
        <View style={globalStyles.screen}>
        <Text style={{ fontFamily: FONT.regular}}>
            Contactez à nous
        </Text>
        </View>
    )
}