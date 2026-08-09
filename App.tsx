import React, { useState } from "react";
import Splash from "./src/screens/Splash/Splash";
import Lembretes from "./src/screens/Lembretes/Lembretes";
import NovoLembrete from "./src/screens/NovoLembrete/NovoLembrete";
import Notificacoes from "./src/screens/Notificacoes/Notificacoes";
import EditarLembrete from "./src/screens/EditarLembretes/EditarLembrete";

import {
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

const telas = [
  require("./assets/onboarding/onboarding1/onboarding1.png"),
  require("./assets/onboarding/onboarding2/onboarding2.png"),
  require("./assets/onboarding/onboarding3/onboarding3.png"),
];

export default function App() {
  const [splash, setSplash] = useState(true);
  const [telaAtual, setTelaAtual] = useState(0);
  const [onboardingFinalizado, setOnboardingFinalizado] = useState(false);
  const [telaLembretes, setTelaLembretes] = useState(false);
  const [telaNovoLembrete, setTelaNovoLembrete] = useState(false);
  const [telaNotificacoes, setTelaNotificacoes] = useState(false);
  const [telaEditarLembrete, setTelaEditarLembrete] = useState(false);

  if (splash) {
    return (
      <Splash
        onFinish={() => setSplash(false)}
      />
    );
  }


  if (telaNotificacoes) {
  return (
    <Notificacoes
      onVoltar={() => setTelaNotificacoes(false)}
    />
  );
}

  if (telaNovoLembrete) {
    return (
      <NovoLembrete
        onVoltar={() => setTelaNovoLembrete(false)}
        onSalvar={() => {
          setTelaNovoLembrete(false);
          setTelaLembretes(true);
        }}
      />
    );
  }

  if (telaLembretes) {
    return (
      <Lembretes
        onVoltar={() => setTelaLembretes(false)}
        onAdicionarLembrete={() => setTelaNovoLembrete(true)}
      />
    );
  }

  if (onboardingFinalizado) {
    return (
      <Lembretes
        onVoltar={() => setOnboardingFinalizado(false)}
        onAdicionarLembrete={() => setTelaNovoLembrete(true)}
      />
    );
  }

  function proximaTela() {
    if (telaAtual < telas.length - 1) {
      setTelaAtual(telaAtual + 1);
    } else {
      setOnboardingFinalizado(true);
    }
  }

  function pular() {
    setOnboardingFinalizado(true);
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={telas[telaAtual]}
        style={styles.background}
        resizeMode="cover"
      >
        <TouchableOpacity
          style={styles.botaoProximo}
          onPress={proximaTela}
          activeOpacity={0.8}
        >
          <Text style={styles.textoBotao}>
            {telaAtual === telas.length - 1
              ? "Começar"
              : "Próximo"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoPular}
          onPress={pular}
          activeOpacity={0.7}
        >
          <Text style={styles.textoPular}>
            Pular
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  background: {
    flex: 1,
    width,
    height,
  },

  botaoProximo: {
    position: "absolute",
    left: "7%",
    right: "7%",
    bottom: height * 0.145,
    height: 52,
    backgroundColor: "#65A96F",
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
  },

  textoBotao: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  botaoPular: {
    position: "absolute",
    bottom: height * 0.085,
    width: "100%",
    alignItems: "center",
  },

  textoPular: {
    color: "#009B4D",
    fontSize: 15,
    fontWeight: "bold",
  },
});