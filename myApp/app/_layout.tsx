import { Stack } from 'expo-router';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from "expo-router";
import { globalStyles } from '@/styles/global';
import { COLORS } from '@/styles/theme';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

    const [loaded]= useFonts({
        'SpaceMono_700Bold': require('../assets/fonts/SpaceMono-Bold.ttf')
    })

    useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;
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
    fontFamily: 'SpaceMono',
    flexDirection: "row",
    alignItems: 'center',
    width: '100%',
    backgroundColor: COLORS.background,
    marginTop: 30,
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 5,
  },
  logo: { width: 70, height: 70 },
})