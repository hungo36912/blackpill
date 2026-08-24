import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../theme/colors';
import spacing from '../theme/spacing';
import typography from '../theme/typography';

type Tab = 'inicio' | 'agenda' | 'medicamentos' | 'perfil';

type BottomNavBarProps = {
  activeTab: Tab;
  onHome: () => void;
  onAgenda: () => void;
  onMedicamentos: () => void;
  onPerfil: () => void;
};

export default function BottomNavBar({
  activeTab,
  onHome,
  onAgenda,
  onMedicamentos,
  onPerfil,
}: BottomNavBarProps) {
  const tabs = [
    {
      key: 'inicio' as Tab,
      label: 'Início',
      icon: 'home-outline' as const,
      activeIcon: 'home' as const,
      onPress: onHome,
    },
    {
      key: 'agenda' as Tab,
      label: 'Agenda',
      icon: 'calendar-outline' as const,
      activeIcon: 'calendar' as const,
      onPress: onAgenda,
    },
    {
      key: 'medicamentos' as Tab,
      label: 'Medicamentos',
      icon: 'medkit-outline' as const,
      activeIcon: 'medkit' as const,
      onPress: onMedicamentos,
    },
    {
      key: 'perfil' as Tab,
      label: 'Perfil',
      icon: 'person-outline' as const,
      activeIcon: 'person' as const,
      onPress: onPerfil,
    },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const active = activeTab === tab.key;

        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tab}
            onPress={tab.onPress}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel={`Abrir ${tab.label}`}
            accessibilityState={{ selected: active }}
          >
            <View
              style={[
                styles.iconContainer,
                active && styles.iconContainerActive,
              ]}
            >
              <Ionicons
                name={active ? tab.activeIcon : tab.icon}
                size={25}
                color={
                  active
                    ? colors.primary
                    : colors.textSecondary
                }
              />
            </View>

            <Text
              style={[
                styles.label,
                active && styles.labelActive,
              ]}
              numberOfLines={1}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 82,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: spacing.xs,
    paddingTop: spacing.xs,
    paddingBottom: spacing.sm,

    shadowColor: colors.text,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    elevation: 8,
  },

  tab: {
    flex: 1,
    minHeight: 64,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xs,
  },

  iconContainer: {
    width: 42,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    marginBottom: spacing.xs,
  },

  iconContainerActive: {
    backgroundColor: colors.primaryLight,
  },

  label: {
    fontSize: typography.size.sm,
    lineHeight: typography.size.sm + 5,
    color: colors.textSecondary,
    fontWeight: '500',
    textAlign: 'center',
  },

  labelActive: {
    color: colors.primary,
    fontWeight: '700',
  },
});