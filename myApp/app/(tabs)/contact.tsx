import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
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
      <Text
        style={{
          fontFamily: FONT.regular,
          fontSize: FONT_SIZE.title,
          color: COLORS.primary,
        }}
      >
        Contacte nous
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>Ton nom</Text>
        <TextInput
          value={nom}
          onChangeText={setNom}
          style={globalStyles.input}
          placeholder="Jean Dupont"
        />

        <Text style={[styles.label, { marginTop: 12 }]}>Adresse e-mail</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={globalStyles.input}
          placeholder="jean@exemple.com"
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Text style={[styles.label, { marginTop: 12 }]}>Message</Text>
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
  card: {
    borderWidth: 1.5,
    borderColor: COLORS.green,
    borderRadius: 16,
    padding: 20,
    marginTop: 24,
    gap: 4,
  },
  label: {
    fontFamily: FONT.regular,
    color: COLORS.green,
    fontSize: FONT_SIZE.sm,
    fontWeight: "700",
  },
  textArea: {
    height: 120,
    paddingTop: 10,
  },
});
