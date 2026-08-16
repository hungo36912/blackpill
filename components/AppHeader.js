import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import colors from '../theme/colors';

export default function AppHeader({ onPressBell }) {
  return (
    <View style={styles.header}>
      <View style={styles.brand}>
        <View style={styles.brandIcon}>
          <Feather name="clock" size={20} color={colors.card} />
        </View>

        <Text style={styles.brandName}>
          Alerta<Text style={styles.brandHighlight}>Med</Text>
        </Text>
      </View>

      <TouchableOpacity
        style={styles.bell}
        onPress={onPressBell}
        activeOpacity={0.7}
      >
        <Feather
          name="bell"
          size={18}
          color={colors.text}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  brandIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  brandName: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },

  brandHighlight: {
    color: colors.primary,
  },

  bell: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: colors.text,
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 1,
  },
});