import { Link } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { globalStyles } from '@/styles/global';

export default function Modal() {
  return (
    <View style={globalStyles.screen}>
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Connecte-toi ou inscris-toi pour commencer des aventures</Text>
      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => router.replace("/sign-in")}
      >
        <Text style={globalStyles.buttonText}>Connexion</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={globalStyles.buttonWhite}
        onPress={() => router.replace("/sign-up")}
      >
        <Text style={globalStyles.buttonTextGreen}>Inscription</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
}

