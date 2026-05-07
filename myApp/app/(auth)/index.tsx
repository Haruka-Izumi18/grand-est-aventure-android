import { View, Text, Image, ImageBackground, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { globalStyles } from "@/styles/global";

export default function AuthLanding() {
  return (
    <View style={globalStyles.screen}>
      <View style={styles.container}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={globalStyles.title}>Balad&apos;indice</Text>
        <TouchableOpacity
          style={styles.btnInscription}
          onPress={() => router.push("/(auth)/sign-up")}
          activeOpacity={0.85}
        >
          <Text style={styles.btnInscriptionText}>Inscription</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnConnexion}
          onPress={() => router.push("/(auth)/sign-in")}
          activeOpacity={0.85}
        >
          <Text style={styles.btnConnexionText}>Connexion</Text>
        </TouchableOpacity>
      </View>
      
      <ImageBackground
      source={require("@/assets/images/Ville-Pres-Geo-1720509386955.webp")}
      style={styles.imgTop}
      resizeMode="cover"
      />
      <View style={styles.sepiaOverlay} />

      <Text style={styles.tagline}>
        Connecte-toi ou inscris-toi{"\n"}pour commencer des aventures
      </Text>
   
    </View>
  );
}

const BG = "#fffaeb";
const GREEN = "#68a618";
const BTN_RADIUS = 12;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "center",
    gap: 5,
  },
  logo: { width: 70, height: 70 },
  imgTop:{
    width: "100%",
    height: 150,
    justifyContent: "center",
  },
  sepiaOverlay: {
    ...StyleSheet.absoluteFillObject,
  backgroundColor: 'rgba(112, 66, 20, 0.12)',
  },
  tagline: {
    fontFamily: "SpaceMono_700Bold",
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
    color: "#2C1A0E",
    lineHeight: 32,
    letterSpacing: 0.2,
  },
  btnInscription: {
    backgroundColor: GREEN,
    borderRadius: BTN_RADIUS,
    paddingVertical: 8,
    alignItems: "center",
  },
  btnInscriptionText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  btnConnexion: {
    backgroundColor: "transparent",
    borderRadius: BTN_RADIUS,
    borderWidth: 2,
    borderColor: GREEN,
    paddingVertical: 8,
    alignItems: "center",
  },
  btnConnexionText: {
    color: GREEN,
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  footer: { fontSize: 12, color: "#999", textAlign: "center" },
  footerLink: {
    color: "#666",
    textDecorationLine: "underline",
    fontWeight: "600",
  },
});
