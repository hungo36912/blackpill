import React from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../../theme/colors';

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
    icon: <Feather name="plus" size={18} color={colors.card} />,
  },
  {
    key: 'bulas',
    label: 'Ver bulas',
    variant: 'light',
    icon: <Feather name="book-open" size={18} color={colors.primary} />,
  },
  {
    key: 'historico',
    label: 'Histórico',
    variant: 'light',
    icon: <Feather name="calendar" size={18} color={colors.primary} />,
  },
  {
    key: 'alertas',
    label: 'Alertas e lembretes',
    variant: 'light',
    icon: <Feather name="bell" size={18} color={colors.primary} />,
  },
];

export default function HomeScreen({
  onAddAlarme,
  onPressQuickAction,
  onPressBell,
}) {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <AppHeader onPressBell={onPressBell} />

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
            size={18}
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
            size={18}
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
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },

  greetingTitle: {
    fontSize: 23,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },

  greetingSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 20,
  },
});