import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import SwitchSelector from 'react-native-switch-selector';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import colors from '../../theme/colors';
import radius from '../../theme/radius';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';

export default function AgendaScreen({ onAbrirCalendario }) {
  const options = [
    { label: 'Hoje', value: '1' },
    { label: 'Semana', value: '1.5' },
    { label: 'Calendário', value: '2' },
  ];

  const [data, setData] = useState('');

  useEffect(() => {
    const dataAtual = new Date();

    const diaSemana = dataAtual.toLocaleDateString('pt-BR', {
      weekday: 'long',
    });

    const diaSemanaMaiusculo =
      diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1);

    const dataNumerica = dataAtual.toLocaleDateString('pt-BR');

    setData(`${diaSemanaMaiusculo}, ${dataNumerica}`);
  }, []);

  return (
    <SafeAreaProvider style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Agenda
        </Text>
      </View>

      <View style={styles.content}>
        <SwitchSelector
          options={options}
          initial={0}
          onPress={(value) => {
            if (value === '2') {
              onAbrirCalendario();
            }
          }}
          buttonColor={colors.primary}
          borderRadius={radius.md}
          bold={true}
          backgroundColor={colors.background}
          style={styles.switchSelector}
        />

        <View style={styles.dateRow}>
          <View style={styles.calendarCircle}>
            <Ionicons
              name="calendar"
              size={24}
              color={colors.primary}
            />
          </View>

          <View style={styles.dateInfo}>
            <Text style={styles.dateTitle}>
              {data}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.seeAll}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Ver todos os alertas"
          >
            <Text style={styles.seeAllText}>
              Ver todos
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.alerts}>
          <Text style={styles.text}>
            Nenhum alerta agendado.
          </Text>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.authBackground,
  },

  header: {
    minHeight: 75,
    justifyContent: 'center',
    alignItems: 'center',
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

  headerTitle: {
    fontSize: typography.size.xl,
    lineHeight: typography.size.xl + 8,
    fontWeight: '800',
    color: colors.text,
  },

  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
  },

  switchSelector: {
    width: '100%',
    alignSelf: 'center',

    shadowColor: colors.text,
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 2,
  },

  dateRow: {
    minHeight: 72,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.md,
    width: '100%',
    alignSelf: 'center',
  },

  calendarCircle: {
    width: 48,
    height: 48,
    borderRadius: radius['2xl'],
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
  },

  dateInfo: {
    flex: 1,
    marginLeft: spacing.md,
    paddingRight: spacing.sm,
  },

  dateTitle: {
    fontSize: typography.size.md,
    lineHeight: typography.size.md + 6,
    fontWeight: '700',
    color: colors.text,
  },

  seeAll: {
    minHeight: 44,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  seeAllText: {
    color: colors.primary,
    fontSize: typography.size.sm,
    lineHeight: typography.size.sm + 5,
    fontWeight: '700',
  },

  alerts: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },

  text: {
    fontSize: typography.size.md,
    lineHeight: typography.size.md + 6,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});