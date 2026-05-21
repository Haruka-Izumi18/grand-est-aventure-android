import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { globalStyles } from '@/styles/global';
import { FONT } from "@/styles/theme";
import {formatDuration, formatDistance }  from "@/scripts/global-scripts";

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

type AdventureCardProps = {
    adventure: Adventure;
    onPress: () => void;
    onMapPress?: () => void; // optionnel : affiché uniquement si fourni
};

export default function AdventureCard({ adventure, onPress, onMapPress }: AdventureCardProps) {
    return (
        <View style={[globalStyles.card, { padding: 5 }]}>

            {/* Image de couverture */}
            {adventure.coverImageUrl ? (
                <Image
                    source={{ uri: adventure.coverImageUrl }}
                    style={styles.cover}
                />
            ) : null}

            <View style={styles.info}>

                {/* Nom de l'aventure */}
                <Text style={[globalStyles.titleh2, { fontFamily: FONT.bold }]}>
                    {adventure.name}
                </Text>

                {/* Infos */}
                <Text style={[globalStyles.text, { fontFamily: FONT.bold }]}>
                    📍 {adventure.city.name} ({adventure.city.postalCodes[0]})
                </Text>

                <Text style={[globalStyles.text, { fontFamily: FONT.bold }]}>
                    ⌚ Durée estimée : <Text style={globalStyles.text}>{formatDuration(adventure.estimatedDurationSeconds)}</Text>
                </Text>

                <Text style={[globalStyles.text, { fontFamily: FONT.bold }]}>
                    🧩 {adventure.enigmaCount} énigme{adventure.enigmaCount > 1 ? 's' : ''}
                </Text>
                
                <Text style={[globalStyles.text, { fontFamily: FONT.bold }]}>
                    🚶 {formatDistance(adventure.distanceFromUserKm)} de vous
                </Text>

                {/* Trésor */}
                {adventure.hasTreasure && (
                    <Text style={styles.treasure}>🏆 Trésor à la clé !</Text>
                )}

                {/* Boutons */}
                <View style={styles.buttons}>

                    <TouchableOpacity style={styles.button} onPress={onPress}>
                        <Text style={styles.buttonText}>Voir l&apos;aventure</Text>
                    </TouchableOpacity>

                    {/* Affiché uniquement si onMapPress est fourni */}
                    {onMapPress && (
                        <TouchableOpacity style={[styles.button, styles.buttonSecondary]} onPress={onMapPress}>
                            <Text style={styles.buttonText}>Voir sur la carte</Text>
                        </TouchableOpacity>
                    )}

                </View>
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
        gap: 6,
    },
    treasure: {
        fontSize: 14,
        color: "#c8a000",
        fontWeight: "bold",
        marginTop: 4,
        alignSelf: "center",
    },
    buttons: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 8,
    },
    button: {
        flex: 1,
        backgroundColor: '#2563eb',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonSecondary: {
        backgroundColor: '#64748b',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 13,
    },
});