import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  ScrollView,
  StatusBar
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import AppCard from '../../components/AppCard';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ClientStackParamList } from '../../types/navigation';

type NavigationProp = StackNavigationProp<ClientStackParamList, 'ChatList'>;

interface ChatPreview {
  driverId: string;
  driverName: string;
  driverCar: string;
  driverNumber: string;
  driverRating: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  driverStatus: 'online' | 'offline' | 'busy';
}

const ChatListScreen: React.FC = () => {
  const { isDark } = useTheme();
  const navigation = useNavigation<NavigationProp>();

  const chats: ChatPreview[] = [
    {
      driverId: 'driver1',
      driverName: 'Александр Петров',
      driverCar: 'Toyota Camry',
      driverNumber: 'А123БВ777',
      driverRating: '4.8',
      lastMessage: 'Приеду через 5 минут. Буду на белой Toyota Camry.',
      timestamp: '14:32',
      unreadCount: 2,
      driverStatus: 'online'
    },
    {
      driverId: 'driver2',
      driverName: 'Мурад Алиев',
      driverCar: 'Mercedes E-Class',
      driverNumber: 'В456ГД888',
      driverRating: '4.9',
      lastMessage: 'Спасибо за поездку!',
      timestamp: 'Вчера',
      unreadCount: 0,
      driverStatus: 'offline'
    }
  ];

  const handleChatPress = (chat: ChatPreview) => {
    navigation.navigate('ChatConversation', {
      driverId: chat.driverId,
      driverName: chat.driverName,
      driverCar: chat.driverCar,
      driverNumber: chat.driverNumber,
      driverRating: chat.driverRating,
      driverStatus: chat.driverStatus
    });
  };

  const handleNotifications = () => {
    // TODO: Navigate to notifications screen
    console.log('Open notifications');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return '#10B981';
      case 'busy': return '#F59E0B';
      case 'offline': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return 'В сети';
      case 'busy': return 'Занят';
      case 'offline': return 'Не в сети';
      default: return 'Не в сети';
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#111827' : '#F8FAFC' }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.notificationBtn} onPress={handleNotifications}>
          <Ionicons name="notifications-outline" size={24} color={isDark ? '#F9FAFB' : '#1F2937'} />
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationBadgeText}>3</Text>
          </View>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDark ? '#F9FAFB' : '#1F2937' }]}>
          Чаты
        </Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Chat List */}
      <ScrollView style={styles.chatList} showsVerticalScrollIndicator={false}>
        {chats.map((chat) => (
          <TouchableOpacity key={chat.driverId} onPress={() => handleChatPress(chat)}>
            <AppCard style={styles.chatItem} margin={16}>
              <View style={styles.chatContent}>
                <View style={styles.driverInfo}>
                  <View style={styles.driverAvatar}>
                    <Text style={{ fontSize: 20 }}>👨‍💼</Text>
                    <View style={[styles.statusDot, { backgroundColor: getStatusColor(chat.driverStatus) }]} />
                  </View>
                  <View style={styles.chatDetails}>
                    <View style={styles.chatHeader}>
                      <Text style={[styles.driverName, { color: isDark ? '#F9FAFB' : '#1F2937' }]}>
                        {chat.driverName}
                      </Text>
                      <Text style={styles.timestamp}>{chat.timestamp}</Text>
                    </View>
                    <Text style={styles.carInfo}>{chat.driverCar} • {chat.driverNumber}</Text>
                    <Text style={[styles.lastMessage, { color: isDark ? '#D1D5DB' : '#6B7280' }]} numberOfLines={1}>
                      {chat.lastMessage}
                    </Text>
                    <View style={styles.chatFooter}>
                      <View style={styles.statusContainer}>
                        <Text style={[styles.statusText, { color: getStatusColor(chat.driverStatus) }]}>
                          {getStatusText(chat.driverStatus)}
                        </Text>
                      </View>
                      {chat.unreadCount > 0 && (
                        <View style={styles.unreadBadge}>
                          <Text style={styles.unreadText}>{chat.unreadCount}</Text>
                        </View>
                      )}
                    </View>
                  </View>
                </View>
                <View style={styles.rating}>
                  <Text style={[styles.ratingText, { color: isDark ? '#F9FAFB' : '#1F2937' }]}>
                    {chat.driverRating}
                  </Text>
                  <Text style={styles.ratingStar}>⭐</Text>
                </View>
              </View>
            </AppCard>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
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
    paddingVertical: 16,
  },
  notificationBtn: {
    padding: 8,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  chatList: {
    flex: 1,
  },
  chatItem: {
    marginBottom: 8,
  },
  chatContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  driverInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  driverAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    position: 'relative',
  },
  statusDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  chatDetails: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  driverName: {
    fontSize: 16,
    fontWeight: '600',
  },
  timestamp: {
    fontSize: 12,
    color: '#6B7280',
  },
  carInfo: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 14,
    marginBottom: 8,
  },
  chatFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  unreadBadge: {
    backgroundColor: '#1E3A8A',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  rating: {
    alignItems: 'center',
    marginLeft: 8,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
  },
  ratingStar: {
    fontSize: 14,
    marginTop: 2,
  },
});

export default ChatListScreen; 