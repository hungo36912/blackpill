import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../theme/colors';
import radius from '../theme/radius';
import spacing from '../theme/spacing';
import typography from '../theme/typography';

export default function EmptyCard({ message, children }) {
  return (
    <View style={styles.card}>
      <Text style={styles.message}>{message}</Text>

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius['2xl'] + 2,
    paddingVertical: spacing['3xl'] - 2,
    paddingHorizontal: spacing.xl + 2,
    alignItems: 'center',
    gap: spacing.lg + 2,
    marginBottom: spacing.xl + spacing.sm,

    shadowColor: colors.text,
    shadowOpacity: 0.05,
    shadowRadius: 16,
    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 2,
  },

  message: {
    fontSize: typography.size.md,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: typography.lineHeight.caption + 2,
  },
});
