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
        </View>
      
      <ImageBackground
      source={require("@/assets/images/Ville-Pres-Geo-1720509386955.webp")}
      style={styles.imgTop}
      resizeMode="cover"
      />
      <View style={styles.sepiaOverlay} />
      <Text>Hello</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: 'center',
    width: '100%',
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

  footer: { fontSize: 12, color: "#999", textAlign: "center" },
  footerLink: {
    color: "#666",
    textDecorationLine: "underline",
    fontWeight: "600",
  },
});
