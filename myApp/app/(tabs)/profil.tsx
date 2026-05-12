import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { globalStyles } from "@/styles/global";
import { authClient } from "@/lib/auth-client";
import { router } from "expo-router";

export default function profil() {
  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
  };
  return (
    <View style={globalStyles.screen}>
      <Text>Mon profil</Text>

      <Text style={styles.logout} onPress={handleLogout}>
        Se déconnecter
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  logout: {
    color: "red",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
  },
});
