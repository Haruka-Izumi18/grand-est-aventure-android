import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { authClient } from '@/lib/auth-client';
import { router } from 'expo-router';

export default function HomeScreen() {
  const { data: session } = authClient.useSession();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.replace('/(auth)');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue 👋</Text>
      <Text style={styles.name}>{session?.user.name ?? ''}</Text>
      <Text style={styles.email}>{session?.user.email ?? ''}</Text>
      <TouchableOpacity style={styles.btn} onPress={handleSignOut}>
        <Text style={styles.btnText}>Se déconnecter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12, backgroundColor: '#F5F0E8' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#2C1A0E' },
  name: { fontSize: 18, color: '#2C1A0E' },
  email: { fontSize: 14, color: '#555' },
  btn: { marginTop: 24, backgroundColor: '#dc2626', borderRadius: 12, padding: 14, paddingHorizontal: 32 },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
