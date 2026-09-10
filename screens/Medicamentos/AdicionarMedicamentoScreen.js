import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import colors from "../../theme/colors";
import spacing from "../../theme/spacing";
import typography from "../../theme/typography";

import SearchBar from "../../components/SearchBar";
import TipCard from "../../components/TipCard";

export default function AdicionarMedicamentoScreen({
  onVoltar,
}) {
  const [search, setSearch] = useState("");

  return (
    <View style={styles.container}>

      {/* CABEÇALHO */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.7}
          onPress={onVoltar}
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
          Adicionar medicamento
        </Text>
      </View>

      {/* CONTEÚDO */}
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.question}>
          Qual medicamento você deseja adicionar?
        </Text>

        <Text style={styles.subtext}>
          Pesquise pelo nome comercial ou pelo princípio ativo (DCB).
        </Text>

        <View style={styles.searchWrap}>
          <SearchBar
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <TipCard
          text="Comece digitando parte do nome do medicamento."
        />
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  /* CABEÇALHO PADRONIZADO */
  header: {
    minHeight: 75,
    backgroundColor: colors.authBackground,
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

  backButton: {
    position: "absolute",
    left: spacing.lg,
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },

  headerTitle: {
    color: colors.text,
    fontSize: typography.size.xl,
    lineHeight: typography.size.xl + 8,
    fontWeight: "800",
    textAlign: "center",
  },

  /* CONTEÚDO */
  screen: {
    flex: 1,
  },

  content: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing["4xl"],
  },

  question: {
    fontSize: typography.size.xl,
    fontWeight: "700",
    color: colors.primary,
    lineHeight: 28,
    marginBottom: spacing.md,
  },

  subtext: {
    fontSize: 13.5,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: spacing.xl + 2,
  },

  searchWrap: {
    marginBottom: spacing.xl + 2,
  },
});