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

const MapScreen: React.FC = () => {
  const [selectedDestination, setSelectedDestination] = useState('');

  const handleQuickOrder = () => {
    Alert.alert('Быстрый заказ', 'Функция будет доступна в следующем обновлении');
  };

  const handleDestinationSelect = (destination: string) => {
    setSelectedDestination(destination);
    Alert.alert('Направление', `Выбрано: ${destination}`);
  };

  const popularDestinations = [
    { name: 'Дом', icon: 'home', color: '#27ae60' },
    { name: 'Работа', icon: 'briefcase', color: '#007AFF' },
    { name: 'Школа', icon: 'school', color: '#FF9500' },
    { name: 'Торговый центр', icon: 'cart', color: '#8e44ad' },
  ];

  const quickActions = [
    { title: 'Быстрый заказ', icon: 'flash', color: '#FF3B30', action: handleQuickOrder },
    { title: 'История поездок', icon: 'time', color: '#636e72', action: () => Alert.alert('История', 'История поездок') },
    { title: 'Избранные места', icon: 'heart', color: '#e74c3c', action: () => Alert.alert('Избранное', 'Избранные места') },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.locationInfo}>
            <Ionicons name="location" size={20} color="#27ae60" />
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
          <Text style={styles.mapSubtext}>Интерактивная карта с водителями</Text>
        </View>
        
        {/* Current Location Button */}
        <TouchableOpacity style={styles.locationButton}>
          <Ionicons name="locate" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        {quickActions.map((action, index) => (
          <TouchableOpacity 
            key={index}
            style={styles.actionButton} 
            onPress={action.action}
          >
            <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
              <Ionicons name={action.icon as any} size={20} color="#fff" />
            </View>
            <Text style={styles.actionText}>{action.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Popular Destinations */}
      <View style={styles.destinationsSection}>
        <Text style={styles.sectionTitle}>Популярные направления</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {popularDestinations.map((dest, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.destinationCard}
              onPress={() => handleDestinationSelect(dest.name)}
            >
              <View style={[styles.destinationIcon, { backgroundColor: dest.color }]}>
                <Ionicons name={dest.icon as any} size={24} color="#fff" />
              </View>
              <Text style={styles.destinationText}>{dest.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Order Button */}
      <View style={styles.orderSection}>
        <TouchableOpacity style={styles.orderButton} onPress={handleQuickOrder}>
          <Ionicons name="car-sport" size={24} color="#fff" />
          <Text style={styles.orderButtonText}>Заказать поездку</Text>
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
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#27ae60',
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
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  actionButton: {
    alignItems: 'center',
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  destinationsSection: {
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
  destinationCard: {
    alignItems: 'center',
    marginRight: 20,
    minWidth: 80,
  },
  destinationIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  destinationText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  orderSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  orderButton: {
    backgroundColor: '#27ae60',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default MapScreen;
