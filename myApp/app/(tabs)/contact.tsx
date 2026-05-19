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

import { Alert } from 'react-native';



export default function Contact() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");


  const handleSubmit = async () => {

  if (!name.trim() || !email.trim() || !message.trim()) {
    Alert.alert("Attention", "Veuillez remplir tous les champs.");
    return;
  }

  setStatus("sending");

  const webhookUrl = 'https://discord.com/api/webhooks/1506209222885638145/xky7EmUq8T67IxqbyCneaNvlSuyyOpL0GMD_tPNPkG-ZcoQ112G_q7A_-m_rejhL_nAV';
  const payload = {
    embeds: [{
      title: "Nouveau contact client",
      color: 5814783,
      fields: [
        { name: "Nom / Entreprise", value: name, inline: true },
        { name: "Adresse Email", value: email, inline: true },
        { name: "Message", value: message }
      ],
      timestamp: new Date().toISOString()
    }]
  };

  try {

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      setStatus("sent");
      setName('');
      setEmail('');
      setMessage('');
    } else {
      setStatus("idle");
      Alert.alert("Erreur", "Le serveur Discord a renvoyé une erreur.");
    }
  } catch (error) {
    console.error(error);
    setStatus("idle");
    Alert.alert("Erreur réseau", "Impossible de joindre le service de contact.");
  }
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
          value={name}
          onChangeText={setName}
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
        style={[globalStyles.button, { marginTop: 25, marginHorizontal: 60 }, status === "sending" && { opacity: 0.6 }]}
        onPress={handleSubmit}
        disabled={status !== "idle"}
      >
        <Text style={globalStyles.buttonText}>
          {status === "sending" ? "Envoi en cours..." : status === "sent" ? "Message envoyé" : "Envoyer"}
        </Text>
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
