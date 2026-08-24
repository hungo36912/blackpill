import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import colors from "../theme/colors";
import { spacing } from "../theme/spacing";
import { typography } from "../theme/typography";
import { radius } from "../theme/radius";

export default function RelatoriosScreen({ onVoltar }) {
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onVoltar}
          activeOpacity={0.7}
        >
          <Feather
            name="arrow-left"
            size={22}
            color={colors.text}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Relatórios
        </Text>

        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.content}>

        <View style={styles.iconContainer}>
          <Feather
            name="bar-chart-2"
            size={42}
            color={colors.primary}
          />
        </View>

        <Text style={styles.title}>
          Relatórios de medicamentos
        </Text>

        <Text style={styles.description}>
          Acompanhe informações sobre seus medicamentos,
          lembretes e histórico de utilização.
        </Text>

        <View style={styles.emptyCard}>

          <View style={styles.emptyIcon}>
            <Feather
              name="file-text"
              size={28}
              color={colors.primary}
            />
          </View>

          <Text style={styles.emptyTitle}>
            Ainda não há dados suficientes
          </Text>

          <Text style={styles.emptyText}>
            Configure seus medicamentos e lembretes
            para começar a acompanhar seu histórico
            e gerar relatórios.
          </Text>

        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    height: 64,
    paddingHorizontal: spacing.xl,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    fontSize: typography.size.xl,
    fontWeight: "700",
    color: colors.text,
  },

  headerSpacer: {
    width: 40,
  },

  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing['3xl'],
  },

  iconContainer: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: spacing.xl,
  },

  title: {
    fontSize: typography.size.xl,
    fontWeight: "700",
    color: colors.text,
    textAlign: "center",
    marginBottom: spacing.md,
  },

  description: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.textSecondary,
    textAlign: "center",
    marginHorizontal: 15,
    marginBottom: spacing['3xl'],
  },

  emptyCard: {
    backgroundColor: colors.card,
    borderRadius: radius.xl,
    padding: spacing['2xl'],
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },

  emptyIcon: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.lg,
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.text,
    textAlign: "center",
    marginBottom: spacing.sm,
  },

  emptyText: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.textSecondary,
    textAlign: "center",
  },
});
