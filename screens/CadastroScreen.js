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

export default function CadastroScreen({ onVoltarLogin, onCadastrar }) {
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

        <Text style={styles.welcomeText}>Bem-Vindo</Text>
      </View>

      <View style={styles.cardContainer}>
        <Text style={styles.registerTitle}>Cadastro</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome Completo"
          placeholderTextColor="#A0A0A0"
          value={nome}
          onChangeText={setNome}
        />

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

        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={[
              styles.checkbox,
              aceitouTermos && styles.checkboxChecked,
            ]}
            onPress={() => setAceitouTermos(!aceitouTermos)}
          >
            {aceitouTermos && <View style={styles.checkboxCheck} />}
          </TouchableOpacity>

          <Text style={styles.checkboxLabel}>
            Li e concordo com os{' '}
            <Text style={styles.linkText}>Termos de Uso</Text>
            {' '}e a{' '}
            <Text style={styles.linkText}>
              Política de Privacidade.
            </Text>
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={onCadastrar}
        >
          <Text style={styles.buttonText}>Cadastrar</Text>
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

  registerTitle: {
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
    borderColor: '#A0A0A0',
    marginTop: 2,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },

  checkboxChecked: {
    borderColor: '#6FA47F',
  },

  checkboxCheck: {
    width: 10,
    height: 10,
    borderRadius: 2,
    backgroundColor: '#6FA47F',
  },

  checkboxLabel: {
    flex: 1,
    fontSize: 11,
    color: '#555555',
    lineHeight: 15,
    fontWeight: '600',
  },

  linkText: {
    color: '#6FA47F',
    textDecorationLine: 'underline',
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

  loginText: {
    color: '#6FA47F',
    fontWeight: 'bold',
  },
});