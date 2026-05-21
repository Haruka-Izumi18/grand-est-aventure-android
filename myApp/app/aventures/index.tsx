import { useState, useCallback } from "react";
import { View, Text, ActivityIndicator, FlatList, StyleSheet } from "react-native";
import AdventureCard, { Adventure } from '@/components/aventures/AdventureCard';
import { api } from '@/services/api.service';
import { globalStyles } from '@/styles/global';
import { FONT } from "@/styles/theme";
import { useFocusEffect } from 'expo-router';
import * as Location from 'expo-location';

export default function ListeAdventure() {
    const [adventures, setAdventures] = useState<Adventure[]>([]);
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            const fetchAdventures = async () => {
                try {
                    const { status } = await Location.requestForegroundPermissionsAsync();

                    if (status === 'granted') {
                        const location = await Location.getCurrentPositionAsync({});
                        const { latitude, longitude } = location.coords;
                        api(`api/game/adventures?latitude=${latitude}&longitude=${longitude}`)
                            .then((res) => setAdventures(res.data.adventures ?? []))
                            .catch((error) => console.error('Erreur API aventures:', error))
                            .finally(() => setLoading(false));
                    } else {
                        api('api/game/adventures')
                            .then((res) => setAdventures(res.data.adventures ?? []))
                            .catch((error) => console.error('Erreur API aventures:', error))
                            .finally(() => setLoading(false));
                    }
                } catch (error) {
                    console.error('Erreur géolocalisation:', error);
                }
            };

            fetchAdventures();
        }, [])
    );

    if (loading) {
        return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
    }

    return (
        <View style={globalStyles.screen}>
            <Text style={[globalStyles.title, { fontFamily: FONT.bold }]}>Liste des aventures</Text>

            {adventures.length === 0 ? (
                <Text style={styles.empty}>
                    Aucune aventure n&apos;est présente pour le moment, merci de revenir ultérieurement.
                </Text>
            ) : (
                <FlatList
                    data={adventures}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ padding: 20, gap: 16 }}
                    renderItem={({ item }) => (
                        <AdventureCard
                            adventure={item}
                            onPress={() => {}}
                        />
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    empty: {
        padding: 20,
        textAlign: "center",
        color: "#888",
    },
});