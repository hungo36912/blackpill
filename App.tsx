import React, { useState } from "react";

import Splash from "./src/screens/Splash/Splash";

import LoginScreen from "./screens/LoginScreen";
import CadastroScreen from "./screens/CadastroScreen";
import RecSenhaScreen from "./screens/RecSenhaScreen";

import HomeScreen from "./screens/Home/HomeScreen";
import MedicamentosScreen from "./screens/Medicamentos/MedicamentosScreen";
import AdicionarMedicamentoScreen from "./screens/Medicamentos/AdicionarMedicamentoScreen";

import BottomNavBar from "./components/BottomNavBar";

import AgendaScreen from "./screens/AgendaScreen";
import CalendarScreen from "./screens/CalendarScreen";

import PerfilScreen from "./screens/PerfilScreen";
import FichaMedicaScreen from "./screens/FichaMedicaScreen";
import HistoricoScreen from "./screens/HistoricoScreen";
import RelatoriosScreen from "./screens/RelatorioScreen";

import Lembretes from "./src/screens/Lembretes/Lembretes";
import NovoLembrete from "./src/screens/NovoLembrete/NovoLembrete";
import Notificacoes from "./src/screens/Notificacoes/Notificacoes";
import EditarLembrete from "./src/screens/EditarLembretes/EditarLembrete";

import ConfiguracoesScreen from "./screens/ConfiguracoesScreen";
import BackupSincronizacaoScreen from "./screens/BackupSincronizacaoScreen";
import AparenciaScreen from "./screens/AparenciaScreen";
import PrivacidadeScreen from "./screens/PrivacidadeScreen";
import SobreAppScreen from "./screens/SobreAppScreen";
import TermosDeUsoScreen from "./screens/TermosDeUsoScreen";
import PerguntasFrequentesScreen from "./screens/PerguntasFrequentesScreen";
import FaleConoscoScreen from "./screens/FaleConoscoScreen";
import RelatarProblemaScreen from "./screens/RelatarProblemaScreen";

import {
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import colors from "./theme/colors";
import radius from "./theme/radius";
import spacing from "./theme/spacing";
import typography from "./theme/typography";

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

  const [telaLogin, setTelaLogin] = useState(false);
  const [telaCadastro, setTelaCadastro] = useState(false);
  const [telaRecSenha, setTelaRecSenha] = useState(false);

  const [abaAtual, setAbaAtual] = useState<
    "inicio" | "agenda" | "medicamentos" | "perfil"
  >("inicio");

  const [telaAdicionarMedicamento, setTelaAdicionarMedicamento] =
    useState(false);

  const [telaLembretes, setTelaLembretes] = useState(false);
  const [telaNovoLembrete, setTelaNovoLembrete] = useState(false);
  const [telaNotificacoes, setTelaNotificacoes] = useState(false);
  const [telaEditarLembrete, setTelaEditarLembrete] = useState(false);

  const [telaConfiguracoes, setTelaConfiguracoes] = useState(false);
  const [telaBackup, setTelaBackup] = useState(false);
  const [telaAparencia, setTelaAparencia] = useState(false);
  const [telaPrivacidade, setTelaPrivacidade] = useState(false);
  const [telaSobreApp, setTelaSobreApp] = useState(false);
  const [telaTermos, setTelaTermos] = useState(false);
  const [telaPerguntas, setTelaPerguntas] = useState(false);
  const [telaFaleConosco, setTelaFaleConosco] = useState(false);
  const [telaRelatarProblema, setTelaRelatarProblema] = useState(false);
  const [telaRelatorio, setTelaRelatorio] = useState(false);

  const [telaFichaMedica, setTelaFichaMedica] = useState(false);
  const [telaHistorico, setTelaHistorico] = useState(false);
  const [telaCalendario, setTelaCalendario] = useState(false);

  if (splash) {
    return <Splash onFinish={() => setSplash(false)} />;
  }

  if (telaLogin) {
    return (
      <LoginScreen
        onAbrirCadastro={() => {
          setTelaLogin(false);
          setTelaCadastro(true);
        }}
        onAbrirRecuperacao={() => {
          setTelaLogin(false);
          setTelaRecSenha(true);
        }}
        onEntrar={() => {
          setTelaLogin(false);
          setOnboardingFinalizado(true);
        }}
      />
    );
  }

  if (telaCadastro) {
  return (
    <CadastroScreen
      onVoltarLogin={() => {
        setTelaCadastro(false);
        setTelaLogin(true);
      }}

      onCadastrar={() => {
        setTelaCadastro(false);
        setTelaLogin(true);
      }}

      onAbrirTermos={() => {
        setTelaCadastro(false);
        setTelaTermos(true);
      }}

      onAbrirPrivacidade={() => {
        setTelaCadastro(false);
        setTelaPrivacidade(true);
      }}
    />
  );
}

  if (telaRecSenha) {
    return (
      <RecSenhaScreen
        onVoltarLogin={() => {
          setTelaRecSenha(false);
          setTelaLogin(true);
        }}
      />
    );
  }

  if (telaBackup) {
    return (
      <BackupSincronizacaoScreen
        onVoltar={() => setTelaBackup(false)}
      />
    );
  }

  if (telaAparencia) {
    return (
      <AparenciaScreen
        onVoltar={() => setTelaAparencia(false)}
      />
    );
  }

  if (telaPrivacidade) {
    return (
      <PrivacidadeScreen
        onVoltar={() => setTelaPrivacidade(false)}
      />
    );
  }

  if (telaSobreApp) {
    return (
      <SobreAppScreen
        onVoltar={() => setTelaSobreApp(false)}
      />
    );
  }

  if (telaTermos) {
    return (
      <TermosDeUsoScreen
        onVoltar={() => setTelaTermos(false)}
      />
    );
  }

  if (telaPerguntas) {
    return (
     <PerguntasFrequentesScreen
  onVoltar={() => setTelaPerguntas(false)}
  onAbrirRelatarProblema={() => {
    setTelaPerguntas(false);
    setTelaRelatarProblema(true);
  }}
/>
    );
  }

  if (telaFaleConosco) {
    return (
      <FaleConoscoScreen
        onVoltar={() => setTelaFaleConosco(false)}
      />
    );
  }

  if (telaRelatarProblema) {
    return (
      <RelatarProblemaScreen
        onVoltar={() => setTelaRelatarProblema(false)}
      />
    );
  }

  if (telaConfiguracoes) {
    return (
      <ConfiguracoesScreen
        onVoltar={() => setTelaConfiguracoes(false)}
        onAbrirBackup={() => setTelaBackup(true)}
        onAbrirNotificacoes={() => setTelaNotificacoes(true)}
        onAbrirAparencia={() => setTelaAparencia(true)}
        onAbrirPrivacidade={() => setTelaPrivacidade(true)}
        onAbrirSobre={() => setTelaSobreApp(true)}
        onAbrirTermos={() => setTelaTermos(true)}
        onAbrirPerguntas={() => setTelaPerguntas(true)}
        onAbrirFaleConosco={() => setTelaFaleConosco(true)}
        onAbrirRelatarProblema={() =>
          setTelaRelatarProblema(true)
        }
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

  if (telaCalendario) {
    return (
      <CalendarScreen
        onVoltar={() => setTelaCalendario(false)}
      />
    );
  }

  if (telaLembretes) {
    return (
      <Lembretes
        onVoltar={() => setTelaLembretes(false)}
        onAdicionarLembrete={() =>
          setTelaNovoLembrete(true)
        }
        onAbrirConfiguracoes={() =>
          setTelaConfiguracoes(true)
        }
      />
    );
  }

  if (telaFichaMedica) {
    return (
      <FichaMedicaScreen
        onVoltar={() => setTelaFichaMedica(false)}
      />
    );
  }

  if (telaHistorico) {
    return (
      <HistoricoScreen
        onVoltar={() => setTelaHistorico(false)}
      />
    );
  }

  if (telaAdicionarMedicamento) {
    return (
      <AdicionarMedicamentoScreen
        onVoltar={() =>
          setTelaAdicionarMedicamento(false)
        }
      />
    );
  }

  if (telaRelatorio) {
  return (
    <RelatoriosScreen
      onVoltar={() => setTelaRelatorio(false)}
    />
  );
}

  if (onboardingFinalizado) {
    return (
      <View style={styles.appContainer}>
        <View style={styles.mainContent}>

          {abaAtual === "inicio" && (
            <HomeScreen
              onAddAlarme={() =>
                setTelaNovoLembrete(true)
              }
              onPressBell={() =>
                setTelaNotificacoes(true)
              }
              onPressSettings={() => {
                setTelaConfiguracoes(true);
              }}
              onPressQuickAction={(acao) => {
                if (acao === "add") {
                  setTelaAdicionarMedicamento(true);
                }

                if (acao === "bulas") {
                  setAbaAtual("medicamentos");
                }

                if (acao === "historico") {
                  setTelaHistorico(true);
                }

                if (acao === "alertas") {
                  setTelaLembretes(true);
                }
              }}
            />
          )}

          {abaAtual === "agenda" && (
            <AgendaScreen
              onAbrirCalendario={() =>
                setTelaCalendario(true)
              }
            />
          )}

          {abaAtual === "medicamentos" && (
            <MedicamentosScreen
              onAddMedicamento={() =>
                setTelaAdicionarMedicamento(true)
              }
            />
          )}

          {abaAtual === "perfil" && (
            <PerfilScreen
              onAbrirFicha={() => {
                setTelaFichaMedica(true);
              }}
              onAbrirLembretes={() => {
                setTelaLembretes(true);
              }}
              onAbrirHistorico={() => {
                setTelaHistorico(true);
              }}
             onAbrirRelatorios={() => {
  setTelaRelatorio(true);
}}
              onAbrirAjuda={() => {
                setTelaPerguntas(true);
              }}
              onAbrirSobre={() => {
                setTelaSobreApp(true);
              }}
              onSair={() => {
                setTelaLogin(true);
                setOnboardingFinalizado(false);
              }}
            />
          )}

        </View>

        <BottomNavBar
          activeTab={abaAtual}
          onHome={() =>
            setAbaAtual("inicio")
          }
          onAgenda={() => {
            setAbaAtual("agenda");
          }}
          onMedicamentos={() =>
            setAbaAtual("medicamentos")
          }
          onPerfil={() => {
            setAbaAtual("perfil");
          }}
        />
      </View>
    );
  }

  function proximaTela() {
    if (telaAtual < telas.length - 1) {
      setTelaAtual(telaAtual + 1);
    } else {
      setOnboardingFinalizado(true);
      setTelaLogin(true);
    }
  }

  function pular() {
    setOnboardingFinalizado(true);
    setTelaLogin(true);
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
    backgroundColor: colors.card,
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
    backgroundColor: colors.onboardingPrimary,
    borderRadius: radius.sm + 1,
    justifyContent: "center",
    alignItems: "center",
  },

  textoBotao: {
    color: colors.card,
    fontSize: typography.size.md,
    fontWeight: "bold",
  },

  botaoPular: {
    position: "absolute",
    bottom: height * 0.085,
    width: "100%",
    alignItems: "center",
  },

  textoPular: {
    color: colors.onboardingLink,
    fontSize: typography.size.sm + 1,
    fontWeight: "bold",
  },

  appContainer: {
    flex: 1,
    backgroundColor: colors.card,
  },

  mainContent: {
    flex: 1,
  },

  placeholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },

  placeholderText: {
    fontSize: typography.size.xl + 1,
    fontWeight: "700",
    color: colors.primary,
  },

  voltarText: {
    marginTop: spacing.xl,
    fontSize: typography.size.md,
    fontWeight: "600",
    color: colors.primary,
  },
});
