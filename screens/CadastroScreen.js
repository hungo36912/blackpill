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
import colors from '../theme/colors';

export default function CadastroScreen({
  onVoltarLogin,
  onCadastrar,
  onAbrirTermos,
  onAbrirPrivacidade,
}) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [aceitouTermos, setAceitouTermos] = useState(false);

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.headerBackground}>

        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Image
              source={require('../assets/logo.png')}
              style={styles.logo}
            />
          </View>
        </View>

        <Text style={styles.welcomeText}>
          Bem-Vindo
        </Text>

      </View>

      <View style={styles.cardContainer}>

        <Text style={styles.registerTitle}>
          Cadastro
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nome Completo"
          placeholderTextColor={colors.placeholder}
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={colors.placeholder}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor={colors.placeholder}
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <View style={styles.checkboxContainer}>

          <TouchableOpacity
            style={[
              styles.checkbox,
              aceitouTermos && styles.checkboxChecked,
            ]}
            onPress={() => setAceitouTermos(!aceitouTermos)}
          >
            {aceitouTermos && (
              <View style={styles.checkboxCheck} />
            )}
          </TouchableOpacity>

          <Text style={styles.checkboxLabel}>
            Li e concordo com os{' '}

            <Text
              style={styles.linkText}
              onPress={onAbrirTermos}
            >
              Termos de Uso
            </Text>

            {' '}e a{' '}

            <Text
              style={styles.linkText}
              onPress={onAbrirPrivacidade}
            >
              Política de Privacidade
            </Text>

            .
          </Text>

        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={onCadastrar}
        >
          <Text style={styles.buttonText}>
            Cadastrar
          </Text>
        </TouchableOpacity>

      </View>

      <View style={styles.footerContainer}>

        <Text style={styles.footerText}>
          Já tem uma conta?{' '}

          <Text
            style={styles.loginText}
            onPress={onVoltarLogin}
          >
            Login
          </Text>
        </Text>

      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.authBackground,
  },

  headerBackground: {
    backgroundColor: colors.authPrimary,
    height: '45%',
    borderBottomLeftRadius: 180,
    borderBottomRightRadius: 180,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ scaleX: 1.2 }],
    paddingTop: 40,
  },

  logoContainer: {
    transform: [{ scaleX: 1 / 1.2 }],
  },

  logoCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },

  logo: {
    width: 140,
    height: 140,
    position: 'absolute',
    top: -15,
    left: -22,
  },

  welcomeText: {
    color: colors.card,
    fontSize: 28,
    fontWeight: 'bold',
    transform: [{ scaleX: 1 / 1.2 }],
  },

  cardContainer: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 25,
    marginHorizontal: 30,
    marginTop: -80,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },

  registerTitle: {
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
    color: colors.authText,
    marginBottom: 20,
  },

  input: {
    height: 50,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    color: colors.inputText,
    backgroundColor: colors.inputBackground,
    marginBottom: 15,
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    paddingHorizontal: 5,
  },

  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.placeholder,
    marginTop: 2,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.card,
  },

  checkboxChecked: {
    borderColor: colors.authPrimary,
  },

  checkboxCheck: {
    width: 10,
    height: 10,
    borderRadius: 2,
    backgroundColor: colors.authPrimary,
  },

  checkboxLabel: {
    flex: 1,
    fontSize: 11,
    color: colors.authMuted,
    lineHeight: 15,
    fontWeight: '600',
  },

  linkText: {
    color: colors.authPrimary,
    textDecorationLine: 'underline',
  },

  button: {
    backgroundColor: colors.authPrimary,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: colors.card,
    fontSize: 18,
    fontWeight: 'bold',
  },

  footerContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },

  footerText: {
    fontSize: 14,
    color: colors.authText,
  },

  loginText: {
    color: colors.authPrimary,
    fontWeight: 'bold',
  },
});
