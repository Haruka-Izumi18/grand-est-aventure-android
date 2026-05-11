import { Stack } from 'expo-router';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from "expo-router";
import { globalStyles } from '@/styles/global';
import { COLORS } from '@/styles/theme';

export default function RootLayout() {
  return (
    <Stack
    screenOptions={{
      headerShown: true,
      header: () => (
        <View style={styles.container}>
          <TouchableOpacity onPress={() => router.push('/')}>
            <Image
              source={require("@/assets/images/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            </TouchableOpacity>
            <Text style={globalStyles.title}>Balad&apos;indice</Text>
            </View>
      ),
    }}
    >
      <Stack.Screen name='(tabs)' />
      <Stack.Screen
      name="modal" options={{ presentation: "modal" }}
       />
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: 'center',
    width: '100%',
    backgroundColor: COLORS.background,
    marginTop: 30,
    paddingHorizontal: 20,
  },
  logo: { width: 70, height: 70 },
})