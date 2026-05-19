import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { router, Link } from "expo-router";
import { globalStyles } from "@/styles/global";
import { authClient } from "@/lib/auth-client";
import * as WebBrowser from "expo-web-browser";
import { useEffect } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    WebBrowser.warmUpAsync();
    return () => {
      WebBrowser.coolDownAsync();
    };
  }, []);

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

  const handleGoogleLogin = async () => {
    setLoading(true);
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/profil",
    });
    setLoading(false);
    if (error) {
      Alert.alert(
        "Erreur",
        error.message ?? "Impossible de se connecter avec Google.",
      );
    }
  };

  const handleFacebookLogin = async () => {
    setLoading(true);
    const { error } = await authClient.signIn.social({
      provider: "facebook",
      callbackURL: "/profil",
    });
    setLoading(false);
    if (error) {
      Alert.alert(
        "Erreur",
        error.message ?? "Impossible de se connecter avec Facebook.",
      );
    }
  };

  const handleDiscordLogin = async () => {
    setLoading(true);
    const { error } = await authClient.signIn.social({
      provider: "discord",
      callbackURL: "/profil",
    });
    setLoading(false);
    if (error) {
      Alert.alert(
        "Erreur",
        error.message ?? "Impossible de se connecter avec Discord.",
      );
    }
  };

  return (
    <View style={globalStyles.screen}>
      <View style={globalStyles.container}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: 40,
            }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Text style={[globalStyles.secondTitre, { textAlign: "center" }]}>
              Connecte-toi pour commencer {"\n"}des aventures !
            </Text>
            <View style={globalStyles.card}>
              <View style={styles.formInput}>
              <Text style={globalStyles.label}>Ton email?</Text>
              <TextInput
                placeholder="m@exemple.com"
                value={email}
                accessibilityLabel="Adresse email"
                onChangeText={setEmail}
                style={globalStyles.input}
                autoCapitalize="none"
              />
              </View>
               <View style={styles.formInput}>
              <Text style={globalStyles.label}>
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
              </View>

              <TouchableOpacity onPress={handleForgetPassword}>
                <Text
                  style={{
                    color: "gray",
                    fontSize: 15,
                    fontWeight: "600",
                    textDecorationLine: "underline",
                    textAlign: "right",
                  }}
                >
                  Mot de passe oublié ?
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleLogin();
                }}
                style={[
                  globalStyles.button,
                  { marginTop: 15, alignSelf: "center" },
                ]}
              >
                <Text style={globalStyles.buttonText}>Connexion</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.googleButton, { marginTop: 15 }]}
                onPress={handleGoogleLogin}
                disabled={loading}
              >
                <Image
                  source={require("@/assets/images/chercher.png")}
                  style={styles.socialIcon}
                  resizeMode="contain"
                />
                <Text style={styles.googleButtonText}>
                  Se connecter avec Google
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.facebookButton, { marginTop: 5 }]}
                onPress={handleFacebookLogin}
                disabled={loading}
              >
                <FontAwesome name="facebook-f" size={24} color="white" />
                <Text style={styles.socialButtonText}>
                  Se connecter avec Facebook
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.discordButton, { marginTop: 5 }]}
                onPress={handleDiscordLogin}
                disabled={loading}
              >
                <FontAwesome6 name="discord" size={24} color="white" />
                <Text style={styles.socialButtonText}>
                  Se connecter avec Discord
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={[globalStyles.secondTitre, { marginTop: 30 }]}>
                    Tu n&apos; pas encore ton compte?{"\n"} Inscris toi!
            </Text>
            <TouchableOpacity
              style={[globalStyles.buttonWhite, { alignSelf: "center" }]}
              onPress={() => router.replace("/sign-up")}
            >
              <Text style={globalStyles.buttonTextGreen}>Inscription</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  formInput: {
    paddingBottom: 10,
  },
  showInput: {
    position: "relative",
    width: "100%",
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: "60%",
    transform: [{ translateY: -10 }],
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#ddd",
    backgroundColor: "white",
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
  facebookButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: "#1877f2",
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  discordButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: "#5865f2",
  },
});
