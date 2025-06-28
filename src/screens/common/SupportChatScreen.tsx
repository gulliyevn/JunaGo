import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { supportService, SupportTicket, SupportMessage } from '../../services/SupportService';

interface SupportChatScreenProps {
  navigation: any;
  route?: {
    params?: {
      initialMessage?: string;
      quickQuestion?: string;
    };
  };
}

const SupportChatScreen: React.FC<SupportChatScreenProps> = ({ navigation, route }) => {
  const { isDark } = useTheme();
  const [currentTicket, setCurrentTicket] = useState<SupportTicket | null>(null);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    // Создаем новый тикет или получаем существующий
    let ticket = supportService.getCurrentTicket();
    
    if (!ticket) {
      const initialMessage = route?.params?.initialMessage || 
                           route?.params?.quickQuestion || 
                           'Здравствуйте! У меня есть вопрос.';
      
      ticket = supportService.createSupportTicket('Поддержка пользователя', initialMessage);
    }
    
    setCurrentTicket(ticket);

    // Подписываемся на обновления тикета
    const interval = setInterval(() => {
      const updatedTicket = supportService.getCurrentTicket();
      if (updatedTicket && updatedTicket.messages.length !== currentTicket?.messages.length) {
        setCurrentTicket(updatedTicket);
        setIsTyping(false);
        // Прокручиваем к последнему сообщению
        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const sendMessage = () => {
    if (!message.trim() || !currentTicket) return;

    supportService.addUserMessage(currentTicket.id, message.trim());
    
    // Симулируем ответ поддержки
    setIsTyping(true);
    supportService.simulateSupportResponse(currentTicket.id, message.trim());
    
    setMessage('');
    
    // Обновляем тикет
    const updatedTicket = supportService.getCurrentTicket();
    setCurrentTicket(updatedTicket);

    // Прокручиваем к последнему сообщению
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const selectQuickQuestion = (question: string) => {
    if (!currentTicket) return;
    
    supportService.addUserMessage(currentTicket.id, question);
    setIsTyping(true);
    supportService.simulateSupportResponse(currentTicket.id, question);
    
    const updatedTicket = supportService.getCurrentTicket();
    setCurrentTicket(updatedTicket);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const handleClose = () => {
    Alert.alert(
      'Завершить чат?',
      'Вы уверены, что хотите завершить чат с поддержкой?',
      [
        { text: 'Отмена', style: 'cancel' },
        { 
          text: 'Завершить', 
          style: 'destructive',
          onPress: () => {
            if (currentTicket) {
              supportService.closeTicket(currentTicket.id);
            }
            navigation.goBack();
          }
        }
      ]
    );
  };

  if (!currentTicket) {
    return (
      <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
        <View style={styles.loadingContainer}>
          <Ionicons name="chatbubbles-outline" size={48} color={isDark ? '#9CA3AF' : '#6B7280'} />
          <Text style={[styles.loadingText, isDark && styles.loadingTextDark]}>
            Подключение к поддержке...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        {/* Header */}
        <View style={[styles.header, isDark && styles.headerDark]}>
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
          
          <View style={styles.headerInfo}>
            <Text style={[styles.headerTitle, isDark && styles.headerTitleDark]}>
              Поддержка FixDrive
            </Text>
            <View style={styles.statusContainer}>
              <View style={styles.onlineIndicator} />
              <Text style={[styles.statusText, isDark && styles.statusTextDark]}>
                Онлайн • Отвечаем быстро
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Ionicons 
              name="close" 
              size={24} 
              color={isDark ? '#9CA3AF' : '#6B7280'} 
            />
          </TouchableOpacity>
        </View>

        {/* Messages */}
        <ScrollView 
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {currentTicket.messages.map((msg, index) => (
            <View
              key={msg.id}
              style={[
                styles.messageContainer,
                msg.sender === 'user' ? styles.userMessage : styles.supportMessage,
              ]}
            >
              <View
                style={[
                  styles.messageBubble,
                  msg.sender === 'user' 
                    ? [styles.userBubble, isDark && styles.userBubbleDark]
                    : [styles.supportBubble, isDark && styles.supportBubbleDark],
                ]}
              >
                {msg.sender === 'support' && (
                  <View style={styles.supportHeader}>
                    <Ionicons name="headset" size={16} color="#1E3A8A" />
                    <Text style={styles.supportName}>Поддержка FixDrive</Text>
                  </View>
                )}
                
                <Text
                  style={[
                    styles.messageText,
                    msg.sender === 'user' 
                      ? styles.userMessageText 
                      : [styles.supportMessageText, isDark && styles.supportMessageTextDark],
                  ]}
                >
                  {msg.text}
                </Text>
                
                <Text
                  style={[
                    styles.messageTime,
                    msg.sender === 'user' 
                      ? styles.userMessageTime 
                      : [styles.supportMessageTime, isDark && styles.supportMessageTimeDark],
                  ]}
                >
                  {formatTime(msg.timestamp)}
                </Text>
              </View>
            </View>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <View style={[styles.messageContainer, styles.supportMessage]}>
              <View style={[styles.messageBubble, styles.supportBubble, isDark && styles.supportBubbleDark]}>
                <View style={styles.typingIndicator}>
                  <View style={styles.typingDot} />
                  <View style={styles.typingDot} />
                  <View style={styles.typingDot} />
                </View>
                <Text style={[styles.typingText, isDark && styles.typingTextDark]}>
                  Поддержка печатает...
                </Text>
              </View>
            </View>
          )}

          {/* Quick Questions */}
          {currentTicket.messages.length <= 2 && (
            <View style={styles.quickQuestionsContainer}>
              <Text style={[styles.quickQuestionsTitle, isDark && styles.quickQuestionsTitleDark]}>
                Популярные вопросы:
              </Text>
              {supportService.getQuickQuestions().map((question, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.quickQuestionButton, isDark && styles.quickQuestionButtonDark]}
                  onPress={() => selectQuickQuestion(question)}
                >
                  <Text style={[styles.quickQuestionText, isDark && styles.quickQuestionTextDark]}>
                    {question}
                  </Text>
                  <Ionicons name="chevron-forward" size={16} color="#1E3A8A" />
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>

        {/* Input */}
        <View style={[styles.inputContainer, isDark && styles.inputContainerDark]}>
          <View style={[styles.inputWrapper, isDark && styles.inputWrapperDark]}>
            <TextInput
              style={[styles.textInput, isDark && styles.textInputDark]}
              placeholder="Напишите сообщение..."
              placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
              value={message}
              onChangeText={setMessage}
              multiline
              maxLength={500}
            />
            <TouchableOpacity
              style={[
                styles.sendButton,
                message.trim() ? styles.sendButtonActive : styles.sendButtonInactive,
              ]}
              onPress={sendMessage}
              disabled={!message.trim()}
            >
              <Ionicons 
                name="send" 
                size={20} 
                color={message.trim() ? '#FFFFFF' : '#9CA3AF'} 
              />
            </TouchableOpacity>
          </View>
        </View>
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
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 16,
  },
  loadingTextDark: {
    color: '#9CA3AF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#FAFAFA',
  },
  headerDark: {
    borderBottomColor: '#374151',
    backgroundColor: '#1F2937',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  headerTitleDark: {
    color: '#F9FAFB',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  onlineIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    color: '#6B7280',
  },
  statusTextDark: {
    color: '#9CA3AF',
  },
  closeButton: {
    padding: 8,
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 100,
  },
  messageContainer: {
    marginVertical: 4,
  },
  userMessage: {
    alignItems: 'flex-end',
  },
  supportMessage: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  userBubble: {
    backgroundColor: '#1E3A8A',
    borderBottomRightRadius: 6,
  },
  userBubbleDark: {
    backgroundColor: '#3B82F6',
  },
  supportBubble: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  supportBubbleDark: {
    backgroundColor: '#374151',
  },
  supportHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  supportName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E3A8A',
    marginLeft: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  supportMessageText: {
    color: '#111827',
  },
  supportMessageTextDark: {
    color: '#F9FAFB',
  },
  messageTime: {
    fontSize: 11,
    marginTop: 4,
  },
  userMessageTime: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  supportMessageTime: {
    color: '#6B7280',
  },
  supportMessageTimeDark: {
    color: '#9CA3AF',
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#6B7280',
    marginHorizontal: 2,
  },
  typingText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
    fontStyle: 'italic',
  },
  typingTextDark: {
    color: '#9CA3AF',
  },
  quickQuestionsContainer: {
    marginTop: 20,
  },
  quickQuestionsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 12,
  },
  quickQuestionsTitleDark: {
    color: '#9CA3AF',
  },
  quickQuestionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  quickQuestionButtonDark: {
    backgroundColor: '#374151',
  },
  quickQuestionText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
  quickQuestionTextDark: {
    color: '#D1D5DB',
  },
  inputContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  inputContainerDark: {
    borderTopColor: '#374151',
    backgroundColor: '#1F2937',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#F3F4F6',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 48,
  },
  inputWrapperDark: {
    backgroundColor: '#374151',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    maxHeight: 100,
    paddingVertical: 8,
  },
  textInputDark: {
    color: '#F9FAFB',
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  sendButtonActive: {
    backgroundColor: '#1E3A8A',
  },
  sendButtonInactive: {
    backgroundColor: '#E5E7EB',
  },
});

export default SupportChatScreen; 