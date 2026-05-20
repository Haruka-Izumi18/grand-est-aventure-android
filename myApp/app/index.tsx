import { View, Text, ImageBackground, StyleSheet, Pressable, ActivityIndicator, FlatList} from "react-native";
import { globalStyles } from "@/styles/global";
import AdventureCard, { Adventure } from '@/components/aventures/AdventureCard';
import * as Location from 'expo-location';
import { useEffect, useRef, useState } from 'react';
import { WebView } from 'react-native-webview';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { api } from '@/services/api.service';


export default function AuthLanding() {
    const webViewRef = useRef<WebView>(null);

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
  window.map = L.map('map', { zoomControl: false }).setView([48.8566, 2.3522], 4);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap',
    maxZoom: 100
  }).addTo(window.map);
</script>
    </body>
    </html>
  `;

  const [adventures, setAdventures] = useState<Adventure[]>([]);
  const [loading, setLoading] = useState(true);

  const updateMap = (latitude: number, longitude: number) => {
      webViewRef.current?.injectJavaScript(`
          if(window.userMarker){
              window.map.removeLayer(window.userMarker);
          }

          window.userMarker = L.marker([${latitude}, ${longitude}], {
              icon: L.divIcon({
                  className: 'user-marker',
                  html: '<div style="background-color: #2f58b1; border-radius: 50%; width: 20px; height: 20px; border: 3px solid #ffffff;"></div>',
                  iconSize: [15, 15],
                  iconAnchor: [10, 10]
              })
          }).addTo(window.map);
          window.map.setView([${latitude}, ${longitude}], 17);
          true;
      `);
  };

  const centerOnLocation = async () => {
      try {
          const location = await Location.getCurrentPositionAsync({});
          const { latitude, longitude } = location.coords;
          updateMap(latitude, longitude);
      } catch (error) {
          console.error('Erreur géolocalisation:', error);
      }
  };

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

  useEffect(() => {
      let subscription: Location.LocationSubscription | null = null;

      const startWatch = async () => {
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') return;

          subscription = await Location.watchPositionAsync(
              {
                  accuracy: Location.Accuracy.High,
                  timeInterval: 1000,
                  distanceInterval: 10,
              },
              (location) => {
                  const { latitude, longitude } = location.coords;
                  updateMap(latitude, longitude);
              }
          );
      };

      startWatch();

      return () => {
          subscription?.remove();
      };
  }, []);

  if (loading) {
      return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  }


    return (
        <View style={globalStyles.screen}>
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


            <View style={styles.mapContainer}>
                <WebView
                    ref={webViewRef}
                    source={{ html }}
                    javaScriptEnabled
                    style={{ flex: 1 }}
                    onLoadEnd={centerOnLocation}
                />
                <Pressable style={styles.locationButton} onPress={centerOnLocation}>
                    <FontAwesome6 name="location-crosshairs" size={22} color="gray" />
                </Pressable>
            </View>
            <Text style={globalStyles.titleh2}>Quelle aventure choisis-tu?</Text>

            <FlatList
                                data={adventures}
                                keyExtractor={(item) => item.id}
                                contentContainerStyle={{ padding: 20, gap: 16 }}
                                renderItem={({ item }) => <AdventureCard adventure={item} />}
                            />
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