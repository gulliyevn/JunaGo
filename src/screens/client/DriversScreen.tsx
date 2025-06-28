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

interface Driver {
  id: string;
  name: string;
  rating: number;
  totalRides: number;
  carModel: string;
  carNumber: string;
  isOnline: boolean;
  distance: string;
  estimatedTime: string;
  price: string;
}

const DriversScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const drivers: Driver[] = [
    {
      id: '1',
      name: 'Александр Петров',
      rating: 4.8,
      totalRides: 127,
      carModel: 'Toyota Camry',
      carNumber: 'А123БВ77',
      isOnline: true,
      distance: '0.5 км',
      estimatedTime: '3 мин',
      price: 'от 500 ₽'
    },
    {
      id: '2',
      name: 'Иван Сидоров',
      rating: 4.6,
      totalRides: 89,
      carModel: 'Honda Civic',
      carNumber: 'В456ГД77',
      isOnline: true,
      distance: '1.2 км',
      estimatedTime: '5 мин',
      price: 'от 450 ₽'
    },
    {
      id: '3',
      name: 'Петр Козлов',
      rating: 4.9,
      totalRides: 203,
      carModel: 'BMW X5',
      carNumber: 'Е789ЖЗ77',
      isOnline: false,
      distance: '2.1 км',
      estimatedTime: '8 мин',
      price: 'от 800 ₽'
    },
    {
      id: '4',
      name: 'Михаил Иванов',
      rating: 4.7,
      totalRides: 156,
      carModel: 'Mercedes C-Class',
      carNumber: 'И012КЛ77',
      isOnline: true,
      distance: '0.8 км',
      estimatedTime: '4 мин',
      price: 'от 600 ₽'
    }
  ];

  const filters = [
    { key: 'all', label: 'Все', icon: 'list' },
    { key: 'online', label: 'Онлайн', icon: 'radio-button-on' },
    { key: 'rating', label: 'Рейтинг', icon: 'star' },
    { key: 'distance', label: 'Близко', icon: 'location' }
  ];

  const handleDriverSelect = (driver: Driver) => {
    Alert.alert(
      'Выбор водителя',
      `Заказать поездку у ${driver.name}?\n${driver.carModel} (${driver.carNumber})\nРейтинг: ${driver.rating}⭐\nЦена: ${driver.price}`,
      [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Заказать', onPress: () => Alert.alert('Успех', 'Заказ создан! Водитель скоро приедет.') }
      ]
    );
  };

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
    Alert.alert('Фильтр', `Применен фильтр: ${filter}`);
  };

  const filteredDrivers = drivers.filter(driver => {
    if (selectedFilter === 'online') return driver.isOnline;
    if (selectedFilter === 'rating') return driver.rating >= 4.7;
    if (selectedFilter === 'distance') return parseFloat(driver.distance) <= 1.0;
    return true;
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Доступные водители</Text>
        <TouchableOpacity style={styles.refreshButton}>
          <Ionicons name="refresh" size={24} color="#27ae60" />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInput}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.input}
            placeholder="Поиск водителей..."
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

      {/* Drivers List */}
      <ScrollView style={styles.driversList} showsVerticalScrollIndicator={false}>
        {filteredDrivers.map((driver) => (
          <TouchableOpacity
            key={driver.id}
            style={styles.driverCard}
            onPress={() => handleDriverSelect(driver)}
            activeOpacity={0.8}
          >
            <View style={styles.driverHeader}>
              <View style={styles.driverInfo}>
                <View style={styles.driverAvatar}>
                  <Ionicons name="person" size={24} color="#fff" />
                </View>
                <View style={styles.driverDetails}>
                  <Text style={styles.driverName}>{driver.name}</Text>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={14} color="#FFD700" />
                    <Text style={styles.ratingText}>{driver.rating}</Text>
                    <Text style={styles.ridesText}>({driver.totalRides} поездок)</Text>
                  </View>
                </View>
              </View>
              <View style={styles.statusContainer}>
                <View style={[
                  styles.statusIndicator,
                  { backgroundColor: driver.isOnline ? '#27ae60' : '#ccc' }
                ]} />
                <Text style={styles.statusText}>
                  {driver.isOnline ? 'Онлайн' : 'Офлайн'}
                </Text>
              </View>
            </View>

            <View style={styles.carInfo}>
              <MaterialIcons name="directions-car" size={20} color="#666" />
              <Text style={styles.carText}>{driver.carModel}</Text>
              <Text style={styles.carNumber}>{driver.carNumber}</Text>
            </View>

            <View style={styles.tripInfo}>
              <View style={styles.tripDetail}>
                <Ionicons name="location" size={16} color="#666" />
                <Text style={styles.tripText}>{driver.distance}</Text>
              </View>
              <View style={styles.tripDetail}>
                <Ionicons name="time" size={16} color="#666" />
                <Text style={styles.tripText}>{driver.estimatedTime}</Text>
              </View>
              <View style={styles.tripDetail}>
                <Ionicons name="wallet" size={16} color="#666" />
                <Text style={styles.priceText}>{driver.price}</Text>
              </View>
            </View>

            <TouchableOpacity 
              style={[
                styles.orderButton,
                !driver.isOnline && styles.orderButtonDisabled
              ]}
              onPress={() => handleDriverSelect(driver)}
              disabled={!driver.isOnline}
            >
              <Text style={styles.orderButtonText}>
                {driver.isOnline ? 'Заказать' : 'Недоступен'}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
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
    backgroundColor: '#27ae60',
  },
  filterText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  filterTextActive: {
    color: '#fff',
  },
  driversList: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  driverCard: {
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
  driverHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#27ae60',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  driverDetails: {
    flex: 1,
  },
  driverName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222',
    marginLeft: 4,
  },
  ridesText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    color: '#666',
  },
  carInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  carText: {
    fontSize: 14,
    color: '#222',
    marginLeft: 8,
    flex: 1,
  },
  carNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#27ae60',
  },
  tripInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  tripDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tripText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  priceText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#27ae60',
    marginLeft: 4,
  },
  orderButton: {
    backgroundColor: '#27ae60',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  orderButtonDisabled: {
    backgroundColor: '#ccc',
  },
  orderButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DriversScreen;
