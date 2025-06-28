import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT, Region } from 'react-native-maps';
import { useTheme } from '../context/ThemeContext';
import { lightColors, darkColors } from '../constants/colors';
import { MAP_CONFIG, MARKER_TYPES } from '../constants/map';
import { DriverLocation } from '../services/MapService';
import MapService from '../services/MapService';
import { useAuth } from '../context/AuthContext';

interface MapViewProps {
  onDriverPress?: (driver: DriverLocation) => void;
  onMapPress?: (coordinate: { latitude: number; longitude: number }) => void;
  showUserLocation?: boolean;
  showDrivers?: boolean;
  style?: any;
}

const MapViewComponent: React.FC<MapViewProps> = ({
  onDriverPress,
  onMapPress,
  showUserLocation = true,
  showDrivers = true,
  style,
}) => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const colors = theme === 'dark' ? darkColors : lightColors;
  const mapRef = useRef<MapView>(null);
  
  const [region, setRegion] = useState<Region>(MAP_CONFIG.defaultRegion);
  const [drivers, setDrivers] = useState<DriverLocation[]>([]);
  const [userLocation, setUserLocation] = useState<Region | null>(null);
  const [loading, setLoading] = useState(false);

  // Получение текущей локации пользователя
  useEffect(() => {
    if (showUserLocation) {
      getCurrentLocation();
    }
  }, [showUserLocation]);

  // Получение водителей поблизости
  useEffect(() => {
    if (showDrivers && userLocation) {
      getNearbyDrivers();
    }
  }, [showDrivers, userLocation]);

  const getCurrentLocation = async () => {
    try {
      setLoading(true);
      const location = await MapService.getCurrentLocation();
      const newRegion = {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      setUserLocation(newRegion);
      setRegion(newRegion);
      
      // Анимированное перемещение к пользователю
      mapRef.current?.animateToRegion(newRegion, MAP_CONFIG.animationDuration);
    } catch (error) {
      console.error('Ошибка получения локации:', error);
      Alert.alert('Ошибка', 'Не удалось получить вашу локацию');
    } finally {
      setLoading(false);
    }
  };

  const getNearbyDrivers = async () => {
    if (!userLocation) return;
    
    try {
      const nearbyDrivers = await MapService.getNearbyDrivers(
        { latitude: userLocation.latitude, longitude: userLocation.longitude },
        MAP_CONFIG.searchRadius
      );
      setDrivers(nearbyDrivers);
    } catch (error) {
      console.error('Ошибка получения водителей:', error);
    }
  };

  const handleRegionChange = (newRegion: Region) => {
    setRegion(newRegion);
  };

  const handleMapPress = (event: any) => {
    const { coordinate } = event.nativeEvent;
    onMapPress?.(coordinate);
  };

  const handleDriverPress = (driver: DriverLocation) => {
    onDriverPress?.(driver);
  };

  const getMapStyle = () => {
    return theme === 'dark' ? MAP_CONFIG.styles.dark : MAP_CONFIG.styles.street;
  };

  const getMarkerColor = (type: string, isAvailable: boolean = true) => {
    switch (type) {
      case MARKER_TYPES.DRIVER:
        return isAvailable ? '#4CAF50' : '#FF9800';
      case MARKER_TYPES.CLIENT:
        return '#2196F3';
      case MARKER_TYPES.PICKUP:
        return '#FF5722';
      case MARKER_TYPES.DESTINATION:
        return '#9C27B0';
      default:
        return '#666666';
    }
  };

  return (
    <View style={[styles.container, style]}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_DEFAULT}
        initialRegion={region}
        onRegionChangeComplete={handleRegionChange}
        onPress={handleMapPress}
        showsUserLocation={showUserLocation}
        showsMyLocationButton={showUserLocation}
        showsCompass={true}
        showsScale={true}
        showsTraffic={false}
        showsBuildings={true}
        mapType="standard"
        userLocationPriority="high"
        userLocationUpdateInterval={10000}
        userLocationFastestInterval={5000}
        followsUserLocation={showUserLocation}
        loadingEnabled={true}
        loadingIndicatorColor={colors.primary}
        loadingBackgroundColor={colors.background}
      >
        {/* Маркеры водителей */}
        {showDrivers && drivers.map((driverLocation) => (
          <Marker
            key={driverLocation.driver.id}
            coordinate={{
              latitude: driverLocation.latitude,
              longitude: driverLocation.longitude,
            }}
            title={`${driverLocation.driver.name} ${driverLocation.driver.surname}`}
            description={`${driverLocation.driver.car} • Рейтинг: ${driverLocation.rating}⭐`}
            onPress={() => handleDriverPress(driverLocation)}
            pinColor={getMarkerColor(MARKER_TYPES.DRIVER, driverLocation.isAvailable)}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default MapViewComponent; 