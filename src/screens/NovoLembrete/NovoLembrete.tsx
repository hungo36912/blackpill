import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Switch,
  Modal,
  Platform,
} from "react-native";

import {
  ArrowLeft,
  ChevronRight,
  Clock,
  Calendar,
  Check,
} from "lucide-react-native";

const GREEN = "#439B58";
const TEXT = "#17232B";

type Props = {
  onVoltar: () => void;
  onSalvar: () => void;
};

const diasSemana = ["S", "T", "Q", "Q", "S", "S", "D"];

export default function NovoLembrete({
  onVoltar,
  onSalvar,
}: Props) {
  const [notificacao, setNotificacao] = useState(false);

  // Medicamento
  const [medicamento, setMedicamento] = useState("");

  // Horário
  const [horario, setHorario] = useState("");
  const [mostrarHorario, setMostrarHorario] = useState(false);

  // Frequência
  const [frequencia, setFrequencia] = useState("");
  const [mostrarFrequencia, setMostrarFrequencia] =
    useState(false);

  // Dias específicos
  const [diasSelecionados, setDiasSelecionados] =
    useState<number[]>([]);

  // Data - "Uma vez"
  const [dataSelecionada, setDataSelecionada] =
    useState<Date | null>(null);
  const [data, setData] = useState("");
  const [mostrarData, setMostrarData] = useState(false);

  /*
   * VALIDAÇÃO
   */
  const formularioValido =
    medicamento.trim() !== "" &&
    horario !== "" &&
    frequencia !== "" &&
    (
      frequencia === "Todos os dias" ||
      (
        frequencia === "Dias específicos" &&
        diasSelecionados.length > 0
      ) ||
      (
        frequencia === "Uma vez" &&
        dataSelecionada !== null
      )
    );

  /*
   * HORÁRIO
   */
  function selecionarHorario() {
    setMostrarHorario(true);
  }

  function alterarHorario(
    event: any,
    date?: Date
  ) {
    setMostrarHorario(false);

    // Usuário cancelou
    if (!date) {
      return;
    }

    const horas = date
      .getHours()
      .toString()
      .padStart(2, "0");

    const minutos = date
      .getMinutes()
      .toString()
      .padStart(2, "0");

    setHorario(`${horas}:${minutos}`);
  }

  /*
   * FREQUÊNCIA
   */
  function selecionarFrequencia(
    opcao: string
  ) {
    setFrequencia(opcao);

    if (opcao === "Todos os dias") {
      setDiasSelecionados([]);
      setData("");
      setDataSelecionada(null);
    }

    if (opcao === "Dias específicos") {
      setData("");
      setDataSelecionada(null);
    }

    if (opcao === "Uma vez") {
      setDiasSelecionados([]);
    }

    setMostrarFrequencia(false);
  }

  /*
   * DIAS DA SEMANA
   */
  function alternarDia(index: number) {
    const jaSelecionado =
      diasSelecionados.includes(index);

    if (jaSelecionado) {
      setDiasSelecionados(
        diasSelecionados.filter(
          (dia) => dia !== index
        )
      );
    } else {
      setDiasSelecionados([
        ...diasSelecionados,
        index,
      ]);
    }
  }

  /*
   * DATA
   */
  function selecionarData() {
    setMostrarData(true);
  }

  function alterarData(
    event: any,
    date?: Date
  ) {
    setMostrarData(false);

    // Usuário cancelou
    if (!date) {
      return;
    }

    setDataSelecionada(date);

    const dia = date
      .getDate()
      .toString()
      .padStart(2, "0");

    const mes = (date.getMonth() + 1)
      .toString()
      .padStart(2, "0");

    const ano = date.getFullYear();

    setData(`${dia}/${mes}/${ano}`);
  }

  /*
   * DATA ATUAL DO SELETOR DE HORÁRIO
   */
  function obterDataHorario() {
    const agora = new Date();

    if (!horario) {
      return agora;
    }

    const partes = horario.split(":");

    if (partes.length !== 2) {
      return agora;
    }

    agora.setHours(Number(partes[0]));
    agora.setMinutes(Number(partes[1]));
    agora.setSeconds(0);

    return agora;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
      />

      <View style={styles.container}>

        {/* =========================
            CABEÇALHO
        ========================== */}

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
            Novo lembrete
          </Text>

          <View style={styles.espacoHeader} />
        </View>

        {/* =========================
            CONTEÚDO
        ========================== */}

        <View style={styles.conteudo}>

          {/* MEDICAMENTO */}

          <Text style={styles.label}>
            Medicamento
          </Text>

          <TextInput
            style={styles.campo}
            placeholder="Digite o nome do medicamento"
            placeholderTextColor="#999999"
            value={medicamento}
            onChangeText={setMedicamento}
            autoCapitalize="words"
          />

          {/* HORÁRIO */}

          <Text style={styles.label}>
            Horário
          </Text>

          <TouchableOpacity
            style={styles.campo}
            onPress={selecionarHorario}
            activeOpacity={0.7}
          >
            <Text
              style={
                horario
                  ? styles.horarioSelecionado
                  : styles.horario
              }
            >
              {horario || "-- : --"}
            </Text>

            <Clock
              size={25}
              color={GREEN}
              strokeWidth={2}
            />
          </TouchableOpacity>

          {mostrarHorario && (
            <DateTimePicker
              value={obterDataHorario()}
              mode="time"
              is24Hour={true}
              display={
                Platform.OS === "ios"
                  ? "spinner"
                  : "default"
              }
              onChange={alterarHorario}
            />
          )}

          {/* FREQUÊNCIA */}

          <Text style={styles.label}>
            Frequência
          </Text>

          <TouchableOpacity
            style={styles.campo}
            onPress={() =>
              setMostrarFrequencia(true)
            }
            activeOpacity={0.7}
          >
            <Text
              style={
                frequencia
                  ? styles.valor
                  : styles.placeholder
              }
            >
              {frequencia ||
                "Selecione a frequência"}
            </Text>

            {frequencia ? (
              <Check
                size={24}
                color={GREEN}
                strokeWidth={2.5}
              />
            ) : (
              <ChevronRight
                size={25}
                color="#333333"
                strokeWidth={2}
              />
            )}
          </TouchableOpacity>

          {/* =========================
              DIAS ESPECÍFICOS
          ========================== */}

          {frequencia === "Dias específicos" && (
            <View style={styles.diasContainer}>
              <Text style={styles.subtitulo}>
                Selecione os dias
              </Text>

              <View style={styles.diasSemana}>
                {diasSemana.map(
                  (dia, index) => {
                    const selecionado =
                      diasSelecionados.includes(
                        index
                      );

                    return (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.dia,
                          selecionado &&
                            styles.diaSelecionado,
                        ]}
                        onPress={() =>
                          alternarDia(index)
                        }
                        activeOpacity={0.7}
                      >
                        <Text
                          style={
                            selecionado
                              ? styles.textoDiaSelecionado
                              : styles.textoDia
                          }
                        >
                          {dia}
                        </Text>
                      </TouchableOpacity>
                    );
                  }
                )}
              </View>

              <TouchableOpacity
                style={[
                  styles.botaoConfirmar,
                  diasSelecionados.length === 0 &&
                    styles.botaoConfirmarDesabilitado,
                ]}
                disabled={
                  diasSelecionados.length === 0
                }
                onPress={() => {
                  // Mantém a frequência selecionada
                  setFrequencia(
                    "Dias específicos"
                  );
                }}
                activeOpacity={0.8}
              >
                <Text style={styles.textoConfirmar}>
                  Confirmar
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* =========================
              DATA - UMA VEZ
          ========================== */}

          {frequencia === "Uma vez" && (
            <>
              <Text style={styles.label}>
                Data
              </Text>

              <TouchableOpacity
                style={styles.campo}
                onPress={selecionarData}
                activeOpacity={0.7}
              >
                <Text
                  style={
                    data
                      ? styles.valor
                      : styles.placeholder
                  }
                >
                  {data || "Selecione a data"}
                </Text>

                <Calendar
                  size={25}
                  color={GREEN}
                  strokeWidth={2}
                />
              </TouchableOpacity>

              {mostrarData && (
                <DateTimePicker
                  value={
                    dataSelecionada ||
                    new Date()
                  }
                  mode="date"
                  display={
                    Platform.OS === "ios"
                      ? "spinner"
                      : "default"
                  }
                  minimumDate={new Date()}
                  onChange={alterarData}
                />
              )}
            </>
          )}

          {/* NOTIFICAÇÃO */}

          <Text style={styles.label}>
            Notificação
          </Text>

          <View
            style={styles.notificacaoContainer}
          >
            <Text
              style={styles.notificacaoTexto}
            >
              Receber lembrete
            </Text>

            <Switch
              value={notificacao}
              onValueChange={setNotificacao}
              trackColor={{
                false: "#D5D5D5",
                true: "#A8D5B0",
              }}
              thumbColor={
                notificacao
                  ? GREEN
                  : "#FFFFFF"
              }
            />
          </View>

          {/* SALVAR */}

          <TouchableOpacity
            style={[
              styles.botaoSalvar,
              formularioValido
                ? styles.botaoAtivo
                : styles.botaoDesabilitado,
            ]}
            onPress={onSalvar}
            disabled={!formularioValido}
            activeOpacity={0.8}
          >
            <Text style={styles.textoSalvar}>
              Salvar lembrete
            </Text>
          </TouchableOpacity>
        </View>

        {/* =========================
            MODAL DE FREQUÊNCIA
        ========================== */}

        <Modal
          visible={mostrarFrequencia}
          transparent
          animationType="fade"
          onRequestClose={() =>
            setMostrarFrequencia(false)
          }
        >
          <View style={styles.modalFundo}>
            <View style={styles.modalContainer}>

              <Text style={styles.modalTitulo}>
                Frequência
              </Text>

              {/* TODOS OS DIAS */}

              <TouchableOpacity
                style={styles.opcaoFrequencia}
                onPress={() =>
                  selecionarFrequencia(
                    "Todos os dias"
                  )
                }
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.radio,
                    frequencia ===
                      "Todos os dias" &&
                      styles.radioSelecionado,
                  ]}
                >
                  {frequencia ===
                    "Todos os dias" && (
                    <View
                      style={
                        styles.radioInterno
                      }
                    />
                  )}
                </View>

                <Text style={styles.textoOpcao}>
                  Todos os dias
                </Text>
              </TouchableOpacity>

              {/* DIAS ESPECÍFICOS */}

              <TouchableOpacity
                style={styles.opcaoFrequencia}
                onPress={() =>
                  selecionarFrequencia(
                    "Dias específicos"
                  )
                }
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.radio,
                    frequencia ===
                      "Dias específicos" &&
                      styles.radioSelecionado,
                  ]}
                >
                  {frequencia ===
                    "Dias específicos" && (
                    <View
                      style={
                        styles.radioInterno
                      }
                    />
                  )}
                </View>

                <Text style={styles.textoOpcao}>
                  Dias específicos
                </Text>
              </TouchableOpacity>

              {/* UMA VEZ */}

              <TouchableOpacity
                style={styles.opcaoFrequencia}
                onPress={() =>
                  selecionarFrequencia(
                    "Uma vez"
                  )
                }
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.radio,
                    frequencia === "Uma vez" &&
                      styles.radioSelecionado,
                  ]}
                >
                  {frequencia === "Uma vez" && (
                    <View
                      style={
                        styles.radioInterno
                      }
                    />
                  )}
                </View>

                <Text style={styles.textoOpcao}>
                  Uma vez
                </Text>
              </TouchableOpacity>

              {/* CONFIRMAR */}

              <TouchableOpacity
                style={styles.botaoModalConfirmar}
                onPress={() =>
                  setMostrarFrequencia(false)
                }
                activeOpacity={0.8}
              >
                <Text
                  style={
                    styles.textoModalConfirmar
                  }
                >
                  Confirmar
                </Text>
              </TouchableOpacity>

              {/* CANCELAR */}

              <TouchableOpacity
                style={styles.botaoCancelar}
                onPress={() =>
                  setMostrarFrequencia(false)
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

  conteudo: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 25,
  },

  label: {
    fontSize: 17,
    fontWeight: "600",
    color: TEXT,
    marginBottom: 9,
    marginTop: 18,
  },

  campo: {
    width: "100%",
    height: 62,
    borderWidth: 1,
    borderColor: "#777777",
    borderRadius: 10,
    paddingHorizontal: 17,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
  },

  placeholder: {
    fontSize: 16,
    color: "#555555",
  },

  valor: {
    fontSize: 16,
    color: TEXT,
    flex: 1,
  },

  horario: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    color: "#555555",
    marginLeft: 25,
  },

  horarioSelecionado: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    color: TEXT,
    marginLeft: 25,
  },

  /* DIAS */

  diasContainer: {
    marginTop: 15,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    backgroundColor: "#FAFAFA",
  },

  subtitulo: {
    fontSize: 16,
    fontWeight: "600",
    color: TEXT,
    marginBottom: 15,
  },

  diasSemana: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  dia: {
    width: 37,
    height: 37,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#BBBBBB",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

  diaSelecionado: {
    backgroundColor: GREEN,
    borderColor: GREEN,
  },

  textoDia: {
    fontSize: 14,
    fontWeight: "600",
    color: TEXT,
  },

  textoDiaSelecionado: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  botaoConfirmar: {
    height: 45,
    borderRadius: 8,
    backgroundColor: GREEN,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 18,
  },

  botaoConfirmarDesabilitado: {
    backgroundColor: "#C8C8C8",
  },

  textoConfirmar: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  /* NOTIFICAÇÃO */

  notificacaoContainer: {
    width: "100%",
    minHeight: 55,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 2,
  },

  notificacaoTexto: {
    fontSize: 17,
    color: TEXT,
  },

  /* SALVAR */

  botaoSalvar: {
    width: "100%",
    height: 58,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
    marginBottom: 25,
  },

  botaoDesabilitado: {
    backgroundColor: "#C8C8C8",
  },

  botaoAtivo: {
    backgroundColor: GREEN,
  },

  textoSalvar: {
    fontSize: 17,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  /* MODAL */

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
    paddingHorizontal: 22,
    paddingTop: 24,
    paddingBottom: 20,
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

  opcaoFrequencia: {
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },

  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#777777",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  radioSelecionado: {
    borderColor: GREEN,
  },

  radioInterno: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: GREEN,
  },

  textoOpcao: {
    fontSize: 16,
    color: TEXT,
  },

  botaoModalConfirmar: {
    height: 48,
    backgroundColor: GREEN,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },

  textoModalConfirmar: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  botaoCancelar: {
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },

  textoCancelar: {
    fontSize: 15,
    fontWeight: "600",
    color: "#666666",
  },
});