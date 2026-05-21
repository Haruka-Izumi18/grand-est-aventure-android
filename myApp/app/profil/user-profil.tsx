import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { globalStyles } from "@/styles/global";
import { authClient } from "@/lib/auth-client";
import { Redirect, useRouter } from "expo-router";
import { COLORS, FONT } from "@/styles/theme";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import EditProfil from "@/components/EditProfil";
import { useState } from "react";

export default function Profil() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [showEdit, setShowEdit] = useState(false);

  if (!session) {
    return <Redirect href="/profil" />;
  }

  return (
    <View style={globalStyles.screen}>
      <View style={styles.header}>
        {user?.name && (
          <Text style={[globalStyles.secondTitre, { textAlign: "right" }]}>
            Bonjour {user.name}
          </Text>
        )}

        <TouchableOpacity onPress={() => setShowEdit(true)} activeOpacity={0.7}>
          <FontAwesome name="user-circle-o" size={30} color={COLORS.primary} />
        </TouchableOpacity>
        <EditProfil visible={showEdit} onClose={() => setShowEdit(false)} />
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

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "flex-end",
  },
});
