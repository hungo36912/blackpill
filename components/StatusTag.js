import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../theme/colors';
import radius from '../theme/radius';
import spacing from '../theme/spacing';
import typography from '../theme/typography';

export default function StatusTag({ label }) {
  return (
    <View style={styles.tag}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    paddingVertical: spacing.xs + 1,
    paddingHorizontal: spacing.md - 2,
    marginTop: spacing.sm,
  },

  text: {
    color: colors.card,
    fontSize: typography.size.xs - 1,
    fontWeight: '700',
  },
});
