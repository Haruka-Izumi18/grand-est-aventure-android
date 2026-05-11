import { Link } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function Modal() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace("/sign-in")}
      >
        <Text style={styles.buttonText}>Connexion</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonWhite}
        onPress={() => router.replace("/sign-up")}
      >
        <Text style={styles.buttonTextGreen}>Inscription</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", gap: 16 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 24 },
  button: { backgroundColor: "green", padding: 16, borderRadius: 12, width: 200, alignItems: "center" },
  buttonText: { color: "white", fontSize: 18 },
  buttonWhite: { borderWidth: 2, borderColor: "green", padding: 16, borderRadius: 12, width: 200, alignItems: "center" },
  buttonTextGreen: { color: "green", fontSize: 18 },
});
