import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  ScrollView
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const RoleSelectScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleRoleSelect = (role: 'client' | 'driver') => {
    if (role === 'client') {
      navigation.navigate('ClientRegister' as never);
    } else {
      navigation.navigate('DriverRegister' as never);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Ionicons name="car-sport" size={60} color="#27ae60" />
          </View>
          <Text style={styles.title}>FixDrive</Text>
          <Text style={styles.subtitle}>Выберите тип аккаунта</Text>
        </View>

        {/* Role Cards */}
        <View style={styles.cardsContainer}>
          {/* Client Card */}
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => handleRoleSelect('client')}
            activeOpacity={0.8}
          >
            <View style={styles.cardIconContainer}>
              <Ionicons name="person-outline" size={40} color="#27ae60" />
            </View>
            <Text style={styles.cardTitle}>Клиент</Text>
            <Text style={styles.cardDescription}>
              Заказывайте поездки для себя и своих детей
            </Text>
            <View style={styles.cardFeatures}>
              <View style={styles.feature}>
                <Ionicons name="checkmark-circle" size={16} color="#27ae60" />
                <Text style={styles.featureText}>Безопасные поездки</Text>
              </View>
              <View style={styles.feature}>
                <Ionicons name="checkmark-circle" size={16} color="#27ae60" />
                <Text style={styles.featureText}>Отслеживание в реальном времени</Text>
              </View>
              <View style={styles.feature}>
                <Ionicons name="checkmark-circle" size={16} color="#27ae60" />
                <Text style={styles.featureText}>Удобная оплата</Text>
              </View>
            </View>
            <View style={[styles.cardButton, styles.clientButton]}>
              <Text style={styles.cardButtonText}>Выбрать</Text>
              <Ionicons name="arrow-forward" size={16} color="#fff" />
            </View>
          </TouchableOpacity>

          {/* Driver Card */}
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => handleRoleSelect('driver')}
            activeOpacity={0.8}
          >
            <View style={styles.cardIconContainer}>
              <MaterialIcons name="directions-car" size={40} color="#1E3A8A" />
            </View>
            <Text style={styles.cardTitle}>Водитель</Text>
            <Text style={styles.cardDescription}>
              Зарабатывайте, предоставляя услуги перевозки
            </Text>
            <View style={styles.cardFeatures}>
              <View style={styles.feature}>
                <Ionicons name="checkmark-circle" size={16} color="#1E3A8A" />
                <Text style={styles.featureText}>Гибкий график работы</Text>
              </View>
              <View style={styles.feature}>
                <Ionicons name="checkmark-circle" size={16} color="#1E3A8A" />
                <Text style={styles.featureText}>Высокий доход</Text>
              </View>
              <View style={styles.feature}>
                <Ionicons name="checkmark-circle" size={16} color="#1E3A8A" />
                <Text style={styles.featureText}>Поддержка 24/7</Text>
              </View>
            </View>
            <View style={[styles.cardButton, styles.driverButton]}>
              <Text style={styles.cardButtonText}>Выбрать</Text>
              <Ionicons name="arrow-forward" size={16} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Уже есть аккаунт? 
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login' as never)}>
            <Text style={styles.linkText}> Войти</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  cardsContainer: {
    flex: 1,
    gap: 20,
  },
  card: {
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
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  cardIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    alignSelf: 'center',
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  cardFeatures: {
    marginBottom: 24,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#444',
    marginLeft: 8,
  },
  cardButton: {
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    paddingBottom: 20,
  },
  footerText: {
    color: '#666',
    fontSize: 16,
  },
  linkText: {
    color: '#1E3A8A',
    fontSize: 16,
    fontWeight: '600',
  },
  clientButton: {
    backgroundColor: '#10B981',
  },
  driverButton: {
    backgroundColor: '#1E3A8A',
  },
});

export default RoleSelectScreen;
