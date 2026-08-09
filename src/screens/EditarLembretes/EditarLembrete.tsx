import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Switch,
  Alert,
  ScrollView,
  Modal,
  Platform,
} from "react-native";

import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import {
  ArrowLeft,
  Clock,
  ChevronRight,
  Check,
  CalendarDays,
} from "lucide-react-native";

const GREEN = "#439B58";
const TEXT = "#17232B";
const RED = "#C93636";

type Props = {
  onVoltar?: () => void;
  onSalvar?: () => void;
  onExcluir?: () => void;
};

export default function EditarLembrete({
  onVoltar,
  onSalvar,
  onExcluir,
}: Props) {
  /* =========================
     MEDICAMENTO
  ========================= */

  const [medicamento, setMedicamento] = useState("Losartana");

  /* =========================
     HORÁRIO
  ========================= */

  const [horario, setHorario] = useState("08:00");

  const [horarioDate, setHorarioDate] = useState(() => {
    const date = new Date();

    date.setHours(8);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    return date;
  });

  const [mostrarHorario, setMostrarHorario] = useState(false);

  /* =========================
     FREQUÊNCIA
  ========================= */

  const [frequencia, setFrequencia] =
    useState("Todos os dias");

  const [mostrarFrequencia, setMostrarFrequencia] =
    useState(false);

  /* =========================
     DIAS ESPECÍFICOS
  ========================= */

  const [diasSelecionados, setDiasSelecionados] =
    useState<number[]>([]);

  /* =========================
     DATA
  ========================= */

  const [data, setData] = useState("");

  const [dataDate, setDataDate] = useState<Date | null>(
    null
  );

  const [mostrarData, setMostrarData] = useState(false);

  /* =========================
     NOTIFICAÇÃO
  ========================= */

  const [notificacao, setNotificacao] = useState(true);

  /* =========================
     OPÇÕES
  ========================= */

  const opcoesFrequencia = [
    "Todos os dias",
    "Dias específicos",
    "Uma vez",
  ];

  const dias = [
    "S",
    "T",
    "Q",
    "Q",
    "S",
    "S",
    "D",
  ];

  /* =========================
     ALTERAR HORÁRIO
  ========================= */

  function alterarHorario(
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) {
    setMostrarHorario(false);

    // Usuário cancelou
    if (
      event.type === "dismissed" ||
      !selectedDate
    ) {
      return;
    }

    setHorarioDate(selectedDate);

    const horas = selectedDate
      .getHours()
      .toString()
      .padStart(2, "0");

    const minutos = selectedDate
      .getMinutes()
      .toString()
      .padStart(2, "0");

    setHorario(`${horas}:${minutos}`);
  }

  /* =========================
     SELECIONAR FREQUÊNCIA
  ========================= */

  function selecionarFrequencia(
    opcao: string
  ) {
    setFrequencia(opcao);
    setMostrarFrequencia(false);

    if (opcao === "Dias específicos") {
      setData("");
      setDataDate(null);
    }

    if (opcao === "Uma vez") {
      setDiasSelecionados([]);
    }

    if (opcao === "Todos os dias") {
      setDiasSelecionados([]);
      setData("");
      setDataDate(null);
    }
  }

  /* =========================
     SELECIONAR DIA
  ========================= */

  function alternarDia(index: number) {
    setDiasSelecionados((diasAtuais) => {
      if (diasAtuais.includes(index)) {
        return diasAtuais.filter(
          (dia) => dia !== index
        );
      }

      return [...diasAtuais, index];
    });
  }

  /* =========================
     ALTERAR DATA
  ========================= */

  function alterarData(
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) {
    setMostrarData(false);

    // Usuário cancelou
    if (
      event.type === "dismissed" ||
      !selectedDate
    ) {
      return;
    }

    setDataDate(selectedDate);

    const dia = selectedDate
      .getDate()
      .toString()
      .padStart(2, "0");

    const mes = (selectedDate.getMonth() + 1)
      .toString()
      .padStart(2, "0");

    const ano = selectedDate.getFullYear();

    setData(`${dia}/${mes}/${ano}`);
  }

  /* =========================
     SALVAR
  ========================= */

  function salvarAlteracoes() {
    if (!medicamento.trim()) {
      Alert.alert(
        "Atenção",
        "Digite o nome do medicamento."
      );

      return;
    }

    if (
      frequencia === "Dias específicos" &&
      diasSelecionados.length === 0
    ) {
      Alert.alert(
        "Atenção",
        "Selecione pelo menos um dia."
      );

      return;
    }

    if (
      frequencia === "Uma vez" &&
      !dataDate
    ) {
      Alert.alert(
        "Atenção",
        "Selecione uma data."
      );

      return;
    }

    Alert.alert(
      "Lembrete atualizado",
      "As alterações foram salvas.",
      [
        {
          text: "OK",
          onPress: () => {
            onSalvar?.();
          },
        },
      ]
    );
  }

  /* =========================
     EXCLUIR
  ========================= */

  function excluirLembrete() {
    Alert.alert(
      "Excluir lembrete",
      "Tem certeza que deseja excluir este lembrete?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => {
            onExcluir?.();
          },
        },
      ]
    );
  }

  /* =========================
     RENDER
  ========================= */

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* CABEÇALHO */}

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
            Editar lembrete
          </Text>

          <View style={styles.espacoHeader} />
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.conteudo}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >

          {/* MEDICAMENTO */}

          <Text style={styles.label}>
            Medicamento
          </Text>

          <TextInput
            style={styles.campoTexto}
            value={medicamento}
            onChangeText={setMedicamento}
            placeholder="Digite o nome do medicamento"
            placeholderTextColor="#999999"
          />

          {/* HORÁRIO */}

          <Text style={styles.label}>
            Horário
          </Text>

          <TouchableOpacity
            style={styles.campo}
            onPress={() =>
              setMostrarHorario(true)
            }
            activeOpacity={0.7}
          >
            <Text style={styles.horario}>
              {horario}
            </Text>

            <Clock
              size={25}
              color={GREEN}
              strokeWidth={2}
            />
          </TouchableOpacity>

          {mostrarHorario && (
            <DateTimePicker
              value={horarioDate}
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
            <Text style={styles.valor}>
              {frequencia}
            </Text>

            <ChevronRight
              size={25}
              color={GREEN}
              strokeWidth={2}
            />
          </TouchableOpacity>

          {/* DIAS ESPECÍFICOS */}

          {frequencia ===
            "Dias específicos" && (
            <View style={styles.diasContainer}>

              <Text style={styles.subtitulo}>
                Selecione os dias
              </Text>

              <View style={styles.diasLinha}>
                {dias.map(
                  (dia, index) => {
                    const selecionado =
                      diasSelecionados.includes(
                        index
                      );

                    return (
                      <TouchableOpacity
                        key={`${dia}-${index}`}
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
                        {selecionado ? (
                          <Check
                            size={18}
                            color="#FFFFFF"
                            strokeWidth={3}
                          />
                        ) : (
                          <Text
                            style={
                              styles.textoDia
                            }
                          >
                            {dia}
                          </Text>
                        )}
                      </TouchableOpacity>
                    );
                  }
                )}
              </View>
            </View>
          )}

          {/* UMA VEZ */}

          {frequencia === "Uma vez" && (
            <View>
              <Text style={styles.label}>
                Data
              </Text>

              <TouchableOpacity
                style={styles.campo}
                onPress={() =>
                  setMostrarData(true)
                }
                activeOpacity={0.7}
              >
                <Text
                  style={
                    data
                      ? styles.valor
                      : styles.placeholder
                  }
                >
                  {data ||
                    "Selecione a data"}
                </Text>

                <CalendarDays
                  size={23}
                  color={GREEN}
                  strokeWidth={2}
                />
              </TouchableOpacity>

              {mostrarData && (
                <DateTimePicker
                  value={
                    dataDate || new Date()
                  }
                  mode="date"
                  display={
                    Platform.OS === "ios"
                      ? "spinner"
                      : "default"
                  }
                  onChange={alterarData}
                />
              )}
            </View>
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
            style={styles.botaoSalvar}
            onPress={salvarAlteracoes}
            activeOpacity={0.8}
          >
            <Text style={styles.textoSalvar}>
              Salvar alterações
            </Text>
          </TouchableOpacity>

          {/* EXCLUIR */}

          <TouchableOpacity
            style={styles.botaoExcluir}
            onPress={excluirLembrete}
            activeOpacity={0.7}
          >
            <Text style={styles.textoExcluir}>
              Excluir lembrete
            </Text>
          </TouchableOpacity>

        </ScrollView>

        {/* MODAL DE FREQUÊNCIA */}

        <Modal
          visible={mostrarFrequencia}
          transparent={true}
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

              {opcoesFrequencia.map(
                (opcao) => {
                  const selecionada =
                    frequencia === opcao;

                  return (
                    <TouchableOpacity
                      key={opcao}
                      style={
                        styles.opcaoFrequencia
                      }
                      onPress={() =>
                        selecionarFrequencia(
                          opcao
                        )
                      }
                      activeOpacity={0.7}
                    >
                      <Text
                        style={[
                          styles.textoOpcao,
                          selecionada &&
                            styles.opcaoSelecionada,
                        ]}
                      >
                        {opcao}
                      </Text>

                      {selecionada && (
                        <Check
                          size={21}
                          color={GREEN}
                          strokeWidth={3}
                        />
                      )}
                    </TouchableOpacity>
                  );
                }
              )}

              <TouchableOpacity
                style={styles.botaoCancelar}
                onPress={() =>
                  setMostrarFrequencia(false)
                }
                activeOpacity={0.7}
              >
                <Text
                  style={styles.textoCancelar}
                >
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

/* =========================
   ESTILOS
========================= */

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
    paddingTop: 10,
    paddingBottom: 45,
  },

  label: {
    fontSize: 17,
    fontWeight: "600",

    color: TEXT,

    marginBottom: 9,
    marginTop: 18,
  },

  campoTexto: {
    width: "100%",
    height: 62,

    borderWidth: 1,
    borderColor: "#777777",
    borderRadius: 10,

    paddingHorizontal: 17,

    fontSize: 16,
    color: TEXT,

    backgroundColor: "#FFFFFF",
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

  horario: {
    flex: 1,

    textAlign: "center",

    fontSize: 18,
    color: TEXT,

    marginLeft: 25,
  },

  valor: {
    flex: 1,

    fontSize: 16,
    color: TEXT,
  },

  placeholder: {
    flex: 1,

    fontSize: 16,
    color: "#555555",
  },

  diasContainer: {
    marginTop: 8,
  },

  subtitulo: {
    fontSize: 15,
    color: TEXT,

    marginBottom: 12,
  },

  diasLinha: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  dia: {
    width: 38,
    height: 38,

    borderRadius: 19,

    borderWidth: 1,
    borderColor: "#AAAAAA",

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

  botaoSalvar: {
    width: "100%",
    height: 58,

    borderRadius: 10,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: GREEN,

    marginTop: 30,
  },

  textoSalvar: {
    fontSize: 17,
    fontWeight: "700",

    color: "#FFFFFF",
  },

  botaoExcluir: {
    width: "100%",
    height: 50,

    justifyContent: "center",
    alignItems: "center",

    marginTop: 12,
    marginBottom: 10,
  },

  textoExcluir: {
    fontSize: 16,
    fontWeight: "600",

    color: RED,
  },

  /* MODAL */

  modalFundo: {
    flex: 1,

    backgroundColor:
      "rgba(0, 0, 0, 0.35)",

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

  opcaoFrequencia: {
    minHeight: 54,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

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
});