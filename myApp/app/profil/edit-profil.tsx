import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { globalStyles } from "@/styles/global";
import { authClient } from "@/lib/auth-client";
import { Redirect, router } from "expo-router";
import { COLORS, FONT } from "@/styles/theme";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';


export default function editProfil (){
    const { data: session } = authClient.useSession();
    const user = session?.user;


    const handleLogout = async () => {
        await authClient.signOut();
        router.replace("/profil");
    };

    if (!session) {
        return <Redirect href="/profil" />;
    }

    return (
        <View style={globalStyles.screen} >
            <View style={globalStyles.card}>
                <Text style={globalStyles.titleGreen}>Mon profil</Text>
                {user?.name && (
                    <Text style={{ fontSize: 18, fontWeight: "600" }}>{user.name}</Text>
                )}
                <View style={{ flexDirection: "row", gap: 5 }}>
                    <FontAwesome6 name="location-dot" size={16} color={COLORS.primary} />
                    {user?.city ? (
                        <Text style={{ fontFamily: FONT.regular}}>{user.city}</Text>
                    ) : (
                        <Text style={{ fontFamily: FONT.regular }} >Ta ville non renseignée...</Text>
                    )}
                </View>
                <View style={{ flexDirection: "row", gap: 5 }}>
                    <FontAwesome name="envelope-o" size={16} color={COLORS.primary} />
                    {user?.email ?
                        <Text style={{ fontFamily: FONT.regular}}>{user.email}</Text>
                        :
                        <Text style={{ fontFamily: FONT.regular}}>Ton email n&apos;est pas renseignée...</Text>
                    }
                </View>
                <TouchableOpacity style={[globalStyles.button, {alignSelf: "flex-end", }]}>
                    <Text style={[globalStyles.buttonText, ]}>Modifier mon profil</Text>
                </TouchableOpacity>
                <Text style={globalStyles.logout} onPress={handleLogout}>
                    Se déconnecter
                </Text>
            </View>
            </View>
    );
};