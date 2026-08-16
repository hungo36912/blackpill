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
            source={require('../assets/logo.png')}
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
            placeholderTextColor="#A0A0A0"
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
    backgroundColor: '#F5F5F5',
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
    color: '#000000',
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
    backgroundColor: '#FFFFFF',
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
    color: '#000000',
    marginBottom: 15,
  },

  description: {
    fontSize: 14,
    color: '#555555',
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
    color: '#000000',
    marginBottom: 8,
  },

  input: {
    height: 50,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 20,
    fontSize: 15,
    color: '#333333',
    backgroundColor: '#FAFAFA',
    marginBottom: 15,
  },

  button: {
    backgroundColor: '#6FA47F',
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  alertBox: {
    backgroundColor: '#B8D4C1',
    width: '100%',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginBottom: 40,
  },

  alertTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2E4A37',
    marginBottom: 4,
  },

  alertDescription: {
    fontSize: 13,
    color: '#2E4A37',
    textAlign: 'center',
    lineHeight: 18,
  },

  outlineButton: {
    width: '100%',
    height: 45,
    borderColor: '#A0A0A0',
    borderWidth: 1,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFAFA',
  },

  outlineButtonText: {
    color: '#6FA47F',
    fontSize: 14,
    fontWeight: '500',
  },
});