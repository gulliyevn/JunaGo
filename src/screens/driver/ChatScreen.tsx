import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  TextInput, 
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

interface Message {
  id: string;
  text: string;
  timestamp: Date;
  isFromUser: boolean;
  senderName: string;
  senderAvatar?: string;
}

interface Chat {
  id: string;
  clientId: string;
  clientName: string;
  clientAvatar?: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  isActive: boolean;
}

const DriverChatScreen: React.FC = () => {
  const { logout } = useAuth();
  const { isDark } = useTheme();
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  // Mock данные чатов
  useEffect(() => {
    const mockChats: Chat[] = [
      {
        id: '1',
        clientId: '1',
        clientName: 'Анна Иванова',
        clientAvatar: 'https://randomuser.me/api/portraits/women/1.jpg',
        lastMessage: 'Я уже выхожу, подождите немного',
        lastMessageTime: new Date(Date.now() - 3 * 60 * 1000), // 3 минуты назад
        unreadCount: 1,
        isActive: true,
      },
      {
        id: '2',
        clientId: '2',
        clientName: 'Петр Сидоров',
        clientAvatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        lastMessage: 'Спасибо за поездку!',
        lastMessageTime: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 час назад
        unreadCount: 0,
        isActive: false,
      },
      {
        id: '3',
        clientId: '3',
        clientName: 'Мария Козлова',
        clientAvatar: 'https://randomuser.me/api/portraits/women/2.jpg',
        lastMessage: 'Буду ждать у подъезда',
        lastMessageTime: new Date(Date.now() - 15 * 60 * 1000), // 15 минут назад
        unreadCount: 2,
        isActive: true,
      },
    ];
    setChats(mockChats);
  }, []);

  // Mock сообщения для выбранного чата
  useEffect(() => {
    if (selectedChat) {
      const mockMessages: Message[] = [
        {
          id: '1',
          text: 'Здравствуйте! Я ваш водитель',
          timestamp: new Date(Date.now() - 20 * 60 * 1000),
          isFromUser: true,
          senderName: 'Вы',
        },
        {
          id: '2',
          text: 'Здравствуйте! Я уже выхожу',
          timestamp: new Date(Date.now() - 19 * 60 * 1000),
          isFromUser: false,
          senderName: selectedChat.clientName,
          senderAvatar: selectedChat.clientAvatar,
        },
        {
          id: '3',
          text: 'Отлично! Я подъеду к подъезду',
          timestamp: new Date(Date.now() - 18 * 60 * 1000),
          isFromUser: true,
          senderName: 'Вы',
        },
        {
          id: '4',
          text: 'Я уже выхожу, подождите немного',
          timestamp: new Date(Date.now() - 3 * 60 * 1000),
          isFromUser: false,
          senderName: selectedChat.clientName,
          senderAvatar: selectedChat.clientAvatar,
        },
      ];
      setMessages(mockMessages);
    }
  }, [selectedChat]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage.trim(),
      timestamp: new Date(),
      isFromUser: true,
      senderName: 'Вы',
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Обновляем последнее сообщение в чате
    setChats(prev => prev.map(chat => 
      chat.id === selectedChat.id 
        ? { ...chat, lastMessage: newMessage.trim(), lastMessageTime: new Date(), unreadCount: 0 }
        : chat
    ));
  };

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

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Сейчас';
    if (minutes < 60) return `${minutes} мин`;
    if (hours < 24) return `${hours} ч`;
    if (days < 7) return `${days} дн`;
    return date.toLocaleDateString();
  };

  const renderChatItem = ({ item }: { item: Chat }) => (
    <TouchableOpacity 
      style={[styles.chatItem, { backgroundColor: isDark ? '#333' : '#fff' }]}
      onPress={() => setSelectedChat(item)}
    >
      <Image 
        source={{ uri: item.clientAvatar }} 
        style={styles.avatar}
        defaultSource={{ uri: 'https://randomuser.me/api/portraits/women/1.jpg' }}
      />
      <View style={styles.chatInfo}>
        <View style={styles.chatHeader}>
          <Text style={[styles.clientName, { color: isDark ? '#fff' : '#000' }]}>
            {item.clientName}
          </Text>
          <Text style={[styles.timeText, { color: isDark ? '#ccc' : '#666' }]}>
            {formatTime(item.lastMessageTime)}
          </Text>
        </View>
        <View style={styles.chatFooter}>
          <Text 
            style={[styles.lastMessage, { color: isDark ? '#ccc' : '#666' }]}
            numberOfLines={1}
          >
            {item.lastMessage}
          </Text>
          {item.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{item.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[
      styles.messageContainer,
      item.isFromUser ? styles.userMessage : styles.clientMessage
    ]}>
      {!item.isFromUser && (
        <Image 
          source={{ uri: item.senderAvatar }} 
          style={styles.messageAvatar}
          defaultSource={{ uri: 'https://randomuser.me/api/portraits/women/1.jpg' }}
        />
      )}
      <View style={[
        styles.messageBubble,
        { backgroundColor: item.isFromUser ? '#007AFF' : (isDark ? '#555' : '#f0f0f0') }
      ]}>
        <Text style={[
          styles.messageText,
          { color: item.isFromUser ? '#fff' : (isDark ? '#fff' : '#000') }
        ]}>
          {item.text}
        </Text>
        <Text style={[
          styles.messageTime,
          { color: item.isFromUser ? '#rgba(255,255,255,0.7)' : (isDark ? '#ccc' : '#666') }
        ]}>
          {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    </View>
  );

  if (selectedChat) {
    return (
      <KeyboardAvoidingView 
        style={[styles.container, { backgroundColor: isDark ? '#000' : '#f5f5f5' }]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Заголовок чата */}
        <View style={[styles.chatHeaderContainer, { backgroundColor: isDark ? '#333' : '#fff' }]}>
          <TouchableOpacity onPress={() => setSelectedChat(null)} style={styles.backButton}>
            <Text style={[styles.backButtonText, { color: '#007AFF' }]}>← Назад</Text>
          </TouchableOpacity>
          <View style={styles.chatTitleContainer}>
            <Image 
              source={{ uri: selectedChat.clientAvatar }} 
              style={styles.chatTitleAvatar}
              defaultSource={{ uri: 'https://randomuser.me/api/portraits/women/1.jpg' }}
            />
            <Text style={[styles.chatTitle, { color: isDark ? '#fff' : '#000' }]}>
              {selectedChat.clientName}
            </Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Выйти</Text>
          </TouchableOpacity>
        </View>

        {/* Сообщения */}
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          style={styles.messagesList}
          inverted
        />

        {/* Поле ввода */}
        <View style={[styles.inputContainer, { backgroundColor: isDark ? '#333' : '#fff' }]}>
          <TextInput
            style={[styles.input, { 
              backgroundColor: isDark ? '#555' : '#f0f0f0',
              color: isDark ? '#fff' : '#000'
            }]}
            placeholder="Введите сообщение..."
            placeholderTextColor={isDark ? '#ccc' : '#666'}
            value={newMessage}
            onChangeText={setNewMessage}
            multiline
          />
          <TouchableOpacity 
            style={[styles.sendButton, { backgroundColor: newMessage.trim() ? '#007AFF' : '#ccc' }]}
            onPress={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            <Text style={styles.sendButtonText}>→</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000' : '#f5f5f5' }]}>
      {/* Заголовок */}
      <View style={[styles.header, { backgroundColor: isDark ? '#333' : '#fff' }]}>
        <Text style={[styles.headerTitle, { color: isDark ? '#fff' : '#000' }]}>
          Чаты с клиентами
        </Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Выйти</Text>
        </TouchableOpacity>
      </View>

      {/* Список чатов */}
      <FlatList
        data={chats}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatsList}
        showsVerticalScrollIndicator={false}
      />
    </View>
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
  chatsList: {
    padding: 15,
  },
  chatItem: {
    flexDirection: 'row',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  chatInfo: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  clientName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  timeText: {
    fontSize: 12,
  },
  chatFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    flex: 1,
    fontSize: 14,
    marginRight: 10,
  },
  unreadBadge: {
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  chatHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    paddingHorizontal: 10,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  chatTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  chatTitleAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  chatTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  messagesList: {
    flex: 1,
    paddingHorizontal: 15,
  },
  messageContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'flex-end',
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  clientMessage: {
    justifyContent: 'flex-start',
  },
  messageAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 18,
  },
  messageText: {
    fontSize: 16,
    marginBottom: 5,
  },
  messageTime: {
    fontSize: 12,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  input: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    maxHeight: 100,
    marginRight: 10,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DriverChatScreen;
