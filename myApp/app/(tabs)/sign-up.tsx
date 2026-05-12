import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { authClient } from "@/lib/auth-client";
import { globalStyles } from "@/styles/global";
import { router } from "expo-router";
import * as WebBrowser from 'expo-web-browser';
import { useEffect } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { COLORS } from "@/styles/theme";

export default function SignUp() {
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
      <Text style={globalStyles.title}>
        Inscris-toi pour commencer l’aventure !
      </Text>
      <View style={styles.card}>
      <Text style={globalStyles.label}>Ton nom?</Text>
      <TextInput
        placeholder="Nom"
        value={name}
        onChangeText={setName}
        accessibilityLabel="Nom"
        style={globalStyles.input}
        autoCapitalize="none"
      />
      <Text style={[globalStyles.label, { marginTop: 20 }]}>Ton email?</Text>
      <TextInput
        placeholder="Email"
        value={email}
        accessibilityLabel="Adresse email"
        onChangeText={setEmail}
        style={globalStyles.input}
        autoCapitalize="none"
      />
      <Text style={[globalStyles.label, { marginTop: 20 }]}>Mot de passe?</Text>
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
    <FontAwesome name={showPassword ? "eye" : "eye-slash"} size={20} color="gray" />
  </TouchableOpacity>
      </View>
      <Text style={[globalStyles.label, { marginTop: 20 }]}>Confirme le mot de passe?</Text>
      <View style={styles.showInput}>
      <TextInput
        placeholder="Confirme le mot de passe"
        value={confirmPassword}
        accessibilityLabel="Confirmation du mot de passe"
        onChangeText={setConfirmPassword}
        style={globalStyles.input}
        autoCapitalize="none"
        secureTextEntry={!showConfirmPassword}
      />
      <TouchableOpacity
    style={styles.eyeIcon}
    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
  >
    <FontAwesome name={showConfirmPassword ? "eye" : "eye-slash"} size={20} color="gray" />
    </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => {
          handleSubmit();
        }}
        style={[globalStyles.button, { marginTop: 20 }]}
      >
        <Text style={globalStyles.buttonText}>Inscription</Text>
      </TouchableOpacity>

      <TouchableOpacity
    style={[styles.googleButton, {marginTop: 20}]}
    onPress={handleGoogleSignUp}
    disabled={loading}
>
    <Image
        source={require("@/assets/images/chercher.png")}
        style={styles.socialIcon}
        resizeMode="contain"
    />
    <Text style={styles.googleButtonText}>S&apos;inscrire avec Google</Text>
</TouchableOpacity>

<TouchableOpacity
    style={[styles.facebookButton, {marginTop: 20}]}
    onPress={handleFacebookSignUp}
    disabled={loading}
>
    <Image
        source={require("@/assets/images/facebook(2).png")}
        style={styles.facebookIcon}
        resizeMode="contain"
    />
    <Text style={styles.socialButtonText}>S&apos;inscrire avec Facebook</Text>
</TouchableOpacity>

<TouchableOpacity
    style={[styles.discordButton, {marginTop: 20}]}
    onPress={handleDiscordSignUp}
    disabled={loading}
>
    <Image
        source={require("@/assets/images/discorde.png")}
        style={styles.socialIcon}
        resizeMode="contain"
    />
    <Text style={styles.socialButtonText}>S&apos;inscrire avec Discord</Text>
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
    position: 'relative',
    width: '100%',
  },
  eyeIcon: {
    position: 'absolute',
    right: 14,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
  googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        width: '100%',
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: '#ddd',
        backgroundColor: 'white',
    },
    googleButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    socialIcon: {
      width: 25,
      height: 25,
    },
    facebookButton: {
      flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        width: '100%',
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: '#ddd',
        backgroundColor: 'blue',
    },
    socialButtonText: {
      fontSize: 16,
        fontWeight: '600',
        color: 'white',
    },
    facebookIcon: {
      width: 25,
      height: 25,
      color: "white"
    },
    discordButton: {
      flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        width: '100%',
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: '#ddd',
        backgroundColor: 'violet',
    },
    
});
