import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import colors from '../theme/colors';
import radius from '../theme/radius';
import spacing from '../theme/spacing';
import typography from '../theme/typography';

export default function TipCard({ text }) {
  return (
    <View style={styles.card}>
      <View style={styles.icon}>
        <Feather
          name="info"
          size={18}
          color={colors.primary}
        />
      </View>

      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    borderRadius: radius.lg,
    padding: spacing.lg - 2,
  },

  icon: {
    marginRight: spacing.md - 2,
  },

  text: {
    flex: 1,
    fontSize: typography.size.sm - 1,
    lineHeight: 19,
    color: colors.textSecondary,
  },
});
