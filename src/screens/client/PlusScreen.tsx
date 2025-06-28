import React from 'react';
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

const PlusScreen: React.FC = () => {
  const quickActions = [
    {
      title: 'Быстрый заказ',
      subtitle: 'Заказать такси сейчас',
      icon: 'car-sport',
      color: '#27ae60',
      action: () => Alert.alert('Быстрый заказ', 'Функция будет доступна в следующем обновлении')
    },
    {
      title: 'Запланировать',
      subtitle: 'Запланировать поездку',
      icon: 'calendar',
      color: '#007AFF',
      action: () => Alert.alert('Планирование', 'Переход к планированию поездок')
    },
    {
      title: 'Поделиться поездкой',
      subtitle: 'Разделить стоимость',
      icon: 'people',
      color: '#FF9500',
      action: () => Alert.alert('Поделиться', 'Функция будет доступна в следующем обновлении')
    },
    {
      title: 'Доставка',
      subtitle: 'Заказать доставку',
      icon: 'cube',
      color: '#8e44ad',
      action: () => Alert.alert('Доставка', 'Функция будет доступна в следующем обновлении')
    }
  ];

  const services = [
    {
      title: 'Премиум',
      subtitle: 'Комфортные автомобили',
      icon: 'diamond',
      color: '#FFD700'
    },
    {
      title: 'Эконом',
      subtitle: 'Бюджетные поездки',
      icon: 'car',
      color: '#27ae60'
    },
    {
      title: 'Грузовой',
      subtitle: 'Перевозка грузов',
      icon: 'truck',
      color: '#FF6B35'
    },
    {
      title: 'Междугородний',
      subtitle: 'Поездки между городами',
      icon: 'airplane',
      color: '#3498db'
    }
  ];

  const recentDestinations = [
    { name: 'Дом', address: 'ул. Ленина, 15', icon: 'home', color: '#27ae60' },
    { name: 'Работа', address: 'ул. Пушкина, 8', icon: 'briefcase', color: '#007AFF' },
    { name: 'ТЦ "Молл"', address: 'пр. Мира, 25', icon: 'bag', color: '#FF9500' },
    { name: 'Аэропорт', address: 'Аэропорт им. Гейдара Алиева', icon: 'airplane', color: '#8e44ad' },
  ];

  const handleQuickAction = (action: () => void) => {
    action();
  };

  const handleServiceSelect = (service: any) => {
    Alert.alert(service.title, service.subtitle);
  };

  const handleDestinationSelect = (destination: any) => {
    Alert.alert('Направление', `Выбрано: ${destination.name}\n${destination.address}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Быстрые действия</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Ionicons name="settings" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Быстрые действия</Text>
          <View style={styles.quickGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickCard}
                onPress={() => handleQuickAction(action.action)}
                activeOpacity={0.8}
              >
                <View style={[styles.quickIcon, { backgroundColor: action.color }]}>
                  <Ionicons name={action.icon as any} size={24} color="#fff" />
                </View>
                <Text style={styles.quickTitle}>{action.title}</Text>
                <Text style={styles.quickSubtitle}>{action.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Типы услуг</Text>
          <View style={styles.servicesList}>
            {services.map((service, index) => (
              <TouchableOpacity
                key={index}
                style={styles.serviceCard}
                onPress={() => handleServiceSelect(service)}
                activeOpacity={0.8}
              >
                <View style={styles.serviceHeader}>
                  <View style={styles.serviceInfo}>
                    <View style={[styles.serviceIcon, { backgroundColor: service.color }]}>
                      <Ionicons name={service.icon as any} size={20} color="#fff" />
                    </View>
                    <View style={styles.serviceText}>
                      <Text style={styles.serviceTitle}>{service.title}</Text>
                      <Text style={styles.serviceSubtitle}>{service.subtitle}</Text>
                    </View>
                  </View>

                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Destinations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Недавние направления</Text>
          <View style={styles.destinationsList}>
            {recentDestinations.map((destination, index) => (
              <TouchableOpacity
                key={index}
                style={styles.destinationCard}
                onPress={() => handleDestinationSelect(destination)}
                activeOpacity={0.8}
              >
                <View style={[styles.destinationIcon, { backgroundColor: destination.color }]}>
                  <Ionicons name={destination.icon as any} size={20} color="#fff" />
                </View>
                <View style={styles.destinationInfo}>
                  <Text style={styles.destinationName}>{destination.name}</Text>
                  <Text style={styles.destinationAddress}>{destination.address}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#ccc" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Promotions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Акции и скидки</Text>
          <View style={styles.promotionCard}>
            <View style={styles.promotionHeader}>
              <View style={styles.promotionIcon}>
                <Ionicons name="gift" size={24} color="#FF6B35" />
              </View>
              <View style={styles.promotionInfo}>
                <Text style={styles.promotionTitle}>Скидка 20%</Text>
                <Text style={styles.promotionSubtitle}>На первую поездку</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.promotionButton}>
              <Text style={styles.promotionButtonText}>Активировать</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Поддержка</Text>
          <View style={styles.supportGrid}>
            <TouchableOpacity style={styles.supportCard}>
              <Ionicons name="help-circle" size={24} color="#007AFF" />
              <Text style={styles.supportText}>Помощь</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.supportCard}>
              <Ionicons name="chatbubble" size={24} color="#27ae60" />
              <Text style={styles.supportText}>Чат</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.supportCard}>
              <Ionicons name="call" size={24} color="#FF9500" />
              <Text style={styles.supportText}>Звонок</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.supportCard}>
              <Ionicons name="mail" size={24} color="#8e44ad" />
              <Text style={styles.supportText}>Email</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  settingsButton: {
    padding: 4,
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    marginBottom: 16,
  },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickCard: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    alignItems: 'center',
  },
  quickIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  quickTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    marginBottom: 4,
  },
  quickSubtitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  servicesList: {
    gap: 12,
  },
  serviceCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  serviceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  serviceText: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  serviceSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },

  destinationsList: {
    gap: 12,
  },
  destinationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
  },
  destinationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  destinationInfo: {
    flex: 1,
  },
  destinationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  destinationAddress: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  promotionCard: {
    backgroundColor: '#fff3e0',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#FFE0B2',
  },
  promotionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  promotionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  promotionInfo: {
    flex: 1,
  },
  promotionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  promotionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  promotionButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  promotionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  supportGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  supportCard: {
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    flex: 1,
    marginHorizontal: 4,
  },
  supportText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222',
    marginTop: 8,
  },
});

export default PlusScreen; 