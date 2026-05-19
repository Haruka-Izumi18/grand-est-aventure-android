import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router, Link } from "expo-router";
import { globalStyles } from '@/styles/global';

export default function Modal() {
  return (
    <View style={globalStyles.screen}>
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Connecte-toi ou inscris-toi pour commencer des aventures</Text>
      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => router.replace("/sign-in")}
      >
        <Text style={[globalStyles.buttonText]}>Connexion</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={globalStyles.buttonWhite}
        onPress={() => router.replace("/sign-up")}
      >
        <Text style={globalStyles.buttonTextGreen}>Inscription</Text>
      </TouchableOpacity>
    </View>
  
    <Text style={styles.footer}>Propulsé par 🚀 <Link aria-label='Loluweb' href='https://baladindices.fr/'>Loluweb·&#169;</Link> 2026 {"\n"}
     Tous droits réservés</Text>
    </View>
  );
}
const styles = StyleSheet.create ({
footer: {
  position: "absolute",
  width:'100%',
  bottom: 30,
  alignSelf: "center",
  textAlign: "center",
}
})
