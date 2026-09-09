import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';
import EmptyState from '../../components/EmptyState';

export default function MedicamentosScreen({
  onAddMedicamento,
}) {

  const medicamentos = [];

  return (

    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >

      <Text style={styles.pageTitle}>
        Medicamentos
      </Text>

      {medicamentos.length === 0 && (

        <EmptyState
          image={require('../../assets/empty-medications.png')}
          text="Nenhum medicamento adicionado"
          buttonLabel="Adicionar medicamento"
          onPress={onAddMedicamento}
        />

      )}

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

  pageTitle: {
    textAlign: 'center',
    fontSize: typography.size.xl,
    lineHeight: typography.size.xl + 8,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xl,
  },

});