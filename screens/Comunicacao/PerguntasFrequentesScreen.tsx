import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import colors from "../../theme/colors";
import { spacing } from "../../theme/spacing";
import { typography } from "../../theme/typography";
import { radius } from "../../theme/radius";

type Props = {
  onVoltar: () => void;
  onAbrirRelatarProblema: () => void;
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
    pergunta: "Como adicionar um novo lembrete?",
    resposta:
      'Na tela inicial, toque no botão "+" e preencha o nome do medicamento, horário e frequência.',
  },
  {
    pergunta: "Posso editar o horário de um lembrete já criado?",
    resposta:
      'Sim. Abra o lembrete na tela "Lembretes", toque nele e ajuste o horário, a frequência ou a dose. As alterações são salvas automaticamente.',
  },
  {
    pergunta: "O que acontece se eu não confirmar uma dose?",
    resposta:
      "O aplicativo envia uma nova notificação após alguns minutos e registra a dose como não confirmada no seu histórico.",
  },
];

const FAQ_CONTA: FAQItem[] = [
  {
    pergunta: "Como funciona o backup dos meus dados?",
    resposta:
      "Seus lembretes e bulas são salvos automaticamente na nuvem quando a sincronização automática está ativada.",
  },
  {
    pergunta: "Esqueci minha senha, o que faço?",
    resposta:
      'Toque em "Esqueci minha senha" na tela de login e siga as instruções enviadas por e-mail.',
  },
  {
    pergunta: "Como excluir minha conta?",
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
          name={aberta ? "chevron-up" : "chevron-down"}
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
  onAbrirRelatarProblema,
}: Props) {
  const [busca, setBusca] = useState<string>("");

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

        <View style={styles.headerSpacer} />
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

        <TouchableOpacity
          style={styles.suporteCard}
          onPress={onAbrirRelatarProblema}
          activeOpacity={0.7}
        >
          <View style={styles.iconCircle}>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={20}
              color={colors.primary}
            />
          </View>

          <View style={styles.flex}>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },

  headerTitle: {
    fontSize: typography.size.xl,
    fontWeight: "700",
    color: colors.text,
  },

  headerSpacer: {
    width: 26,
  },

  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing["3xl"],
  },

  buscaBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    marginBottom: spacing.lg,
  },

  buscaInput: {
    flex: 1,
    marginLeft: spacing.sm,
    fontSize: typography.size.sm,
    color: colors.text,
  },

  sectionLabel: {
    fontSize: typography.size.xs,
    fontWeight: "600",
    color: colors.textSecondary,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    letterSpacing: 0.5,
  },

  perguntaCard: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },

  perguntaHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  perguntaTexto: {
    flex: 1,
    fontSize: typography.size.sm,
    fontWeight: "600",
    color: colors.text,
    marginRight: spacing.sm,
  },

  respostaTexto: {
    fontSize: typography.size.sm,
    color: colors.textSecondary,
    marginTop: spacing.md,
    lineHeight: 19,
  },

  suporteCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginTop: spacing.sm,
  },

  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },

  flex: {
    flex: 1,
  },

  suporteTitulo: {
    fontSize: typography.size.sm,
    fontWeight: "700",
    color: colors.primary,
  },

  suporteTexto: {
    fontSize: typography.size.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
});