import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import PageHeader from "../../components/PageHeader";
import colors from "../../theme/colors";
import { spacing } from "../../theme/spacing";
import { typography } from "../../theme/typography";
import { radius } from "../../theme/radius";

type Ficha = {
  nome: string;
  dataNascimento: string;
  sexo: string;
  peso: string;
  altura: string;
  condicoes: string;
  alergias: string;
  observacoes: string;
};

const INITIAL: Ficha = {
  nome: "Fulano de Tal",
  dataNascimento: "24/07/1953",
  sexo: "Masculino",
  peso: "72 Kg",
  altura: "1,67 m",
  condicoes: "",
  alergias: "",
  observacoes: "",
};

type FieldProps = {
  label: string;
  value: string;
  editing: boolean;
  multiline?: boolean;
  onChangeText: (value: string) => void;
};

function Field({
  label,
  value,
  editing,
  multiline,
  onChangeText,
}: FieldProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>

      {editing ? (
        <TextInput
          value={value}
          onChangeText={onChangeText}
          multiline={multiline}
          style={[
            styles.input,
            multiline && styles.textArea,
          ]}
          placeholder={multiline ? "Digite aqui..." : ""}
          placeholderTextColor={colors.placeholder}
        />
      ) : (
        <>
          <Text
            style={styles.value}
            numberOfLines={multiline ? 2 : 1}
          >
            {value || "—"}
          </Text>

          <Text style={styles.chevron}>›</Text>
        </>
      )}
    </View>
  );
}

type Props = {
  onVoltar: () => void;
};

export default function FichaMedicaScreen({
  onVoltar,
}: Props) {
  const [editing, setEditing] = useState(false);
  const [ficha, setFicha] = useState<Ficha>(INITIAL);
  const [draft, setDraft] = useState<Ficha>(INITIAL);

  function update(key: keyof Ficha, value: string) {
    setDraft((old) => ({
      ...old,
      [key]: value,
    }));
  }

  function toggleEditing() {
    if (editing) {
      setFicha(draft);
      setEditing(false);
    } else {
      setDraft(ficha);
      setEditing(true);
    }
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title="Ficha médica"
        onBack={onVoltar}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Field
            label="Nome"
            value={editing ? draft.nome : ficha.nome}
            editing={editing}
            onChangeText={(value) => update("nome", value)}
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
              update("dataNascimento", value)
            }
          />

          <Field
            label="Sexo"
            value={editing ? draft.sexo : ficha.sexo}
            editing={editing}
            onChangeText={(value) => update("sexo", value)}
          />

          <Field
            label="Peso"
            value={editing ? draft.peso : ficha.peso}
            editing={editing}
            onChangeText={(value) => update("peso", value)}
          />

          <Field
            label="Altura"
            value={editing ? draft.altura : ficha.altura}
            editing={editing}
            onChangeText={(value) => update("altura", value)}
          />
        </View>

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
              update("condicoes", value)
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
              update("alergias", value)
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
              update("observacoes", value)
            }
          />
        </View>

        <View style={styles.actions}>
          {editing && (
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                setDraft(ficha);
                setEditing(false);
              }}
            >
              <Text style={styles.cancelText}>
                Cancelar
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.saveButton}
            onPress={toggleEditing}
          >
            <Text style={styles.saveText}>
              {editing
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

  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing['3xl'],
  },

  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
    overflow: "hidden",
  },

  field: {
    minHeight: 54,
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
    paddingRight: 15,
    textAlign: "right",
    fontSize: typography.size.sm,
    color: colors.textSecondary,
  },

  chevron: {
    position: "absolute",
    right: 0,
    fontSize: 24,
    color: colors.textSecondary,
    lineHeight: 24,
  },

  input: {
    flex: 1,
    minHeight: 40,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: 9,
    fontSize: 13,
    color: colors.text,
    textAlign: "right",
  },

  textArea: {
    minHeight: 74,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
    textAlign: "left",
    textAlignVertical: "top",
  },

  actions: {
    flexDirection: "row",
    gap: spacing.md,
  },

  cancelButton: {
    flex: 1,
    height: 46,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.card,
    alignItems: "center",
    justifyContent: "center",
  },

  cancelText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.textSecondary,
  },

  saveButton: {
    flex: 1,
    height: 46,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  saveText: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.card,
  },
});
