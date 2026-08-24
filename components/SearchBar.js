import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import colors from '../theme/colors';
import radius from '../theme/radius';
import spacing from '../theme/spacing';
import typography from '../theme/typography';

export default function SearchBar({ value, onChangeText }) {
  return (
    <View style={styles.container}>
      <Feather
        name="search"
        size={20}
        color={colors.textSecondary}
      />

      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder="Buscar medicamento"
        placeholderTextColor={colors.placeholder}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 48,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },

  input: {
    flex: 1,
    marginLeft: spacing.md,
    fontSize: typography.size.sm,
    color: colors.text,
  },
});
