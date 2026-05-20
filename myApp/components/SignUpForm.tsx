import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { authClient } from "@/lib/auth-client";
import { globalStyles } from "@/styles/global";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

interface SignUpFormProps {
  onBackPress: () => void;
}

export default function SignUpForm({ onBackPress }: SignUpFormProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    WebBrowser.warmUpAsync();
    return () => {
      WebBrowser.coolDownAsync();
    };
  }, []);

  const handleSubmit = async () => {
    if (password != confirmPassword) {
      Alert.alert("Erreur", "Les mots de passe ne correspondent pas");
      return;
    }
    const { error } = await authClient.signUp.email({
      email,
      password,
      name,
    });
    if (error) {
      Alert.alert(
        "Error",
        "Une erreur est survenue. Vérifie tes informations.",
      );
    } else {
      router.push("/");
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/profil",
    });
    setLoading(false);
    if (error) {
      Alert.alert("Erreur", error.message ?? "Impossible de s'inscrire avec Google.");
    }
  };

  const handleFacebookSignUp = async () => {
    setLoading(true);
    const { error } = await authClient.signIn.social({
      provider: "facebook",
      callbackURL: "/profil",
    });
    setLoading(false);
    if (error) {
      Alert.alert("Erreur", error.message ?? "Impossible de s'inscrire avec Facebook.");
    }
  };

  const handleDiscordSignUp = async () => {
    setLoading(true);
    const { error } = await authClient.signIn.social({
      provider: "discord",
      callbackURL: "/profil",
    });
    setLoading(false);
    if (error) {
      Alert.alert("Erreur", error.message ?? "Impossible de s'inscrire avec Discord.");
    }
  };

  return (
    <View style={globalStyles.screen}>
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
          <Text style={globalStyles.secondTitre}>
            Inscris-toi pour commencer{"\n"} des aventure !
          </Text>
          <View style={globalStyles.card}>
            <View style={styles.formInput}>
              <Text style={globalStyles.label}>Ton nom?</Text>
              <TextInput
                placeholder="Nom"
                value={name}
                onChangeText={setName}
                accessibilityLabel="Nom"
                style={globalStyles.input}
                autoCapitalize="none"
              />
            </View>
            <View style={styles.formInput}>
              <Text style={globalStyles.label}>Ton email?</Text>
              <TextInput
                placeholder="Email"
                value={email}
                accessibilityLabel="Adresse email"
                onChangeText={setEmail}
                style={globalStyles.input}
                autoCapitalize="none"
              />
            </View>
            <View style={styles.formInput}>
              <Text style={globalStyles.label}>Mot de passe?</Text>
              <View style={styles.showInput}>
                <TextInput
                  placeholder="Mot de Passe"
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

            <View style={styles.formInput}>
              <Text style={globalStyles.label}>Confirme ton mot de passe?</Text>
              <View style={styles.showInput}>
                <TextInput
                  placeholder="Confirmer le mot de passe"
                  value={confirmPassword}
                  accessibilityLabel="Confirmer le mot de passe"
                  onChangeText={setConfirmPassword}
                  style={globalStyles.input}
                  autoCapitalize="none"
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <FontAwesome
                    name={showConfirmPassword ? "eye" : "eye-slash"}
                    size={20}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              onPress={handleSubmit}
              style={[
                globalStyles.button,
                { marginTop: 15, alignSelf: "center" },
              ]}
            >
              <Text style={globalStyles.buttonText}>Inscription</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.googleButton, { marginTop: 15 }]}
              onPress={handleGoogleSignUp}
              disabled={loading}
            >
              <Image
                source={require("@/assets/images/chercher.png")}
                style={styles.socialIcon}
                resizeMode="contain"
              />
              <Text style={styles.googleButtonText}>
                S&apos;inscrire avec Google
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.facebookButton, { marginTop: 5 }]}
              onPress={handleFacebookSignUp}
              disabled={loading}
            >
              <FontAwesome name="facebook-f" size={24} color="white" />
              <Text style={styles.socialButtonText}>
                S&apos;inscrire avec Facebook
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.discordButton, { marginTop: 5 }]}
              onPress={handleDiscordSignUp}
              disabled={loading}
            >
              <FontAwesome6 name="discord" size={24} color="white" />
              <Text style={styles.socialButtonText}>
                S&apos;inscrire avec Discord
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={[globalStyles.secondTitre, { marginTop: 30 }]}>
            Tu as déjà un compte?{"\n"} Connecte-toi!
          </Text>
          <TouchableOpacity
            style={[globalStyles.buttonWhite, { alignSelf: "center", marginTop: 20 }]}
            onPress={onBackPress}
          >
            <Text style={globalStyles.buttonTextGreen}>Connexion</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "white",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    alignSelf: "flex-start",
  },
  backButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
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
