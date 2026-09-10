import React, { useState } from 'react';

import { Ionicons } from "@expo/vector-icons";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import colors from '../../theme/colors';
import radius from '../../theme/radius';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';

import {
  Calendar,
  LocaleConfig,
} from 'react-native-calendars';

LocaleConfig.locales['pt-br'] = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],

  monthNamesShort: [
    'Jan.',
    'Fev.',
    'Mar.',
    'Abr.',
    'Mai.',
    'Jun.',
    'Jul.',
    'Ago.',
    'Set.',
    'Out.',
    'Nov.',
    'Dez.',
  ],

  dayNames: [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
  ],

  dayNamesShort: [
    'Dom',
    'Seg',
    'Ter',
    'Qua',
    'Qui',
    'Sex',
    'Sáb',
  ],

  today: 'Hoje',
};

LocaleConfig.defaultLocale = 'pt-br';

const getToday = () => {
  const today = new Date();

  const year = today.getFullYear();

  const month = String(
    today.getMonth() + 1
  ).padStart(2, '0');

  const day = String(
    today.getDate()
  ).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const formatDate = (dateString) => {
  const [year, month, day] = dateString
    .split('-')
    .map(Number);

  const date = new Date(
    year,
    month - 1,
    day
  );

  return {
    day: date.getDate(),

    month: date.toLocaleDateString(
      'pt-BR',
      {
        month: 'long',
      }
    ),

    weekday: date.toLocaleDateString(
      'pt-BR',
      {
        weekday: 'long',
      }
    ),
  };
};

export default function CalendarScreen({
  onVoltar,
}) {
  const today = getToday();

  const [selectedDate, setSelectedDate] =
    useState(today);

  const selected =
    formatDate(selectedDate);

  const markedDates = {
    [selectedDate]: {
      selected: true,
      selectedColor: colors.primary,
      selectedTextColor: '#FFFFFF',
    },
  };

  return (
    <View style={styles.container}>

      {/* CABEÇALHO */}
      <View style={styles.header}>

        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.7}
          onPress={onVoltar}
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
          Calendário de tratamento
        </Text>

      </View>

      {/* CONTEÚDO */}
      <View style={styles.content}>

        {/* CALENDÁRIO */}
        <View style={styles.calendarContainer}>

          <Calendar
            current={today}

            markedDates={markedDates}

            onDayPress={(day) => {
              setSelectedDate(
                day.dateString
              );
            }}

            firstDay={0}

            hideExtraDays={false}

            enableSwipeMonths

            renderArrow={(direction) => (
              <Text style={styles.arrow}>
                {direction === 'left'
                  ? '‹'
                  : '›'}
              </Text>
            )}

            theme={{
              backgroundColor:
                colors.card,

              calendarBackground:
                colors.card,

              textSectionTitleColor:
                colors.textSecondary,

              dayTextColor:
                colors.text,

              textDisabledColor:
                colors.border,

              monthTextColor:
                colors.text,

              selectedDayBackgroundColor:
                colors.primary,

              selectedDayTextColor:
                '#FFFFFF',

              todayTextColor:
                colors.text,

              arrowColor:
                colors.primary,

              textDayFontSize:
                typography.size.sm,

              textDayFontWeight:
                '400',

              textMonthFontSize:
                typography.size.md,

              textMonthFontWeight:
                '700',

              textDayHeaderFontSize:
                typography.size.xs,

              textDayHeaderFontWeight:
                '400',

              'stylesheet.calendar.header': {

                header: {
                  flexDirection: 'row',

                  justifyContent:
                    'space-between',

                  alignItems:
                    'center',

                  paddingHorizontal:
                    spacing.sm,

                  paddingTop:
                    spacing.xs,

                  paddingBottom:
                    spacing.md,
                },

                monthText: {
                  fontSize:
                    typography.size.md,

                  fontWeight:
                    '700',

                  color:
                    colors.text,

                  margin: 0,
                },
              },
            }}
          />

        </View>

        {/* LEGENDA */}
        <View style={styles.legend}>

          <View style={styles.legendItem}>

            <View style={styles.greenDot} />

            <Text style={styles.legendText}>
              Com medicamentos
            </Text>

          </View>

          <View style={styles.legendItem}>

            <View style={styles.orangeDot} />

            <Text style={styles.legendText}>
              Atrasado
            </Text>

          </View>

        </View>

        {/* DIA SELECIONADO */}
        <View style={styles.selectedDayCard}>

          <Text style={styles.selectedDayTitle}>
            {selected.weekday
              .charAt(0)
              .toUpperCase() +
              selected.weekday.slice(1)}
            , {selected.day} de{' '}
            {selected.month}
          </Text>

        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,

    backgroundColor:
      colors.authBackground,
  },

  /* CABEÇALHO */
  header: {
    minHeight: 75,

    backgroundColor:
      colors.authBackground,

    justifyContent:
      'center',

    alignItems:
      'center',

    borderBottomWidth: 1,

    borderBottomColor:
      colors.border,

    paddingHorizontal:
      spacing.lg,

    shadowColor:
      colors.text,

    shadowOpacity: 0.08,

    shadowRadius: 5,

    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 2,

    position: 'relative',
  },

  backButton: {
    position: 'absolute',

    left: spacing.lg,

    width: 48,

    height: 48,

    justifyContent:
      'center',

    alignItems:
      'center',

    zIndex: 1,
  },

  headerTitle: {
    color:
      colors.text,

    fontSize:
      typography.size.xl,

    lineHeight:
      typography.size.xl + 8,

    fontWeight:
      '800',

    textAlign:
      'center',
  },

  /* CONTEÚDO */
  content: {
    flex: 1,

    paddingHorizontal:
      spacing.xl,

    paddingTop:
      spacing.xl,

    alignItems:
      'center',
  },

  /* CALENDÁRIO */
  calendarContainer: {
    width: '90%',

    backgroundColor:
      colors.card,

    borderRadius:
      radius.md,

    borderWidth: 1,

    borderColor:
      colors.border,

    overflow:
      'hidden',
  },

  arrow: {
    color:
      colors.primary,

    fontSize: 28,

    fontWeight:
      '300',

    lineHeight: 28,
  },

  /* LEGENDA */
  legend: {
    flexDirection:
      'row',

    justifyContent:
      'center',

    alignItems:
      'center',

    marginTop:
      spacing.md,

    gap:
      spacing.md,
  },

  legendItem: {
    flexDirection:
      'row',

    alignItems:
      'center',
  },

  greenDot: {
    width: 5,

    height: 5,

    borderRadius: 3,

    backgroundColor:
      colors.primary,

    marginRight:
      spacing.xs,
  },

  orangeDot: {
    width: 5,

    height: 5,

    borderRadius: 3,

    backgroundColor:
      '#F29B38',

    marginRight:
      spacing.xs,
  },

  legendText: {
    color:
      colors.textSecondary,

    fontSize:
      typography.size.sm,
  },

  /* DIA SELECIONADO */
  selectedDayCard: {
    width: '80%',

    minHeight: 152,

    backgroundColor:
      colors.card,

    borderWidth: 1,

    borderColor:
      colors.border,

    marginTop:
      spacing.lg,

    paddingTop:
      spacing.sm,

    paddingHorizontal:
      spacing.sm,

    borderRadius:
      radius.md,
  },

  selectedDayTitle: {
    color:
      colors.text,

    fontSize:
      typography.size.sm,

    fontWeight:
      '700',
  },

});