import { NativeTabs } from "expo-router/unstable-native-tabs";
import { authClient } from "@/lib/auth-client";

export default function TabLayout() {
  const { data: session } = authClient.useSession();

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

