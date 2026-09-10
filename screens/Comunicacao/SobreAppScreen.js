import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import colors from "../../theme/colors";
import spacing from "../../theme/spacing";
import typography from "../../theme/typography";
import radius from "../../theme/radius";

import AccordionItem from "../../components/AccordionItem";

export default function SobreAppScreen({
  onVoltar,
}) {
  return (
    <View style={styles.container}>
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
          Sobre o aplicativo
        </Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cardTopo}>
          <View style={styles.logoCircle}>
            <Image
              source={require("../../assets/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.nomeApp}>
              AlertaMed
            </Text>
            <Text style={styles.slogan}>
              Cuidado que te acompanha.
            </Text>
            <Text style={styles.descricaoTopo}>
              O AlertaMed foi criado para ajudar você a organizar seus
              tratamentos e cuidar da sua saúde com mais segurança e
              tranquilidade.
            </Text>
          </View>
        </View>

        <AccordionItem
          icon="phone-portrait-outline"
          titulo="O que é o AlertaMed?"
          texto="..."
        />

        <AccordionItem
          icon="shield-checkmark-outline"
          titulo="Nosso Compromisso"
          texto="..."
        />

        <AccordionItem
          icon="heart-outline"
          titulo="Principais Recursos"
          texto={"..."}
        />

        <AccordionItem
          icon="lock-closed-outline"
          titulo="Privacidade e Segurança"
          texto="..."
        />

        <AccordionItem
          icon="help-circle-outline"
          titulo="Precisa de Ajuda?"
          texto="..."
        />

        <View style={styles.card}>
          <View style={styles.header2}>
            <View style={styles.iconCircle}>
              <Ionicons
                name="mail-outline"
                size={20}
                color={colors.primary}
              />
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.titulo}>
                Fale com o Suporte
              </Text>

              <Text style={styles.texto}>
                Entre em contato com a equipe do AlertaMed pela seção
                Ajuda e Suporte no aplicativo.
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={18}
              color={colors.textSecondary}
            />
          </View>
        </View>

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

  logoCircle: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.card,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },

  logo: {
    width: 90,
    height: 90,
  },

  textContainer: {
    flex: 1,
  },

  nomeApp: {
    fontSize: typography.size.lg,
    fontWeight: "700",
    color: colors.text,
  },

  slogan: {
    fontSize: typography.size.sm,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },

  descricaoTopo: {
    fontSize: typography.size.sm,
    color: colors.textSecondary,
    lineHeight: 18,
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

  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
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