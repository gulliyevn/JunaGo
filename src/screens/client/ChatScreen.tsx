import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Message {
  id: string;
  text: string;
  isFromUser: boolean;
  timestamp: string;
  sender: string;
}

interface Chat {
  id: string;
  driverName: string;
  driverAvatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
}

const ChatScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const chats: Chat[] = [
    {
      id: '1',
      driverName: 'Александр Петров',
      driverAvatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      lastMessage: 'Приеду через 5 минут',
      timestamp: '14:30',
      unreadCount: 2,
      isOnline: true
    },
    {
      id: '2',
      driverName: 'Иван Сидоров',
      driverAvatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      lastMessage: 'Спасибо за поездку!',
      timestamp: '12:15',
      unreadCount: 0,
      isOnline: false
    },
    {
      id: '3',
      driverName: 'Петр Козлов',
      driverAvatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      lastMessage: 'Где вас забрать?',
      timestamp: '10:45',
      unreadCount: 1,
      isOnline: true
    }
  ];

  const mockMessages: Message[] = [
    {
      id: '1',
      text: 'Здравствуйте! Я ваш водитель',
      isFromUser: false,
      timestamp: '14:25',
      sender: 'Александр Петров'
    },
    {
      id: '2',
      text: 'Привет! Я уже на месте',
      isFromUser: true,
      timestamp: '14:26',
      sender: 'Вы'
    },
    {
      id: '3',
      text: 'Приеду через 5 минут',
      isFromUser: false,
      timestamp: '14:30',
      sender: 'Александр Петров'
    }
  ];

  const handleChatSelect = (chat: Chat) => {
    setSelectedChat(chat);
    setMessages(mockMessages);
  };

  const handleSendMessage = () => {
    if (!messageText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isFromUser: true,
      timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      sender: 'Вы'
    };

    setMessages(prev => [...prev, newMessage]);
    setMessageText('');

    // Mock response
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Понял, скоро буду!',
        isFromUser: false,
        timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        sender: selectedChat?.driverName || 'Водитель'
      };
      setMessages(prev => [...prev, response]);
    }, 1000);
  };

  const handleBackToChats = () => {
    setSelectedChat(null);
    setMessages([]);
  };

  if (selectedChat) {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          {/* Chat Header */}
          <View style={styles.chatHeader}>
            <TouchableOpacity style={styles.backButton} onPress={handleBackToChats}>
              <Ionicons name="arrow-back" size={24} color="#222" />
            </TouchableOpacity>
            <View style={styles.chatInfo}>
              <View style={styles.chatAvatar}>
                <Ionicons name="person" size={24} color="#fff" />
              </View>
              <View style={styles.chatDetails}>
                <Text style={styles.chatName}>{selectedChat.driverName}</Text>
                <View style={styles.chatStatus}>
                  <View style={[
                    styles.statusIndicator,
                    { backgroundColor: selectedChat.isOnline ? '#27ae60' : '#ccc' }
                  ]} />
                  <Text style={styles.statusText}>
                    {selectedChat.isOnline ? 'Онлайн' : 'Офлайн'}
                  </Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.callButton}>
              <Ionicons name="call" size={24} color="#27ae60" />
            </TouchableOpacity>
          </View>

          {/* Messages */}
          <ScrollView style={styles.messagesContainer} showsVerticalScrollIndicator={false}>
            {messages.map((message) => (
              <View
                key={message.id}
                style={[
                  styles.messageContainer,
                  message.isFromUser ? styles.userMessage : styles.driverMessage
                ]}
              >
                <View style={[
                  styles.messageBubble,
                  message.isFromUser ? styles.userBubble : styles.driverBubble
                ]}>
                  <Text style={[
                    styles.messageText,
                    message.isFromUser ? styles.userMessageText : styles.driverMessageText
                  ]}>
                    {message.text}
                  </Text>
                  <Text style={[
                    styles.messageTime,
                    message.isFromUser ? styles.userMessageTime : styles.driverMessageTime
                  ]}>
                    {message.timestamp}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Message Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.messageInput}
              placeholder="Введите сообщение..."
              value={messageText}
              onChangeText={setMessageText}
              multiline
              placeholderTextColor="#999"
            />
            <TouchableOpacity 
              style={[
                styles.sendButton,
                !messageText.trim() && styles.sendButtonDisabled
              ]}
              onPress={handleSendMessage}
              disabled={!messageText.trim()}
            >
              <Ionicons 
                name="send" 
                size={20} 
                color={messageText.trim() ? '#fff' : '#ccc'} 
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Чаты</Text>
        <TouchableOpacity style={styles.newChatButton}>
          <Ionicons name="add" size={24} color="#27ae60" />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInput}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.input}
            placeholder="Поиск чатов..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
        </View>
      </View>

      {/* Chats List */}
      <ScrollView style={styles.chatsList} showsVerticalScrollIndicator={false}>
        {chats.map((chat) => (
          <TouchableOpacity
            key={chat.id}
            style={styles.chatCard}
            onPress={() => handleChatSelect(chat)}
            activeOpacity={0.8}
          >
            <View style={styles.chatAvatar}>
              <Ionicons name="person" size={24} color="#fff" />
              {chat.isOnline && <View style={styles.onlineIndicator} />}
            </View>
            <View style={styles.chatContent}>
              <View style={styles.chatHeader}>
                <Text style={styles.chatName}>{chat.driverName}</Text>
                <Text style={styles.chatTime}>{chat.timestamp}</Text>
              </View>
              <View style={styles.chatFooter}>
                <Text style={styles.lastMessage} numberOfLines={1}>
                  {chat.lastMessage}
                </Text>
                {chat.unreadCount > 0 && (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadCount}>{chat.unreadCount}</Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardView: {
    flex: 1,
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
  newChatButton: {
    padding: 4,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
  },
  searchIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#222',
  },
  chatsList: {
    flex: 1,
  },
  chatCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  chatAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#27ae60',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    position: 'relative',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#27ae60',
    borderWidth: 2,
    borderColor: '#fff',
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  chatName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  chatTime: {
    fontSize: 12,
    color: '#666',
  },
  chatFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  unreadBadge: {
    backgroundColor: '#27ae60',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  unreadCount: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  backButton: {
    marginRight: 16,
    padding: 4,
  },
  chatInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  chatDetails: {
    marginLeft: 12,
  },
  chatStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    color: '#666',
  },
  callButton: {
    padding: 4,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  messageContainer: {
    marginBottom: 16,
  },
  userMessage: {
    alignItems: 'flex-end',
  },
  driverMessage: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  userBubble: {
    backgroundColor: '#27ae60',
    borderBottomRightRadius: 4,
  },
  driverBubble: {
    backgroundColor: '#f0f0f0',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  userMessageText: {
    color: '#fff',
  },
  driverMessageText: {
    color: '#222',
  },
  messageTime: {
    fontSize: 12,
    marginTop: 4,
  },
  userMessageTime: {
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'right',
  },
  driverMessageTime: {
    color: '#666',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  messageInput: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxHeight: 100,
    fontSize: 16,
    color: '#222',
    marginRight: 12,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#27ae60',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#f0f0f0',
  },
});

export default ChatScreen;
