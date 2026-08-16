import React from 'react';
import { View, StyleSheet } from 'react-native';
import QuickActionButton from './QuickActionButton';

export default function QuickActionsGrid({ actions }) {
  return (
    <View style={styles.grid}>
      {actions.map((action) => (
        <QuickActionButton
          key={action.key}
          icon={action.icon}
          label={action.label}
          variant={action.variant}
          onPress={action.onPress}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 10,
  },
});