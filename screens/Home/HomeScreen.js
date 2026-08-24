import React from 'react';

import {
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

import {
  Feather,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';

import AppHeader from '../../components/AppHeader';
import SectionTitle from '../../components/SectionTitle';
import EmptyCard from '../../components/EmptyCard';
import PrimaryButton from '../../components/PrimaryButton';
import QuickActionsGrid from '../../components/QuickActionsGrid';

const ACOES_RAPIDAS = [
  {
    key: 'add',
    label: 'Adicionar remédio',
    variant: 'add',
    icon: (
      <Feather
        name="plus"
        size={20}
        color={colors.card}
      />
    ),
  },
  {
    key: 'bulas',
    label: 'Ver bulas',
    variant: 'light',
    icon: (
      <Feather
        name="book-open"
        size={20}
        color={colors.primary}
      />
    ),
  },
  {
    key: 'historico',
    label: 'Histórico',
    variant: 'light',
    icon: (
      <Feather
        name="calendar"
        size={20}
        color={colors.primary}
      />
    ),
  },
  {
    key: 'alertas',
    label: 'Alertas e lembretes',
    variant: 'light',
    icon: (
      <Feather
        name="bell"
        size={20}
        color={colors.primary}
      />
    ),
  },
];

export default function HomeScreen({
  onAddAlarme,
  onPressQuickAction,
  onPressBell,
  onPressSettings,
}) {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <AppHeader
        onPressBell={onPressBell}
        onPressSettings={onPressSettings}
      />

      <Text style={styles.greetingTitle}>
        Olá, Fulano
      </Text>

      <Text style={styles.greetingSubtitle}>
        Estamos aqui para lhe auxiliar
      </Text>

      <SectionTitle
        icon={
          <MaterialCommunityIcons
            name="pill"
            size={21}
            color={colors.text}
          />
        }
        title="Medicamentos de hoje"
      />

      <EmptyCard message="Nenhum alarme configurado para hoje">
        <PrimaryButton
          label="Adicionar alarme"
          icon="plus"
          variant="pill"
          onPress={onAddAlarme}
        />
      </EmptyCard>

      <SectionTitle
        icon={
          <Feather
            name="zap"
            size={21}
            color={colors.text}
          />
        }
        title="Ações Rápidas"
      />

      <QuickActionsGrid
        actions={ACOES_RAPIDAS.map((acao) => ({
          ...acao,
          onPress: () => {
            if (onPressQuickAction) {
              onPressQuickAction(acao.key);
            }
          },
        }))}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing['4xl'],
  },

  greetingTitle: {
    fontSize: typography.size.xl + 2,
    lineHeight: typography.size.xl + 10,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
  },

  greetingSubtitle: {
    fontSize: typography.size.md,
    lineHeight: typography.size.md + 7,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },
});