import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DriverProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Профиль водителя</Text>
      <Text style={styles.subtitle}>
        Информация о вашем аккаунте
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default DriverProfileScreen;
