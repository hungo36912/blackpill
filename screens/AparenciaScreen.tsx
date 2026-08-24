import React, { useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Switch,
} from "react-native";

import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";

import colors from "../theme/colors";

type Props = {
  onVoltar: () => void;
};

type Tema = {
  id: "claro" | "escuro" | "automatico";
  label: string;
};

const TEMAS: Tema[] = [
  {
    id: "claro",
    label: "Claro",
  },
  {
    id: "escuro",
    label: "Escuro",
  },
  {
    id: "automatico",
    label: "Automático",
  },
];

export default function AparenciaScreen({
  onVoltar,
}: Props) {
  const [temaSelecionado, setTemaSelecionado] =
    useState<Tema["id"]>("claro");

  const [tamanhoTexto, setTamanhoTexto] =
    useState<number>(0.5);

  const [altoContraste, setAltoContraste] =
    useState<boolean>(false);

  const tamanhoFonteExemplo =
    13 + tamanhoTexto * 8;

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
          Aparência
        </Text>

        <View style={styles.espacoHeader} />
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionLabel}>
          TEMA
        </Text>

        <View style={styles.temasRow}>
          {TEMAS.map((tema) => {
            const selecionado =
              tema.id === temaSelecionado;

            return (
              <TouchableOpacity
                key={tema.id}
                style={[
                  styles.temaBox,
                  selecionado &&
                    styles.temaBoxSelecionado,
                ]}
                onPress={() =>
                  setTemaSelecionado(tema.id)
                }
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel={`Tema ${tema.label}`}
                accessibilityState={{
                  selected: selecionado,
                }}
              >
                <View
                  style={[
                    styles.temaPreview,
                    tema.id === "escuro" && {
                      backgroundColor: "#1A1A1A",
                    },
                    tema.id === "automatico" &&
                      styles.temaPreviewAutomatico,
                  ]}
                />

                <Text style={styles.temaLabel}>
                  {tema.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.sectionLabel}>
          TAMANHO DO TEXTO
        </Text>

        <View style={styles.card}>
          <View style={styles.sliderRow}>
            <Text
              style={styles.sliderLetraPequena}
            >
              A
            </Text>

            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={1}
              value={tamanhoTexto}
              onValueChange={setTamanhoTexto}
              minimumTrackTintColor={
                colors.primary
              }
              maximumTrackTintColor={
                colors.border
              }
              thumbTintColor={colors.primary}
              accessibilityLabel="Tamanho do texto"
            />

            <Text
              style={styles.sliderLetraGrande}
            >
              A
            </Text>
          </View>

          <Text
            style={[
              styles.exemploTexto,
              {
                fontSize: tamanhoFonteExemplo,
              },
            ]}
          >
            Exemplo: hora de tomar Losartana às
            08:00
          </Text>
        </View>

        <Text style={styles.sectionLabel}>
          PERSONALIZAÇÃO
        </Text>

        <View style={styles.card}>
          <View style={styles.linhaContraste}>
            <View style={styles.contrasteConteudo}>
              <Text style={styles.contrasteTitulo}>
                Alto contraste
              </Text>

              <Text style={styles.contrasteTexto}>
                Facilita a leitura
              </Text>
            </View>

            <Switch
              value={altoContraste}
              onValueChange={setAltoContraste}
              trackColor={{
                false: colors.border,
                true: colors.primary,
              }}
              thumbColor="#FFFFFF"
              accessibilityRole="switch"
              accessibilityLabel="Alto contraste"
              accessibilityState={{
                checked: altoContraste,
              }}
            />
          </View>
        </View>
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
    paddingTop: 4,
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

  temasRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  temaBox: {
    flex: 1,
    minHeight: 106,
    marginHorizontal: 4,
    borderWidth: 2,
    borderColor: "transparent",
    borderRadius: 14,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.card,
  },

  temaBoxSelecionado: {
    borderColor: colors.primary,
  },

  temaPreview: {
    width: "100%",
    height: 46,
    borderRadius: 9,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 10,
  },

  temaPreviewAutomatico: {
    backgroundColor: "#FFFFFF",
    borderRightWidth: 23,
    borderRightColor: "#1A1A1A",
  },

  temaLabel: {
    fontSize: 15,
    lineHeight: 20,
    color: colors.text,
    fontWeight: "600",
  },

  card: {
    backgroundColor: colors.card,
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 16,
  },

  sliderRow: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
  },

  slider: {
    flex: 1,
    marginHorizontal: 12,
  },

  sliderLetraPequena: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textSecondary,
  },

  sliderLetraGrande: {
    fontSize: 23,
    fontWeight: "600",
    color: colors.textSecondary,
  },

  exemploTexto: {
    color: colors.text,
    lineHeight: 24,
    marginTop: 16,
  },

  linhaContraste: {
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
  },

  contrasteConteudo: {
    flex: 1,
    paddingRight: 12,
  },

  contrasteTitulo: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "600",
    color: colors.text,
  },

  contrasteTexto: {
    fontSize: 14,
    lineHeight: 19,
    color: colors.textSecondary,
    marginTop: 3,
  },
});