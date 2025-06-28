import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  ScrollView,
  Alert
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const EarningsScreen: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  const periods = [
    { key: 'today', label: 'Сегодня', icon: 'today' },
    { key: 'week', label: 'Неделя', icon: 'calendar' },
    { key: 'month', label: 'Месяц', icon: 'calendar-outline' },
  ];

  const earningsData = {
    today: {
      total: '3,200 ₽',
      rides: 8,
      hours: '6ч 30м',
      average: '400 ₽',
      chart: [1200, 800, 600, 400, 200]
    },
    week: {
      total: '18,500 ₽',
      rides: 45,
      hours: '42ч 15м',
      average: '411 ₽',
      chart: [2800, 3200, 2400, 3600, 2800, 2200, 2000]
    },
    month: {
      total: '72,800 ₽',
      rides: 180,
      hours: '168ч 45м',
      average: '404 ₽',
      chart: [8500, 9200, 7800, 9600, 8200, 7500, 6800]
    }
  };

  const currentData = earningsData[selectedPeriod as keyof typeof earningsData];

  const quickStats = [
    { label: 'Всего поездок', value: currentData.rides.toString(), icon: 'car-sport', color: '#27ae60' },
    { label: 'Время работы', value: currentData.hours, icon: 'time', color: '#007AFF' },
    { label: 'Средний чек', value: currentData.average, icon: 'wallet', color: '#FF9500' },
  ];

  const recentRides = [
    { id: '1', client: 'Анна Иванова', amount: '450 ₽', time: '14:30', rating: 5 },
    { id: '2', client: 'Петр Сидоров', amount: '320 ₽', time: '14:15', rating: 4 },
    { id: '3', client: 'Мария Козлова', amount: '580 ₽', time: '13:45', rating: 5 },
    { id: '4', client: 'Иван Петров', amount: '850 ₽', time: '13:20', rating: 4 },
  ];

  const handlePeriodSelect = (period: string) => {
    setSelectedPeriod(period);
  };

  const handleWithdraw = () => {
    Alert.alert('Вывод средств', 'Функция вывода средств будет доступна в следующем обновлении');
  };

  const handleViewDetails = () => {
    Alert.alert('Детали', 'Подробная статистика будет доступна в следующем обновлении');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Заработок</Text>
        <TouchableOpacity style={styles.detailsButton} onPress={handleViewDetails}>
          <Ionicons name="analytics" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {/* Period Selector */}
      <View style={styles.periodContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {periods.map((period) => (
            <TouchableOpacity
              key={period.key}
              style={[
                styles.periodButton,
                selectedPeriod === period.key && styles.periodButtonActive
              ]}
              onPress={() => handlePeriodSelect(period.key)}
            >
              <Ionicons 
                name={period.icon as any} 
                size={16} 
                color={selectedPeriod === period.key ? '#fff' : '#666'} 
              />
              <Text style={[
                styles.periodText,
                selectedPeriod === period.key && styles.periodTextActive
              ]}>
                {period.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Total Earnings */}
      <View style={styles.earningsCard}>
        <View style={styles.earningsHeader}>
          <Text style={styles.earningsLabel}>Общий заработок</Text>
          <Ionicons name="trending-up" size={24} color="#27ae60" />
        </View>
        <Text style={styles.earningsAmount}>{currentData.total}</Text>
        <Text style={styles.earningsSubtext}>+12% по сравнению с прошлым периодом</Text>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Статистика</Text>
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

      {/* Chart Placeholder */}
      <View style={styles.chartSection}>
        <Text style={styles.sectionTitle}>График заработка</Text>
        <View style={styles.chartContainer}>
          <View style={styles.chartPlaceholder}>
            <MaterialIcons name="show-chart" size={60} color="#ddd" />
            <Text style={styles.chartText}>График</Text>
            <Text style={styles.chartSubtext}>Интерактивный график заработка</Text>
          </View>
        </View>
      </View>

      {/* Recent Rides */}
      <View style={styles.ridesSection}>
        <Text style={styles.sectionTitle}>Последние поездки</Text>
        <ScrollView style={styles.ridesList} showsVerticalScrollIndicator={false}>
          {recentRides.map((ride) => (
            <View key={ride.id} style={styles.rideCard}>
              <View style={styles.rideHeader}>
                <View style={styles.rideInfo}>
                  <Text style={styles.rideClient}>{ride.client}</Text>
                  <Text style={styles.rideTime}>{ride.time}</Text>
                </View>
                <View style={styles.rideAmount}>
                  <Text style={styles.amountText}>{ride.amount}</Text>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={12} color="#FFD700" />
                    <Text style={styles.ratingText}>{ride.rating}</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Withdraw Button */}
      <View style={styles.withdrawSection}>
        <TouchableOpacity style={styles.withdrawButton} onPress={handleWithdraw}>
          <Ionicons name="card" size={24} color="#fff" />
          <Text style={styles.withdrawButtonText}>Вывести средства</Text>
        </TouchableOpacity>
      </View>
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
  detailsButton: {
    padding: 4,
  },
  periodContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  periodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    marginRight: 12,
  },
  periodButtonActive: {
    backgroundColor: '#007AFF',
  },
  periodText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  periodTextActive: {
    color: '#fff',
  },
  earningsCard: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  earningsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  earningsLabel: {
    fontSize: 16,
    color: '#666',
  },
  earningsAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
  },
  earningsSubtext: {
    fontSize: 14,
    color: '#27ae60',
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
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
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
  chartSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    marginTop: 8,
  },
  chartContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 20,
  },
  chartPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  chartText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 16,
  },
  chartSubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
  ridesSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    marginTop: 8,
  },
  ridesList: {
    maxHeight: 200,
  },
  rideCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  rideHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rideInfo: {
    flex: 1,
  },
  rideClient: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  rideTime: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  rideAmount: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#27ae60',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  withdrawSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  withdrawButton: {
    backgroundColor: '#27ae60',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  withdrawButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default EarningsScreen; 