import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { globalStyles } from "@/styles/global";
import { COLORS, FONT, FONT_SIZE } from "@/styles/theme";

const FAQ_DATA = [
    {
        question: 'Sur quel téléphone puis-je jouer ?',
        answer: "Pour l'instant, télécharge l'application sur Google Play (Android). Une version iPhone (App Store) est prévue dans un second temps — reste informé !",
    },
    {
        question: "L'application est-elle gratuite ?",
        answer: "Oui ! Tu peux télécharger l'application gratuitement et commencer tout de suite.",
    },
    {
        question: 'À partir de quel âge peut-on jouer ?',
        answer: "Balad'indice est pensé pour les enfants, mais toute la famille peut jouer ensemble !",
    },
    {
        question: 'Comment commencer une aventure ?',
        answer: "Installe l'app depuis le Play Store, choisis une aventure sur la carte puis suis les indications jusqu'au point de départ.",
    },
    {
        question: 'Faut-il une connexion Internet ?',
        answer: "Oui, une connexion est recommandée pour charger le parcours, valider les étapes et accéder aux énigmes dans l'application.",
    },
    {
        question: 'Je suis bloqué sur une énigme, que faire ?',
        answer: "Pas de panique ! Relis bien l'indice, observe autour de toi, reprends le fil depuis l'étape précédente ou demande de l'aide à un adulte.",
    },
    {
        question: 'Combien de temps dure une aventure ?',
        answer: 'Cela dépend du parcours, mais en général entre 30 minutes et 1 heure.',
    },
    {
        question: 'Peut-on jouer plusieurs fois ?',
        answer: 'Une seule fois par aventure.',
    },
    {
        question: 'Que gagne-t-on à la fin ?',
        answer: "À la fin de l'aventure, tu découvriras un trésor !",
    },
    {
        question: 'Est-ce sécurisé pour les enfants ?',
        answer: 'Oui, les parcours sont conçus pour être sûrs et adaptés aux enfants.',
    },
    {
        question: "Que faire si l'application ne fonctionne pas ?",
        answer: "Essaie de redémarrer l'application ou ton téléphone. Si le problème continue, contacte-nous.",
    },
];

function FaqItem({ question, answer }: { question: string; answer: string }) {
    const [open, setOpen] = useState(false);
    return (
        <TouchableOpacity style={styles.faqItem} onPress={() => setOpen(!open)} activeOpacity={0.8}>
            <View style={styles.faqRow}>
                <Text style={{ fontFamily: FONT.regular, fontSize: FONT_SIZE.xs, flex: 1 }}>{question}</Text>
                <Text style={{ fontSize: FONT_SIZE.sm, color: COLORS.grey, alignSelf: 'center' }}>{open ? '△' : '▽'}</Text>
            </View>
            {open && <Text style={styles.faqAnswer}>{answer}</Text>}
        </TouchableOpacity>
    );
}

export default function HowItWorksScreen() {
    return (
        <ScrollView style={globalStyles.screen} contentContainerStyle={{ paddingBottom: 30 }}>

            {/* Section Comment ça marche */}
            <Text style={globalStyles.titleGreen}>Comment ça marche ?</Text>
            <View style={styles.divider} />

            {/* Étapes 1-2-3 — image scan à gauche, étapes à droite */}
            <View style={styles.stepsRow}>
                <Image
                    source={require('@/assets/images/personnage.png')}
                    style={{
                        width: 130,
                        height: 280
                    }}
                    resizeMode="cover"
                />
                <View style={styles.stepsColumn}>
                    <Text style={globalStyles.titleh2}>Étape 1</Text>
                    <View style={[styles.stepTextBox, styles.stepTextBorderLeft]}>
                        <Text style={styles.stepText}>
                            Télécharge <Text style={{ fontFamily: FONT.bold }}>Balad&apos;indice</Text> sur le{' '}
                            <Text style={{ fontFamily: FONT.bold }}>Google Play Store</Text> (Android). La version iOS suivra.
                        </Text>
                    </View>
                    <Text style={globalStyles.titleh2}>Étape 2</Text>
                    <View style={[styles.stepTextBox, styles.stepTextBorderLeft]}>
                        <Text style={styles.stepText}>
                            Choisis une aventure sur la carte et rends-toi au point de départ.
                        </Text>
                    </View>
                    <Text style={globalStyles.titleh2}>Étape 3</Text>
                    <View style={[styles.stepTextBox, styles.stepTextBorderLeft]}>
                        <Text style={styles.stepText}>
                            Avance dans le parcours : réponds aux énigmes dans l&apos;app – chaque bonne réponse t&apos;indique où aller pour la suivante.
                        </Text>
                    </View>
                </View>
            </View>

            {/* Étapes 4-5 — étapes à gauche, image coffre à droite */}
            <View style={styles.stepsRow}>
                <View style={styles.stepsColumn}>
                    <Text style={globalStyles.titleh2}>Étape 4</Text>
                    <View style={[styles.stepTextBox, styles.stepTextBorderLeft]}>
                        <Text style={styles.stepText}>
                            Enchaîne les énigmes à ton rythme – en général entre 30 minutes et 1 heure selon le parcours.
                        </Text>
                    </View>
                    <Text style={globalStyles.titleh2}>Étape 5</Text>
                    <View style={[styles.stepTextBox, styles.stepTextBorderLeft]}>
                        <Text style={styles.stepText}>
                            Atteins le trésor final : la récompense t&apos;attend au bout du chemin.
                        </Text>
                    </View>
                </View>
                <Image
                    source={require('@/assets/images/tresorimg.png')}
                    style={{
                        width: 130,
                        height: 200
                    }}
                    resizeMode="contain"
                />
            </View>

            {/* Section FAQ */}
            <Text style={globalStyles.titleGreen}>Questions fréquents</Text>
            <View style={styles.divider} />

            <View style={styles.faqContainer}>
                {FAQ_DATA.map((item, index) => (
                    <FaqItem key={index} question={item.question} answer={item.answer} />
                ))}
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    divider: {
        height: 1,
        backgroundColor: '#C8BFA8',
        marginHorizontal: 20,
        marginBottom: 16,
    },

    // Étapes
    stepsRow: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        gap: 12,
        alignItems: "center"
    },
    stepsColumn: {
        flex: 1,
        gap: 2.5,
    },
    stepTextBox: {
        backgroundColor: '#EDE8D5',
        borderRadius: 4,
        padding: 8,
        marginBottom: 8,
    },
    stepTextBorderLeft: {
        borderLeftWidth: 3,
        borderLeftColor: COLORS.green,
    },
    stepText: {
        fontFamily: FONT.regular,
        fontSize: FONT_SIZE.xs,
        color: COLORS.grey
    },

    // FAQ
    faqContainer: {
        marginHorizontal: 16,
        backgroundColor: '#fff',
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    faqItem: {
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#EDEDEA',
    },
    faqRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    faqAnswer: {
        fontFamily: FONT.regular,
        fontSize: FONT_SIZE.xs,
        color: '#555',
        marginTop: 8,
        lineHeight: 18,
    },
});