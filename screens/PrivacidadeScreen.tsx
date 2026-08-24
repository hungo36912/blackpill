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
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { radius } from '../theme/radius';

import AccordionItem from '../components/AccordionItem';

type Props = {
  onVoltar: () => void;
};

export default function PrivacidadeScreen({
  onVoltar,
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
          Privacidade
        </Text>

        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.cardTopo}>
          <View style={styles.iconCircle}>
            <Ionicons
              name="shield-checkmark-outline"
              size={20}
              color={colors.primary}
            />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.tituloTopo}>
              Sua privacidade é importante
            </Text>

            <Text style={styles.textoTopo}>
              O AlertaMed respeita a privacidade dos usuários e está comprometido
              em proteger todas as informações cadastradas no aplicativo.
            </Text>
          </View>
        </View>

        <AccordionItem
          icon="person-outline"
          titulo="1. Coleta de Dados"
          texto="Coletamos apenas as informações necessárias para o funcionamento do aplicativo, como nome, e-mail, dados da ficha médica e medicamentos cadastrados."
        />

        <AccordionItem
          icon="clipboard-outline"
          titulo="2. Utilização das Informações"
          texto={
            'As informações coletadas são utilizadas para:\n\n• Organizar tratamentos\n• Emitir lembretes de medicamentos\n• Exibir histórico de utilização\n• Melhorar a experiência de uso do aplicativo'
          }
        />

        <AccordionItem
          icon="people-outline"
          titulo="3. Compartilhamento de Dados"
          texto="O AlertaMed não vende, aluga ou compartilha informações pessoais com terceiros, exceto quando houver obrigação legal."
        />

        <AccordionItem
          icon="lock-closed-outline"
          titulo="4. Segurança das Informações"
          texto="Adotamos medidas para proteger as informações armazenadas contra acessos não autorizados, alterações indevidas ou perda de dados."
        />

        <AccordionItem
          icon="person-outline"
          titulo="5. Direitos do Usuário"
          texto="Você pode solicitar a atualização, correção ou exclusão de seus dados pessoais a qualquer momento."
        />

        <AccordionItem
          icon="document-text-outline"
          titulo="6. Alterações nesta Política"
          texto="Esta Política de Privacidade poderá ser atualizada sempre que necessário para refletir melhorias no aplicativo ou mudanças na legislação."
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
                Dúvidas?
              </Text>

              <Text style={styles.texto}>
                Entre em contato com a equipe do AlertaMed pela seção Ajuda e
                Suporte no aplicativo.
              </Text>
            </View>
          </View>
        </View>

        <Text style={styles.rodape}>
          Versão 1.0 • Última atualização: Junho/2026
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
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
    paddingHorizontal: spacing.lg,
    paddingTop: spacing['4xl'],
    paddingVertical: spacing.lg,
  },

  headerTitle: {
    fontSize: typography.size.xl,
    fontWeight: '700',
    color: colors.text,
  },

  headerSpacer: {
    width: 26,
  },

  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing['3xl'],
  },

  cardTopo: {
    flexDirection: 'row',
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
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },

  textContainer: {
    flex: 1,
  },

  tituloTopo: {
    fontSize: typography.size.md,
    fontWeight: '700',
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
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  titulo: {
    fontSize: typography.size.md,
    fontWeight: '700',
    color: colors.primary,
  },

  texto: {
    fontSize: typography.size.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    lineHeight: 19,
  },

  rodape: {
    textAlign: 'center',
    color: colors.textSecondary,
    fontSize: typography.size.xs,
    marginTop: spacing.xl,
  },
});