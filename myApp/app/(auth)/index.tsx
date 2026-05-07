import {
    View,
    Text,
    SafeAreaView,
    Image,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import { router } from 'expo-router';
import { authClient } from '@/lib/auth-client';

export default function AuthLanding(){

return(
    <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
           <View style={styles.logoContainer}>
            <Image
            source={require('@/assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
            />
            </View> 
        </View>
        <Text style={styles.tagline}>
          Connecte-toi ou inscris-toi{'\n'}pour commencer des aventures
        </Text>
        <View style={styles.spacer} />

        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.btnInscription}
            onPress={() => router.push('/(auth)/sign-up')}
            activeOpacity={0.85}
          >
            <Text style={styles.btnInscriptionText}>Inscription</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnConnexion}
            onPress={() => router.push('/(auth)/sign-in')}
            activeOpacity={0.85}
          >
            <Text style={styles.btnConnexionText}>Connexion</Text>
          </TouchableOpacity>
          </View>
    </SafeAreaView>
)
}

const BG = '#fffaeb';
const GREEN = '#68a618';
const BTN_RADIUS = 12;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG, paddingHorizontal: 24, },
  container: {
    flex: 1, backgroundColor: BG,
    paddingHorizontal: 32, paddingTop: 48, paddingBottom: 24,
    alignItems: 'center',
  },
  logoContainer: { alignItems: 'center', marginBottom: 28 },
  logo: { width: 200, height: 200 },
  tagline: {
    fontFamily: 'SpaceMono_700Bold',
    fontSize: 22, fontWeight: '800', textAlign: 'center',
    color: '#2C1A0E',
    lineHeight: 32, letterSpacing: 0.2,
  },
  spacer: { flex: 1 },
  buttons: { width: '100%', gap: 12, marginBottom: 24 },
  btnInscription: {
    backgroundColor: GREEN, borderRadius: BTN_RADIUS,
    paddingVertical: 16, alignItems: 'center',
  },
  btnInscriptionText: { color: '#fff', fontSize: 16, fontWeight: '700', letterSpacing: 0.5 },
  btnConnexion: {
    backgroundColor: 'transparent', borderRadius: BTN_RADIUS,
    borderWidth: 2, borderColor: GREEN,
    paddingVertical: 14, alignItems: 'center',
  },
  btnConnexionText: { color: GREEN, fontSize: 16, fontWeight: '700', letterSpacing: 0.5 },
  btnGoogle: {
    backgroundColor: '#fff', borderRadius: BTN_RADIUS,
    borderWidth: 1.5, borderColor: '#ddd',
    paddingVertical: 14, flexDirection: 'row',
    alignItems: 'center', justifyContent: 'center', gap: 10,
  },
  footer: { fontSize: 12, color: '#999', textAlign: 'center' },
  footerLink: { color: '#666', textDecorationLine: 'underline', fontWeight: '600' },
});