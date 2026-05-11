import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs, router } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';
import { globalStyles } from "@/styles/global";
import { COLORS } from '@/styles/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => (
        <View style={{ flexDirection: 'row', height: 60, backgroundColor: 'white', borderTopWidth: 1, borderTopColor: '#eee' }}>
          {props.state.routes
            .filter((route) => ['index', 'liste-adventure', 'question', 'contact'].includes(route.name))
            .map((route) => {
              const icons: Record<string, string> = {
                index: 'home',
                'liste-adventure': 'map',
                question: 'question',
                contact: 'envelope',
              };
              const focusedRoute = props.state.routes[props.state.index];
              const isFocused = focusedRoute.name === route.name;
            return (
              <TouchableOpacity
                key={route.key}
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                onPress={() => props.navigation.navigate(route.name)}
              >
                <FontAwesome size={28} name={icons[route.name] as any} color={isFocused ? 'blue' : COLORS.primary} />
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => router.push("/modal")}
          >
            <FontAwesome size={28} name="user" color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      )}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="liste-adventure" />
      <Tabs.Screen name="question" />
      <Tabs.Screen name="contact" />
      <Tabs.Screen
  name="sign-in"
  options={{ href: null }}
/>
<Tabs.Screen
  name="sign-up"
  options={{ href: null }}
/>
    </Tabs>
  );
}