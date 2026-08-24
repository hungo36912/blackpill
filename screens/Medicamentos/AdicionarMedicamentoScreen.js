import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';

import ScreenHeader from '../../components/ScreenHeader';
import SearchBar from '../../components/SearchBar';
import TipCard from '../../components/TipCard';

export default function AdicionarMedicamentoScreen({ onVoltar }) {
  const [search, setSearch] = useState('');

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader
          title="Adicionar medicamento"
          onBack={onVoltar}
        />

        <Text style={styles.question}>
          Qual medicamento você deseja adicionar?
        </Text>

        <Text style={styles.subtext}>
          Pesquise pelo nome comercial ou pelo princípio ativo (DCB).
        </Text>

        <View style={styles.searchWrap}>
          <SearchBar
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <TipCard
          text="Comece digitando parte do nome do medicamento."
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  screen: {
    flex: 1,
  },

  content: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing['2xl'],
    paddingBottom: spacing['4xl'],
  },

  question: {
    fontSize: typography.size.xl,
    fontWeight: '700',
    color: colors.primary,
    lineHeight: 28,
    marginBottom: spacing.md,
  },

  subtext: {
    fontSize: 13.5,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: spacing.xl + 2,
  },

  searchWrap: {
    marginBottom: spacing.xl + 2,
  },
});
