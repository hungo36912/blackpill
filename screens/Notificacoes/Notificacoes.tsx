import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  ScrollView,
  Modal,
} from "react-native";

import colors from "../../theme/colors";

import {
  ArrowLeft,
  ChevronRight,
} from "lucide-react-native";

const GREEN = colors.reminder;
const TEXT = colors.reminderText;

type Props = {
  onVoltar?: () => void;
};

export default function Notificacoes({
  onVoltar,
}: Props) {
  const [notificacoesMedicamentos, setNotificacoesMedicamentos] =
    useState(true);

  const [avisarNoHorario, setAvisarNoHorario] =
    useState(true);

  const [avisarAntes, setAvisarAntes] =
    useState(false);

  const [som, setSom] =
    useState(true);

  const [vibracao, setVibracao] =
    useState(true);

  const [antecedencia, setAntecedencia] =
    useState("10 minutos");

  const [mostrarAntecedencia, setMostrarAntecedencia] =
    useState(false);

  const opcoesAntecedencia = [
    "5 minutos",
    "10 minutos",
    "15 minutos",
    "30 minutos",
    "1 hora",
  ];

  function selecionarAntecedencia(opcao: string) {
    setAntecedencia(opcao);
    setMostrarAntecedencia(false);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.botaoVoltar}
            onPress={onVoltar}
            activeOpacity={0.7}
          >
            <ArrowLeft
              size={28}
              color={TEXT}
              strokeWidth={2.5}
            />
          </TouchableOpacity>

          <Text style={styles.tituloHeader}>
            Notificações
          </Text>

          <View style={styles.espacoHeader} />
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.conteudo}
          showsVerticalScrollIndicator={false}
          bounces={true}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.tituloSecao}>
            Configurações
          </Text>

          <View style={styles.configuracao}>
            <View style={styles.textos}>
              <Text style={styles.titulo}>
                Notificações de medicamentos
              </Text>

              <Text style={styles.descricao}>
                Receba avisos sobre seus horários de medicamentos.
              </Text>
            </View>

            <Switch
              value={notificacoesMedicamentos}
              onValueChange={(valor) => {
                setNotificacoesMedicamentos(valor);

                if (!valor) {
                  setMostrarAntecedencia(false);
                }
              }}
              trackColor={{
                false: colors.switchTrack,
                true: colors.switchTrackActive,
              }}
              thumbColor={
                notificacoesMedicamentos
                  ? GREEN
                  : "#FFFFFF"
              }
            />
          </View>

          <View style={styles.divisor} />

          <View
            style={[
              styles.configuracao,
              !notificacoesMedicamentos &&
                styles.configuracaoDesativada,
            ]}
          >
            <View style={styles.textos}>
              <Text style={styles.titulo}>
                Avisar no horário
              </Text>

              <Text style={styles.descricao}>
                Notificar quando chegar a hora do medicamento.
              </Text>
            </View>

            <Switch
              value={avisarNoHorario}
              onValueChange={setAvisarNoHorario}
              disabled={!notificacoesMedicamentos}
              trackColor={{
                false: colors.switchTrack,
                true: colors.switchTrackActive,
              }}
              thumbColor={
                avisarNoHorario
                  ? GREEN
                  : "#FFFFFF"
              }
            />
          </View>

          <View style={styles.divisor} />

          <View
            style={[
              styles.configuracao,
              !notificacoesMedicamentos &&
                styles.configuracaoDesativada,
            ]}
          >
            <View style={styles.textos}>
              <Text style={styles.titulo}>
                Avisar antes
              </Text>

              <Text style={styles.descricao}>
                Receba um aviso antes do horário programado.
              </Text>
            </View>

            <Switch
              value={avisarAntes}
              onValueChange={setAvisarAntes}
              disabled={!notificacoesMedicamentos}
              trackColor={{
                false: colors.switchTrack,
                true: colors.switchTrackActive,
              }}
              thumbColor={
                avisarAntes
                  ? GREEN
                  : "#FFFFFF"
              }
            />
          </View>

          {avisarAntes && notificacoesMedicamentos && (
            <View style={styles.antecedenciaContainer}>
              <Text style={styles.label}>
                Tempo de antecedência
              </Text>

              <TouchableOpacity
                style={styles.campo}
                onPress={() =>
                  setMostrarAntecedencia(true)
                }
                activeOpacity={0.7}
              >
                <Text style={styles.valor}>
                  {antecedencia}
                </Text>

                <ChevronRight
                  size={25}
                  color="#333333"
                  strokeWidth={2}
                />
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.divisor} />

          <View
            style={[
              styles.configuracao,
              !notificacoesMedicamentos &&
                styles.configuracaoDesativada,
            ]}
          >
            <View style={styles.textos}>
              <Text style={styles.titulo}>
                Som
              </Text>

              <Text style={styles.descricao}>
                Reproduzir som na notificação.
              </Text>
            </View>

            <Switch
              value={som}
              onValueChange={setSom}
              disabled={!notificacoesMedicamentos}
              trackColor={{
                false: colors.switchTrack,
                true: colors.switchTrackActive,
              }}
              thumbColor={
                som
                  ? GREEN
                  : "#FFFFFF"
              }
            />
          </View>

          <View style={styles.divisor} />

          <View
            style={[
              styles.configuracao,
              !notificacoesMedicamentos &&
                styles.configuracaoDesativada,
            ]}
          >
            <View style={styles.textos}>
              <Text style={styles.titulo}>
                Vibração
              </Text>

              <Text style={styles.descricao}>
                Vibrar ao receber aviso.
              </Text>
            </View>

            <Switch
              value={vibracao}
              onValueChange={setVibracao}
              disabled={!notificacoesMedicamentos}
              trackColor={{
                false: colors.switchTrack,
                true: colors.switchTrackActive,
              }}
              thumbColor={
                vibracao
                  ? GREEN
                  : "#FFFFFF"
              }
            />
          </View>

          <View style={styles.espacoInferior} />
        </ScrollView>

        <Modal
          visible={mostrarAntecedencia}
          transparent={true}
          animationType="fade"
          onRequestClose={() =>
            setMostrarAntecedencia(false)
          }
        >
          <View style={styles.modalFundo}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitulo}>
                Tempo de antecedência
              </Text>

              {opcoesAntecedencia.map((opcao) => (
                <TouchableOpacity
                  key={opcao}
                  style={styles.opcao}
                  onPress={() =>
                    selecionarAntecedencia(opcao)
                  }
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.textoOpcao,
                      antecedencia === opcao &&
                        styles.opcaoSelecionada,
                    ]}
                  >
                    {opcao}
                  </Text>
                </TouchableOpacity>
              ))}

              <TouchableOpacity
                style={styles.botaoCancelar}
                onPress={() =>
                  setMostrarAntecedencia(false)
                }
                activeOpacity={0.7}
              >
                <Text style={styles.textoCancelar}>
                  Cancelar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  header: {
    height: 76,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },

  botaoVoltar: {
    width: 42,
    height: 42,
    justifyContent: "center",
    alignItems: "flex-start",
  },

  tituloHeader: {
    flex: 1,
    textAlign: "center",
    fontSize: 21,
    fontWeight: "700",
    color: "#111111",
  },

  espacoHeader: {
    width: 42,
  },

  scroll: {
    flex: 1,
  },

  conteudo: {
    paddingHorizontal: 22,
    paddingTop: 28,
    paddingBottom: 50,
  },

  tituloSecao: {
    fontSize: 20,
    fontWeight: "700",
    color: TEXT,
    marginBottom: 20,
  },

  configuracao: {
    minHeight: 82,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
  },

  configuracaoDesativada: {
    opacity: 0.5,
  },

  textos: {
    flex: 1,
    paddingRight: 15,
  },

  titulo: {
    fontSize: 16,
    fontWeight: "600",
    color: TEXT,
    marginBottom: 5,
  },

  descricao: {
    fontSize: 14,
    lineHeight: 20,
    color: "#666666",
  },

  divisor: {
    height: 1,
    backgroundColor: "#E5E5E5",
    marginVertical: 4,
  },

  antecedenciaContainer: {
    marginTop: 4,
    marginBottom: 10,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    color: TEXT,
    marginTop: 8,
    marginBottom: 9,
  },

  campo: {
    width: "100%",
    height: 58,
    borderWidth: 1,
    borderColor: "#777777",
    borderRadius: 10,
    paddingHorizontal: 17,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
  },

  valor: {
    fontSize: 16,
    color: TEXT,
  },

  modalFundo: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
  },

  modalContainer: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 22,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },

  modalTitulo: {
    fontSize: 20,
    fontWeight: "700",
    color: TEXT,
    marginBottom: 10,
  },

  opcao: {
    minHeight: 52,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },

  textoOpcao: {
    fontSize: 16,
    color: TEXT,
  },

  opcaoSelecionada: {
    color: GREEN,
    fontWeight: "700",
  },

  botaoCancelar: {
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },

  textoCancelar: {
    fontSize: 15,
    fontWeight: "600",
    color: "#666666",
  },

  espacoInferior: {
    height: 30,
  },
});