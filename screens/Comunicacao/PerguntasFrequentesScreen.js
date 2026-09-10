import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import colors from "../../theme/colors";

import spacing from "../../theme/spacing";

import typography from "../../theme/typography";

import radius from "../../theme/radius";

const FAQ_LEMBRETES = [
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

const FAQ_CONTA = [
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

function PerguntaItem({ item }) {
  const [aberta, setAberta] = useState(false);

  return (
    <TouchableOpacity
      style={styles.perguntaCard}
      onPress={() => setAberta(!aberta)}
      activeOpacity={0.7}
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
}) {
  const [busca, setBusca] = useState("");

  return (
    <View style={styles.container}>

      {/* HEADER */}

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={onVoltar}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Voltar"
        >
          <Ionicons
            name="chevron-back"
            size={28}
            color={colors.text}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Perguntas frequentes
        </Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        {/* BUSCA */}

        <View style={styles.buscaBox}>
          <Ionicons
            name="search-outline"
            size={20}
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

        {/* LEMBRETES */}

        <Text style={styles.sectionLabel}>
          LEMBRETES E TRATAMENTOS
        </Text>

        {FAQ_LEMBRETES.map((item) => (
          <PerguntaItem
            key={item.pergunta}
            item={item}
          />
        ))}

        {/* CONTA */}

        <Text style={styles.sectionLabel}>
          CONTA E DADOS
        </Text>

        {FAQ_CONTA.map((item) => (
          <PerguntaItem
            key={item.pergunta}
            item={item}
          />
        ))}

        {/* SUPORTE */}

        <TouchableOpacity
          style={styles.suporteCard}
          onPress={onAbrirRelatarProblema}
          activeOpacity={0.7}
        >
          <View style={styles.iconCircle}>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={22}
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
            size={22}
            color={colors.textSecondary}
          />
        </TouchableOpacity>

      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({

  /* CONTAINER */

  container: {
    flex: 1,
    backgroundColor: colors.authBackground,
  },

  /* HEADER PADRÃO DO APLICATIVO */

  header: {
    minHeight: 75,

    justifyContent: "center",

    alignItems: "center",

    paddingHorizontal: spacing.lg,

    borderBottomWidth: 1,

    borderBottomColor: colors.border,

    shadowColor: colors.text,

    shadowOpacity: 0.08,

    shadowRadius: 5,

    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 2,
  },

  botaoVoltar: {
    position: "absolute",

    left: spacing.lg,

    width: 48,

    height: 48,

    justifyContent: "center",

    alignItems: "center",

    zIndex: 1,
  },

  headerTitle: {
    fontSize: typography.size.xl,

    lineHeight: typography.size.xl + 8,

    fontWeight: "800",

    color: colors.text,
  },

  /* SCROLL */

  scroll: {
    flex: 1,
  },

  content: {
    paddingHorizontal: spacing.lg,

    paddingTop: spacing.sm,

    paddingBottom: spacing["3xl"],
  },

  /* BUSCA */

  buscaBox: {
    height: 52,

    flexDirection: "row",

    alignItems: "center",

    backgroundColor: colors.card,

    borderRadius: radius.md,

    paddingHorizontal: spacing.md,

    marginBottom: spacing.lg,
  },

  buscaInput: {
    flex: 1,

    marginLeft: spacing.sm,

    fontSize: typography.size.sm,

    color: colors.text,
  },

  /* SEÇÕES */

  sectionLabel: {
    fontSize: typography.size.sm,

    lineHeight: typography.size.sm + 5,

    fontWeight: "700",

    color: colors.textSecondary,

    marginTop: spacing.md,

    marginBottom: spacing.sm,

    letterSpacing: 0.6,
  },

  /* PERGUNTAS */

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

    fontSize: typography.size.md,

    lineHeight: typography.size.md + 6,

    fontWeight: "600",

    color: colors.text,

    marginRight: spacing.sm,
  },

  respostaTexto: {
    fontSize: typography.size.sm,

    lineHeight: 20,

    color: colors.textSecondary,

    marginTop: spacing.md,
  },

  /* SUPORTE */

  suporteCard: {
    flexDirection: "row",

    alignItems: "center",

    backgroundColor: colors.card,

    borderRadius: radius.lg,

    padding: spacing.md,

    marginTop: spacing.sm,
  },

  iconCircle: {
    width: 44,

    height: 44,

    borderRadius: 22,

    backgroundColor: colors.primaryLight,

    alignItems: "center",

    justifyContent: "center",

    marginRight: spacing.md,
  },

  flex: {
    flex: 1,
  },

  suporteTitulo: {
    fontSize: typography.size.md,

    lineHeight: typography.size.md + 6,

    fontWeight: "700",

    color: colors.primary,
  },

  suporteTexto: {
    fontSize: typography.size.sm,

    color: colors.textSecondary,

    marginTop: spacing.xs,
  },

});