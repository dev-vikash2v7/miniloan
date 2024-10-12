import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const AdminScreen = () => {
  const [loan, setLoan] = useState(null);

  useEffect(() => {
    const loadLoan = async () => {
      const storedLoan = await SecureStore.getItemAsync('loan');
      setLoan(storedLoan ? JSON.parse(storedLoan) : null);
    };
    loadLoan();
  }, []);

  const approveLoan = async () => {
    if (loan) {
      const updatedLoan = { ...loan, status: 'APPROVED' };
      await SecureStore.setItemAsync('loan', JSON.stringify(updatedLoan));
      setLoan(updatedLoan);
    }
  };

  if (!loan) return <Text>No loan to approve.</Text>;

  return (
    <View style={styles.container}>
      <Text>{`Loan Amount: $${loan.amount}`}</Text>
      <Text>{`Loan Term: ${loan.term} weeks`}</Text>
      <Text>{`Loan Status: ${loan.status}`}</Text>
      {loan.status === 'PENDING' && (
        <Button title="Approve Loan" onPress={approveLoan} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 }
});

export default AdminScreen;
