import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import colors from "../theme/colors";
import spacing from "../theme/spacing";
import typography from "../theme/typography";

type Props = {
  title: string;
  onBack: () => void;
};

export default function PageHeader({
  title,
  onBack,
}: Props) {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={onBack}
        activeOpacity={0.7}
        style={styles.sideButton}
      >
        <Ionicons
          name="chevron-back"
          size={26}
          color={colors.text}
        />
      </TouchableOpacity>

      <Text style={styles.title}>
        {title}
      </Text>

      <View style={styles.sideButton} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg - 2,
  },

  sideButton: {
    width: 26,
    height: 26,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    flex: 1,
    textAlign: "center",
    fontSize: typography.size.xl,
    fontWeight: "700",
    color: colors.text,
  },
});
