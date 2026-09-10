import React, { useEffect, useState } from "react";

import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import colors from "../../theme/colors";
import spacing from "../../theme/spacing";
import typography from "../../theme/typography";
import radius from "../../theme/radius";

import api from "../../services/api";

// ---------- conversões tela <-> API ----------

const SEXO_PARA_API = {
  Masculino: "M",
  Feminino: "F",
  Outro: "O",
};

const SEXO_PARA_TELA = {
  M: "Masculino",
  F: "Feminino",
  O: "Outro",
};

function numeroDaString(valor) {
  const limpo = valor
    .replace(/[^\d.,]/g, "")
    .replace(",", ".");

  return parseFloat(limpo);
}

function brParaIso(dataBr) {
  const [d, m, y] = dataBr.split("/");

  return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
}

function isoParaBr(dataIso) {
  const [y, m, d] = dataIso
    .slice(0, 10)
    .split("-");

  return `${d}/${m}/${y}`;
}

function dataValida(data) {
  const match = data.match(
    /^(\d{2})\/(\d{2})\/(\d{4})$/
  );

  if (!match) return false;

  const [, diaStr, mesStr, anoStr] = match;

  const dia = Number(diaStr);
  const mes = Number(mesStr);
  const ano = Number(anoStr);

  if (mes < 1 || mes > 12) return false;

  const diasNoMes = new Date(
    ano,
    mes,
    0
  ).getDate();

  if (dia < 1 || dia > diasNoMes) {
    return false;
  }

  const dataInformada = new Date(
    ano,
    mes - 1,
    dia
  );

  if (dataInformada > new Date()) {
    return false;
  }

  return true;
}

function fichaParaPayload(f) {
  return {
    altura: numeroDaString(f.altura),
    peso: numeroDaString(f.peso),
    sexo:
      SEXO_PARA_API[f.sexo] ?? f.sexo,
    data_nascimento: brParaIso(
      f.dataNascimento
    ),
    alergias: f.alergias,
    obs: f.observacoes,
    cond_saude: f.condicoes,
  };
}

function payloadParaFicha(
  p,
  extras = {}
) {
  return {
    nome: extras.nome ?? "",
    dataNascimento: isoParaBr(
      p.data_nascimento
    ),
    sexo:
      SEXO_PARA_TELA[p.sexo] ??
      p.sexo,
    peso: `${p.peso} Kg`,
    altura: `${String(p.altura).replace(
      ".",
      ","
    )} m`,
    condicoes:
      p.cond_saude ?? "",
    alergias:
      p.alergias ?? "",
    observacoes:
      p.obs ?? "",
  };
}

// ---------- componente de campo ----------

function Field({
  label,
  value,
  editing,
  multiline,
  onChangeText,
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>
        {label}
      </Text>

      {editing ? (
        <TextInput
          value={value}
          onChangeText={onChangeText}
          multiline={multiline}
          style={[
            styles.input,
            multiline &&
              styles.textArea,
          ]}
          placeholder={
            multiline
              ? "Digite aqui..."
              : ""
          }
          placeholderTextColor={
            colors.placeholder
          }
        />
      ) : (
        <>
          <Text
            style={styles.value}
            numberOfLines={
              multiline ? 2 : 1
            }
          >
            {value || "—"}
          </Text>

          <Ionicons
            name="chevron-forward"
            size={20}
            color={colors.textSecondary}
            style={styles.chevron}
          />
        </>
      )}
    </View>
  );
}

const SEXO_OPCOES = [
  "Masculino",
  "Feminino",
  "Outro",
];

function SexoField({
  value,
  editing,
  onChange,
}) {
  const [open, setOpen] =
    useState(false);

  if (!editing) {
    return (
      <View style={styles.field}>
        <Text style={styles.label}>
          Sexo
        </Text>

        <Text style={styles.value}>
          {value || "—"}
        </Text>

        <Ionicons
          name="chevron-forward"
          size={20}
          color={colors.textSecondary}
          style={styles.chevron}
        />
      </View>
    );
  }

  return (
    <View style={styles.field}>
      <Text style={styles.label}>
        Sexo
      </Text>

      <TouchableOpacity
        style={styles.input}
        activeOpacity={0.7}
        onPress={() =>
          setOpen((o) => !o)
        }
      >
        <Text
          style={{
            color: value
              ? colors.text
              : colors.placeholder,
            fontSize: 13,
          }}
        >
          {value || "Selecione"}
        </Text>

        <Ionicons
          name={
            open
              ? "chevron-up"
              : "chevron-down"
          }
          size={18}
          color={colors.textSecondary}
        />
      </TouchableOpacity>

      {open && (
        <View
          style={styles.dropdown}
        >
          {SEXO_OPCOES.map(
            (opcao) => (
              <TouchableOpacity
                key={opcao}
                style={
                  styles.dropdownItem
                }
                activeOpacity={0.7}
                onPress={() => {
                  onChange(opcao);
                  setOpen(false);
                }}
              >
                <Text
                  style={
                    styles.dropdownItemText
                  }
                >
                  {opcao}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>
      )}
    </View>
  );
}

export default function FichaMedicaScreen({
  onVoltar,
}) {
  const [loading, setLoading] =
    useState(true);

  const [salvando, setSalvando] =
    useState(false);

  const [editing, setEditing] =
    useState(false);

  const [existeFicha, setExisteFicha] =
    useState(false);

  const [ficha, setFicha] =
    useState({
      nome: "",
      dataNascimento: "",
      sexo: "",
      peso: "",
      altura: "",
      condicoes: "",
      alergias: "",
      observacoes: "",
    });

  const [draft, setDraft] =
    useState({
      nome: "",
      dataNascimento: "",
      sexo: "",
      peso: "",
      altura: "",
      condicoes: "",
      alergias: "",
      observacoes: "",
    });

  useEffect(() => {
    carregarFicha();
  }, []);

  async function carregarFicha() {
    setLoading(true);

    try {
      const [
        respUsuario,
        respFicha,
      ] = await Promise.allSettled([
        api.get("/api/auth/me"),
        api.get("/api/ficha"),
      ]);

      const nome =
        respUsuario.status ===
        "fulfilled"
          ? respUsuario.value.data.nome
          : "";

      if (
        respFicha.status ===
        "fulfilled"
      ) {
        setFicha(
          payloadParaFicha(
            respFicha.value.data,
            { nome }
          )
        );

        setExisteFicha(true);
      } else if (
        respFicha.reason?.response
          ?.status === 404
      ) {
        setFicha({
          nome,
          dataNascimento: "",
          sexo: "",
          peso: "",
          altura: "",
          condicoes: "",
          alergias: "",
          observacoes: "",
        });

        setExisteFicha(false);
      } else {
        Alert.alert(
          "Erro",
          "Não foi possível carregar a ficha médica."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  function update(key, value) {
    setDraft((old) => ({
      ...old,
      [key]: value,
    }));
  }

  async function toggleEditing() {
    if (!editing) {
      setDraft(ficha);
      setEditing(true);
      return;
    }

    if (
      !dataValida(
        draft.dataNascimento
      )
    ) {
      Alert.alert(
        "Data inválida",
        "Informe a data de nascimento no formato dd/mm/aaaa."
      );

      return;
    }

    setSalvando(true);

    try {
      const payload =
        fichaParaPayload(draft);

      const metodo = existeFicha
        ? "put"
        : "post";

      await api[metodo](
        "/api/ficha",
        payload
      );

      setFicha(draft);
      setExisteFicha(true);
      setEditing(false);
    } catch (error) {
      const mensagem =
        error.response?.data
          ?.message ||
        "Não foi possível salvar a ficha médica.";

      Alert.alert(
        "Erro ao salvar",
        mensagem
      );
    } finally {
      setSalvando(false);
    }
  }

  // ------------------ tela real ------------------------

  if (loading) {
    return (
      <View style={styles.container}>
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

          <Text
            style={styles.headerTitle}
          >
            Ficha médica
          </Text>
        </View>

        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color={colors.primary}
          />

          <Text style={styles.loadingText}>
            Carregando ficha médica...
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
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

        <Text
          style={styles.headerTitle}
        >
          Ficha médica
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={
          styles.content
        }
        showsVerticalScrollIndicator={
          false
        }
      >
        <View style={styles.intro}>
          <View style={styles.introIcon}>
            <Ionicons
              name="medical-outline"
              size={25}
              color={colors.primary}
            />
          </View>

          <View style={styles.introTextContainer}>
            <Text style={styles.introTitle}>
              Suas informações de saúde
            </Text>

            <Text style={styles.introText}>
              Mantenha seus dados atualizados
              para facilitar o acompanhamento
              das suas informações.
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>
          Informações pessoais
        </Text>

        <View style={styles.card}>
          <Field
            label="Nome"
            value={
              editing
                ? draft.nome
                : ficha.nome
            }
            editing={editing}
            onChangeText={(value) =>
              update("nome", value)
            }
          />

          <Field
            label="Data de nascimento"
            value={
              editing
                ? draft.dataNascimento
                : ficha.dataNascimento
            }
            editing={editing}
            onChangeText={(value) =>
              update(
                "dataNascimento",
                value
              )
            }
          />

          <SexoField
            value={
              editing
                ? draft.sexo
                : ficha.sexo
            }
            editing={editing}
            onChange={(value) =>
              update("sexo", value)
            }
          />

          <Field
            label="Peso"
            value={
              editing
                ? draft.peso
                : ficha.peso
            }
            editing={editing}
            onChangeText={(value) =>
              update("peso", value)
            }
          />

          <Field
            label="Altura"
            value={
              editing
                ? draft.altura
                : ficha.altura
            }
            editing={editing}
            onChangeText={(value) =>
              update(
                "altura",
                value.replace(
                  ",",
                  "."
                )
              )
            }
          />
        </View>

        <Text style={styles.sectionTitle}>
          Informações de saúde
        </Text>

        <View style={styles.card}>
          <Field
            label="Condições de saúde"
            value={
              editing
                ? draft.condicoes
                : ficha.condicoes
            }
            editing={editing}
            multiline
            onChangeText={(value) =>
              update(
                "condicoes",
                value
              )
            }
          />

          <Field
            label="Alergias"
            value={
              editing
                ? draft.alergias
                : ficha.alergias
            }
            editing={editing}
            multiline
            onChangeText={(value) =>
              update(
                "alergias",
                value
              )
            }
          />

          <Field
            label="Observações"
            value={
              editing
                ? draft.observacoes
                : ficha.observacoes
            }
            editing={editing}
            multiline
            onChangeText={(value) =>
              update(
                "observacoes",
                value
              )
            }
          />
        </View>

        <View style={styles.actions}>
          {editing && (
            <TouchableOpacity
              style={
                styles.cancelButton
              }
              activeOpacity={0.8}
              onPress={() => {
                setDraft(ficha);
                setEditing(false);
              }}
            >
              <Text
                style={styles.cancelText}
              >
                Cancelar
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[
              styles.saveButton,
              salvando &&
                styles.saveButtonDisabled,
            ]}
            activeOpacity={0.8}
            onPress={toggleEditing}
            disabled={salvando}
          >
            <Ionicons
              name={
                salvando
                  ? "hourglass-outline"
                  : editing
                  ? "checkmark-circle-outline"
                  : "create-outline"
              }
              size={20}
              color={colors.card}
            />

            <Text
              style={styles.saveText}
            >
              {salvando
                ? "Salvando..."
                : editing
                ? "Salvar informações"
                : "Editar informações"}
            </Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // ---------- CABEÇALHO ----------

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
    color: colors.text,
    fontSize: typography.size.xl,
    lineHeight: typography.size.xl + 8,
    fontWeight: "800",
    textAlign: "center",
  },

  // ---------- CARREGAMENTO ----------

  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 80,
  },

  loadingText: {
    marginTop: spacing.md,
    fontSize: typography.size.sm,
    color: colors.textSecondary,
  },

  // ---------- CONTEÚDO ----------

  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing["3xl"],
  },

  // ---------- INTRODUÇÃO ----------

  intro: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
  },

  introIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },

  introTextContainer: {
    flex: 1,
  },

  introTitle: {
    fontSize: typography.size.md,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 4,
  },

  introText: {
    fontSize: typography.size.sm,
    lineHeight: 19,
    color: colors.textSecondary,
  },

  // ---------- SEÇÕES ----------

  sectionTitle: {
    fontSize: typography.size.md,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.sm,
    marginLeft: 3,
  },

  // ---------- CARDS ----------

  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.border,
  },

  // ---------- CAMPOS ----------

  field: {
    minHeight: 60,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  label: {
    width: 135,
    fontSize: typography.size.sm,
    fontWeight: "600",
    color: colors.text,
  },

  value: {
    flex: 1,
    paddingRight: 25,
    textAlign: "right",
    fontSize: typography.size.sm,
    color: colors.textSecondary,
  },

  chevron: {
    position: "absolute",
    right: 0,
  },

  input: {
    flex: 1,
    minHeight: 42,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    fontSize: 14,
    color: colors.text,
    textAlign: "right",
    backgroundColor: colors.background,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  textArea: {
    minHeight: 82,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
    textAlign: "left",
    textAlignVertical: "top",
  },

  // ---------- DROPDOWN ----------

  dropdown: {
    position: "absolute",
    top: 56,
    right: 0,
    left: 135,
    borderRadius: radius.sm,
    backgroundColor: colors.card,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.border,
    zIndex: 10,
    elevation: 5,
  },

  dropdownItem: {
    minHeight: 44,
    justifyContent: "center",
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  dropdownItemText: {
    fontSize: typography.size.sm,
    color: colors.text,
  },

  // ---------- BOTÕES ----------

  actions: {
    flexDirection: "row",
    gap: spacing.md,
    marginTop: spacing.xs,
  },

  cancelButton: {
    flex: 0.8,
    minHeight: 50,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.card,
    alignItems: "center",
    justifyContent: "center",
  },

  cancelText: {
    fontSize: typography.size.sm,
    fontWeight: "600",
    color: colors.textSecondary,
  },

  saveButton: {
    flex: 1.2,
    minHeight: 50,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
  },

  saveButtonDisabled: {
    opacity: 0.7,
  },

  saveText: {
    fontSize: typography.size.sm,
    fontWeight: "700",
    color: colors.card,
  },
});