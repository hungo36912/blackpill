import React, { useState } from "react";
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
  require("./assets/onboarding1.png"),
  require("./assets/onboarding2.png"),
  require("./assets/onboarding3.png"),
];

export default function App() {
  const [telaAtual, setTelaAtual] = useState(0);

  function proximaTela() {
    if (telaAtual < telas.length - 1) {
      setTelaAtual(telaAtual + 1);
    } else {
      console.log("Finalizou o onboarding");
    }
  }

  function pular() {
    console.log("Usuário pulou o onboarding");
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={telas[telaAtual]}
        style={styles.background}
        resizeMode="cover"
      >

        {/* BOTÃO PRÓXIMO */}
        <TouchableOpacity
          style={styles.botaoProximo}
          onPress={proximaTela}
          activeOpacity={0.8}
        >
          <Text style={styles.textoBotao}>
            {telaAtual === telas.length - 1 ? "Começar" : "Próximo"}
          </Text>
        </TouchableOpacity>

        {/* BOTÃO PULAR */}
        <TouchableOpacity
          style={styles.botaoPular}
          onPress={pular}
          activeOpacity={0.7}
        >
          <Text style={styles.textoPular}>Pular</Text>
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
    width: width,
    height: height,
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