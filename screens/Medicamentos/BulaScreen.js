import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

import colors from '../../theme/colors';

import ScreenHeader from '../../components/ScreenHeader';
import MedicationSummary from '../../components/MedicationSummary';
import AccordionItem from '../../components/AccordionItem';
import NoteCard from '../../components/NoteCard';
import PrimaryButton from '../../components/PrimaryButton';

const SECOES = [
  {
    title: 'Indicações',
    description: 'Alívio da dor e redução da febre.',
  },
  {
    title: 'Como usar (Posologia)',
    description:
      'Utilize o medicamento conforme orientação médica ou farmacêutica.',
  },
  {
    title: 'Contraindicações',
    description:
      'Hipersensibilidade ao metamizol ou a qualquer componente da fórmula.',
  },
  {
    title: 'Reações adversas',
    description:
      'Podem ocorrer náusea, vômito, tontura, queda de pressão e reações alérgicas.',
  },
  {
    title: 'Superdose',
    description:
      'Em caso de uso excessivo, procure assistência médica imediatamente.',
  },
  {
    title: 'Interações medicamentosas',
    description:
      'Alguns medicamentos podem interagir com a dipirona. Consulte um profissional de saúde.',
  },
];

export default function BulaScreen({ onVoltar }) {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <ScreenHeader
        title="Bula"
        onBack={onVoltar}
        centered
      />

      <View style={styles.summaryWrap}>
        <MedicationSummary
          name="Dipirona 500mg"
          form="Comprimido"
          size="small"
        />
      </View>

      <View style={styles.accordion}>
        {SECOES.map((secao) => (
          <AccordionItem
            key={secao.title}
            title={secao.title}
            description={secao.description}
            onPress={() => {}}
          />
        ))}
      </View>

      <View style={styles.noteWrap}>
        <NoteCard
          text="Em caso de dúvidas, consulte seu médico ou farmacêutico."
          centered
        />
      </View>

      <PrimaryButton
        label="Adicionar ao cronograma"
        onPress={() => {}}
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

  summaryWrap: {
    marginBottom: 22,
  },

  accordion: {
    gap: 10,
    marginBottom: 20,
  },

  noteWrap: {
    marginBottom: 14,
  },
}); 