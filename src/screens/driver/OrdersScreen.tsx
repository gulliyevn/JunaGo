import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  ScrollView,
  Alert,
  TextInput
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

interface Order {
  id: string;
  clientName: string;
  clientPhone: string;
  pickup: string;
  destination: string;
  price: string;
  distance: string;
  estimatedTime: string;
  status: 'pending' | 'accepted' | 'completed' | 'cancelled';
  timestamp: string;
}

const OrdersScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const orders: Order[] = [
    {
      id: '1',
      clientName: 'Анна Иванова',
      clientPhone: '+7 (999) 123-45-67',
      pickup: 'ул. Ленина, 15',
      destination: 'ул. Пушкина, 8',
      price: '450 ₽',
      distance: '2.3 км',
      estimatedTime: '8 мин',
      status: 'pending',
      timestamp: '14:30'
    },
    {
      id: '2',
      clientName: 'Петр Сидоров',
      clientPhone: '+7 (999) 987-65-43',
      pickup: 'пр. Мира, 25',
      destination: 'ул. Гагарина, 12',
      price: '320 ₽',
      distance: '1.8 км',
      estimatedTime: '6 мин',
      status: 'accepted',
      timestamp: '14:15'
    },
    {
      id: '3',
      clientName: 'Мария Козлова',
      clientPhone: '+7 (999) 555-12-34',
      pickup: 'ул. Советская, 7',
      destination: 'ТЦ "Молл"',
      price: '580 ₽',
      distance: '3.1 км',
      estimatedTime: '12 мин',
      status: 'completed',
      timestamp: '13:45'
    },
    {
      id: '4',
      clientName: 'Иван Петров',
      clientPhone: '+7 (999) 777-88-99',
      pickup: 'ул. Центральная, 33',
      destination: 'Аэропорт',
      price: '850 ₽',
      distance: '5.2 км',
      estimatedTime: '18 мин',
      status: 'cancelled',
      timestamp: '13:20'
    }
  ];

  const filters = [
    { key: 'all', label: 'Все', icon: 'list' },
    { key: 'pending', label: 'Новые', icon: 'time' },
    { key: 'accepted', label: 'Активные', icon: 'checkmark-circle' },
    { key: 'completed', label: 'Завершенные', icon: 'checkmark-done' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#FF9500';
      case 'accepted': return '#007AFF';
      case 'completed': return '#27ae60';
      case 'cancelled': return '#FF3B30';
      default: return '#666';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Новый';
      case 'accepted': return 'Принят';
      case 'completed': return 'Завершен';
      case 'cancelled': return 'Отменен';
      default: return 'Неизвестно';
    }
  };

  const handleOrderAction = (order: Order, action: string) => {
    Alert.alert(
      action === 'accept' ? 'Принять заказ' : 'Завершить поездку',
      action === 'accept' 
        ? `Принять заказ от ${order.clientName}?`
        : `Завершить поездку с ${order.clientName}?`,
      [
        { text: 'Отмена', style: 'cancel' },
        { 
          text: action === 'accept' ? 'Принять' : 'Завершить', 
          onPress: () => Alert.alert('Успех', action === 'accept' ? 'Заказ принят!' : 'Поездка завершена!')
        }
      ]
    );
  };

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
  };

  const filteredOrders = orders.filter(order => {
    if (selectedFilter === 'all') return true;
    return order.status === selectedFilter;
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Заказы</Text>
        <TouchableOpacity style={styles.refreshButton}>
          <Ionicons name="refresh" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInput}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.input}
            placeholder="Поиск заказов..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
        </View>
      </View>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterButton,
                selectedFilter === filter.key && styles.filterButtonActive
              ]}
              onPress={() => handleFilterSelect(filter.key)}
            >
              <Ionicons 
                name={filter.icon as any} 
                size={16} 
                color={selectedFilter === filter.key ? '#fff' : '#666'} 
              />
              <Text style={[
                styles.filterText,
                selectedFilter === filter.key && styles.filterTextActive
              ]}>
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Orders List */}
      <ScrollView style={styles.ordersList} showsVerticalScrollIndicator={false}>
        {filteredOrders.map((order) => (
          <View key={order.id} style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <View style={styles.orderInfo}>
                <Text style={styles.orderId}>Заказ #{order.id}</Text>
                <Text style={styles.orderTime}>{order.timestamp}</Text>
              </View>
              <View style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(order.status) }
              ]}>
                <Text style={styles.statusText}>{getStatusText(order.status)}</Text>
              </View>
            </View>

            <View style={styles.clientInfo}>
              <View style={styles.clientAvatar}>
                <Ionicons name="person" size={20} color="#fff" />
              </View>
              <View style={styles.clientDetails}>
                <Text style={styles.clientName}>{order.clientName}</Text>
                <Text style={styles.clientPhone}>{order.clientPhone}</Text>
              </View>
            </View>

            <View style={styles.routeInfo}>
              <View style={styles.routePoint}>
                <View style={styles.routeIcon}>
                  <Ionicons name="location" size={16} color="#27ae60" />
                </View>
                <View style={styles.routeText}>
                  <Text style={styles.routeLabel}>Откуда</Text>
                  <Text style={styles.routeAddress}>{order.pickup}</Text>
                </View>
              </View>
              <View style={styles.routePoint}>
                <View style={styles.routeIcon}>
                  <Ionicons name="navigate" size={16} color="#007AFF" />
                </View>
                <View style={styles.routeText}>
                  <Text style={styles.routeLabel}>Куда</Text>
                  <Text style={styles.routeAddress}>{order.destination}</Text>
                </View>
              </View>
            </View>

            <View style={styles.orderDetails}>
              <View style={styles.detailItem}>
                <Ionicons name="car-sport" size={16} color="#666" />
                <Text style={styles.detailText}>{order.distance}</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="time" size={16} color="#666" />
                <Text style={styles.detailText}>{order.estimatedTime}</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="wallet" size={16} color="#666" />
                <Text style={styles.priceText}>{order.price}</Text>
              </View>
            </View>

            {order.status === 'pending' && (
              <TouchableOpacity 
                style={styles.acceptButton}
                onPress={() => handleOrderAction(order, 'accept')}
              >
                <Ionicons name="checkmark-circle" size={20} color="#fff" />
                <Text style={styles.acceptButtonText}>Принять заказ</Text>
              </TouchableOpacity>
            )}

            {order.status === 'accepted' && (
              <TouchableOpacity 
                style={styles.completeButton}
                onPress={() => handleOrderAction(order, 'complete')}
              >
                <Ionicons name="checkmark-done" size={20} color="#fff" />
                <Text style={styles.completeButtonText}>Завершить поездку</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },
  refreshButton: {
    padding: 4,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
  },
  searchIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#222',
  },
  filtersContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    marginRight: 12,
  },
  filterButtonActive: {
    backgroundColor: '#007AFF',
  },
  filterText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  filterTextActive: {
    color: '#fff',
  },
  ordersList: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
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
  orderInfo: {
    flex: 1,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  orderTime: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  clientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  clientAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  clientDetails: {
    flex: 1,
  },
  clientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  clientPhone: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  routeInfo: {
    marginBottom: 16,
  },
  routePoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  routeIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  routeText: {
    flex: 1,
  },
  routeLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  routeAddress: {
    fontSize: 14,
    color: '#222',
    lineHeight: 18,
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  priceText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#27ae60',
    marginLeft: 6,
  },
  acceptButton: {
    backgroundColor: '#27ae60',
    borderRadius: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  acceptButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  completeButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default OrdersScreen;
