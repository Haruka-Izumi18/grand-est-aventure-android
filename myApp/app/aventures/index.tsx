import { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { api } from '@/services/api.service';
import { globalStyles } from '@/styles/global';
import { FONT } from "@/styles/theme";

// Type calqué sur la réponse API
type City = {
    id: string;
    name: string;
    postalCodes: string[];
};

type Adventure = {
    id: string;
    name: string;
    coverImageUrl: string;
    city: City;
    latitude: number;
    longitude: number;
    distanceKm: number;
    distanceFromUserKm: number;
    enigmaCount: number;
    hasTreasure: boolean;
    estimatedDurationSeconds: number;
    updatedAt: string;
};

// Convertit des secondes en "Xh Xmin"
function formatDuration(seconds: number): string {
    const h = Math.floor(seconds / 3600);
    const min = Math.floor((seconds % 3600) / 60);
    return h > 0 ? `${h}h ${min}min` : `${min}min`;
}

export default function ListeAdventure() {
    const [adventures, setAdventures] = useState<Adventure[]>([]);
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
            <Text style={[globalStyles.title, { fontFamily: FONT.bold }]}>
                Liste des aventures
            </Text>

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
                        <View style={[globalStyles.card, {padding: 5}]}>
                            {/* Image de couverture */}
                            {item.coverImageUrl ? (
                                <Image
                                    source={{ uri: item.coverImageUrl }}
                                    style={styles.cover}
                                />
                            ) : null}

                            <View style={styles.info}>
                                {/* Nom */}
                                <Text style={[globalStyles.titleh2, { fontFamily: FONT.bold }]}>
                                    {item.name}
                                </Text>

                                {/* Ville */}
                                <Text style={[globalStyles.text, { fontFamily: FONT.bold }]}>
                                    📍  {item.city.name} ({item.city.postalCodes[0]})
                                </Text>

                                {/* Durée estimée */}
                                <Text style={[globalStyles.text, { fontFamily: FONT.bold }]}>
                                     ⌚  Durée estimée : <Text style={globalStyles.text}>{formatDuration(item.estimatedDurationSeconds)}</Text>
                                </Text>

                                {/* Nombre d'énigmes */}
                                <Text style={[globalStyles.text, { fontFamily: FONT.bold }]}>
                                    🧩  {item.enigmaCount} énigme{item.enigmaCount > 1 ? 's' : ''}
                                </Text>

                                {/* Distance */}
                                <Text style={[globalStyles.text, { fontFamily: FONT.bold }]}>
                                    🚶  {item.distanceFromUserKm} km de vous
                                </Text>

                                {/* Trésor */}
                                {item.hasTreasure && (
                                    <Text style={styles.treasure}>🏆 Trésor à la clé !</Text>
                                )}
                            </View>
                        </View>
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
    cover: {
        width: "100%",
        height: 160,
        resizeMode: "cover",
    },
    info: {
        padding: 10,
        gap: 2,
    },
    treasure: {
        fontSize: 14,
        color: "#c8a000",
        fontWeight: "bold",
        marginTop: 4,
        alignSelf: "center"
    },
});