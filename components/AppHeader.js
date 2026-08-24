import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import colors from '../theme/colors';
import spacing from '../theme/spacing';
import typography from '../theme/typography';

export default function AppHeader({
  onPressBell,
  onPressSettings,
}) {
  return (
    <View style={styles.header}>
      <View style={styles.brand}>
        <Text style={styles.brandName}>
          Alerta<Text style={styles.brandHighlight}>Med</Text>
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onPressBell}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Notificações"
        >
          <Feather
            name="bell"
            size={23}
            color={colors.text}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={onPressSettings}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Configurações"
        >
          <Feather
            name="settings"
            size={23}
            color={colors.text}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },

  brand: {
    flex: 1,
    justifyContent: 'center',
  },

  brandName: {
    fontSize: typography.size.lg + 2,
    fontWeight: '700',
    color: colors.text,
    lineHeight: typography.size.lg + 8,
  },

  brandHighlight: {
    color: colors.primary,
  },

  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },

  actionButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: colors.text,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 2,
  },
});