import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import colors from '../theme/colors';

export default function MedicationSummary({
  image,
  name,
  form,
  size,
  children,
}) {
  return (
    <View style={styles.container}>
      {image && (
        <Image
          source={image}
          style={size === 'small' ? styles.imageSmall : styles.image}
          resizeMode="contain"
        />
      )}

      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>

        <Text style={styles.form}>{form}</Text>

        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  image: {
    width: 64,
    height: 64,
    marginRight: 14,
  },

  imageSmall: {
    width: 48,
    height: 48,
    marginRight: 12,
  },

  info: {
    flex: 1,
  },

  name: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },

  form: {
    fontSize: 13,
    color: colors.textSecondary,
  },
});