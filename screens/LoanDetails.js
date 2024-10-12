import React from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const LoanDetailsScreen = ({ route, navigation }) => {
  const { loan } = route.params;

  const renderRepayment = ({ item }) => (
    <View style={styles.repaymentCard}>
      <Text style={styles.repaymentText}>{`Week ${item.week}`}</Text>
      <Text style={styles.repaymentText}>{`Amount: $${item.amount}`}</Text>
      <Text style={styles.repaymentStatus}>{`Status: ${item.status}`}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Loan Details</Text>

      <View style={styles.loanDetailsContainer}>
        <Text style={styles.loanText}>{`Loan Amount: $${loan.amount}`}</Text>
        <Text style={styles.loanText}>{`Loan Term: ${loan.term} weeks`}</Text>
        <Text style={styles.loanStatus}>{`Loan Status: ${loan.status}`}</Text>
      </View>

      <Text style={styles.sectionTitle}>Repayment Schedule</Text>

      <FlatList
        data={loan.repayments}
        renderItem={renderRepayment}
        keyExtractor={(item) => item.week.toString()}
        contentContainerStyle={styles.flatListContainer}
      />

      <TouchableOpacity
        style={styles.repaymentButton}
        onPress={() => navigation.navigate('Repayment', { loan })}
      >
        <Text style={styles.buttonText}>Make Repayment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  loanDetailsContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 20,
  },
  loanText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  loanStatus: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  flatListContainer: {
    paddingBottom: 20,
  },
  repaymentCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  repaymentText: {
    fontSize: 16,
    color: '#333',
  },
  repaymentStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 5,
  },
  repaymentButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LoanDetailsScreen;
