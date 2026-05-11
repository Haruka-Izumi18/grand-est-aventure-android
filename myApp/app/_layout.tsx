import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
      name="liste-adventure"
      options={{
        tabBarIcon: ({ color }) => <FontAwesome size={28} name='map' color={color} />
      }}
      />
      <Tabs.Screen
      name="question"
      options={{
        tabBarIcon: ({ color }) => <FontAwesome size={28} name='question' color={color} />
      }}
      />

      
   
   

      <Tabs.Screen
        name="modal"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}