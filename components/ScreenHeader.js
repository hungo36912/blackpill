import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import colors from '../theme/colors';

export default function ScreenHeader({ title, onBack, centered }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.back}
        onPress={onBack}
        activeOpacity={0.7}
      >
        <Feather
          name="arrow-left"
          size={22}
          color={colors.text}
        />
      </TouchableOpacity>

      <Text
        style={[
          styles.title,
          centered && styles.centeredTitle,
        ]}
      >
        {title}
      </Text>

      <View style={styles.rightSpace} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },

  back: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginLeft: 8,
  },

  centeredTitle: {
    textAlign: 'center',
    marginLeft: 0,
  },

  rightSpace: {
    width: 40,
  },
});