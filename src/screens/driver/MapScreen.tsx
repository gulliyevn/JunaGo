import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

interface Order {
  id: string;
  clientName: string;
  clientPhone: string;
  from: {
    latitude: number;
    longitude: number;
    address: string;
  };
  to: {
    latitude: number;
    longitude: number;
    address: string;
  };
  price: number;
  estimatedTime: number;
  status: 'pending' | 'accepted' | 'in_progress' | 'completed';
  createdAt: Date;
}

const DriverMapScreen: React.FC = () => {
  const { logout } = useAuth();
  const { isDark } = useTheme();
  const [driverLocation, setDriverLocation] = useState({
    latitude: 55.7558,
    longitude: 37.6176,
  });
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOnline, setIsOnline] = useState(true);
  const [currentOrder, setCurrentOrder] = useState<any>(null);

  // Mock данные заказов
  useEffect(() => {
    const mockOrders: Order[] = [
      {
        id: '1',
        clientName: 'Анна Иванова',
        clientPhone: '+7 (999) 123-45-67',
        from: {
          latitude: 55.7558,
          longitude: 37.6176,
          address: 'Москва, Красная площадь, 1'
        },
        to: {
          latitude: 55.7539,
          longitude: 37.6208,
          address: 'Москва, ул. Тверская, 10'
        },
        price: 450,
        estimatedTime: 15,
        status: 'pending',
        createdAt: new Date(Date.now() - 5 * 60 * 1000)
      },
      {
        id: '2',
        clientName: 'Петр Сидоров',
        clientPhone: '+7 (999) 987-65-43',
        from: {
          latitude: 55.7500,
          longitude: 37.6200,
          address: 'Москва, ул. Арбат, 20'
        },
        to: {
          latitude: 55.7600,
          longitude: 37.6100,
          address: 'Москва, ул. Новый Арбат, 15'
        },
        price: 380,
        estimatedTime: 12,
        status: 'pending',
        createdAt: new Date(Date.now() - 2 * 60 * 1000)
      }
    ];
    setOrders(mockOrders);
  }, []);

  const handleOrderPress = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleAcceptOrder = () => {
    Alert.alert('Заказ принят', 'Направляйтесь к клиенту');
    setCurrentOrder({
      id: '1',
      clientName: 'Анна Иванова',
      pickup: 'ул. Ленина, 15',
      destination: 'ул. Пушкина, 8',
      price: '450 ₽',
      distance: '2.3 км'
    });
  };

  const handleCompleteOrder = () => {
    Alert.alert('Поездка завершена', 'Спасибо за работу!');
    setCurrentOrder(null);
  };

  const handleToggleOnline = () => {
    setIsOnline(!isOnline);
    Alert.alert(
      isOnline ? 'Офлайн' : 'Онлайн',
      isOnline ? 'Вы перешли в офлайн режим' : 'Вы перешли в онлайн режим'
    );
  };

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

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return '#FF9500';
      case 'accepted': return '#007AFF';
      case 'in_progress': return '#34C759';
      case 'completed': return '#8E8E93';
      default: return '#FF9500';
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'Ожидает';
      case 'accepted': return 'Принят';
      case 'in_progress': return 'В пути';
      case 'completed': return 'Завершен';
      default: return 'Ожидает';
    }
  };

  const quickStats = [
    { label: 'Поездок сегодня', value: '8', icon: 'car-sport', color: '#27ae60' },
    { label: 'Заработок', value: '3,200 ₽', icon: 'wallet', color: '#FF9500' },
    { label: 'Рейтинг', value: '4.8', icon: 'star', color: '#FFD700' },
    { label: 'Время работы', value: '6ч 30м', icon: 'time', color: '#007AFF' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.locationInfo}>
            <Ionicons name="location" size={20} color="#007AFF" />
            <Text style={styles.locationText}>Баку, Азербайджан</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Ionicons name="person-circle" size={32} color="#222" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Map Placeholder */}
      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <MaterialIcons name="map" size={80} color="#ddd" />
          <Text style={styles.mapText}>Карта</Text>
          <Text style={styles.mapSubtext}>Интерактивная карта с заказами</Text>
        </View>
        
        {/* Current Location Button */}
        <TouchableOpacity style={styles.locationButton}>
          <Ionicons name="locate" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Online/Offline Toggle */}
        <TouchableOpacity 
          style={[styles.onlineButton, { backgroundColor: isOnline ? '#27ae60' : '#FF3B30' }]}
          onPress={handleToggleOnline}
        >
          <Ionicons name={isOnline ? "radio-button-on" : "radio-button-off"} size={20} color="#fff" />
          <Text style={styles.onlineButtonText}>
            {isOnline ? 'Онлайн' : 'Офлайн'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Статистика сегодня</Text>
        <View style={styles.statsGrid}>
          {quickStats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: stat.color }]}>
                <Ionicons name={stat.icon as any} size={20} color="#fff" />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Current Order */}
      {currentOrder && (
        <View style={styles.orderSection}>
          <Text style={styles.sectionTitle}>Текущий заказ</Text>
          <View style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderTitle}>Заказ #{currentOrder.id}</Text>
              <Text style={styles.orderPrice}>{currentOrder.price}</Text>
            </View>
            <View style={styles.orderDetails}>
              <View style={styles.orderDetail}>
                <Ionicons name="person" size={16} color="#666" />
                <Text style={styles.orderText}>{currentOrder.clientName}</Text>
              </View>
              <View style={styles.orderDetail}>
                <Ionicons name="location" size={16} color="#666" />
                <Text style={styles.orderText}>{currentOrder.pickup}</Text>
              </View>
              <View style={styles.orderDetail}>
                <Ionicons name="navigate" size={16} color="#666" />
                <Text style={styles.orderText}>{currentOrder.destination}</Text>
              </View>
            </View>
            <View style={styles.orderActions}>
              <TouchableOpacity style={styles.completeButton} onPress={handleCompleteOrder}>
                <Text style={styles.completeButtonText}>Завершить</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Quick Actions */}
      <View style={styles.actionsSection}>
        <TouchableOpacity style={styles.actionButton} onPress={handleAcceptOrder}>
          <Ionicons name="checkmark-circle" size={24} color="#fff" />
          <Text style={styles.actionButtonText}>Принять заказ</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginLeft: 8,
  },
  profileButton: {
    padding: 4,
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 16,
  },
  mapSubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
  locationButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  onlineButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  onlineButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  statsSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  orderSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  orderCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  orderPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#27ae60',
  },
  orderDetails: {
    marginBottom: 16,
  },
  orderDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    flex: 1,
  },
  orderActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  completeButton: {
    backgroundColor: '#27ae60',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  actionsSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  actionButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default DriverMapScreen;
