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

export default function FaleConoscoScreen({
  onVoltar,
}) {
  const [assunto, setAssunto] = useState("");
  const [mensagem, setMensagem] = useState("");

  function enviarMensagem() {
    if (!assunto || !mensagem) {
      return;
    }

    console.log("enviando mensagem", {
      assunto,
      mensagem,
    });
  }

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
          Fale conosco
        </Text>

      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        {/* OUTROS CANAIS */}
        <Text style={styles.sectionLabel}>
          OUTROS CANAIS
        </Text>

        <View style={styles.card}>

          {/* E-MAIL */}
          <TouchableOpacity
            style={styles.canalRow}
            activeOpacity={0.7}
          >
            <View style={styles.iconCircle}>
              <Ionicons
                name="mail-outline"
                size={22}
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
              size={22}
              color={colors.textSecondary}
            />
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* WHATSAPP */}
          <TouchableOpacity
            style={styles.canalRow}
            activeOpacity={0.7}
          >
            <View style={styles.iconCircle}>
              <Ionicons
                name="logo-whatsapp"
                size={22}
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
              size={22}
              color={colors.textSecondary}
            />
          </TouchableOpacity>

        </View>

        {/* ENVIAR MENSAGEM */}
        <Text style={styles.sectionLabel}>
          OU ENVIE UMA MENSAGEM
        </Text>

        <View style={styles.card}>

          <Text style={styles.label}>
            Assunto
          </Text>

          <TouchableOpacity
            style={styles.selectInput}
            activeOpacity={0.7}
          >
            <Text
              style={
                assunto
                  ? styles.inputTexto
                  : styles.placeholderTexto
              }
            >
              {assunto || "Selecione um assunto"}
            </Text>

            <Ionicons
              name="chevron-down"
              size={20}
              color={colors.textSecondary}
            />
          </TouchableOpacity>

          <Text style={styles.labelMensagem}>
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
            textAlignVertical="top"
          />

          <TouchableOpacity
            style={styles.botao}
            onPress={enviarMensagem}
            activeOpacity={0.8}
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

    </View>
  );
}

/* ESTILOS */

const styles = StyleSheet.create({

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

  scroll: {
    flex: 1,
  },

  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing["3xl"],
  },

  /* TÍTULOS DAS SEÇÕES */

  sectionLabel: {
    fontSize: typography.size.sm,
    lineHeight: typography.size.sm + 5,

    fontWeight: "700",

    color: colors.textSecondary,

    marginTop: spacing.xl,
    marginBottom: spacing.sm,

    letterSpacing: 0.6,
  },

  /* CARDS */

  card: {
    backgroundColor: colors.card,

    borderRadius: radius.lg,

    paddingHorizontal: spacing.lg,

    overflow: "hidden",
  },

  /* CANAIS */

  canalRow: {
    minHeight: 72,

    flexDirection: "row",
    alignItems: "center",

    paddingVertical: spacing.md,
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

  canalInfo: {
    flex: 1,
  },

  canalTitulo: {
    fontSize: typography.size.md,
    lineHeight: typography.size.md + 6,

    fontWeight: "600",

    color: colors.text,
  },

  canalTexto: {
    fontSize: typography.size.sm,
    lineHeight: typography.size.sm + 5,

    color: colors.textSecondary,

    marginTop: spacing.xs,
  },

  divider: {
    height: 1,

    backgroundColor: colors.border,
  },

  /* FORMULÁRIO */

  label: {
    fontSize: typography.size.sm,

    fontWeight: "600",

    color: colors.text,

    marginBottom: spacing.sm,
  },

  labelMensagem: {
    fontSize: typography.size.sm,

    fontWeight: "600",

    color: colors.text,

    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },

  selectInput: {
    minHeight: 56,

    borderWidth: 1,
    borderColor: colors.border,

    borderRadius: radius.md,

    paddingHorizontal: spacing.md,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    backgroundColor: colors.card,
  },

  inputTexto: {
    flex: 1,

    fontSize: typography.size.sm,

    color: colors.text,
  },

  placeholderTexto: {
    flex: 1,

    fontSize: typography.size.sm,

    color: colors.placeholder,
  },

  textArea: {
    borderWidth: 1,
    borderColor: colors.border,

    borderRadius: radius.md,

    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,

    fontSize: typography.size.sm,

    color: colors.text,

    minHeight: 120,

    backgroundColor: colors.card,
  },

  /* BOTÃO */

  botao: {
    backgroundColor: colors.primary,

    borderRadius: radius.md,

    minHeight: 52,

    paddingHorizontal: spacing.lg,

    alignItems: "center",
    justifyContent: "center",

    marginTop: spacing.lg,
  },

  botaoTexto: {
    color: "#FFFFFF",

    fontSize: typography.size.md,

    fontWeight: "700",
  },

  /* RODAPÉ */

  rodape: {
    textAlign: "center",

    color: colors.textSecondary,

    fontSize: typography.size.xs,

    marginTop: spacing.xl,
  },

});