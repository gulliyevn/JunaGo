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
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

interface ForgotPasswordScreenProps {
  navigation: any;
}

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { isDark } = useTheme();

  const handleSendResetEmail = async () => {
    if (!email) {
      Alert.alert('Ошибка', 'Пожалуйста, введите ваш email');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Ошибка', 'Пожалуйста, введите корректный email адрес');
      return;
    }

    setIsLoading(true);
    
    // Симуляция отправки email
    setTimeout(() => {
      setIsLoading(false);
      setEmailSent(true);
      Alert.alert(
        'Email отправлен',
        'Мы отправили инструкции по восстановлению пароля на ваш email адрес.',
        [{ text: 'OK' }]
      );
    }, 2000);
  };

  const handleBackToLogin = () => {
    navigation.goBack();
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
            <TouchableOpacity style={styles.backButton} onPress={handleBackToLogin}>
              <Ionicons
                name="arrow-back"
                size={24}
                color={isDark ? '#F9FAFB' : '#111827'}
              />
            </TouchableOpacity>
            
            <View style={[styles.iconContainer, isDark && styles.iconContainerDark]}>
              <Ionicons name="lock-closed" size={48} color="#1E3A8A" />
            </View>
            
            <Text style={[styles.title, isDark && styles.titleDark]}>
              Забыли пароль?
            </Text>
            <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
              Не волнуйтесь! Введите ваш email адрес и мы отправим вам ссылку для восстановления пароля.
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={[styles.inputContainer, isDark && styles.inputContainerDark]}>
              <Ionicons
                name="mail-outline"
                size={20}
                color={isDark ? '#9CA3AF' : '#666'}
                style={styles.inputIcon}
              />
              <TextInput
                style={[styles.input, isDark && styles.inputDark]}
                placeholder="Введите ваш email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor={isDark ? '#6B7280' : '#999'}
                editable={!emailSent}
              />
              {emailSent && (
                <Ionicons name="checkmark-circle" size={20} color="#10B981" />
              )}
            </View>

            <TouchableOpacity
              style={[
                styles.sendButton,
                isLoading && styles.sendButtonDisabled,
                emailSent && styles.sendButtonSuccess,
              ]}
              onPress={handleSendResetEmail}
              disabled={isLoading || emailSent}
            >
              <Text style={styles.sendButtonText}>
                {isLoading
                  ? 'Отправка...'
                  : emailSent
                  ? 'Email отправлен'
                  : 'Отправить ссылку для восстановления'}
              </Text>
              {!isLoading && !emailSent && (
                <Ionicons name="send" size={20} color="#FFFFFF" />
              )}
              {emailSent && <Ionicons name="checkmark" size={20} color="#FFFFFF" />}
            </TouchableOpacity>

            {emailSent && (
              <View style={[styles.successMessage, isDark && styles.successMessageDark]}>
                <Ionicons name="mail" size={24} color="#10B981" />
                <Text style={[styles.successText, isDark && styles.successTextDark]}>
                  Проверьте вашу почту
                </Text>
                <Text style={[styles.successSubtext, isDark && styles.successSubtextDark]}>
                  Мы отправили инструкции по восстановлению пароля на {email}
                </Text>
              </View>
            )}
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={[styles.footerText, isDark && styles.footerTextDark]}>
              Вспомнили пароль?{' '}
            </Text>
            <TouchableOpacity onPress={handleBackToLogin}>
              <Text style={styles.linkText}>Войти</Text>
            </TouchableOpacity>
          </View>

          {/* Help Section */}
          <View style={styles.helpSection}>
            <Text style={[styles.helpTitle, isDark && styles.helpTitleDark]}>
              Нужна помощь?
            </Text>
            <TouchableOpacity style={styles.helpButton} onPress={() => {
              const whatsappNumber = '+994516995513';
              const message = 'Здравствуйте! Мне нужна помощь с восстановлением пароля в приложении FixDrive.';
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
            }}>
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
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: 8,
    marginBottom: 20,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
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
  iconContainerDark: {
    backgroundColor: '#374151',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
    textAlign: 'center',
  },
  titleDark: {
    color: '#F9FAFB',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  subtitleDark: {
    color: '#9CA3AF',
  },
  form: {
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    marginBottom: 24,
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
  sendButton: {
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
  sendButtonDisabled: {
    opacity: 0.7,
  },
  sendButtonSuccess: {
    backgroundColor: '#10B981',
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  successMessage: {
    backgroundColor: '#F0FDF4',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  successMessageDark: {
    backgroundColor: '#064E3B',
    borderColor: '#065F46',
  },
  successText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#059669',
    marginTop: 8,
    marginBottom: 4,
  },
  successTextDark: {
    color: '#34D399',
  },
  successSubtext: {
    fontSize: 14,
    color: '#047857',
    textAlign: 'center',
    lineHeight: 20,
  },
  successSubtextDark: {
    color: '#6EE7B7',
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
    color: '#25D366',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
  },
});

export default ForgotPasswordScreen;
