import React from "react";

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import colors from "../theme/colors";
import spacing from "../theme/spacing";
import typography from "../theme/typography";
import radius from "../theme/radius";

type Props = {
  onAbrirFicha: () => void;
  onAbrirLembretes: () => void;
  onAbrirHistorico: () => void;
  onAbrirRelatorios: () => void;
  onAbrirAjuda: () => void;
  onAbrirSobre: () => void;
  onSair: () => void;
};

type MenuItem = {
  title: string;
  subtitle: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  onPress?: () => void;
};

export default function PerfilScreen({
  onAbrirFicha,
  onAbrirLembretes,
  onAbrirHistorico,
  onAbrirRelatorios,
  onAbrirAjuda,
  onAbrirSobre,
  onSair,
}: Props) {
  const menu: MenuItem[] = [
    {
      title: "Ficha médica",
      subtitle: "Consulte seus dados de saúde",
      icon: "medkit-outline",
      onPress: onAbrirFicha,
    },
    {
      title: "Meus Lembretes",
      subtitle: "Gerencie seus lembretes e notificações",
      icon: "notifications-outline",
      onPress: onAbrirLembretes,
    },
    {
      title: "Histórico de tratamento",
      subtitle: "Veja seus tratamentos anteriores",
      icon: "arrow-undo-outline",
      onPress: onAbrirHistorico,
    },
    {
      title: "Relatórios",
      subtitle: "Acompanhe seu progresso",
      icon: "bar-chart-outline",
      onPress: onAbrirRelatorios,
    },
    {
      title: "Ajuda e suporte",
      subtitle: "Dúvidas frequentes e suporte",
      icon: "help-circle-outline",
      onPress: onAbrirAjuda,
    },
    {
      title: "Sobre o aplicativo",
      subtitle: "Versão 0.0.7",
      icon: "information-circle-outline",
      onPress: onAbrirSobre,
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.headerSide} />

          <Text style={styles.pageTitle}>
            Perfil
          </Text>

          <View style={styles.headerSide} />
        </View>

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Ionicons
              name="person"
              size={30}
              color={colors.text}
            />
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.name}>
              FULANO DE TAL
            </Text>

            <Text style={styles.email}>
              fulanodetal@gmail.com
            </Text>

            <Text style={styles.age}>
              73 anos
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          {menu.map((item, index) => (
            <TouchableOpacity
              key={item.title}
              activeOpacity={0.7}
              onPress={item.onPress}
              style={[
                styles.item,
                index !== menu.length - 1 && styles.itemBorder,
              ]}
              accessibilityRole="button"
              accessibilityLabel={item.title}
              accessibilityHint={item.subtitle}
            >
              <View style={styles.iconCircle}>
                <Ionicons
                  name={item.icon}
                  size={23}
                  color={colors.primary}
                />
              </View>

              <View style={styles.itemText}>
                <Text style={styles.itemTitle}>
                  {item.title}
                </Text>

                <Text style={styles.itemSubtitle}>
                  {item.subtitle}
                </Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={22}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          activeOpacity={0.8}
          onPress={onSair}
          accessibilityRole="button"
          accessibilityLabel="Sair da conta"
        >
          <Text style={styles.logoutText}>
            SAIR DA CONTA
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing["3xl"],
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
  },

  headerSide: {
    width: 40,
    height: 40,
  },

  pageTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: typography.size.xl,
    lineHeight: typography.size.xl + 8,
    fontWeight: "700",
    color: colors.text,
  },

  profileCard: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,

    shadowColor: colors.text,
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 1,
  },

  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },

  profileInfo: {
    flex: 1,
  },

  name: {
    fontSize: typography.size.md,
    lineHeight: typography.size.md + 6,
    fontWeight: "700",
    color: colors.text,
  },

  email: {
    fontSize: typography.size.sm,
    lineHeight: typography.size.sm + 5,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },

  age: {
    fontSize: typography.size.sm,
    lineHeight: typography.size.sm + 5,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },

  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,

    shadowColor: colors.text,
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 1,
  },

  item: {
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.md,
  },

  itemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },

  itemText: {
    flex: 1,
    paddingRight: spacing.sm,
  },

  itemTitle: {
    fontSize: typography.size.md,
    lineHeight: typography.size.md + 6,
    fontWeight: "600",
    color: colors.text,
  },

  itemSubtitle: {
    fontSize: typography.size.sm,
    lineHeight: typography.size.sm + 5,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },

  logoutButton: {
    marginTop: spacing.lg,
    minHeight: 50,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    backgroundColor: colors.danger,
    alignItems: "center",
    justifyContent: "center",
  },

  logoutText: {
    fontSize: typography.size.sm,
    lineHeight: typography.size.sm + 5,
    fontWeight: "700",
    color: colors.card,
  },
});