import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../theme/colors';

export default function SectionTitle({
  icon,
  title,
  onSeeAll,
  seeAllLabel = 'Ver todos',
}) {
  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        {icon}

        <Text style={styles.title}>
          {title}
        </Text>
      </View>

      {onSeeAll && (
        <TouchableOpacity
          style={styles.seeAllButton}
          onPress={onSeeAll}
          activeOpacity={0.7}
        >
          <Text style={styles.seeAllLabel}>
            {seeAllLabel}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },

  seeAllButton: {
    backgroundColor: colors.primaryLight,
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 999,
  },

  seeAllLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
});