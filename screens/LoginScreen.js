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

export default function LoginScreen({
  onAbrirCadastro,
  onAbrirRecuperacao,
  onEntrar,
}) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

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

        <Text style={styles.welcomeText}>Bem-Vindo</Text>
      </View>

      <View style={styles.cardContainer}>
        <Text style={styles.loginTitle}>Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#A0A0A0"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#A0A0A0"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.forgotPasswordButton}
          onPress={onAbrirRecuperacao}
        >
          <Text style={styles.forgotPasswordText}>
            Esqueci minha senha
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={onEntrar}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>
          Não tem uma conta?{' '}
          <Text
            style={styles.signUpText}
            onPress={onAbrirCadastro}
          >
            Cadastre-se
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  headerBackground: {
    backgroundColor: '#6FA47F',
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
    backgroundColor: '#FFFFFF',
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
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    transform: [{ scaleX: 1 / 1.2 }],
  },

  cardContainer: {
    backgroundColor: '#FFFFFF',
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

  loginTitle: {
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
    color: '#000000',
    marginBottom: 20,
  },

  input: {
    height: 50,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#333333',
    backgroundColor: '#FAFAFA',
    marginBottom: 15,
  },

  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: 25,
  },

  forgotPasswordText: {
    color: '#6FA47F',
    fontSize: 14,
    fontWeight: '500',
  },

  button: {
    backgroundColor: '#6FA47F',
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
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
    color: '#000000',
  },

  signUpText: {
    color: '#6FA47F',
    fontWeight: 'bold',
  },
});