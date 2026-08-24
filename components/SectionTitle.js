import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import colors from '../theme/colors';
import spacing from '../theme/spacing';
import typography from '../theme/typography';

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
    marginBottom: spacing.lg,
    minHeight: spacing['2xl'],
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
  },

  title: {
    fontSize: typography.size.lg,
    fontWeight: '700',
    color: colors.text,
  },

  seeAllButton: {
    backgroundColor: colors.primaryLight,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: 999,
    minHeight: spacing['2xl'],
    justifyContent: 'center',
  },

  seeAllLabel: {
    fontSize: typography.size.sm,
    fontWeight: '700',
    color: colors.primary,
  },
});