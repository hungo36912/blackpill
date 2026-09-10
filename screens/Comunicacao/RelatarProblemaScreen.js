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

const TIPOS_PROBLEMA = [
  "Lembretes não estão funcionando",
  "Erro ao sincronizar dados",
  "O app travou ou fechou sozinho",
  "Outro",
];

export default function RelatarProblemaScreen({
  onVoltar,
}) {
  const [tipoSelecionado, setTipoSelecionado] =
    useState(TIPOS_PROBLEMA[0]);

  const [descricao, setDescricao] = useState("");

  const [imagemAnexada, setImagemAnexada] =
    useState(null);

  function enviarRelatorio() {
    const payload = {
      tipo: tipoSelecionado,
      descricao,
      imagem: imagemAnexada,
    };

    console.log("enviando relatorio", payload);
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
          Relatar problema
        </Text>

      </View>

      <ScrollView
        contentContainerStyle={styles.content}
      >

        <View style={styles.card}>

          <Text style={styles.label}>
            Tipo de problema
          </Text>

          {TIPOS_PROBLEMA.map((tipo) => {
            const selecionado =
              tipo === tipoSelecionado;

            return (
              <TouchableOpacity
                key={tipo}
                style={styles.opcaoRow}
                onPress={() =>
                  setTipoSelecionado(tipo)
                }
              >
                <Text style={styles.opcaoTexto}>
                  {tipo}
                </Text>

                <View
                  style={[
                    styles.radioExterno,
                    selecionado &&
                      styles.radioExternoAtivo,
                  ]}
                >
                  {selecionado && (
                    <View
                      style={styles.radioInterno}
                    />
                  )}
                </View>

              </TouchableOpacity>
            );
          })}

          <Text style={styles.labelDescricao}>
            Descreva o que aconteceu
          </Text>

          <TextInput
            style={styles.textArea}
            placeholder="Ex: o lembrete das 08:00 não tocou hoje..."
            placeholderTextColor={colors.placeholder}
            multiline
            numberOfLines={4}
            value={descricao}
            onChangeText={setDescricao}
          />

          <Text style={styles.labelAnexo}>
            Anexar print (opcional)
          </Text>

          <TouchableOpacity
            style={styles.anexoBox}
            onPress={() =>
              setImagemAnexada("foto.png")
            }
          >
            <Ionicons
              name="camera-outline"
              size={22}
              color={colors.textSecondary}
            />

            <Text style={styles.anexoTexto}>
              {imagemAnexada
                ? imagemAnexada
                : "Toque para adicionar imagem"}
            </Text>

          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botao}
            onPress={enviarRelatorio}
          >
            <Text style={styles.botaoTexto}>
              Enviar relatório
            </Text>
          </TouchableOpacity>

        </View>

        <Text style={styles.rodape}>
          Suas informações de dispositivo e versão do app serão incluídas automaticamente
        </Text>

      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.background,
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

  content: {
    paddingHorizontal: spacing.lg,

    paddingBottom: spacing["3xl"],
  },

  card: {
    backgroundColor: colors.card,

    borderRadius: radius.lg,

    padding: spacing.lg,

    marginTop: spacing.sm,
  },

  label: {
    fontSize: typography.size.sm,

    fontWeight: "700",

    color: colors.text,

    marginBottom: spacing.sm,
  },

  labelDescricao: {
    fontSize: typography.size.sm,

    fontWeight: "700",

    color: colors.text,

    marginTop: spacing.xl,

    marginBottom: spacing.sm,
  },

  labelAnexo: {
    fontSize: typography.size.sm,

    fontWeight: "700",

    color: colors.text,

    marginTop: spacing.xl,

    marginBottom: spacing.sm,
  },

  opcaoRow: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    paddingVertical: spacing.md,

    borderBottomWidth: 1,

    borderBottomColor: colors.border,
  },

  opcaoTexto: {
    fontSize: typography.size.sm,

    color: colors.text,

    flex: 1,

    marginRight: spacing.sm,
  },

  radioExterno: {
    width: 20,

    height: 20,

    borderRadius: 10,

    borderWidth: 2,

    borderColor: colors.border,

    alignItems: "center",

    justifyContent: "center",
  },

  radioExternoAtivo: {
    borderColor: colors.primary,
  },

  radioInterno: {
    width: 10,

    height: 10,

    borderRadius: 5,

    backgroundColor: colors.primary,
  },

  textArea: {
    borderWidth: 1,

    borderColor: colors.border,

    borderRadius: radius.md,

    paddingHorizontal: spacing.md,

    paddingVertical: spacing.sm,

    fontSize: typography.size.sm,

    color: colors.text,

    minHeight: 90,

    textAlignVertical: "top",
  },

  anexoBox: {
    borderWidth: 1,

    borderStyle: "dashed",

    borderColor: colors.border,

    borderRadius: radius.md,

    paddingVertical: spacing.xl,

    alignItems: "center",

    justifyContent: "center",
  },

  anexoTexto: {
    color: colors.textSecondary,

    fontSize: typography.size.xs,

    marginTop: spacing.xs,
  },

  botao: {
    backgroundColor: colors.primary,

    borderRadius: radius.md,

    paddingVertical: spacing.lg,

    alignItems: "center",

    marginTop: spacing.xl,
  },

  botaoTexto: {
    color: "#fff",

    fontSize: typography.size.md,

    fontWeight: "700",
  },

  rodape: {
    textAlign: "center",

    color: colors.textSecondary,

    fontSize: typography.size.xs,

    marginTop: spacing.lg,
  },

});