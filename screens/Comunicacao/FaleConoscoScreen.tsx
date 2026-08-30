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

import colors from '../../theme/colors';

type Props = {
  onVoltar: () => void;
};

export default function FaleConoscoScreen({
  onVoltar,
}: Props) {
  const [assunto, setAssunto] = useState<string>('');
  const [mensagem, setMensagem] = useState<string>('');

  function enviarMensagem(): void {
    if (!assunto || !mensagem) {
      return;
    }

    console.log('enviando mensagem', {
      assunto,
      mensagem,
    });
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
          Fale conosco
        </Text>

        <View style={{ width: 26 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionLabel}>
          OUTROS CANAIS
        </Text>

        <View style={styles.card}>
          <TouchableOpacity style={styles.canalRow}>
            <View
              style={[
                styles.iconCircle,
                { backgroundColor: colors.primaryLight },
              ]}
            >
              <Ionicons
                name="mail-outline"
                size={20}
                color={colors.primary}
              />
            </View>

            <View style={styles.canalInfo}>
              <Text style={styles.canalTitulo}>
                E-mail
              </Text>

              <Text style={styles.canalTexto}>
                suporte@alertamed.com.br
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={18}
              color={colors.textSecondary}
            />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.canalRow}>
            <View
              style={[
                styles.iconCircle,
                { backgroundColor: colors.primaryLight },
              ]}
            >
              <Ionicons
                name="logo-whatsapp"
                size={20}
                color={colors.primary}
              />
            </View>

            <View style={styles.canalInfo}>
              <Text style={styles.canalTitulo}>
                WhatsApp
              </Text>

              <Text style={styles.canalTexto}>
                Seg. a sex., 9h às 18h
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={18}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionLabel}>
          OU ENVIE UMA MENSAGEM
        </Text>

        <View style={styles.card}>
          <Text style={styles.label}>
            Assunto
          </Text>

          <TouchableOpacity style={styles.selectInput}>
            <Text
              style={
                assunto
                  ? styles.inputTexto
                  : styles.placeholderTexto
              }
            >
              {assunto || 'Selecione um assunto'}
            </Text>
          </TouchableOpacity>

          <Text
            style={[
              styles.label,
              { marginTop: 16 },
            ]}
          >
            Mensagem
          </Text>

          <TextInput
            style={styles.textArea}
            placeholder="Descreva sua dúvida ou mensagem..."
            placeholderTextColor={colors.placeholder}
            multiline
            numberOfLines={5}
            value={mensagem}
            onChangeText={setMensagem}
          />

          <TouchableOpacity
            style={styles.botao}
            onPress={enviarMensagem}
          >
            <Text style={styles.botaoTexto}>
              Enviar mensagem
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.rodape}>
          Respondemos em até 1 dia útil
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
    backgroundColor: colors.background,
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

  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    marginTop: 20,
    marginBottom: 8,
    letterSpacing: 0.5,
  },

  card: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 16,
  },

  canalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },

  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  canalInfo: {
    flex: 1,
  },

  canalTitulo: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },

  canalTexto: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },

  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 10,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },

  selectInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
    backgroundColor: colors.card,
  },

  inputTexto: {
    fontSize: 14,
    color: colors.text,
  },

  placeholderTexto: {
    fontSize: 14,
    color: colors.placeholder,
  },

  textArea: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: colors.text,
    minHeight: 110,
    textAlignVertical: 'top',
  },

  botao: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
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
    marginTop: 20,
  },
});