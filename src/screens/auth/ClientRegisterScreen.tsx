import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  Modal,
  Linking
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';

interface ClientRegisterScreenProps {
  navigation: any;
}

const ClientRegisterScreen: React.FC<ClientRegisterScreenProps> = ({ navigation }) => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [agreeToPrivacy, setAgreeToPrivacy] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const handleRegister = async () => {
    const { name, surname, email, phone, password, confirmPassword } = formData;
    
    if (!name || !surname || !email || !phone || !password || !confirmPassword) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все поля');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Ошибка', 'Пароли не совпадают');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Ошибка', 'Пароль должен содержать минимум 6 символов');
      return;
    }

    if (!agreeToTerms || !agreeToPrivacy) {
      Alert.alert('Ошибка', 'Необходимо согласиться с условиями использования и политикой конфиденциальности');
      return;
    }

    setIsLoading(true);
    
    // Симуляция регистрации
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Успех', 'Регистрация завершена! Добро пожаловать в FixDrive!', [
        { text: 'OK', onPress: () => navigation.navigate('Login' as never) }
      ]);
    }, 2000);
  };

  const handleGoogleRegister = () => {
    Alert.alert('Google регистрация', 'Функция регистрации через Google будет добавлена в следующем обновлении');
  };

  const handleFacebookRegister = () => {
    Alert.alert('Facebook регистрация', 'Функция регистрации через Facebook будет добавлена в следующем обновлении');
  };

  const handleQuickFill = () => {
    setFormData({
      name: 'Nicat',
      surname: 'Quliyev',
      email: 'client@fixdrive.com',
      phone: '+994516995513',
      password: 'password123',
      confirmPassword: 'password123'
    });
  };

  const handleSupportChat = () => {
    const whatsappNumber = '+994516995513';
    const message = 'Здравствуйте! У меня вопрос по регистрации клиента в приложении FixDrive.';
    const whatsappUrl = `whatsapp://send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;
    
    Linking.canOpenURL(whatsappUrl)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(whatsappUrl);
        } else {
          // Fallback to web WhatsApp
          const webWhatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
          return Linking.openURL(webWhatsappUrl);
        }
      })
      .catch((err) => {
        console.error('Error opening WhatsApp:', err);
        Alert.alert('Ошибка', 'Не удалось открыть WhatsApp. Попробуйте связаться с нами по телефону: +994516995513');
      });
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons 
                name="arrow-back" 
                size={24} 
                color={isDark ? '#F9FAFB' : '#111827'} 
              />
            </TouchableOpacity>
            <View style={[styles.logoContainer, isDark && styles.logoContainerDark]}>
              <Ionicons name="person-add" size={48} color="#1E3A8A" />
            </View>
            <Text style={[styles.title, isDark && styles.titleDark]}>
              Регистрация клиента
            </Text>
            <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
              Создайте аккаунт для заказа поездок
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputRow}>
              <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }, isDark && styles.inputContainerDark]}>
                <Ionicons 
                  name="person-outline" 
                  size={20} 
                  color={isDark ? '#9CA3AF' : '#666'} 
                  style={styles.inputIcon} 
                />
                <TextInput
                  style={[styles.input, isDark && styles.inputDark]}
                  placeholder="Имя"
                  value={formData.name}
                  onChangeText={(value) => updateFormData('name', value)}
                  placeholderTextColor={isDark ? '#6B7280' : '#999'}
                />
              </View>
              <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }, isDark && styles.inputContainerDark]}>
                <Ionicons 
                  name="person-outline" 
                  size={20} 
                  color={isDark ? '#9CA3AF' : '#666'} 
                  style={styles.inputIcon} 
                />
                <TextInput
                  style={[styles.input, isDark && styles.inputDark]}
                  placeholder="Фамилия"
                  value={formData.surname}
                  onChangeText={(value) => updateFormData('surname', value)}
                  placeholderTextColor={isDark ? '#6B7280' : '#999'}
                />
              </View>
            </View>

            <View style={[styles.inputContainer, isDark && styles.inputContainerDark]}>
              <Ionicons 
                name="mail-outline" 
                size={20} 
                color={isDark ? '#9CA3AF' : '#666'} 
                style={styles.inputIcon} 
              />
              <TextInput
                style={[styles.input, isDark && styles.inputDark]}
                placeholder="Email"
                value={formData.email}
                onChangeText={(value) => updateFormData('email', value)}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor={isDark ? '#6B7280' : '#999'}
              />
            </View>

            <View style={[styles.inputContainer, isDark && styles.inputContainerDark]}>
              <Ionicons 
                name="call-outline" 
                size={20} 
                color={isDark ? '#9CA3AF' : '#666'} 
                style={styles.inputIcon} 
              />
              <TextInput
                style={[styles.input, isDark && styles.inputDark]}
                placeholder="Телефон"
                value={formData.phone}
                onChangeText={(value) => updateFormData('phone', value)}
                keyboardType="phone-pad"
                placeholderTextColor={isDark ? '#6B7280' : '#999'}
              />
            </View>

            <View style={[styles.inputContainer, isDark && styles.inputContainerDark]}>
              <Ionicons 
                name="lock-closed-outline" 
                size={20} 
                color={isDark ? '#9CA3AF' : '#666'} 
                style={styles.inputIcon} 
              />
              <TextInput
                style={[styles.input, isDark && styles.inputDark]}
                placeholder="Пароль"
                value={formData.password}
                onChangeText={(value) => updateFormData('password', value)}
                secureTextEntry={!showPassword}
                placeholderTextColor={isDark ? '#6B7280' : '#999'}
              />
              <TouchableOpacity 
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons 
                  name={showPassword ? "eye-off-outline" : "eye-outline"} 
                  size={20} 
                  color={isDark ? '#9CA3AF' : '#666'} 
                />
              </TouchableOpacity>
            </View>

            <View style={[styles.inputContainer, isDark && styles.inputContainerDark]}>
              <Ionicons 
                name="lock-closed-outline" 
                size={20} 
                color={isDark ? '#9CA3AF' : '#666'} 
                style={styles.inputIcon} 
              />
              <TextInput
                style={[styles.input, isDark && styles.inputDark]}
                placeholder="Подтвердите пароль"
                value={formData.confirmPassword}
                onChangeText={(value) => updateFormData('confirmPassword', value)}
                secureTextEntry={!showConfirmPassword}
                placeholderTextColor={isDark ? '#6B7280' : '#999'}
              />
              <TouchableOpacity 
                style={styles.eyeButton}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Ionicons 
                  name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} 
                  size={20} 
                  color={isDark ? '#9CA3AF' : '#666'} 
                />
              </TouchableOpacity>
            </View>

            {/* Agreement Checkbox */}
            <View style={styles.agreementSection}>
              <TouchableOpacity 
                style={styles.checkboxContainer}
                onPress={() => {
                  const newValue = !(agreeToTerms && agreeToPrivacy);
                  setAgreeToTerms(newValue);
                  setAgreeToPrivacy(newValue);
                }}
              >
                <View style={[styles.checkbox, (agreeToTerms && agreeToPrivacy) && styles.checkboxChecked]}>
                  {(agreeToTerms && agreeToPrivacy) && <Ionicons name="checkmark" size={16} color="#fff" />}
                </View>
                <Text style={[styles.checkboxText, isDark && styles.checkboxTextDark]}>
                  Я согласен с{' '}
                  <Text 
                    style={[styles.linkText, styles.underlineText]}
                    onPress={(e) => {
                      e.stopPropagation();
                      setShowTermsModal(true);
                    }}
                  >
                    Условиями
                  </Text>
                  {' '}и{' '}
                  <Text 
                    style={[styles.linkText, styles.underlineText]}
                    onPress={(e) => {
                      e.stopPropagation();
                      setShowPrivacyModal(true);
                    }}
                  >
                    Политикой Конфиденциальности
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>

            {/* Register Button */}
            <TouchableOpacity 
              style={[
                styles.registerButton, 
                styles.clientRegisterButton,
                isLoading && styles.registerButtonDisabled,
                (!agreeToTerms || !agreeToPrivacy) && styles.registerButtonDisabled
              ]} 
              onPress={handleRegister}
              disabled={isLoading || !agreeToTerms || !agreeToPrivacy}
            >
              <Text style={styles.registerButtonText}>
                {isLoading ? 'Создание аккаунта...' : 'Создать аккаунт'}
              </Text>
              {!isLoading && <Ionicons name="arrow-forward" size={20} color="#fff" />}
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={[styles.dividerLine, isDark && styles.dividerLineDark]} />
              <Text style={[styles.dividerText, isDark && styles.dividerTextDark]}>или</Text>
              <View style={[styles.dividerLine, isDark && styles.dividerLineDark]} />
            </View>

            {/* Social Register Buttons */}
            <View style={styles.socialButtons}>
              <TouchableOpacity 
                style={[styles.socialButton, styles.googleButton, isDark && styles.socialButtonDark]} 
                onPress={handleGoogleRegister}
              >
                <Ionicons name="logo-google" size={24} color="#DB4437" />
                <Text style={[styles.socialButtonText, isDark && styles.socialButtonTextDark]}>
                  Google
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.socialButton, styles.facebookButton, isDark && styles.socialButtonDark]} 
                onPress={handleFacebookRegister}
              >
                <Ionicons name="logo-facebook" size={24} color="#4267B2" />
                <Text style={[styles.socialButtonText, isDark && styles.socialButtonTextDark]}>
                  Facebook
                </Text>
              </TouchableOpacity>
            </View>

            {/* Quick Fill Button */}
            <TouchableOpacity style={styles.quickFillButton} onPress={handleQuickFill}>
              <Text style={[styles.quickFillText, isDark && styles.quickFillTextDark]}>
                Быстрое заполнение
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={[styles.footerText, isDark && styles.footerTextDark]}>
              Уже есть аккаунт? 
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login' as never)}>
              <Text style={styles.linkText}>Войти</Text>
            </TouchableOpacity>
          </View>

          {/* Help Section */}
          <View style={styles.helpSection}>
            <Text style={[styles.helpTitle, isDark && styles.helpTitleDark]}>
              Нужна помощь?
            </Text>
            <TouchableOpacity style={styles.helpButton} onPress={handleSupportChat}>
              <Ionicons
                name="logo-whatsapp"
                size={16}
                color="#25D366"
              />
              <Text style={styles.helpButtonText}>Связаться с поддержкой</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Terms of Service Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showTermsModal}
        onRequestClose={() => setShowTermsModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, isDark && styles.modalContainerDark]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, isDark && styles.modalTitleDark]}>
                Условия использования
              </Text>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setShowTermsModal(false)}
              >
                <Ionicons name="close" size={24} color={isDark ? '#F9FAFB' : '#111827'} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
              <Text style={[styles.modalText, isDark && styles.modalTextDark]}>
                Добро пожаловать в FixDrive!{'\n\n'}
                
                Используя наш сервис, вы соглашаетесь с следующими условиями:{'\n\n'}
                
                1. FixDrive предоставляет услуги по организации персональных поездок{'\n\n'}
                
                2. Вы обязуетесь предоставлять достоверную информацию при регистрации{'\n\n'}
                
                3. Оплата услуг производится через безопасные платежные системы{'\n\n'}
                
                4. Мы гарантируем безопасность ваших поездок и конфиденциальность данных{'\n\n'}
                
                5. В случае отмены поездки менее чем за 30 минут может взиматься штраф{'\n\n'}
                
                6. Мы оставляем за собой право изменять условия с уведомлением пользователей{'\n\n'}
                
                Полная версия условий доступна на нашем сайте.
              </Text>
            </ScrollView>
            <TouchableOpacity
              style={[styles.modalButton, styles.clientModalButton]}
              onPress={() => setShowTermsModal(false)}
            >
              <Text style={styles.modalButtonText}>Понятно</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Privacy Policy Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showPrivacyModal}
        onRequestClose={() => setShowPrivacyModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, isDark && styles.modalContainerDark]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, isDark && styles.modalTitleDark]}>
                Политика конфиденциальности
              </Text>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setShowPrivacyModal(false)}
              >
                <Ionicons name="close" size={24} color={isDark ? '#F9FAFB' : '#111827'} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
              <Text style={[styles.modalText, isDark && styles.modalTextDark]}>
                📜 Privacy Policy FixDrive{'\n\n'}
                
                1️⃣ Кто мы{'\n'}
                FixDrive — сервис персональных водителей по расписанию.{'\n'}
                Официальный оператор данных: FixDrive LLC, support@fixdrive.com{'\n\n'}
                
                2️⃣ Какие данные мы собираем{'\n'}
                ✅ Данные профиля: имя, номер телефона, email, платёжная информация{'\n'}
                ✅ Данные поездок: даты, время бронирования, маршрут (геолокация){'\n'}
                ✅ Данные устройств: IP-адрес, модель телефона, операционная система{'\n'}
                ✅ Логи взаимодействия: клики, бронирования, история отмен{'\n'}
                ✅ Данные водителей: рейтинг, количество выполненных поездок{'\n\n'}
                
                3️⃣ Для чего мы используем данные{'\n'}
                • Для предоставления сервиса FixDrive: бронирование и выполнение поездок{'\n'}
                • Для улучшения качества сервиса и персональных рекомендаций (ML){'\n'}
                • Для связи с клиентом (уведомления о поездке, чаты){'\n'}
                • Для аналитики и исследования спроса (анонимно){'\n'}
                • Для соблюдения закона и защиты прав всех сторон{'\n\n'}
                
                4️⃣ С кем мы делимся данными{'\n'}
                • С водителями FixDrive: только имя и контакт для связи по заказу{'\n'}
                • С платёжными системами (Stripe) — для обработки оплаты{'\n'}
                • С государственными органами — только по требованию закона{'\n'}
                • С партнёрами — только агрегированные данные без идентификации личности{'\n\n'}
                
                5️⃣ Как мы защищаем данные{'\n'}
                • Используем HTTPS, шифрование и аутентификацию доступа{'\n'}
                • Храним данные только на защищённых серверах{'\n'}
                • Доступ к полным данным имеют только уполномоченные сотрудники{'\n\n'}
                
                6️⃣ Хранение данных{'\n'}
                Мы храним ваши данные не дольше, чем это необходимо для целей обработки или согласно закону.{'\n'}
                При необходимости вы можете запросить удаление данных, написав нам: support@fixdrive.com{'\n\n'}
                
                7️⃣ Ваши права{'\n'}
                • Право знать, что мы храним{'\n'}
                • Право запросить копию ваших данных{'\n'}
                • Право исправить или удалить данные{'\n'}
                • Право отозвать согласие на обработку{'\n\n'}
                
                8️⃣ Контакты{'\n'}
                По любым вопросам пишите: support@fixdrive.com, +994516995513{'\n\n'}
                
                Обновлено: Декабрь 2024
              </Text>
            </ScrollView>
            <TouchableOpacity
              style={[styles.modalButton, styles.clientModalButton]}
              onPress={() => setShowPrivacyModal(false)}
            >
              <Text style={styles.modalButtonText}>Понятно</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  containerDark: {
    backgroundColor: '#111827',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 8,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  logoContainerDark: {
    backgroundColor: '#374151',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  titleDark: {
    color: '#F9FAFB',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  subtitleDark: {
    color: '#9CA3AF',
  },
  form: {
    marginBottom: 30,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  inputContainerDark: {
    backgroundColor: '#374151',
    borderColor: '#4B5563',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  inputDark: {
    color: '#F9FAFB',
  },
  eyeButton: {
    padding: 4,
  },
  registerButton: {
    backgroundColor: '#1E3A8A',
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#1E3A8A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  registerButtonDisabled: {
    opacity: 0.7,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dividerLineDark: {
    backgroundColor: '#4B5563',
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  dividerTextDark: {
    color: '#9CA3AF',
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  socialButtonDark: {
    backgroundColor: '#374151',
    borderColor: '#4B5563',
  },
  googleButton: {
    marginRight: 8,
  },
  facebookButton: {
    marginLeft: 8,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginLeft: 8,
  },
  socialButtonTextDark: {
    color: '#D1D5DB',
  },
  quickFillButton: {
    alignItems: 'center',
    marginTop: 8,
  },
  quickFillText: {
    color: '#1E3A8A',
    fontSize: 14,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  quickFillTextDark: {
    color: '#60A5FA',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  footerText: {
    color: '#6B7280',
    fontSize: 16,
  },
  footerTextDark: {
    color: '#9CA3AF',
  },
  linkText: {
    color: '#1E3A8A',
    fontSize: 16,
    fontWeight: '600',
  },
  underlineText: {
    textDecorationLine: 'underline',
  },
  helpSection: {
    alignItems: 'center',
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  helpTitleDark: {
    color: '#D1D5DB',
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  helpButtonText: {
    color: '#1E3A8A',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
  },
  // Agreement Section Styles
  agreementSection: {
    marginBottom: 24,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: '#27ae60',
    borderColor: '#27ae60',
  },
  checkboxText: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  checkboxTextDark: {
    color: '#D1D5DB',
  },
  // Client Button Color
  clientRegisterButton: {
    backgroundColor: '#27ae60',
    shadowColor: '#27ae60',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: '100%',
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  modalContainerDark: {
    backgroundColor: '#1F2937',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    flex: 1,
  },
  modalTitleDark: {
    color: '#F9FAFB',
  },
  modalCloseButton: {
    padding: 4,
  },
  modalContent: {
    padding: 20,
    maxHeight: 400,
  },
  modalText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 22,
  },
  modalTextDark: {
    color: '#D1D5DB',
  },
  modalButton: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    margin: 20,
    marginTop: 0,
  },
  clientModalButton: {
    backgroundColor: '#27ae60',
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ClientRegisterScreen;
