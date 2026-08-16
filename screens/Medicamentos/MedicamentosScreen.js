// screens/MedicamentosScreen.js
// Tela "Medicamentos": busca + filtro no topo e, quando não há nenhum
// medicamento cadastrado, o estado vazio com ilustração e botão de
// adicionar. Troque `medicamentos` por dados vindos da API/contexto e
// renderize uma FlatList no lugar do EmptyState quando a lista não
// estiver vazia.

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../../theme/colors';
import SearchBar from '../../components/SearchBar';
import FilterButton from '../../components/FilterButton';
import EmptyState from '../../components/EmptyState';

export default function MedicamentosScreen({ onAddMedicamento }) {
  const [search, setSearch] = useState('');
  const medicamentos = []; // troque por dados reais quando a API estiver pronta

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.pageTitle}>Medicamentos</Text>

      <View style={styles.searchRow}>
        <SearchBar value={search} onChangeText={setSearch} />
        <FilterButton onPress={() => {}} />
      </View>

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
    backgroundColor: colors.bg,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },
  pageTitle: {
    textAlign: 'center',
    fontSize: 19,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: 24,
  },
  searchRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 44,
  },
});
