import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../theme/colors';

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
          >
            <Ionicons
              name={active ? tab.activeIcon : tab.icon}
              size={23}
              color={active ? colors.primary : colors.textSecondary}
            />

            <Text
              style={[
                styles.label,
                active && styles.labelActive,
              ]}
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
    height: 72,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',

    paddingBottom: 6,

    shadowColor: '#000',
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
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },

  label: {
    fontSize: 11,
    color: colors.textSecondary,
  },

  labelActive: {
    color: colors.primary,
    fontWeight: '700',
  },
});