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

type FAQItem = {
  pergunta: string;
  resposta: string;
};

type PerguntaItemProps = {
  item: FAQItem;
};

const FAQ_LEMBRETES: FAQItem[] = [
  {
    pergunta: 'Como adicionar um novo lembrete?',
    resposta:
      'Na tela inicial, toque no botão "+" e preencha o nome do medicamento, horário e frequência.',
  },
  {
    pergunta: 'Posso editar o horário de um lembrete já criado?',
    resposta:
      'Sim. Abra o lembrete na tela "Lembretes", toque nele e ajuste o horário, a frequência ou a dose. As alterações são salvas automaticamente.',
  },
  {
    pergunta: 'O que acontece se eu não confirmar uma dose?',
    resposta:
      'O aplicativo envia uma nova notificação após alguns minutos e registra a dose como não confirmada no seu histórico.',
  },
];

const FAQ_CONTA: FAQItem[] = [
  {
    pergunta: 'Como funciona o backup dos meus dados?',
    resposta:
      'Seus lembretes e bulas são salvos automaticamente na nuvem quando a sincronização automática está ativada.',
  },
  {
    pergunta: 'Esqueci minha senha, o que faço?',
    resposta:
      'Toque em "Esqueci minha senha" na tela de login e siga as instruções enviadas por e-mail.',
  },
  {
    pergunta: 'Como excluir minha conta?',
    resposta:
      'Acesse Configurações, depois Privacidade, e toque em "Excluir conta".',
  },
];

function PerguntaItem({ item }: PerguntaItemProps) {
  const [aberta, setAberta] = useState<boolean>(false);

  return (
    <TouchableOpacity
      style={styles.perguntaCard}
      onPress={() => setAberta(!aberta)}
    >
      <View style={styles.perguntaHeader}>
        <Text style={styles.perguntaTexto}>
          {item.pergunta}
        </Text>

        <Ionicons
          name={aberta ? 'chevron-up' : 'chevron-down'}
          size={18}
          color={
            aberta
              ? colors.primary
              : colors.textSecondary
          }
        />
      </View>

      {aberta && (
        <Text style={styles.respostaTexto}>
          {item.resposta}
        </Text>
      )}
    </TouchableOpacity>
  );
}

export default function PerguntasFrequentesScreen({
  onVoltar,
}: Props) {
  const [busca, setBusca] = useState<string>('');

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
          Perguntas frequentes
        </Text>

        <View style={{ width: 26 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.buscaBox}>
          <Ionicons
            name="search-outline"
            size={18}
            color={colors.placeholder}
          />

          <TextInput
            style={styles.buscaInput}
            placeholder="Buscar uma dúvida"
            placeholderTextColor={colors.placeholder}
            value={busca}
            onChangeText={setBusca}
          />
        </View>

        <Text style={styles.sectionLabel}>
          LEMBRETES E TRATAMENTOS
        </Text>

        {FAQ_LEMBRETES.map((item) => (
          <PerguntaItem
            key={item.pergunta}
            item={item}
          />
        ))}

        <Text style={styles.sectionLabel}>
          CONTA E DADOS
        </Text>

        {FAQ_CONTA.map((item) => (
          <PerguntaItem
            key={item.pergunta}
            item={item}
          />
        ))}

        <TouchableOpacity style={styles.suporteCard}>
          <View style={styles.iconCircle}>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={20}
              color={colors.primary}
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.suporteTitulo}>
              Não encontrou sua dúvida?
            </Text>

            <Text style={styles.suporteTexto}>
              Fale diretamente com a equipe de suporte
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={18}
            color={colors.textSecondary}
          />
        </TouchableOpacity>
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

  buscaBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
  },

  buscaInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: colors.text,
  },

  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    marginTop: 14,
    marginBottom: 8,
    letterSpacing: 0.5,
  },

  perguntaCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },

  perguntaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  perguntaTexto: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginRight: 10,
  },

  respostaTexto: {
    fontSize: 13.5,
    color: colors.textSecondary,
    marginTop: 10,
    lineHeight: 19,
  },

  suporteCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 14,
    marginTop: 10,
  },

  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  suporteTitulo: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },

  suporteTexto: {
    fontSize: 12.5,
    color: colors.textSecondary,
    marginTop: 2,
  },
});