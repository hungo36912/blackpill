import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
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

type Props = {
  onVoltar: () => void;
};

const TIPOS_PROBLEMA = [
  'Lembretes não estão funcionando',
  'Erro ao sincronizar dados',
  'O app travou ou fechou sozinho',
  'Outro',
] as const;

type TipoProblema = (typeof TIPOS_PROBLEMA)[number];

export default function RelatarProblemaScreen({
  onVoltar,
}: Props) {
  const [tipoSelecionado, setTipoSelecionado] =
    useState<TipoProblema>(TIPOS_PROBLEMA[0]);

  const [descricao, setDescricao] = useState<string>('');

  const [imagemAnexada, setImagemAnexada] =
    useState<string | null>(null);

  function enviarRelatorio(): void {
    const payload = {
      tipo: tipoSelecionado,
      descricao,
      imagem: imagemAnexada,
    };

    console.log('enviando relatorio', payload);
  }

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
          Relatar problema
        </Text>

        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.label}>
            Tipo de problema
          </Text>

          {TIPOS_PROBLEMA.map((tipo) => {
            const selecionado =
              tipo === tipoSelecionado;

            return (
              <TouchableOpacity
                key={tipo}
                style={styles.opcaoRow}
                onPress={() =>
                  setTipoSelecionado(tipo)
                }
              >
                <Text style={styles.opcaoTexto}>
                  {tipo}
                </Text>

                <View
                  style={[
                    styles.radioExterno,
                    selecionado &&
                      styles.radioExternoAtivo,
                  ]}
                >
                  {selecionado && (
                    <View style={styles.radioInterno} />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}

          <Text style={styles.labelDescricao}>
            Descreva o que aconteceu
          </Text>

          <TextInput
            style={styles.textArea}
            placeholder="Ex: o lembrete das 08:00 não tocou hoje..."
            placeholderTextColor={colors.placeholder}
            multiline
            numberOfLines={4}
            value={descricao}
            onChangeText={setDescricao}
          />

          <Text style={styles.labelAnexo}>
            Anexar print (opcional)
          </Text>

          <TouchableOpacity
            style={styles.anexoBox}
            onPress={() =>
              setImagemAnexada('foto.png')
            }
          >
            <Ionicons
              name="camera-outline"
              size={22}
              color={colors.textSecondary}
            />

            <Text style={styles.anexoTexto}>
              {imagemAnexada
                ? imagemAnexada
                : 'Toque para adicionar imagem'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botao}
            onPress={enviarRelatorio}
          >
            <Text style={styles.botaoTexto}>
              Enviar relatório
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.rodape}>
          Suas informações de dispositivo e versão do app serão incluídas automaticamente
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
    paddingVertical: spacing.lg,
  },

  headerTitle: {
    fontSize: typography.size.lg,
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

  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginTop: spacing.sm,
  },

  label: {
    fontSize: typography.size.sm,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
  },

  labelDescricao: {
    fontSize: typography.size.sm,
    fontWeight: '700',
    color: colors.text,
    marginTop: spacing.xl,
    marginBottom: spacing.sm,
  },

  labelAnexo: {
    fontSize: typography.size.sm,
    fontWeight: '700',
    color: colors.text,
    marginTop: spacing.xl,
    marginBottom: spacing.sm,
  },

  opcaoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  opcaoTexto: {
    fontSize: typography.size.sm,
    color: colors.text,
    flex: 1,
    marginRight: spacing.sm,
  },

  radioExterno: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  radioExternoAtivo: {
    borderColor: colors.primary,
  },

  radioInterno: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },

  textArea: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: typography.size.sm,
    color: colors.text,
    minHeight: 90,
    textAlignVertical: 'top',
  },

  anexoBox: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingVertical: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },

  anexoTexto: {
    color: colors.textSecondary,
    fontSize: typography.size.xs,
    marginTop: spacing.xs,
  },

  botao: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    marginTop: spacing.xl,
  },

  botaoTexto: {
    color: '#fff',
    fontSize: typography.size.md,
    fontWeight: '700',
  },

  rodape: {
    textAlign: 'center',
    color: colors.textSecondary,
    fontSize: typography.size.xs,
    marginTop: spacing.lg,
  },
});