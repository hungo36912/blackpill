import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import colors from "../../theme/colors";
import spacing from "../../theme/spacing";
import typography from "../../theme/typography";
import radius from "../../theme/radius";

export default function ConfiguracoesScreen({
  onVoltar,
  onAbrirNotificacoes,
  onAbrirPrivacidade,
  onAbrirSobre,
  onAbrirTermos,
  onAbrirPerguntas,
  onAbrirFaleConosco,
  onAbrirRelatarProblema,
}) {
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
          Configurações
        </Text>

      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        {/* GERAL */}
        <Text style={styles.sectionLabel}>
          GERAL
        </Text>

        <View style={styles.card}>
          <ItemMenu
            icon="notifications-outline"
            titulo="Notificações"
            subtitulo="Sons, vibrações e lembretes"
            onPress={onAbrirNotificacoes}
          />
        </View>

        {/* SEGURANÇA */}
        <Text style={styles.sectionLabel}>
          SEGURANÇA
        </Text>

        <View style={styles.card}>
          <ItemMenu
            icon="lock-closed-outline"
            titulo="Privacidade"
            subtitulo="Política e permissões"
            onPress={onAbrirPrivacidade}
          />
        </View>

        {/* SUPORTE */}
        <Text style={styles.sectionLabel}>
          SUPORTE
        </Text>

        <View style={styles.card}>

          <ItemMenu
            icon="information-circle-outline"
            titulo="Sobre o aplicativo"
            subtitulo="Versão 0.0.7"
            onPress={onAbrirSobre}
          />

          <Divisor />

          <ItemMenu
            icon="document-text-outline"
            titulo="Termos de uso"
            onPress={onAbrirTermos}
          />

          <Divisor />

          <ItemMenu
            icon="help-circle-outline"
            titulo="Perguntas frequentes"
            onPress={onAbrirPerguntas}
          />

          <Divisor />

          <ItemMenu
            icon="chatbubble-ellipses-outline"
            titulo="Fale conosco"
            onPress={onAbrirFaleConosco}
          />

          <Divisor />

          <ItemMenu
            icon="bug-outline"
            titulo="Relatar problema"
            onPress={onAbrirRelatarProblema}
          />

        </View>

      </ScrollView>

    </View>
  );
}

/* ITEM DO MENU */

function ItemMenu({
  icon,
  titulo,
  subtitulo,
  onPress,
  custom,
}) {
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={0.7}
      accessibilityRole={onPress ? "button" : undefined}
      accessibilityLabel={titulo}
    >

      <View style={styles.itemIconCircle}>
        <Ionicons
          name={icon}
          size={22}
          color={colors.primary}
        />
      </View>

      <View style={styles.itemConteudo}>

        <Text style={styles.itemTitulo}>
          {titulo}
        </Text>

        {subtitulo && (
          <Text style={styles.itemSubtitulo}>
            {subtitulo}
          </Text>
        )}

        {custom}

      </View>

      {onPress && (
        <Ionicons
          name="chevron-forward"
          size={22}
          color={colors.textSecondary}
        />
      )}

    </TouchableOpacity>
  );
}

/* DIVISOR */

function Divisor() {
  return (
    <View style={styles.divisor} />
  );
}

/* ESTILOS */

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.authBackground,
  },

  /* HEADER IGUAL AO DA AGENDA */

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

  sectionLabel: {
    fontSize: typography.size.sm,
    lineHeight: typography.size.sm + 5,
    fontWeight: "700",
    color: colors.textSecondary,

    marginTop: spacing.xl,
    marginBottom: spacing.sm,

    letterSpacing: 0.6,
  },

  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    overflow: "hidden",
  },

  item: {
    minHeight: 72,

    flexDirection: "row",
    alignItems: "center",

    paddingVertical: spacing.md,
  },

  itemIconCircle: {
    width: 44,
    height: 44,

    borderRadius: 22,

    backgroundColor: colors.primaryLight,

    alignItems: "center",
    justifyContent: "center",

    marginRight: spacing.md,
  },

  itemConteudo: {
    flex: 1,
  },

  itemTitulo: {
    fontSize: typography.size.md,
    lineHeight: typography.size.md + 6,

    fontWeight: "600",

    color: colors.text,
  },

  itemSubtitulo: {
    fontSize: typography.size.sm,
    lineHeight: typography.size.sm + 5,

    color: colors.textSecondary,

    marginTop: spacing.xs,
  },

  divisor: {
    height: 1,
    backgroundColor: colors.border,
  },

});