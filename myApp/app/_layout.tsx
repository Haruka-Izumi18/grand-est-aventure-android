import { View, Text, StyleSheet } from 'react-native';
import { router,  Stack } from "expo-router";
import { globalStyles } from '@/styles/global';
import { COLORS } from '@/styles/theme';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { authClient } from "@/lib/auth-client";


SplashScreen.preventAutoHideAsync();


export default function RootLayout() {
      const { data: session } = authClient.useSession();
      const user = session?.user;

    const [loaded, error] = useFonts({
        SpaceMono_Regular: require('../assets/fonts/SpaceMono-Regular.ttf'),
        SpaceMono_Bold: require('../assets/fonts/SpaceMono-Bold.ttf'),
        SpaceMono_Italic: require('../assets/fonts/SpaceMono-Italic.ttf'),
        SpaceMono_BoldItalic: require('../assets/fonts/SpaceMono-BoldItalic.ttf'),
    });

    useEffect(() => {
        if (loaded || error) SplashScreen.hideAsync();
    }, [loaded, error]);

    if (!loaded && !error) return null;
  return (
    <>
    <StatusBar translucent backgroundColor='transparent' style='dark' />
    <Stack
    screenOptions={{
      headerShown: true,
      header: () => (
        <View style={styles.container}>
          {user?.name && (
          <Text style={{textAlign: "right"}}>{user.name}</Text>
            )}
            </View>
      ),
    }}
    >
      <Stack.Screen name='(tabs)' />
    </Stack>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
    paddingTop: 40,
    gap: 5,
  },
  logo: { width: 70, height: 70 },
})