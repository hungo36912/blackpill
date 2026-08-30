import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import colors from '../../theme/colors';

export default function RecSenhaScreen({ onVoltarLogin }) {
  const [email, setEmail] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onVoltarLogin}
        >
          <Text style={styles.backButtonText}>‹</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.logoCircle}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
          />
        </View>

        <Text style={styles.title}>Recuperar senha</Text>

        <Text style={styles.description}>
          Digite o e-mail da sua conta que vamos enviar um link
          para redefinir sua senha.
        </Text>

        <View style={styles.form}>
          <Text style={styles.inputLabel}>Email:</Text>

          <TextInput
            style={styles.input}
            placeholder="Digite seu email"
            placeholderTextColor={colors.placeholder}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>
              Enviar link de recuperação
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.alertBox}>
          <Text style={styles.alertTitle}>
            Não recebeu o email?
          </Text>

          <Text style={styles.alertDescription}>
            Verifique sua caixa de SPAM ou tente novamente
          </Text>
        </View>

        <TouchableOpacity
          style={styles.outlineButton}
          onPress={onVoltarLogin}
        >
          <Text style={styles.outlineButtonText}>
            Voltar para o Login
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.authBackground,
  },

  headerBar: {
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  backButton: {
    padding: 5,
  },

  backButtonText: {
    fontSize: 32,
    fontWeight: '400',
    color: colors.authText,
  },

  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 20,
  },

  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },

  logo: {
    width: 140,
    height: 140,
    position: 'absolute',
    top: -10,
    left: -17,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.authText,
    marginBottom: 15,
  },

  description: {
    fontSize: 14,
    color: colors.authMuted,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 30,
  },

  form: {
    width: '100%',
    marginBottom: 25,
  },

  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.authText,
    marginBottom: 8,
  },

  input: {
    height: 50,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 20,
    fontSize: 15,
    color: colors.inputText,
    backgroundColor: colors.inputBackground,
    marginBottom: 15,
  },

  button: {
    backgroundColor: colors.authPrimary,
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },

  buttonText: {
    color: colors.card,
    fontSize: 16,
    fontWeight: 'bold',
  },

  alertBox: {
    backgroundColor: colors.authNotice,
    width: '100%',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginBottom: 40,
  },

  alertTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.authNoticeText,
    marginBottom: 4,
  },

  alertDescription: {
    fontSize: 13,
    color: colors.authNoticeText,
    textAlign: 'center',
    lineHeight: 18,
  },

  outlineButton: {
    width: '100%',
    height: 45,
    borderColor: colors.placeholder,
    borderWidth: 1,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.inputBackground,
  },

  outlineButtonText: {
    color: colors.authPrimary,
    fontSize: 14,
    fontWeight: '500',
  },
});
