import { View, Text, Button } from "react-native";
import { globalStyles } from "@/styles/global";
import { authClient } from "@/lib/auth-client";
import { Redirect, useRouter } from "expo-router";
import { FONT } from "@/styles/theme";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Profil() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  if (!session) {
    return <Redirect href="/profil" />;
  }

  return (
    <View style={globalStyles.screen}>

      <Button
        title="Modifier mon profil"
        onPress={() => router.push("/profil/edit-profil")}
      />
      <FontAwesome name="user-circle-o" size={24} color="black" />

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
        {user?.userBadges ? (
          <Text style={{ fontFamily: FONT.regular }}>{user.userBadges}</Text>
        ) : (
          <Text style={{ fontFamily: FONT.regular }}>
            Tu n&apos;as pas encore gagné de badge
          </Text>
        )}
      </View>
    </View>
  );
}
