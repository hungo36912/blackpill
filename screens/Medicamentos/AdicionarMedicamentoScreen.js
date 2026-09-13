import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import colors from "../../theme/colors";
import spacing from "../../theme/spacing";
import typography from "../../theme/typography";

import SearchBar from "../../components/SearchBar";
import TipCard from "../../components/TipCard";

import api from "../../services/api";

export default function AdicionarMedicamentoScreen({
  onVoltar,
  onSelecionarMedicamento,
}) {
  const [search, setSearch] = useState("");
  const [medicamentos, setMedicamentos] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const buscarMedicamentos = async () => {
      if (!search.trim()) {
        setMedicamentos([]);
        setErro("");
        return;
      }

      try {
        setCarregando(true);
        setErro("");

        const response = await api.get("/remedios", {
          params: {
            q: search.trim(),
            page: 1,
            limit: 20,
          },
        });

        setMedicamentos(response.data?.data || []);
      } catch (error) {
        console.error("Erro ao buscar medicamentos:", error);
        setMedicamentos([]);
        setErro("Não foi possível buscar os medicamentos.");
      } finally {
        setCarregando(false);
      }
    };

    const timer = setTimeout(buscarMedicamentos, 400);

    return () => clearTimeout(timer);
  }, [search]);

  const selecionarMedicamento = (medicamento) => {
    if (onSelecionarMedicamento) {
      onSelecionarMedicamento(medicamento);
    }
  };

  return (
    <View style={styles.container}>
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

      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
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

        {carregando && (
          <View style={styles.loading}>
            <ActivityIndicator
              size="small"
              color={colors.primary}
            />

            <Text style={styles.loadingText}>
              Buscando medicamentos...
            </Text>
          </View>
        )}

        {erro !== "" && !carregando && (
          <Text style={styles.errorText}>
            {erro}
          </Text>
        )}

        {!carregando &&
          erro === "" &&
          search.trim() !== "" &&
          medicamentos.length === 0 && (
            <View style={styles.emptyResult}>
              <Ionicons
                name="search-outline"
                size={34}
                color={colors.textSecondary}
              />

              <Text style={styles.emptyTitle}>
                Nenhum medicamento encontrado
              </Text>

              <Text style={styles.emptyText}>
                Tente pesquisar por outro nome ou princípio ativo.
              </Text>
            </View>
          )}

        {!carregando && medicamentos.length > 0 && (
          <View style={styles.results}>
            <Text style={styles.resultsTitle}>
              Medicamentos encontrados
            </Text>

            {medicamentos.map((medicamento) => (
              <TouchableOpacity
                key={medicamento.cd_remedio}
                style={styles.medicamentoCard}
                activeOpacity={0.75}
                onPress={() =>
                  selecionarMedicamento(medicamento)
                }
              >
                <View style={styles.medicamentoIcon}>
                  <Ionicons
                    name="medkit-outline"
                    size={26}
                    color={colors.primary}
                  />
                </View>

                <View style={styles.medicamentoInfo}>
                  <Text style={styles.medicamentoNome}>
                    {medicamento.nome}
                  </Text>

                  {medicamento.marca && (
                    <Text style={styles.medicamentoMarca}>
                      {medicamento.marca}
                    </Text>
                  )}

                  <View style={styles.medicamentoDetails}>
                    {medicamento.fabricante && (
                      <Text style={styles.detailText}>
                        {medicamento.fabricante}
                      </Text>
                    )}

                    {medicamento.concentracao && (
                      <Text style={styles.detailText}>
                        {medicamento.concentracao}
                      </Text>
                    )}
                  </View>
                </View>

                <Ionicons
                  name="chevron-forward"
                  size={22}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            ))}
          </View>
        )}

        {!search.trim() && (
          <TipCard
            text="Comece digitando parte do nome do medicamento."
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

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

  loading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.lg,
  },

  loadingText: {
    marginLeft: spacing.sm,
    fontSize: 16,
    color: colors.textSecondary,
  },

  errorText: {
    fontSize: 16,
    color: colors.error,
    textAlign: "center",
    lineHeight: 22,
    marginTop: spacing.md,
  },

  results: {
    marginTop: spacing.sm,
  },

  resultsTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.md,
  },

  medicamentoCard: {
    minHeight: 82,
    backgroundColor: colors.authBackground,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    flexDirection: "row",
    alignItems: "center",
  },

  medicamentoIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
  },

  medicamentoInfo: {
    flex: 1,
  },

  medicamentoNome: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 3,
  },

  medicamentoMarca: {
    fontSize: 15,
    color: colors.textSecondary,
    marginBottom: 4,
  },

  medicamentoDetails: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },

  detailText: {
    fontSize: 14,
    color: colors.textSecondary,
  },

  emptyResult: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    textAlign: "center",
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },

  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 22,
    textAlign: "center",
  },
});