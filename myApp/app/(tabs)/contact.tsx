import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Alert,
} from "react-native";
import { globalStyles } from "@/styles/global";
import { COLORS, FONT, FONT_SIZE } from "@/styles/theme";

export default function Contact() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const [nameError, setNameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [messageError, setMessageError] = useState<string>("");

  useFocusEffect(
    useCallback(() => {
      setName("");
      setEmail("");
      setMessage("");
      setStatus("idle");
      setNameError("");
      setEmailError("");
      setMessageError("");
    }, [])
  );

  const handleSubmit = async () => {
    let hasError = false;

    if (!name.trim()) {
      setNameError("Merci d'indiquer ton nom :).");
      hasError = true;
    }

    if (!email.trim()) {
      setEmailError("Une adresse e-mail est requise.");
      hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setEmailError("L'adresse e-mail n'est pas valide.");
      hasError = true;
    }

    if (!message.trim()) {
      setMessageError("Le message ne peut pas être vide.");
      hasError = true;
    }

    if (hasError) return;

    setStatus("sending");

    const webhookUrl =
      "https://discord.com/api/webhooks/1506209222885638145/xky7EmUq8T67IxqbyCneaNvlSuyyOpL0GMD_tPNPkG-ZcoQ112G_q7A_-m_rejhL_nAV";
    const payload = {
      embeds: [
        {
          title: "Nouveau contact client",
          color: 5814783,
          fields: [
            { name: "Nom / Entreprise", value: name, inline: true },
            { name: "Adresse Email", value: email, inline: true },
            { name: "Message", value: message },
          ],
          timestamp: new Date().toISOString(),
        },
      ],
    };

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatus("sent");
        setName("");
        setEmail("");
        setMessage("");
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("idle");
        Alert.alert("Erreur", "Le serveur Discord a renvoyé une erreur.");
      }
    } catch (error) {
      console.error(error);
      setStatus("idle");
      Alert.alert(
        "Erreur réseau",
        "Impossible de joindre le service de contact.",
      );
    }
  };

  return (
    <ScrollView style={globalStyles.screen}>
      <ImageBackground
        source={require("@/assets/images/Contact.webp")}
        style={styles.banner}
        resizeMode="cover"
      >
        <Text style={globalStyles.bannerTitle}>Contacte nous</Text>
      </ImageBackground>

      <View style={globalStyles.card}>
        <Text style={[globalStyles.titleGreen]}>
          Ton nom
        </Text>
        <TextInput
          value={name}
          onChangeText={(v) => { setName(v); setNameError(""); }}
          style={[globalStyles.input, nameError ? globalStyles.inputError : null]}
          placeholder="Jean Dupont"
        />
        {nameError ? <Text style={globalStyles.errorText}>{nameError}</Text> : null}

        <Text
          style={[globalStyles.titleGreen]}
        >
          Adresse e-mail
        </Text>
        <TextInput
          value={email}
          onChangeText={(v) => { setEmail(v); setEmailError(""); }}
          style={[globalStyles.input, emailError ? globalStyles.inputError : null]}
          placeholder="jean@exemple.com"
          autoCapitalize="none"
          keyboardType="email-address"
        />
        {emailError ? <Text style={globalStyles.errorText}>{emailError}</Text> : null}

        <Text
          style={[globalStyles.titleGreen]}
        >
          Message
        </Text>
        <TextInput
          value={message}
          onChangeText={(v) => { setMessage(v); setMessageError(""); }}
          style={[globalStyles.input, globalStyles.textArea, messageError ? globalStyles.inputError : null]}
          placeholder="Ton message..."
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
        {messageError ? <Text style={globalStyles.errorText}>{messageError}</Text> : null}
      </View>

      <TouchableOpacity
        style={[
          globalStyles.button,
          { marginTop: 16, marginHorizontal: 60, marginBottom: 20 },
          status === "sending" && { opacity: 0.6 },
        ]}
        onPress={handleSubmit}
        disabled={status !== "idle"}
      >
        <Text style={globalStyles.buttonText}>
          {status === "sending"
            ? "Envoi en cours..."
            : status === "sent"
              ? "Message envoyé"
              : "Envoyer"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  banner: {
    height: 120,
    marginHorizontal: -30,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginBottom: 4,
  },
});
