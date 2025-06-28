import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Alert, 
  Image,
  Switch
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import AppAvatar from '../../components/AppAvatar';
import ProfileHeader from '../../components/ProfileHeader';
import ProfileOption from '../../components/ProfileOption';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

interface Child {
  id: string;
  name: string;
  age: number;
  school?: string;
  avatar?: string;
}

interface UserProfile {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  avatar?: string;
  rating: number;
  totalRides: number;
  children: Child[];
  preferences: {
    notifications: boolean;
    darkMode: boolean;
    language: string;
  };
}

const ClientProfileScreen: React.FC = () => {
  const { logout, user } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Mock данные профиля
  useEffect(() => {
    const mockProfile: UserProfile = {
      id: '1',
      name: 'Анна',
      surname: 'Иванова',
      email: 'anna.ivanova@email.com',
      phone: '+7 (999) 123-45-67',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      rating: 4.8,
      totalRides: 47,
      children: [
        {
          id: '1',
          name: 'Мария',
          age: 8,
          school: 'Школа №123',
          avatar: 'https://randomuser.me/api/portraits/women/10.jpg'
        },
        {
          id: '2',
          name: 'Дмитрий',
          age: 12,
          school: 'Школа №123',
          avatar: 'https://randomuser.me/api/portraits/men/10.jpg'
        }
      ],
      preferences: {
        notifications: true,
        darkMode: isDark,
        language: 'ru'
      }
    };
    setProfile(mockProfile);
  }, [isDark]);

  const handleLogout = () => {
    Alert.alert(
      'Выход',
      'Вы уверены, что хотите выйти?',
      [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Выйти', onPress: logout, style: 'destructive' }
      ]
    );
  };

  const handleToggleNotifications = () => {
    if (profile) {
      setProfile({
        ...profile,
        preferences: {
          ...profile.preferences,
          notifications: !profile.preferences.notifications
        }
      });
    }
  };

  const handleToggleDarkMode = () => {
    toggleTheme();
    if (profile) {
      setProfile({
        ...profile,
        preferences: {
          ...profile.preferences,
          darkMode: !profile.preferences.darkMode
        }
      });
    }
  };

  const handleAddChild = () => {
    Alert.alert('Добавить ребенка', 'Функция добавления ребенка будет доступна в следующем обновлении');
  };

  const handleEditProfile = () => {
    Alert.alert('Редактировать профиль', 'Функция редактирования профиля будет доступна в следующем обновлении');
  };

  const handlePaymentSettings = () => {
    Alert.alert('Настройки оплаты', 'Функция настроек оплаты будет доступна в следующем обновлении');
  };

  const handleSupport = () => {
    Alert.alert('Поддержка', 'Функция поддержки будет доступна в следующем обновлении');
  };

  if (!profile) {
    return (
      <View style={[styles.container, { backgroundColor: isDark ? '#000' : '#f5f5f5' }]}>
        <Text style={[styles.loadingText, { color: isDark ? '#fff' : '#000' }]}>
          Загрузка профиля...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ProfileHeader name={`${profile.name} ${profile.surname}`} phone={profile.phone} color="#27ae60" />
      <ProfileOption icon={<Ionicons name="wallet-outline" size={22} color="#27ae60" />} label="Мой баланс" value="0 AZN" />
      <ProfileOption icon={<Ionicons name="card-outline" size={22} color="#007AFF" />} label="Карты" />
      <ProfileOption icon={<MaterialIcons name="directions-car" size={22} color="#8e44ad" />} label="Автомобили" />
      <ProfileOption icon={<Ionicons name="settings-outline" size={22} color="#636e72" />} label="Настройки" />
      <ProfileOption icon={<Ionicons name="help-circle-outline" size={22} color="#FF9500" />} label="Помощь и правила" />
      <ProfileOption icon={<Ionicons name="log-out-outline" size={22} color="#FF3B30" />} label="Выйти" onPress={handleLogout} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
  },
});

export default ClientProfileScreen;
