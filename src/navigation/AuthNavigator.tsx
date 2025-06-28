import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RoleSelectScreen from '../screens/auth/RoleSelectScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import ClientRegisterScreen from '../screens/auth/ClientRegisterScreen';
import DriverRegisterScreen from '../screens/auth/DriverRegisterScreen';

export type AuthStackParamList = {
  RoleSelect: undefined;
  Login: undefined;
  ClientRegister: undefined;
  DriverRegister: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="RoleSelect"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="RoleSelect" component={RoleSelectScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ClientRegister" component={ClientRegisterScreen} />
      <Stack.Screen name="DriverRegister" component={DriverRegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
