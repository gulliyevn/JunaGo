import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  ScrollView,
  Alert,
  StatusBar
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import AppCard from '../../components/AppCard';

interface ScheduleItem {
  id: string;
  date: string;
  time: string;
  driver: string;
  car: string;
  from: string;
  to: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

const ScheduleScreen: React.FC = () => {
  const { isDark } = useTheme();
  const [selectedDate, setSelectedDate] = useState('2024-01-15');
  const [selectedTime, setSelectedTime] = useState('09:00');

  const scheduleItems: ScheduleItem[] = [
    {
      id: '1',
      date: '2024-01-15',
      time: '09:00',
      driver: 'Александр Петров',
      car: 'Toyota Camry • А123БВ777',
      from: 'ул. Ленина, 10',
      to: 'ул. Гагарина, 25',
      status: 'upcoming',
    },
    {
      id: '2',
      date: '2024-01-16',
      time: '14:30',
      driver: 'Михаил Иванов',
      car: 'Honda Accord • В456ГД888',
      from: 'Дом',
      to: 'Работа',
      status: 'upcoming',
    },
    {
      id: '3',
      date: '2024-01-14',
      time: '08:00',
      driver: 'Дмитрий Сидоров',
      car: 'BMW 3 Series • Е789ЖЗ999',
      from: 'ул. Пушкина, 15',
      to: 'Аэропорт',
      status: 'completed',
    },
  ];

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', 
    '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
  ];

  const handleBookSchedule = () => {
    Alert.alert(
      'Бронирование',
      `Забронировать водителя на ${selectedDate} в ${selectedTime}?`,
      [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Забронировать', onPress: () => Alert.alert('Успешно', 'Поездка забронирована!') }
      ]
    );
  };

  const handleCancelSchedule = (item: ScheduleItem) => {
    Alert.alert(
      'Отмена поездки',
      `Отменить поездку с ${item.driver}?`,
      [
        { text: 'Нет', style: 'cancel' },
        { text: 'Отменить', style: 'destructive', onPress: () => Alert.alert('Отменено', 'Поездка отменена') }
      ]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return '#1E3A8A';
      case 'completed': return '#10B981';
      case 'cancelled': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming': return 'Предстоит';
      case 'completed': return 'Завершена';
      case 'cancelled': return 'Отменена';
      default: return 'Неизвестно';
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#111827' : '#F8FAFC' }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: isDark ? '#F9FAFB' : '#1F2937' }]}>
          Расписание поездок
        </Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="#1E3A8A" />
        </TouchableOpacity>
      </View>

      {/* Quick Booking */}
      <AppCard style={styles.bookingCard} margin={16}>
        <Text style={styles.sectionTitle}>Быстрое бронирование</Text>
        
        <View style={styles.bookingForm}>
          <View style={styles.formRow}>
            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>Дата</Text>
              <TouchableOpacity style={styles.datePicker}>
                <Ionicons name="calendar" size={20} color="#1E3A8A" />
                <Text style={styles.dateText}>{selectedDate}</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>Время</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.timeSlots}>
                  {timeSlots.map((time) => (
                    <TouchableOpacity
                      key={time}
                      style={[
                        styles.timeSlot,
                        selectedTime === time && styles.timeSlotSelected
                      ]}
                      onPress={() => setSelectedTime(time)}
                    >
                      <Text style={[
                        styles.timeSlotText,
                        selectedTime === time && styles.timeSlotTextSelected
                      ]}>
                        {time}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>
          </View>
          
          <TouchableOpacity style={styles.bookButton} onPress={handleBookSchedule}>
            <Ionicons name="car-sport" size={20} color="#FFFFFF" />
            <Text style={styles.bookButtonText}>Забронировать водителя</Text>
          </TouchableOpacity>
        </View>
      </AppCard>

      {/* Schedule List */}
      <AppCard style={styles.scheduleCard} margin={16}>
        <Text style={styles.sectionTitle}>Мои поездки</Text>
        
        {scheduleItems.map((item) => (
          <View key={item.id} style={styles.scheduleItem}>
            <View style={styles.scheduleHeader}>
              <View style={styles.scheduleInfo}>
                <Text style={styles.scheduleDate}>{item.date}</Text>
                <Text style={styles.scheduleTime}>{item.time}</Text>
              </View>
              <View style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(item.status) }
              ]}>
                <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
              </View>
            </View>
            
            <View style={styles.routeInfo}>
              <View style={styles.routePoint}>
                <View style={[styles.point, { backgroundColor: '#10B981' }]}>
                  <Text style={styles.pointText}>A</Text>
                </View>
                <Text style={styles.routeText}>{item.from}</Text>
              </View>
              
              <View style={styles.routeLine} />
              
              <View style={styles.routePoint}>
                <View style={[styles.point, { backgroundColor: '#EF4444' }]}>
                  <Text style={styles.pointText}>B</Text>
                </View>
                <Text style={styles.routeText}>{item.to}</Text>
              </View>
            </View>
            
            <View style={styles.driverInfo}>
              <View style={styles.driverAvatar}>
                <Ionicons name="person" size={20} color="#1E3A8A" />
              </View>
              <View style={styles.driverDetails}>
                <Text style={styles.driverName}>{item.driver}</Text>
                <Text style={styles.carInfo}>{item.car}</Text>
              </View>
              
              {item.status === 'upcoming' && (
                <TouchableOpacity 
                  style={styles.cancelButton}
                  onPress={() => handleCancelSchedule(item)}
                >
                  <Ionicons name="close" size={16} color="#EF4444" />
                  <Text style={styles.cancelButtonText}>Отменить</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </AppCard>
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
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  addButton: {
    padding: 8,
  },
  bookingCard: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  bookingForm: {
    gap: 16,
  },
  formRow: {
    gap: 16,
  },
  formField: {
    gap: 8,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  datePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  dateText: {
    fontSize: 16,
    color: '#1F2937',
    marginLeft: 8,
  },
  timeSlots: {
    flexDirection: 'row',
    gap: 8,
  },
  timeSlot: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  timeSlotSelected: {
    backgroundColor: '#1E3A8A',
    borderColor: '#1E3A8A',
  },
  timeSlotText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  timeSlotTextSelected: {
    color: '#FFFFFF',
  },
  bookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E3A8A',
    borderRadius: 12,
    paddingVertical: 16,
    gap: 8,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  scheduleCard: {
    marginBottom: 8,
  },
  scheduleItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  scheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  scheduleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  scheduleDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  scheduleTime: {
    fontSize: 16,
    color: '#6B7280',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  routeInfo: {
    marginBottom: 12,
  },
  routePoint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  point: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  pointText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  routeText: {
    fontSize: 14,
    color: '#6B7280',
  },
  routeLine: {
    width: 2,
    height: 16,
    backgroundColor: '#1E3A8A',
    marginLeft: 11,
    marginVertical: 2,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  driverDetails: {
    flex: 1,
  },
  driverName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  carInfo: {
    fontSize: 12,
    color: '#6B7280',
  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  cancelButtonText: {
    fontSize: 12,
    color: '#EF4444',
    fontWeight: '500',
  },
});

export default ScheduleScreen;
