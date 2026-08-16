import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../theme/colors';

export default function NoteCard({
  icon,
  title,
  text,
  centered = false,
}) {
  return (
    <View style={styles.card}>
      {icon && <View style={styles.icon}>{icon}</View>}

      <View style={styles.content}>
        {title && (
          <Text style={styles.title}>{title}</Text>
        )}

        <Text
          style={[
            styles.text,
            centered && styles.centered,
          ]}
        >
          {text}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.primaryLight,
    borderRadius: 16,
    padding: 16,
    alignItems: 'flex-start',
  },

  icon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  content: {
    flex: 1,
  },

  title: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 5,
  },

  text: {
    fontSize: 13,
    lineHeight: 19,
    color: colors.textSecondary,
  },

  centered: {
    textAlign: 'center',
  },
});