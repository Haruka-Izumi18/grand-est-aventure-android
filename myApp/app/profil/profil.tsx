import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { globalStyles } from "@/styles/global";
import { authClient } from "@/lib/auth-client";
import { router } from "expo-router";
import { COLORS, FONT, FONT_SIZE } from "@/styles/theme";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { ThemedText } from "@/components/themed-text";
import Badges from "@/components/badges";

export default function profil() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // Console.log

  const mockBadges = [
    { id: "1", earnedAt: "2026-01-15", badge: { name: "Explorateur" } },
    { id: "2", earnedAt: "2026-03-10", badge: { name: "Marcheur" } },
    { id: "3", earnedAt: "2026-04-01", badge: { name: "Rapide" } },
    { id: "4", earnedAt: null,         badge: { name: "TraqueurLégendaire" } },
  ];

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
  };

  return (
    <View style={globalStyles.screen}>
      <View style={globalStyles.card}>
        <Text style={globalStyles.titleGreen}>Mon profil</Text>
        {user?.name && (
          <ThemedText style={{ fontSize: 18, fontWeight: "600" }}>
            {user.name}
          </ThemedText>
        )}
        <View style={{ flexDirection: "row", gap: 5 }}>
          <FontAwesome6 name="location-dot" size={16} color={COLORS.primary} />
          {user?.city ? (
            <Text style={{ fontFamily: FONT.regular }}>{user.city}</Text>
          ) : (
            <Text style={{ fontFamily: FONT.regular }}>
              Ta ville non renseignée...
            </Text>
          )}
        </View>
        <View style={{ flexDirection: "row", gap: 5 }}>
          <FontAwesome name="envelope-o" size={16} color={COLORS.primary} />
          {user?.email ? (
            <Text style={{ fontFamily: FONT.regular }}>{user.email}</Text>
          ) : (
            <Text style={{ fontFamily: FONT.regular }}>
              Ton email n&apos;est pas renseignée...
            </Text>
          )}
        </View>
        <TouchableOpacity style={[style.button, { alignSelf: "flex-end" }]}>
          <Text style={[style.buttonText]}>Modifier mon profil</Text>
        </TouchableOpacity>
        <Text style={globalStyles.logout} onPress={handleLogout}>
          Se déconnecter
        </Text>
      </View>
      <View style={globalStyles.card}>
        <Text style={globalStyles.titleGreen}>Histoire des aventures</Text>
        {user?.adventureStepValidations ? (
          <Text style={{ fontFamily: FONT.regular }}>
            {user.adventureStepValidations}
          </Text>
        ) : (
          <Text style={{ fontFamily: FONT.regular }}>
            Tu n&apos;as pas encore fini d&apos;aventure
          </Text>
        )}
      </View>
      <View style={globalStyles.card}>
        <Text style={globalStyles.titleGreen}>Collection des badges</Text>
        <Badges badges={mockBadges} />
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  button: {
    backgroundColor: COLORS.green,
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  buttonText: {
    fontFamily: FONT.bold,
    color: COLORS.white,
    fontSize: FONT_SIZE.xs,
  },
});
