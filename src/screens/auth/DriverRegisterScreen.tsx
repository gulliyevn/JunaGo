import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { lightColors, darkColors } from '../../constants/colors';
import { useAuth } from '../../context/AuthContext';
import InputField from '../../components/InputField';
import Button from '../../components/Button';

const DriverRegisterScreen = ({ navigation }: any) => {
  const { theme } = useTheme();
  const colors = theme === 'dark' ? darkColors : lightColors;
  const { register, loading } = useAuth();
  const [form, setForm] = useState({
    name: '',
    surname: '',
    email: '',
    address: '',
    car: '',
    carInfo: '',
    clientsPerDay: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleRegister = async () => {
    if (!form.name || !form.surname || !form.email || !form.address || !form.car || !form.carInfo || !form.clientsPerDay || !form.password) {
      setError('Заполните все поля');
      return;
    }
    setError('');
    try {
      await register({
        name: form.name,
        surname: form.surname,
        email: form.email,
        address: form.address,
        car: form.car,
        carInfo: form.carInfo,
        clientsPerDay: Number(form.clientsPerDay),
        password: form.password,
        role: 'driver',
      });
    } catch (e) {
      setError('Ошибка регистрации');
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={{ padding: 24 }}>
      <Text style={[styles.title, { color: colors.text }]}>Регистрация водителя</Text>
      <InputField label="Имя" value={form.name} onChangeText={v => handleChange('name', v)} />
      <InputField label="Фамилия" value={form.surname} onChangeText={v => handleChange('surname', v)} />
      <InputField label="Email" value={form.email} onChangeText={v => handleChange('email', v)} keyboardType="email-address" autoCapitalize="none" />
      <InputField label="Адрес проживания" value={form.address} onChangeText={v => handleChange('address', v)} />
      <InputField label="Марка и модель машины" value={form.car} onChangeText={v => handleChange('car', v)} />
      <InputField label="Данные машины (номер, цвет)" value={form.carInfo} onChangeText={v => handleChange('carInfo', v)} />
      <InputField label="Сколько клиентов в день хотите брать (1-5)" value={form.clientsPerDay} onChangeText={v => handleChange('clientsPerDay', v)} keyboardType="numeric" />
      <InputField label="Пароль" value={form.password} onChangeText={v => handleChange('password', v)} secureTextEntry />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button 
        title={loading ? "Регистрация..." : "Зарегистрироваться"} 
        onPress={handleRegister} 
        disabled={loading}
      />
      {loading && <ActivityIndicator style={styles.loader} color={colors.primary} />}
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.linkBtn}>
        <Text style={[styles.link, { color: colors.primary }]}>Уже есть аккаунт? Войти</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
  },
  error: {
    color: '#ef4444',
    marginBottom: 12,
    textAlign: 'center',
  },
  linkBtn: {
    marginTop: 24,
    alignItems: 'center',
  },
  link: {
    fontSize: 16,
    fontWeight: '500',
  },
  loader: {
    marginTop: 16,
  },
});

export default DriverRegisterScreen;
