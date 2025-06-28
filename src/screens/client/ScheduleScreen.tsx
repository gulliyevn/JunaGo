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

interface ScheduledRide {
  id: string;
  date: string;
  time: string;
  pickup: string;
  destination: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  driverName?: string;
  price?: string;
}

const ScheduleScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showNewRideForm, setShowNewRideForm] = useState(false);
  const [newRideData, setNewRideData] = useState({
    pickup: '',
    destination: '',
    date: '',
    time: ''
  });

  const scheduledRides: ScheduledRide[] = [
    {
      id: '1',
      date: '2024-01-15',
      time: '08:30',
      pickup: 'ул. Ленина, 15',
      destination: 'Офис на ул. Пушкина, 8',
      status: 'scheduled',
      driverName: 'Александр Петров',
      price: '450 ₽'
    },
    {
      id: '2',
      date: '2024-01-16',
      time: '17:00',
      pickup: 'ТЦ "Молл"',
      destination: 'Дом на ул. Гагарина, 12',
      status: 'scheduled',
      driverName: 'Иван Сидоров',
      price: '320 ₽'
    },
    {
      id: '3',
      date: '2024-01-14',
      time: '09:15',
      pickup: 'Аэропорт',
      destination: 'Отель "Престиж"',
      status: 'completed',
      driverName: 'Петр Козлов',
      price: '850 ₽'
    }
  ];

  const quickDestinations = [
    { name: 'Дом', icon: 'home', color: '#27ae60' },
    { name: 'Работа', icon: 'briefcase', color: '#007AFF' },
    { name: 'Школа', icon: 'school', color: '#FF9500' },
    { name: 'Аэропорт', icon: 'airplane', color: '#8e44ad' },
  ];

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleQuickDestination = (destination: string) => {
    setNewRideData(prev => ({ ...prev, destination }));
    Alert.alert('Направление', `Выбрано: ${destination}`);
  };

  const handleScheduleRide = () => {
    if (!newRideData.pickup || !newRideData.destination || !newRideData.date || !newRideData.time) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все поля');
      return;
    }
    
    Alert.alert('Поездка запланирована', 'Ваша поездка успешно запланирована!');
    setShowNewRideForm(false);
    setNewRideData({ pickup: '', destination: '', date: '', time: '' });
  };

  const handleCancelRide = (ride: ScheduledRide) => {
    Alert.alert(
      'Отменить поездку',
      `Отменить запланированную поездку на ${ride.date} в ${ride.time}?`,
      [
        { text: 'Нет', style: 'cancel' },
        { text: 'Отменить', style: 'destructive', onPress: () => Alert.alert('Отменено', 'Поездка отменена') }
      ]
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short' 
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return '#007AFF';
      case 'completed': return '#27ae60';
      case 'cancelled': return '#FF3B30';
      default: return '#666';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'scheduled': return 'Запланирована';
      case 'completed': return 'Завершена';
      case 'cancelled': return 'Отменена';
      default: return 'Неизвестно';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Планирование</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setShowNewRideForm(true)}
        >
          <Ionicons name="add" size={24} color="#27ae60" />
        </TouchableOpacity>
      </View>

      {/* Quick Destinations */}
      <View style={styles.quickSection}>
        <Text style={styles.sectionTitle}>Быстрые направления</Text>
        <View style={styles.quickGrid}>
          {quickDestinations.map((dest, index) => (
            <TouchableOpacity
              key={index}
              style={styles.quickCard}
              onPress={() => handleQuickDestination(dest.name)}
            >
              <View style={[styles.quickIcon, { backgroundColor: dest.color }]}>
                <Ionicons name={dest.icon as any} size={20} color="#fff" />
              </View>
              <Text style={styles.quickText}>{dest.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Scheduled Rides */}
      <View style={styles.ridesSection}>
        <Text style={styles.sectionTitle}>Запланированные поездки</Text>
        <ScrollView style={styles.ridesList} showsVerticalScrollIndicator={false}>
          {scheduledRides.map((ride) => (
            <View key={ride.id} style={styles.rideCard}>
              <View style={styles.rideHeader}>
                <View style={styles.rideInfo}>
                  <Text style={styles.rideDate}>{formatDate(ride.date)}</Text>
                  <Text style={styles.rideTime}>{ride.time}</Text>
                </View>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(ride.status) }
                ]}>
                  <Text style={styles.statusText}>{getStatusText(ride.status)}</Text>
                </View>
              </View>

              <View style={styles.routeInfo}>
                <View style={styles.routePoint}>
                  <View style={styles.routeIcon}>
                    <Ionicons name="location" size={16} color="#27ae60" />
                  </View>
                  <View style={styles.routeText}>
                    <Text style={styles.routeLabel}>Откуда</Text>
                    <Text style={styles.routeAddress}>{ride.pickup}</Text>
                  </View>
                </View>
                <View style={styles.routePoint}>
                  <View style={styles.routeIcon}>
                    <Ionicons name="navigate" size={16} color="#007AFF" />
                  </View>
                  <View style={styles.routeText}>
                    <Text style={styles.routeLabel}>Куда</Text>
                    <Text style={styles.routeAddress}>{ride.destination}</Text>
                  </View>
                </View>
              </View>

              {ride.driverName && (
                <View style={styles.driverInfo}>
                  <View style={styles.driverAvatar}>
                    <Ionicons name="person" size={16} color="#fff" />
                  </View>
                  <Text style={styles.driverName}>{ride.driverName}</Text>
                  {ride.price && <Text style={styles.ridePrice}>{ride.price}</Text>}
                </View>
              )}

              {ride.status === 'scheduled' && (
                <TouchableOpacity 
                  style={styles.cancelButton}
                  onPress={() => handleCancelRide(ride)}
                >
                  <Ionicons name="close-circle" size={20} color="#FF3B30" />
                  <Text style={styles.cancelButtonText}>Отменить</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </ScrollView>
      </View>

      {/* New Ride Form Modal */}
      {showNewRideForm && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Запланировать поездку</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setShowNewRideForm(false)}
              >
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Откуда</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Введите адрес отправления"
                  value={newRideData.pickup}
                  onChangeText={(text) => setNewRideData(prev => ({ ...prev, pickup: text }))}
                  placeholderTextColor="#999"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Куда</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Введите адрес назначения"
                  value={newRideData.destination}
                  onChangeText={(text) => setNewRideData(prev => ({ ...prev, destination: text }))}
                  placeholderTextColor="#999"
                />
              </View>

              <View style={styles.inputRow}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                  <Text style={styles.inputLabel}>Дата</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="ДД.ММ.ГГГГ"
                    value={newRideData.date}
                    onChangeText={(text) => setNewRideData(prev => ({ ...prev, date: text }))}
                    placeholderTextColor="#999"
                  />
                </View>
                <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                  <Text style={styles.inputLabel}>Время</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="ЧЧ:ММ"
                    value={newRideData.time}
                    onChangeText={(text) => setNewRideData(prev => ({ ...prev, time: text }))}
                    placeholderTextColor="#999"
                  />
                </View>
              </View>

              <TouchableOpacity 
                style={styles.scheduleButton}
                onPress={handleScheduleRide}
              >
                <Ionicons name="calendar" size={20} color="#fff" />
                <Text style={styles.scheduleButtonText}>Запланировать</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
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
  addButton: {
    padding: 4,
  },
  quickSection: {
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
  quickGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickCard: {
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    flex: 1,
    marginHorizontal: 4,
  },
  quickIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  quickText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222',
  },
  ridesSection: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    marginTop: 8,
  },
  ridesList: {
    flex: 1,
  },
  rideCard: {
    backgroundColor: '#f8f9fa',
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
  rideHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  rideInfo: {
    flex: 1,
  },
  rideDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  rideTime: {
    fontSize: 14,
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
    backgroundColor: '#fff',
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
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  driverAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  driverName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222',
    flex: 1,
  },
  ridePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#27ae60',
  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  cancelButtonText: {
    color: '#FF3B30',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    margin: 20,
    width: '90%',
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },
  closeButton: {
    padding: 4,
  },
  formContainer: {
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222',
  },
  input: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#222',
  },
  inputRow: {
    flexDirection: 'row',
  },
  scheduleButton: {
    backgroundColor: '#27ae60',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  scheduleButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default ScheduleScreen;
