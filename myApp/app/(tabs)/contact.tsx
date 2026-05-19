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
import { FONT } from "@/styles/theme";

const initialState ={
  name: "",
  email: "",
  message: "",
  status: "idle", //| "sending" | "sent">("idle"),
  nameError: "",
  emailError: "",
  messageError:"",
};

export default function ContactScreen(){
  const [state, setState] = useState(initialState)

  const { name, email, message, status, nameError, emailError, messageError } = state;

  useFocusEffect(
    useCallback(() => {
      setState(initialState);
    }, [])
  );

  const handleSubmit = async () => {

    let hasError = false;
    let errors = { 
      nameError:"",
      emailError:"",
      messageError:"",
    };

    if (!name.trim()) {
      errors.nameError = "Merci d'indiquer ton nom :).";
      hasError = true;
    }

    if (!email.trim()) {
      errors.emailError= "Une adresse e-mail est requise.";
      hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.emailError="L'adresse e-mail n'est pas valide.";
      hasError = true;
    }

    if (!message.trim()) {
      errors.messageError = "Le message ne peut pas être vide.";
      hasError = true;
    }

    if (hasError) {
      setState((prevState) => ({
        ...prevState,
        ...errors,
      }));
      return;
    }

    setState((prevState) => ({ ...prevState, status: "sending" }));

    const webhookUrl = "https://discord.com/api/webhooks/1506209222885638145/xky7EmUq8T67IxqbyCneaNvlSuyyOpL0GMD_tPNPkG-ZcoQ112G_q7A_-m_rejhL_nAV";


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

        setState((prevState) => ({
          ...prevState,
          name:"",
          email:"",
          message:"",
          status:"",
        }))

        setTimeout(() => {
          setState((prevState) => ({ ...prevState, status: "idle" }));
        },3000);
        } else {
          setState((prevState) => ({ ...prevState, status: "idle" }));
          Alert.alert("Erreur", "Le serveur Discord a renvoyé une erreur.");
        }
      } catch (error) {
        console.error(error);
        setState((prevState) => ({ ...prevState, status: "idle" }));
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
          onChangeText={(v) => 
            setState((prevState) => ({ ...prevState, name: v, nameError:""}))}
            style={[globalStyles.input, nameError ? styles.inputError : null]}
          placeholder="Jean Dupont"
        />
        {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

        <Text
          style={[globalStyles.titleGreen]}
        >
          Adresse e-mail
        </Text>
        <TextInput
          value={email}
          onChangeText={(v) =>
            setState((prevState) => ({ ...prevState, email: v, emailError:""}))}
            style={[globalStyles.input, emailError ? styles.inputError : null]}
            placeholder="jean@exemple.com"
            autoCapitalize="none"
            keyboardType="email-address"
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        <Text
          style={[globalStyles.titleGreen]}
        >
          Message
        </Text>
        <TextInput
          value={message}
          onChangeText={(v) =>
            setState((prevState) => ({ ...prevState, message: v, messageError:""}))}
            style={[globalStyles.input, styles.textArea, messageError ? styles.inputError : null]}
            placeholder="Ton message..."
            multiline
            numberOfLines={4}
            textAlignVertical="top"
        />
        {messageError ? <Text style={styles.errorText}>{messageError}</Text> : null}
      </View>

      <TouchableOpacity
        style={[
          globalStyles.button,
          { marginTop: 16, marginBottom: 20, alignSelf: "center" },
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
  inputError: {
    borderColor: "#e53935",
  },
  errorText: {
    fontFamily: FONT.regular,
    color: "#e53935",
    fontSize: 12,
    marginTop: 3,
    marginLeft: 4,
  },
  textArea: {
    height: 90,
    paddingTop: 10,
  },
});
