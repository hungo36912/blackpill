import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../theme/colors';

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
    borderRadius: 18,
    padding: 18,
    marginBottom: 20,
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  item: {
    width: '50%',
    marginBottom: 16,
  },

  label: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },

  value: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },

  danger: {
    color: colors.danger,
  },
});