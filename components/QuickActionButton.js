import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
} from 'react-native';

import colors from '../theme/colors';
import radius from '../theme/radius';
import spacing from '../theme/spacing';
import typography from '../theme/typography';

export default function QuickActionButton({
  icon,
  label,
  onPress,
  variant = 'light',
}) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.75}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <View
        style={[
          styles.iconCircle,
          variant === 'add'
            ? styles.iconCircleAdd
            : styles.iconCircleLight,
        ]}
      >
        {icon}
      </View>

      <Text style={styles.label}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    minHeight: 112,

    backgroundColor: colors.card,

    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.xl + 2,

    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md - 2,

    alignItems: 'center',
    justifyContent: 'center',

    gap: spacing.md - 2,

    shadowColor: colors.text,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 2,
  },

  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,

    alignItems: 'center',
    justifyContent: 'center',
  },

  iconCircleAdd: {
    backgroundColor: colors.primary,
  },

  iconCircleLight: {
    backgroundColor: colors.primaryLight,
  },

  label: {
    fontSize: typography.size.sm,
    fontWeight: '600',
    color: colors.text,

    textAlign: 'center',
    lineHeight: 19,
  },
});
