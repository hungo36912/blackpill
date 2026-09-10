import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import colors from "../../theme/colors";
import spacing from "../../theme/spacing";
import typography from "../../theme/typography";
import radius from "../../theme/radius";

import AccordionItem from "../../components/AccordionItem";

export default function TermosDeUsoScreen({
  onVoltar,
}) {
  return (
    <View style={styles.container}>

      {/* HEADER */}
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
          Termos de uso
        </Text>

      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        {/* CARD INICIAL */}
        <View style={styles.cardTopo}>

          <View style={styles.iconCircle}>
            <Ionicons
              name="document-text-outline"
              size={20}
              color={colors.primary}
            />
          </View>

          <View style={styles.flex}>

            <Text style={styles.tituloTopo}>
              Bem-vindo ao AlertaMed
            </Text>

            <Text style={styles.textoTopo}>
              Ao utilizar o AlertaMed, você concorda com estes Termos de Uso.
              Eles foram criados para garantir uma experiência segura,
              transparente e responsável para todos os usuários.
            </Text>

          </View>

        </View>

        {/* 1 */}
        <AccordionItem
          icon="checkmark-circle-outline"
          titulo="1. Aceitação dos Termos"
          texto="Ao criar uma conta ou utilizar o aplicativo, você declara que leu, compreendeu e concorda com estes Termos de Uso e com a Política de Privacidade."
        />

        {/* 2 */}
        <AccordionItem
          icon="phone-portrait-outline"
          titulo="2. Uso do Aplicativo"
          texto={
            "O AlertaMed foi desenvolvido para auxiliar no gerenciamento de medicamentos e tratamentos de saúde, oferecendo recursos como:\n\n• Cadastro de medicamentos\n• Lembretes de horários\n• Histórico de utilização\n• Organização de tratamentos\n• Compartilhamento com cuidadores\n\nO aplicativo não substitui orientações médicas ou farmacêuticas."
          }
        />

        {/* 3 */}
        <AccordionItem
          icon="person-outline"
          titulo="3. Responsabilidades do Usuário"
          texto={
            "O usuário é responsável por:\n\n• Manter seus dados atualizados\n• Utilizar informações verdadeiras\n• Proteger sua senha de acesso\n• Utilizar o aplicativo de forma ética e legal"
          }
        />

        {/* 4 */}
        <AccordionItem
          icon="medkit-outline"
          titulo="4. Limitação de Responsabilidade"
          texto="O AlertaMed atua apenas como ferramenta de apoio ao tratamento. A responsabilidade pelas decisões médicas e pelo uso correto dos medicamentos permanece com o usuário e seus profissionais de saúde."
        />

        {/* 5 */}
        <AccordionItem
          icon="refresh-outline"
          titulo="5. Atualizações do Aplicativo"
          texto="O aplicativo poderá receber atualizações para melhorar sua segurança, desempenho e funcionalidades. Algumas alterações poderão modificar estes Termos de Uso."
        />

        {/* 6 */}
        <AccordionItem
          icon="create-outline"
          titulo="6. Alterações nos Termos"
          texto="Os Termos de Uso poderão ser atualizados sempre que necessário. A versão mais recente estará disponível dentro do aplicativo."
        />

        {/* DÚVIDAS */}
        <View style={styles.card}>

          <View style={styles.header2}>

            <View style={styles.iconCircle}>
              <Ionicons
                name="mail-outline"
                size={20}
                color={colors.primary}
              />
            </View>

            <View style={styles.flex}>

              <Text style={styles.titulo}>
                Dúvidas?
              </Text>

              <Text style={styles.texto}>
                Entre em contato com a equipe do AlertaMed pela seção Ajuda e
                Suporte no aplicativo.
              </Text>

            </View>

          </View>

        </View>

        {/* RODAPÉ */}
        <Text style={styles.rodape}>
          Versão 1.0 • Última atualização: Junho/2026
        </Text>

      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.authBackground,
  },

  /* HEADER PADRONIZADO COM CONFIGURAÇÕES */

  header: {
    minHeight: 75,
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
    fontSize: typography.size.xl,
    lineHeight: typography.size.xl + 8,
    fontWeight: "800",
    color: colors.text,
  },

  scroll: {
    flex: 1,
  },

  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing["3xl"],
  },

  cardTopo: {
    flexDirection: "row",
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },

  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,

    backgroundColor: colors.primaryLight,

    alignItems: "center",
    justifyContent: "center",

    marginRight: spacing.md,
  },

  flex: {
    flex: 1,
  },

  tituloTopo: {
    fontSize: typography.size.md,
    fontWeight: "700",
    color: colors.primary,
  },

  textoTopo: {
    fontSize: typography.size.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    lineHeight: 19,
  },

  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },

  header2: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  titulo: {
    fontSize: typography.size.md,
    fontWeight: "700",
    color: colors.primary,
  },

  texto: {
    fontSize: typography.size.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    lineHeight: 19,
  },

  rodape: {
    textAlign: "center",
    color: colors.textSecondary,
    fontSize: typography.size.xs,
    marginTop: spacing.xl,
  },

});