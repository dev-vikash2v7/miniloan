import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { signUp, signIn } from '../utils/firebaseAuth';
import CustomAlert from './CustomAlert';  // Import custom alert component

const Auth = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleSignUp = async () => {
    try {
      await signUp(email, password, navigation);
    } catch (error) {
      console.log(error)
      setErrorMessage(error.message);
      setShowAlert(true); // Show the alert with the error message
    }
  };

  const handleSignIn = async () => {
    try {
      await signIn(email, password, navigation);
    } catch (error) {
      setErrorMessage(error.message);
      setShowAlert(true); // Show the alert with the error message
    }
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Loan App</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonSecondary} onPress={handleSignIn}>
        <Text style={styles.buttonTextSecondary}>Sign In</Text>
      </TouchableOpacity>

      {/* Custom alert for error messages */}
      <CustomAlert
        visible={showAlert}
        message={errorMessage}
        onClose={closeAlert}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonSecondary: {
    borderWidth: 2,
    borderColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonTextSecondary: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Auth;
