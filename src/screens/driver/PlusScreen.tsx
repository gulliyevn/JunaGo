import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Alert,
  ScrollView
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const PlusScreen: React.FC = () => {
  const { logout } = useAuth();
  const { isDark } = useTheme();
  const [isOnline, setIsOnline] = useState(true);

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

  const handleToggleOnline = () => {
    setIsOnline(!isOnline);
    Alert.alert(
      isOnline ? 'Офлайн' : 'Онлайн',
      isOnline ? 'Вы перешли в офлайн режим' : 'Вы перешли в онлайн режим'
    );
  };

  const handleQuickActions = (action: string) => {
    Alert.alert(action, 'Функция будет доступна в следующем обновлении');
  };

  const quickActions = [
    { icon: '🚗', title: 'Изменить статус', action: 'Изменить статус', color: '#007AFF' },
    { icon: '📊', title: 'Статистика', action: 'Статистика', color: '#34C759' },
    { icon: '💰', title: 'Заработок', action: 'Заработок', color: '#FF9500' },
    { icon: '⚙️', title: 'Настройки', action: 'Настройки', color: '#8E8E93' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? '#000' : '#f5f5f5' }]}>
      {/* Заголовок */}
      <View style={[styles.header, { backgroundColor: isDark ? '#333' : '#fff' }]}>
        <Text style={[styles.headerTitle, { color: isDark ? '#fff' : '#000' }]}>
          Быстрые действия
        </Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Выйти</Text>
        </TouchableOpacity>
      </View>

      {/* Статус водителя */}
      <View style={[styles.statusContainer, { backgroundColor: isDark ? '#333' : '#fff' }]}>
        <View style={styles.statusInfo}>
          <View style={[styles.statusIndicator, { backgroundColor: isOnline ? '#4CAF50' : '#FF5722' }]} />
          <Text style={[styles.statusText, { color: isDark ? '#fff' : '#000' }]}>
            {isOnline ? 'Онлайн' : 'Офлайн'}
          </Text>
        </View>
        <TouchableOpacity 
          style={[styles.toggleButton, { backgroundColor: isOnline ? '#FF5722' : '#4CAF50' }]}
          onPress={handleToggleOnline}
        >
          <Text style={styles.toggleButtonText}>
            {isOnline ? 'Перейти в офлайн' : 'Перейти в онлайн'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Быстрые действия */}
      <View style={[styles.actionsContainer, { backgroundColor: isDark ? '#333' : '#fff' }]}>
        <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#000' }]}>
          Быстрые действия
        </Text>
        
        <View style={styles.actionsGrid}>
          {quickActions.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.actionCard, { backgroundColor: isDark ? '#555' : '#f0f0f0' }]}
              onPress={() => handleQuickActions(item.action)}
            >
              <Text style={[styles.actionIcon, { color: item.color }]}>
                {item.icon}
              </Text>
              <Text style={[styles.actionTitle, { color: isDark ? '#fff' : '#000' }]}>
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Дополнительные опции */}
      <View style={[styles.optionsContainer, { backgroundColor: isDark ? '#333' : '#fff' }]}>
        <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#000' }]}>
          Дополнительные опции
        </Text>
        
        <TouchableOpacity style={styles.optionItem}>
          <Text style={[styles.optionText, { color: isDark ? '#fff' : '#000' }]}>
            📱 Поддержка
          </Text>
          <Text style={[styles.optionArrow, { color: isDark ? '#ccc' : '#666' }]}>›</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.optionItem}>
          <Text style={[styles.optionText, { color: isDark ? '#fff' : '#000' }]}>
            📋 Документы
          </Text>
          <Text style={[styles.optionArrow, { color: isDark ? '#ccc' : '#666' }]}>›</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.optionItem}>
          <Text style={[styles.optionText, { color: isDark ? '#fff' : '#000' }]}>
            🚨 Экстренная помощь
          </Text>
          <Text style={[styles.optionArrow, { color: isDark ? '#ccc' : '#666' }]}>›</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 6,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  statusContainer: {
    margin: 15,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statusInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  toggleButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  toggleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  actionsContainer: {
    margin: 15,
    marginTop: 0,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  optionsContainer: {
    margin: 15,
    marginTop: 0,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
  },
  optionArrow: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PlusScreen; 