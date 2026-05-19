import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs, router } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { COLORS } from "@/styles/theme";
import { authClient } from "@/lib/auth-client";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const { data: session } = authClient.useSession();
  const insets = useSafeAreaInsets();

  const tabConfig = [
    { name: "liste-adventure", icon: "compass" },
    { name: "question", icon: "question-circle-o" },
    { name: "contact", icon: "envelope-o" },
    {
      name: "connection",
      icon: "user",
      onPress: () =>
        session ? router.push("/profil") : router.push("/connection"),
    },
  ];

  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => (
        <View
          style={{
            flexDirection: "row",
            height: 60 + insets.bottom,
            paddingBottom: insets.bottom,
            backgroundColor: COLORS.white, // ← 文字列 "COLORS.white" を修正
            borderTopWidth: 1,
            borderTopColor: "#eee",
          }}
        >
          {tabConfig.map((tab) => {
            const focusedRoute = props.state.routes[props.state.index];
            const isFocused = focusedRoute.name === tab.name;
            const handlePress = tab.onPress
              ? tab.onPress
              : () => props.navigation.navigate(tab.name);

            return (
              <TouchableOpacity
                key={tab.name}
                style={{
                  flex: 1,
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={handlePress}
              >
                <FontAwesome
                  size={28}
                  name={tab.icon as any}
                  color={isFocused ? COLORS.green : COLORS.primary}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    >
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen name="liste-adventure" />
      <Tabs.Screen name="question" />
      <Tabs.Screen name="contact" />
      <Tabs.Screen name="connection" />
      <Tabs.Screen name="profil" options={{ href: null }} />
    </Tabs>
  );
}