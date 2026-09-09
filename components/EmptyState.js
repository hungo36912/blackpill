import React from 'react';

import { View, Text, Image, StyleSheet } from 'react-native';

import PrimaryButton from './PrimaryButton';

import colors from '../theme/colors';

import spacing from '../theme/spacing';

import typography from '../theme/typography';

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

    paddingVertical: spacing['3xl'] - 2,

  },

  image: {

    width: 190,

    height: 190,

    marginBottom: spacing.lg + 2,

  },

  text: {

    fontSize: typography.size.sm + 1,

    color: colors.textSecondary,

    textAlign: 'center',

    marginBottom: spacing.lg + 2,

  },

});
