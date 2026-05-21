import { View, Text, ImageBackground, StyleSheet, Pressable, ActivityIndicator, FlatList, TouchableOpacity } from "react-native";
import { globalStyles } from "@/styles/global";
import AdventureCard, { Adventure } from '@/components/aventures/AdventureCard';
import * as Location from 'expo-location';
import { useEffect, useRef, useState } from 'react';
import { WebView } from 'react-native-webview';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { api } from '@/services/api.service';

export default function AuthLanding() {
    // Référence vers la WebView pour pouvoir lui injecter du JS
    const webViewRef = useRef<WebView>(null);

    // Liste des aventures récupérées depuis l'API
    const [adventures, setAdventures] = useState<Adventure[]>([]);

    // Indique si l'API est en train de charger
    const [loading, setLoading] = useState(true);

    // Indique si la carte Leaflet est prête à recevoir du JS
    const [mapReady, setMapReady] = useState(false);

    // Indique si l'utilisateur a cliqué sur une aventure (bloque le suivi auto)
    const [focusedAdventure, setFocusedAdventure] = useState(false);

    // -------------------------------------------------------
    // HTML de la carte Leaflet chargée dans la WebView
    // -------------------------------------------------------
    const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
            <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
            <style>
                body { margin: 0; padding: 0; }
                #map { width: 100vw; height: 100vh; }
            </style>
        </head>
        <body>
            <div id="map"></div>
            <script>
                window.map = L.map('map', { zoomControl: false }).setView([48.8566, 2.3522], 13);
                L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '© OpenStreetMap',
                    maxZoom: 19
                }).addTo(window.map);
            </script>
        </body>
        </html>
    `;

    // -------------------------------------------------------
    // Met à jour le point bleu (position utilisateur) sur la carte
    // Sans bouger la vue de la carte
    // -------------------------------------------------------
    const updateUserMarker = (latitude: number, longitude: number) => {
        webViewRef.current?.injectJavaScript(`
            if (window.userMarker) {
                window.map.removeLayer(window.userMarker);
            }
            window.userMarker = L.marker([${latitude}, ${longitude}], {
                icon: L.divIcon({
                    className: 'user-marker',
                    html: '<div style="background-color:#2f58b1; border-radius:50%; width:20px; height:20px; border:3px solid #ffffff;"></div>',
                    iconSize: [20, 20],
                    iconAnchor: [10, 10]
                })
            }).addTo(window.map);
            true;
        `);
    };

    // -------------------------------------------------------
    // Place les marqueurs D des aventures sur la carte
    // Appelé une fois que la carte ET les aventures sont prêtes
    // -------------------------------------------------------
    const displayAdventureMarkers = (adventureList: Adventure[]) => {
        const markersJS = adventureList.map(adventure => `
            L.marker([${adventure.latitude}, ${adventure.longitude}], {
                icon: L.divIcon({
                    className: '',
                    html: '<div style="display:flex; justify-content:center; align-items:center; background-color:#2563eb; border-radius:50%; width:20px; height:20px; border:3px solid #000000; color:white; font-weight:bold; font-size:12px;">D</div>',
                    iconSize: [20, 20],
                    iconAnchor: [10, 10]
                })
            })
            .addTo(window.map)
            .bindPopup('<b>${adventure.name}</b>');
        `).join('');

        webViewRef.current?.injectJavaScript(`
            ${markersJS}
            true;
        `);
    };

    // -------------------------------------------------------
    // Recentre la carte sur la position de l'utilisateur
    // Réactive aussi le suivi automatique
    // -------------------------------------------------------
    const centerOnUserLocation = async () => {
        setFocusedAdventure(false);
        try {
            const location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;
            updateUserMarker(latitude, longitude);
            webViewRef.current?.injectJavaScript(`
                window.map.setView([${latitude}, ${longitude}], 17);
                true;
            `);
        } catch (error) {
            console.error('Erreur géolocalisation:', error);
        }
    };

    // -------------------------------------------------------
    // Recentre la carte sur le point de départ d'une aventure
    // Désactive le suivi automatique
    // -------------------------------------------------------
    const centerOnAdventure = (latitude: number, longitude: number) => {
        setFocusedAdventure(true);
        webViewRef.current?.injectJavaScript(`
            window.map.setView([${latitude}, ${longitude}], 17);
            true;
        `);
    };

    // -------------------------------------------------------
    // Quand la WebView est chargée :
    // - On marque la carte comme prête
    // - On centre sur la position de l'utilisateur
    // -------------------------------------------------------
    const handleMapReady = () => {
        setMapReady(true);
        setTimeout(() => {
            centerOnUserLocation();
        }, 500);
    };

    // -------------------------------------------------------
    // Affiche les marqueurs D dès que la carte ET les aventures sont prêtes
    // -------------------------------------------------------
    useEffect(() => {
        if (!mapReady || adventures.length === 0) return;
        displayAdventureMarkers(adventures);
    }, [mapReady, adventures]);

    // -------------------------------------------------------
    // Au montage : récupère les aventures + démarre la géoloc
    // -------------------------------------------------------
    useEffect(() => {
        let subscription: Location.LocationSubscription | null = null;

        const init = async () => {
            // Récupération des aventures depuis l'API
            api('api/game/adventures')
                .then((res) => setAdventures(res.data.adventures ?? []))
                .catch((error) => console.error('Erreur API aventures:', error))
                .finally(() => setLoading(false));

            // Demande la permission de géolocalisation
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') return;

            // Surveille la position en temps réel
            subscription = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    timeInterval: 1000,
                    distanceInterval: 10,
                },
                (location) => {
                    const { latitude, longitude } = location.coords;

                    // Met toujours à jour le point bleu
                    updateUserMarker(latitude, longitude);

                    // Recentre la carte uniquement si pas focusé sur une aventure
                    if (!focusedAdventure) {
                        webViewRef.current?.injectJavaScript(`
                            window.map.setView([${latitude}, ${longitude}], 17);
                            true;
                        `);
                    }
                }
            );
        };

        init();

        // Nettoyage : arrête le watch quand le composant est démonté
        return () => {
            subscription?.remove();
        };
    }, []);

    // -------------------------------------------------------
    // Rendu
    // -------------------------------------------------------
    return (
        <View style={globalStyles.screen}>

            {/* Bannière du haut */}
            <ImageBackground
                source={require("@/assets/images/Ville-Pres-Geo-1720509386955.webp")}
                style={styles.imgTop}
                resizeMode="cover"
                imageStyle={{ filter: [{ brightness: 1.5 }] } as any}
            >
                <View />
                <View style={globalStyles.container}>
                    <Text style={globalStyles.titleh2}>NOUVEAU GRAND EST</Text>
                    <Text style={[globalStyles.bannerTitle, { textAlign: "center" }]}>
                        La ville devient{"\n"}une chasse au trésor
                    </Text>
                </View>
            </ImageBackground>

            {/* Carte */}
            <View style={styles.mapContainer}>
                <WebView
                    ref={webViewRef}
                    source={{ html }}
                    javaScriptEnabled
                    style={{ flex: 1 }}
                    onLoadEnd={handleMapReady}
                />
                {/* Bouton pour recentrer sur sa position */}
                <Pressable style={styles.locationButton} onPress={centerOnUserLocation}>
                    <FontAwesome6 name="location-crosshairs" size={22} color="gray" />
                </Pressable>
            </View>

            {/* Liste des aventures */}
            <Text style={globalStyles.titleh2}>Quelle aventure choisis-tu?</Text>
            {loading ? (
                <ActivityIndicator size="large" style={{ marginTop: 40 }} />
            ) : (
                <FlatList
                    data={adventures}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ padding: 20, gap: 16 }}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => centerOnAdventure(item.latitude, item.longitude)}>
                            <AdventureCard adventure={item} />
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    imgTop: {
        width: "100%",
        height: 130,
        justifyContent: "center",
    },
    mapContainer: {
        height: 300,
        position: "relative",
    },
    locationButton: {
        position: 'absolute',
        bottom: 40,
        right: 15,
        backgroundColor: 'white',
        borderRadius: 25,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});