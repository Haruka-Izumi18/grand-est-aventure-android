import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, FlatList, StyleSheet } from "react-native";
import AdventureCard, { Adventure } from '@/components/aventures/AdventureCard';
import { api } from '@/services/api.service';
import { globalStyles } from '@/styles/global';
import { FONT } from "@/styles/theme";

export default function ListeAdventure() {
    const [adventures, setAdventures] = useState<Adventure[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api('api/game/adventures')
            .then((res) => {
                setAdventures(res.data.adventures ?? []);
            })
            .catch((error) => {
                console.error('Erreur API aventures:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

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
                    renderItem={({ item }) =><AdventureCard adventure={item} />}
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
