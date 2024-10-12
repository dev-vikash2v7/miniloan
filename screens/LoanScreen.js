import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import {serverUrl} from './constants'

const LoanRequestScreen = ({ navigation }) => {
  const [amount, setAmount] = useState('');
  const [term, setTerm] = useState('');

  const submitLoanRequest = async () => {
    const response = await fetch(`${serverUrl}/loans`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount, term }),
    });

    const loan = await response.json();
    navigation.navigate('LoanDetails', { loan });
  };

  return (
    <View style={styles.container}>
      <Text>Loan Amount ($) :</Text>
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        placeholder="Enter loan amount"
        keyboardType="numeric"
      />
      <Text>Loan Term (weeks):</Text>
      <TextInput
        style={styles.input}
        value={term}
        onChangeText={setTerm}
        placeholder="Enter loan term"
        keyboardType="numeric"
      />
      <Button title="Submit Loan Request" onPress={submitLoanRequest} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 1, padding: 10, marginVertical: 10 },
});

export default LoanRequestScreen;
