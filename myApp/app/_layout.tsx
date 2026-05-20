import { useEffect } from 'react';
import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { authClient } from '@/lib/auth-client';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const { data: session } = authClient.useSession();

  const [loaded, error] = useFonts({
    SpaceMono_Regular: require('../assets/fonts/SpaceMono-Regular.ttf'),
    SpaceMono_Bold: require('../assets/fonts/SpaceMono-Bold.ttf'),
    SpaceMono_Italic: require('../assets/fonts/SpaceMono-Italic.ttf'),
    SpaceMono_BoldItalic: require('../assets/fonts/SpaceMono-BoldItalic.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Accueil</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="house.fill" md="home" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="aventures/index">
        <NativeTabs.Trigger.Label>Aventures</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="map.fill" md="explore" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="faq/index">
        <NativeTabs.Trigger.Label>FAQ</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="questionmark.circle.fill" md="help" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="contact/index">
        <NativeTabs.Trigger.Label>Contact</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="envelope.fill" md="mail" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name={session ? "profile/profil" : "profile/index"}>
        <NativeTabs.Trigger.Label>Compte</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="person.crop.circle.fill" md="person" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}

