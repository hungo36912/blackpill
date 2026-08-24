import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../theme/colors';
import radius from '../theme/radius';
import spacing from '../theme/spacing';
import typography from '../theme/typography';

export default function InfoCard({ title, items = [] }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.grid}>
        {items.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.label}>{item.label}</Text>

            <Text
              style={[
                styles.value,
                item.danger && styles.danger,
              ]}
            >
              {item.value}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.xl + 2,
    padding: spacing.lg + 2,
    marginBottom: spacing.xl,
  },

  title: {
    fontSize: typography.size.md,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.lg,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  item: {
    width: '50%',
    marginBottom: spacing.lg,
  },

  label: {
    fontSize: typography.size.xs,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },

  value: {
    fontSize: typography.size.sm,
    fontWeight: '600',
    color: colors.text,
  },

  danger: {
    color: colors.danger,
  },
});
