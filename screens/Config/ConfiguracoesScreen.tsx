import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import colors from "../../theme/colors";
import { spacing } from "../../theme/spacing";
import { typography } from "../../theme/typography";
import { radius } from "../../theme/radius";

type Props = {
  onVoltar: () => void;
  onAbrirBackup: () => void;
  onAbrirNotificacoes: () => void;
  onAbrirAparencia: () => void;
  onAbrirPrivacidade: () => void;
  onAbrirSobre: () => void;
  onAbrirTermos: () => void;
  onAbrirPerguntas: () => void;
  onAbrirFaleConosco: () => void;
  onAbrirRelatarProblema: () => void;
};

type ItemMenuProps = {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  titulo: string;
  subtitulo?: string;
  onPress?: () => void;
  custom?: React.ReactNode;
};

type IdiomaId = "pt-BR" | "en" | "es";

export default function ConfiguracoesScreen({
  onVoltar,
  onAbrirBackup,
  onAbrirAparencia,
  onAbrirPrivacidade,
  onAbrirSobre,
  onAbrirTermos,
  onAbrirPerguntas,
  onAbrirFaleConosco,
  onAbrirRelatarProblema,
  onAbrirNotificacoes,
}: Props) {
  return (
    <SafeAreaView style={styles.container}>
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
          Configurações
        </Text>

        <View style={styles.espacoHeader} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionLabel}>
          GERAL
        </Text>

        <View style={styles.card}>
          <ItemMenu
            icon="cloud-upload-outline"
            titulo="Backup e sincronização"
            subtitulo="Seus dados e seguros"
            onPress={onAbrirBackup}
          />

          <Divisor />

          <ItemMenu
            icon="sunny-outline"
            titulo="Aparência"
            subtitulo="Tema claro"
            onPress={onAbrirAparencia}
          />

          <Divisor />

          <ItemMenu
            icon="globe-outline"
            titulo="Idioma"
            custom={<SeletorIdioma />}
          />

          <Divisor />

          <ItemMenu
            icon="notifications-outline"
            titulo="Notificações"
            subtitulo="Sons, vibrações e lembretes"
            onPress={onAbrirNotificacoes}
          />
        </View>

        <Text style={styles.sectionLabel}>
          SEGURANÇA
        </Text>

        <View style={styles.card}>
          <ItemMenu
            icon="lock-closed-outline"
            titulo="Privacidade"
            subtitulo="Política e permissões"
            onPress={onAbrirPrivacidade}
          />
        </View>

        <Text style={styles.sectionLabel}>
          SUPORTE
        </Text>

        <View style={styles.card}>
          <ItemMenu
            icon="information-circle-outline"
            titulo="Sobre o aplicativo"
            subtitulo="Versão 0.0.7"
            onPress={onAbrirSobre}
          />

          <Divisor />

          <ItemMenu
            icon="document-text-outline"
            titulo="Termos de uso"
            onPress={onAbrirTermos}
          />

          <Divisor />

          <ItemMenu
            icon="help-circle-outline"
            titulo="Perguntas frequentes"
            onPress={onAbrirPerguntas}
          />

          <Divisor />

          <ItemMenu
            icon="chatbubble-ellipses-outline"
            titulo="Fale conosco"
            onPress={onAbrirFaleConosco}
          />

          <Divisor />

          <ItemMenu
            icon="bug-outline"
            titulo="Relatar problema"
            onPress={onAbrirRelatarProblema}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function ItemMenu({
  icon,
  titulo,
  subtitulo,
  onPress,
  custom,
}: ItemMenuProps) {
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={0.7}
      accessibilityRole={
        onPress ? "button" : undefined
      }
      accessibilityLabel={titulo}
    >
      <View style={styles.itemIconCircle}>
        <Ionicons
          name={icon}
          size={22}
          color={colors.primary}
        />
      </View>

      <View style={styles.itemConteudo}>
        <Text style={styles.itemTitulo}>
          {titulo}
        </Text>

        {subtitulo && (
          <Text style={styles.itemSubtitulo}>
            {subtitulo}
          </Text>
        )}

        {custom}
      </View>

      {onPress && (
        <Ionicons
          name="chevron-forward"
          size={22}
          color={colors.textSecondary}
        />
      )}
    </TouchableOpacity>
  );
}

function SeletorIdioma() {
  const [idioma, setIdioma] =
    React.useState<IdiomaId>("pt-BR");

  const idiomas: {
    id: IdiomaId;
    label: string;
  }[] = [
    {
      id: "pt-BR",
      label: "Português (Brasil)",
    },
    {
      id: "en",
      label: "English",
    },
    {
      id: "es",
      label: "Español",
    },
  ];

  return (
    <View style={styles.seletorIdioma}>
      {idiomas.map((item) => {
        const selecionado =
          item.id === idioma;

        return (
          <TouchableOpacity
            key={item.id}
            style={styles.idiomaRow}
            onPress={() =>
              setIdioma(item.id)
            }
            activeOpacity={0.7}
            accessibilityRole="radio"
            accessibilityLabel={item.label}
            accessibilityState={{
              selected: selecionado,
            }}
          >
            <Text style={styles.idiomaTexto}>
              {item.label}
            </Text>

            <View
              style={[
                styles.radioExterno,
                selecionado &&
                  styles.radioExternoAtivo,
              ]}
            >
              {selecionado && (
                <View
                  style={styles.radioInterno}
                />
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function Divisor() {
  return <View style={styles.divisor} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  botaoVoltar: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: typography.size.xl,
    lineHeight: typography.size.xl + 8,
    fontWeight: "700",
    color: colors.text,
  },

  espacoHeader: {
    width: 48,
  },

  scroll: {
    flex: 1,
  },

  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing["3xl"],
  },

  sectionLabel: {
    fontSize: typography.size.sm,
    lineHeight: typography.size.sm + 5,
    fontWeight: "700",
    color: colors.textSecondary,
    marginTop: spacing.xl,
    marginBottom: spacing.sm,
    letterSpacing: 0.6,
  },

  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    overflow: "hidden",
  },

  item: {
    minHeight: 72,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.md,
  },

  itemIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },

  itemConteudo: {
    flex: 1,
  },

  itemTitulo: {
    fontSize: typography.size.md,
    lineHeight: typography.size.md + 6,
    fontWeight: "600",
    color: colors.text,
  },

  itemSubtitulo: {
    fontSize: typography.size.sm,
    lineHeight: typography.size.sm + 5,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },

  divisor: {
    height: 1,
    backgroundColor: colors.border,
  },

  seletorIdioma: {
    marginTop: spacing.sm,
  },

  idiomaRow: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.xs,
  },

  idiomaTexto: {
    flex: 1,
    fontSize: typography.size.md,
    lineHeight: typography.size.md + 6,
    color: colors.text,
  },

  radioExterno: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },

  radioExternoAtivo: {
    borderColor: colors.primary,
  },

  radioInterno: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
});