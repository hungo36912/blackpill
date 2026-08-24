import React, { useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import colors from "../theme/colors";

type Props = {
  onVoltar: () => void;
};

export default function BackupSincronizacaoScreen({
  onVoltar,
}: Props) {
  const [sincronizacaoAtiva, setSincronizacaoAtiva] =
    useState<boolean>(true);

  const [ultimoBackup] =
    useState<string>("hoje às 07:42");

  function fazerBackupAgora(): void {
    console.log("fazendo backup agora");
  }

  function restaurarBackup(): void {
    Alert.alert(
      "Restaurar backup",
      "Isso vai substituir os dados atuais do app pelos dados do último backup. Deseja continuar?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Restaurar",
          style: "destructive",
          onPress: () =>
            console.log("restaurando"),
        },
      ]
    );
  }

  return (
    <SafeAreaView style={styles.container}>
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
          Backup e sincronização
        </Text>

        <View style={styles.espacoHeader} />
      </View>

      <View style={styles.content}>
        <View style={styles.statusCard}>
          <View style={styles.statusIcon}>
            <Ionicons
              name="cloud-done-outline"
              size={25}
              color={colors.primary}
            />
          </View>

          <View style={styles.statusConteudo}>
            <Text style={styles.statusTitulo}>
              Backup atualizado
            </Text>

            <Text style={styles.statusTexto}>
              Último backup: {ultimoBackup}
            </Text>
          </View>
        </View>

        <Text style={styles.sectionLabel}>
          CONTA
        </Text>

        <TouchableOpacity
          style={styles.contaCard}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Conta Google Drive conectada"
        >
          <View style={styles.avatar}>
            <Text style={styles.avatarTexto}>
              MJ
            </Text>
          </View>

          <View style={styles.contaConteudo}>
            <Text style={styles.contaEmail}>
              maria.j@email.com
            </Text>

            <Text style={styles.contaTexto}>
              Google Drive conectado
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={22}
            color={colors.textSecondary}
          />
        </TouchableOpacity>

        <Text style={styles.sectionLabel}>
          PREFERÊNCIAS
        </Text>

        <View style={styles.preferenciaCard}>
          <View style={styles.preferenciaConteudo}>
            <Text style={styles.preferenciaTitulo}>
              Sincronização automática
            </Text>

            <Text style={styles.preferenciaTexto}>
              Salva lembretes e bulas em nuvem
            </Text>
          </View>

          <Switch
            value={sincronizacaoAtiva}
            onValueChange={setSincronizacaoAtiva}
            trackColor={{
              false: colors.border,
              true: colors.primary,
            }}
            thumbColor="#FFFFFF"
            accessibilityLabel="Sincronização automática"
            accessibilityRole="switch"
            accessibilityState={{
              checked: sincronizacaoAtiva,
            }}
          />
        </View>

        <TouchableOpacity
          style={styles.botaoSecundario}
          onPress={fazerBackupAgora}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Fazer backup agora"
        >
          <Ionicons
            name="refresh-outline"
            size={23}
            color={colors.text}
          />

          <Text style={styles.botaoSecundarioTexto}>
            Fazer backup agora
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoPerigo}
          onPress={restaurarBackup}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Restaurar backup"
        >
          <Text style={styles.botaoPerigoTexto}>
            Restaurar backup
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  botaoVoltar: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 21,
    lineHeight: 29,
    fontWeight: "700",
    color: colors.text,
  },

  espacoHeader: {
    width: 48,
  },

  content: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 18,
  },

  statusCard: {
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primaryLight,
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 15,
  },

  statusIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.card,
    alignItems: "center",
    justifyContent: "center",
  },

  statusConteudo: {
    flex: 1,
    marginLeft: 14,
  },

  statusTitulo: {
    fontSize: 17,
    lineHeight: 23,
    fontWeight: "700",
    color: colors.primary,
  },

  statusTexto: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.primary,
    marginTop: 3,
  },

  sectionLabel: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "700",
    color: colors.textSecondary,
    marginTop: 24,
    marginBottom: 10,
    letterSpacing: 0.6,
  },

  contaCard: {
    minHeight: 72,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.text,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  avatarTexto: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
  },

  contaConteudo: {
    flex: 1,
  },

  contaEmail: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "600",
    color: colors.text,
  },

  contaTexto: {
    fontSize: 14,
    lineHeight: 19,
    color: colors.textSecondary,
    marginTop: 3,
  },

  preferenciaCard: {
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  preferenciaConteudo: {
    flex: 1,
    paddingRight: 12,
  },

  preferenciaTitulo: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "600",
    color: colors.text,
  },

  preferenciaTexto: {
    fontSize: 14,
    lineHeight: 19,
    color: colors.textSecondary,
    marginTop: 3,
  },

  botaoSecundario: {
    minHeight: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginTop: 24,
  },

  botaoSecundarioTexto: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "600",
    color: colors.text,
    marginLeft: 10,
  },

  botaoPerigo: {
    minHeight: 56,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.danger,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginTop: 12,
  },

  botaoPerigoTexto: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "600",
    color: colors.danger,
  },
});