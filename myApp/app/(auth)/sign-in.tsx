import { useState  } from "react";
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator,
} from 'react-native';
import { router, Link } from "expo-router";
import { authClient } from "@/lib/auth-client";

export default function SignIn(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

const handleEmailSignIn = async () => {
    setError("");
    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message ?? 'Connexion échouée');
    } else {
      router.replace('/(tabs)');
    }
  };


  return (
    <View>
      <Text>Balad&apos;indice </Text>
  <KeyboardAvoidingView
  style={styles.container}
  behavior={Platform.OS === "ios" ? "padding" : undefined}
  >
<Text style={styles.title}>Connexion</Text>
{error ? <Text style={styles.error}>{error}</Text> : null }
<TextInput
        style={styles.input}
        placeholder="Adresse e-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        autoComplete="email"
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoComplete="password"
      />

      <TouchableOpacity style={styles.button} onPress={handleEmailSignIn} disabled={loading}>
        {loading
          ? <ActivityIndicator color="#fff" />
          : <Text style={styles.buttonText}>Se connecter</Text>
        }
      </TouchableOpacity>
</KeyboardAvoidingView>
</View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, gap: 12 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 8 },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
    padding: 12, fontSize: 16,
  },
  button: {
    backgroundColor: '#2563eb', borderRadius: 8,
    padding: 14, alignItems: 'center',
  },
  googleButton: { backgroundColor: '#ea4335' },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  error: { color: '#dc2626', fontSize: 14 },
  link: { textAlign: 'center', color: '#2563eb', marginTop: 8 },
});