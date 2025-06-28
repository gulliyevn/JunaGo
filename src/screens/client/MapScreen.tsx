import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { lightColors, darkColors } from '../../constants/colors';
import { useAuth } from '../../context/AuthContext';
import MapViewComponent from '../../components/MapView';
import { DriverLocation } from '../../services/MapService';
import OrderService from '../../services/OrderService';

const MapScreen = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const colors = theme === 'dark' ? darkColors : lightColors;
  const [selectedDriver, setSelectedDriver] = useState<DriverLocation | null>(null);

  const handleDriverPress = (driver: DriverLocation) => {
    setSelectedDriver(driver);
    Alert.alert(
      `${driver.driver.name} ${driver.driver.surname}`,
      `Автомобиль: ${driver.driver.car}\nРейтинг: ${driver.rating}⭐\nСтатус: ${driver.isAvailable ? 'Доступен' : 'Занят'}`,
      [
        { text: 'Отмена', style: 'cancel' },
        { 
          text: 'Заказать', 
          onPress: () => handleOrderDriver(driver) 
        },
      ]
    );
  };

  const handleMapPress = (coordinate: { latitude: number; longitude: number }) => {
    console.log('Нажата точка на карте:', coordinate);
  };

  const handleOrderDriver = async (driver: DriverLocation) => {
    if (!user) {
      Alert.alert('Ошибка', 'Необходимо войти в аккаунт');
      return;
    }

    try {
      const order = await OrderService.createOrder({
        clientId: user.id!,
        from: {
          latitude: 55.7558,
          longitude: 37.6176,
          address: 'Москва, Красная площадь',
        },
        to: {
          latitude: 55.7539,
          longitude: 37.6208,
          address: 'Москва, ул. Тверская',
        },
      });

      Alert.alert(
        'Заказ создан!',
        `Заказ #${order.id} успешно создан. Ожидайте подтверждения от водителя.`,
        [{ text: 'OK' }]
      );
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось создать заказ');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <MapViewComponent
        onDriverPress={handleDriverPress}
        onMapPress={handleMapPress}
        showUserLocation={true}
        showDrivers={true}
        style={styles.map}
      />
      
      {/* Панель информации */}
      <View style={[styles.infoPanel, { backgroundColor: colors.card }]}>
        <Text style={[styles.infoTitle, { color: colors.text }]}>
          Найти водителя
        </Text>
        <Text style={[styles.infoText, { color: colors.textSecondary }]}>
          Нажмите на маркер водителя для заказа поездки
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
  infoPanel: {
    position: 'absolute',
    top: 50,
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
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default MapScreen;
