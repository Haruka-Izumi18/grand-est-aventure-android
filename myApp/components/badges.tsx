import { View, Text, Image, StyleSheet } from "react-native";
import { globalStyles } from "@/styles/global";

const BADGE_IMAGES: Record<string, any> = {
  "Ouvrir":               require("@/assets/images/bagdes/SD/Ouvrir.png"),
  "1erObjet":             require("@/assets/images/bagdes/SD/1erObjet.png"),
  "1erPas":               require("@/assets/images/bagdes/SD/1erPas.png"),
  "Assidu":               require("@/assets/images/bagdes/SD/Assidu.png"),
  "Dénicheur":            require("@/assets/images/bagdes/SD/Dénicheur.png"),
  "Explorateur":          require("@/assets/images/bagdes/SD/Explorateur.png"),
  "Marcheur":             require("@/assets/images/bagdes/SD/Marcheur.png"),
  "Nocturne":             require("@/assets/images/bagdes/SD/Nocturne.png"),
  "Obserrvateur":         require("@/assets/images/bagdes/SD/Obserrvateur.png"),
  "Rapide":               require("@/assets/images/bagdes/SD/Rapide.png"),
  "Traqueur":             require("@/assets/images/bagdes/SD/Traqueur.png"),
  "TraqueurLégendaire":   require("@/assets/images/bagdes/SD/TraqueurLégendaire.png"),
};

export default function Badges({ badges }: { badges: any[] }) {
  if (badges.length === 0) {
    return (
      <Text style={globalStyles.text}>
        Tu n&apos;as pas encore gagné de badge !
      </Text>
    );
  }

  return (
    <View style={styles.grid}>
      {badges.map((item) => {
        const name = item.badge?.name ?? item.name;
        const image = BADGE_IMAGES[name];

        return image ? (
          <Image key={item.id} source={image} style={styles.image} />
        ) : null;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly" },
  image: { width: 72, height: 72, resizeMode: "contain" },
});
