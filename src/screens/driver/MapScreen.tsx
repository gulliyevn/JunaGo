import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { lightColors, darkColors } from '../../constants/colors';
import { useAuth } from '../../context/AuthContext';
import MapViewComponent from '../../components/MapView';
import OrderService from '../../services/OrderService';
import { Order } from '../../services/OrderService';

const DriverMapScreen = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const colors = theme === 'dark' ? darkColors : lightColors;
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (user?.id) {
      loadOrders();
    }
  }, [user]);

  const loadOrders = async () => {
    if (!user?.id) return;
    
    try {
      const driverOrders = await OrderService.getDriverOrders(user.id);
      setOrders(driverOrders);
    } catch (error) {
      console.error('Ошибка загрузки заказов:', error);
    }
  };

  const handleMapPress = (coordinate: { latitude: number; longitude: number }) => {
    console.log('Нажата точка на карте:', coordinate);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <MapViewComponent
        onMapPress={handleMapPress}
        showUserLocation={true}
        showDrivers={false}
        style={styles.map}
      />
      
      {/* Панель статистики водителя */}
      <View style={[styles.statsPanel, { backgroundColor: colors.card }]}>
        <Text style={[styles.statsTitle, { color: colors.text }]}>
          Ваши заказы
        </Text>
        <Text style={[styles.statsText, { color: colors.textSecondary }]}>
          Активных заказов: {orders.filter(o => o.status === 'in_progress').length}
        </Text>
        <Text style={[styles.statsText, { color: colors.textSecondary }]}>
          Завершенных сегодня: {orders.filter(o => o.status === 'completed' && 
            new Date(o.completedAt!).toDateString() === new Date().toDateString()).length}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  statsPanel: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statsText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
});

export default DriverMapScreen;
