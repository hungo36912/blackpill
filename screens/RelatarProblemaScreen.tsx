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

        <View style={{ width: 26 }} />
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

          <Text
            style={[
              styles.label,
              { marginTop: 20 },
            ]}
          >
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

          <Text
            style={[
              styles.label,
              { marginTop: 20 },
            ]}
          >
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
    paddingBottom: 32,
  },

  card: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 16,
    marginTop: 8,
  },

  label: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 10,
  },

  opcaoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  opcaoTexto: {
    fontSize: 14,
    color: colors.text,
    flex: 1,
    marginRight: 10,
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
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: colors.text,
    minHeight: 90,
    textAlignVertical: 'top',
  },

  anexoBox: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.border,
    borderRadius: 10,
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  anexoTexto: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 6,
  },

  botao: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 22,
  },

  botaoTexto: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },

  rodape: {
    textAlign: 'center',
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 16,
  },
});