import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Alert
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import ProgressBar from '../../components/ProgressBar';

const ProgressScreen: React.FC = () => {
  const { logout } = useAuth();
  const { isDark } = useTheme();

  const handleLogout = () => {
    Alert.alert(
      'Выход',
      'Вы уверены, что хотите выйти?',
      [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Выйти', onPress: logout, style: 'destructive' }
      ]
    );
  };

  const progressData = [
    { label: 'Структура проекта', progress: 100, color: '#34C759' },
    { label: 'Зависимости', progress: 100, color: '#34C759' },
    { label: 'Контексты (Theme, Auth, Profile)', progress: 100, color: '#34C759' },
    { label: 'Навигация', progress: 100, color: '#34C759' },
    { label: 'Аутентификация', progress: 100, color: '#34C759' },
    { label: 'Экраны клиента', progress: 100, color: '#34C759' },
    { label: 'Экраны водителя', progress: 100, color: '#34C759' },
    { label: 'Компоненты UI', progress: 90, color: '#FF9500' },
    { label: 'Темная/светлая тема', progress: 100, color: '#34C759' },
    { label: 'Mock данные', progress: 100, color: '#34C759' },
    { label: 'Интеграция с API', progress: 20, color: '#FF3B30' },
    { label: 'MapTiler интеграция', progress: 10, color: '#FF3B30' },
    { label: 'WebSocket для чата', progress: 15, color: '#FF3B30' },
    { label: 'Тестирование', progress: 30, color: '#FF9F0A' },
    { label: 'Оптимизация', progress: 40, color: '#FF9F0A' },
    { label: 'Деплой', progress: 5, color: '#FF3B30' },
  ];

  const overallProgress = Math.round(
    progressData.reduce((sum, item) => sum + item.progress, 0) / progressData.length
  );

  const completedTasks = progressData.filter(item => item.progress === 100).length;
  const totalTasks = progressData.length;

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? '#000' : '#f5f5f5' }]}>
      {/* Заголовок */}
      <View style={[styles.header, { backgroundColor: isDark ? '#333' : '#fff' }]}>
        <Text style={[styles.headerTitle, { color: isDark ? '#fff' : '#000' }]}>
          Прогресс разработки
        </Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Выйти</Text>
        </TouchableOpacity>
      </View>

      {/* Общий прогресс */}
      <View style={[styles.overallSection, { backgroundColor: isDark ? '#333' : '#fff' }]}>
        <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#000' }]}>
          Общий прогресс
        </Text>
        <ProgressBar 
          progress={overallProgress} 
          label={`Завершено ${completedTasks}/${totalTasks} задач`}
        />
        <Text style={[styles.overallText, { color: isDark ? '#ccc' : '#666' }]}>
          FixDrive v1.0.0 • {overallProgress}% готово
        </Text>
      </View>

      {/* Детальный прогресс */}
      <View style={[styles.detailsSection, { backgroundColor: isDark ? '#333' : '#fff' }]}>
        <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#000' }]}>
          Детальный прогресс
        </Text>
        
        {progressData.map((item, index) => (
          <View key={index} style={styles.progressItem}>
            <ProgressBar 
              progress={item.progress} 
              label={item.label}
            />
            <View style={styles.statusContainer}>
              <View style={[styles.statusDot, { backgroundColor: item.color }]} />
              <Text style={[styles.statusText, { color: isDark ? '#ccc' : '#666' }]}>
                {item.progress === 100 ? 'Завершено' : 
                 item.progress >= 60 ? 'В процессе' : 
                 item.progress >= 20 ? 'Начато' : 'Планируется'}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Статистика */}
      <View style={[styles.statsSection, { backgroundColor: isDark ? '#333' : '#fff' }]}>
        <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#000' }]}>
          Статистика
        </Text>
        
        <View style={styles.statsGrid}>
          <View style={[styles.statCard, { backgroundColor: isDark ? '#555' : '#f0f0f0' }]}>
            <Text style={[styles.statValue, { color: isDark ? '#fff' : '#000' }]}>
              {completedTasks}
            </Text>
            <Text style={[styles.statLabel, { color: isDark ? '#ccc' : '#666' }]}>
              Завершено
            </Text>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: isDark ? '#555' : '#f0f0f0' }]}>
            <Text style={[styles.statValue, { color: isDark ? '#fff' : '#000' }]}>
              {totalTasks - completedTasks}
            </Text>
            <Text style={[styles.statLabel, { color: isDark ? '#ccc' : '#666' }]}>
              Осталось
            </Text>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: isDark ? '#555' : '#f0f0f0' }]}>
            <Text style={[styles.statValue, { color: isDark ? '#fff' : '#000' }]}>
              {overallProgress}%
            </Text>
            <Text style={[styles.statLabel, { color: isDark ? '#ccc' : '#666' }]}>
              Готовность
            </Text>
          </View>
        </View>
      </View>

      {/* Следующие шаги */}
      <View style={[styles.nextStepsSection, { backgroundColor: isDark ? '#333' : '#fff' }]}>
        <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#000' }]}>
          Следующие шаги
        </Text>
        
        <View style={styles.stepsList}>
          <View style={styles.stepItem}>
            <Text style={styles.stepNumber}>1</Text>
            <Text style={[styles.stepText, { color: isDark ? '#fff' : '#000' }]}>
              Интеграция с реальными API
            </Text>
          </View>
          
          <View style={styles.stepItem}>
            <Text style={styles.stepNumber}>2</Text>
            <Text style={[styles.stepText, { color: isDark ? '#fff' : '#000' }]}>
              Настройка MapTiler для карт
            </Text>
          </View>
          
          <View style={styles.stepItem}>
            <Text style={styles.stepNumber}>3</Text>
            <Text style={[styles.stepText, { color: isDark ? '#fff' : '#000' }]}>
              WebSocket для реального чата
            </Text>
          </View>
          
          <View style={styles.stepItem}>
            <Text style={styles.stepNumber}>4</Text>
            <Text style={[styles.stepText, { color: isDark ? '#fff' : '#000' }]}>
              Тестирование и оптимизация
            </Text>
          </View>
          
          <View style={styles.stepItem}>
            <Text style={styles.stepNumber}>5</Text>
            <Text style={[styles.stepText, { color: isDark ? '#fff' : '#000' }]}>
              Деплой в продакшен
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
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
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 6,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  overallSection: {
    margin: 15,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  overallText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
  detailsSection: {
    margin: 15,
    marginTop: 0,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  progressItem: {
    marginBottom: 15,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 12,
  },
  statsSection: {
    margin: 15,
    marginTop: 0,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  nextStepsSection: {
    margin: 15,
    marginTop: 0,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  stepsList: {
    marginTop: 10,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#007AFF',
    color: '#fff',
    textAlign: 'center',
    lineHeight: 24,
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 12,
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  },
});

export default ProgressScreen; 