import React, { useEffect, useState } from "react";

import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import api from "../../services/api";import { Ionicons } from "@expo/vector-icons";

import PageHeader from "../../components/PageHeader";

import colors from "../../theme/colors";
import spacing from "../../theme/spacing";
import typography from "../../theme/typography";
import radius from "../../theme/radius";

const TABS = ["Em andamento", "Finalizados", "Todos"] as const;

type Tab = (typeof TABS)[number];

type HistoricoItem = {
  id: string;
  nome: string;
  dose: string;
  status: string;
};

type RemedioTratamento = {
  cd_remedio: string;
  nome: string;
  dose: string;
};

type TratamentoApi = {
  id_tratamento: string;
  nome_tratamento: string;
  data_inicio: string;
  data_fim: string | null;
  status_ativo: number | boolean;
  remedios: RemedioTratamento[];
  horarios: string[];
};

function tratamentosParaHistorico(tratamentos: TratamentoApi[]): HistoricoItem[] {
  const itens: HistoricoItem[] = [];

  for (const t of tratamentos) {
    const status = t.status_ativo ? "Pendente" : "Concluído";

    for (const remedio of t.remedios) {
      itens.push({
        id: `${t.id_tratamento}-${remedio.cd_remedio}`,
        nome: remedio.nome,
        dose: remedio.dose,
        status,
      });
    }
  }

  return itens;
}

type Props = {
  onVoltar: () => void;
};

export default function HistoricoScreen({ onVoltar }: Props) {
  const [tab, setTab] = useState<Tab>("Em andamento");
  const [historico, setHistorico] = useState<HistoricoItem[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarHistorico();
  }, []);

  async function carregarHistorico() {
    setCarregando(true);
    try {
      const { data } = await api.get("/api/tratamentos");
      setHistorico(tratamentosParaHistorico(data));
    } catch (error: any) {
      Alert.alert(
        "Não foi possível carregar",
        error.response?.data?.message || "Confira sua conexão e tente novamente."
      );
    } finally {
      setCarregando(false);
    }
  }

  const visible = historico.filter((item) => {
    if (tab === "Todos") {
      return true;
    }

    if (tab === "Finalizados") {
      return item.status === "Concluído";
    }

    return item.status !== "Concluído";
  });

  return (
    <View style={styles.container}>
      <PageHeader
        title="Histórico de tratamentos"
        onBack={onVoltar}
      />

      <View style={styles.tabs}>
        {TABS.map((item) => {
          const active = item === tab;

          return (
            <TouchableOpacity
              key={item}
              onPress={() => setTab(item)}
              activeOpacity={0.8}
              style={[
                styles.tab,
                active && styles.activeTab,
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  active && styles.activeTabText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

    <ScrollView
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {carregando ? (
        <ActivityIndicator style={{ marginTop: 40 }} color={colors.primary} />
      ) : visible.length === 0 ? (
          <View style={styles.empty}>
            <View style={styles.emptyIconCircle}>
              <Ionicons
                name="file-tray-outline"
                size={42}
                color={colors.primary}
              />
            </View>

            <Text style={styles.emptyTitle}>
              Nenhum tratamento no histórico
            </Text>

            <Text style={styles.emptyText}>
              Quando você concluir ou tiver tratamentos
              em andamento, eles aparecerão aqui.
            </Text>
          </View>
        ) : (
          visible.map((item) => (
            <View
              key={item.id}
              style={styles.historyCard}
            >
              <View style={styles.pillCircle}>
                <Ionicons
                  name="medkit-outline"
                  size={20}
                  color={colors.primary}
                />
              </View>

              <View style={styles.historyInfo}>
                <Text style={styles.historyName}>
                  {item.nome}
                </Text>

                <Text style={styles.historyDose}>
                  {item.dose}
                </Text>
              </View>

              <View style={styles.status}>
                <Text style={styles.statusText}>
                  {item.status}
                </Text>
              </View>
            </View>
          ))
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

  tabs: {
    flexDirection: "row",
    marginHorizontal: spacing.lg,
    marginBottom: spacing.xs,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.xs,
  },

  tab: {
    flex: 1,
    height: 34,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },

  activeTab: {
    backgroundColor: colors.primary,
  },

  tabText: {
    fontSize: typography.size.xs,
    fontWeight: typography.weight.semibold,
    color: colors.textSecondary,
  },

  activeTabText: {
    color: colors.card,
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing["3xl"],
  },

  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing["3xl"],
  },

  emptyIconCircle: {
    width: 96,
    height: 96,
    borderRadius: radius["2xl"] + 16,
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.lg,
  },

  emptyTitle: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.bold,
    color: colors.text,
    textAlign: "center",
  },

  emptyText: {
    maxWidth: 290,
    marginTop: spacing.xs,
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.body,
    color: colors.textSecondary,
    textAlign: "center",
  },

  historyCard: {
    minHeight: 70,
    marginTop: spacing.md,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
  },

  pillCircle: {
    width: 40,
    height: 40,
    borderRadius: radius["2xl"],
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },

  historyInfo: {
    flex: 1,
  },

  historyName: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.semibold,
    color: colors.text,
  },

  historyDose: {
    marginTop: spacing.xs,
    fontSize: typography.size.xs,
    color: colors.textSecondary,
  },

  status: {
    backgroundColor: colors.primaryLight,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },

  statusText: {
    fontSize: typography.size.xs,
    fontWeight: typography.weight.bold,
    color: colors.primary,
  },
});