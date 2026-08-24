import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

import colors from '../../theme/colors';
import radius from '../../theme/radius';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';

import ScreenHeader from '../../components/ScreenHeader';
import MedicationSummary from '../../components/MedicationSummary';
import StatusTag from '../../components/StatusTag';
import InfoCard from '../../components/InfoCard';
import NoteCard from '../../components/NoteCard';
import PrimaryButton from '../../components/PrimaryButton';

export default function DetalhesMedicamentoScreen({
  onVoltar,
  onVerBula,
}) {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <ScreenHeader
        title="Detalhes do medicamento"
        onBack={onVoltar}
      />

      <View style={styles.topCard}>
        <MedicationSummary
          name="Dipirona 500mg"
          form="Comprimido"
        >
          <StatusTag label="Tratamento Ativo" />
        </MedicationSummary>
      </View>

      <InfoCard
        title="Informações do medicamento"
        items={[
          {
            label: 'Fabricante',
            value: 'EMS',
          },
          {
            label: 'Marca',
            value: 'Novalgina',
          },
          {
            label: 'Concentração',
            value: '500 mg',
          },
          {
            label: 'Tarja',
            value: 'Vermelha',
            danger: true,
          },
          {
            label: 'Doses',
            value: '30 comprimidos',
          },
          {
            label: 'DCB',
            value: 'Metamizol',
          },
        ]}
      />

      <View style={styles.noteWrap}>
        <NoteCard
          icon={
            <Text style={styles.noteIconText}>
              i
            </Text>
          }
          title="Sobre o Medicamento"
          text="Analgésico e antitérmico indicado para dores moderadas a intensas e febre."
        />
      </View>

      <View style={styles.actions}>
        <PrimaryButton
          label="Ver bula"
          onPress={onVerBula}
        />

        <PrimaryButton
          label="Adicionar aos lembretes"
          onPress={() => {}}
        />

        <PrimaryButton
          label="Ver agenda deste medicamento"
          onPress={() => {}}
        />
      </View>
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
    paddingTop: spacing['2xl'],
    paddingBottom: spacing['4xl'],
  },

  topCard: {
    backgroundColor: colors.primaryLight,
    borderRadius: radius['2xl'],
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },

  noteWrap: {
    marginBottom: spacing.xl + 2,
  },

  noteIconText: {
    color: colors.card,
    fontWeight: '700',
    fontSize: typography.size.sm - 1,
  },

  actions: {
    gap: spacing.md - 2,
  },
});
