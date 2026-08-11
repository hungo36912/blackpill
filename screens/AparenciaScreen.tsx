import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Switch,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';

import colors from '../theme/colors';

type Props = {
  onVoltar: () => void;
};

type Tema = {
  id: 'claro' | 'escuro' | 'automatico';
  label: string;
};

const TEMAS: Tema[] = [
  { id: 'claro', label: 'Claro' },
  { id: 'escuro', label: 'Escuro' },
  { id: 'automatico', label: 'Automático' },
];

export default function AparenciaScreen({ onVoltar }: Props) {
  const [temaSelecionado, setTemaSelecionado] =
    useState<Tema['id']>('claro');

  const [tamanhoTexto, setTamanhoTexto] =
    useState<number>(0.5);

  const [altoContraste, setAltoContraste] =
    useState<boolean>(false);

  const tamanhoFonteExemplo = 13 + tamanhoTexto * 8;

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
          Aparência
        </Text>

        <View style={{ width: 26 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionLabel}>
          TEMA
        </Text>

        <View style={styles.temasRow}>
          {TEMAS.map((tema) => {
            const selecionado =
              tema.id === temaSelecionado;

            return (
              <TouchableOpacity
                key={tema.id}
                style={[
                  styles.temaBox,
                  selecionado &&
                    styles.temaBoxSelecionado,
                ]}
                onPress={() =>
                  setTemaSelecionado(tema.id)
                }
              >
                <View
                  style={[
                    styles.temaPreview,
                    tema.id === 'escuro' && {
                      backgroundColor: '#1a1a1a',
                    },
                    tema.id === 'automatico' &&
                      styles.temaPreviewAutomatico,
                  ]}
                />

                <Text style={styles.temaLabel}>
                  {tema.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.sectionLabel}>
          TAMANHO DO TEXTO
        </Text>

        <View style={styles.card}>
          <View style={styles.sliderRow}>
            <Text style={styles.sliderLetraPequena}>
              A
            </Text>

            <Slider
              style={{
                flex: 1,
                marginHorizontal: 10,
              }}
              minimumValue={0}
              maximumValue={1}
              value={tamanhoTexto}
              onValueChange={setTamanhoTexto}
              minimumTrackTintColor={colors.primary}
              maximumTrackTintColor={colors.border}
              thumbTintColor={colors.primary}
            />

            <Text style={styles.sliderLetraGrande}>
              A
            </Text>
          </View>

          <Text
            style={[
              styles.exemploTexto,
              { fontSize: tamanhoFonteExemplo },
            ]}
          >
            Exemplo: hora de tomar Losartana às 08:00
          </Text>
        </View>

        <Text style={styles.sectionLabel}>
          PERSONALIZAÇÃO
        </Text>

        <View style={styles.card}>
          <View style={styles.linhaContraste}>
            <View style={{ flex: 1 }}>
              <Text style={styles.contrasteTitulo}>
                Alto contraste
              </Text>

              <Text style={styles.contrasteTexto}>
                Facilita a leitura
              </Text>
            </View>

            <Switch
              value={altoContraste}
              onValueChange={setAltoContraste}
              trackColor={{
                false: colors.border,
                true: colors.primary,
              }}
              thumbColor="#fff"
            />
          </View>
        </View>
      </View>
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
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },

  content: {
    paddingHorizontal: 16,
  },

  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    marginTop: 20,
    marginBottom: 10,
    letterSpacing: 0.5,
  },

  temasRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  temaBox: {
    flex: 1,
    marginHorizontal: 4,
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: 12,
    padding: 8,
    alignItems: 'center',
    backgroundColor: colors.card,
  },

  temaBoxSelecionado: {
    borderColor: colors.primary,
  },

  temaPreview: {
    width: '100%',
    height: 44,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 8,
  },

  temaPreviewAutomatico: {
    backgroundColor: '#fff',
    borderRightWidth: 22,
    borderRightColor: '#1a1a1a',
  },

  temaLabel: {
    fontSize: 12.5,
    color: colors.text,
    fontWeight: '600',
  },

  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
  },

  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  sliderLetraPequena: {
    fontSize: 13,
    color: colors.textSecondary,
  },

  sliderLetraGrande: {
    fontSize: 20,
    color: colors.textSecondary,
  },

  exemploTexto: {
    color: colors.text,
    marginTop: 16,
  },

  linhaContraste: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  contrasteTitulo: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },

  contrasteTexto: {
    fontSize: 12.5,
    color: colors.textSecondary,
    marginTop: 2,
  },
});