import { View, Text, TextInput, TouchableOpacity, Modal, Button } from "react-native";
import { globalStyles } from "@/styles/global";
import { authClient } from "@/lib/auth-client";
import { Redirect, useRouter } from "expo-router";
import { COLORS, FONT, FONT_SIZE } from "@/styles/theme";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function EditProfil({ visible, onClose }: Props) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  if (!session) {
    return <Redirect href="/profil" />;
  }
  const handleLogout = async () => {
    await authClient.signOut();
    router.replace("/profil");
  };
  if (!session) {
    return <Redirect href="/profil" />;
  }

  return (
    <Modal visible={visible} animationType="slide">
      <View style={globalStyles.screen}>
         <Button
          title="Router"
          onPress={() => router.push("/profil/user-profil")}
        />
        <View style={globalStyles.card}>
        <Text style={globalStyles.titleGreen}>Mon profil</Text>
        {user?.name && (
          <Text style={{ fontSize: 18, fontWeight: "600" }}>{user.name}</Text>
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
        <TouchableOpacity
          style={[globalStyles.buttonWhite, { alignSelf: "flex-end", width:180, paddingHorizontal: 5 }]}
        >
          <Text style={[globalStyles.buttonTextGreen, {fontSize: FONT_SIZE.sm, textAlign: "center"}]}>Modifier mon profil</Text>
        </TouchableOpacity>
        <Text style={globalStyles.logout} onPress={handleLogout}>
          Se déconnecter
        </Text>
      </View>
      </View>
    </Modal>
  );
}
