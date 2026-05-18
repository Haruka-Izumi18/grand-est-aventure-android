import { View, Text, Image, ImageBackground,  StyleSheet } from "react-native";
import { router } from "expo-router";
import { globalStyles } from "@/styles/global";
import { COLORS } from "@/styles/theme";

export default function AuthLanding() {
  return (
    <View style={globalStyles.screen}>
      <ImageBackground
      source={require("@/assets/images/Ville-Pres-Geo-1720509386955.webp")}
      style={styles.imgTop}
      resizeMode="cover"
      imageStyle={{ filter: [{ brightness: 1.5 }] } as any}
      >
      <View style={styles.sepiaOverlay} />
      <View style={globalStyles.container}>
      <Text style={styles.secondTitle}>NOUVEAU GRAND EST</Text>
      <Text style={styles.textTop}>La ville devient{"\n"}une chasse au trésor</Text>
      </View>
      </ImageBackground>
      
      <Text style={globalStyles.titleh2}>Quell aventure choisis-tu?</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  imgTop:{
    width: "100%",
    height: 130,
    justifyContent: "center",
  },
  sepiaOverlay: {
    ...StyleSheet.absoluteFillObject,
  backgroundColor: 'rgba(161, 123, 85, 0.3)',
  },
  secondTitle: {
    color: 'rgb(133, 233, 100)',
    fontSize: 18,
    fontWeight: "800",
    textAlign: 'center',
     textShadowColor: 'rgba(233, 238, 231, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  textTop: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: "900",
    textAlign: "center",
  }


});
