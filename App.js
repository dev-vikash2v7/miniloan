import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoanRequestScreen from './screens/LoanScreen';
import LoanDetailsScreen from './screens/LoanDetails';
import RepaymentScreen from './screens/Repayment';
import AdminScreen from './screens/AdminScreen';
import Auth from './screens/Auth';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Authentication"
        screenOptions={{
      // headerShown: true,            // Keep the header shown (you can hide it if needed)
      headerLeft: () => null,       // Disable the back button
      gestureEnabled: false         // Disable the back gesture
    }}
      >
      <Stack.Screen
      name="Authentication"
      component={Auth}
      options={{ title: 'Login' }} 
    />
    <Stack.Screen
      name="LoanRequest"
      component={LoanRequestScreen}
      options={{ title: 'Request a Loan' }} 
    />
    <Stack.Screen
      name="LoanDetails"
      component={LoanDetailsScreen}
      options={{ title: 'Loan Details' }} 
    />
    <Stack.Screen
      name="Repayment"
      component={RepaymentScreen}
      options={{ title: 'Submit Repayment' }} 
    />
    <Stack.Screen
      name="Admin"
      component={AdminScreen}
      options={{ title: 'Admin Panel' }}
    />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
