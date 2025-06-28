import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { lightColors, darkColors } from '../../constants/colors';
import { useAuth } from '../../context/AuthContext';
import InputField from '../../components/InputField';
import Button from '../../components/Button';

const ClientRegisterScreen = ({ navigation }: any) => {
  const { theme } = useTheme();
  const colors = theme === 'dark' ? darkColors : lightColors;
  const { register, loading } = useAuth();
  const [form, setForm] = useState({
    name: '',
    surname: '',
    email: '',
    address: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleRegister = async () => {
    if (!form.name || !form.surname || !form.email || !form.address || !form.password) {
      setError('Заполните все поля');
      return;
    }
    setError('');
    try {
      await register({
        ...form,
        role: 'client',
      });
    } catch (e) {
      setError('Ошибка регистрации');
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={{ padding: 24 }}>
      <Text style={[styles.title, { color: colors.text }]}>Регистрация клиента</Text>
      <InputField label="Имя" value={form.name} onChangeText={v => handleChange('name', v)} />
      <InputField label="Фамилия" value={form.surname} onChangeText={v => handleChange('surname', v)} />
      <InputField label="Email" value={form.email} onChangeText={v => handleChange('email', v)} keyboardType="email-address" autoCapitalize="none" />
      <InputField label="Адрес проживания" value={form.address} onChangeText={v => handleChange('address', v)} />
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

export default ClientRegisterScreen;
