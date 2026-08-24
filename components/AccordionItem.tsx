import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../theme/colors';
import radius from '../theme/radius';
import spacing from '../theme/spacing';

type AccordionItemProps = {
  icon?: React.ComponentProps<typeof Ionicons>['name'];
  titulo: string;
  texto: string;
  aberto?: boolean;
};

export default function AccordionItem({
  icon,
  titulo,
  texto,
  aberto = false,
}: AccordionItemProps) {
  const [expandido, setExpandido] = useState<boolean>(aberto);

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setExpandido(!expandido)}
      >
        {icon && (
          <View style={styles.iconCircle}>
            <Ionicons
              name={icon}
              size={20}
              color={colors.primary}
            />
          </View>
        )}

        <View style={styles.headerTextos}>
          <Text style={styles.titulo}>{titulo}</Text>

          {expandido && (
            <Text style={styles.texto}>{texto}</Text>
          )}
        </View>

        <Ionicons
          name={expandido ? 'chevron-up' : 'chevron-down'}
          size={18}
          color={colors.textSecondary}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    marginBottom: spacing.md,
    padding: spacing.lg,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: radius['2xl'],
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },

  headerTextos: {
    flex: 1,
  },

  titulo: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primary,
  },

  texto: {
    fontSize: 13.5,
    color: colors.textSecondary,
    marginTop: 6,
    lineHeight: 19,
  },
});
