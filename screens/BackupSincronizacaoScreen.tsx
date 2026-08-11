import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import colors from '../theme/colors';

type Props = {
  onVoltar: () => void;
};

export default function BackupSincronizacaoScreen({
  onVoltar,
}: Props) {
  const [sincronizacaoAtiva, setSincronizacaoAtiva] =
    useState<boolean>(true);

  const [ultimoBackup] = useState<string>('hoje às 07:42');

  function fazerBackupAgora(): void {
    console.log('fazendo backup agora');
  }

  function restaurarBackup(): void {
    Alert.alert(
      'Restaurar backup',
      'Isso vai substituir os dados atuais do app pelos dados do último backup. Deseja continuar?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Restaurar',
          style: 'destructive',
          onPress: () => console.log('restaurando'),
        },
      ]
    );
  }

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
          Backup e sincronização
        </Text>

        <View style={{ width: 26 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.statusCard}>
          <Ionicons
            name="cloud-done-outline"
            size={22}
            color={colors.primary}
          />

          <View style={{ marginLeft: 10 }}>
            <Text style={styles.statusTitulo}>
              Backup atualizado
            </Text>

            <Text style={styles.statusTexto}>
              Último backup: {ultimoBackup}
            </Text>
          </View>
        </View>

        <Text style={styles.sectionLabel}>
          CONTA
        </Text>

        <TouchableOpacity style={styles.contaCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarTexto}>
              MJ
            </Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.contaEmail}>
              maria.j@email.com
            </Text>

            <Text style={styles.contaTexto}>
              Google Drive conectado
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={18}
            color={colors.textSecondary}
          />
        </TouchableOpacity>

        <Text style={styles.sectionLabel}>
          PREFERÊNCIAS
        </Text>

        <View style={styles.preferenciaCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.preferenciaTitulo}>
              Sincronização automática
            </Text>

            <Text style={styles.preferenciaTexto}>
              Salva lembretes e bulas em nuvem
            </Text>
          </View>

          <Switch
            value={sincronizacaoAtiva}
            onValueChange={setSincronizacaoAtiva}
            trackColor={{
              false: colors.border,
              true: colors.primary,
            }}
            thumbColor="#fff"
          />
        </View>

        <TouchableOpacity
          style={styles.botaoSecundario}
          onPress={fazerBackupAgora}
        >
          <Ionicons
            name="refresh-outline"
            size={18}
            color={colors.text}
          />

          <Text style={styles.botaoSecundarioTexto}>
            Fazer backup agora
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoPerigo}
          onPress={restaurarBackup}
        >
          <Text style={styles.botaoPerigoTexto}>
            Restaurar backup
          </Text>
        </TouchableOpacity>
      </View>
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
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
  },

  content: {
    paddingHorizontal: 16,
  },

  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    borderRadius: 12,
    padding: 16,
    marginTop: 10,
  },

  statusTitulo: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },

  statusTexto: {
    fontSize: 12.5,
    color: colors.primary,
    marginTop: 2,
  },

  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    marginTop: 20,
    marginBottom: 8,
    letterSpacing: 0.5,
  },

  contaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 14,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.text,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  avatarTexto: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
  },

  contaEmail: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },

  contaTexto: {
    fontSize: 12.5,
    color: colors.textSecondary,
    marginTop: 2,
  },

  preferenciaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 14,
  },

  preferenciaTitulo: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },

  preferenciaTexto: {
    fontSize: 12.5,
    color: colors.textSecondary,
    marginTop: 2,
  },

  botaoSecundario: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingVertical: 15,
    marginTop: 20,
  },

  botaoSecundarioTexto: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },

  botaoPerigo: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.danger,
    borderRadius: 12,
    paddingVertical: 15,
    marginTop: 12,
  },

  botaoPerigoTexto: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.danger,
  },
});