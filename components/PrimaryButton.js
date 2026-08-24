import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import colors from '../theme/colors';
import radius from '../theme/radius';
import spacing from '../theme/spacing';
import typography from '../theme/typography';

export default function PrimaryButton({
  label,
  onPress,
  icon,
  variant = 'block',
}) {
  return (
    <TouchableOpacity
      style={[
        styles.base,
        variant === 'pill' ? styles.pill : styles.block,
      ]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      {icon && (
        <Feather
          name={icon}
          size={20}
          color={colors.card}
          style={styles.icon}
        />
      )}

      <Text style={styles.label}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: colors.primary,
    shadowOpacity: 0.28,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 3,
  },

  block: {
    width: '100%',
    minHeight: 56,
    borderRadius: radius.lg,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
  },

  pill: {
    minHeight: 52,
    borderRadius: radius.pill,
    paddingVertical: spacing.lg - 2,
    paddingHorizontal: spacing.xl + spacing.sm,
    alignSelf: 'center',
  },

  icon: {
    marginRight: spacing.md - 2,
  },

  label: {
    color: colors.card,
    fontSize: typography.size.md,
    fontWeight: typography.weight.bold,
  },
});
