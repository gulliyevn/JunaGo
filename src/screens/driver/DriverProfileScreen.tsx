import React from 'react';
import { ScrollView, View, StyleSheet, Alert } from 'react-native';
import ProfileHeader from '../../components/ProfileHeader';
import ProfileOption from '../../components/ProfileOption';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';

const DriverProfileScreen: React.FC = () => {
  const { logout } = useAuth();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ProfileHeader name="Александр Петров" phone="+7 (999) 123-45-67" color="#007AFF" />
      <ProfileOption icon={<Ionicons name="wallet-outline" size={22} color="#34C759" />} label="Мой баланс" value="12 000 ₽" />
      <ProfileOption icon={<MaterialIcons name="directions-car" size={22} color="#8e44ad" />} label="Автомобили" />
      <ProfileOption icon={<FontAwesome name="file-text-o" size={22} color="#636e72" />} label="Документы" />
      <ProfileOption icon={<Ionicons name="settings-outline" size={22} color="#636e72" />} label="Настройки" />
      <ProfileOption icon={<Ionicons name="help-circle-outline" size={22} color="#FF9500" />} label="Помощь и правила" />
      <ProfileOption icon={<Ionicons name="log-out-outline" size={22} color="#FF3B30" />} label="Выйти" onPress={() => Alert.alert('Выход', 'Выйти из аккаунта?', [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Выйти', onPress: logout, style: 'destructive' },
      ])} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
});

export default DriverProfileScreen; 