import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import colors from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { radius } from '../theme/radius';

import AccordionItem from '../components/AccordionItem';

type Props = {
  onVoltar: () => void;
};

export default function SobreAppScreen({
  onVoltar,
}: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onVoltar}>
          <Ionicons
            name="chevron-back"
            size={26}
            color={colors.text}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Sobre o aplicativo
        </Text>

        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.cardTopo}>
          <View style={styles.logoCircle}>
            <Ionicons
              name="notifications"
              size={22}
              color="#fff"
            />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.nomeApp}>
              AlertaMed
            </Text>

            <Text style={styles.slogan}>
              Cuidado que te acompanha.
            </Text>

            <Text style={styles.descricaoTopo}>
              O AlertaMed foi criado para ajudar você a organizar seus
              tratamentos e cuidar da sua saúde com mais segurança e
              tranquilidade.
            </Text>
          </View>
        </View>

        <AccordionItem
          icon="phone-portrait-outline"
          titulo="O que é o AlertaMed?"
          texto="O AlertaMed é um aplicativo de saúde que permite organizar medicamentos, acompanhar lembretes e gerenciar informações importantes de forma prática e segura."
        />

        <AccordionItem
          icon="shield-checkmark-outline"
          titulo="Nosso Compromisso"
          texto="Nosso compromisso é oferecer uma experiência segura, confiável e acessível, ajudando você a manter sua saúde em dia todos os dias."
        />

        <AccordionItem
          icon="heart-outline"
          titulo="Principais Recursos"
          texto={
            '• Lembretes de medicamentos\n• Registro do histórico de utilização\n• Organização de tratamentos\n• Compartilhamento com cuidadores\n• Segurança e proteção dos seus dados'
          }
        />

        <AccordionItem
          icon="lock-closed-outline"
          titulo="Privacidade e Segurança"
          texto="Levamos sua privacidade a sério. Seus dados são protegidos e nunca são compartilhados sem o seu consentimento."
        />

        <AccordionItem
          icon="help-circle-outline"
          titulo="Precisa de Ajuda?"
          texto="Nossa equipe está pronta para te ajudar. Entre em contato com o suporte sempre que precisar."
        />

        <View style={styles.card}>
          <View style={styles.header2}>
            <View style={styles.iconCircle}>
              <Ionicons
                name="mail-outline"
                size={20}
                color={colors.primary}
              />
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.titulo}>
                Fale com o Suporte
              </Text>

              <Text style={styles.texto}>
                Entre em contato com a equipe do AlertaMed pela seção Ajuda
                e Suporte no aplicativo.
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={18}
              color={colors.textSecondary}
            />
          </View>
        </View>

        <Text style={styles.rodape}>
          Versão 1.0 • Última atualização: Junho/2026
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing['4xl'],
    paddingVertical: spacing.lg,
  },

  headerTitle: {
    fontSize: typography.size.xl,
    fontWeight: '700',
    color: colors.text,
  },

  headerSpacer: {
    width: 26,
  },

  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing['3xl'],
  },

  cardTopo: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },

  logoCircle: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },

  textContainer: {
    flex: 1,
  },

  nomeApp: {
    fontSize: typography.size.lg,
    fontWeight: '700',
    color: colors.text,
  },

  slogan: {
    fontSize: typography.size.sm,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },

  descricaoTopo: {
    fontSize: typography.size.sm,
    color: colors.textSecondary,
    lineHeight: 18,
  },

  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },

  header2: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },

  titulo: {
    fontSize: typography.size.md,
    fontWeight: '700',
    color: colors.primary,
  },

  texto: {
    fontSize: typography.size.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    lineHeight: 19,
  },

  rodape: {
    textAlign: 'center',
    color: colors.textSecondary,
    fontSize: typography.size.xs,
    marginTop: spacing.xl,
  },
});