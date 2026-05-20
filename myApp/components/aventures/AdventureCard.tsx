import { View, Text, Image, StyleSheet } from "react-native";
import { globalStyles } from '@/styles/global';
import { FONT } from "@/styles/theme";

type City = {
    id: string;
    name: string;
    postalCodes: string[];
};

export type Adventure = {
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

function formatDuration(seconds: number): string {
    const h = Math.floor(seconds / 3600);
    const min = Math.floor((seconds % 3600) / 60);
    return h > 0 ? `${h}h ${min}min` : `${min}min`;
}

type AdventureCardProps = {
    adventure: Adventure;
};

export default function AdventureCard({ adventure }: AdventureCardProps) {
    return (
        <View style={[globalStyles.card, { padding: 5 }]}> 
            {adventure.coverImageUrl ? (
                <Image
                    source={{ uri: adventure.coverImageUrl }}
                    style={styles.cover}
                />
            ) : null}

            <View style={styles.info}>
                <Text style={[globalStyles.titleh2, { fontFamily: FONT.bold }]}> 
                    {adventure.name}
                </Text>

                <Text style={[globalStyles.text, { fontFamily: FONT.bold }]}>📍  {adventure.city.name} ({adventure.city.postalCodes[0]})</Text>

                <Text style={[globalStyles.text, { fontFamily: FONT.bold }]}>⌚  Durée estimée : <Text style={globalStyles.text}>{formatDuration(adventure.estimatedDurationSeconds)}</Text></Text>

                <Text style={[globalStyles.text, { fontFamily: FONT.bold }]}>🧩  {adventure.enigmaCount} énigme{adventure.enigmaCount > 1 ? 's' : ''}</Text>

                <Text style={[globalStyles.text, { fontFamily: FONT.bold }]}>🚶  {adventure.distanceFromUserKm} km de vous</Text>

                {adventure.hasTreasure && (
                    <Text style={styles.treasure}>🏆 Trésor à la clé !</Text>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
