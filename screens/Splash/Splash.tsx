import React, { useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import colors from "../../theme/colors";

const { width, height } = Dimensions.get("window");

type SplashProps = {
  onFinish: () => void;
};

export default function Splash({ onFinish }: SplashProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/splash/splash.png")}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.card,
  },

  image: {
    width: width,
    height: height,
  },
});
