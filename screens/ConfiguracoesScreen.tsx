import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import colors from '../theme/colors';

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
  icon: React.ComponentProps<typeof Ionicons>['name'];
  titulo: string;
  subtitulo?: string;
  onPress?: () => void;
  custom?: React.ReactNode;
};

type IdiomaId = 'pt-BR' | 'en' | 'es';

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
        <TouchableOpacity onPress={onVoltar}>
          <Ionicons
            name="chevron-back"
            size={26}
            color={colors.text}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Configurações
        </Text>

        <View style={{ width: 26 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
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
    >
      <View style={styles.itemIconCircle}>
        <Ionicons
          name={icon}
          size={20}
          color={colors.primary}
        />
      </View>

      <View style={{ flex: 1 }}>
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
          size={18}
          color={colors.textSecondary}
        />
      )}
    </TouchableOpacity>
  );
}

function SeletorIdioma() {
  const [idioma, setIdioma] =
    React.useState<IdiomaId>('pt-BR');

  const idiomas: {
    id: IdiomaId;
    label: string;
  }[] = [
    {
      id: 'pt-BR',
      label: 'Português (Brasil)',
    },
    {
      id: 'en',
      label: 'English',
    },
    {
      id: 'es',
      label: 'Español',
    },
  ];

  return (
    <View style={{ marginTop: 10 }}>
      {idiomas.map((item) => {
        const selecionado =
          item.id === idioma;

        return (
          <TouchableOpacity
            key={item.id}
            style={styles.idiomaRow}
            onPress={() => setIdioma(item.id)}
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
                <View style={styles.radioInterno} />
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingVertical: 14,
  },

  headerTitle: {
    fontSize: 21,
    fontWeight: '700',
    color: colors.text,
  },

  content: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },

  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    marginTop: 20,
    marginBottom: 8,
    letterSpacing: 0.5,
  },

  card: {
    backgroundColor: colors.card,
    borderRadius: 14,
    paddingHorizontal: 14,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },

  itemIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  itemTitulo: {
    fontSize: 14.5,
    fontWeight: '600',
    color: colors.text,
  },

  itemSubtitulo: {
    fontSize: 12.5,
    color: colors.textSecondary,
    marginTop: 2,
  },

  divisor: {
    height: 1,
    backgroundColor: colors.border,
  },

  idiomaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },

  idiomaTexto: {
    fontSize: 14,
    color: colors.text,
  },

  radioExterno: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  radioExternoAtivo: {
    borderColor: colors.primary,
  },

  radioInterno: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
});