import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { authClient } from "@/lib/auth-client";
import { globalStyles } from "@/styles/global";
import { router } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { COLORS } from "@/styles/theme";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    const { error } = await authClient.signIn.email({
      email,
      password,
    });
    if (error) {
      console.log("Error", error);
    } else {
      router.push("/profil");
    }
  };

  const handleForgetPassword = async () => {
    if (!email) {
      Alert.alert("Error", "Veuillez saisir votre adresse e-mail.");
      return;
    }
    const { error } = await authClient.requestPasswordReset({
      email,
      redirectTo: "https://baladindices.fr/reset-password",
    });
    if (error) {
      Alert.alert("Erreur", error.message ?? "Impossible d'envoyer l'e-mail.");
    } else {
      Alert.alert(
        "Email envoyé",
        "Vérifie ta boîte mail pour réinitialiser ton mot de passe.",
      );
    }
  };

  return (
    <View style={globalStyles.screen}>
      <Text style={globalStyles.title}>
        Connecte-toi pour commencer l’aventure !
      </Text>
      <View style={styles.card}>
        <Text style={globalStyles.label}>Ton email?</Text>
        <TextInput
          placeholder="m@exemple.com"
          value={email}
          accessibilityLabel="Adresse email"
          onChangeText={setEmail}
          style={globalStyles.input}
          autoCapitalize="none"
        />
        <Text style={[globalStyles.label, { marginTop: 20 }]}>
          Ton mot de passe?
        </Text>
        <View style={styles.showInput}>
          <TextInput
            placeholder="Mot de passe"
            value={password}
            accessibilityLabel="Mot de passe"
            onChangeText={setPassword}
            style={globalStyles.input}
            autoCapitalize="none"
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <FontAwesome
              name={showPassword ? "eye" : "eye-slash"}
              size={20}
              color="gray"
            />
          </TouchableOpacity>
        </View>
         <TouchableOpacity onPress={handleForgetPassword}>
        <Text
          style={{
            color: "gray",
            fontSize: 15,
            fontWeight: "600",
            textDecorationLine: "underline",
          }}
        >
          Mot de passe oublié ?
        </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleLogin();
          }}
          style={[globalStyles.button, { marginTop: 20 }]}
        >
          <Text style={globalStyles.buttonText}>Connexion</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  showInput: {
    position: "relative",
    width: "100%",
  },
  eyeIcon: {
    position: "absolute",
    right: 14,
    top: "50%",
    transform: [{ translateY: -10 }],
  },
});
