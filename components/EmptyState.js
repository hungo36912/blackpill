import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import PrimaryButton from './PrimaryButton';
import colors from '../theme/colors';

export default function EmptyState({
  image,
  text,
  buttonLabel,
  onPress,
}) {
  return (
    <View style={styles.container}>
      {image && (
        <Image
          source={image}
          style={styles.image}
          resizeMode="contain"
        />
      )}

      <Text style={styles.text}>{text}</Text>

      {buttonLabel && (
        <PrimaryButton
          label={buttonLabel}
          onPress={onPress}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
  },

  image: {
    width: 150,
    height: 150,
    marginBottom: 18,
  },

  text: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 18,
  },
});