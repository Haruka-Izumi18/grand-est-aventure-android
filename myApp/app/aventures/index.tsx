import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { api } from '@/services/api.service';
import { globalStyles } from '@/styles/global';
import { FONT } from "@/styles/theme";

export default function ListeAdventure() {
    const [adventures, setAdventures] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api('api/game/adventures').then((res) => {
            setAdventures(res.data.adventures ?? []);
            setLoading(false);
        });
    }, []);

    if (loading) return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;

    return (
        <View style={globalStyles.screen}>
        <Text style={{ fontFamily: FONT.regular}}>
            Liste des aventures
        </Text>
        
        <View style={{ padding: 20 }}>
            {adventures.length === 0 ? (
                <Text>Aucune aventure n&apos;est présente pour le moment, merci de revenir ultérieurement.</Text>
            ) : (
                <Text>{JSON.stringify(adventures, null, 2)}</Text>
            )}
        </View>
        </View>
    );
}