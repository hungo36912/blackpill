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

import {
  ArrowLeft,
  Bell,
  Plus,
  Settings,
  CalendarDays,
  ChevronRight,
} from "lucide-react-native";

const { width } = Dimensions.get("window");

const GREEN = "#439B58";
const DARK_GREEN = "#1D522C";
const TEXT = "#17232B";

type Props = {
  onVoltar: () => void;
  onAdicionarLembrete: () => void;
};

export default function Lembretes({
  onVoltar,
  onAdicionarLembrete,
}: Props) {
  function abrirConfiguracoes() {
    console.log("Configurações");
  }

  function abrirCalendario() {
    console.log("Calendário de tratamento");
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
      />

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
          >
            <Plus
              size={30}
              color="#FFFFFF"
              strokeWidth={2}
            />

            <Text style={styles.textoBotao}>
              Adicionar lembrete
            </Text>
          </TouchableOpacity>

          <View style={styles.opcoes}>
            <TouchableOpacity
              style={styles.card}
              onPress={abrirConfiguracoes}
              activeOpacity={0.7}
            >
              <View style={styles.iconeCard}>
                <Settings
                  size={36}
                  color={DARK_GREEN}
                  strokeWidth={1.8}
                />
              </View>

              <View style={styles.textosCard}>
                <Text style={styles.tituloCard}>
                  Configurações
                </Text>

                <Text style={styles.descricaoCard}>
                  Sons, Vibrações e notificações
                </Text>
              </View>

              <ChevronRight
                size={27}
                color={TEXT}
                strokeWidth={2.5}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.card}
              onPress={abrirCalendario}
              activeOpacity={0.7}
            >
              <View style={styles.iconeCard}>
                <CalendarDays
                  size={36}
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
                size={27}
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
    alignItems: "center",
    paddingHorizontal: 22,
  },

  ilustracao: {
    width: width * 0.68,
    height: width * 0.68,
    maxWidth: 270,
    maxHeight: 270,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  circuloIlustracao: {
    position: "absolute",
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: "#EAF5ED",
  },

  ponto1: {
    position: "absolute",
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#D5E9DA",
    top: 20,
    left: 30,
  },

  ponto2: {
    position: "absolute",
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: "#D5E9DA",
    top: 75,
    right: 15,
  },

  ponto3: {
    position: "absolute",
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#D5E9DA",
    bottom: 55,
    left: 40,
  },

  titulo: {
    marginTop: -5,
    textAlign: "center",
    fontSize: 26,
    lineHeight: 34,
    fontWeight: "700",
    color: TEXT,
  },

  descricao: {
    marginTop: 12,
    textAlign: "center",
    fontSize: 17,
    lineHeight: 27,
    color: "#28343B",
  },

  botaoAdicionar: {
    marginTop: 22,
    width: "88%",
    height: 60,
    borderRadius: 10,
    backgroundColor: GREEN,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },

  textoBotao: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },

  opcoes: {
    width: "100%",
    marginTop: "auto",
    paddingTop: 15,
    paddingBottom: 20,
    gap: 10,
  },

  card: {
    width: "100%",
    minHeight: 62,
    borderWidth: 1,
    borderColor: "#777777",
    borderRadius: 12,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

  iconeCard: {
    width: 48,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },

  textosCard: {
    flex: 1,
  },

  tituloCard: {
    fontSize: 15,
    lineHeight: 19,
    fontWeight: "500",
    color: "#111111",
  },

  descricaoCard: {
    fontSize: 12,
    lineHeight: 15,
    color: "#333333",
  },
});