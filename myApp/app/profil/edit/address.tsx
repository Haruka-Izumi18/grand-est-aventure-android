import { globalStyles } from "@/styles/global";
import { Text, View, TextInput, Alert, TouchableOpacity } from "react-native";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function Modal() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [city, setCity] = useState(user?.city || "");
  const [postalCode, setPostalCode] = useState(user?.postalCode || "");

  const handleSubmitAddress = async () => {
    try {
      await authClient.updateUser({
        city: city,
        postalCode: postalCode,
      });
      Alert.alert("Ville mise à jour");
    } catch (error) {
      console.log("Ereur", error);
      Alert.alert("Erreur serveur");
    }
  };

  return (
    <View style={globalStyles.screen}>
      <Text style={globalStyles.title}>Adresse</Text>
      <View style={globalStyles.input}>
        <Text style={globalStyles.label}>Ville</Text>
        <TextInput
          placeholder={user?.city || "Ville"}
          value={city}
          onChangeText={setCity}
          accessibilityLabel="ville"
          style={globalStyles.input}
          autoCapitalize="none"
        />
      </View>
    
      <View style={globalStyles.input}>
        <Text style={globalStyles.label}>Code postal</Text>
        <TextInput
          placeholder={user?.postalCode || "Code postal"}
          value={postalCode}
          onChangeText={setPostalCode}
          accessibilityLabel="Code postal"
          style={globalStyles.input}
          autoCapitalize="none"
        />
      </View>
      <TouchableOpacity
      style={globalStyles.button}
      onPress={handleSubmitAddress}
>
  <Text style={globalStyles.buttonText}>Modifier</Text>

      </TouchableOpacity>
    </View>
  );
}

