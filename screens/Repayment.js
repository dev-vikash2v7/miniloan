import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import {serverUrl} from './constants'

const RepaymentScreen = ({ route, navigation }) => {
  const [repaymentAmount, setRepaymentAmount] = useState('');
  const { loan } = route.params;

  const submitRepayment = async () => {
    const response = await fetch(serverUrl +  `/loans/${loan._id}/repay`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: repaymentAmount }),
    });

    const updatedLoan = await response.json();
    console.log(updatedLoan)
    navigation.navigate('LoanDetails', { loan: updatedLoan });
  };

  return (
    <View style={styles.container}>
      <Text>Repayment Amount:</Text>
      <TextInput
        style={styles.input}
        value={repaymentAmount}
        onChangeText={setRepaymentAmount}
        keyboardType="numeric"
      />
      <Button title="Submit Repayment" onPress={submitRepayment} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 1, padding: 10, marginVertical: 10 },
});

export default RepaymentScreen;
