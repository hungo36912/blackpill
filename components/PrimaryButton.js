import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import colors from '../theme/colors';

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
          size={15}
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
    borderRadius: 14,
    paddingVertical: 15,
  },

  pill: {
    borderRadius: 999,
    paddingVertical: 14,
    paddingHorizontal: 28,
    alignSelf: 'center',
  },

  icon: {
    marginRight: 8,
  },

  label: {
    color: colors.card,
    fontSize: 14.5,
    fontWeight: '700',
  },
});