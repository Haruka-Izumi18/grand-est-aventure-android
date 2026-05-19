import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { globalStyles } from "@/styles/global";
import { COLORS, FONT, FONT_SIZE } from "@/styles/theme";

export default function Contact() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleEnvoyer = () => {
    console.log({ nom, email, message }); //--------------------------
  };

  return (
    <ScrollView style={globalStyles.screen}>
      <ImageBackground
        source={require("@/assets/images/Contact.webp")}
        style={styles.banner}
        resizeMode="cover"
      >
        <Text style={styles.bannerTitle}>
          Contacte nous
        </Text>
      </ImageBackground>

      <View style={styles.card}>
        <Text style={[globalStyles.label, { color: COLORS.green }]}>Ton nom</Text>
        <TextInput
          value={nom}
          onChangeText={setNom}
          style={globalStyles.input}
          placeholder="Jean Dupont"
        />

        <Text style={[globalStyles.label, { color: COLORS.green, marginTop: 12 }]}>Adresse e-mail</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={globalStyles.input}
          placeholder="jean@exemple.com"
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Text style={[globalStyles.label, { color: COLORS.green, marginTop: 12 }]}>Message</Text>
        <TextInput
          value={message}
          onChangeText={setMessage}
          style={[globalStyles.input, styles.textArea]}
          placeholder="Ton message..."
          multiline
          numberOfLines={5}
          textAlignVertical="top"
        />
      </View>

      <TouchableOpacity
        style={[globalStyles.button, { marginTop: 25, marginHorizontal: 60 }]}
        onPress={handleEnvoyer}
      >
        <Text style={globalStyles.buttonText}>Envoyer</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  banner: {
    height: 150,
    marginHorizontal: -30,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginBottom: 4,
  },
  card: {
    borderWidth: 1.5,
    borderColor: COLORS.green,
    borderRadius: 16,
    padding: 20,
    marginTop: 24,
    gap: 4,
  },
  bannerTitle: {
    fontFamily: FONT.regular,
    fontSize: FONT_SIZE.title,
    color: COLORS.white,
  },
  textArea: {
    height: 120,
    paddingTop: 10,
  },
});
