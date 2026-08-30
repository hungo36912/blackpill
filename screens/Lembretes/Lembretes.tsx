import React from "react";

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from "react-native";

import colors from "../../theme/colors";
import spacing from "../../theme/spacing";
import typography from "../../theme/typography";
import radius from "../../theme/radius";

import {
  ArrowLeft,
  Bell,
  Plus,
  Settings,
  CalendarDays,
  ChevronRight,
} from "lucide-react-native";

const { width } = Dimensions.get("window");

const GREEN = colors.reminder;
const DARK_GREEN = colors.reminderDark;
const TEXT = colors.reminderText;

type Props = {
  onVoltar: () => void;
  onAdicionarLembrete: () => void;
  onAbrirConfiguracoes: () => void;
};

export default function Lembretes({
  onVoltar,
  onAdicionarLembrete,
  onAbrirConfiguracoes,
}: Props) {
  function abrirCalendario() {
    console.log("Calendário de tratamento");
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.card}
      />

      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.botaoVoltar}
            onPress={onVoltar}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Voltar"
          >
            <ArrowLeft
              size={28}
              color={TEXT}
              strokeWidth={2.5}
            />
          </TouchableOpacity>

          <Text style={styles.tituloHeader}>
            Lembretes
          </Text>

          <View style={styles.espacoHeader} />
        </View>

        <View style={styles.conteudo}>
          <View style={styles.ilustracao}>
            <View style={styles.circuloIlustracao} />
            <View style={styles.ponto1} />
            <View style={styles.ponto2} />
            <View style={styles.ponto3} />

            <Bell
              size={120}
              color={GREEN}
              strokeWidth={1.8}
            />
          </View>

          <Text style={styles.titulo}>
            Nenhum lembrete{"\n"}
            cadastrado
          </Text>

          <Text style={styles.descricao}>
            Você ainda não possui{"\n"}
            lembretes de medicamentos.{"\n"}
            Adicione um para receber{"\n"}
            avisos nos horários.
          </Text>

          <TouchableOpacity
            style={styles.botaoAdicionar}
            onPress={onAdicionarLembrete}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="Adicionar lembrete"
          >
            <Plus
              size={28}
              color={colors.card}
              strokeWidth={2.2}
            />

            <Text style={styles.textoBotao}>
              Adicionar lembrete
            </Text>
          </TouchableOpacity>

          <View style={styles.opcoes}>
            <TouchableOpacity
              style={styles.card}
              onPress={onAbrirConfiguracoes}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel="Configurações"
              accessibilityHint="Sons, vibrações e notificações"
            >
              <View style={styles.iconeCard}>
                <Settings
                  size={34}
                  color={DARK_GREEN}
                  strokeWidth={1.8}
                />
              </View>

              <View style={styles.textosCard}>
                <Text style={styles.tituloCard}>
                  Configurações
                </Text>

                <Text style={styles.descricaoCard}>
                  Sons, vibrações e notificações
                </Text>
              </View>

              <ChevronRight
                size={26}
                color={TEXT}
                strokeWidth={2.5}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.card}
              onPress={abrirCalendario}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel="Calendário de tratamento"
              accessibilityHint="Visualizar todos os horários"
            >
              <View style={styles.iconeCard}>
                <CalendarDays
                  size={34}
                  color={DARK_GREEN}
                  strokeWidth={1.8}
                />
              </View>

              <View style={styles.textosCard}>
                <Text style={styles.tituloCard}>
                  Calendário de tratamento
                </Text>

                <Text style={styles.descricaoCard}>
                  Visualizar todos os horários
                </Text>
              </View>

              <ChevronRight
                size={26}
                color={TEXT}
                strokeWidth={2.5}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.card,
  },

  container: {
    flex: 1,
    backgroundColor: colors.card,
  },

  header: {
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  botaoVoltar: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },

  tituloHeader: {
    flex: 1,
    textAlign: "center",
    fontSize: typography.size.xl,
    lineHeight: typography.size.xl + 8,
    fontWeight: "700",
    color: TEXT,
  },

  espacoHeader: {
    width: 48,
  },

  conteudo: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: spacing.xl,
  },

  ilustracao: {
    width: width * 0.68,
    height: width * 0.68,
    maxWidth: 270,
    maxHeight: 270,
    marginTop: spacing.sm,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  circuloIlustracao: {
    position: "absolute",
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: colors.primaryLight,
  },

  ponto1: {
    position: "absolute",
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primaryLight,
    top: 20,
    left: 30,
  },

  ponto2: {
    position: "absolute",
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: colors.primaryLight,
    top: 75,
    right: 15,
  },

  ponto3: {
    position: "absolute",
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.primaryLight,
    bottom: 55,
    left: 40,
  },

  titulo: {
    marginTop: -5,
    textAlign: "center",
    fontSize: typography.size.xl + 2,
    lineHeight: typography.size.xl + 12,
    fontWeight: "700",
    color: TEXT,
  },

  descricao: {
    marginTop: spacing.md,
    textAlign: "center",
    fontSize: typography.size.md,
    lineHeight: typography.size.md + 9,
    color: colors.textSecondary,
  },

  botaoAdicionar: {
    marginTop: spacing.lg,
    width: "88%",
    minHeight: 58,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    backgroundColor: GREEN,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
  },

  textoBotao: {
    color: colors.card,
    fontSize: typography.size.md,
    lineHeight: typography.size.md + 6,
    fontWeight: "700",
  },

  opcoes: {
    width: "100%",
    marginTop: "auto",
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    gap: spacing.sm,
  },

  card: {
    width: "100%",
    minHeight: 76,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
  },

  iconeCard: {
    width: 52,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: colors.primaryLight,
  },

  textosCard: {
    flex: 1,
    paddingRight: spacing.sm,
  },

  tituloCard: {
    fontSize: typography.size.md,
    lineHeight: typography.size.md + 6,
    fontWeight: "600",
    color: TEXT,
  },

  descricaoCard: {
    fontSize: typography.size.sm,
    lineHeight: typography.size.sm + 5,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
});