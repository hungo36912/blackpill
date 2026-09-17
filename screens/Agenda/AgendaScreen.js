import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SwitchSelector from 'react-native-switch-selector';
import { SafeAreaView } from 'react-native-safe-area-context';

import colors from '../../theme/colors';
import radius from '../../theme/radius';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';

import api from '../../services/api';
import { dataParaApi } from '../../services/lembretes';

export default function AgendaScreen({ onAbrirCalendario }) {
  const options = [
    { label: 'Hoje', value: 'hoje' },
    { label: 'Semana', value: 'semana' },
    { label: 'Calendário', value: 'calendario' },
  ];

  const [periodo, setPeriodo] = useState('hoje');
  const [dataExibida, setDataExibida] = useState('');
  const [lembretes, setLembretes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const agora = new Date();
    const diaSemana = agora.toLocaleDateString('pt-BR', { weekday: 'long' });
    const diaSemanaFormatado = diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1);
    const dataNumerica = agora.toLocaleDateString('pt-BR');
    setDataExibida(`${diaSemanaFormatado}, ${dataNumerica}`);
  }, []);

  const carregarLembretes = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/lembretes');
      setLembretes(response.data || []);
    } catch (error) {
      console.log('Erro ao carregar lembretes:', error);
      setLembretes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregarLembretes();
  }, [carregarLembretes]);

  const handlePeriodoChange = (value) => {
    if (value === 'calendario') {
      onAbrirCalendario?.();
      return;
    }
    setPeriodo(value);
  };

  const lembretesFiltrados = React.useMemo(() => {
    const hoje = new Date();
    const hojeStr = dataParaApi(hoje);
    const diaSemanaHoje = hoje.getDay();

    return lembretes.filter((lembrete) => {
      if (lembrete.data_unica) {
        if (periodo === 'hoje') {
          return lembrete.data_unica === hojeStr;
        }

        const dataUnica = new Date(lembrete.data_unica + 'T12:00:00');
        const diffDias = Math.ceil(
          (dataUnica.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24)
        );
        return diffDias >= 0 && diffDias <= 7;
      }

      if (periodo === 'hoje') {
        if (
          lembrete.frequencia?.toLowerCase().includes('diár') ||
          lembrete.frequencia?.toLowerCase().includes('diario')
        ) {
          return true;
        }
        return lembrete.dias_semana?.includes(diaSemanaHoje);
      }

      return true;
    });
  }, [lembretes, periodo]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardLeft}>
        <Ionicons name="medical" size={22} color={colors.primary} />
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.medicamento}>{item.medicamento}</Text>
        <Text style={styles.horario}>{item.horario}</Text>
        <Text style={styles.frequencia}>{item.frequencia}</Text>
      </View>

      {item.notificacao && (
        <Ionicons name="notifications" size={20} color={colors.primary} />
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Agenda</Text>
      </View>

      <View style={styles.content}>
        <SwitchSelector
          options={options}
          initial={0}
          onPress={handlePeriodoChange}
          buttonColor={colors.primary}
          borderRadius={radius.md}
          bold
          backgroundColor={colors.background}
          style={styles.switchSelector}
        />

        <View style={styles.dateRow}>
          <View style={styles.calendarCircle}>
            <Ionicons name="calendar" size={24} color={colors.primary} />
          </View>

          <View style={styles.dateInfo}>
            <Text style={styles.dateTitle}>{dataExibida}</Text>
          </View>

          <TouchableOpacity
            style={styles.seeAll}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Ver todos os alertas"
            onPress={() => {
              // TODO: navegar para lista completa
            }}
          >
            <Text style={styles.seeAllText}>Ver todos</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : lembretesFiltrados.length === 0 ? (
          <View style={styles.centered}>
            <Text style={styles.emptyText}>Nenhum alerta agendado.</Text>
          </View>
        ) : (
          <FlatList
            data={lembretesFiltrados}
            keyExtractor={(item) => item.id_lembrete}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
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
    shadowOffset: { width: 0, height: 2 },
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
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  dateRow: {
    minHeight: 72,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.md,
    width: '100%',
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: typography.size.md,
    lineHeight: typography.size.md + 6,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: spacing.xl,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardLeft: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  cardContent: {
    flex: 1,
  },
  medicamento: {
    fontSize: typography.size.md,
    fontWeight: '700',
    color: colors.text,
  },
  horario: {
    fontSize: typography.size.sm,
    color: colors.primary,
    marginTop: 2,
    fontWeight: '600',
  },
  frequencia: {
    fontSize: typography.size.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
