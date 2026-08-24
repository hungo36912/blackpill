import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../theme/colors';
import radius from '../theme/radius';
import spacing from '../theme/spacing';
import typography from '../theme/typography';

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
    borderRadius: radius.xl,
    padding: spacing.lg,
    alignItems: 'flex-start',
  },

  icon: {
    width: 28,
    height: 28,
    borderRadius: radius.lg,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md - 2,
  },

  content: {
    flex: 1,
  },

  title: {
    fontSize: typography.size.sm,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: spacing.xs + 1,
  },

  text: {
    fontSize: typography.size.sm - 1,
    lineHeight: 19,
    color: colors.textSecondary,
  },

  centered: {
    textAlign: 'center',
  },
});
